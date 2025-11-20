# 🚀 راهنمای نصب سریع / Quick Setup Guide / دليل الإعداد السريع

## مراحل نصب / Installation Steps / خطوات التثبيت

### 1. نصب وابستگی‌ها / Install Dependencies / تثبيت التبعيات

```bash
cd multilingual-website
npm install
```

### 2. تنظیم متغیر محیطی / Set Environment Variable / تعيين متغير البيئة

فایل `.env.local` ایجاد کنید:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

برای production، URL واقعی خود را قرار دهید:
- GitHub Pages: `https://username.github.io/repository-name`
- Vercel: `https://yourdomain.vercel.app`

### 3. اجرای پروژه / Run Project / تشغيل المشروع

```bash
npm run dev
```

سپس به [http://localhost:3000](http://localhost:3000) بروید.

### 4. ساخت برای Production / Build for Production / بناء للإنتاج

```bash
npm run build
```

فایل‌های خروجی در پوشه `out` قرار می‌گیرند.

## 📦 Deploy

### GitHub Pages

1. Repository را در GitHub ایجاد کنید
2. در Settings > Pages، Source را روی "GitHub Actions" تنظیم کنید
3. متغیر `NEXT_PUBLIC_BASE_URL` را در Secrets اضافه کنید
4. Push کنید - به صورت خودکار deploy می‌شود

### Vercel

```bash
npx vercel
```

یا از طریق [vercel.com](https://vercel.com) پروژه را import کنید.

## ✅ بررسی / Check / التحقق

- ✅ همه صفحات در سه زبان کار می‌کنند
- ✅ Language Switcher کار می‌کند
- ✅ RTL برای فارسی و عربی فعال است
- ✅ SEO metadata درست است

---

**موفق باشید! / Good Luck! / حظاً موفقاً!**

