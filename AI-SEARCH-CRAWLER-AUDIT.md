# AI and search crawler audit

## VERIFIED

The public https://akafco.com/robots.txt fetched during this milestone allows `/` for `*`, disallows `/api/` and `/_next/`, and declares https://akafco.com/sitemap.xml. This is a robots policy observation, not proof of actual Googlebot/Bingbot/OpenAI IP access.

Official references consulted:
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://platform.openai.com/docs/bots
- https://www2.bing.com/webmasters/help/how-to-create-a-robots-txt-file-cb7c31ec

OpenAI documents OAI-SearchBot for ChatGPT search discovery and GPTBot for training. Their policies are independent. ChatGPT-User is user-triggered retrieval and is not the search-index crawler. Bing documents that a more-specific agent group replaces the generic group, so restrictions must be repeated if specific groups are added.

## IMPLEMENTED (local branch; release not approved)

Removed the blanket `/_next/` exclusion so crawlers can retrieve rendering resources. `/api/` remains excluded. The generic allow policy still covers Googlebot, Bingbot and OAI-SearchBot. No independent GPTBot preference was invented or changed: it continues to inherit the existing generic policy. Owner must approve any future training opt-out separately from search access.

Localized canonical/hreflang metadata is generated server-side. English fallback x-default points to each equivalent English page rather than the homepage. No llms.txt, fake citations, hidden AI text or mass-generated pages were introduced.

## REQUIRES OWNER ACCESS

Inspect Vercel/Cloudflare firewall, bot protection, geographic restrictions, rate limits and access logs. Allow verified crawler IP ranges under the provider's documented guidance; never trust User-Agent text alone as authentication. Confirm hosting allows static assets and public product content without authentication or interstitial CAPTCHA. Contact-form Turnstile is separate from page crawling and was not disabled.

## NOT TESTED

Requests originating from actual crawler infrastructure; Google/Bing index inclusion; AI citation inclusion; WAF dashboards; current search rankings. No promise of AI ranking or traffic is made.
