# ⚡ راهنمای سریع Deploy روی Subdomain

## 🎯 روش ساده: Vercel (5 دقیقه)

### مرحله 1: ورود به Vercel
1. به [vercel.com](https://vercel.com) بروید
2. **"Sign Up"** → **"Continue with GitHub"**
3. با حساب `af1112` وارد شوید

### مرحله 2: Import Project
1. **"Add New..."** → **"Project"**
2. Repository `akafwebsite` را انتخاب کنید
3. روی **"Import"** کلیک کنید

### مرحله 3: تنظیمات (پیش‌فرض کافی است)
- Framework: Next.js (خودکار)
- Build Command: `npm run build` ✅
- Output Directory: `.next` ✅
- Install Command: `npm install` ✅

### مرحله 4: Environment Variable
در بخش **Environment Variables**:
- **Key**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `https://subdomain.akafco.com` (یا نام subdomain شما)
- روی **"Add"** کلیک کنید

### مرحله 5: Deploy
روی **"Deploy"** کلیک کنید! 🚀

---

## 🌐 تنظیم Subdomain (بعد از Deploy)

### در Vercel:
1. Project → **Settings** → **Domains**
2. subdomain را وارد کنید: `subdomain.akafco.com`
3. روی **"Add"** کلیک کنید
4. دستورات DNS را که Vercel نشان می‌دهد کپی کنید

### در DNS Provider (cPanel/Cloudflare/Namecheap):

#### CNAME Record اضافه کنید:
- **Type**: CNAME
- **Name**: `subdomain` (یا نام subdomain)
- **Value**: `cname.vercel-dns.com` (یا مقداری که Vercel می‌دهد)
- **TTL**: `3600` یا `Auto`

### منتظر بمانید:
- DNS Propagation: 5-30 دقیقه
- SSL Certificate: خودکار (2-5 دقیقه)

---

## ✅ تست

بعد از 5-30 دقیقه:
1. به `https://subdomain.akafco.com` بروید
2. سایت باید باز شود! 🎉
3. Language Switcher را تست کنید
4. صفحات مختلف را بررسی کنید

---

## 🔄 Deploy خودکار

بعد از تنظیمات اولیه:
- هر بار که به GitHub push می‌کنید
- Vercel به صورت خودکار deploy می‌کند! ✨

---

## 📝 نکات

1. **Environment Variable**: بعد از تغییر، باید Redeploy کنید
2. **DNS**: ممکن است تا 48 ساعت طول بکشد (معمولاً 5-30 دقیقه)
3. **SSL**: خودکار است، نگران نباشید

---

**موفق باشید! 🚀**

