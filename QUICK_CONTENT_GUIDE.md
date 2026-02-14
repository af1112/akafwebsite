# ⚡ راهنمای سریع جایگزینی محتوا

## 📝 تغییر متون

### Hero Section
**فایل**: `messages/fa.json` (یا `en.json` / `ar.json`)

```json
{
  "HomePage": {
    "title": "عنوان اصلی",
    "subtitle": "زیرعنوان",
    "description": "توضیحات",
    "cta": "دکمه اصلی",
    "ctaSecondary": "دکمه دوم"
  }
}
```

### Features (ویژگی‌ها)
**فایل**: `messages/fa.json`

```json
{
  "HomePage": {
    "features": {
      "title": "عنوان بخش",
      "subtitle": "زیرعنوان",
      "easySetup": {
        "title": "عنوان",
        "description": "توضیحات"
      }
      // ... بقیه ویژگی‌ها
    }
  }
}
```

### Pricing (قیمت‌گذاری)
**فایل**: `messages/fa.json`

```json
{
  "PricingPage": {
    "plans": {
      "starter": {
        "name": "نام پلن",
        "price": "29",
        "description": "توضیحات",
        "features": ["ویژگی 1", "ویژگی 2"]
      }
    }
  }
}
```

---

## 🖼️ اضافه کردن تصاویر

### 1. ایجاد پوشه
```
multilingual-website/
└── public/
    └── images/
        ├── logo.png
        ├── hero.png
        └── clients/
```

### 2. Hero Image
**فایل**: `components/SaaSHero.tsx`

```tsx
<div className="hero-image">
  <img src="/images/hero.png" alt="Hero" />
</div>
```

### 3. Logo
**فایل**: `components/Navigation.tsx`

```tsx
<Link href="/" className="logo">
  <img src="/images/logo.png" alt="Logo" style={{ height: '40px' }} />
</Link>
```

### 4. Client Logos
**فایل**: `components/ClientLogos.tsx`

```tsx
<img src="/images/clients/brand.png" alt={brand} />
```

---

## ✅ چک‌لیست

- [ ] Hero Section متون
- [ ] Features متون
- [ ] Pricing متون
- [ ] Logo تصویر
- [ ] Hero Image
- [ ] Client Logos

---

## 🚀 بعد از تغییرات

```bash
npm run dev
```

بررسی در: `http://localhost:3000/fa`

---

**برای راهنمای کامل**: `CONTENT_GUIDE.md` را بخوانید








## 📝 تغییر متون

### Hero Section
**فایل**: `messages/fa.json` (یا `en.json` / `ar.json`)

```json
{
  "HomePage": {
    "title": "عنوان اصلی",
    "subtitle": "زیرعنوان",
    "description": "توضیحات",
    "cta": "دکمه اصلی",
    "ctaSecondary": "دکمه دوم"
  }
}
```

### Features (ویژگی‌ها)
**فایل**: `messages/fa.json`

```json
{
  "HomePage": {
    "features": {
      "title": "عنوان بخش",
      "subtitle": "زیرعنوان",
      "easySetup": {
        "title": "عنوان",
        "description": "توضیحات"
      }
      // ... بقیه ویژگی‌ها
    }
  }
}
```

### Pricing (قیمت‌گذاری)
**فایل**: `messages/fa.json`

```json
{
  "PricingPage": {
    "plans": {
      "starter": {
        "name": "نام پلن",
        "price": "29",
        "description": "توضیحات",
        "features": ["ویژگی 1", "ویژگی 2"]
      }
    }
  }
}
```

---

## 🖼️ اضافه کردن تصاویر

### 1. ایجاد پوشه
```
multilingual-website/
└── public/
    └── images/
        ├── logo.png
        ├── hero.png
        └── clients/
```

### 2. Hero Image
**فایل**: `components/SaaSHero.tsx`

```tsx
<div className="hero-image">
  <img src="/images/hero.png" alt="Hero" />
</div>
```

### 3. Logo
**فایل**: `components/Navigation.tsx`

```tsx
<Link href="/" className="logo">
  <img src="/images/logo.png" alt="Logo" style={{ height: '40px' }} />
</Link>
```

### 4. Client Logos
**فایل**: `components/ClientLogos.tsx`

```tsx
<img src="/images/clients/brand.png" alt={brand} />
```

---

## ✅ چک‌لیست

- [ ] Hero Section متون
- [ ] Features متون
- [ ] Pricing متون
- [ ] Logo تصویر
- [ ] Hero Image
- [ ] Client Logos

---

## 🚀 بعد از تغییرات

```bash
npm run dev
```

بررسی در: `http://localhost:3000/fa`

---

**برای راهنمای کامل**: `CONTENT_GUIDE.md` را بخوانید



























