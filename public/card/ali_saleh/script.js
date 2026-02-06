const translations = {
    fa: {
        name: "علی صالح",
        title: "توسعه‌دهنده وب & مشاور دیجیتال",
        bio: "خلاق، با انگیزه و عاشق تکنولوژی.<br>کمک به کسب و کارها برای حضور قدرتمند در دنیای دیجیتال.",
        saveContact: "ذخیره در مخاطبین",
        whatsapp: "واتس‌اپ",
        email: "ایمیل",
        experienceTitle: "سوابق شغلی",
        exp1Role: "مدیر فنی",
        exp1Company: "شرکت آکاف",
        exp1Date: "۱۴۰۰ - اکنون",
        exp1Desc: "مدیریت تیم فنی و پیاده‌سازی پروژه‌های کلان سازمانی.",
        exp2Role: "توسعه‌دهنده ارشد",
        exp2Company: "شرکت فناوران",
        exp2Date: "۱۳۹۸ - ۱۴۰۰",
        exp2Desc: "توسعه سیستم‌های تحت وب و اپلیکیشن‌های موبایل.",
        skillsTitle: "مهارت‌ها",
        skillMarketing: "بازاریابی",
        copyright: "© ۲۰۲۴ علی صالح. تمامی حقوق محفوظ است."
    },
    en: {
        name: "Ali Saleh",
        title: "Web Developer & Digital Consultant",
        bio: "Creative, motivated, and tech enthusiast.<br>Helping businesses build a strong digital presence.",
        saveContact: "Save Contact",
        whatsapp: "WhatsApp",
        email: "Email",
        experienceTitle: "Work Experience",
        exp1Role: "Technical Director",
        exp1Company: "AKAF Co.",
        exp1Date: "2021 - Present",
        exp1Desc: "Managing technical teams and implementing large-scale enterprise projects.",
        exp2Role: "Senior Developer",
        exp2Company: "Fanavaran Co.",
        exp2Date: "2019 - 2021",
        exp2Desc: "Developing web systems and mobile applications.",
        skillsTitle: "Skills",
        skillMarketing: "Marketing",
        copyright: "© 2024 Ali Saleh. All rights reserved."
    },
    ar: {
        name: "علي صالح",
        title: "مطور ويب ومستشار رقمي",
        bio: "مبدع، متحمس وعاشق للتكنولوجيا.<br>مساعدة الشركات على بناء حضور رقمي قوي.",
        saveContact: "حفظ جهة الاتصال",
        whatsapp: "واتساب",
        email: "بريد إلكتروني",
        experienceTitle: "الخبرة العملية",
        exp1Role: "مدير تقني",
        exp1Company: "شركة آكاف",
        exp1Date: "٢٠٢١ - الآن",
        exp1Desc: "إدارة الفريق التقني وتنفيذ مشاريع المؤسسات الكبرى.",
        exp2Role: "مطور أول",
        exp2Company: "شركة فناوران",
        exp2Date: "٢٠١٩ - ٢٠٢١",
        exp2Desc: "تطوير أنظمة الويب وتطبيقات الهاتف المحمول.",
        skillsTitle: "المهارات",
        skillMarketing: "التسويق",
        copyright: "© ٢٠٢٤ علي صالح. جميع الحقوق محفوظة."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Language Switcher Logic
    const langBtns = document.querySelectorAll('.lang-btn');
    const html = document.documentElement;
    
    // Set initial language from local storage or default to 'fa'
    const savedLang = localStorage.getItem('preferred-lang') || 'fa';
    setLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('preferred-lang', lang);
        });
    });

    function setLanguage(lang) {
        // Update active button state
        langBtns.forEach(b => b.classList.remove('active'));
        document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');

        // Update HTML dir and lang attributes
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');

        // Update Text Content
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    // vCard Logic (No changes needed here, just ensuring it works)
    document.getElementById('save-contact').addEventListener('click', () => {
        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Ali Saleh
N:Saleh;Ali;;;
TITLE:Web Developer & Digital Consultant
ORG:AKAF Co.
TEL;TYPE=CELL:+989123456789
EMAIL;TYPE=WORK:ali.saleh@example.com
URL:https://akafco.com
NOTE:Digital Business Card
END:VCARD`;

        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'ali_saleh.vcf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    });
});
