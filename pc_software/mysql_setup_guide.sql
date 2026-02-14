-- راهنمای راه‌اندازی دیتابیس MySQL

-- 1. دستورات زیر را در پنل مدیریتی هاست (phpMyAdmin) یا ترمینال MySQL اجرا کنید تا دیتابیس و یوزر ساخته شود.
-- نکته: به جای 'your_password' یک رمز عبور قوی قرار دهید.

CREATE DATABASE akaf_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'akaf_user'@'%' IDENTIFIED BY 'your_password';

GRANT ALL PRIVILEGES ON akaf_db.* TO 'akaf_user'@'%';

FLUSH PRIVILEGES;


-- 2. پس از ساخت دیتابیس، مشخصات زیر را در تنظیمات Vercel (Environment Variables) یا فایل .env وارد کنید:
-- DB_NAME=akaf_db
-- DB_USER=akaf_user
-- DB_PASSWORD=your_password
-- DB_HOST=your_db_host_address (آدرس سرور دیتابیس)
-- DB_PORT=3306

-- 3. پس از اتصال، برای ساخت خودکار جداول توسط جنگو، دستور زیر را اجرا کنید (معمولاً در پروسه بیلد Vercel):
-- python manage.py migrate

-- 4. برای انتقال اطلاعات فعلی (هزینه‌ها و کاربران) به دیتابیس جدید:
-- فایل data.json که در پروژه ایجاد شده را می‌توانید با دستور زیر در دیتابیس جدید بارگذاری کنید:
-- python manage.py loaddata data.json
