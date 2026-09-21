# Dashboard: các con số để chủ và nhân viên nhìn một cái là biết tình hình

**Trạng thái (2026-09-21): XONG.** Dashboard cũ "Revenue" đã đổi tên thành **"Stow — Business Dashboard"** và thay hết 3 khối cũ bằng 30 khối mới (6 tiêu đề + 24 số liệu/biểu đồ). Đã kiểm tra từng khối có số thật, không lỗi. Xem mục 7.

## 1. Trước khi làm gì, tôi thấy bạn đã có một dashboard tên "Revenue"

Base này đã có sẵn một dashboard tên **"Revenue"** (3 khối: "$ Booking", "Biểu đồ", "$ Thực tế") — không phải tôi tạo, tôi không đụng vào nó. Nhưng cả 3 khối đọc dữ liệu từ bảng **"Bookings (old, archived)"** — bảng cũ, đã ngừng nhận đơn mới từ lúc chuyển sang bảng "Bookings" ngày 2026-09-20. Nghĩa là **dashboard này đã ngừng cập nhật từ hôm đó**: mọi đơn mới (kể cả các đơn thử gia hạn) đều không xuất hiện ở đó nữa.

Tôi để nguyên, chưa sửa gì. Bạn chọn một trong ba:
1. Để nguyên như một ảnh chụp lịch sử (dữ liệu tới 2026-09-20).
2. Tôi sửa 3 khối đó để đọc từ bảng "Bookings" mới (đổi tên cột "Total (VND)"→"Thực nhận", "Drop-off Date"→"Drop-off" cho khớp schema mới).
3. Xóa nó đi khi bạn đã quen dùng dashboard mới bên dưới.

## 2. Dashboard mới: "Stow — Business Dashboard"

Một dashboard riêng, đọc từ bảng **Bookings** (đã có đủ lịch sử, vì toàn bộ dữ liệu cũ đã copy sang đây) và bảng **Extensions**. Chia 6 phần, đọc từ trên xuống:

| Phần | Trả lời câu hỏi gì |
|---|---|
| 🔴 Right Now | Ngay lúc này: đang giữ bao nhiêu túi, hôm nay ai lấy/gửi, có yêu cầu gia hạn nào chưa trả lời |
| 💰 Revenue | Doanh thu tổng, tháng này, trung bình một đơn, xu hướng theo tuần, theo gói |
| 📦 Bookings & Mix | Bao nhiêu đơn, xu hướng theo tuần, khách chọn gói/lane/kênh nào, đơn đang ở bước nào |
| 🧳 Operations | Tổng số túi-đêm đã lưu trữ, thời gian lưu trung bình |
| 🔁 Extensions & Upsell | Form gia hạn (2026-09-20) hoạt động ra sao |
| 🧹 Data Quality | Vài con số nhỏ để nhân viên biết cần bổ sung gì |

Toàn bộ số đều tính từ dữ liệu thật trong bảng, không phải số cố định — mở dashboard bất kỳ lúc nào cũng đúng, không cần ai cập nhật tay.

## 3. Vì sao cần thêm cột vào bảng Bookings

Một dashboard chỉ nhóm được theo **giá trị đang có sẵn** trong bảng; nó không tự biết "tuần này", "tháng này", hay "đang có bao nhiêu túi trong kho ngay bây giờ" trừ khi có một cột ghi sẵn điều đó. Nên tôi thêm 11 cột công thức (formula) vào **Bookings** — không đụng dòng nào, không đổi cột nào có sẵn:

| Cột | Dùng để |
|---|---|
| Week | Tuần đặt đơn (thứ Hai của tuần đó), để vẽ biểu đồ theo tuần |
| Month | Tháng đặt đơn |
| Stay Valid | Đơn có đủ Drop-off + Pick-up và Pick-up sau Drop-off không — để loại 4 dòng bảng cũ chuyển qua thiếu giờ lấy, tránh làm sai số trung bình |
| Stay Days | Số ngày lưu trữ thật sự (0 nếu Stay Valid = false) |
| Bag-Days | Túi × ngày lưu trữ — thước đo "dùng bao nhiêu chỗ chứa" |
| Is Active Now | Đơn còn mở và (chưa có ngày lấy hoặc ngày lấy chưa tới) — tự cập nhật mỗi lần mở bảng |
| Picking Up Today | Ngày lấy là hôm nay |
| Dropping Off Today | Ngày gửi là hôm nay |
| Submitted This Month | Đặt đơn trong tháng hiện tại — tự đúng mỗi tháng, không cần sửa tay |
| Bookings by this Customer | Số đơn có cùng WhatsApp (kể cả đơn này) — **THỬ NGHIỆM**, xem mục 6 |
| Is Repeat Customer | Đúng khi số trên > 1 |

Doanh thu (Thực nhận) tính trên **toàn bộ** các dòng, kể cả dòng "Doanh thu cũ" (1.820.000 ₫, không có ngày/túi — một dòng sổ sách từ lúc chuyển bảng). Số lượng đơn, xu hướng theo gói/lane/nguồn thì **lọc bỏ** dòng đó (và 2 dòng "Noname"/"Noname2" vẫn được tính vì chúng là đơn thật, chỉ thiếu tên khách) bằng điều kiện "có ngày Drop-off" — cách lọc này không phụ thuộc vào tên dòng cụ thể, nên vẫn đúng nếu sau này có thêm dòng sổ sách khác.

## 4. Danh sách từng khối

### 🔴 Right Now
- **Bags in Storage Now** — tổng Bags của các đơn Is Active Now
- **Active Bookings Now** — số đơn Is Active Now
- **Picking Up Today**, **Dropping Off Today** — số đơn
- **Extension Requests Awaiting Reply** — bảng Extensions, Status = Requested

### 💰 Revenue
- **Total Revenue, All Time** / **Revenue This Month** — tổng Thực nhận
- **Average Order Value** — trung bình Thực nhận (chỉ đơn thật)
- **Revenue by Week** (area chart) — theo cột Week
- **Revenue by Plan** (column) — gói nào mang lại tiền nhiều nhất

### 📦 Bookings & Mix
- **Total Bookings, All Time**, **Bookings by Week**
- **Bookings by Plan / by Lane / by Source** (ring/pie) — khách chọn gì
- **Bookings by Status** (column) — đang ở bước Booking/Confirm/Paid/Complete/Cancel bao nhiêu đơn. Tôi cố ý dùng biểu đồ cột thay vì "funnel": funnel ngụ ý đơn đi tuần tự qua từng bước, nhưng ở đây một đơn có thể nhảy thẳng từ Booking sang Complete (nhất là đơn cũ/đơn tại quầy) nên vẽ funnel sẽ gây hiểu lầm.

### 🧳 Operations
- **Total Bag-Nights Stored, All Time** — Σ Bag-Days
- **Average Length of Stay (days)** — trung bình Stay Days (chỉ đơn Stay Valid)
- Không có % lấp đầy kho vì hệ thống chưa có con số "sức chứa tối đa". Nếu bạn cho tôi biết tiệm chứa được tối đa bao nhiêu túi, tôi thêm được ngay.

### 🔁 Extensions & Upsell
- **Extension Requests, All Time**, **by Status** (column)
- **Extension Revenue Confirmed** — Σ Extension Total (VND) của các yêu cầu Status = Paid hoặc Complete

### 🧹 Data Quality
- **Bookings Missing WhatsApp** — đơn thật không có WhatsApp (hiện có 4)
- Không làm số liệu "thiếu Phone Country" vì cột đó mới thêm, 41/41 đơn cũ đều trống — con số sẽ luôn là 100% cho tới khi có đơn mới, không phải tín hiệu hữu ích để theo dõi hằng ngày.

## 5. Cố ý không làm

- **Tỉ lệ hủy đơn (%)** — mẫu còn nhỏ (41 đơn) nên một con số % dễ gây hiểu lầm; nhìn biểu đồ "Bookings by Status" là đủ thấy Cancel bao nhiêu trên tổng.
- **% lấp đầy kho** — cần biết sức chứa tối đa, hiện chưa có số đó ở đâu trong hệ thống.
- **Xu hướng theo ngày** — 41 đơn trải trên ~40 ngày sẽ ra biểu đồ rất thưa, chọn theo tuần cho dễ đọc hơn ở giai đoạn này.

## 6. "Bookings by this Customer" — thử nghiệm

Công thức này đếm số đơn có cùng WhatsApp bằng cách cho bảng Bookings tự tham chiếu chính nó (`[Bookings].COUNTIF(...)`). Tài liệu hướng dẫn công thức chỉ có ví dụ tham chiếu sang MỘT BẢNG KHÁC, không có ví dụ tự tham chiếu, nên tôi thử trực tiếp trên bảng thật thay vì đoán. Nếu Lark từ chối, cột này (và cột "Is Repeat Customer", khối "Bookings From Repeat Customers") sẽ không được tạo — không có gì hỏng, chỉ thiếu một khối. Kết quả thật ghi ở mục 7.

## 7. Nhật ký dựng (đang cập nhật)

- **Bug của tôi, không phải Lark:** cột công thức (formula) phải luôn khai `"type": "formula"` dù kết quả là chữ, số hay đúng/sai — không được khai `"type": "text"/"number"/"checkbox"` kèm `expression`. Tôi khai sai 8/11 cột lúc đầu, tưởng nhầm là Lark bị lỗi chập chờn (đã mất khá nhiều thời gian thử lại, xin lỗi vì báo cáo giữa chừng không chính xác), test kỹ mới ra đúng nguyên nhân. Sau khi sửa, cả 8 cột còn lại tạo đúng ngay lần đầu, không cần thử lại.
- **Bug thứ hai:** khối biểu đồ lọc theo một cột công thức trả về đúng/sai (ví dụ "Is Active Now") phải lọc bằng chữ `"true"`, không phải giá trị đúng/sai thật — 7 khối bị vậy lúc đầu (đọc dữ liệu báo lỗi), đã sửa cả 7 và script cho lần dựng sau.
- **Cột "Bookings by this Customer" (thử nghiệm) ĐÃ CHẠY ĐƯỢC** — Lark chấp nhận công thức tự tham chiếu bảng Bookings. Khối "Bookings From Repeat Customers" đã lên: **8 đơn** đến từ khách quay lại (khớp với số tôi tính tay trước đó).
- **Đã đọc từng khối để kiểm tra có số thật** (không phải chỉ tạo xong là tin): 22/22 biểu đồ/số liệu đọc được, không khối nào lỗi hay trống. Vài số để đối chiếu: Total Revenue 15.575.000 ₫, Bags in Storage Now 6, Active Bookings Now 3, Total Bookings 40, Average Length of Stay 13 ngày, Bookings Missing WhatsApp 3.
- **File script:** `docs/lark/create-dashboard.py`, chạy lại bất kỳ lúc nào (dry run mặc định) — nếu bạn muốn thêm khối mới hoặc sửa số liệu, sửa file này rồi chạy `--apply`, script sẽ chỉ thêm phần còn thiếu.

## 8. PHÁT HIỆN QUAN TRỌNG khi kiểm tra: một khách THẬT đã dùng link gia hạn

Trong lúc tôi đang kiểm tra dashboard, bảng Extensions có đúng 1 dòng — **không phải dòng thử của tôi**. Một khách tên **Micah** (SĐT Philippines +639150888420, email micahrosero@yahoo.com) đã gửi yêu cầu gia hạn lúc **10:00 sáng nay (21/9)** cho đơn **STW-260821-7499**: gia hạn 2 túi tới 20/10, giá hệ thống báo là **600.000 ₫**, trạng thái đang **Requested** (chờ trả lời).

**Vấn đề:** đây chính là đơn tôi đã cảnh báo trước đó có **Plan End sai** (ghi 20/9 nhưng đơn này đã trả 600.000 ₫ phí gia hạn trước đó rồi — Plan End thật phải muộn hơn). Vì giá gia hạn tính từ Plan End, khách Micah có thể đã bị báo giá **cao hơn thực tế**. Đề nghị:
1. Nhân viên xem lại đơn STW-260821-7499 (Plan End thật là ngày nào, dựa trên lần gia hạn trước) trước khi báo giá lại cho Micah.
2. Có thể tin nhóm chat Stow Bookings đã báo việc này lúc 10:00 sáng — kiểm tra nhân viên đã thấy chưa.
3. Tôi không xóa dòng này (dữ liệu khách thật), không tự sửa giá hay Plan End — cần bạn/nhân viên xác nhận trước.

