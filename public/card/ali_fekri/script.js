const translations = {
    en: {
        name: "Ali Fekri",
        role: "Mechanical Engineer & Industrial IT Expert",
        company: "AKAF Group",
        location: "Muscat, Oman",
        saveContact: "Save Contact",
        downloadResume: "Download Resume",
        skillsTitle: "Technical Expertise",
        summaryTitle: "Professional Profile",
        summary: "Mechanical Engineer with over 15 years of technical experience in industrial projects, specializing in Fluid Mechanics, Commissioning (ICAPS), and Industrial IT Infrastructure. Proven track record in gas production facilities (2 billion cu.ft/day) and complex engineering solutions.",
        copyright: "© 2026 Ali Fekri. Industrial Engineering Solutions.",
        typingTexts: ["Fluid Mechanics Specialist", "Industrial Automation", "ICAPS Commissioning", "IT Infrastructure"]
    },
    fa: {
        name: "علی فکری",
        role: "مهندس مکانیک و متخصص IT صنعتی",
        company: "گروه آکاف",
        location: "مسقط، عمان",
        saveContact: "ذخیره مخاطب",
        downloadResume: "دانلود رزومه",
        skillsTitle: "تخصص‌های فنی",
        summaryTitle: "خلاصه سوابق",
        summary: "مهندس مکانیک با بیش از ۱۵ سال تجربه فنی در پروژه‌های صنعتی، متخصص در مکانیک سیالات، راه‌اندازی (ICAPS) و زیرساخت‌های IT صنعتی. دارای سابقه درخشان در تاسیسات تولید گاز (۲ میلیارد فوت مکعب در روز) و راهکارهای مهندسی پیچیده.",
        copyright: "© ۲۰۲۶ علی فکری. راهکارهای مهندسی صنعتی.",
        typingTexts: ["متخصص مکانیک سیالات", "اتوماسیون صنعتی", "راه‌اندازی ICAPS", "زیرساخت‌های IT"]
    },
    ar: {
        name: "علي فكري",
        role: "مهندس ميكانيكا وخبير تكنولوجيا المعلومات الصناعية",
        company: "مجموعة آكاف",
        location: "مسقط، عمان",
        saveContact: "حفظ جهة الاتصال",
        downloadResume: "تحميل السيرة الذاتية",
        skillsTitle: "الخبرات التقنية",
        summaryTitle: "الملف المهني",
        summary: "مهندس ميكانيكي يتمتع بخبرة فنية تزيد عن ١٥ عامًا في المشاريع الصناعية، متخصص في ميكانيكا الموائع والتشغيل (ICAPS) والبنية التحتية لتكنولوجيا المعلومات الصناعية. سجل حافل في مرافق إنتاج الغاز (٢ مليار قدم مكعب/يوم) والحلول الهندسية المعقدة.",
        copyright: "© ٢٠٢٦ علي فكري. حلول الهندسة الصناعية.",
        typingTexts: ["أخصائي ميكانيكا الموائع", "الأتمتة الصناعية", "تشغيل ICAPS", "البنية التحتية لتكنولوجيا المعلومات"]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Switcher
    const langBtns = document.querySelectorAll('.lang-btn');
    const html = document.documentElement;
    let currentLang = 'en'; // Default
    let typingInterval;

    function setLanguage(lang) {
        currentLang = lang;
        
        // Update Buttons
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) btn.classList.add('active');
        });

        // Update HTML attributes
        html.lang = lang;
        html.dir = lang === 'en' ? 'ltr' : 'rtl';

        // Update Text Content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        // Update Name
        const nameEl = document.querySelector('.tech-title');
        if (nameEl) {
            nameEl.innerText = translations[lang].name;
        }

        // Restart Typing Effect
        startTypingEffect(translations[lang].typingTexts);
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // Initial Set
    setLanguage('en');

    // 2. Typing Effect
    function startTypingEffect(texts) {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        if (typingInterval) clearInterval(typingInterval);
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 300;
            }

            typingInterval = setTimeout(type, typeSpeed);
        }

        type();
    }

    // 3. Skill Bar Animation
    function animateSkills() {
        const bars = document.querySelectorAll('.progress-fill');
        bars.forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = width;
        });
    }
    // Delay slightly to ensure load
    setTimeout(animateSkills, 500);

    // 4. vCard Generation
    const saveBtn = document.getElementById('save-contact');
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${translations[currentLang].name}
N:Fekri;Ali;;;
ORG:${translations[currentLang].company}
TITLE:${translations[currentLang].role}
EMAIL;TYPE=WORK,INTERNET:info@akafco.com
URL:https://akafco.com
ADR;TYPE=WORK:;;Al Mauj Street, Seeb;Muscat;;;Oman
NOTE:15+ Years Exp | Fluid Mechanics | Industrial IT
END:VCARD`;

            const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'ali_fekri.vcf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    }

    // 5. Industrial Particle System (Nodes & Flows)
    initParticles();
});

function initParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = '#f59e0b'; // Amber
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw Technical Grid Lines
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'; // Blue technical lines
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// VanillaTilt Init
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".glass-panel"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
    });
}
