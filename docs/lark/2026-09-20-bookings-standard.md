# Chuẩn dữ liệu bảng Bookings trên Lark (khớp với form đặt chỗ mới)

> **Trạng thái (2026-09-20): ĐÃ ÁP DỤNG trên bảng `Test`. CHƯA áp dụng cho bảng tổng `Bookings`. Code form và route đã commit và push lên `main` (`20be2fb`, `d9076f4`).**
> Cho đến khi bảng tổng được đồng bộ, route dùng đường thử lại bằng cột cũ (mục 3). Khi áp dụng cho bảng tổng, sửa dòng này. Bảng tổng lúc kiểm tra: 43 dòng, revision 380, chưa bị chạm.
>
> Người đọc: chủ cửa hàng. Script lặp lại các bước: [`standardize-bookings.py`](standardize-bookings.py).

## 1. Chuẩn mới

| Cột | Giá trị chuẩn |
|---|---|
| Lane | `Flexible` / `Flat Rate` / **`Custom`** (đúng 3 nhóm trong dropdown của form) |
| Plan | `By the Hour`, `By the Day`, `Mini`, `Strand`, `Long Stay`, **`Custom`** |
| Status | Đơn mới tự đặt **`Booking`**. View "Grid View" của bạn lọc `Status = Booking hoặc Paid`, nên trước đây đơn từ website không hiện cho đến khi có người đặt Status bằng tay |
| Duration | Độ dài ngắn gọn: `2 hours`, `1 day`, `1 week`, `1 month`, `4 months`, hoặc `Custom: 2× Strand (46 days)` |
| Phone | Quốc tế, không dấu cách: `+84905955161` (đa số dòng cũ đã đúng dạng này) |
| **Oversized Count** (cột mới, số) | Số bag cỡ lớn. Ô tick `Oversized` bật khi số này > 0 |
| **Price Detail** (cột mới, văn bản) | Cách tính tổng tiền, từng bước, giống bảng dưới tổng tiền trên form |
| Date (công thức) | Xem mục 3 |

## 2. Đã làm trên bảng Test (kiểm chứng từng bước với bản sao lưu)

1. **Công thức Date** sửa để hiểu `Custom`, mà kết quả cũ giữ nguyên (43/43 dòng khớp; chỉ 1 đơn Long Stay đã hủy trước để trống nay có ngày).
2. Thêm option **Custom** vào Plan và Lane (giữ nguyên option và màu cũ).
3. Thêm 2 cột **Oversized Count** và **Price Detail**.
4. Chuẩn hóa **47 ô**: 6 ô Duration (`1 hours`→`1 hour`, `Up to 1 month`→`1 month`, `Up to 1 week`→`1 week`, `Up to 4 months`→`4 months`, `1 × 4 months`→`4 months`), 3 số điện thoại đầu `00`→`+`, và `Oversized Count = 0` cho 38 dòng có ô tick "không".
5. Kiểm tra lại: không ô nào khác bị đổi. Chạy lại script trên Test báo "không còn gì để làm".

**Thử đầu-cuối** (route thật, chỉ ghi vào bảng Test, tin nhắn nhóm chat bị chặn): 3 dòng thử `STW-260921-6996` (By the Day), `STW-260921-3220` (Custom 46 ngày), `STW-260921-FALL` (đường thử lại bằng cột cũ). Tên khách là "TEST safe to delete", bạn có thể xóa cả 3.

## 3. Vì sao phải cẩn thận (những điều đã phát hiện)

- **Công thức Date phụ thuộc vào đúng chữ trong Duration** (`"1 × 4 months"`, `"2 × 4 months"`) và không có nhánh cho Long Stay hay Custom. Sửa Duration mà không sửa công thức là làm hỏng cột Date. Công thức mới: By the Hour / By the Day / Custom = ngày lấy; Mini +7 ngày; Strand và Long Stay = **cùng ngày 1 hoặc 4 tháng sau** cho đơn từ form mới (đơn có Pickup Time), còn đơn cũ giữ +30 và +120 ngày như trước; `2 × 4 months` = +240.
- **Cột select của Lark chỉ nhận option đã có.** Ghi `Custom` khi bảng chưa có option này là lỗi.
- **Cột không tồn tại làm hỏng cả dòng** (`FieldNameNotFound`, đã thử trên Test). Nếu deploy form mới khi bảng tổng chưa có 2 cột mới, lần ghi đầu bị từ chối.
- Vì vậy route có **đường thử lại**: nếu lần ghi đầu bị từ chối, nó ghi lại bằng các cột cũ (Custom được ghi thành gói chiếm nhiều tiền nhất, chi tiết vẫn nằm ở Duration) và ghi cảnh báo vào log. Đơn không bị mất, nhưng Date của dòng kiểu này theo gói được ghi, không theo Custom.

## 4. Áp dụng cho bảng tổng (khi bạn quyết định)

Thứ tự quan trọng: **đồng bộ bảng trước, deploy form sau.**

```bash
# cần Node >= 20.12 (nvm use v22.23.1) và lark-cli
python3 docs/lark/standardize-bookings.py --table tblTGHAMqIRiCOgd          # thử khô, chỉ đọc
python3 docs/lark/standardize-bookings.py --table tblTGHAMqIRiCOgd --apply \
  --backup-dir ~/stow-lark-backup --i-know-this-is-the-main-table
```

Thử khô trên bảng tổng ngày 2026-09-20 cho kế hoạch **y hệt Test**: đổi công thức Date, thêm Custom vào Plan và Lane, tạo 2 cột, chuẩn hóa 47 ô (38 + 3 + 6). Script sao lưu toàn bộ vào `--backup-dir` trước khi ghi và lưu giá trị cũ của từng thay đổi trong `undo-log.jsonl`.

## 5. Để nguyên, cần bạn quyết

- **7 số điện thoại thiếu mã quốc gia** (ví dụ `0904…`, `3459…`, `84`): không thể đoán an toàn nên không đổi. Có một số chỉ có `84`. Cần hỏi lại khách hoặc bạn tự sửa.
- **Duration `2 × 4 months`** (đơn 6.000.000 ₫ đang Paid): không có nhãn ngắn tương đương ngoài Custom, công thức Date vẫn hiểu nhãn này.
- **Duration `Min 1 hr, billed per hr`** (đơn nhân viên nhập): không phải độ dài thực.
- 2 dòng trống và dòng "Doanh thu cũ": không đụng.
- Các cột của riêng bạn (`Extand`, `Extand1`, `Extand 2`, `Discount`, `Note`, `Thực nhận`): không đụng.

## 6. Code đã đổi (đã push lên `main`)

- [`src/lib/lark-booking.ts`](../../src/lib/lark-booking.ts): quy tắc chuẩn hóa (điện thoại, Duration, Status, bản ghi đầy đủ và bản cột cũ, tin nhắn nhóm chat), 13 test.
- [`src/app/api/lark/booking/route.ts`](../../src/app/api/lark/booking/route.ts): dùng module trên, tự thử lại bằng cột cũ.
- [`HeroBookingForm.tsx`](../../src/components/booking/HeroBookingForm.tsx): Custom ghi `Custom` + gói dự phòng, điện thoại gọn, gửi `priceDetail`.
- [`send-agreement/route.ts`](../../src/app/api/send-agreement/route.ts): hiểu lane `custom` (email đang tắt).
- Form nhân viên `IntakeForm.tsx` **không sửa**; nó được chuẩn hóa ở route (Duration cũ như `Up to 1 month`, điện thoại, Status).
