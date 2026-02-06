const translations = {
    fa: {
        name: "علی صالح",
        companyName: "مدیر عامل Global Trade Consultant Oman",
        bio: "کارشناس تجارت بین‌الملل، ترخیص کالا و سرمایه‌گذاری در عمان",
        saveContact: "ذخیره در مخاطبین",
        whatsapp: "واتس‌اپ",
        email: "ایمیل",
        servicesTitle: "خدمات ما",
        addressTitle: "آدرس دفتر",
        address: "عمان، مسقط، الخویر، خیابان المها، ساختمان ۴۷۶۸، طبقه دوم، دفتر شماره ۲۱",
        viewMap: "مشاهده روی نقشه",
        copyright: "© ۲۰۲۴ Global Trade Consultant Oman. تمامی حقوق محفوظ است.",
        services: [
            "صادرات و واردات",
            "ترخیص کالا",
            "انجام تشریفات گمرکی محموله‌های ایران و چین در عمان",
            "جذب سرمایه گذار در عمان و سرمایه گذاری تامین کالا"
        ]
    },
    en: {
        name: "Ali Saleh",
        companyName: "CEO - Global Trade Consultant Oman",
        bio: "Expert in International Trade, Customs Clearance, and Investment in Oman",
        saveContact: "Save Contact",
        whatsapp: "WhatsApp",
        email: "Email",
        servicesTitle: "Our Services",
        addressTitle: "Office Address",
        address: "Oman, Muscat, Alkhuwair, Al Maha Street, Building 4768, 2nd floor, Office No.21",
        viewMap: "View on Map",
        copyright: "© 2024 Global Trade Consultant Oman. All rights reserved.",
        services: [
            "Export & Import",
            "Customs Clearance",
            "Customs Formalities for Iran & China Shipments",
            "Investor Attraction & Goods Supply Investment"
        ]
    },
    ar: {
        name: "علي صالح",
        companyName: "الرئيس التنفيذي لـ Global Trade Consultant Oman",
        bio: "خبير في التجارة الدولية والتخليص الجمركي والاستثمار في عمان",
        saveContact: "حفظ جهة الاتصال",
        whatsapp: "واتساب",
        email: "البريد الإلكتروني",
        servicesTitle: "خدماتنا",
        addressTitle: "عنوان المكتب",
        address: "عمان، مسقط، الخوير، شارع المها، مبنى ٤٧٦٨، الطابق الثاني، مكتب رقم ٢١",
        viewMap: "عرض على الخريطة",
        copyright: "© ٢٠٢٦ AKAF Group Oman. جميع الحقوق محفوظة.",
        services: [
            "التصدير والاستيراد",
            "التخليص الجمركي",
            "الإجراءات الجمركية لشحنات إيران والصين في عمان",
            "جذب المستثمرين في عمان والاستثمار في توريد البضائع"
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Language Switcher Logic
    const langBtns = document.querySelectorAll('.lang-btn');
    const html = document.documentElement;
    const servicesList = document.getElementById('services-list');
    
    // Set initial language - DEFAULT IS ENGLISH as requested
    // Check localStorage first, if not present use 'en'
    let currentLang = localStorage.getItem('preferred-lang') || 'en';
    
    // Initialize
    setLanguage(currentLang);

    // Event Listeners for Language Buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('preferred-lang', lang);
        });
    });

    function setLanguage(lang) {
        currentLang = lang;
        
        // Update active button state
        langBtns.forEach(b => {
            b.classList.remove('active');
            if (b.getAttribute('data-lang') === lang) {
                b.classList.add('active');
            }
        });

        // Update HTML dir and lang attributes
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');

        // Update Simple Text Content
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update Services List
        renderServices(lang);
    }

    function renderServices(lang) {
        if (!servicesList) return;
        
        servicesList.innerHTML = '';
        translations[lang].services.forEach(service => {
            const div = document.createElement('div');
            div.className = 'service-item';
            div.innerHTML = `
                <div class="service-icon"><i class="fas fa-check"></i></div>
                <span class="service-text">${service}</span>
            `;
            servicesList.appendChild(div);
        });
    }

    // vCard Logic
    const saveBtn = document.getElementById('save-contact');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // Updated vCard content with user provided details
            const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${translations['en'].name}
N:Saleh;Ali;;;
ORG:Global Trade Consultant Oman
TITLE:CEO
TEL;TYPE=CELL,VOICE,PREF:+96877170998
EMAIL;TYPE=WORK,INTERNET:almadad@gmail.com
URL:https://akafco.com
ADR;TYPE=WORK:;;Al Maha Street, Building 4768, 2nd floor, Office No.21;Alkhuwair;Muscat;;Oman
X-SOCIALPROFILE;type=facebook:https://www.facebook.com/profile.php?id=61555491073869
X-SOCIALPROFILE;type=instagram:ali_saleh.77
NOTE:Services: Export & Import, Customs Clearance, Investment
END:VCARD`;

            const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'ali_saleh.vcf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    }
});
