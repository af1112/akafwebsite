document.addEventListener('DOMContentLoaded', () => {
    // Contact Data
    const contactData = {
        firstName: 'Ali',
        lastName: 'Saleh',
        organization: 'Akaf',
        title: 'Web Developer & Digital Marketing Consultant',
        phone: '+989123456789',
        email: 'ali.saleh@example.com',
        website: 'https://akafco.com',
        address: 'Tehran, Iran'
    };

    // Save Contact (vCard) functionality
    const saveContactBtn = document.getElementById('save-contact');
    
    saveContactBtn.addEventListener('click', () => {
        const vCardContent = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:${contactData.lastName};${contactData.firstName};;;`,
            `FN:${contactData.firstName} ${contactData.lastName}`,
            `ORG:${contactData.organization}`,
            `TITLE:${contactData.title}`,
            `TEL;TYPE=CELL:${contactData.phone}`,
            `EMAIL;TYPE=WORK:${contactData.email}`,
            `URL:${contactData.website}`,
            `ADR;TYPE=WORK:;;${contactData.address}`,
            'END:VCARD'
        ].join('\n');

        const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.setAttribute('download', `${contactData.firstName}_${contactData.lastName}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Add 3D Tilt Effect to Card
    const card = document.querySelector('.card-glass');
    const container = document.querySelector('.container');

    container.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    container.addEventListener('mouseenter', (e) => {
        card.style.transition = 'none';
        // Popout effect elements
        const title = document.querySelector('.name');
        const profile = document.querySelector('.profile-image-wrapper');
        const skills = document.querySelector('.skills-grid');
        
        title.style.transform = 'translateZ(150px)';
        profile.style.transform = 'translateZ(200px)';
        skills.style.transform = 'translateZ(100px)';
    });

    container.addEventListener('mouseleave', (e) => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        
        // Reset popout elements
        const title = document.querySelector('.name');
        const profile = document.querySelector('.profile-image-wrapper');
        const skills = document.querySelector('.skills-grid');
        
        title.style.transform = 'translateZ(0px)';
        profile.style.transform = 'translateZ(0px)';
        skills.style.transform = 'translateZ(0px)';
    });
});
