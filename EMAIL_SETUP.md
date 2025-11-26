# 📧 راهنمای تنظیم ارسال ایمیل

برای فعال‌سازی ارسال ایمیل از فرم تماس، یکی از روش‌های زیر را انتخاب کنید:

---

## روش 1: استفاده از Resend (پیشنهادی)

### مزایا:
- رایگان تا 3000 ایمیل در ماه
- مناسب برای Next.js
- راه‌اندازی آسان
- API ساده

### ⚡ راهنمای سریع:

**برای شروع سریع (تست):**
1. API Key را از Resend بگیرید
2. در `.env.local` اضافه کنید: `RESEND_API_KEY=re_xxxxx`
3. **هیچ تغییری در کد لازم نیست!** (از `onboarding@resend.dev` استفاده می‌شود)

**برای استفاده در production:**
1. دامنه `akafco.com` را در Resend تأیید کنید
2. در کد، `onboarding@resend.dev` را به `noreply@akafco.com` تغییر دهید

---

### مراحل کامل:

1. **ثبت‌نام در Resend:**
   - به [resend.com](https://resend.com) بروید
   - یک حساب کاربری ایجاد کنید
   - API Key خود را دریافت کنید

2. **نصب پکیج:**
   ```bash
   npm install resend
   ```

3. **افزودن به .env.local:**
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

4. **تغییر آدرس فرستنده:**

   **گزینه 1: استفاده از آدرس پیش‌فرض (برای تست):**
   - می‌توانید همان `onboarding@resend.dev` را نگه دارید
   - این آدرس فقط برای تست کار می‌کند
   - برای production باید دامنه خود را تأیید کنید

   **گزینه 2: استفاده از دامنه خود (پیشنهادی برای production):**
   
   **مرحله 1:** در پنل Resend:
   - به بخش "Domains" بروید
   - دکمه "Add Domain" را بزنید
   - دامنه `akafco.com` را اضافه کنید
   - DNS records را طبق دستورالعمل Resend تنظیم کنید
   - منتظر تأیید دامنه بمانید (معمولاً چند دقیقه تا چند ساعت)
   
   **مرحله 2:** تغییر کد:
   - در فایل `app/api/contact/route.ts`
   - خط 43 را پیدا کنید:
   ```typescript
   from: 'Contact Form <onboarding@resend.dev>',
   ```
   - به یکی از این آدرس‌ها تغییر دهید:
   ```typescript
   from: 'Contact Form <noreply@akafco.com>',
   // یا
   from: 'Contact Form <contact@akafco.com>',
   // یا
   from: 'AKAF Contact <info@akafco.com>',
   ```
   
   **نکته مهم:** 
   - فقط از آدرس‌هایی استفاده کنید که دامنه آن‌ها (`akafco.com`) در Resend تأیید شده باشد
   - اگر دامنه را تأیید نکرده‌اید، از `onboarding@resend.dev` استفاده کنید (فقط برای تست)

---

## روش 2: استفاده از SMTP (Nodemailer)

### مزایا:
- استفاده از سرویس ایمیل موجود (Gmail, Outlook, etc.)
- کنترل کامل

### مراحل:

1. **نصب Nodemailer:**
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **افزودن به .env.local:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=your-email@gmail.com
   ```

### نکات مهم:
- برای Gmail باید از "App Password" استفاده کنید
- برای Outlook از تنظیمات SMTP Outlook استفاده کنید

---

## روش 3: استفاده از SendGrid

### مراحل:

1. **ثبت‌نام در SendGrid:**
   - به [sendgrid.com](https://sendgrid.com) بروید
   - حساب کاربری ایجاد کنید
   - API Key دریافت کنید

2. **نصب پکیج:**
   ```bash
   npm install @sendgrid/mail
   ```

3. **افزودن به .env.local:**
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   ```

4. **تغییر کد در `app/api/contact/route.ts`:**
   ```typescript
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
   await sgMail.send({
     to: 'info@akafco.com',
     from: 'noreply@akafco.com',
     subject: `Contact Form: ${subject}`,
     text: emailContent,
     replyTo: email,
   });
   ```

---

## تست

بعد از تنظیم، فرم تماس را تست کنید:

1. به `/fa/contact` بروید
2. فرم را پر کنید
3. دکمه "ارسال پیام" را بزنید
4. بررسی کنید که ایمیل به `info@akafco.com` ارسال شده باشد

---

## نکات امنیتی

- هرگز API Key را در کد قرار ندهید
- همیشه از `.env.local` استفاده کنید
- `.env.local` را به `.gitignore` اضافه کنید
- در production از متغیرهای محیطی سرور استفاده کنید

---

## عیب‌یابی

### مشکل: ایمیل ارسال نمی‌شود

1. **بررسی لاگ‌ها:**
   - در ترمینال لاگ‌های خطا را بررسی کنید
   - در Developer Tools (F12) تب Network را بررسی کنید

2. **بررسی متغیرهای محیطی:**
   - مطمئن شوید که `.env.local` درست تنظیم شده
   - سرور را restart کنید بعد از تغییر `.env.local`

3. **بررسی API Key:**
   - مطمئن شوید که API Key معتبر است
   - در Resend/SendGrid بررسی کنید که API Key فعال است

---

**موفق باشید! 🚀**

