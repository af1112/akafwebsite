# 💳 راهنمای کامل تنظیم و تست Thawani Payment

## 📋 مرحله 1: دریافت کلیدهای Thawani

### از پنل Thawani:
1. به [پنل Thawani](https://dashboard.thawani.om) بروید
2. وارد حساب تجاری خود شوید
3. به بخش **API Keys** یا **Settings** → **API Keys** بروید
4. دو کلید را کپی کنید:
   - **Secret Key** (مثل: `sk_live_xxxxxxxxxxxxx`)
   - **Publishable Key** (مثل: `pk_live_xxxxxxxxxxxxx`)

### برای تست (Sandbox):
- اگر می‌خواهید ابتدا تست کنید، از **Sandbox/Test Keys** استفاده کنید
- آدرس Sandbox: `https://uatcheckout.thawani.om`

---

## 🔧 مرحله 2: تنظیم فایل Environment Variables

### در پوشه پروژه:
فایل `.env.local` ایجاد کنید (اگر وجود ندارد):

```bash
# در terminal
cd "D:\AKAFMenu\Project digitalmenu\multilingual-website"
```

### محتوای فایل `.env.local`:

```env
# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Thawani Configuration
THAWANI_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
THAWANI_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
THAWANI_USE_SANDBOX=false

# Thawani URLs (اختیاری - اگر ندهید خودکار ساخته می‌شود)
THAWANI_SUCCESS_URL=http://localhost:3000/thank-you
THAWANI_CANCEL_URL=http://localhost:3000/signup?status=cancelled

# PayPal (اگر می‌خواهید استفاده کنید)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### نکات مهم:
- ✅ **THAWANI_SECRET_KEY**: کلید Secret از پنل Thawani
- ✅ **THAWANI_PUBLISHABLE_KEY**: کلید Publishable از پنل Thawani
- ✅ **THAWANI_USE_SANDBOX**: 
  - `true` = استفاده از Sandbox (برای تست)
  - `false` = استفاده از Production (واقعی)
- ⚠️ **هیچ وقت** این فایل را به GitHub commit نکنید!

---

## 🧪 مرحله 3: تست مرحله به مرحله

### مرحله 3.1: نصب وابستگی‌ها

```bash
npm install
```

### مرحله 3.2: اجرای سرور توسعه

```bash
npm run dev
```

سرور روی `http://localhost:3000` اجرا می‌شود.

### مرحله 3.3: تست فرم ثبت‌نام

1. به `http://localhost:3000/en/signup` بروید
2. فرم را پر کنید:
   - Name: تست
   - Email: test@example.com
   - Phone: +968 1234 5678
   - Restaurant Name: Test Restaurant
   - Plan: یکی از پلن‌ها را انتخاب کنید
   - Password: یک رمز وارد کنید
3. روی **"Create Account & Continue to Payment"** کلیک کنید

### مرحله 3.4: تست پرداخت Thawani

1. در صفحه پرداخت، روی **"Pay with Thawani"** کلیک کنید
2. باید به صفحه پرداخت Thawani redirect شوید
3. در صفحه Thawani:
   - اطلاعات کارت تست را وارد کنید
   - یا از کارت واقعی استفاده کنید (اگر در Production mode هستید)

### مرحله 3.5: بررسی نتیجه

- ✅ **موفق**: به صفحه `/thank-you` redirect می‌شوید
- ❌ **لغو**: به صفحه `/signup?status=cancelled` برمی‌گردید

---

## 🔍 مرحله 4: بررسی Logs و Debug

### در Terminal:
وقتی روی "Pay with Thawani" کلیک می‌کنید، در terminal باید لاگ‌های زیر را ببینید:

```
POST /api/payments/thawani 200
```

اگر خطا دیدید:
- بررسی کنید که کلیدها در `.env.local` درست وارد شده باشند
- بررسی کنید که سرور را restart کرده باشید (بعد از تغییر `.env.local`)

### در Browser Console:
`F12` را بزنید و به Console بروید. اگر خطایی باشد، آنجا نمایش داده می‌شود.

---

## 🐛 مشکل‌یابی

### مشکل 1: "Thawani API keys are missing"
**راه حل:**
- بررسی کنید که فایل `.env.local` در پوشه root پروژه باشد
- بررسی کنید که نام متغیرها دقیقاً درست باشد:
  - `THAWANI_SECRET_KEY` (نه `THAWANI_SECRET` یا چیز دیگر)
  - `THAWANI_PUBLISHABLE_KEY` (نه `THAWANI_PUBLISHABLE`)
- سرور را restart کنید: `Ctrl+C` و سپس `npm run dev`

### مشکل 2: "Failed to create Thawani session"
**راه حل:**
- بررسی کنید که کلیدها معتبر باشند
- بررسی کنید که در Sandbox mode هستید یا Production
- در Terminal لاگ‌های خطا را بررسی کنید

### مشکل 3: Redirect نمی‌شود
**راه حل:**
- در Browser Console بررسی کنید که آیا خطای JavaScript وجود دارد
- بررسی کنید که `NEXT_PUBLIC_BASE_URL` درست تنظیم شده باشد

---

## 📝 نکات مهم

### 1. Sandbox vs Production:
- **Sandbox**: برای تست - از کارت‌های تست استفاده کنید
- **Production**: واقعی - از کارت‌های واقعی استفاده می‌شود

### 2. مبلغ پرداخت:
- Thawani از **Baisa** استفاده می‌کند (3 رقم اعشار)
- در کد، مبلغ به `amount * 1000` تبدیل می‌شود
- مثال: $29 = 29000 Baisa

### 3. Callback URLs:
- بعد از پرداخت موفق، به `THAWANI_SUCCESS_URL` redirect می‌شود
- اگر کاربر Cancel کند، به `THAWANI_CANCEL_URL` برمی‌گردد

---

## ✅ چک‌لیست نهایی

قبل از تست، مطمئن شوید:
- [ ] فایل `.env.local` ایجاد شده
- [ ] کلیدهای Thawani وارد شده
- [ ] `THAWANI_USE_SANDBOX` تنظیم شده (true برای تست)
- [ ] `NEXT_PUBLIC_BASE_URL` تنظیم شده
- [ ] سرور restart شده
- [ ] به `http://localhost:3000/en/signup` رفته‌اید

---

**موفق باشید! 🚀**

اگر مشکلی پیش آمد، لاگ‌های Terminal و Browser Console را بررسی کنید.


