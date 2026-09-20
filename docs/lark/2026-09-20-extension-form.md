# Form gia hạn: khách xin để hành lý lâu hơn

**Trạng thái (2026-09-20):** code, bảng Lark và bài kiểm tra đã xong, **chưa bật trên website thật**. Chưa commit. Các bước bật nằm ở mục 5.

Khách đang có đơn muốn giữ hành lý thêm. Nhân viên gửi cho họ một đường link. Khách mở link và chỉ trả lời **hai câu hỏi**: giữ mấy túi, và ngày lấy mới. Tên, WhatsApp, email khách không phải gõ lại: hệ thống lấy từ đơn của họ.

## 1. Cách nó chạy (để giải thích cho khách hàng của bạn)

1. **Nhân viên gửi link.** Link có mã đơn của khách: `https://www.stowdanang.com/extend/STW-260921-K7M2QX`. Nhân viên lấy link từ cột "Extend Link" trong bảng Bookings (mục 5, bước 2), dán vào WhatsApp.
2. **Khách mở link.** Trang tự nhận ra đơn nhờ mã trong link. Khách thấy đơn của mình để tự kiểm tra: mã đơn, tên (đầy đủ), WhatsApp và email (che bớt), số túi, ngày lấy hiện tại. Nếu không phải đơn của mình, có nút nhắn WhatsApp cho Stow.
3. **Khách trả lời hai câu hỏi.** Số túi muốn gia hạn (không hỏi nếu đơn chỉ có 1 túi) và ngày lấy mới (chỉ chọn được ngày sau ngày lấy hiện tại).
4. **Hệ thống kiểm tra trước khi lưu.** Đơn phải tồn tại và còn mở (không phải Complete hay Cancel), số túi không vượt số túi đã đặt, ngày hợp lệ. Sai thì khách thấy câu giải thích rõ và nút WhatsApp, **không lưu gì cả**, nên không có yêu cầu nào nằm đó mà không ai liên lạc được.
5. **Lưu vào bảng Extensions.** Mỗi yêu cầu là một dòng: mã đơn, số túi, ngày mới, giờ gửi. Tên, WhatsApp, email được sao chép từ dòng đơn (đúng từng ký tự). Kèm số túi đã đặt, ngày lấy hiện tại, ngày hết gói (Plan End) và số ngày ngày mới vượt quá gói đã trả. Dòng có liên kết tới đúng dòng đơn trong Bookings. Trạng thái bắt đầu là "Requested".
6. **Báo ngay vào nhóm chat Stow Bookings.** Tin đầy đủ: yêu cầu, đơn hiện tại (gói, ngày gửi, ngày lấy, Plan End, số túi, tổng tiền, trạng thái) và liên hệ (tên, WhatsApp, email) đầy đủ, chia phần giống tin đặt đơn.
7. **Khách thấy "Request sent".** Stow nhắn WhatsApp để xác nhận giá và giờ lấy.
8. **Nhân viên làm nốt như hiện nay** (mục 4).

## 2. Khách thấy gì

Trang có nền xanh đậm cùng kiểu với form đặt chỗ. Nếu không mở được form, khách đọc một câu ngắn và có nút "Message Stow on WhatsApp" (tin nhắn có sẵn mã đơn):

| Tình huống | Khách thấy |
|---|---|
| Link sai dạng | This link does not look right |
| Không có đơn với mã đó | We cannot find this booking |
| Đơn đã Complete hoặc Cancel | This booking is already finished |
| Đơn không có cả WhatsApp lẫn email | Please message us to extend this booking |
| Lark không trả lời | We could not load your booking (thử lại sau) |
| Chưa cấu hình trên website | This page is not available right now |

Trang chỉ có tiếng Anh (giống form nhân viên). Bản ko/ja chưa làm.

**Che bớt thông tin:** WhatsApp chỉ hiện 4 số cuối (`+XXXXXXX5161`). Email hiện phần đầu, giấu phần giữa, giữ tên miền (`mackas****@hotmail.com`), luôn giấu ít nhất 3 ký tự. Tên hiện đầy đủ để khách biết tên đã ghi đúng chưa. Việc che làm trên máy chủ: số điện thoại và email đầy đủ không bao giờ tới trình duyệt của khách.

## 3. Bảng "Extensions" (`tblTiHwZ2rIHKASc`)

| Cột | Ai điền | Ý nghĩa |
|---|---|---|
| Booking ID | Form | Mã đơn từ link. Cột đầu tiên |
| Status | Form, rồi nhân viên | Requested, Confirm, Paid, Complete, Cancel (cùng cách dùng như bảng Bookings) |
| Submitted at | Tự động | Lúc khách gửi |
| Bags to Extend | Form (khách) | Số túi muốn gia hạn |
| New Pick-up Date | Form (khách) | Ngày lấy mới. Chỉ ngày; giờ thỏa thuận qua WhatsApp |
| Name, WhatsApp, Email | Form (sao từ đơn) | Đúng như trong dòng đơn, không sửa định dạng |
| Booking | Form | Liên kết một chiều tới đúng dòng trong Bookings (bấm để mở đơn) |
| Bags Booked | Form (từ đơn) | Số túi của đơn lúc khách gửi |
| Pick-up Now | Form (từ đơn) | Ngày giờ lấy của đơn lúc khách gửi |
| Plan End | Form (từ đơn) | Gói đã trả kết thúc lúc nào |
| Days Past Plan End | Form (tính) | Ngày mới vượt Plan End bao nhiêu ngày. 0 = vẫn trong gói đã trả. Trống nếu đơn không có Plan End |
| Note | Nhân viên | Ghi chú |
| Row No. | Tự động | Số Lark không bao giờ lặp |

View **To do** chỉ hiện các yêu cầu còn "Requested". Một đơn có thể có nhiều yêu cầu (gia hạn nhiều lần, hoặc gia hạn từng phần số túi). Gửi trùng đúng một yêu cầu (bấm hai lần) chỉ lưu một dòng.

## 4. Nhân viên xử lý một yêu cầu

1. Thấy tin trong nhóm chat, hoặc mở view **To do**.
2. Nhắn khách qua WhatsApp: báo giá gia hạn và giờ lấy. **Form không báo giá** vì khi chỉ gia hạn một số túi, phụ phí túi cồng kềnh không tính chắc được. Giá do nhân viên quyết như hiện nay.
3. Khách đồng ý: chuyển Status sang **Confirm**. Khách trả tiền: **Paid**.
4. Cập nhật dòng đơn trong Bookings như trước: Pick-up, Plan End, **Extension Fee** (tiền nằm ở một chỗ duy nhất, cột "Thực nhận" vẫn đúng). Bấm cột Booking để mở đúng dòng.
5. Xong: Status **Complete**. Khách rút lại: **Cancel**.

## 5. Đưa vào chạy, và cách quay lại

Bảng Extensions đã tạo. Còn lại, theo thứ tự:

1. **Biến trên Vercel** (chạy trong terminal của bạn; giống lần trước, tôi bị chặn khi tự đổi biến Production). Đặt biến **trước**, rồi mới push, vì mỗi lần build lấy biến lúc đó:
   ```bash
   export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"
   cd ~/Projects/nhu-luggage
   vercel env add LARK_EXTENSIONS_TABLE_ID production --value tblTiHwZ2rIHKASc
   ```
   Form cần thêm `LARK_BOOKINGS_SCHEMA=2` (đã đặt) và các biến LARK_* cũ (đã có). Thiếu bất kỳ biến nào, trang chỉ báo "not available", không ghi vào đâu cả.
2. **Cột "Extend Link" cho nhân viên** (thêm một cột công thức vào bảng Bookings, không đổi dòng nào, không đổi cột nào khác):
   ```bash
   python3 docs/lark/create-extensions.py --add-extend-link           # xem trước
   python3 docs/lark/create-extensions.py --add-extend-link --apply   # thêm cột
   ```
   Không có cột này vẫn dùng được: nhân viên gõ `https://www.stowdanang.com/extend/` rồi dán mã đơn.
3. **Push code** (deploy tự chạy).
4. **Thử một yêu cầu thật** trên `www.stowdanang.com/extend/<mã một đơn còn mở>`. **Báo nhân viên trước**, vì tin sẽ vào nhóm chat thật. Kiểm tra: dòng có trong bảng Extensions với đủ số liệu, tin trong nhóm đủ ba phần. Rồi xóa dòng thử. (Tin nhóm chat **chưa được thử** lúc phát triển vì tôi tắt nó để không làm phiền nhân viên; lần thử này là lần đầu.)

**Quay lại:** `vercel env rm LARK_EXTENSIONS_TABLE_ID production --yes` rồi deploy lại. Trang sẽ báo "not available", mọi thứ khác không đổi. Bảng Extensions và các dòng trong đó giữ nguyên.

## 6. Riêng tư và an toàn

- **Link riêng, không lên Google.** Không nằm ở đâu trên website, không có trong sitemap, `robots.txt` cấm `/extend`, trang có `noindex`, và gửi `Referrer: no-referrer` để mã đơn không lọt sang trang khác.
- **Mã đơn là chìa khóa.** Mã mới (`STW-260921-K7M2QX`) có khoảng 387 triệu khả năng mỗi ngày nên không đoán được. Mã cũ 4 số (`STW-260821-7499`, 36 trong 40 đơn hiện có) chỉ có 10.000 khả năng mỗi ngày. Chỉ đơn **còn mở** mới hiện thông tin (hiện chỉ có 5 đơn), và chỉ hiện tên, số điện thoại/email đã che, số túi và ngày lấy. Ai đoán trúng mã cũ sẽ thấy tên khách. Nếu lo, thêm giới hạn số lần thử trên Vercel (Firewall > Rate limiting).
- **Máy chủ tự đọc đơn** từ Lark; không tin dữ liệu từ trình duyệt ngoài mã đơn, số túi và ngày. Mã đơn được kiểm tra dạng chặt trước khi dùng trong truy vấn.
- **Không lưu gì cho đơn không có thật.**
- Website đọc bảng Bookings qua API `base/v3` với cùng ứng dụng Lark đang dùng để ghi đơn; **không cần thêm quyền** nào.

## 7. Đã kiểm tra những gì

- 62 bài test mới trong `src/lib/extension.test.ts` (tổng 159 bài đạt): dạng mã đơn, giờ Việt Nam, đọc dữ liệu Lark, chọn đúng dòng khi một mã có hai dòng (đơn gia hạn kiểu cũ, đơn Cancel trùng), khoảng ngày cho phép, số túi, che thông tin, phát hiện gửi trùng, dòng ghi vào Lark, nội dung tin nhóm chat.
- Bản build production chạy cục bộ, với **bảng Lark thật** và tắt tin nhóm chat: các yêu cầu sai (11 kiểu) đều bị từ chối và không ghi gì; một yêu cầu đúng được lưu; gửi lại y hệt chỉ lưu một dòng; yêu cầu khác cho cùng đơn là dòng mới. Số liệu trong dòng đúng (số ngày vượt Plan End 4 và 6), liên kết trỏ đúng dòng đơn, tên/WhatsApp/email sao chép giống hệt nguồn. Đã xem giao diện trên điện thoại và máy tính, và kiểm tra HTML của trang không chứa số điện thoại hay email đầy đủ. Các dòng thử đã xóa (bản sao lưu ở `~/stow-lark-backup/extension-form-2026-09-20/`).
- Bộ chọn ngày dùng chung với form đặt chỗ được thêm chế độ "chỉ ngày"; form đặt chỗ đã xem lại, hoạt động như cũ.

## 8. Giới hạn và việc còn để ngỏ

- **Không có giá trên form.** Nhân viên báo giá (mục 4). Có thể thêm ước tính sau nếu chủ tiệm chốt quy tắc cho gia hạn từng phần.
- **Chỉ hỏi ngày, không hỏi giờ.** Giờ thỏa thuận qua WhatsApp.
- **Các đơn chuyển từ bảng cũ** lưu giờ lấy là 00:00 (bảng cũ không ghi giờ). Trang và tin nhóm chat bỏ chữ "at 00:00", chỉ ghi ngày.
- **Đơn không có số túi** (bảng cũ có 3 dòng): khách chọn tới tối đa 20 túi (giới hạn của form đặt chỗ) và nhân viên kiểm lại.
- **Đơn không có WhatsApp lẫn email**: không nhận yêu cầu, khách được chuyển sang WhatsApp.
- Chưa có bản ko/ja. Chưa có giới hạn số lần thử ở phía website.
- Đơn kiểu cũ dùng hai dòng cho một mã (gia hạn thành dòng thứ hai): form dùng dòng còn mở có ngày lấy muộn nhất.
