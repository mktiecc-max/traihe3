# UCMAS Trại hè 2026 — Website + Admin Panel

Landing page + Admin panel đầy đủ cho chương trình trại hè UCMAS 2026.

**Stack:** Next.js 14 · TypeScript · Supabase · NextAuth · Google Sheets · Telegram

---

## Cài đặt nhanh

### 1. Clone & cài dependencies

```bash
git clone https://github.com/YOUR_USERNAME/ucmas-summer-camp.git
cd ucmas-summer-camp
npm install
```

### 2. Tạo file .env.local

```bash
cp .env.example .env.local
```

Điền đầy đủ các giá trị trong `.env.local` (xem hướng dẫn bên dưới).

### 3. Thiết lập Supabase

1. Tạo project mới tại [supabase.com](https://supabase.com)
2. Vào **SQL Editor** → Chạy toàn bộ nội dung file `supabase/schema.sql`
3. Lấy credentials từ **Project Settings > API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 4. Thiết lập Google OAuth (cho admin login)

1. Vào [Google Cloud Console](https://console.cloud.google.com)
2. Tạo OAuth 2.0 credentials
3. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
4. Thêm vào `.env.local`: `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET`

### 5. Thiết lập Google Sheets (realtime data push)

Xem hướng dẫn chi tiết trong file `google-sheets-setup.md`:
1. Tạo Google Sheet với headers đúng thứ tự
2. Deploy Google Apps Script Web App
3. Điền URL vào `GOOGLE_SHEETS_WEBAPP_URL` trong `.env.local`

### 6. Thiết lập Telegram (tùy chọn)

1. Tạo bot qua [@BotFather](https://t.me/BotFather)
2. Lấy `TELEGRAM_BOT_TOKEN`
3. Lấy `TELEGRAM_CHAT_ID` (chat với bot, gọi API `getUpdates`)

### 7. Chạy local

```bash
npm run dev
```

- Landing page: http://localhost:3000
- Admin panel: http://localhost:3000/admin

---

## Deploy lên Vercel + GitHub

### Bước 1: Push lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ucmas-summer-camp.git
git push -u origin main
```

### Bước 2: Deploy lên Vercel

1. Vào [vercel.com](https://vercel.com) → Import GitHub repo
2. Trong **Environment Variables**, thêm tất cả biến từ `.env.example`
3. Click **Deploy**

**Lưu ý:** Sau khi có domain Vercel, cập nhật:
- `NEXTAUTH_URL` = `https://your-app.vercel.app`
- Google OAuth: thêm `https://your-app.vercel.app/api/auth/callback/google` vào Authorized redirect URIs

### Bước 3: Domain tùy chỉnh (tùy chọn)

Trong Vercel > Project Settings > Domains, thêm:
- `traihe.ucmasvietnam.com` (public site)

---

## Cấu trúc thư mục

```
ucmas-summer-camp/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # All styles (landing + admin)
│   ├── api/
│   │   ├── leads/route.ts    # POST: submit form → Supabase + Sheets + Telegram
│   │   ├── leads/[id]/route.ts  # PATCH: update lead status
│   │   └── auth/[...nextauth]/route.ts
│   ├── admin/
│   │   ├── page.tsx          # Dashboard
│   │   ├── leads/page.tsx    # Leads table
│   │   └── settings/page.tsx # Integration settings
│   └── auth/signin/page.tsx  # Login page
├── components/
│   ├── landing/              # All landing page sections
│   └── admin/                # Admin UI components
├── lib/
│   ├── supabase.ts           # Browser Supabase client
│   ├── supabase-admin.ts     # Server Supabase client (service role)
│   ├── sheets.ts             # Google Sheets integration
│   ├── telegram.ts           # Telegram notification
│   └── validations.ts        # Zod schemas
├── supabase/
│   └── schema.sql            # Database schema (run in Supabase SQL Editor)
├── auth.ts                   # NextAuth config
├── middleware.ts             # Protect /admin routes
└── .env.example              # Environment variables template
```

---

## Flow khi có lead mới

```
Phụ huynh submit form
    ↓
POST /api/leads
    ↓
1. Rate limit check (5/phút/IP)
2. Honeypot check
3. Zod validation
4. Insert vào Supabase leads table
5. Fire-and-forget:
   ├── Ghi vào Google Sheets (Apps Script)
   └── Gửi Telegram notification
    ↓
Return { ok: true, leadId }
    ↓
Client: hiện success message + fire FB Pixel + Google Ads
```

---

## Admin Panel

Truy cập `/admin` — yêu cầu đăng nhập Google OAuth.

| Trang | URL | Mô tả |
|-------|-----|-------|
| Dashboard | `/admin` | Thống kê tổng quan |
| Leads | `/admin/leads` | Danh sách + filter + đổi status |
| Xuất CSV | `/admin/leads/export` | Download Excel-compatible CSV |
| Cài đặt | `/admin/settings` | Google Sheets, Telegram, liên hệ |

---

## Cấp quyền admin

Trong `.env.local`, thêm email vào:
```
ADMIN_ALLOWED_EMAILS=yen@ucmasvietnam.com,admin@ucmasvietnam.com
```

---

## License

© 2026 UCMAS Việt Nam · IECC. All rights reserved.
