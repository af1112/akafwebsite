# 🔧 راهنمای تنظیم DNS برای Vercel

## ✅ بله، باید DNS را در پنل خودتان تنظیم کنید!

برای اتصال subdomain `akafcoweb.akafco.com` به Vercel، باید یک CNAME record در پنل DNS خودتان اضافه کنید.

---

## 📋 اطلاعات مورد نیاز از Vercel:

از صفحه Vercel که باز کردید، این اطلاعات را دارید:

- **Type**: CNAME
- **Name**: `akafcoweb`
- **Value**: `8fc77746da119eef.vercel-dns-017.com.`

---

## 🔧 مراحل تنظیم در irandns.com:

### مرحله 1: ورود به پنل DNS
1. به پنل irandns.com بروید
2. به بخش **DNS Management** یا **DNS Records** بروید
3. دامنه `akafco.com` را انتخاب کنید

### مرحله 2: اضافه کردن CNAME Record

#### گزینه A: اگر subdomain وجود ندارد
1. روی **"Add Record"** یا **"افزودن رکورد"** کلیک کنید
2. تنظیمات زیر را وارد کنید:
   - **Type**: `CNAME` را انتخاب کنید
   - **Hostname/Name**: `akafcoweb` (فقط نام subdomain، بدون دامنه اصلی)
   - **Value/Target**: `8fc77746da119eef.vercel-dns-017.com.` (با نقطه در انتها)
   - **TTL**: `3600` (یا پیش‌فرض)
3. روی **"Save"** یا **"ذخیره"** کلیک کنید

#### گزینه B: اگر subdomain قبلاً وجود دارد
1. رکورد موجود `akafcoweb` را پیدا کنید
2. روی آیکون **Edit** (✏️) کلیک کنید
3. **Type** را به `CNAME` تغییر دهید (اگر A record است)
4. **Value** را به `8fc77746da119eef.vercel-dns-017.com.` تغییر دهید
5. **Save** کنید

---

## ⚠️ نکات مهم:

### 1. نام Subdomain
- فقط `akafcoweb` را وارد کنید (بدون `.akafco.com`)
- سیستم خودش دامنه اصلی را اضافه می‌کند

### 2. Value با نقطه
- حتماً نقطه (`.`) در انتهای Value باشد: `8fc77746da119eef.vercel-dns-017.com.`
- این نقطه مهم است!

### 3. TTL
- می‌توانید `3600` (1 ساعت) یا `1800` (30 دقیقه) تنظیم کنید
- برای تست سریع‌تر، TTL کمتر بهتر است

### 4. حذف A Record قدیمی
- اگر قبلاً یک A record برای `akafcoweb` داشتید، آن را **حذف** کنید
- نمی‌توانید همزمان A record و CNAME record داشته باشید

---

## 📊 مثال تنظیمات:

```
Type: CNAME
Name: akafcoweb
Value: 8fc77746da119eef.vercel-dns-017.com.
TTL: 3600
```

---

## ⏱️ زمان Propagation:

بعد از تنظیم DNS:
- **معمولاً**: 5-30 دقیقه
- **حداکثر**: تا 48 ساعت (اما معمولاً خیلی سریع‌تر است)

---

## ✅ بررسی صحت تنظیمات:

### روش 1: از Vercel
1. به صفحه Domains در Vercel برگردید
2. روی دکمه **"Refresh"** کلیک کنید
3. اگر درست باشد، وضعیت از "Invalid Configuration" به "Valid" تغییر می‌کند

### روش 2: از Command Line
```bash
nslookup akafcoweb.akafco.com
```

یا

```bash
dig akafcoweb.akafco.com
```

باید مقدار `8fc77746da119eef.vercel-dns-017.com.` را ببینید.

### روش 3: از وب
به [dnschecker.org](https://dnschecker.org) بروید و دامنه را چک کنید.

---

## 🔍 مشکل‌یابی:

### اگر بعد از 30 دقیقه کار نکرد:

1. **بررسی کنید که CNAME درست اضافه شده:**
   - نام: فقط `akafcoweb`
   - Value: با نقطه در انتها

2. **بررسی کنید که A record قدیمی حذف شده:**
   - نمی‌توانید همزمان A و CNAME داشته باشید

3. **TTL را کم کنید:**
   - برای تست، TTL را به `300` (5 دقیقه) تغییر دهید

4. **Cache را پاک کنید:**
   - DNS cache مرورگر را پاک کنید
   - یا از حالت Incognito استفاده کنید

---

## 📝 خلاصه:

1. ✅ به پنل irandns.com بروید
2. ✅ دامنه `akafco.com` را انتخاب کنید
3. ✅ یک CNAME record اضافه کنید:
   - Name: `akafcoweb`
   - Value: `8fc77746da119eef.vercel-dns-017.com.`
4. ✅ A record قدیمی را حذف کنید (اگر وجود دارد)
5. ✅ منتظر بمانید (5-30 دقیقه)
6. ✅ در Vercel روی "Refresh" کلیک کنید

---

**بعد از تنظیم، سایت شما در `https://akafcoweb.akafco.com` در دسترس خواهد بود! 🎉**


