# LinkMarket

> Marketplace mua bán **backlink & content sourcing** — kết nối publisher (chủ website) với buyer (marketer/brand) cần đặt backlink, guest post.

Lấy ý tưởng chức năng từ mô hình marketplace backlink (kiểu icopify), nhưng **giao diện, thương hiệu và toàn bộ code là tự xây mới** — dark theme hiện đại, không sao chép layout/nội dung gốc.

🔗 **Demo (GitHub Pages):** https://happylot.github.io/linkmarket/
📦 **Repo:** https://github.com/happylot/linkmarket

---

## 🧱 Tech stack

| Thành phần | Công nghệ |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Ngôn ngữ | TypeScript |
| Styling | Tailwind CSS v4 |
| State đơn hàng | React Context + `localStorage` (chưa có backend) |
| Deploy | GitHub Pages (static export) qua GitHub Actions |

---

## 🚀 Chạy local

```bash
# Cài dependencies (nếu máy mới / chưa có node_modules)
npm install

# Chạy dev server (http://localhost:3000)
npm run dev

# Build production (static export ra thư mục ./out)
npm run build

# Lint
npm run lint
```

> **Lưu ý khi build local:** `next.config.ts` bật `basePath = /linkmarket` khi `NODE_ENV=production`.
> - `npm run dev` → không có basePath, chạy bình thường ở `/`.
> - `npm run build` → output ở `/linkmarket` (đúng cho GitHub Pages). Nếu mở file `out/index.html` trực tiếp sẽ lỗi asset; muốn xem thử bản build hãy serve qua một static server giả lập đường dẫn `/linkmarket`.

---

## 📁 Cấu trúc thư mục

```
src/
├── app/
│   ├── layout.tsx              # Layout gốc: Navbar + Footer + OrdersProvider, dark theme
│   ├── page.tsx                # Landing page (hero, stats, featured, how-it-works, CTA)
│   ├── globals.css             # Tailwind + biến theme (nền tối)
│   ├── marketplace/
│   │   ├── page.tsx            # Trang duyệt listing + bộ lọc (client component)
│   │   └── [id]/page.tsx       # Trang chi tiết listing + form đặt hàng
│   └── dashboard/
│       └── page.tsx            # Bảng quản lý đơn hàng của buyer
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ListingCard.tsx         # Card hiển thị 1 website trong marketplace
│   └── OrderForm.tsx           # Form đặt hàng (client) → lưu vào OrdersContext
└── lib/
    ├── types.ts                # Kiểu Listing, Order, Niche...
    ├── data.ts                 # DỮ LIỆU MẪU (12 listing) — thay bằng API sau
    └── orders-context.tsx      # Context lưu/đọc đơn hàng từ localStorage

.github/workflows/deploy.yml    # CI build + deploy GitHub Pages
public/.nojekyll                # Để Pages phục vụ thư mục _next
Ke-hoach-He-thong-Ve-tinh-800-Domain.md   # Tài liệu kế hoạch hệ thống
docs/DEVELOPMENT.md             # Hướng dẫn phát triển chi tiết
```

---

## 🧩 Các trang & luồng chính

1. **Landing (`/`)** — giới thiệu, listing nổi bật, cách hoạt động, CTA.
2. **Marketplace (`/marketplace`)** — lọc theo niche / giá / DA, sắp xếp, hiển thị grid card.
3. **Chi tiết (`/marketplace/[id]`)** — chỉ số website (DA, traffic, spam score), điền brief → đặt hàng.
4. **Dashboard (`/dashboard`)** — danh sách đơn đã đặt, trạng thái, tổng chi tiêu (đọc từ localStorage).

---

## 🛠️ Hướng phát triển tiếp theo

Xem chi tiết trong [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md). Tóm tắt roadmap:

- [ ] **Backend & DB thật** (đơn hàng, listing, user) — Postgres + Prisma hoặc Supabase.
- [ ] **Auth** — phân vai trò Buyer / Publisher / Admin.
- [ ] **Trang Publisher** — đăng & quản lý website của mình.
- [ ] **Thanh toán** — Stripe / cổng nội địa, ví & escrow.
- [ ] **Tìm kiếm nâng cao** — full-text, phân trang, lọc nhiều niche.
- [ ] **Thông báo & messaging** giữa buyer và publisher.
- [ ] Khi có backend → cân nhắc đổi host sang **Vercel** (Pages chỉ chạy tĩnh).

---

## 🚢 Deploy

Mỗi lần push lên nhánh `main`, GitHub Actions tự build static export và deploy lên Pages.
Theo dõi tại tab **Actions**. Cấu hình nguồn Pages: **Settings → Pages → Source: GitHub Actions**.
