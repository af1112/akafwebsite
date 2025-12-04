# راهنمای انتقال سایت به دامنه اصلی akafco.com

## 📋 مراحل انتقال

### مرحله 1: اضافه کردن دامنه در Vercel

1. **ورود به Vercel Dashboard**
   - به [vercel.com](https://vercel.com) برو
   - وارد حساب کاربری‌ات شو
   - پروژه `akafwebsite` را باز کن

2. **اضافه کردن دامنه**
   - به بخش **Settings** برو
   - از منوی سمت چپ **Domains** را انتخاب کن
   - روی دکمه **Add Domain** کلیک کن
   - دامنه `akafco.com` را وارد کن
   - روی **Add** کلیک کن

3. **دریافت DNS Records**
   - Vercel به تو دو نوع DNS record می‌دهد:
     - **A Record** یا **CNAME Record**
     - معمولاً برای دامنه اصلی از **A Record** استفاده می‌شود

---

### مرحله 2: تنظیم DNS Records

1. **ورود به پنل DNS Provider**
   - به پنل مدیریت دامنه‌ات برو (مثلاً GoDaddy, Namecheap, Cloudflare و...)
   - بخش **DNS Management** یا **DNS Settings** را پیدا کن

2. **اضافه/ویرایش DNS Records**
   
   **گزینه 1: استفاده از A Record (توصیه می‌شود)**
   ```
   Type: A
   Name: @ (یا akafco.com)
   Value: [IP Address که Vercel داده]
   TTL: 3600 (یا Auto)
   ```
   
   **گزینه 2: استفاده از CNAME Record**
   ```
   Type: CNAME
   Name: @ (یا akafco.com)
   Value: cname.vercel-dns.com
   TTL: 3600 (یا Auto)
   ```

3. **برای www (اختیاری اما توصیه می‌شود)**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

4. **ذخیره تغییرات**
   - تغییرات را ذخیره کن
   - منتظر بمان تا DNS propagate شود (معمولاً 5 دقیقه تا 48 ساعت)

---

### مرحله 3: تنظیم Environment Variables در Vercel

1. **ورود به Settings → Environment Variables**
   - در Vercel Dashboard
   - به **Settings** → **Environment Variables** برو

2. **اضافه/ویرایش متغیر**
   - متغیر `NEXT_PUBLIC_BASE_URL` را پیدا کن یا اضافه کن
   - مقدار را به `https://akafco.com` تغییر بده
   - برای همه محیط‌ها (Production, Preview, Development) اعمال کن
   - روی **Save** کلیک کن

---

### مرحله 4: Redeploy پروژه

1. **Redeploy در Vercel**
   - به بخش **Deployments** برو
   - آخرین deployment را پیدا کن
   - روی **⋯** (سه نقطه) کلیک کن
   - **Redeploy** را انتخاب کن
   - منتظر بمان تا build کامل شود

---

### مرحله 5: بررسی و تست

1. **بررسی DNS Propagation**
   - از [whatsmydns.net](https://www.whatsmydns.net) استفاده کن
   - دامنه `akafco.com` را چک کن
   - مطمئن شو که DNS records درست propagate شده‌اند

2. **تست دسترسی**
   - به `https://akafco.com` برو
   - مطمئن شو که سایت به درستی لود می‌شود
   - صفحات مختلف را تست کن

3. **بررسی SSL Certificate**
   - Vercel به صورت خودکار SSL certificate صادر می‌کند
   - مطمئن شو که `https://` کار می‌کند

---

### مرحله 6: Redirect از ساب‌دامین (اختیاری)

اگر می‌خواهی که بازدیدکنندگان `akafcoweb.akafco.com` به طور خودکار به `akafco.com` redirect شوند:

1. **در Vercel**
   - به **Settings** → **Domains** برو
   - دامنه `akafcoweb.akafco.com` را پیدا کن
   - می‌توانی آن را حذف کنی یا نگه داری

2. **یا در کد (Redirect در Next.js)**
   - می‌توانیم middleware اضافه کنیم که از `akafcoweb.akafco.com` به `akafco.com` redirect کند

---

## ⚠️ نکات مهم

### قبل از شروع:
- ✅ مطمئن شو که دسترسی به پنل DNS داری
- ✅ از DNS records فعلی backup بگیر
- ✅ زمان مناسب را انتخاب کن (DNS propagation ممکن است چند ساعت طول بکشد)

### بعد از انتقال:
- ✅ بررسی کن که همه صفحات درست کار می‌کنند
- ✅ بررسی کن که Analytics و Speed Insights کار می‌کنند
- ✅ بررسی کن که فرم تماس با ما کار می‌کند
- ✅ بررسی کن که SSL certificate فعال است

### مشکلات احتمالی:
- ❌ اگر DNS propagate نشد: صبر کن (تا 48 ساعت)
- ❌ اگر SSL کار نکرد: چند دقیقه صبر کن، Vercel خودش certificate صادر می‌کند
- ❌ اگر سایت لود نشد: DNS records را دوباره چک کن

---

## 📞 پشتیبانی

اگر مشکلی پیش آمد:
1. لاگ‌های Vercel را چک کن
2. DNS records را دوباره بررسی کن
3. با پشتیبانی Vercel تماس بگیر

---

## ✅ چک‌لیست نهایی

- [ ] دامنه `akafco.com` در Vercel اضافه شد
- [ ] DNS records در پنل DNS تنظیم شد
- [ ] Environment variable `NEXT_PUBLIC_BASE_URL` به `https://akafco.com` تغییر کرد
- [ ] پروژه redeploy شد
- [ ] DNS propagation کامل شد
- [ ] سایت در `https://akafco.com` قابل دسترسی است
- [ ] SSL certificate فعال است
- [ ] همه صفحات تست شدند
- [ ] Analytics و Speed Insights کار می‌کنند

---

**زمان تقریبی:** 30 دقیقه تا 2 ساعت (بسته به DNS propagation)






