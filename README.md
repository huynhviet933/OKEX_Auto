# OKEX_Auto
================================================================================
HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY TOOL AUTO STAKE/UNSTAKE (P2.JS)
================================================================================

1. YÊU CẦU HỆ THỐNG
- Đã cài đặt Node.js (Phiên bản 18 trở lên).
- Có kết nối internet ổn định.

2. CÀI ĐẶT THƯ VIỆN (Mở CMD/Terminal tại thư mục tool và chạy lệnh sau):
npm install ethers axios readline-sync https-proxy-agent socks-proxy-agent

3. CHUẨN BỊ CÁC FILE DỮ LIỆU (Tạo trong cùng thư mục với p2.js):
- pk.txt: Mỗi dòng 1 Private Key ví.
- proxy.txt: Mỗi dòng 1 proxy (Định dạng: http://user:pass@ip:port hoặc socks5://ip:port).
- user_agents.txt: Mỗi dòng 1 chuỗi User-Agent (Có thể copy từ trình duyệt).
- license.txt: (Tự động tạo) Lưu key bản quyền sau lần nhập đầu tiên.
- config.json: File cấu hình thông số (Ví dụ bên dưới):
{
  "threads": 5,
  "maxGasGwei": 50,
  "cycleHours": 24,
  "stake": { "min": 0.01, "max": 0.05 },
  "unstake": { "min": 0.01, "max": 0.05 }
}

4. CƠ CHẾ HOẠT ĐỘNG CỦA TOOL:
- Bước 1: Xác thực Key License qua HWID máy tính.
- Bước 2: Stake ETH -> eXETH (theo dải min/max trong config).
- Bước 3: Nghỉ 3 phút (180s) chờ mạng lưới xác nhận.
- Bước 4: Unstake eXETH -> ETH (theo dải min/max trong config).
- Bước 5: Nghỉ 3 phút (180s).
- Bước 6: Claim ETH về ví.
- Bước 7: Sau khi chạy hết danh sách ví, tool đếm ngược 24h (hoặc theo cycleHours) rồi lặp lại.

5. CÁCH CHẠY TOOL:
- Cách 1 (Chạy trực tiếp): node p2.js
- Cách 2 (Chạy qua PM2 để treo 24/7): 
  + Cài PM2: npm install pm2 -g
  + Chạy tool: pm2 start p2.js --name "Tool-Staking"
  + Xem log: pm2 logs Tool-Staking

6. LƯU Ý QUAN TRỌNG:
- Tool có tính năng "Hot Reload": Bạn có thể sửa file proxy.txt hoặc config.json ngay khi tool đang chạy, nó sẽ tự cập nhật ở vòng lặp/ví tiếp theo.
- Nếu lỗi Proxy: Tool sẽ tự động thử lại (Max 2 lần) trước khi bỏ qua ví đó để tránh treo luồng.
- Bảo mật: Tuyệt đối không chia sẻ file pk.txt và license.txt cho người lạ.
================================================================================
