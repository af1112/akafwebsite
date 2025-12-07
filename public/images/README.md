# 📁 پوشه تصاویر

این پوشه برای قرار دادن تمام تصاویر وب‌سایت است.

---

## 📂 ساختار پیشنهادی

```
public/
└── images/
    ├── logo.png              # لوگو اصلی
    ├── logo-white.png        # لوگو برای پس‌زمینه تیره
    ├── hero.png              # تصویر Hero Section
    ├── hero-digital-menu.png # تصویر جایگزین Hero
    │
    ├── clients/              # لوگوهای مشتریان
    │   ├── brand-1.png
    │   ├── brand-2.png
    │   └── ...
    │
    └── features/             # آیکون‌های ویژگی‌ها
        ├── easy-setup.svg
        ├── multilingual.svg
        ├── qr-code.svg
        ├── real-time.svg
        ├── analytics.svg
        └── mobile-friendly.svg
```

---

## 📐 اندازه‌های پیشنهادی

| نوع تصویر | عرض | ارتفاع | فرمت |
|-----------|-----|--------|------|
| Logo | 200px | 50-80px | PNG (شفاف) |
| Hero Image | 1200px | 800px | JPG/WebP |
| Client Logo | 200px | 100px | PNG (شفاف) |
| Feature Icon | 128px | 128px | SVG/PNG |

---

## 🎨 نکات

1. **فرمت تصاویر**:
   - PNG برای لوگوها و آیکون‌ها (با پس‌زمینه شفاف)
   - JPG یا WebP برای تصاویر بزرگ
   - SVG برای آیکون‌ها (بهترین کیفیت)

2. **بهینه‌سازی**:
   - تصاویر را قبل از آپلود بهینه کنید
   - حداکثر سایز: 500KB برای هر تصویر
   - از ابزارهایی مثل TinyPNG استفاده کنید

3. **نام‌گذاری**:
   - از حروف کوچک استفاده کنید
   - از خط تیره (-) به جای فاصله استفاده کنید
   - مثال: `hero-image.png` نه `Hero Image.png`

---

## 📝 نحوه استفاده

### در کامپوننت:
```tsx
<img src="/images/logo.png" alt="Logo" />
```

### در CSS:
```css
background-image: url('/images/hero.png');
```

---

**موفق باشید! 🚀**








این پوشه برای قرار دادن تمام تصاویر وب‌سایت است.

---

## 📂 ساختار پیشنهادی

```
public/
└── images/
    ├── logo.png              # لوگو اصلی
    ├── logo-white.png        # لوگو برای پس‌زمینه تیره
    ├── hero.png              # تصویر Hero Section
    ├── hero-digital-menu.png # تصویر جایگزین Hero
    │
    ├── clients/              # لوگوهای مشتریان
    │   ├── brand-1.png
    │   ├── brand-2.png
    │   └── ...
    │
    └── features/             # آیکون‌های ویژگی‌ها
        ├── easy-setup.svg
        ├── multilingual.svg
        ├── qr-code.svg
        ├── real-time.svg
        ├── analytics.svg
        └── mobile-friendly.svg
```

---

## 📐 اندازه‌های پیشنهادی

| نوع تصویر | عرض | ارتفاع | فرمت |
|-----------|-----|--------|------|
| Logo | 200px | 50-80px | PNG (شفاف) |
| Hero Image | 1200px | 800px | JPG/WebP |
| Client Logo | 200px | 100px | PNG (شفاف) |
| Feature Icon | 128px | 128px | SVG/PNG |

---

## 🎨 نکات

1. **فرمت تصاویر**:
   - PNG برای لوگوها و آیکون‌ها (با پس‌زمینه شفاف)
   - JPG یا WebP برای تصاویر بزرگ
   - SVG برای آیکون‌ها (بهترین کیفیت)

2. **بهینه‌سازی**:
   - تصاویر را قبل از آپلود بهینه کنید
   - حداکثر سایز: 500KB برای هر تصویر
   - از ابزارهایی مثل TinyPNG استفاده کنید

3. **نام‌گذاری**:
   - از حروف کوچک استفاده کنید
   - از خط تیره (-) به جای فاصله استفاده کنید
   - مثال: `hero-image.png` نه `Hero Image.png`

---

## 📝 نحوه استفاده

### در کامپوننت:
```tsx
<img src="/images/logo.png" alt="Logo" />
```

### در CSS:
```css
background-image: url('/images/hero.png');
```

---

**موفق باشید! 🚀**

















