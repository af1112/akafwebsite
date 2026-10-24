# Search analytics and conversion setup

## Status: REQUIRES OWNER ACCESS

No Google Search Console, Bing Webmaster or GA4 property has been verified in this milestone. No credentials or measurement IDs were provided. Existing Vercel Analytics and Speed Insights components are installed in the locale layout; dashboard collection and real-user metrics remain unverified.

## Owner actions

1. Confirm https://akafco.com as the preferred origin, DNS ownership and www-to-apex redirect policy.
2. Create/verify a Search Console Domain property using its supplied DNS TXT record. Do not publish credentials. Grant the release operator appropriate access.
3. Verify Bing Webmaster Tools using DNS or approved Search Console import. Inspect all three locales and submit the sitemap only after approved deployment.
4. Choose GA4 or a privacy-conscious analytics provider; approve consent requirements, retention and data residency. Configure separate staging and production properties. No analytics activation is implied by this document.
5. Obtain a baseline export: previous 90 days of impressions, clicks, CTR, landing pages, countries, queries and device classes. Retain brand/non-brand and locale segments. There are no measured ranking or traffic claims here.

## Conversion contract (prepared; NOT IMPLEMENTED)

| Event | Success boundary | Allowed fields |
|---|---|---|
| contact_submit_success | Confirmed successful contact API response, not button click | locale, division, form_type |
| demo_request_success | Confirmed accepted software-demo request | locale, product |
| industrial_inquiry_success | Confirmed accepted industrial inquiry | locale, service |
| rfq_submit_success | Confirmed accepted RFQ; dedicated RFQ flow not yet verified | locale, service |
| digital_menu_signup_complete | Backend-confirmed account creation, not signup page view or payment-success URL | locale, product |

Use only enumerated values. Never send names, email, phone, free-text subject/message, full query strings, session IDs, payment IDs or form payloads. Do not infer a conversion from /thank-you, whose visible success text is not proof of payment. Deduplicate retries without exposing customer identifiers. Test refusal of consent as well as granted consent. No live form submissions or payment transactions were made during this audit.

## Measurement after approval

Validate events in the provider debug view with synthetic approved accounts; mark only confirmed conversions as key events. Review qualified leads and conversion rate alongside organic impressions/clicks weekly, and compare rolling 28-day periods after sufficient data accumulates. Annotate release date and marketing activity. Search visibility and traffic increases are not guaranteed.
