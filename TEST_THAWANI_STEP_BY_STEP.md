# 🧪 راهنمای تست مرحله به مرحله Thawani Payment

## 📝 قبل از شروع

### چک‌لیست:
- [ ] کلیدهای Thawani را از پنل دریافت کرده‌اید
- [ ] فایل `.env.local` ایجاد کرده‌اید
- [ ] کلیدها را در `.env.local` وارد کرده‌اید

---

## 🚀 مرحله 1: ایجاد فایل .env.local

### در Terminal:
```bash
cd "D:\AKAFMenu\Project digitalmenu\multilingual-website"
```

### ایجاد فایل:
1. در VS Code یا هر ویرایشگر، فایل `.env.local` را در پوشه root پروژه ایجاد کنید
2. محتوای زیر را کپی کنید و کلیدهای خود را جایگزین کنید:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
THAWANI_SECRET_KEY=sk_live_YOUR_SECRET_KEY
THAWANI_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY
THAWANI_USE_SANDBOX=false
THAWANI_SUCCESS_URL=http://localhost:3000/thank-you
THAWANI_CANCEL_URL=http://localhost:3000/signup?status=cancelled
```

### نکته:
- `YOUR_SECRET_KEY` را با کلید Secret واقعی جایگزین کنید
- `YOUR_PUBLISHABLE_KEY` را با کلید Publishable واقعی جایگزین کنید
- اگر می‌خواهید تست کنید، `THAWANI_USE_SANDBOX=true` بگذارید

---

## 🚀 مرحله 2: نصب وابستگی‌ها

```bash
npm install
```

---

## 🚀 مرحله 3: اجرای سرور

```bash
npm run dev
```

باید پیام زیر را ببینید:
```
▲ Next.js 14.2.33
- Local:        http://localhost:3000
```

---

## 🧪 مرحله 4: تست فرم ثبت‌نام

### 4.1: باز کردن صفحه Signup
1. مرورگر را باز کنید
2. به `http://localhost:3000/en/signup` بروید

### 4.2: پر کردن فرم
فرم را با اطلاعات زیر پر کنید:
- **Name**: `Test User`
- **Email**: `test@example.com`
- **Phone**: `+968 1234 5678`
- **Restaurant Name**: `Test Restaurant`
- **Plan**: `Starter` (یا هر پلنی که می‌خواهید)
- **Password**: `test123456`
- **Confirm Password**: `test123456`
- ✅ **I agree to the Terms** را تیک بزنید

### 4.3: Submit فرم
روی **"Create Account & Continue to Payment"** کلیک کنید

**انتظار:** باید به صفحه پرداخت بروید

---

## 💳 مرحله 5: تست پرداخت Thawani

### 5.1: بررسی صفحه پرداخت
در صفحه پرداخت باید ببینید:
- ✅ خلاصه پلن انتخاب شده
- ✅ مبلغ پرداخت
- ✅ دکمه **"Pay with Thawani"**
- ✅ دکمه PayPal

### 5.2: کلیک روی "Pay with Thawani"
1. روی دکمه **"Pay with Thawani"** کلیک کنید
2. دکمه باید به **"Redirecting…"** تغییر کند

**انتظار:** باید به صفحه پرداخت Thawani redirect شوید

### 5.3: بررسی Terminal
در Terminal باید لاگ زیر را ببینید:
```
POST /api/payments/thawani 200
```

اگر خطا دیدید:
- بررسی کنید که کلیدها در `.env.local` درست باشند
- بررسی کنید که سرور را restart کرده باشید

### 5.4: بررسی Browser Console
1. `F12` را بزنید
2. به تب **Console** بروید
3. نباید خطای قرمز ببینید

---

## 🔍 مرحله 6: تست در صفحه Thawani

### 6.1: بررسی URL
URL باید شبیه این باشد:
```
https://checkout.thawani.om/pay/SESSION_ID?key=YOUR_PUBLISHABLE_KEY
```

### 6.2: وارد کردن اطلاعات کارت
- اگر در **Sandbox** هستید: از کارت تست استفاده کنید
- اگر در **Production** هستید: از کارت واقعی استفاده کنید

### 6.3: پرداخت
1. اطلاعات کارت را وارد کنید
2. روی **"Pay"** کلیک کنید

---

## ✅ مرحله 7: بررسی نتیجه

### 7.1: پرداخت موفق
**انتظار:** باید به `http://localhost:3000/thank-you` redirect شوید

در صفحه Thank You باید ببینید:
- ✅ آیکون موفقیت
- ✅ پیام "Payment Successful!"
- ✅ Session ID (اگر Thawani برگرداند)
- ✅ دکمه "Go to Login"
- ✅ دکمه "Back to Home"

### 7.2: پرداخت لغو شده
**انتظار:** باید به `http://localhost:3000/signup?status=cancelled` برگردید

---

## 🐛 مشکل‌یابی

### مشکل: "Thawani API keys are missing"
**راه حل:**
1. بررسی کنید که فایل `.env.local` در پوشه root باشد
2. بررسی کنید که نام متغیرها دقیق باشد
3. سرور را restart کنید: `Ctrl+C` و سپس `npm run dev`

### مشکل: "Failed to create Thawani session"
**راه حل:**
1. کلیدها را دوباره از پنل Thawani کپی کنید
2. بررسی کنید که کلیدها معتبر باشند
3. در Terminal لاگ‌های خطا را بررسی کنید

### مشکل: Redirect نمی‌شود
**راه حل:**
1. Browser Console را بررسی کنید (`F12`)
2. بررسی کنید که `NEXT_PUBLIC_BASE_URL` درست باشد
3. بررسی کنید که CORS یا فایروال مانع نشود

---

## 📊 چک‌لیست تست

بعد از هر مرحله، این موارد را بررسی کنید:

- [ ] فایل `.env.local` ایجاد شده و کلیدها وارد شده
- [ ] سرور بدون خطا اجرا می‌شود
- [ ] صفحه Signup باز می‌شود
- [ ] فرم submit می‌شود و به صفحه پرداخت می‌رود
- [ ] دکمه "Pay with Thawani" کار می‌کند
- [ ] به صفحه Thawani redirect می‌شود
- [ ] بعد از پرداخت، به صفحه Thank You می‌رود

---

## 🎯 تست نهایی

### سناریو کامل:
1. ✅ فرم ثبت‌نام را پر کنید
2. ✅ به صفحه پرداخت بروید
3. ✅ روی "Pay with Thawani" کلیک کنید
4. ✅ در صفحه Thawani پرداخت کنید
5. ✅ به صفحه Thank You redirect شوید

**اگر همه این مراحل کار کردند، تست موفق است! 🎉**

---

## 📞 اگر مشکل داشتید

1. **Terminal Logs**: لاگ‌های Terminal را بررسی کنید
2. **Browser Console**: `F12` → Console را بررسی کنید
3. **Network Tab**: `F12` → Network → بررسی کنید که درخواست `/api/payments/thawani` موفق است

---

**موفق باشید! 🚀**


