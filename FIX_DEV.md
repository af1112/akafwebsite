# 🔧 راهنمای رفع مشکل Dev Mode

## مشکل
در dev mode، با `output: 'export'`، middleware کار نمی‌کند و صفحه نمایش داده نمی‌شود.

## راه حل
پیکربندی به‌روزرسانی شد تا:
- در **dev mode**: middleware فعال است و routing کار می‌کند
- در **build time**: از static export استفاده می‌شود

## مراحل

### 1. متوقف کردن سرور فعلی
در terminal، `Ctrl + C` را بزنید تا سرور متوقف شود.

### 2. اجرای مجدد سرور
```bash
npm run dev
```

### 3. باز کردن مرورگر
به آدرس زیر بروید:
```
http://localhost:3000
```

سرور باید شما را به `/en` یا زبان پیش‌فرض redirect کند.

## دستورات Build

- **Dev Mode** (با middleware):
  ```bash
  npm run dev
  ```

- **Build برای Static Export** (برای GitHub Pages/Vercel):
  ```bash
  npm run build:static
  ```

- **Build عادی** (بدون static export):
  ```bash
  npm run build
  ```

## نکته
در dev mode، middleware فعال است و routing به درستی کار می‌کند.
در build time، از `build:static` استفاده کنید تا فایل‌های static تولید شوند.


