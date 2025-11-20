# ⚡ راهنمای سریع اتصال Cursor به GitHub

## ✅ کارهای انجام شده:
- ✅ Git Credential Manager تنظیم شد
- ✅ Remote repository اضافه شد: `https://github.com/af1112/akafwebsite.git`
- ✅ Email تنظیم شد: `af1112@gmail.com`

## 🚀 مرحله بعدی (فقط یک بار):

### تست اتصال با یک Push کوچک:

```bash
git push
```

**وقتی از شما خواست:**
- **Username**: `af1112`
- **Password**: **توکن GitHub شما** (نه password واقعی!)

بعد از اولین push موفق، Windows Credential Manager توکن را ذخیره می‌کند و از این به بعد Cursor می‌تواند به صورت خودکار کار کند! 🎉

---

## 🔍 اگر مشکل داشت:

### بررسی وضعیت:
```bash
git remote -v
git config --global credential.helper
```

### اگر credential ذخیره نشد:
1. به **Windows Credential Manager** بروید:
   - Windows Key + R
   - `control /name Microsoft.CredentialManager`
   - یا در Settings → Accounts → Credential Manager
2. در بخش **Windows Credentials**، `git:https://github.com` را پیدا کنید
3. اگر وجود دارد، Edit کنید و توکن را update کنید
4. اگر وجود ندارد، بعد از push دوباره اضافه می‌شود

---

## 📝 دستورات مفید:

```bash
# بررسی remote
git remote -v

# Pull از GitHub
git pull

# Push به GitHub
git push

# Status
git status
```

---

**بعد از اولین push موفق، همه چیز خودکار می‌شود! ✨**

