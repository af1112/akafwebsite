# 🔗 اتصال Cursor به GitHub

## روش 1: استفاده از Git Credential Manager (توصیه می‌شود)

### مرحله 1: تنظیم Git Credential Manager

```bash
git config --global credential.helper manager-core
```

این دستور را اجرا کردم. حالا:

### مرحله 2: تنظیم Email در Git

```bash
git config --global user.email "your.email@example.com"
```

(Email خود را که در GitHub استفاده می‌کنید وارد کنید)

### مرحله 3: تست اتصال

```bash
git push
```

وقتی از شما username و password خواست:
- **Username**: `af1112`
- **Password**: **توکن GitHub شما** (نه password واقعی!)

بعد از اولین push موفق، Windows Credential Manager توکن را ذخیره می‌کند و Cursor می‌تواند از آن استفاده کند.

---

## روش 2: استفاده از GitHub CLI (پیشرفته‌تر)

### نصب GitHub CLI

```bash
winget install --id GitHub.cli
```

یا از [این لینک](https://cli.github.com/) دانلود کنید.

### لاگین

```bash
gh auth login
```

مراحل:
1. `GitHub.com` را انتخاب کنید
2. `HTTPS` را انتخاب کنید
3. `Yes` برای authenticate Git
4. در مرورگر authorize کنید

---

## روش 3: تنظیمات Cursor

### از طریق Settings

1. در Cursor، `Ctrl + ,` را بزنید (Settings)
2. جستجو کنید: `github`
3. در بخش **GitHub**:
   - GitHub Token را وارد کنید
   - یا از "Sign in with GitHub" استفاده کنید

### از طریق Command Palette

1. `Ctrl + Shift + P` را بزنید
2. `Git: Clone` یا `Git: Push` را تایپ کنید
3. Cursor از شما می‌خواهد که authenticate کنید

---

## روش 4: استفاده از SSH (امن‌تر)

### ساخت SSH Key

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

Enter را بزنید تا از مسیر پیش‌فرض استفاده شود.

### اضافه کردن به GitHub

1. محتوای public key را کپی کنید:
```bash
cat ~/.ssh/id_ed25519.pub
```

2. به https://github.com/settings/keys بروید
3. **New SSH key** را بزنید
4. Key را paste کنید و save کنید

### تغییر Remote به SSH

```bash
git remote set-url origin git@github.com:af1112/akafwebsite.git
```

---

## تست اتصال

بعد از تنظیمات، این دستور را اجرا کنید:

```bash
git push
```

اگر بدون درخواست username/password push شد، یعنی اتصال برقرار است! ✅

---

## نکات مهم

1. **اولین بار**: Cursor از شما username و password می‌خواهد
2. **بعد از ذخیره**: Windows Credential Manager آن را ذخیره می‌کند
3. **اگر مشکل داشت**: توکن را دوباره بررسی کنید

---

## دستورات مفید

```bash
# بررسی remote
git remote -v

# تغییر remote URL
git remote set-url origin https://github.com/af1112/akafwebsite.git

# یا برای SSH:
git remote set-url origin git@github.com:af1112/akafwebsite.git

# تست اتصال
git fetch
```

---

**بعد از تنظیمات، Cursor می‌تواند به صورت خودکار با GitHub کار کند! 🚀**


