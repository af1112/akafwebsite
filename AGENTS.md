# Project verification

- Run `npm run build` for the Next.js production build and integrated TypeScript validation. Build configuration skips lint; a successful build is not a lint pass.
- Run `npx tsc --noEmit` separately for type checking.
- `npm run lint` currently fails because Next.js 14 invokes ESLint options removed in the installed ESLint 9. Do not bypass security or lint policies to hide this; resolve dependency/config compatibility explicitly.
- Milestone J evidence: start the built app with `npm run start -- --port 3010`, then run `node scripts/milestone-j-audit.js` and `node scripts/milestone-j-verify.js`. Audit requires a ready server, installed puppeteer-core and Chrome (override CHROME_PATH if needed). Use an unused port and set AUDIT_BASE_URL consistently rather than trusting an old listener; the final Milestone J HTTP capture used port 3012. On Windows use PowerShell when setting QUALITY_ROUTES because Git Bash may rewrite leading-slash environment values as filesystem paths. Evidence goes to shots/milestone-j; the CSV goes to SEO-ROUTE-MATRIX.csv.
- Performance/accessibility evidence: `node scripts/milestone-j-quality.js` requires the same server plus Lighthouse and @axe-core/puppeteer. Local lab results are not field Core Web Vitals or a manual accessibility certification.
- Preserve feature/corporate-rebrand and backup/pre-rebrand-2026-10-23. No push, merge or production deployment without explicit owner approval.
