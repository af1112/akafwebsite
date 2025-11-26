# 🚀 راهنمای Push به GitHub

## مرحله 1: ساخت Repository در GitHub

1. به این آدرس بروید: https://github.com/new
2. Repository name: `akafwebsite`
3. Description (اختیاری): `Multilingual website with Next.js 14 + next-intl`
4. **Public** یا **Private** را انتخاب کنید
5. ❌ **"Add a README file"** را تیک نزنید (ما قبلاً داریم)
6. ❌ **"Add .gitignore"** را تیک نزنید (ما قبلاً داریم)
7. ❌ **"Choose a license"** را انتخاب نکنید
8. روی **"Create repository"** کلیک کنید

## مرحله 2: اتصال و Push

بعد از ساخت repository، دستورات زیر را در terminal اجرا کنید:

```bash
# تغییر branch به main
git branch -M main

# اضافه کردن remote repository
git remote add origin https://github.com/af1112/akafwebsite.git

# Push به GitHub
git push -u origin main
```

**نکته:** وقتی `git push` را اجرا می‌کنید:
- Username: `af1112`
- Password: **توکن GitHub شما** (نه password واقعی!)

---

## یا اگر می‌خواهید از توکن در URL استفاده کنید:

```bash
git remote add origin https://YOUR_TOKEN@github.com/af1112/akafwebsite.git
git push -u origin main
```

---

## بعد از Push موفق:

1. به https://github.com/af1112/akafwebsite بروید
2. کد شما باید آنجا باشد!
3. GitHub Actions به صورت خودکار deploy می‌کند

## تنظیمات GitHub Pages:

1. به Settings → Pages بروید
2. Source: **"GitHub Actions"** را انتخاب کنید
3. Save کنید

## تنظیمات Secrets (برای Base URL):

1. Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `NEXT_PUBLIC_BASE_URL`
4. Value: `https://af1112.github.io/akafwebsite`
5. Add secret

---

**موفق باشید! 🎉**


