# 📋 راهنمای کامل اضافه کردن DNS Records در Resend

## ✅ بررسی کار شما

از تصاویری که فرستادید، می‌بینم که:

### ✅ کار درست انجام شده:
- **DKIM Record** را درست اضافه کرده‌اید:
  - Type: `TXT`
  - Name: `resend._domainkey`
  - Value: کلید عمومی (طولانی)
  - TTL: `3600`

### ⚠️ اما باید این‌ها را هم اضافه کنید:

---

## 📝 لیست کامل DNS Records که باید اضافه کنید:

### 1. ✅ DKIM (انجام شده)
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEB... (کلید کامل)
TTL: 3600
```

### 2. ⚠️ SPF - Record اول (MX)
```
Type: MX
Name: send
Value: feedback-smtp.ap-northeast-1.amazonses.com
TTL: 3600
Priority: 10
```

### 3. ⚠️ SPF - Record دوم (TXT)
```
Type: TXT
Name: send
Value: v=spf1 include:amazonses.com ~all
TTL: 3600
```

### 4. ⚠️ MX برای Receiving (اگر می‌خواهید ایمیل دریافت کنید)
```
Type: MX
Name: @
Value: inbound-smtp.ap-northeast-1.amazonses.com
TTL: 3600
Priority: 9
```

---

## 🔧 مراحل اضافه کردن در Direct Admin:

### مرحله 1: DKIM (انجام شده ✅)
- Type: `TXT`
- Name: `resend._domainkey`
- Value: (کلید کامل از Resend)
- TTL: `3600`

### مرحله 2: SPF - MX Record
1. روی "Add Record" کلیک کنید
2. Type: `MX` را انتخاب کنید
3. Name: `send` را وارد کنید
4. Value: `feedback-smtp.ap-northeast-1.amazonses.com` (از Resend کپی کنید)
5. TTL: `3600`
6. Priority: `10`
7. "ADD" را بزنید

### مرحله 3: SPF - TXT Record
1. روی "Add Record" کلیک کنید
2. Type: `TXT` را انتخاب کنید
3. Name: `send` را وارد کنید
4. Value: `v=spf1 include:amazonses.com ~all` (از Resend کپی کنید)
5. TTL: `3600`
6. "ADD" را بزنید

### مرحله 4: MX برای Receiving (اختیاری)
- فقط اگر می‌خواهید ایمیل‌های دریافتی را در Resend مدیریت کنید
- اگر فقط می‌خواهید ایمیل ارسال کنید، این را اضافه نکنید

---

## ⏱️ زمان تأیید:

- معمولاً 5-30 دقیقه طول می‌کشد
- گاهی تا 24 ساعت هم ممکن است طول بکشد
- در پنل Resend، چک‌مارک سبز نشان می‌دهد که تأیید شده است

---

## ✅ چک‌لیست نهایی:

- [ ] DKIM Record اضافه شده (انجام شده ✅)
- [ ] SPF MX Record اضافه شده
- [ ] SPF TXT Record اضافه شده
- [ ] در پنل Resend همه چک‌مارک‌ها سبز شده‌اند
- [ ] "Enable Sending" فعال شده است

---

## 🎯 نکات مهم:

1. **دقت در کپی کردن Value:**
   - Value را دقیقاً از Resend کپی کنید
   - هیچ فاصله اضافی یا کاراکتر اضافی نباشد

2. **Name مهم است:**
   - برای DKIM: `resend._domainkey`
   - برای SPF: `send`
   - دقت کنید که `.akafco.com` خودکار اضافه می‌شود

3. **TTL:**
   - می‌توانید `3600` بگذارید یا `Auto` (اگر Direct Admin پشتیبانی کند)

4. **Priority (فقط برای MX):**
   - برای SPF MX: `10`
   - برای Receiving MX: `9`

---

## 🔍 چگونه بفهمیم درست کار می‌کند؟

1. بعد از اضافه کردن همه records، 10-15 دقیقه صبر کنید
2. به پنل Resend برگردید
3. صفحه را Refresh کنید
4. باید چک‌مارک‌های سبز ببینید ✅
5. "Enable Sending" را فعال کنید

---

## ❓ اگر تأیید نشد:

1. **بررسی کنید که همه records را اضافه کرده‌اید**
2. **Value را دوباره چک کنید** (کپی-پیست کنید)
3. **Name را بررسی کنید** (دقیقاً مثل Resend باشد)
4. **صبر کنید** (گاهی DNS propagation زمان می‌برد)
5. **از ابزارهای online استفاده کنید:**
   - [mxtoolbox.com](https://mxtoolbox.com)
   - [dnschecker.org](https://dnschecker.org)

---

**موفق باشید! 🚀**

بعد از تأیید همه records، می‌توانید از آدرس‌های `@akafco.com` استفاده کنید!







## ✅ بررسی کار شما

از تصاویری که فرستادید، می‌بینم که:

### ✅ کار درست انجام شده:
- **DKIM Record** را درست اضافه کرده‌اید:
  - Type: `TXT`
  - Name: `resend._domainkey`
  - Value: کلید عمومی (طولانی)
  - TTL: `3600`

### ⚠️ اما باید این‌ها را هم اضافه کنید:

---

## 📝 لیست کامل DNS Records که باید اضافه کنید:

### 1. ✅ DKIM (انجام شده)
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEB... (کلید کامل)
TTL: 3600
```

### 2. ⚠️ SPF - Record اول (MX)
```
Type: MX
Name: send
Value: feedback-smtp.ap-northeast-1.amazonses.com
TTL: 3600
Priority: 10
```

### 3. ⚠️ SPF - Record دوم (TXT)
```
Type: TXT
Name: send
Value: v=spf1 include:amazonses.com ~all
TTL: 3600
```

### 4. ⚠️ MX برای Receiving (اگر می‌خواهید ایمیل دریافت کنید)
```
Type: MX
Name: @
Value: inbound-smtp.ap-northeast-1.amazonses.com
TTL: 3600
Priority: 9
```

---

## 🔧 مراحل اضافه کردن در Direct Admin:

### مرحله 1: DKIM (انجام شده ✅)
- Type: `TXT`
- Name: `resend._domainkey`
- Value: (کلید کامل از Resend)
- TTL: `3600`

### مرحله 2: SPF - MX Record
1. روی "Add Record" کلیک کنید
2. Type: `MX` را انتخاب کنید
3. Name: `send` را وارد کنید
4. Value: `feedback-smtp.ap-northeast-1.amazonses.com` (از Resend کپی کنید)
5. TTL: `3600`
6. Priority: `10`
7. "ADD" را بزنید

### مرحله 3: SPF - TXT Record
1. روی "Add Record" کلیک کنید
2. Type: `TXT` را انتخاب کنید
3. Name: `send` را وارد کنید
4. Value: `v=spf1 include:amazonses.com ~all` (از Resend کپی کنید)
5. TTL: `3600`
6. "ADD" را بزنید

### مرحله 4: MX برای Receiving (اختیاری)
- فقط اگر می‌خواهید ایمیل‌های دریافتی را در Resend مدیریت کنید
- اگر فقط می‌خواهید ایمیل ارسال کنید، این را اضافه نکنید

---

## ⏱️ زمان تأیید:

- معمولاً 5-30 دقیقه طول می‌کشد
- گاهی تا 24 ساعت هم ممکن است طول بکشد
- در پنل Resend، چک‌مارک سبز نشان می‌دهد که تأیید شده است

---

## ✅ چک‌لیست نهایی:

- [ ] DKIM Record اضافه شده (انجام شده ✅)
- [ ] SPF MX Record اضافه شده
- [ ] SPF TXT Record اضافه شده
- [ ] در پنل Resend همه چک‌مارک‌ها سبز شده‌اند
- [ ] "Enable Sending" فعال شده است

---

## 🎯 نکات مهم:

1. **دقت در کپی کردن Value:**
   - Value را دقیقاً از Resend کپی کنید
   - هیچ فاصله اضافی یا کاراکتر اضافی نباشد

2. **Name مهم است:**
   - برای DKIM: `resend._domainkey`
   - برای SPF: `send`
   - دقت کنید که `.akafco.com` خودکار اضافه می‌شود

3. **TTL:**
   - می‌توانید `3600` بگذارید یا `Auto` (اگر Direct Admin پشتیبانی کند)

4. **Priority (فقط برای MX):**
   - برای SPF MX: `10`
   - برای Receiving MX: `9`

---

## 🔍 چگونه بفهمیم درست کار می‌کند؟

1. بعد از اضافه کردن همه records، 10-15 دقیقه صبر کنید
2. به پنل Resend برگردید
3. صفحه را Refresh کنید
4. باید چک‌مارک‌های سبز ببینید ✅
5. "Enable Sending" را فعال کنید

---

## ❓ اگر تأیید نشد:

1. **بررسی کنید که همه records را اضافه کرده‌اید**
2. **Value را دوباره چک کنید** (کپی-پیست کنید)
3. **Name را بررسی کنید** (دقیقاً مثل Resend باشد)
4. **صبر کنید** (گاهی DNS propagation زمان می‌برد)
5. **از ابزارهای online استفاده کنید:**
   - [mxtoolbox.com](https://mxtoolbox.com)
   - [dnschecker.org](https://dnschecker.org)

---

**موفق باشید! 🚀**

بعد از تأیید همه records، می‌توانید از آدرس‌های `@akafco.com` استفاده کنید!










