# 🌐 Multilingual Website - Next.js 14 + next-intl

یک وب‌سایت حرفه‌ای، سریع و بهینه‌شده برای SEO با پشتیبانی از سه زبان (فارسی، عربی، انگلیسی) ساخته شده با Next.js 14 و next-intl.

A professional, fast, and SEO-optimized multilingual website (Persian, Arabic, English) built with Next.js 14 and next-intl.

موقع ويب احترافي وسريع ومحسّن لمحركات البحث مع دعم ثلاث لغات (الفارسية والعربية والإنجليزية) مبني باستخدام Next.js 14 و next-intl.

## ✨ ویژگی‌ها / Features / المميزات

- ✅ **Next.js 14** با App Router
- ✅ **next-intl** برای مدیریت چندزبانه
- ✅ **سه زبان**: فارسی، عربی، انگلیسی
- ✅ **SEO بهینه**: sitemap.xml، robots.txt، metadata
- ✅ **RTL Support**: پشتیبانی کامل از راست‌به‌چپ
- ✅ **Responsive Design**: طراحی واکنش‌گرا
- ✅ **Online Payments**: PayPal + Thawani checkout integration
- ✅ **Static Export**: آماده برای GitHub Pages
- ✅ **Vercel Ready**: آماده برای deploy روی Vercel

## 🚀 شروع سریع / Quick Start / البدء السريع

### نصب وابستگی‌ها / Install Dependencies / تثبيت التبعيات

```bash
npm install
```

### اجرای پروژه در حالت توسعه / Run Development Server / تشغيل خادم التطوير

```bash
npm run dev
```

سپس به [http://localhost:3000](http://localhost:3000) بروید.

### ساخت پروژه / Build Project / بناء المشروع

```bash
npm run build
```

فایل‌های خروجی در پوشه `out` قرار می‌گیرند.

## 📁 ساختار پروژه / Project Structure / هيكل المشروع

```
multilingual-website/
├── app/
│   ├── [locale]/          # صفحات چندزبانه
│   │   ├── layout.tsx     # Layout اصلی
│   │   ├── page.tsx       # صفحه اصلی
│   │   └── globals.css    # استایل‌های全局
│   ├── robots.ts          # robots.txt
│   └── sitemap.ts         # sitemap.xml
├── components/            # کامپوننت‌های React
│   ├── Navigation.tsx
│   ├── LanguageSwitcher.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── About.tsx
│   └── Footer.tsx
├── messages/              # فایل‌های ترجمه
│   ├── en.json           # انگلیسی
│   ├── fa.json           # فارسی
│   └── ar.json           # عربی
├── i18n.ts               # پیکربندی next-intl
├── routing.ts            # تنظیمات routing
├── middleware.ts         # middleware برای زبان
└── next.config.js        # پیکربندی Next.js
```

## 🌍 افزودن زبان جدید / Adding New Language / إضافة لغة جديدة

1. زبان را به `routing.ts` اضافه کنید:
```typescript
locales: ['en', 'fa', 'ar', 'new-lang']
```

2. فایل ترجمه جدید در `messages/new-lang.json` ایجاد کنید.

3. در `LanguageSwitcher.tsx` زبان جدید را اضافه کنید.

## 🚀 Deploy

### GitHub Pages

1. Repository را در GitHub ایجاد کنید.

2. در Settings > Pages:
   - Source: GitHub Actions
   - Branch: main

3. متغیر محیطی `NEXT_PUBLIC_BASE_URL` را در Secrets تنظیم کنید:
   ```
   https://username.github.io/repository-name
   ```

4. فایل `.github/workflows/deploy.yml` به صورت خودکار deploy را انجام می‌دهد.

### Vercel

1. پروژه را به Vercel متصل کنید:
   ```bash
   npx vercel
   ```

2. یا از طریق [vercel.com](https://vercel.com) پروژه را import کنید.

3. متغیر محیطی `NEXT_PUBLIC_BASE_URL` را تنظیم کنید.

Vercel به صورت خودکار هر push به main branch را deploy می‌کند.

## 📝 متغیرهای محیطی / Environment Variables / متغيرات البيئة

فایل `.env.local` ایجاد کنید و متغیرهای زیر را تعریف کنید:

```env
# App URLs
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

# Thawani payment gateway
THAWANI_SECRET_KEY=sk_live_xxx
THAWANI_PUBLISHABLE_KEY=pk_live_xxx
THAWANI_USE_SANDBOX=true
THAWANI_SUCCESS_URL=https://yourdomain.com/thank-you
THAWANI_CANCEL_URL=https://yourdomain.com/signup?status=cancelled
```

> نکته: اگر از محیط واقعی Thawani استفاده می‌کنید مقدار `THAWANI_USE_SANDBOX` را به `false` تغییر دهید.

### پرداخت آنلاین (Thawani + PayPal)

- دکمه PayPal با استفاده از `@paypal/react-paypal-js` پیاده‌سازی شده و از متغیر `NEXT_PUBLIC_PAYPAL_CLIENT_ID` استفاده می‌کند.
- پرداخت Thawani از طریق API داخلی (`/api/payments/thawani`) انجام می‌شود.
  - اطلاعات پلن و کاربر جمع‌آوری می‌شود.
  - یک جلسه Thawani ساخته می‌شود و کاربر به صفحه پرداخت هدایت می‌گردد.
  - برای استفاده از حساب تجاری خود، کلیدهای `secret` و `publishable` را از داشبورد Thawani وارد کنید.

## 🎨 سفارشی‌سازی / Customization / التخصيص

### تغییر رنگ‌ها / Change Colors / تغيير الألوان

فایل `app/[locale]/globals.css` را ویرایش کنید و متغیرهای CSS را تغییر دهید:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  /* ... */
}
```

### افزودن صفحات جدید / Add New Pages / إضافة صفحات جديدة

1. صفحه جدید در `app/[locale]/new-page/page.tsx` ایجاد کنید.
2. ترجمه‌ها را به فایل‌های `messages/*.json` اضافه کنید.
3. لینک را به `Navigation.tsx` اضافه کنید.

## 📚 منابع / Resources / الموارد

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [GitHub Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/docs)

## 📄 لایسنس / License / الترخيص

این پروژه رایگان و open source است.

This project is free and open source.

هذا المشروع مجاني ومفتوح المصدر.

---

ساخته شده با ❤️ با Next.js 14 و next-intl

Built with ❤️ using Next.js 14 and next-intl

مبني بـ ❤️ باستخدام Next.js 14 و next-intl

