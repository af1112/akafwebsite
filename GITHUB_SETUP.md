# 🔗 راهنمای اتصال GitHub به Cursor

## روش 1: استفاده از GitHub CLI (ساده‌ترین روش)

### مرحله 1: نصب GitHub CLI (اگر نصب نیست)
```bash
winget install --id GitHub.cli
```
یا از [این لینک](https://cli.github.com/) دانلود کنید.

### مرحله 2: لاگین به GitHub
```bash
gh auth login
```

مراحل:
1. **How would you like to authenticate?** → `GitHub.com` را انتخاب کنید
2. **What is your preferred protocol?** → `HTTPS` را انتخاب کنید
3. **Authenticate Git with your GitHub credentials?** → `Yes` را انتخاب کنید
4. مرورگر باز می‌شود و از شما می‌خواهد که authorize کنید

### مرحله 3: تست اتصال
```bash
gh auth status
```

---

## روش 2: استفاده از Personal Access Token

### مرحله 1: ساخت Token در GitHub

1. به GitHub بروید: https://github.com/settings/tokens
2. روی **"Generate new token"** → **"Generate new token (classic)"** کلیک کنید
3. یک نام برای token بگذارید (مثلاً: `Cursor Access`)
4. مدت زمان انقضا را انتخاب کنید
5. **Scopes** را انتخاب کنید:
   - ✅ `repo` (دسترسی کامل به repository)
   - ✅ `workflow` (برای GitHub Actions)
   - ✅ `read:org` (اختیاری)
6. روی **"Generate token"** کلیک کنید
7. **Token را کپی کنید** (فقط یک بار نمایش داده می‌شود!)

### مرحله 2: استفاده از Token در Cursor

#### گزینه A: از طریق Git در Terminal

```bash
# تنظیم Git با GitHub
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# استفاده از token به جای password
git remote add origin https://YOUR_TOKEN@github.com/USERNAME/REPO_NAME.git
```

#### گزینه B: از طریق Cursor Settings

1. در Cursor، `Ctrl + ,` را بزنید (Settings)
2. جستجو کنید: `github`
3. در بخش **GitHub**، token را وارد کنید

---

## روش 3: استفاده از SSH (پیشرفته‌تر)

### مرحله 1: ساخت SSH Key

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

Enter را بزنید تا از مسیر پیش‌فرض استفاده شود.

### مرحله 2: اضافه کردن SSH Key به GitHub

1. محتوای فایل public key را کپی کنید:
```bash
cat ~/.ssh/id_ed25519.pub
```

2. به GitHub بروید: https://github.com/settings/keys
3. روی **"New SSH key"** کلیک کنید
4. Title: یک نام بگذارید
5. Key: محتوای کپی شده را paste کنید
6. **"Add SSH key"** را بزنید

### مرحله 3: تست اتصال

```bash
ssh -T git@github.com
```

اگر پیام `Hi USERNAME! You've successfully authenticated...` را دیدید، موفق بودید!

---

## راه‌اندازی Repository

### 1. ساخت Repository در GitHub

1. به https://github.com/new بروید
2. Repository name: `multilingual-website` (یا هر نامی که می‌خواهید)
3. **Public** یا **Private** را انتخاب کنید
4. ✅ **"Add a README file"** را تیک نزنید (ما قبلاً داریم)
5. روی **"Create repository"** کلیک کنید

### 2. اتصال پروژه محلی به GitHub

```bash
# در پوشه پروژه
cd "D:\AKAFMenu\Project digitalmenu\multilingual-website"

# Initialize Git (اگر قبلاً نکرده‌اید)
git init

# اضافه کردن فایل‌ها
git add .

# Commit اولیه
git commit -m "Initial commit: Multilingual website with Next.js 14"

# اضافه کردن remote repository
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# یا اگر از SSH استفاده می‌کنید:
# git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# Push به GitHub
git branch -M main
git push -u origin main
```

---

## استفاده از GitHub Actions (Deploy خودکار)

بعد از push کردن کد، GitHub Actions به صورت خودکار:
1. پروژه را build می‌کند
2. به GitHub Pages deploy می‌کند

### تنظیمات GitHub Pages

1. به Settings → Pages بروید
2. Source: **"GitHub Actions"** را انتخاب کنید
3. متغیر `NEXT_PUBLIC_BASE_URL` را در Secrets اضافه کنید:
   - Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `NEXT_PUBLIC_BASE_URL`
   - Value: `https://YOUR_USERNAME.github.io/REPO_NAME`

---

## دستورات مفید Git

```bash
# وضعیت فایل‌ها
git status

# اضافه کردن فایل‌ها
git add .

# Commit
git commit -m "توضیح تغییرات"

# Push به GitHub
git push

# Pull از GitHub
git pull

# مشاهده remote
git remote -v
```

---

## مشکل‌یابی

### اگر "Permission denied" گرفتید:
- Token را دوباره بررسی کنید
- یا از SSH استفاده کنید

### اگر "Repository not found" گرفتید:
- نام repository را بررسی کنید
- مطمئن شوید که repository را ساخته‌اید

### اگر GitHub Actions کار نکرد:
- فایل `.github/workflows/deploy.yml` را بررسی کنید
- در Settings → Actions، مطمئن شوید که Actions فعال است

---

**موفق باشید! 🚀**

