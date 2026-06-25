# Hướng dẫn phát triển — LinkMarket

Tài liệu này dành cho việc tiếp tục code dự án. Đọc kèm [README.md](../README.md).

---

## 1. Khởi động nhanh trên máy mới

```bash
git clone https://github.com/happylot/linkmarket.git
cd linkmarket
npm install
npm run dev      # mở http://localhost:3000
```

Yêu cầu: **Node.js 20+** (CI dùng Node 20).

---

## 2. Mô hình dữ liệu hiện tại

Tất cả kiểu nằm trong [`src/lib/types.ts`](../src/lib/types.ts).

### `Listing` — một website rao bán chỗ đặt backlink
| Field | Ý nghĩa |
|---|---|
| `domain`, `publisherName` | Tên miền & nhà xuất bản |
| `niche[]` | Lĩnh vực (Technology, Finance, ...) |
| `domainAuthority`, `organicTraffic`, `spamScore` | Chỉ số SEO |
| `turnaroundDays` | Số ngày hoàn thành |
| `price`, `linkType` | Giá, Dofollow/Nofollow |
| `contentOptions[]` | Buyer tự viết / Publisher viết / Thuê viết (+phí) |
| `rating`, `reviewCount`, `verified` | Đánh giá & xác thực |

### `Order` — một đơn đặt hàng
Gồm `listingId`, `domain`, `price`, `contentOption`, brief (`briefTitle`, `briefNotes`, `targetUrl`, `anchorText`), `status`, `createdAt`.

Trạng thái: `Pending Review → In Progress → Published` (hoặc `Revision Requested`).

> **Dữ liệu mẫu** nằm trong [`src/lib/data.ts`](../src/lib/data.ts) (12 listing). Đây là chỗ đầu tiên cần thay bằng API thật.

---

## 3. Quản lý đơn hàng (tạm thời)

[`src/lib/orders-context.tsx`](../src/lib/orders-context.tsx) là một React Context:
- Đọc/ghi mảng `Order` vào `localStorage` key `linkmarket.orders`.
- `OrderForm` gọi `addOrder()`, `dashboard` đọc `orders`.

⚠️ Dữ liệu chỉ tồn tại trên trình duyệt của người dùng đó. Khi làm backend, thay context này bằng API client (fetch/React Query) là xong, các component dùng `useOrders()` gần như không phải đổi.

---

## 4. Khi thêm listing/route mới — nhớ static export

Dự án deploy dạng **static export** (`output: 'export'`). Vì vậy:

- **Route động mới** (ví dụ `/publisher/[id]`) **bắt buộc** có `generateStaticParams()` trả về toàn bộ id, và nên đặt `export const dynamicParams = false;`. Xem mẫu ở [`src/app/marketplace/[id]/page.tsx`](../src/app/marketplace/[id]/page.tsx).
- **Không dùng** API routes (`route.ts`), `cookies()`, `headers()`, middleware động, hay `next/image` với loader mặc định — những thứ này cần server. (Ảnh đã đặt `images.unoptimized = true`.)
- Nếu sau này cần các tính năng server → **chuyển host sang Vercel** và bỏ `output: 'export'` + `basePath`.

---

## 5. basePath / đường dẫn

`next.config.ts` set `basePath = /linkmarket` khi production (vì Pages chạy ở `happylot.github.io/linkmarket`).

- Dùng `<Link href="/marketplace">` — Next tự thêm prefix, **không** tự viết `/linkmarket/...`.
- Với ảnh/asset tĩnh trong `public/`, nếu tham chiếu thủ công nhớ prefix basePath (hoặc dùng import).

Nếu đổi tên repo → sửa biến `repo` trong `next.config.ts`.

---

## 6. Quy trình làm việc đề xuất

```bash
git checkout -b feature/ten-tinh-nang
# ... code ...
npm run build        # đảm bảo static export không lỗi trước khi push
git add -A
git commit -m "mô tả"
git push -u origin feature/ten-tinh-nang
# mở Pull Request về main; merge vào main sẽ tự deploy
```

Build phải pass `npm run build` trước khi push, vì CI sẽ fail nếu export lỗi.

---

## 7. Việc cần làm tiếp (chi tiết)

### Ưu tiên cao
1. **Backend + DB**: dựng schema cho `User`, `Listing`, `Order`. Gợi ý: Supabase (nhanh, có auth + Postgres) hoặc Next.js + Prisma trên Vercel.
2. **Auth & vai trò**: Buyer / Publisher / Admin.
3. **Trang Publisher**: form đăng website, dashboard quản lý đơn nhận được, cập nhật trạng thái đơn.

### Ưu tiên trung bình
4. **Thanh toán**: Stripe Checkout + cơ chế escrow (giữ tiền tới khi bài published).
5. **Tìm kiếm/lọc nâng cao**: phân trang, lọc nhiều niche cùng lúc, lọc theo quốc gia/ngôn ngữ.
6. **Reviews thật**: buyer đánh giá publisher sau khi đơn hoàn thành.

### Nice to have
7. Messaging buyer ↔ publisher.
8. Email thông báo trạng thái đơn.
9. Trang Admin duyệt listing & xử lý tranh chấp.

---

## 8. Liên kết nhanh

- Tài liệu kế hoạch hệ thống: [`Ke-hoach-He-thong-Ve-tinh-800-Domain.md`](../Ke-hoach-He-thong-Ve-tinh-800-Domain.md)
- Workflow deploy: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
- Next.js static export: https://nextjs.org/docs/app/guides/static-exports
