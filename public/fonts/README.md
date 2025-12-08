# 📝 راهنمای فونت‌های پروژه

این پوشه شامل فونت‌های استفاده شده در پروژه است.

---

## 📁 ساختار فونت‌ها

```
public/
└── fonts/
    ├── IranYekan/          # فونت فارسی
    │   ├── IRANYekanWebRegular.woff2
    │   ├── IRANYekanWebRegular.woff
    │   ├── IRANYekanWebRegular.ttf
    │   ├── IRANYekanWebLight.woff2
    │   ├── IRANYekanWebMedium.woff2
    │   └── IRANYekanWebBold.woff2
    │
    └── NotoSansArabic/      # فونت عربی
        ├── NotoSansArabic-Regular.woff2
        ├── NotoSansArabic-Regular.woff
        ├── NotoSansArabic-Regular.ttf
        ├── NotoSansArabic-Light.woff2
        ├── NotoSansArabic-Medium.woff2
        └── NotoSansArabic-Bold.woff2
```

---

## 🎨 فونت‌های استفاده شده

### 1. IranYekan (فارسی)
- **استفاده**: برای زبان فارسی (fa)
- **وزن‌های موجود**:
  - Light (300)
  - Regular (400)
  - Medium (500)
  - Bold (700)

### 2. NotoSansArabic (عربی)
- **استفاده**: برای زبان عربی (ar)
- **وزن‌های موجود**:
  - Light (300)
  - Regular (400)
  - Medium (500)
  - Bold (700)

### 3. Inter (انگلیسی)
- **استفاده**: برای زبان انگلیسی (en)
- **منبع**: Google Fonts

---

## 🔧 نحوه استفاده

فونت‌ها به صورت خودکار بر اساس زبان صفحه اعمال می‌شوند:

- **فارسی** (`/fa/*`): از فونت `IranYekan` استفاده می‌کند
- **عربی** (`/ar/*`): از فونت `NotoSansArabic` استفاده می‌کند
- **انگلیسی** (`/en/*`): از فونت `Inter` استفاده می‌کند

---

## 📝 فایل‌های مرتبط

- `app/[locale]/fonts.css` - تعریف فونت‌ها با @font-face
- `app/[locale]/globals.css` - تنظیم فونت‌ها بر اساس زبان
- `app/[locale]/layout.tsx` - import فایل fonts.css

---

## ✅ بررسی فونت‌ها

برای بررسی اینکه فونت‌ها به درستی لود شده‌اند:

1. صفحه را در مرورگر باز کنید
2. Developer Tools را باز کنید (F12)
3. به تب Network بروید
4. فیلتر را روی "Font" تنظیم کنید
5. صفحه را Refresh کنید
6. باید فایل‌های .woff2 را ببینید

---

## 🎯 نکات مهم

1. **اولویت فرمت**: woff2 > woff > ttf
2. **font-display: swap**: برای بهبود عملکرد
3. **Preload**: فونت‌ها به صورت خودکار preload می‌شوند

---

**موفق باشید! 🚀**







این پوشه شامل فونت‌های استفاده شده در پروژه است.

---

## 📁 ساختار فونت‌ها

```
public/
└── fonts/
    ├── IranYekan/          # فونت فارسی
    │   ├── IRANYekanWebRegular.woff2
    │   ├── IRANYekanWebRegular.woff
    │   ├── IRANYekanWebRegular.ttf
    │   ├── IRANYekanWebLight.woff2
    │   ├── IRANYekanWebMedium.woff2
    │   └── IRANYekanWebBold.woff2
    │
    └── NotoSansArabic/      # فونت عربی
        ├── NotoSansArabic-Regular.woff2
        ├── NotoSansArabic-Regular.woff
        ├── NotoSansArabic-Regular.ttf
        ├── NotoSansArabic-Light.woff2
        ├── NotoSansArabic-Medium.woff2
        └── NotoSansArabic-Bold.woff2
```

---

## 🎨 فونت‌های استفاده شده

### 1. IranYekan (فارسی)
- **استفاده**: برای زبان فارسی (fa)
- **وزن‌های موجود**:
  - Light (300)
  - Regular (400)
  - Medium (500)
  - Bold (700)

### 2. NotoSansArabic (عربی)
- **استفاده**: برای زبان عربی (ar)
- **وزن‌های موجود**:
  - Light (300)
  - Regular (400)
  - Medium (500)
  - Bold (700)

### 3. Inter (انگلیسی)
- **استفاده**: برای زبان انگلیسی (en)
- **منبع**: Google Fonts

---

## 🔧 نحوه استفاده

فونت‌ها به صورت خودکار بر اساس زبان صفحه اعمال می‌شوند:

- **فارسی** (`/fa/*`): از فونت `IranYekan` استفاده می‌کند
- **عربی** (`/ar/*`): از فونت `NotoSansArabic` استفاده می‌کند
- **انگلیسی** (`/en/*`): از فونت `Inter` استفاده می‌کند

---

## 📝 فایل‌های مرتبط

- `app/[locale]/fonts.css` - تعریف فونت‌ها با @font-face
- `app/[locale]/globals.css` - تنظیم فونت‌ها بر اساس زبان
- `app/[locale]/layout.tsx` - import فایل fonts.css

---

## ✅ بررسی فونت‌ها

برای بررسی اینکه فونت‌ها به درستی لود شده‌اند:

1. صفحه را در مرورگر باز کنید
2. Developer Tools را باز کنید (F12)
3. به تب Network بروید
4. فیلتر را روی "Font" تنظیم کنید
5. صفحه را Refresh کنید
6. باید فایل‌های .woff2 را ببینید

---

## 🎯 نکات مهم

1. **اولویت فرمت**: woff2 > woff > ttf
2. **font-display: swap**: برای بهبود عملکرد
3. **Preload**: فونت‌ها به صورت خودکار preload می‌شوند

---

**موفق باشید! 🚀**


















