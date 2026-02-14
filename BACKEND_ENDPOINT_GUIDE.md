# راهنمای اضافه کردن Endpoint بررسی تکراری بودن کاربر

برای بررسی اینکه آیا یک کاربر با ایمیل یا شماره تلفن مشخص قبلاً ثبت نام کرده است، باید یک endpoint در backend API اضافه کنید.

## مراحل:

### 1. اتصال به سرور VPS
```bash
ssh root@your-vps-ip
```

### 2. رفتن به مسیر API
```bash
cd /path/to/your/api/directory
```

### 3. باز کردن فایل `server.js` و اضافه کردن endpoint زیر:

```javascript
// Endpoint برای بررسی تکراری بودن ایمیل یا شماره تلفن
app.post('/api/auth/check-existing', async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ 
        message: 'Email or phone is required' 
      });
    }

    let duplicateField = null;
    let exists = false;

    // Check email separately
    let emailExists = false;
    if (email) {
      const [emailRows] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
      emailExists = emailRows.length > 0;
    }

    // Check phone separately
    let phoneExists = false;
    if (phone) {
      const [phoneRows] = await pool.execute('SELECT id FROM users WHERE phone = ?', [phone]);
      phoneExists = phoneRows.length > 0;
    }

    // Determine which field(s) are duplicate
    if (emailExists && phoneExists) {
      duplicateField = 'both';
      exists = true;
    } else if (emailExists) {
      duplicateField = 'email';
      exists = true;
    } else if (phoneExists) {
      duplicateField = 'phone';
      exists = true;
    }

    return res.json({ 
      exists: exists,
      duplicateField: duplicateField
    });
  } catch (error) {
    console.error('Check existing user error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      exists: false 
    });
  }
});
```

### 4. ری‌استارت کردن PM2
```bash
pm2 restart akaf-api
```

### 5. بررسی لاگ‌ها
```bash
pm2 logs akaf-api
```

## تست Endpoint:

می‌توانید endpoint را با curl تست کنید:

```bash
curl -X POST https://api.akafco.com/api/auth/check-existing \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "phone": "+989123456789"}'
```

پاسخ باید به این شکل باشد:
```json
{
  "exists": true
}
```
یا
```json
{
  "exists": false
}
```

