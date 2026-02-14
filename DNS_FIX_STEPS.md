# مراحل نهایی برای فعال‌سازی akafco.com

## ✅ وضعیت فعلی

- ✅ NS Records: درست هستند (دست نزن)
- ✅ CNAME برای `www`: درست است (دست نزن)
- ❌ A Record برای `@`: باید تغییر کند

## 🔧 راه‌حل: تغییر A Record برای root domain

### مرحله 1: تغییر DNS Record برای root domain

**گزینه 1: استفاده از CNAME (توصیه می‌شود)**

1. در پنل DNS (`lh510.irandns.com:2222/evo/user/dns`)
2. A Record برای `@` (یا `akafco.com`) را **حذف** کن
3. یک CNAME جدید اضافه کن:
   - Type: CNAME
   - Name: `@` (یا `akafco.com`)
   - Value: `8fc77746da119eef.vercel-dns-017.com.`
   - TTL: 3600
4. روی **SAVE** کلیک کن

**گزینه 2: استفاده از IP (اگر CNAME کار نکرد)**

1. در پنل DNS (`lh510.irandns.com:2222/evo/user/dns`)
2. A Record برای `@` (یا `akafco.com`) را پیدا کن
3. روی آیکون Edit (مداد) کلیک کن
4. در فیلد **Value**، IP را تغییر بده:
   - **قبل:** `216.198.79.1` (IP قدیمی)
   - **بعد:** `64.29.17.65` (IP Vercel)
5. روی **SAVE** کلیک کن

### مرحله 2: صبر برای DNS Propagation

- 5-30 دقیقه صبر کن
- DNS باید در سراسر اینترنت propagate شود

### مرحله 3: تست

بعد از 15-30 دقیقه، این دستورات را اجرا کن:

```bash
nslookup akafco.com 8.8.8.8
nslookup www.akafco.com 8.8.8.8
```

**نتیجه مورد انتظار:**
- `akafco.com` باید به IP Vercel (`64.29.17.1` یا IP دیگری از Vercel) resolve شود
- `www.akafco.com` باید به `8fc77746da119eef.vercel-dns-017.com` resolve شود

### مرحله 4: تست در مرورگر

- به `https://akafco.com` برو
- به `https://www.akafco.com` برو
- هر دو باید سایت را نمایش دهند

---

## 🔄 گزینه جایگزین: استفاده از CNAME

اگر DNS provider اجازه CNAME برای root domain بدهد:

1. A Record برای `@` را **حذف** کن
2. یک CNAME جدید اضافه کن:
   - Type: CNAME
   - Name: `@`
   - Value: `8fc77746da119eef.vercel-dns-017.com.`
   - TTL: 3600
3. Save کن

---

## ⚠️ نکات مهم

- NS Records را تغییر نده
- فقط A Record برای `@` را تغییر بده
- بقیه Records را دست نزن
- بعد از تغییر، 15-30 دقیقه صبر کن

---

## ✅ چک‌لیست نهایی

- [ ] A Record برای `@` به IP Vercel تغییر کرد
- [ ] 15-30 دقیقه صبر کردم
- [ ] `nslookup akafco.com` به IP Vercel resolve می‌شود
- [ ] `nslookup www.akafco.com` به Vercel resolve می‌شود
- [ ] سایت در `https://akafco.com` باز می‌شود
- [ ] سایت در `https://www.akafco.com` باز می‌شود

