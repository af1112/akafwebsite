# 📝 راهنمای کامل جایگزینی متون و تصاویر

این راهنما به شما کمک می‌کند تا متون و تصاویر صفحه اول وب‌سایت را به راحتی جایگزین کنید.

---

## 📁 ساختار فایل‌ها

### 1. فایل‌های ترجمه (متون)

تمام متون وب‌سایت در فایل‌های JSON قرار دارند:

```
multilingual-website/
└── messages/
    ├── en.json  (متون انگلیسی)
    ├── fa.json  (متون فارسی)
    └── ar.json  (متون عربی)
```

---

## ✏️ نحوه تغییر متون

### مرحله 1: باز کردن فایل ترجمه

برای تغییر متون هر زبان، فایل مربوطه را باز کنید:

- **انگلیسی**: `messages/en.json`
- **فارسی**: `messages/fa.json`
- **عربی**: `messages/ar.json`

### مرحله 2: پیدا کردن کلید مورد نظر

هر متن در وب‌سایت یک **کلید (key)** دارد. برای پیدا کردن کلید:

1. به کامپوننت مورد نظر بروید (مثلاً `components/SaaSHero.tsx`)
2. ببینید از چه کلیدی استفاده می‌کند (مثلاً `t('title')`)
3. در فایل JSON همان کلید را پیدا کنید

---

## 🎯 متون صفحه اول (HomePage)

### Hero Section (بخش اصلی)

**فایل**: `messages/en.json` (یا `fa.json` یا `ar.json`)

```json
{
  "HomePage": {
    "title": "عنوان اصلی - اینجا را تغییر دهید",
    "subtitle": "زیرعنوان - اینجا را تغییر دهید",
    "description": "توضیحات - اینجا را تغییر دهید",
    "cta": "متن دکمه اصلی",
    "ctaSecondary": "متن دکمه دوم"
  }
}
```

**مثال برای فارسی** (`messages/fa.json`):

```json
{
  "HomePage": {
    "title": "منوی دیجیتال حرفه‌ای برای رستوران‌ها",
    "subtitle": "رستوران خود را متحول کنید",
    "description": "راه‌حل کامل منوی دیجیتال با پشتیبانی چندزبانه",
    "cta": "شروع رایگان",
    "ctaSecondary": "مشاهده دمو"
  }
}
```

---

### Features Section (بخش ویژگی‌ها)

**مسیر در JSON**:
```json
{
  "HomePage": {
    "features": {
      "title": "عنوان بخش ویژگی‌ها",
      "subtitle": "زیرعنوان بخش ویژگی‌ها",
      "easySetup": {
        "title": "عنوان ویژگی 1",
        "description": "توضیحات ویژگی 1"
      },
      "multilingual": {
        "title": "عنوان ویژگی 2",
        "description": "توضیحات ویژگی 2"
      },
      "qrCode": {
        "title": "عنوان ویژگی 3",
        "description": "توضیحات ویژگی 3"
      },
      "realTime": {
        "title": "عنوان ویژگی 4",
        "description": "توضیحات ویژگی 4"
      },
      "analytics": {
        "title": "عنوان ویژگی 5",
        "description": "توضیحات ویژگی 5"
      },
      "mobileFriendly": {
        "title": "عنوان ویژگی 6",
        "description": "توضیحات ویژگی 6"
      }
    }
  }
}
```

**نکته**: می‌توانید ویژگی‌های بیشتری اضافه کنید. برای این کار:

1. در `messages/*.json` کلید جدید اضافه کنید
2. در `components/SaaSFeatures.tsx` آیتم جدید به آرایه `features` اضافه کنید

---

### Pricing Section (بخش قیمت‌گذاری)

**مسیر در JSON**:
```json
{
  "PricingPage": {
    "title": "عنوان بخش قیمت‌گذاری",
    "subtitle": "زیرعنوان بخش قیمت‌گذاری",
    "monthly": "ماهانه",
    "yearly": "سالانه",
    "save": "صرفه‌جویی",
    "popular": "محبوب‌ترین",
    "getStarted": "شروع کنید",
    "plans": {
      "starter": {
        "name": "نام پلن",
        "price": "قیمت (فقط عدد)",
        "description": "توضیحات پلن",
        "features": [
          "ویژگی 1",
          "ویژگی 2",
          "ویژگی 3"
        ]
      },
      "professional": {
        "name": "نام پلن",
        "price": "قیمت",
        "description": "توضیحات",
        "features": ["..."]
      },
      "enterprise": {
        "name": "نام پلن",
        "price": "قیمت",
        "description": "توضیحات",
        "features": ["..."]
      }
    }
  }
}
```

---

### Testimonials (نظرات مشتریان)

**فایل**: `components/Testimonials.tsx`

این بخش به صورت مستقیم در کامپوننت تعریف شده است. برای تغییر:

1. فایل `components/Testimonials.tsx` را باز کنید
2. آرایه `testimonials` را پیدا کنید
3. داده‌ها را تغییر دهید:

```typescript
const testimonials = [
  {
    name: 'نام مشتری',
    restaurant: 'نام رستوران',
    location: 'مکان',
    rating: 5,  // تعداد ستاره (1 تا 5)
    text: 'متن نظر مشتری',
    avatar: '👨‍🍳'  // ایموجی یا می‌توانید تصویر اضافه کنید
  },
  // ...
];
```

---

### سایر بخش‌ها

**FAQ Section**: `messages/*.json` → `FAQSection`
**Blog Section**: `messages/*.json` → `BlogSection`
**Support Section**: `messages/*.json` → `SupportSection`
**Security Section**: `messages/*.json` → `SecuritySection`

---

## 🖼️ نحوه اضافه کردن تصاویر

### روش 1: استفاده از پوشه `public`

1. یک پوشه `public` در ریشه پروژه ایجاد کنید (اگر وجود ندارد):

```
multilingual-website/
└── public/
    ├── images/
    │   ├── hero-image.png
    │   ├── logo.png
    │   └── ...
```

2. تصاویر خود را در `public/images/` قرار دهید

3. در کامپوننت از آن‌ها استفاده کنید:

```tsx
// در components/SaaSHero.tsx
<div className="hero-image">
  <img 
    src="/images/hero-image.png" 
    alt="Hero Image"
    className="hero-image-img"
  />
</div>
```

---

### روش 2: جایگزینی Hero Image

**فایل**: `components/SaaSHero.tsx`

**قبل** (placeholder):
```tsx
<div className="hero-image">
  <div className="hero-placeholder">
    <div className="phone-mockup">
      {/* ... */}
    </div>
  </div>
</div>
```

**بعد** (با تصویر واقعی):
```tsx
<div className="hero-image">
  <img 
    src="/images/your-hero-image.png" 
    alt="Digital Menu Preview"
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

---

### روش 3: اضافه کردن Logo

**فایل**: `components/Navigation.tsx`

**قبل**:
```tsx
<Link href="/" className="logo">
  <strong>AKAF</strong>
</Link>
```

**بعد** (با تصویر):
```tsx
<Link href="/" className="logo">
  <img 
    src="/images/logo.png" 
    alt="AKAF Logo"
    style={{ height: '40px', width: 'auto' }}
  />
</Link>
```

---

### روش 4: تصاویر Client Logos

**فایل**: `components/ClientLogos.tsx`

**قبل** (متن):
```tsx
<div className="client-logo">
  {brand}
</div>
```

**بعد** (با تصویر):
```tsx
<div className="client-logo">
  <img 
    src={`/images/clients/${brand.toLowerCase().replace(/\s+/g, '-')}.png`}
    alt={brand}
    style={{ maxWidth: '100%', height: 'auto' }}
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
        └── ...
```

---

### روش 5: تصاویر در Feature Cards

**فایل**: `components/SaaSFeatures.tsx`

**قبل** (ایموجی):
```tsx
<div className="feature-icon">{feature.icon}</div>
```

**بعد** (تصویر):
```tsx
<div className="feature-icon">
  <img 
    src={`/images/features/${feature.key}.png`}
    alt={t(`${feature.key}.title`)}
    style={{ width: '64px', height: '64px' }}
  />
</div>
```

---

## 📋 چک‌لیست جایگزینی محتوا

### ✅ متون

- [ ] Hero Section (عنوان، زیرعنوان، توضیحات)
- [ ] Features (6 ویژگی)
- [ ] Pricing (3 پلن)
- [ ] Testimonials (3 نظر)
- [ ] FAQ (سوالات متداول)
- [ ] Navigation (منو)
- [ ] Footer (فوتر)

### ✅ تصاویر

- [ ] Logo (لوگو)
- [ ] Hero Image (تصویر اصلی)
- [ ] Client Logos (لوگوهای مشتریان)
- [ ] Feature Icons (آیکون‌های ویژگی‌ها)
- [ ] Testimonial Avatars (تصاویر مشتریان - اختیاری)

---

## 🎨 نکات مهم

### 1. فرمت تصاویر

- **پیشنهاد**: PNG یا WebP برای لوگوها و آیکون‌ها
- **پیشنهاد**: JPG یا WebP برای تصاویر بزرگ
- **اندازه**: تصاویر را بهینه کنید (max 500KB)

### 2. سایز تصاویر

- **Logo**: 200x50px (یا نسبت مشابه)
- **Hero Image**: 1200x800px (یا نسبت 3:2)
- **Client Logos**: 200x100px
- **Feature Icons**: 128x128px

### 3. نام‌گذاری فایل‌ها

- از نام‌های انگلیسی و بدون فاصله استفاده کنید
- مثال: `hero-image.png` نه `hero image.png`
- از حروف کوچک استفاده کنید

---

## 🔧 مثال عملی: تغییر Hero Section

### مرحله 1: تغییر متون

**فایل**: `messages/fa.json`

```json
{
  "HomePage": {
    "title": "سیستم منوی دیجیتال حرفه‌ای",
    "subtitle": "رستوران خود را به عصر دیجیتال ببرید",
    "description": "با سیستم منوی دیجیتال ما، مدیریت منو، افزایش فروش و رضایت مشتری را تجربه کنید.",
    "cta": "شروع رایگان",
    "ctaSecondary": "تماشای ویدیو دمو"
  }
}
```

### مرحله 2: اضافه کردن تصویر

1. تصویر را در `public/images/hero.png` قرار دهید

2. **فایل**: `components/SaaSHero.tsx` را ویرایش کنید:

```tsx
<div className="hero-image">
  <img 
    src="/images/hero.png" 
    alt="Digital Menu Preview"
    className="hero-image-img"
  />
</div>
```

3. **فایل**: `app/[locale]/globals.css` استایل اضافه کنید:

```css
.hero-image-img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  animation: floatPhone 6s ease-in-out infinite;
}
```

---

## 📱 Responsive Images

برای تصاویر responsive، از تگ `<img>` با `srcset` استفاده کنید:

```tsx
<img 
  src="/images/hero.png"
  srcSet="/images/hero-small.png 480w, /images/hero.png 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Hero Image"
/>
```

---

## 🚀 بعد از تغییرات

1. **ذخیره فایل‌ها**
2. **بررسی در مرورگر**: `npm run dev`
3. **تست در همه زبان‌ها**: `/en`, `/fa`, `/ar`
4. **بررسی Responsive**: در موبایل و تبلت

---

## ❓ سوالات متداول

### Q: چطور یک بخش جدید اضافه کنم؟

**A**: 
1. در `messages/*.json` کلید جدید اضافه کنید
2. در کامپوننت از `useTranslations` استفاده کنید
3. کامپوننت را در `app/[locale]/page.tsx` اضافه کنید

### Q: چطور فونت را تغییر دهم؟

**A**: در `app/[locale]/layout.tsx` لینک فونت Google Fonts را تغییر دهید.

### Q: چطور رنگ‌ها را تغییر دهم؟

**A**: در `app/[locale]/globals.css` متغیرهای CSS در `:root` را تغییر دهید.

---

## 📞 کمک بیشتر

اگر مشکلی داشتید یا سوالی دارید، فایل‌های زیر را بررسی کنید:

- `components/SaaSHero.tsx` - Hero Section
- `components/SaaSFeatures.tsx` - Features
- `components/PricingSection.tsx` - Pricing
- `messages/en.json` - متون انگلیسی
- `messages/fa.json` - متون فارسی
- `messages/ar.json` - متون عربی

---

**موفق باشید! 🎉**








این راهنما به شما کمک می‌کند تا متون و تصاویر صفحه اول وب‌سایت را به راحتی جایگزین کنید.

---

## 📁 ساختار فایل‌ها

### 1. فایل‌های ترجمه (متون)

تمام متون وب‌سایت در فایل‌های JSON قرار دارند:

```
multilingual-website/
└── messages/
    ├── en.json  (متون انگلیسی)
    ├── fa.json  (متون فارسی)
    └── ar.json  (متون عربی)
```

---

## ✏️ نحوه تغییر متون

### مرحله 1: باز کردن فایل ترجمه

برای تغییر متون هر زبان، فایل مربوطه را باز کنید:

- **انگلیسی**: `messages/en.json`
- **فارسی**: `messages/fa.json`
- **عربی**: `messages/ar.json`

### مرحله 2: پیدا کردن کلید مورد نظر

هر متن در وب‌سایت یک **کلید (key)** دارد. برای پیدا کردن کلید:

1. به کامپوننت مورد نظر بروید (مثلاً `components/SaaSHero.tsx`)
2. ببینید از چه کلیدی استفاده می‌کند (مثلاً `t('title')`)
3. در فایل JSON همان کلید را پیدا کنید

---

## 🎯 متون صفحه اول (HomePage)

### Hero Section (بخش اصلی)

**فایل**: `messages/en.json` (یا `fa.json` یا `ar.json`)

```json
{
  "HomePage": {
    "title": "عنوان اصلی - اینجا را تغییر دهید",
    "subtitle": "زیرعنوان - اینجا را تغییر دهید",
    "description": "توضیحات - اینجا را تغییر دهید",
    "cta": "متن دکمه اصلی",
    "ctaSecondary": "متن دکمه دوم"
  }
}
```

**مثال برای فارسی** (`messages/fa.json`):

```json
{
  "HomePage": {
    "title": "منوی دیجیتال حرفه‌ای برای رستوران‌ها",
    "subtitle": "رستوران خود را متحول کنید",
    "description": "راه‌حل کامل منوی دیجیتال با پشتیبانی چندزبانه",
    "cta": "شروع رایگان",
    "ctaSecondary": "مشاهده دمو"
  }
}
```

---

### Features Section (بخش ویژگی‌ها)

**مسیر در JSON**:
```json
{
  "HomePage": {
    "features": {
      "title": "عنوان بخش ویژگی‌ها",
      "subtitle": "زیرعنوان بخش ویژگی‌ها",
      "easySetup": {
        "title": "عنوان ویژگی 1",
        "description": "توضیحات ویژگی 1"
      },
      "multilingual": {
        "title": "عنوان ویژگی 2",
        "description": "توضیحات ویژگی 2"
      },
      "qrCode": {
        "title": "عنوان ویژگی 3",
        "description": "توضیحات ویژگی 3"
      },
      "realTime": {
        "title": "عنوان ویژگی 4",
        "description": "توضیحات ویژگی 4"
      },
      "analytics": {
        "title": "عنوان ویژگی 5",
        "description": "توضیحات ویژگی 5"
      },
      "mobileFriendly": {
        "title": "عنوان ویژگی 6",
        "description": "توضیحات ویژگی 6"
      }
    }
  }
}
```

**نکته**: می‌توانید ویژگی‌های بیشتری اضافه کنید. برای این کار:

1. در `messages/*.json` کلید جدید اضافه کنید
2. در `components/SaaSFeatures.tsx` آیتم جدید به آرایه `features` اضافه کنید

---

### Pricing Section (بخش قیمت‌گذاری)

**مسیر در JSON**:
```json
{
  "PricingPage": {
    "title": "عنوان بخش قیمت‌گذاری",
    "subtitle": "زیرعنوان بخش قیمت‌گذاری",
    "monthly": "ماهانه",
    "yearly": "سالانه",
    "save": "صرفه‌جویی",
    "popular": "محبوب‌ترین",
    "getStarted": "شروع کنید",
    "plans": {
      "starter": {
        "name": "نام پلن",
        "price": "قیمت (فقط عدد)",
        "description": "توضیحات پلن",
        "features": [
          "ویژگی 1",
          "ویژگی 2",
          "ویژگی 3"
        ]
      },
      "professional": {
        "name": "نام پلن",
        "price": "قیمت",
        "description": "توضیحات",
        "features": ["..."]
      },
      "enterprise": {
        "name": "نام پلن",
        "price": "قیمت",
        "description": "توضیحات",
        "features": ["..."]
      }
    }
  }
}
```

---

### Testimonials (نظرات مشتریان)

**فایل**: `components/Testimonials.tsx`

این بخش به صورت مستقیم در کامپوننت تعریف شده است. برای تغییر:

1. فایل `components/Testimonials.tsx` را باز کنید
2. آرایه `testimonials` را پیدا کنید
3. داده‌ها را تغییر دهید:

```typescript
const testimonials = [
  {
    name: 'نام مشتری',
    restaurant: 'نام رستوران',
    location: 'مکان',
    rating: 5,  // تعداد ستاره (1 تا 5)
    text: 'متن نظر مشتری',
    avatar: '👨‍🍳'  // ایموجی یا می‌توانید تصویر اضافه کنید
  },
  // ...
];
```

---

### سایر بخش‌ها

**FAQ Section**: `messages/*.json` → `FAQSection`
**Blog Section**: `messages/*.json` → `BlogSection`
**Support Section**: `messages/*.json` → `SupportSection`
**Security Section**: `messages/*.json` → `SecuritySection`

---

## 🖼️ نحوه اضافه کردن تصاویر

### روش 1: استفاده از پوشه `public`

1. یک پوشه `public` در ریشه پروژه ایجاد کنید (اگر وجود ندارد):

```
multilingual-website/
└── public/
    ├── images/
    │   ├── hero-image.png
    │   ├── logo.png
    │   └── ...
```

2. تصاویر خود را در `public/images/` قرار دهید

3. در کامپوننت از آن‌ها استفاده کنید:

```tsx
// در components/SaaSHero.tsx
<div className="hero-image">
  <img 
    src="/images/hero-image.png" 
    alt="Hero Image"
    className="hero-image-img"
  />
</div>
```

---

### روش 2: جایگزینی Hero Image

**فایل**: `components/SaaSHero.tsx`

**قبل** (placeholder):
```tsx
<div className="hero-image">
  <div className="hero-placeholder">
    <div className="phone-mockup">
      {/* ... */}
    </div>
  </div>
</div>
```

**بعد** (با تصویر واقعی):
```tsx
<div className="hero-image">
  <img 
    src="/images/your-hero-image.png" 
    alt="Digital Menu Preview"
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

---

### روش 3: اضافه کردن Logo

**فایل**: `components/Navigation.tsx`

**قبل**:
```tsx
<Link href="/" className="logo">
  <strong>AKAF</strong>
</Link>
```

**بعد** (با تصویر):
```tsx
<Link href="/" className="logo">
  <img 
    src="/images/logo.png" 
    alt="AKAF Logo"
    style={{ height: '40px', width: 'auto' }}
  />
</Link>
```

---

### روش 4: تصاویر Client Logos

**فایل**: `components/ClientLogos.tsx`

**قبل** (متن):
```tsx
<div className="client-logo">
  {brand}
</div>
```

**بعد** (با تصویر):
```tsx
<div className="client-logo">
  <img 
    src={`/images/clients/${brand.toLowerCase().replace(/\s+/g, '-')}.png`}
    alt={brand}
    style={{ maxWidth: '100%', height: 'auto' }}
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
        └── ...
```

---

### روش 5: تصاویر در Feature Cards

**فایل**: `components/SaaSFeatures.tsx`

**قبل** (ایموجی):
```tsx
<div className="feature-icon">{feature.icon}</div>
```

**بعد** (تصویر):
```tsx
<div className="feature-icon">
  <img 
    src={`/images/features/${feature.key}.png`}
    alt={t(`${feature.key}.title`)}
    style={{ width: '64px', height: '64px' }}
  />
</div>
```

---

## 📋 چک‌لیست جایگزینی محتوا

### ✅ متون

- [ ] Hero Section (عنوان، زیرعنوان، توضیحات)
- [ ] Features (6 ویژگی)
- [ ] Pricing (3 پلن)
- [ ] Testimonials (3 نظر)
- [ ] FAQ (سوالات متداول)
- [ ] Navigation (منو)
- [ ] Footer (فوتر)

### ✅ تصاویر

- [ ] Logo (لوگو)
- [ ] Hero Image (تصویر اصلی)
- [ ] Client Logos (لوگوهای مشتریان)
- [ ] Feature Icons (آیکون‌های ویژگی‌ها)
- [ ] Testimonial Avatars (تصاویر مشتریان - اختیاری)

---

## 🎨 نکات مهم

### 1. فرمت تصاویر

- **پیشنهاد**: PNG یا WebP برای لوگوها و آیکون‌ها
- **پیشنهاد**: JPG یا WebP برای تصاویر بزرگ
- **اندازه**: تصاویر را بهینه کنید (max 500KB)

### 2. سایز تصاویر

- **Logo**: 200x50px (یا نسبت مشابه)
- **Hero Image**: 1200x800px (یا نسبت 3:2)
- **Client Logos**: 200x100px
- **Feature Icons**: 128x128px

### 3. نام‌گذاری فایل‌ها

- از نام‌های انگلیسی و بدون فاصله استفاده کنید
- مثال: `hero-image.png` نه `hero image.png`
- از حروف کوچک استفاده کنید

---

## 🔧 مثال عملی: تغییر Hero Section

### مرحله 1: تغییر متون

**فایل**: `messages/fa.json`

```json
{
  "HomePage": {
    "title": "سیستم منوی دیجیتال حرفه‌ای",
    "subtitle": "رستوران خود را به عصر دیجیتال ببرید",
    "description": "با سیستم منوی دیجیتال ما، مدیریت منو، افزایش فروش و رضایت مشتری را تجربه کنید.",
    "cta": "شروع رایگان",
    "ctaSecondary": "تماشای ویدیو دمو"
  }
}
```

### مرحله 2: اضافه کردن تصویر

1. تصویر را در `public/images/hero.png` قرار دهید

2. **فایل**: `components/SaaSHero.tsx` را ویرایش کنید:

```tsx
<div className="hero-image">
  <img 
    src="/images/hero.png" 
    alt="Digital Menu Preview"
    className="hero-image-img"
  />
</div>
```

3. **فایل**: `app/[locale]/globals.css` استایل اضافه کنید:

```css
.hero-image-img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  animation: floatPhone 6s ease-in-out infinite;
}
```

---

## 📱 Responsive Images

برای تصاویر responsive، از تگ `<img>` با `srcset` استفاده کنید:

```tsx
<img 
  src="/images/hero.png"
  srcSet="/images/hero-small.png 480w, /images/hero.png 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Hero Image"
/>
```

---

## 🚀 بعد از تغییرات

1. **ذخیره فایل‌ها**
2. **بررسی در مرورگر**: `npm run dev`
3. **تست در همه زبان‌ها**: `/en`, `/fa`, `/ar`
4. **بررسی Responsive**: در موبایل و تبلت

---

## ❓ سوالات متداول

### Q: چطور یک بخش جدید اضافه کنم؟

**A**: 
1. در `messages/*.json` کلید جدید اضافه کنید
2. در کامپوننت از `useTranslations` استفاده کنید
3. کامپوننت را در `app/[locale]/page.tsx` اضافه کنید

### Q: چطور فونت را تغییر دهم؟

**A**: در `app/[locale]/layout.tsx` لینک فونت Google Fonts را تغییر دهید.

### Q: چطور رنگ‌ها را تغییر دهم؟

**A**: در `app/[locale]/globals.css` متغیرهای CSS در `:root` را تغییر دهید.

---

## 📞 کمک بیشتر

اگر مشکلی داشتید یا سوالی دارید، فایل‌های زیر را بررسی کنید:

- `components/SaaSHero.tsx` - Hero Section
- `components/SaaSFeatures.tsx` - Features
- `components/PricingSection.tsx` - Pricing
- `messages/en.json` - متون انگلیسی
- `messages/fa.json` - متون فارسی
- `messages/ar.json` - متون عربی

---

**موفق باشید! 🎉**



















