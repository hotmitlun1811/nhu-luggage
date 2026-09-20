# Đề xuất: gói "Custom" và cách tính giá theo số ngày

> **Trạng thái: ĐÃ TRIỂN KHAI trong form đặt chỗ và đã push lên `main` (2026-09-20, commit `d9076f4`).** Mục 1-11 bên dưới là bản đề xuất gốc, giữ lại để biết vì sao chọn cách này.
>
> **Đã làm (theo hướng của chủ cửa hàng: nhập giờ gửi trước, giờ lấy bị giới hạn theo gói, có gói Custom):**
> - Bộ máy tính giá: `src/lib/pricing.ts` (hàm thuần, một nơi duy nhất quyết định giá). 47 test có số liệu cụ thể ở `src/lib/pricing.test.ts`, chạy bằng `npm test`.
> - Custom = "ghép rẻ nhất phủ đủ thời gian" (mục 5), **không** phải chia gói theo thứ tự rồi áp quy tắc 50%.
> - Giờ lấy: By the Hour chỉ trong ngày, sau giờ gửi. By the Day tối đa 24 giờ + 60 phút ân hạn. Mini 7 ngày, Strand 1 tháng lịch, Long Stay 4 tháng lịch (cùng giờ, cùng ngày). Custom không giới hạn (tối đa 1095 ngày).
> - Phụ phí cỡ lớn theo lane của từng gói con: Flexible 30.000₫, Flat Rate 50.000₫; gói theo giờ tính 1 lần, các gói khác tính mỗi kỳ.
> - Dưới tổng tiền có bảng "How we calculated this price": từng kỳ tính tiền kèm ngày, tổng mỗi bag, nhân số bag, phụ phí từng gói, và các quy tắc (component `PriceBreakdown.tsx`, đọc cùng một báo giá với con số tổng nên luôn khớp).
> - Chính sách mặc định P1, P2, P3, P5, P6 đã áp dụng đúng như đề xuất ở mục 6.
>
> **Chưa làm / cần chủ cửa hàng quyết:** P4 (lấy trễ, gia hạn: form không tính phí trễ; ToS vẫn ghi "14 ngày rồi 30.000₫/ngày"); P7 giữ nguyên; form nhân viên `IntakeForm.tsx` vẫn dùng cách tính cũ; ToS, FAQ, trang giá vẫn ghi "phụ phí một lần" và chưa công bố quy tắc 4 giờ (D1, D5); Lark chưa có lựa chọn "Custom" nên đặt vào gói chiếm nhiều tiền nhất, chi tiết nằm ở cột Duration; bản dịch ko/ja là tạm.
>
> Khác biệt so với bảng ở mục 5.2: code dùng **tháng lịch**, không phải 30 ngày cố định, nên số ngày mỗi khoảng giá dịch chuyển theo ngày bắt đầu (ví dụ gửi từ 20/9, 31 ngày = 360.000₫; gửi từ 20/10, 31 ngày = 300.000₫). Bảng 5.2 chỉ để minh họa; số đúng nằm trong test.
>
> Người đọc: chủ cửa hàng, để quyết định chính sách và giao việc build.
> **Mục 11 (bổ sung cùng ngày) đối chiếu với chuẩn ngành, luật Việt Nam và tính khả thi kinh doanh, có dẫn nguồn.**
> Mọi con số bên dưới là **giá cho 1 bag**, đọc trực tiếp từ `src/lib/plans.ts` và `TermsOfServiceContent.tsx` ngày 2026-09-19. Các bảng số ở mục 4 và 5 do script `docs/pricing/pricing-model-check.py` tính ra (chạy `python3 docs/pricing/pricing-model-check.py`), không tính tay.

---

## 1. Kết luận ngắn

1. **Có, nên có Custom.** Nhưng đừng viết nó thành "gói thứ 6" với giá viết tay. Hãy xây **một bộ máy tính giá duy nhất** (một hàm), rồi Custom chỉ là "để bộ máy tính cho ngày tôi chọn".
2. **Cách "tách thành các gói nhỏ rồi cộng lại" chưa tối ưu.** Ví dụ 46 ngày: tách ra 1 tháng + 2 tuần + 2 ngày = **720.000₫**, trong khi ghép rẻ nhất chỉ **600.000₫** (2 gói tháng, dư 14 ngày mà vẫn rẻ hơn). Tệ hơn, cách này cho ra giá **ở 47 ngày đắt hơn ở 60 ngày**. Khách hoặc luật sư sẽ thấy ngay chỗ này.
3. **Quy tắc "vượt 50% thì tính nguyên gói" cũng chưa đủ tốt.** Nó đúng ở 110/150 độ dài, nhưng làm khách trả **đắt hơn mức rẻ nhất ở 40/150 độ dài** (nặng nhất là 61 ngày: tính 1.000.000₫, trong khi rẻ nhất là 660.000₫, đắt hơn 52%) và vẫn còn **9 chỗ "gửi lâu hơn lại rẻ hơn"** (3 ngày = 180.000₫, nhưng 4 ngày = 150.000₫).
4. **Nên dùng quy tắc "ghép rẻ nhất phủ đủ thời gian".** Đây vẫn là ý tưởng của bạn (chia nhỏ ra các gói có sẵn, tối ưu cho khách), chỉ khác là hệ thống **thử mọi cách ghép** và lấy cách rẻ nhất, thay vì chia theo thứ tự. Nó có 3 tính chất tốt: không bao giờ đắt hơn cách ghép nào khác, gửi thêm ngày không bao giờ rẻ đi, và giải thích được bằng 1 câu.
5. **Quy tắc 50% có thể bỏ.** Với bảng giá hiện tại, phần lớn kết quả mà quy tắc 50% muốn đạt đã tự có khi ghép rẻ nhất (ví dụ 10-30 ngày đều 300.000₫). Và quy tắc 50% **mâu thuẫn với điều khoản đang đăng** (mục 3, D3).
6. **Việc quan trọng nhất để tránh tranh chấp không phải là thuật toán, mà là làm cho 5 nơi nói cùng một điều:** form đặt chỗ, tin nhắn WhatsApp, Điều khoản (ToS), trang giá/FAQ, và cách nhân viên tính tiền tại quầy. Hiện có **7 chỗ đang lệch nhau** (mục 3), trong đó có 1 chỗ cần xử lý ngay.

> Lưu ý: tôi không phải luật sư. Phần chính sách ở mục 6 nên được luật sư (hoặc người am hiểu luật tiêu dùng Việt Nam) đọc trước khi đăng vào ToS.

---

## 2. Dữ kiện đã kiểm tra

**Bảng giá hiện tại** (`src/lib/plans.ts`):

| Gói | Giá / bag | Thời hạn | Quy ra mỗi ngày | So với giá 1 ngày |
|---|---:|---|---:|---:|
| By the Hour | 15.000₫ / giờ | tối thiểu 1 giờ; quá 4 giờ tính 1 ngày | - | - |
| By the Day | 60.000₫ | "24 giờ từ lúc gửi" | 60.000₫ | 100% |
| Mini | 150.000₫ | 7 ngày | 21.429₫ | 36% |
| Strand | 300.000₫ | 30 ngày (code) / "1 tháng" (ToS) | 10.000₫ | 17% |
| Long Stay | 1.000.000₫ | 120 ngày (code) / "4 tháng" (ToS) | 8.333₫ | 14% |

Phụ phí hành lý cỡ lớn: +30.000₫ (Flexible), +50.000₫ (Flat Rate). Từ 2026-09-19 form tính phụ phí Flat Rate **mỗi bag, mỗi kỳ** (giống giá gói).

**Điều khoản đang đăng** (`TermsOfServiceContent.tsx`, mục 6-7), nguyên văn ý chính:
- "Payment is cash at the store. We do not process online payments."
- "By the day: 60,000 VND for **24 hours from drop-off**."
- "Flat Rate plans are not refundable. **The price is fixed for the period regardless of when you collect.** Flexible charges are calculated at collection based on actual time stored."
- "Flat Rate: Your plan runs from the time of drop-off."
- "Bags left more than 14 days past plan expiry: 30,000 VND daily holding fee." (quá 60 ngày không liên lạc được: có thể tặng/xử lý)

---

## 3. Những chỗ đang lệch nhau (nên sửa dù có làm Custom hay không)

| # | Vấn đề | Đang ở đâu | Rủi ro |
|---|---|---|---|
| **D1** | **Quy tắc 4 giờ của By the Hour không được công bố ở đâu cả.** Form vẫn tính "quá 4 giờ = 1 ngày", nhưng dòng ghi chú trên form đã bị gỡ (2026-09-19, theo yêu cầu) và ToS chỉ ghi "billed in full hours", trang giá chỉ ghi "billed per hour". | form, ToS, trang giá | **Cao.** Khách gửi 5 giờ thấy 60.000₫ thay vì 75.000₫ (rẻ hơn, nên khó bị kiện), nhưng nhân viên tính khác form thì có chuyện. Cần công bố ở ít nhất 1 nơi. |
| **D2** | **Cách đếm "ngày" khác nhau.** ToS: 24 giờ kể từ giờ gửi. Form: số ngày lịch (ngày lấy trừ ngày gửi). Gửi 20/9 lúc 9h, lấy 21/9 lúc 18h (33 giờ): form tính 1 ngày, ToS suy ra 2 ngày. | form vs ToS | **Cao.** Đây là nguồn tranh cãi số 1 ở quầy. |
| **D3** | **Lấy sớm.** ToS: Flat Rate "giá cố định bất kể lấy khi nào, không hoàn tiền". Quy tắc 50% bạn nêu ngụ ý dưới 50% thì tính khác. Hai điều này mâu thuẫn. | ToS vs thực tế vận hành | **Cao.** Khách lấy sau 5 ngày gói tháng sẽ hỏi "vậy sao ghi là không hoàn". |
| **D4** | **"1 tháng" là bao nhiêu ngày, và ngày thứ 31 tính thế nào?** Code: 30 ngày, và form làm tròn lên **theo cả kỳ**: gửi Strand 31 ngày (ví dụ 1/3 đến 1/4, khách nghĩ đúng 1 tháng) bị tính **2 kỳ = 600.000₫, gấp đôi**, vì thêm 1 ngày. Bộ máy mới sẽ tính 360.000₫ (1 tháng + 1 ngày). ToS/FAQ chỉ ghi "one month". | code vs ToS | **Cao.** Thêm 1 ngày mà giá gấp đôi là loại chuyện khách chụp màn hình gửi đi. |
| **D5** | **By the Day trên form cho gửi tới 30 ngày** (60.000₫ × số ngày). Gửi 20 ngày qua By the Day là 1.200.000₫, trong khi Strand chỉ 300.000₫. Khách không biết sẽ trả gấp 4. | form | Cao về trải nghiệm: khách trả oan, sau đó khiếu nại. |
| **D6** | **Quá hạn.** ToS ghi 14 ngày sau khi hết hạn mới tính 30.000₫/ngày, nhưng cũng ghi "collect within your plan period or renew early". Không nói gia hạn tính giá thế nào, và 14 ngày đầu là miễn phí hay không. | ToS | Trung bình. |
| **D7** | **Phụ phí cỡ lớn.** Trang giá/FAQ/ToS vẫn ghi "một khoản phụ phí" (+50.000₫), trong khi form (từ 2026-09-19) tính mỗi bag, mỗi kỳ. | copy vs form | Trung bình. Đã báo ở lượt trước, chưa sửa. |

---

## 4. Đánh giá cách tính của bạn, bằng số

Ba cách tính cho cùng một bảng giá. "Rẻ nhất" là cách thử mọi tổ hợp.

| Số ngày | Tách gói (không làm tròn) | Tách + quy tắc 50% | **Ghép rẻ nhất** | Gói được dùng (rẻ nhất) |
|---:|---:|---:|---:|---|
| 3 | 180.000 | 180.000 | **150.000** | 1 Mini |
| 10 | 330.000 | 330.000 | **300.000** | 1 Strand |
| 20 | 660.000 | 300.000 | **300.000** | 1 Strand |
| 23 | 570.000 | 300.000 | **300.000** | 1 Strand |
| 40 | 630.000 | 630.000 | **600.000** | 2 Strand |
| 46 | **720.000** | 600.000 | **600.000** | 2 Strand |
| 47 | 780.000 | 600.000 | **600.000** | 2 Strand |
| 62 | 720.000 | **1.000.000** | **720.000** | 2 Strand + 2 ngày |
| 75 | 960.000 | 1.000.000 | **900.000** | 3 Strand |
| 100 | 1.230.000 | 1.000.000 | **1.000.000** | 1 Long Stay |

Đọc bảng:
- Cột "Tách gói": đúng ví dụ 46 ngày của bạn (1 tháng + 2 tuần + 2 ngày = 720.000₫). Đắt hơn 20% so với cách rẻ nhất. Tính cả 150 độ dài từ 1 đến 150 ngày, cách này đắt hơn mức rẻ nhất ở **120 độ dài** (nặng nhất là 27 ngày: +170%), và có **25 chỗ** mà gửi thêm 1 ngày lại rẻ hơn (ví dụ 6 ngày = 360.000₫, 7 ngày = 150.000₫). Cách này chưa làm tròn phần ngày lẻ, nên đây là bản "nguyên văn" của ý tưởng chia nhỏ, trước khi thêm quy tắc 50%.
- Cột "Tách + 50%": sửa được nhiều chỗ, nhưng còn **40/150** độ dài đắt hơn mức rẻ nhất (nặng nhất +52% ở 61 ngày; ở 62 ngày là +39%) và 9 chỗ "lâu hơn lại rẻ hơn". Cộng thêm, "vượt 50% của cái gì" (50% của gói tuần? tháng? 4 tháng?) là thứ khách sẽ hỏi.
- Cột "Ghép rẻ nhất": **0 chỗ** gửi lâu hơn mà rẻ hơn, và **không có tổ hợp nào rẻ hơn nó** (theo định nghĩa).

**Về ý "20 ngày gói 1 tháng vẫn tính tháng vì vượt 50%":** với ghép rẻ nhất, 10 đến 30 ngày đều là 300.000₫ **mà không cần quy tắc 50%**. Nó tự xảy ra vì 2 gói Mini (300.000₫) bằng đúng 1 gói Strand. Điều này cũng cho thấy bảng giá của bạn có một "bậc thang bằng phẳng" ở 10-30 ngày: đó là chủ ý tốt cho khách, nhưng hãy biết là nó tồn tại.

---

## 5. Đề xuất: "ghép rẻ nhất phủ đủ thời gian"

### 5.1 Thuật toán (ngắn)

Cho `N` là số ngày cần phủ. Chi phí tối thiểu `cost(N)` là giá thấp nhất trong mọi cách chọn các gói (Day, Mini 7 ngày, Strand 30 ngày, Long Stay 120 ngày) sao cho tổng số ngày của các gói **≥ N**. Tính bằng quy hoạch động, mỗi bước thử từng gói:

```
cost(0) = 0
cost(n) = min( giá(gói) + cost(max(0, n − số_ngày(gói))) )  với mọi gói
```

Với N tối đa vài trăm, chạy tức thì. Khi giá bằng nhau, ưu tiên ít gói hơn. Kết quả trả về không chỉ tổng tiền mà cả **danh sách gói** (để hiển thị cho khách).

### 5.2 Bảng giá kết quả (mỗi bag; sinh từ script, đây cũng là bộ "test vàng")

> **Lưu ý (2026-09-20):** bảng này tính theo mô hình tháng = 30 ngày, Long Stay = 120 ngày. Code thật dùng tháng lịch nên các mốc dịch chuyển vài ngày tùy ngày bắt đầu. Xem `src/lib/pricing.test.ts` cho số liệu chính xác.

| Số ngày | Giá | Ghép như thế nào |
|---:|---:|---|
| 1 | 60.000 | 1 Day |
| 2 | 120.000 | 2 Day |
| 3-7 | 150.000 | 1 Mini |
| 8 | 210.000 | 1 Mini + 1 Day |
| 9 | 270.000 | 1 Mini + 2 Day |
| **10-30** | **300.000** | 1 Strand |
| 31 | 360.000 | 1 Strand + 1 Day |
| 32 | 420.000 | 1 Strand + 2 Day |
| 33-37 | 450.000 | 1 Strand + 1 Mini |
| 38 | 510.000 | 1 Strand + 1 Mini + 1 Day |
| 39 | 570.000 | 1 Strand + 1 Mini + 2 Day |
| **40-60** | **600.000** | 2 Strand |
| 61 | 660.000 | 2 Strand + 1 Day |
| 62 | 720.000 | 2 Strand + 2 Day |
| 63-67 | 750.000 | 2 Strand + 1 Mini |
| 68 | 810.000 | 2 Strand + 1 Mini + 1 Day |
| 69 | 870.000 | 2 Strand + 1 Mini + 2 Day |
| **70-90** | **900.000** | 3 Strand |
| 91 | 960.000 | 3 Strand + 1 Day |
| **92-120** | **1.000.000** | 1 Long Stay |
| 121 | 1.060.000 | 1 Long Stay + 1 Day |
| 122 | 1.120.000 | 1 Long Stay + 2 Day |
| 123-127 | 1.150.000 | 1 Long Stay + 1 Mini |
| 128 | 1.210.000 | 1 Long Stay + 1 Mini + 1 Day |
| 129 | 1.270.000 | 1 Long Stay + 1 Mini + 2 Day |
| 130-150 | 1.300.000 | 1 Long Stay + 1 Strand |

### 5.3 Vì sao nên chọn cách này

- **Công bằng và tối ưu cho khách:** đúng mục tiêu bạn nêu. Không bao giờ có cách nào rẻ hơn.
- **Giải thích được bằng 1 câu:** "Chúng tôi luôn tính cách ghép các gói rẻ nhất để phủ đủ số ngày bạn gửi."
- **Không có nghịch lý:** gửi thêm ngày không bao giờ rẻ đi.
- **Bền vững:** đổi bảng giá (ví dụ thêm gói 2 tuần, đổi giá Strand) chỉ cần sửa `PLAN_FACTS`, bộ máy tự tính lại, bảng test vàng cho biết ngay giá nào thay đổi.
- **Tự có "quy tắc 50%" khi cần:** không cần viết thêm luật ngoại lệ.

### 5.4 Điều cần lưu ý

- Giá do **bảng giá** quyết định. Nếu Mini + Mini rẻ hơn Strand thì bộ máy sẽ dùng 2 Mini, và ngược lại. Mỗi lần đổi giá, phải xem lại bảng 5.2.
- Bộ máy tính giá cho **khoảng thời gian đã đặt**, không tự biết khách lấy sớm hay trễ (xem mục 6, P3 và P4).

---

## 6. Chính sách cần chốt (kèm đề xuất mặc định)

| Mã | Vấn đề | Hiện trạng | **Đề xuất** | Lý do |
|---|---|---|---|---|
| P1 | Cách đếm ngày | Form: ngày lịch. ToS: 24 giờ từ lúc gửi (D2) | **Đếm theo giờ: mỗi 24 giờ tròn kể từ giờ gửi là 1 ngày; ân hạn 60 phút.** | Khớp ToS ("24 hours from drop-off"). Form đã bắt buộc nhập cả giờ gửi và giờ lấy, nên có đủ dữ liệu. Ân hạn tránh cãi vì trễ vài phút. |
| P2 | "1 tháng" dài bao nhiêu | Code 30 ngày (D4) | **1 tháng = đến cùng giờ của cùng ngày tháng sau** (tối đa 31 ngày). Tuần = 7 ngày. 4 tháng = 4 tháng lịch. | Khớp cách khách nghĩ. Tránh vụ 31 ngày bị tính thêm. |
| P3 | Lấy sớm | ToS: Flat Rate cố định, không hoàn. 50% (D3) | **Giá khóa theo thời gian đã đặt. Lấy sớm không hoàn tiền. Bỏ quy tắc 50%.** | Đã đúng với ToS hiện tại. Đơn giản nhất. Muốn tiết kiệm thì khách chọn đúng số ngày ngay từ đầu (form sẽ cho thấy giá rẻ nhất). |
| P4 | Lấy trễ / gia hạn | ToS: 14 ngày rồi 30.000₫/ngày (D6) | **Tính lại tổng thời gian thực tế bằng cùng quy tắc "rẻ nhất", trừ số đã trả. Thời gian ân hạn 60 phút.** | Ví dụ đặt 8 ngày (210.000₫), thực tế 10 ngày (300.000₫): trả thêm 90.000₫, thay vì 120.000₫ nếu tính 2 ngày lẻ. Luôn ≤ cách tính "cộng thêm ngày lẻ". |
| P5 | Phụ phí cỡ lớn khi ghép nhiều gói | Flexible: 1 lần. Flat: mỗi kỳ | **Mỗi bag cỡ lớn, mỗi gói con, theo phụ phí của gói con đó** (Day 30.000₫, Mini/Strand/Long Stay 50.000₫). | Nhất quán với luật 2026-09-19. Ví dụ 46 ngày (2 Strand), 1 bag cỡ lớn: 2 × 50.000₫ = 100.000₫. |
| P6 | Quy tắc 4 giờ (By the Hour) | Có trong tính giá, không công bố (D1) | **Giữ quy tắc, công bố** trong ToS, trang giá và dòng tổng tiền. | Minh bạch. |
| P7 | Thanh toán | Tiền mặt tại quầy | **Giữ nguyên.** Booking chỉ là "báo giá". Lark ghi kèm bảng chi tiết giá. | Không cần thay đổi hệ thống. |

**Đoạn chính sách mẫu (tiếng Anh, để đưa vào ToS mục 6-7 sau khi luật sư xem):**

> **How we count and price your storage time.**
> 1. Storage time runs from your drop-off time to your collection time. Every full 24 hours is one day. Up to 60 minutes past a 24-hour mark is free.
> 2. Your price is the lowest combination of our plans that covers your stay: Day, Mini (7 days), Strand (1 month) and Long Stay (4 months). A longer stay never costs less than a shorter one.
> 3. The price you book is the price you pay for the dates you book. If you collect early, the price stays the same and we do not refund unused days.
> 4. If you collect after your booked end time, we work out the price for your real stay in the same way and you pay the difference.
> 5. By the Hour is billed per full hour. After 4 hours it is billed as one day.
> 6. Each oversized item adds the surcharge of each plan in your price (30,000 VND per day plan, 50,000 VND per Mini, Strand or Long Stay plan).

**Bản tiếng Việt (để đăng cho khách trong nước):**

> **Cách tính thời gian và giá gửi hành lý.**
> 1. Thời gian gửi tính từ giờ bạn gửi đến giờ bạn lấy. Mỗi 24 giờ tròn là 1 ngày. Trễ tối đa 60 phút sau mốc 24 giờ không tính thêm.
> 2. Giá của bạn là cách ghép các gói **rẻ nhất** để phủ đủ thời gian gửi: gói Ngày, Mini (7 ngày), Strand (1 tháng), Long Stay (4 tháng). Gửi lâu hơn không bao giờ rẻ hơn gửi ngắn hơn.
> 3. Giá bạn đặt là giá cho khoảng thời gian bạn đặt. Nếu bạn lấy sớm, giá không đổi và chúng tôi không hoàn tiền cho những ngày chưa dùng.
> 4. Nếu bạn lấy sau giờ hết hạn đã đặt, chúng tôi tính lại giá cho thời gian gửi thực tế theo cách trên và bạn trả phần chênh lệch.
> 5. Gói theo giờ tính theo giờ tròn. Quá 4 giờ tính bằng 1 ngày.
> 6. Mỗi hành lý cỡ lớn cộng phụ phí của từng gói trong giá của bạn (30.000₫ cho mỗi ngày; 50.000₫ cho mỗi gói Mini, Strand, Long Stay).

---

## 7. Form: từng gói hoạt động thế nào

Nguyên tắc bạn nêu: chọn gói trước, **bắt buộc nhập ngày giờ gửi**, rồi ngày giờ lấy bị giới hạn theo gói.

| Gói | Ngày giờ gửi | Ngày giờ lấy | Giá |
|---|---|---|---|
| **By the Hour** | tự chọn | **ngày = ngày gửi (khóa)**; chỉ chọn giờ, sau giờ gửi | 15.000₫ × số giờ; quá 4 giờ = 60.000₫ |
| **By the Day** | tự chọn | từ giờ gửi đến **tối đa 24 giờ sau** (ân hạn 60 phút). Dài hơn: gợi ý chuyển Custom | 60.000₫ |
| **Mini** | tự chọn | **không quá 7 ngày sau giờ gửi**; tự điền sẵn ngày thứ 7 (sửa được) | 150.000₫ |
| **Strand** | tự chọn | **không quá cùng giờ, cùng ngày tháng sau**; tự điền sẵn | 300.000₫ |
| **Long Stay** | tự chọn | **không quá 4 tháng sau**; tự điền sẵn | 1.000.000₫ |
| **Custom** (mới) | tự chọn | **tự do** (sau giờ gửi) | **Ghép rẻ nhất** (mục 5) |

Hành vi cụ thể:
1. **Ô ngày giờ lấy bị khóa cho đến khi có ngày giờ gửi.** (Đã làm sẵn khung: chưa chọn gói thì cả form bị khóa.)
2. **Lịch chọn ngày lấy chỉ bật những ngày hợp lệ của gói.** Ngày ngoài phạm vi bị mờ, kèm dòng: "Cần lâu hơn? Chọn Custom." bấm một lần là chuyển gói và **giữ nguyên ngày giờ đã chọn**.
3. **Tự điền sẵn ngày lấy = mốc cuối của gói** (khách chỉ cần chọn giờ). Giảm số lần bấm, và khách thấy ngay "gói này chạy đến khi nào".
4. **Hiển thị bảng chi tiết giá ngay trên form**, không chỉ con số tổng: `1 Strand (300.000) + 1 Mini (150.000) = 450.000 / bag × 2 bag`. Dòng này cũng đi vào tin nhắn WhatsApp và bản ghi Lark, để nhân viên và khách nhìn cùng một con số.
5. **Custom xếp thành nhóm thứ ba trong ô chọn gói**, tên nhóm: "Custom · Any dates" (hoặc "Tùy chọn · Bất kỳ số ngày"), tách khỏi Flexible và Flat Rate.
6. **Cảnh báo rẻ hơn:** nếu khách chọn Custom nhưng khoảng thời gian trùng đúng một gói (ví dụ đúng 7 ngày), hiện "Đây chính là gói Mini." (chỉ là chú thích, giá không đổi).

---

## 8. Kế hoạch xây dựng bền vững

Nguyên tắc: **một nguồn sự thật cho giá và luật tính.** Không để giá xuất hiện ở nhiều nơi viết tay (bài học từ vụ giá sai trong JSON-LD tháng 8).

| Giai đoạn | Việc | Sản phẩm | Ước tính |
|---|---|---|---|
| **0. Chốt quyết định** | Trả lời 7 câu ở mục 10. Điền 5 con số chi phí và sức chứa (mục 11.4). Luật sư đọc mục 6 và 11.3. | Quyết định P1-P12 | 0,5 ngày (chủ yếu chờ người) |
| **1. Bộ máy tính giá** | Viết `src/lib/pricing.ts`: hàm thuần `quote({ dropOff, pickUp, bags, oversized })` trả về `{ pieces[], perBag, surcharge, total, billedDays }`. Không dính React, không dính giao diện. | 1 file + test | 1 ngày |
| **1b. Bộ test** | Thêm Vitest (repo chưa có test). Test: bảng vàng mục 5.2 (150 dòng), tính đơn điệu, không có tổ hợp nào rẻ hơn (kiểm tra vét cạn), quy tắc giờ (4 giờ), ngày cuối tháng, ân hạn, phụ phí. | ~30 test | 0,5 ngày |
| **2. Form** | Thêm gói Custom vào `PlanSelect`; giới hạn ngày giờ lấy theo gói (mục 7); hiển thị chi tiết giá; ghi chi tiết vào WhatsApp + Lark (thêm trường "Billing breakdown"). Form gọi `quote()`, **xóa** logic tính giá đang nằm trong `HeroBookingForm.tsx`. | form mới | 1,5 ngày |
| **3. Nội dung và pháp lý** | Cập nhật ToS mục 6-7, FAQ, trang giá, JSON-LD, bản dịch ko/ja. **Bảng giá trên trang giá sinh từ `quote()`** để không lệch. Sửa D1-D7. | copy đồng bộ | 1 ngày |
| **4. Nhân viên** | `IntakeForm.tsx` (form của nhân viên) dùng cùng `quote()`, thêm màn "tính lại khi lấy trễ" (P4). | công cụ quầy | 1 ngày |
| **5. Theo dõi** | Sau 4-6 tuần, xem Lark: khách chọn Custom bao nhiêu %, độ dài phổ biến là gì. Nếu nhiều khách gửi đúng 14 ngày, cân nhắc thêm gói 2 tuần (chỉ cần thêm 1 dòng vào `PLAN_FACTS`). | quyết định giá | - |

Các file sẽ chạm: `src/lib/plans.ts`, **mới** `src/lib/pricing.ts`, `src/components/booking/HeroBookingForm.tsx`, `PlanSelect.tsx`, `DateTimeField.tsx` (ràng buộc min/max), `src/components/intake/IntakeForm.tsx`, `src/app/api/lark/booking/route.ts` + bảng Lark (thêm cột chi tiết giá), `src/content/{en,ko,ja}/{pricing,faq,booking}.ts`, `TermsOfServiceContent.tsx`, `src/lib/structured-data.ts`.

Thứ tự khuyến nghị: **1 → 1b trước, chưa đụng giao diện.** Bộ máy đúng thì phần còn lại chỉ là hiển thị.

---

## 9. Rủi ro và cách giảm

| Rủi ro | Giảm bằng |
|---|---|
| Đổi giá mà quên cập nhật chỗ khác | Một nguồn (`PLAN_FACTS`); trang giá sinh từ `quote()`; test vàng báo lệch |
| Nhân viên tính khác form | Nhân viên dùng đúng hàm `quote()` (giai đoạn 4); in chi tiết giá lên phiếu |
| Khách nói "form ghi khác lúc tôi đặt" | Lưu chi tiết giá + phiên bản bảng giá (`pricingVersion`) vào Lark lúc đặt |
| Khách tưởng Custom đắt hơn gói | Luôn hiện "giá rẻ nhất cho ngày của bạn" và chú thích khi trùng một gói |
| Ngày cuối tháng (P2) tính sai | Test riêng: 31/1→28/2, 1/3→1/4, năm nhuận |
| Chính sách mâu thuẫn ToS | Luật sư duyệt; đổi ToS cùng lúc với đổi form (cùng một lần phát hành) |

---

## 10. Câu hỏi cần bạn trả lời (kèm đề xuất mặc định)

1. **Đếm ngày** (P1): theo **24 giờ từ giờ gửi** (khớp ToS, đề xuất) hay theo **ngày lịch** (như form hiện tại, có lợi cho khách hơn nhưng giảm doanh thu và khác ToS)?
2. **Ân hạn** khi lấy trễ vài phút: **60 phút** (đề xuất), 30 phút, hay 120 phút?
3. **"1 tháng"** (P2): **cùng ngày tháng sau** (đề xuất) hay cố định 30 ngày?
4. **Lấy sớm** (P3): **không hoàn, giá khóa** (đề xuất, đúng ToS) hay có chính sách tính lại? (Nếu tính lại thì nên trả tiền lúc lấy, không phải lúc gửi.)
5. **Lấy trễ** (P4): tính lại bằng "rẻ nhất" **trừ số đã trả** (đề xuất)? Và 14 ngày miễn phí trong ToS hiện tại: **bỏ** hay giữ?
6. **By the Day** chỉ còn **tối đa 24 giờ**, dài hơn thì dùng Custom (đề xuất, sửa D5)?
7. **Phụ phí cỡ lớn cho Custom** (P5): mỗi gói con theo phụ phí của gói đó (đề xuất)?

**Khi bạn trả lời xong,** giai đoạn 1 và 1b (bộ máy + test) là bước nhỏ, an toàn, không đổi giao diện; nên làm trước.

---

## 11. Đối chiếu với chuẩn ngành, luật Việt Nam và tính khả thi

> Bổ sung cùng ngày sau khi tra nguồn. Chỗ nào là nguồn thứ cấp (bài review, bản tóm tắt) tôi ghi rõ. Phần luật là **tóm tắt để bạn biết cần hỏi gì**, không thay cho ý kiến luật sư.

### 11.1 Các dịch vụ khác đang làm gì

| Dịch vụ | Cách đếm "ngày" | Khi trễ / gia hạn | Ghi chú |
|---|---|---|---|
| **LuggageHero** | Đúng 24 giờ kể từ lúc bấm giờ gửi | Quá 24 giờ: tự tính thêm 1 mức giá ngày. Trang hướng dẫn không nêu thời gian ân hạn | Có giá theo giờ và giá nhiều ngày rẻ dần. Giá theo giờ ~1$ và trần ~8$/ngày là số từ kết quả tìm kiếm (nguồn thứ cấp, mỗi nơi một khác) |
| **Stasher** | Một mức giá là **cả ngày khi điểm gửi còn mở** (không đếm 24 giờ) | Giờ gửi/lấy chỉ là ước tính; lấy trễ không mất thêm nếu vẫn trong thời gian đã đặt và điểm còn mở. Muốn kéo dài: đặt thêm 1 booking | Hủy trước giờ gửi: hoàn 50% hoặc coupon 100%. Không nêu hoàn tiền khi lấy sớm |
| **Bounce** (nguồn thứ cấp) | Theo 24 giờ; chỉ gửi 4 giờ vẫn trả cả ngày | Không tìm thấy quy định trễ trong nguồn đã xem | Giá theo cỡ: túi nhỏ ~5,90$, vali ~7,90$ |
| **Radical Storage** | Theo ngày | Không tìm thấy trong nguồn đã xem | "Không phụ phí theo kích thước, cân nặng hay thời gian lưu"; đổi lịch miễn phí |
| **Easy Storage Đà Nẵng** (đối thủ tại chỗ, Hana's Coworking) | Ngày / tuần / tháng | Trả tháng đầu trước, gia hạn bằng chuyển khoản. **Phải lấy trong vòng 1 tháng lịch sau khi hết hạn**, quá thì coi là bỏ lại, có thể tặng hoặc bán để bù phí | Túi nhỏ 300.000₫/tháng, vali lớn 400.000₫/tháng, ngày 100.000₫, tuần 250.000₫ |
| **Giá vé tháng / trần giá của giao thông công cộng** (TfL "fare capping") | - | - | Khách không bao giờ trả quá mức trần trong ngày. Đây là cùng ý với "ghép rẻ nhất": quen thuộc và tạo được lòng tin |

**Rút ra (những gì thật sự là "chuẩn"):**
1. **Không có một cách đếm ngày chuẩn duy nhất.** 24 giờ kể từ lúc gửi (LuggageHero, Bounce) và ngày mở cửa (Stasher) đều phổ biến. Điều chuẩn là **mỗi nơi nói rõ một cách và áp dụng nhất quán**. ToS của Stow đã chọn "24 giờ từ lúc gửi", là lựa chọn hợp chuẩn. Việc cần làm là sửa form cho khớp (D2).
2. **Trễ hạn: tính thêm đúng theo bảng giá cho thời gian trễ**, không phạt riêng (LuggageHero). Luật Việt Nam cũng nói theo hướng này (mục 11.3, L3).
3. **Lấy sớm: không nguồn nào hoàn tiền phần chưa dùng** của gói đã trả. Còn hủy trước giờ gửi thì có hoàn một phần (Stasher). Vậy "không hoàn khi lấy sớm, hủy trước giờ gửi thì không mất gì" là chuẩn, và khớp P3.
4. **Giá nhiều ngày rẻ dần** là chuẩn (LuggageHero, Easy Storage: tuần và tháng rẻ hơn theo ngày). Bảng giá Stow đã theo hướng này.
5. **Hàng bị bỏ lại: có mốc thời gian rõ, có liên hệ khách trước, rồi xử lý để bù phí** (Easy Storage). ToS Stow đã có (14 ngày rồi 60 ngày).

### 11.2 Giá của Stow so với thị trường: khách có bị thiệt không?

| | Stow | Easy Storage (tại chỗ) | Chênh lệch |
|---|---:|---:|---:|
| 1 ngày | 60.000₫ | 100.000₫ | **-40%** |
| 1 tuần | 150.000₫ | 250.000₫ | **-40%** |
| 1 tháng, túi thường | 300.000₫ | 300.000₫ (túi nhỏ) | 0% |
| 1 tháng, cỡ lớn | 350.000₫ (300.000 + 50.000) | 400.000₫ | -12,5% |
| Long Stay quy ra tháng | 250.000₫/tháng | (không có gói dài hơn) | thấp hơn mọi mức tháng đã thấy |

Các sàn đặt chỗ quốc tế: giá "từ" tại Đà Nẵng khoảng 2,35$ (Nannybag), 2,49$ (Stasher), 3,90$ (Radical Storage) mỗi túi mỗi ngày. Quy ra tiền Việt theo tỷ giá suy ra từ chính trang Easy Storage (300.000₫ = 11,41$, tức khoảng 26.293₫/$): **khoảng 62.000 đến 103.000₫**. Giá 60.000₫/ngày của Stow nằm ở đáy khoảng này.

**Kết luận:** so với thị trường, **khách không bị thiệt**. Stow rẻ hơn hoặc bằng ở mọi bậc. Đây cũng là lý do "ghép rẻ nhất" không làm bạn mất khách: nó chỉ áp dụng đúng những mức giá bạn đã công bố.

**Bạn có "mất" gì khi bỏ quy tắc chia nhỏ + 50% không?** Tôi tính thử: quy tắc đó chỉ thu thêm trung bình **1 đến 1,6% (khoảng 4.000₫ mỗi đơn)** với các đơn 1 đến 60 ngày, và khoảng **6%** với đơn 31 đến 120 ngày (nếu mọi độ dài xuất hiện như nhau). Đổi lại là các nghịch lý ở mục 4 và rủi ro tranh chấp. Không đáng.

### 11.3 Luật Việt Nam: 3 điểm áp dụng cho Stow

Gửi hành lý về bản chất là **hợp đồng gửi giữ tài sản** (Bộ luật Dân sự 2015, từ Điều 554) và khách là **người tiêu dùng** theo **Luật Bảo vệ quyền lợi người tiêu dùng 2023** (số 19/2023/QH15, hiệu lực từ 01/7/2024).

| Mã | Quy định (tóm tắt) | Việc cần làm |
|---|---|---|
| **L1** | Hợp đồng theo mẫu và điều kiện giao dịch chung phải được **niêm yết ở nơi dễ thấy tại cửa hàng và đăng trên website, trước khi khách giao kết hoặc đặt cọc/thanh toán** (Điều 26, 27) | In bảng giá và điều khoản đặt tại quầy. Trên form, ngoài tổng tiền, hiện **bảng chi tiết giá** trước nút xác nhận (đã có trong kế hoạch, mục 7) |
| **L2** | Điều 25 liệt kê các điều khoản **không được ghi** và bị coi là vô hiệu, trong đó có: hạn chế hoặc loại trừ trách nhiệm luật định; hạn chế quyền khiếu nại, khởi kiện của khách; cho phép bên bán **đơn phương thay đổi** điều khoản; cho phép **đổi giá lúc giao hàng hoặc trong quá trình cung cấp dịch vụ liên tục** mà không cho khách quyền chấm dứt; **gia hạn hợp đồng mà không báo trước**; chế tài bất lợi hơn cho khách | (a) **Khóa giá lúc đặt** (đúng P3). (b) **Không tự động gia hạn**; nhắc khách trước khi hết hạn (Stow_03 đã có ý "reminder"). (c) Câu trong ToS mục 8: trách nhiệm "**up to the amount you paid for storage**" **có nguy cơ bị coi là hạn chế trách nhiệm luật định.** Nhờ luật sư xem, đừng coi nó là tấm khiên chắc chắn |
| **L3** | Bộ luật Dân sự Điều 559: bên giữ chỉ được yêu cầu khách lấy hàng trước hạn **nếu có lý do chính đáng**. Điều 560: nếu khách **chậm nhận** thì phải trả **chi phí bảo quản và tiền công cho thời gian chậm nhận** | Đây là cơ sở pháp lý cho P4: **trễ hạn thì tính thêm theo bảng giá bình thường cho thời gian trễ**. Vì vậy **không nên đặt mức phạt riêng cao hơn giá thường** (dễ bị coi là chế tài bất lợi). Khoản "30.000₫/ngày sau 14 ngày" trong ToS nên được viết lại như một phần của cách tính này |

Lưu ý về độ tin cậy: danh sách Điều 25 tôi đọc qua trang tóm tắt của cổng phổ biến pháp luật tỉnh Cà Mau, và bài của Bộ Công Thương (moit.gov.vn) khớp về Điều 25, 26, 27. Trang thuvienphapluat.vn tôi không mở được (bị chặn), nên chưa đối chiếu với trang đó. Nội dung Điều 559 và 560 Bộ luật Dân sự lấy từ hethongphapluat.com. **Tất cả đều là bản tóm tắt hoặc trang tổng hợp, không phải văn bản gốc: hãy đối chiếu văn bản gốc khi nhờ luật sư.**

### 11.4 Tính khả thi cho bạn: bạn có lời không?

Bảng giá không làm khách thiệt, nhưng **câu hỏi "bạn có lời không" chưa trả lời được**, vì trong bộ tài liệu `Stow_01` đến `Stow_04` **không có số chi phí và sức chứa**. Tài liệu `Stow_01` còn ghi rõ một "việc còn để ngỏ": *chưa quyết định chia chỗ giữa Lane 1 và Lane 2*. Đó chính là điểm quyết định cho bài toán lời lỗ.

**Vì sao chỗ chứa quan trọng:** mỗi túi chiếm một "chỗ". Doanh thu mỗi túi mỗi ngày (nếu chỗ đó thay vào đó được bán theo ngày với 60.000₫):

| Gói | Doanh thu / túi / ngày | So với giá ngày |
|---|---:|---:|
| By the Day | 60.000₫ | 100% |
| Mini | 21.429₫ | 36% |
| Strand | 10.000₫ | 17% |
| Long Stay | 8.333₫ | 14% |

Một túi Long Stay chiếm chỗ với 14% giá ngày. Nếu kho đầy khách du lịch vào mùa cao điểm, Long Stay là **chi phí cơ hội**. Ngược lại vào mùa thấp, nó lấp chỗ trống và có lãi.

**5 con số bạn cần điền để kết luận** (rồi tôi tính giúp điểm hòa vốn từng gói):
1. Tổng chi phí cố định mỗi tháng (thuê mặt bằng, nhân sự, điện, bảo hiểm, phần mềm).
2. Số "chỗ túi tiêu chuẩn" của khu ngắn hạn và khu khóa riêng cho Lane 2.
3. Tỷ lệ lấp đầy trung bình, mùa cao điểm và mùa thấp.
4. Một túi 28 inch trở lên chiếm chỗ gấp mấy lần túi thường.
5. Tỷ lệ khách Lane 2 so với Lane 1 hiện tại.

Công thức: `doanh thu cần có mỗi chỗ mỗi ngày = chi phí cố định mỗi tháng ÷ (số chỗ × 30 × tỷ lệ lấp đầy)`. So kết quả với 60.000 / 21.429 / 10.000 / 8.333.

**Các "đòn bẩy" bảo vệ bạn mà không làm khách thiệt:**
1. **Hạn mức chỗ cho Lane 2** (theo khu). Form báo "hết chỗ dài hạn" hoặc cho vào danh sách chờ. Đây chính là "việc còn để ngỏ" của bạn.
2. **Thu tiền Lane 2 lúc gửi** (ToS đã ghi tiền mặt tại quầy). Giảm rủi ro khách bỏ hàng.
3. **Xem lại phụ phí cỡ lớn cho gói tháng.** Hiện +50.000₫ trên 300.000₫ là +17%, trong khi Easy Storage tính +33% cho vali lớn (300.000₫ lên 400.000₫). Nếu túi cỡ lớn chiếm chỗ gấp đôi, nên cân nhắc +100.000₫ (cần số đo thực ở mục 4 trên).
4. **Ân hạn 60 phút và tính lại khi trễ (P4).** Bạn không mất tiền vì khách trễ, và không phải phạt (tránh tranh chấp).
5. **Mốc bỏ lại rõ ràng và có thông báo bằng văn bản** (WhatsApp hoặc email đã lưu), theo mẫu Easy Storage. Lưu bằng chứng khách đã đồng ý.

### 11.5 Điều chỉnh kế hoạch (thêm vào P1-P7 ở mục 6)

| Mã | Đề xuất bổ sung | Lý do |
|---|---|---|
| P8 | **Niêm yết** bảng giá và điều khoản tại quầy và trên web, trước khi khách thanh toán. Hiện chi tiết giá trên form và WhatsApp | L1 |
| P9 | **Không tự động gia hạn.** Nhắc khách trước khi hết hạn | L2 |
| P10 | **Không có mức phạt riêng.** Trễ = tính lại theo bảng giá (P4). Viết lại khoản "30.000₫/ngày" trong ToS | L3 |
| P11 | Nhờ luật sư xem câu giới hạn trách nhiệm ở ToS mục 8 | L2(c) |
| P12 | **Hạn mức chỗ cho Lane 2**, kể cả trạng thái "hết chỗ" trên form | 11.4 |

### Nguồn (tra ngày 2026-09-19)

Đã mở và đọc trực tiếp: LuggageHero, Stasher FAQ, Easy Storage, Stashigo (chỉ có giá "từ 100.000₫/tháng"), trang Cà Mau, bài moit.gov.vn, hethongphapluat.com (Điều 559, 560), và ba tài liệu nội bộ. Các nguồn còn lại (Radical, Bounce, Nannybag, TfL, và trang văn bản Luật) **chỉ thấy trong kết quả tìm kiếm**, chưa mở đọc.

- LuggageHero, cách tính ngày và tính thêm khi quá 24 giờ: https://help.luggagehero.com/en/articles/8072712-understanding-daily-storage-with-luggagehero
- Stasher FAQ, cách đếm ngày, lấy trễ, kéo dài, hủy: https://stasher.com/faq
- Radical Storage, giá và điều kiện: https://radicalstorage.com/luggage-storage/da-nang
- Bounce (nguồn thứ cấp): https://thriftytraveler.com/reviews/bounce-luggage-storage/
- Easy Storage Đà Nẵng (Hana's Coworking), giá và điều kiện: https://hanacoworkingdanang.com/storage-in-da-nang/
- Stashigo, giá tại Đà Nẵng: https://stashigo.com/storage/da-nang
- Nannybag, giá tại Đà Nẵng: https://www.nannybag.com/en/luggage-storage/da-nang
- TfL, fare capping: https://tfl.gov.uk/fares/find-fares/capping
- Luật Bảo vệ quyền lợi người tiêu dùng 2023 (19/2023/QH15): https://tulieuvankien.dangcongsan.vn/he-thong-van-ban/van-ban-quy-pham-phap-luat/luat-bao-ve-quyen-loi-nguoi-tieu-dung-so-192023qh15-hieu-luc-thi-hanh-tu-ngay-0172024-9693
- Điều 25 (điều khoản không được ghi), tóm tắt: https://pbgdpl.camau.gov.vn/dieu-khoan-khong-duoc-phep-quy-dinh-trong-hop-dong-giao-ket-voi-nguoi-tieu-dung-hop-dong-theo-mau-dieu-kien-giao-dich-chung.5908
- Điều 26, 27 (niêm yết hợp đồng theo mẫu): https://moit.gov.vn/tin-tuc/bao-chi-voi-nguoi-dan/nhung-diem-moi-cua-luat-bao-ve-quyen-loi-nguoi-tieu-dung-2023-trong-kiem-soat-hop-dong-theo-mau-dieu-kien-giao-dich-chun.html
- Bộ luật Dân sự 2015, Điều 559: https://hethongphapluat.com/bo-luat-dan-su-2015/dieu-559
- Bộ luật Dân sự 2015, Điều 560: https://hethongphapluat.com/bo-luat-dan-su-2015/dieu-560
- Tài liệu nội bộ của bạn: `Stow_01_Product_Pricing.pdf`, `Stow_03_Operation.pdf`, `Stow_04_Risk_Management.pdf` (v1.0, 20/6/2026)

