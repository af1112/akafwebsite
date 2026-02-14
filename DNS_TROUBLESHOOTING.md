# 🔧 عیب‌یابی DNS Records - مشکل SPF Verification

## ❌ مشکل شناسایی شده:

در Direct Admin، Value برای MX record اشتباه است:

### ❌ اشتباه:
```
Value: feedback-smtp.ap-northeast-1.amazonses.com.al
```

### ✅ درست:
```
Value: feedback-smtp.ap-northeast-1.amazonses.com
```

**نکته:** `.al` اضافی است و باید حذف شود!

---

## 🔧 مراحل اصلاح:

### 1. اصلاح MX Record:
1. در Direct Admin، record با Name `send` و Type `MX` را پیدا کنید
2. روی "Edit" کلیک کنید
3. در فیلد Value (یا Host/Target)، `.al` را از انتها حذف کنید
4. باید دقیقاً این باشد: `feedback-smtp.ap-northeast-1.amazonses.com`
5. "SAVE" را بزنید

### 2. بررسی TXT Record:
1. record با Name `send` و Type `TXT` را پیدا کنید
2. Value باید دقیقاً این باشد: `v=spf1 include:amazonses.com ~all`
3. هیچ فاصله اضافی یا کاراکتر اضافی نباشد
4. اگر اشتباه است، اصلاح کنید

---

## ✅ چک‌لیست نهایی:

قبل از اینکه در Resend چک کنید، مطمئن شوید:

- [ ] **DKIM Record:**
  - Type: `TXT`
  - Name: `resend._domainkey`
  - Value: کلید کامل (طولانی)
  - Status: ✅ Verified

- [ ] **SPF MX Record:**
  - Type: `MX`
  - Name: `send`
  - Value: `feedback-smtp.ap-northeast-1.amazonses.com` (بدون `.al`)
  - Priority: `10`
  - TTL: `3600`

- [ ] **SPF TXT Record:**
  - Type: `TXT`
  - Name: `send`
  - Value: `v=spf1 include:amazonses.com ~all` (دقیقاً همین)
  - TTL: `3600`

---

## ⏱️ زمان Propagation:

بعد از اصلاح:

1. **10-15 دقیقه صبر کنید** (حداقل)
2. به پنل Resend برگردید
3. صفحه را **Refresh** کنید (F5 یا Ctrl+R)
4. باید چک‌مارک‌های سبز ببینید ✅

**نکته:** گاهی تا 30 دقیقه یا بیشتر هم طول می‌کشد.

---

## 🔍 بررسی با ابزارهای Online:

اگر بعد از 30 دقیقه هنوز Pending است، از این ابزارها استفاده کنید:

### 1. MX Toolbox:
- به [mxtoolbox.com](https://mxtoolbox.com) بروید
- در "MX Lookup" تایپ کنید: `send.akafco.com`
- باید `feedback-smtp.ap-northeast-1.amazonses.com` را ببینید

### 2. DNS Checker:
- به [dnschecker.org](https://dnschecker.org) بروید
- Type: `TXT` را انتخاب کنید
- Hostname: `send.akafco.com` را وارد کنید
- باید `v=spf1 include:amazonses.com ~all` را ببینید

---

## ❓ اگر هنوز کار نکرد:

### بررسی کنید:
1. **Name درست است؟** (باید `send` باشد، نه `send.akafco.com`)
2. **Value دقیقاً از Resend کپی شده؟** (کپی-پیست کنید)
3. **TTL مناسب است؟** (3600 خوب است)
4. **Priority برای MX درست است؟** (باید 10 باشد)

### مشکلات رایج:
- ❌ `.al` یا دامنه اضافی در Value
- ❌ فاصله اضافی در Value
- ❌ Name اشتباه (مثلاً `send.akafco.com` به جای `send`)
- ❌ Type اشتباه (MX به جای TXT یا برعکس)

---

## 📞 اگر همه چیز درست است اما هنوز Pending:

1. **صبر کنید** - DNS propagation گاهی تا 24 ساعت طول می‌کشد
2. **Cache را پاک کنید** - در Direct Admin یا DNS provider
3. **با Resend Support تماس بگیرید** - ممکن است مشکل از سمت آنها باشد

---

**موفق باشید! 🚀**

بعد از اصلاح `.al` و صبر کردن، باید همه چیز درست شود!






## ❌ مشکل شناسایی شده:

در Direct Admin، Value برای MX record اشتباه است:

### ❌ اشتباه:
```
Value: feedback-smtp.ap-northeast-1.amazonses.com.al
```

### ✅ درست:
```
Value: feedback-smtp.ap-northeast-1.amazonses.com
```

**نکته:** `.al` اضافی است و باید حذف شود!

---

## 🔧 مراحل اصلاح:

### 1. اصلاح MX Record:
1. در Direct Admin، record با Name `send` و Type `MX` را پیدا کنید
2. روی "Edit" کلیک کنید
3. در فیلد Value (یا Host/Target)، `.al` را از انتها حذف کنید
4. باید دقیقاً این باشد: `feedback-smtp.ap-northeast-1.amazonses.com`
5. "SAVE" را بزنید

### 2. بررسی TXT Record:
1. record با Name `send` و Type `TXT` را پیدا کنید
2. Value باید دقیقاً این باشد: `v=spf1 include:amazonses.com ~all`
3. هیچ فاصله اضافی یا کاراکتر اضافی نباشد
4. اگر اشتباه است، اصلاح کنید

---

## ✅ چک‌لیست نهایی:

قبل از اینکه در Resend چک کنید، مطمئن شوید:

- [ ] **DKIM Record:**
  - Type: `TXT`
  - Name: `resend._domainkey`
  - Value: کلید کامل (طولانی)
  - Status: ✅ Verified

- [ ] **SPF MX Record:**
  - Type: `MX`
  - Name: `send`
  - Value: `feedback-smtp.ap-northeast-1.amazonses.com` (بدون `.al`)
  - Priority: `10`
  - TTL: `3600`

- [ ] **SPF TXT Record:**
  - Type: `TXT`
  - Name: `send`
  - Value: `v=spf1 include:amazonses.com ~all` (دقیقاً همین)
  - TTL: `3600`

---

## ⏱️ زمان Propagation:

بعد از اصلاح:

1. **10-15 دقیقه صبر کنید** (حداقل)
2. به پنل Resend برگردید
3. صفحه را **Refresh** کنید (F5 یا Ctrl+R)
4. باید چک‌مارک‌های سبز ببینید ✅

**نکته:** گاهی تا 30 دقیقه یا بیشتر هم طول می‌کشد.

---

## 🔍 بررسی با ابزارهای Online:

اگر بعد از 30 دقیقه هنوز Pending است، از این ابزارها استفاده کنید:

### 1. MX Toolbox:
- به [mxtoolbox.com](https://mxtoolbox.com) بروید
- در "MX Lookup" تایپ کنید: `send.akafco.com`
- باید `feedback-smtp.ap-northeast-1.amazonses.com` را ببینید

### 2. DNS Checker:
- به [dnschecker.org](https://dnschecker.org) بروید
- Type: `TXT` را انتخاب کنید
- Hostname: `send.akafco.com` را وارد کنید
- باید `v=spf1 include:amazonses.com ~all` را ببینید

---

## ❓ اگر هنوز کار نکرد:

### بررسی کنید:
1. **Name درست است؟** (باید `send` باشد، نه `send.akafco.com`)
2. **Value دقیقاً از Resend کپی شده؟** (کپی-پیست کنید)
3. **TTL مناسب است؟** (3600 خوب است)
4. **Priority برای MX درست است؟** (باید 10 باشد)

### مشکلات رایج:
- ❌ `.al` یا دامنه اضافی در Value
- ❌ فاصله اضافی در Value
- ❌ Name اشتباه (مثلاً `send.akafco.com` به جای `send`)
- ❌ Type اشتباه (MX به جای TXT یا برعکس)

---

## 📞 اگر همه چیز درست است اما هنوز Pending:

1. **صبر کنید** - DNS propagation گاهی تا 24 ساعت طول می‌کشد
2. **Cache را پاک کنید** - در Direct Admin یا DNS provider
3. **با Resend Support تماس بگیرید** - ممکن است مشکل از سمت آنها باشد

---

**موفق باشید! 🚀**

بعد از اصلاح `.al` و صبر کردن، باید همه چیز درست شود!

























