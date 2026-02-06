const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, 'public/card/assets');
const cssDir = path.join(baseDir, 'css');
const fontsDir = path.join(baseDir, 'fonts');
const webfontsDir = path.join(baseDir, 'webfonts');

[cssDir, fontsDir, webfontsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadFile(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${dest}`);
                resolve();
            });
        }).on('error', err => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

const processCssAndDownloadFonts = async (cssUrl, cssName, fontDirRel, fontBaseUrl = '') => {
    console.log(`Processing CSS: ${cssUrl}`);
    return new Promise((resolve, reject) => {
        https.get(cssUrl, response => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', async () => {
                let cssContent = data;
                const urlRegex = /url\((['"]?)(.*?)\1\)/g;
                let match;
                const downloads = [];

                // Find all font URLs
                while ((match = urlRegex.exec(data)) !== null) {
                    let fontUrl = match[2];
                    if (fontUrl.startsWith('data:')) continue;

                    // Handle relative URLs if fontBaseUrl is provided
                    let absoluteFontUrl = fontUrl;
                    if (!fontUrl.startsWith('http')) {
                         absoluteFontUrl = fontBaseUrl + fontUrl;
                    }

                    const fontFileName = path.basename(absoluteFontUrl.split(/[?#]/)[0]);
                    const localFontPath = path.join(baseDir, fontDirRel, fontFileName);
                    
                    // Replace in CSS
                    // If it's Google Fonts, they give absolute URLs. We want relative: ../fonts/filename
                    // If it's FontAwesome, they give ../webfonts/filename. We want ../webfonts/filename (matches our structure)
                    
                    let relativePathInCss = `../${fontDirRel}/${fontFileName}`;
                    cssContent = cssContent.replace(match[0], `url('${relativePathInCss}')`);

                    downloads.push(downloadFile(absoluteFontUrl, localFontPath));
                }

                try {
                    await Promise.all(downloads);
                    fs.writeFileSync(path.join(cssDir, cssName), cssContent);
                    console.log(`Saved CSS: ${cssName}`);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', reject);
    });
};

const main = async () => {
    try {
        // 1. Font Awesome
        await processCssAndDownloadFonts(
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
            'fontawesome.min.css',
            'webfonts',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/' // Base for relative ../webfonts URLs? 
            // Actually FA css uses "../webfonts/..." so base is css url directory parent.
            // https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css -> parent is .../6.5.1/css/
            // Relative ../webfonts resolves to .../6.5.1/webfonts/
        );
        
        // Wait, the logic above for relative URLs needs care.
        // FA CSS has `url(../webfonts/fa-solid-900.woff2)`
        // My script sees `../webfonts/fa-solid-900.woff2`
        // absoluteFontUrl = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/` + `../webfonts/...` 
        // Correct logic: Resolve URL relative to CSS URL.
        
        // Let's redo the downloading part for FA specifically simpler:
        // Just download the specific files we know we need.
        
        console.log('Downloading Font Awesome Assets manually...');
        await downloadFile('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css', path.join(cssDir, 'fontawesome.min.css'));
        
        // We need to fix the paths in CSS manually or ensure they match. 
        // FA expects ../webfonts/. My structure is assets/css and assets/webfonts. So ../webfonts works!
        // Just need to download the webfonts.
        const faFonts = [
            'fa-brands-400.woff2', 'fa-regular-400.woff2', 'fa-solid-900.woff2',
            'fa-brands-400.ttf', 'fa-regular-400.ttf', 'fa-solid-900.ttf'
        ];
        for (const f of faFonts) {
            await downloadFile(`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/${f}`, path.join(webfontsDir, f));
        }

        // 2. Google Fonts (Poppins)
        // We download CSS, parse it, download fonts, replace URLs.
        await processCssAndDownloadFonts(
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap',
            'poppins.css',
            'fonts'
        );

        // 3. Vazirmatn
        // https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css
        // This references: fonts/ttf/Vazirmatn-Regular.ttf etc.
        // We will fetch the CSS, and let the script handle downloading referenced fonts.
        // The CSS has relative URLs like `fonts/ttf/...`
        // Base URL is https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/
        
        // Actually, let's use a simpler version of Vazirmatn or just the specific WOFF2 files.
        // The CDN css structure is complex. 
        // Let's just download Vazirmatn-Regular and Bold WOFF2 and write a simple CSS for them.
        
        console.log('Downloading Vazirmatn...');
        const vazirBase = 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts';
        await downloadFile(`${vazirBase}/Vazirmatn-Regular.woff2`, path.join(fontsDir, 'Vazirmatn-Regular.woff2'));
        await downloadFile(`${vazirBase}/Vazirmatn-Bold.woff2`, path.join(fontsDir, 'Vazirmatn-Bold.woff2'));
        
        const vazirCss = `
@font-face {
  font-family: 'Vazirmatn';
  src: url('../fonts/Vazirmatn-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Vazirmatn';
  src: url('../fonts/Vazirmatn-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
        `;
        fs.writeFileSync(path.join(cssDir, 'vazirmatn.css'), vazirCss);

        // 4. Formal Arabic Font (Tajawal or Amiri)
        // User disliked current one. "Tajawal" is a good modern Arabic font.
        // Let's download Tajawal from Google Fonts.
        await processCssAndDownloadFonts(
            'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap',
            'tajawal.css',
            'fonts'
        );

    } catch (err) {
        console.error('Error:', err);
    }
};

main();
