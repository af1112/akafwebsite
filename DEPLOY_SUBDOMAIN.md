# 🚀 راهنمای Deploy روی Subdomain (akafco.com)

## روش 1: استفاده از Vercel (توصیه می‌شود - ساده و رایگان)

### مزایا:
- ✅ رایگان برای همیشه
- ✅ SSL خودکار
- ✅ Deploy خودکار با هر push
- ✅ CDN جهانی
- ✅ پشتیبانی کامل از Next.js

---

## مرحله 1: نصب Vercel CLI

```bash
npm install -g vercel
```

یا از طریق [vercel.com](https://vercel.com) استفاده کنید (بدون نیاز به CLI).

---

## مرحله 2: Deploy از طریق وب (ساده‌ترین روش)

### گام 1: ورود به Vercel
1. به [vercel.com](https://vercel.com) بروید
2. روی **"Sign Up"** کلیک کنید
3. **"Continue with GitHub"** را انتخاب کنید
4. با حساب GitHub خود (`af1112`) وارد شوید

### گام 2: Import Project
1. در Dashboard، روی **"Add New..."** → **"Project"** کلیک کنید
2. Repository `af1112/akafwebsite` را انتخاب کنید
3. روی **"Import"** کلیک کنید

### گام 3: تنظیمات Build
- **Framework Preset**: Next.js (خودکار تشخیص می‌دهد)
- **Root Directory**: `./` (یا اگر در پوشه دیگری است، مسیر را مشخص کنید)
- **Build Command**: `npm run build` (پیش‌فرض)
- **Output Directory**: `.next` (برای Vercel نیازی به static export نیست)
- **Install Command**: `npm install` (پیش‌فرض)

### گام 4: Environment Variables
- **NEXT_PUBLIC_BASE_URL**: `https://subdomain.akafco.com` (بعداً تنظیم می‌کنیم)

### گام 5: Deploy
روی **"Deploy"** کلیک کنید!

---

## مرحله 3: تنظیم Custom Domain (Subdomain)

### در Vercel:
1. به Project Settings → **Domains** بروید
2. در بخش **Domains**، subdomain را وارد کنید:
   - `subdomain.akafco.com` (یا هر نامی که می‌خواهید)
3. روی **"Add"** کلیک کنید

### در DNS Provider (جایی که دامنه akafco.com را مدیریت می‌کنید):

#### اگر از cPanel استفاده می‌کنید:
1. به **cPanel** → **DNS Zone Editor** بروید
2. یک **CNAME Record** اضافه کنید:
   - **Name**: `subdomain` (یا نام subdomain شما)
   - **CNAME**: `cname.vercel-dns.com`
   - **TTL**: `3600` (یا پیش‌فرض)

#### اگر از Cloudflare استفاده می‌کنید:
1. به **DNS** → **Records** بروید
2. یک **CNAME Record** اضافه کنید:
   - **Name**: `subdomain`
   - **Target**: `cname.vercel-dns.com`
   - **Proxy status**: 🟠 Proxied (نارنجی) یا ⚪ DNS only
   - **TTL**: Auto

#### اگر از Namecheap/GoDaddy استفاده می‌کنید:
1. به بخش **Advanced DNS** بروید
2. یک **CNAME Record** اضافه کنید:
   - **Host**: `subdomain`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `Automatic` یا `1 hour`

---

## مرحله 4: به‌روزرسانی Environment Variable

بعد از تنظیم DNS (که ممکن است 5-30 دقیقه طول بکشد):

1. در Vercel، به **Settings** → **Environment Variables** بروید
2. **NEXT_PUBLIC_BASE_URL** را اضافه یا update کنید:
   - Value: `https://subdomain.akafco.com`
3. **Redeploy** کنید (یا منتظر بمانید تا خودکار deploy شود)

---

## روش 2: استفاده از Netlify (جایگزین)

### مرحله 1: Import از GitHub
1. به [netlify.com](https://netlify.com) بروید
2. **"Add new site"** → **"Import an existing project"**
3. GitHub را انتخاب کنید و repository را import کنید

### مرحله 2: تنظیمات Build
- **Build command**: `npm run build:static`
- **Publish directory**: `out`
- **Base directory**: (خالی بگذارید)

### مرحله 3: Environment Variables
- **NEXT_PUBLIC_BASE_URL**: `https://subdomain.akafco.com`

### مرحله 4: Custom Domain
1. **Site settings** → **Domain management**
2. **Add custom domain** → `subdomain.akafco.com`
3. DNS را طبق دستورات Netlify تنظیم کنید

---

## روش 3: استفاده از سرور خودتان (پیشرفته)

اگر می‌خواهید روی سرور خودتان deploy کنید:

### مرحله 1: Build
```bash
npm run build:static
```

### مرحله 2: آپلود فایل‌ها
فایل‌های پوشه `out` را به سرور آپلود کنید.

### مرحله 3: تنظیمات Web Server

#### برای Apache (.htaccess):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### برای Nginx:
```nginx
server {
    listen 80;
    server_name subdomain.akafco.com;
    root /path/to/out;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## تست و بررسی

### بعد از Deploy:
1. ✅ سایت باید در آدرس subdomain باز شود
2. ✅ SSL باید خودکار فعال شود (در Vercel/Netlify)
3. ✅ همه صفحات باید کار کنند
4. ✅ Language Switcher باید کار کند

### بررسی SEO:
- ✅ `https://subdomain.akafco.com/sitemap.xml` باید کار کند
- ✅ `https://subdomain.akafco.com/robots.txt` باید کار کند

---

## نکات مهم

1. **DNS Propagation**: ممکن است 5-30 دقیقه طول بکشد
2. **SSL Certificate**: در Vercel/Netlify خودکار است
3. **Environment Variables**: بعد از تغییر، باید Redeploy کنید
4. **Cache**: ممکن است نیاز به Clear Cache باشد

---

## دستورات مفید

```bash
# Deploy با Vercel CLI
vercel

# Deploy به Production
vercel --prod

# مشاهده Logs
vercel logs

# مشاهده Domains
vercel domains
```

---

## مشکل‌یابی

### اگر DNS کار نکرد:
- بررسی کنید که CNAME درست تنظیم شده باشد
- منتظر بمانید تا DNS propagate شود (تا 48 ساعت)
- از [dnschecker.org](https://dnschecker.org) بررسی کنید

### اگر SSL کار نکرد:
- در Vercel/Netlify، SSL خودکار است
- اگر مشکل داشت، چند دقیقه صبر کنید

### اگر صفحات 404 می‌دهند:
- بررسی کنید که `trailingSlash: true` در next.config.js باشد
- یا rewrites را بررسی کنید

---

**موفق باشید! 🎉**


