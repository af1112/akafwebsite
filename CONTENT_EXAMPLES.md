# 📋 مثال‌های عملی برای جایگزینی محتوا

این فایل شامل مثال‌های کامل برای جایگزینی محتوا است.

---

## 🎯 مثال 1: تغییر Hero Section

### فایل: `messages/fa.json`

**قبل**:
```json
{
  "HomePage": {
    "title": "منوی دیجیتال برای رستوران‌ها و کافی‌شاپ‌ها",
    "subtitle": "رستوران خود را با سیستم منوی دیجیتال مدرن متحول کنید",
    "description": "راه‌حل حرفه‌ای منوی دیجیتال برای رستوران‌ها و کافی‌شاپ‌ها..."
  }
}
```

**بعد** (مثال):
```json
{
  "HomePage": {
    "title": "سیستم مدیریت منوی دیجیتال AKAF",
    "subtitle": "رستوران خود را به عصر دیجیتال ببرید",
    "description": "با سیستم منوی دیجیتال ما، مدیریت منو، افزایش فروش و رضایت مشتری را تجربه کنید. پشتیبانی کامل از زبان‌های فارسی، عربی و انگلیسی.",
    "cta": "شروع رایگان 14 روزه",
    "ctaSecondary": "تماشای ویدیو دمو"
  }
}
```

---

## 🎯 مثال 2: تغییر Features

### فایل: `messages/fa.json`

```json
{
  "HomePage": {
    "features": {
      "title": "چرا AKAF را انتخاب کنید؟",
      "subtitle": "همه آنچه برای موفقیت رستوران خود نیاز دارید",
      "easySetup": {
        "title": "راه‌اندازی در 5 دقیقه",
        "description": "بدون نیاز به دانش فنی، در کمتر از 5 دقیقه سیستم خود را راه‌اندازی کنید"
      },
      "multilingual": {
        "title": "پشتیبانی 3 زبان",
        "description": "فارسی، عربی و انگلیسی - مناسب برای مشتریان بین‌المللی"
      },
      "qrCode": {
        "title": "QR Code رایگان",
        "description": "برای هر میز QR Code اختصاصی دریافت کنید"
      },
      "realTime": {
        "title": "به‌روزرسانی لحظه‌ای",
        "description": "تغییرات منو، قیمت و موجودی به صورت آنی اعمال می‌شود"
      },
      "analytics": {
        "title": "گزارش‌گیری پیشرفته",
        "description": "تحلیل فروش، محبوب‌ترین آیتم‌ها و رفتار مشتریان"
      },
      "mobileFriendly": {
        "title": "طراحی واکنش‌گرا",
        "description": "تجربه عالی در موبایل، تبلت و دسکتاپ"
      }
    }
  }
}
```

---

## 🎯 مثال 3: تغییر Pricing Plans

### فایل: `messages/fa.json`

```json
{
  "PricingPage": {
    "title": "پلن مناسب خود را انتخاب کنید",
    "subtitle": "تعرفه‌های شفاف و بدون هزینه پنهان",
    "monthly": "ماهانه",
    "yearly": "سالانه",
    "save": "صرفه‌جویی",
    "popular": "پیشنهاد ویژه",
    "getStarted": "شروع کنید",
    "plans": {
      "starter": {
        "name": "پلن استارتر",
        "price": "29",
        "description": "مناسب برای کافی‌شاپ‌های کوچک و استارتاپ‌ها",
        "features": [
          "تا 50 آیتم منو",
          "تولید QR Code رایگان",
          "گزارش‌گیری پایه",
          "پشتیبانی ایمیل",
          "پشتیبانی 1 زبان",
          "به‌روزرسانی خودکار"
        ]
      },
      "professional": {
        "name": "پلن حرفه‌ای",
        "price": "79",
        "description": "ایده‌آل برای رستوران‌های متوسط و در حال رشد",
        "features": [
          "آیتم‌های نامحدود منو",
          "QR Code + NFC",
          "گزارش‌گیری پیشرفته",
          "پشتیبانی اولویت‌دار",
          "پشتیبانی 3 زبان",
          "برندسازی سفارشی",
          "API دسترسی"
        ]
      },
      "enterprise": {
        "name": "پلن سازمانی",
        "price": "199",
        "description": "برای رستوران‌های زنجیره‌ای و بزرگ",
        "features": [
          "همه ویژگی‌های پلن حرفه‌ای",
          "مدیر اختصاصی",
          "پشتیبانی 24/7",
          "زبان‌های نامحدود",
          "یکپارچه‌سازی سفارشی",
          "گزارش‌گیری سفارشی",
          "آموزش تیم"
        ]
      }
    }
  }
}
```

---

## 🎯 مثال 4: تغییر Testimonials

### فایل: `components/Testimonials.tsx`

```typescript
const testimonials = [
  {
    name: 'احمد محمدی',
    restaurant: 'رستوران سنتی تهران',
    location: 'تهران، ایران',
    rating: 5,
    text: 'بعد از استفاده از سیستم AKAF، فروش ما 40% افزایش یافت. مشتریان عاشق منوی دیجیتال هستند و سفارش‌دهی خیلی راحت شده.',
    avatar: '👨‍🍳'
  },
  {
    name: 'فاطمه احمدی',
    restaurant: 'کافی‌شاپ لاله',
    location: 'اصفهان، ایران',
    rating: 5,
    text: 'راه‌اندازی خیلی آسان بود. در کمتر از 10 دقیقه همه چیز آماده شد. پشتیبانی چندزبانه عالی است.',
    avatar: '👩‍💼'
  },
  {
    name: 'محمد رضایی',
    restaurant: 'رستوران بین‌المللی',
    location: 'مشهد، ایران',
    rating: 5,
    text: 'بهترین سرمایه‌گذاری که کردیم. گزارش‌گیری دقیق و مدیریت منو خیلی راحت شده.',
    avatar: '👨‍💻'
  }
];
```

---

## 🎯 مثال 5: اضافه کردن تصویر Hero

### فایل: `components/SaaSHero.tsx`

**قبل**:
```tsx
<div className="hero-image">
  <div className="hero-placeholder">
    <div className="phone-mockup">
      {/* placeholder */}
    </div>
  </div>
</div>
```

**بعد**:
```tsx
<div className="hero-image">
  <img 
    src="/images/hero-digital-menu.png" 
    alt="منوی دیجیتال AKAF"
    className="hero-image-img"
    style={{
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '1.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}
  />
</div>
```

**ساختار پوشه**:
```
public/
└── images/
    └── hero-digital-menu.png
```

---

## 🎯 مثال 6: اضافه کردن Logo

### فایل: `components/Navigation.tsx`

**قبل**:
```tsx
<Link href="/" className="logo">
  <strong>AKAF</strong>
</Link>
```

**بعد**:
```tsx
<Link href="/" className="logo">
  <img 
    src="/images/logo-akaf.png" 
    alt="AKAF Logo"
    style={{ 
      height: '45px', 
      width: 'auto',
      objectFit: 'contain'
    }}
  />
</Link>
```

---

## 🎯 مثال 7: اضافه کردن Client Logos

### فایل: `components/ClientLogos.tsx`

**قبل**:
```tsx
<div className="client-logo">
  {brand}
</div>
```

**بعد**:
```tsx
<div className="client-logo">
  <img 
    src={`/images/clients/${brand.toLowerCase().replace(/\s+/g, '-')}.png`}
    alt={brand}
    style={{ 
      maxWidth: '100%', 
      height: 'auto',
      filter: 'grayscale(100%)',
      opacity: 0.7,
      transition: 'all 0.3s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.filter = 'grayscale(0%)';
      e.currentTarget.style.opacity = '1';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.filter = 'grayscale(100%)';
      e.currentTarget.style.opacity = '0.7';
    }}
  />
</div>
```

**ساختار پوشه**:
```
public/
└── images/
    └── clients/
        ├── brand-1.png
        ├── brand-2.png
        ├── brand-3.png
        └── ...
```

---

## 🎯 مثال 8: تغییر Feature Icons به تصویر

### فایل: `components/SaaSFeatures.tsx`

**قبل**:
```tsx
<div className="feature-icon">{feature.icon}</div>
```

**بعد**:
```tsx
<div className="feature-icon">
  <img 
    src={`/images/features/${feature.key}.svg`}
    alt={t(`${feature.key}.title`)}
    style={{ 
      width: '64px', 
      height: '64px',
      objectFit: 'contain'
    }}
  />
</div>
```

**ساختار پوشه**:
```
public/
└── images/
    └── features/
        ├── easy-setup.svg
        ├── multilingual.svg
        ├── qr-code.svg
        ├── real-time.svg
        ├── analytics.svg
        └── mobile-friendly.svg
```

---

## 📐 اندازه‌های پیشنهادی تصاویر

| نوع تصویر | عرض | ارتفاع | فرمت |
|-----------|-----|--------|------|
| Logo | 200px | 50-80px | PNG (شفاف) |
| Hero Image | 1200px | 800px | JPG/WebP |
| Client Logo | 200px | 100px | PNG (شفاف) |
| Feature Icon | 128px | 128px | SVG/PNG |
| Testimonial Avatar | 64px | 64px | PNG/JPG (دایره) |

---

## 🎨 نکات طراحی

### 1. Hero Image
- از تصاویر با کیفیت بالا استفاده کنید
- سایز فایل: حداکثر 500KB
- نسبت تصویر: 3:2 یا 16:9

### 2. Logo
- پس‌زمینه شفاف (PNG)
- سایز مناسب برای Navigation
- رنگ‌های روشن برای پس‌زمینه تیره

### 3. Client Logos
- همه در یک سایز
- پس‌زمینه شفاف
- فیلتر grayscale برای یکنواختی

---

## ✅ چک‌لیست نهایی

قبل از انتشار:

- [ ] همه متون در 3 زبان (fa, en, ar) بررسی شده
- [ ] تصاویر بهینه شده (سایز مناسب)
- [ ] نام فایل‌ها صحیح است
- [ ] مسیر تصاویر درست است (`/images/...`)
- [ ] Alt text برای همه تصاویر اضافه شده
- [ ] تست در مرورگر انجام شده
- [ ] تست Responsive انجام شده

---

**موفق باشید! 🚀**








این فایل شامل مثال‌های کامل برای جایگزینی محتوا است.

---

## 🎯 مثال 1: تغییر Hero Section

### فایل: `messages/fa.json`

**قبل**:
```json
{
  "HomePage": {
    "title": "منوی دیجیتال برای رستوران‌ها و کافی‌شاپ‌ها",
    "subtitle": "رستوران خود را با سیستم منوی دیجیتال مدرن متحول کنید",
    "description": "راه‌حل حرفه‌ای منوی دیجیتال برای رستوران‌ها و کافی‌شاپ‌ها..."
  }
}
```

**بعد** (مثال):
```json
{
  "HomePage": {
    "title": "سیستم مدیریت منوی دیجیتال AKAF",
    "subtitle": "رستوران خود را به عصر دیجیتال ببرید",
    "description": "با سیستم منوی دیجیتال ما، مدیریت منو، افزایش فروش و رضایت مشتری را تجربه کنید. پشتیبانی کامل از زبان‌های فارسی، عربی و انگلیسی.",
    "cta": "شروع رایگان 14 روزه",
    "ctaSecondary": "تماشای ویدیو دمو"
  }
}
```

---

## 🎯 مثال 2: تغییر Features

### فایل: `messages/fa.json`

```json
{
  "HomePage": {
    "features": {
      "title": "چرا AKAF را انتخاب کنید؟",
      "subtitle": "همه آنچه برای موفقیت رستوران خود نیاز دارید",
      "easySetup": {
        "title": "راه‌اندازی در 5 دقیقه",
        "description": "بدون نیاز به دانش فنی، در کمتر از 5 دقیقه سیستم خود را راه‌اندازی کنید"
      },
      "multilingual": {
        "title": "پشتیبانی 3 زبان",
        "description": "فارسی، عربی و انگلیسی - مناسب برای مشتریان بین‌المللی"
      },
      "qrCode": {
        "title": "QR Code رایگان",
        "description": "برای هر میز QR Code اختصاصی دریافت کنید"
      },
      "realTime": {
        "title": "به‌روزرسانی لحظه‌ای",
        "description": "تغییرات منو، قیمت و موجودی به صورت آنی اعمال می‌شود"
      },
      "analytics": {
        "title": "گزارش‌گیری پیشرفته",
        "description": "تحلیل فروش، محبوب‌ترین آیتم‌ها و رفتار مشتریان"
      },
      "mobileFriendly": {
        "title": "طراحی واکنش‌گرا",
        "description": "تجربه عالی در موبایل، تبلت و دسکتاپ"
      }
    }
  }
}
```

---

## 🎯 مثال 3: تغییر Pricing Plans

### فایل: `messages/fa.json`

```json
{
  "PricingPage": {
    "title": "پلن مناسب خود را انتخاب کنید",
    "subtitle": "تعرفه‌های شفاف و بدون هزینه پنهان",
    "monthly": "ماهانه",
    "yearly": "سالانه",
    "save": "صرفه‌جویی",
    "popular": "پیشنهاد ویژه",
    "getStarted": "شروع کنید",
    "plans": {
      "starter": {
        "name": "پلن استارتر",
        "price": "29",
        "description": "مناسب برای کافی‌شاپ‌های کوچک و استارتاپ‌ها",
        "features": [
          "تا 50 آیتم منو",
          "تولید QR Code رایگان",
          "گزارش‌گیری پایه",
          "پشتیبانی ایمیل",
          "پشتیبانی 1 زبان",
          "به‌روزرسانی خودکار"
        ]
      },
      "professional": {
        "name": "پلن حرفه‌ای",
        "price": "79",
        "description": "ایده‌آل برای رستوران‌های متوسط و در حال رشد",
        "features": [
          "آیتم‌های نامحدود منو",
          "QR Code + NFC",
          "گزارش‌گیری پیشرفته",
          "پشتیبانی اولویت‌دار",
          "پشتیبانی 3 زبان",
          "برندسازی سفارشی",
          "API دسترسی"
        ]
      },
      "enterprise": {
        "name": "پلن سازمانی",
        "price": "199",
        "description": "برای رستوران‌های زنجیره‌ای و بزرگ",
        "features": [
          "همه ویژگی‌های پلن حرفه‌ای",
          "مدیر اختصاصی",
          "پشتیبانی 24/7",
          "زبان‌های نامحدود",
          "یکپارچه‌سازی سفارشی",
          "گزارش‌گیری سفارشی",
          "آموزش تیم"
        ]
      }
    }
  }
}
```

---

## 🎯 مثال 4: تغییر Testimonials

### فایل: `components/Testimonials.tsx`

```typescript
const testimonials = [
  {
    name: 'احمد محمدی',
    restaurant: 'رستوران سنتی تهران',
    location: 'تهران، ایران',
    rating: 5,
    text: 'بعد از استفاده از سیستم AKAF، فروش ما 40% افزایش یافت. مشتریان عاشق منوی دیجیتال هستند و سفارش‌دهی خیلی راحت شده.',
    avatar: '👨‍🍳'
  },
  {
    name: 'فاطمه احمدی',
    restaurant: 'کافی‌شاپ لاله',
    location: 'اصفهان، ایران',
    rating: 5,
    text: 'راه‌اندازی خیلی آسان بود. در کمتر از 10 دقیقه همه چیز آماده شد. پشتیبانی چندزبانه عالی است.',
    avatar: '👩‍💼'
  },
  {
    name: 'محمد رضایی',
    restaurant: 'رستوران بین‌المللی',
    location: 'مشهد، ایران',
    rating: 5,
    text: 'بهترین سرمایه‌گذاری که کردیم. گزارش‌گیری دقیق و مدیریت منو خیلی راحت شده.',
    avatar: '👨‍💻'
  }
];
```

---

## 🎯 مثال 5: اضافه کردن تصویر Hero

### فایل: `components/SaaSHero.tsx`

**قبل**:
```tsx
<div className="hero-image">
  <div className="hero-placeholder">
    <div className="phone-mockup">
      {/* placeholder */}
    </div>
  </div>
</div>
```

**بعد**:
```tsx
<div className="hero-image">
  <img 
    src="/images/hero-digital-menu.png" 
    alt="منوی دیجیتال AKAF"
    className="hero-image-img"
    style={{
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '1.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}
  />
</div>
```

**ساختار پوشه**:
```
public/
└── images/
    └── hero-digital-menu.png
```

---

## 🎯 مثال 6: اضافه کردن Logo

### فایل: `components/Navigation.tsx`

**قبل**:
```tsx
<Link href="/" className="logo">
  <strong>AKAF</strong>
</Link>
```

**بعد**:
```tsx
<Link href="/" className="logo">
  <img 
    src="/images/logo-akaf.png" 
    alt="AKAF Logo"
    style={{ 
      height: '45px', 
      width: 'auto',
      objectFit: 'contain'
    }}
  />
</Link>
```

---

## 🎯 مثال 7: اضافه کردن Client Logos

### فایل: `components/ClientLogos.tsx`

**قبل**:
```tsx
<div className="client-logo">
  {brand}
</div>
```

**بعد**:
```tsx
<div className="client-logo">
  <img 
    src={`/images/clients/${brand.toLowerCase().replace(/\s+/g, '-')}.png`}
    alt={brand}
    style={{ 
      maxWidth: '100%', 
      height: 'auto',
      filter: 'grayscale(100%)',
      opacity: 0.7,
      transition: 'all 0.3s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.filter = 'grayscale(0%)';
      e.currentTarget.style.opacity = '1';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.filter = 'grayscale(100%)';
      e.currentTarget.style.opacity = '0.7';
    }}
  />
</div>
```

**ساختار پوشه**:
```
public/
└── images/
    └── clients/
        ├── brand-1.png
        ├── brand-2.png
        ├── brand-3.png
        └── ...
```

---

## 🎯 مثال 8: تغییر Feature Icons به تصویر

### فایل: `components/SaaSFeatures.tsx`

**قبل**:
```tsx
<div className="feature-icon">{feature.icon}</div>
```

**بعد**:
```tsx
<div className="feature-icon">
  <img 
    src={`/images/features/${feature.key}.svg`}
    alt={t(`${feature.key}.title`)}
    style={{ 
      width: '64px', 
      height: '64px',
      objectFit: 'contain'
    }}
  />
</div>
```

**ساختار پوشه**:
```
public/
└── images/
    └── features/
        ├── easy-setup.svg
        ├── multilingual.svg
        ├── qr-code.svg
        ├── real-time.svg
        ├── analytics.svg
        └── mobile-friendly.svg
```

---

## 📐 اندازه‌های پیشنهادی تصاویر

| نوع تصویر | عرض | ارتفاع | فرمت |
|-----------|-----|--------|------|
| Logo | 200px | 50-80px | PNG (شفاف) |
| Hero Image | 1200px | 800px | JPG/WebP |
| Client Logo | 200px | 100px | PNG (شفاف) |
| Feature Icon | 128px | 128px | SVG/PNG |
| Testimonial Avatar | 64px | 64px | PNG/JPG (دایره) |

---

## 🎨 نکات طراحی

### 1. Hero Image
- از تصاویر با کیفیت بالا استفاده کنید
- سایز فایل: حداکثر 500KB
- نسبت تصویر: 3:2 یا 16:9

### 2. Logo
- پس‌زمینه شفاف (PNG)
- سایز مناسب برای Navigation
- رنگ‌های روشن برای پس‌زمینه تیره

### 3. Client Logos
- همه در یک سایز
- پس‌زمینه شفاف
- فیلتر grayscale برای یکنواختی

---

## ✅ چک‌لیست نهایی

قبل از انتشار:

- [ ] همه متون در 3 زبان (fa, en, ar) بررسی شده
- [ ] تصاویر بهینه شده (سایز مناسب)
- [ ] نام فایل‌ها صحیح است
- [ ] مسیر تصاویر درست است (`/images/...`)
- [ ] Alt text برای همه تصاویر اضافه شده
- [ ] تست در مرورگر انجام شده
- [ ] تست Responsive انجام شده

---

**موفق باشید! 🚀**

















