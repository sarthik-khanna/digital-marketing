/**
 * Starter articles for the blog. `npm run db:setup` inserts any that are
 * missing from `blog_posts` (matched by slug), and the site falls back to this
 * list when the database is not set up yet. Edit them from /admin/blog after
 * seeding; changes here only affect slugs not yet in the database.
 *
 * Self-contained on purpose (no "@/" imports): scripts/db-setup.mjs imports it
 * directly with Node.
 *
 * Written as general guidance: no client results, invented statistics or quotes.
 */

export type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "seo" | "google-ads" | "meta-ads" | "performance" | "digital-marketing";
  publishedAt: string;
  /** Unsplash photo ID for the cover, chosen to match the article. */
  cover: string;
  content: string;
};

export const seedPosts: SeedPost[] = [
  {
    slug: "local-seo-checklist-india",
    title: "Local SEO checklist: how to show up in 'near me' searches",
    excerpt:
      "The map pack decides who gets the call when someone nearby searches for what you sell. Here is what to fix first, in order.",
    category: "seo",
    publishedAt: "2026-10-28",
    cover: "1524661135-423995f22d0b",
    content: `When someone searches for "dentist near me" or "interior designer in Andheri", Google usually shows a map with three businesses before any normal results. That box is called the map pack, and for clinics, showrooms, institutes and service businesses it is where most calls come from.

The good news: local rankings depend heavily on things you control. Work through this list in order.

## 1. Claim and complete your Google Business Profile

Your Google Business Profile is the listing that appears in the map pack. If you have not claimed it, do that first and verify it.

Then fill in every field:

- **Primary category.** Pick the one that best describes what you sell, not the broadest one. "Orthodontist" beats "Dentist" if braces are your main service.
- **Secondary categories** for the other services you offer.
- **Service areas** if you visit customers, or an accurate address if they visit you.
- **Hours**, including special hours for festivals and holidays.
- **Services and products** with short descriptions and prices where you can.
- **Photos** of the outside, the inside, your team and your work. Real photos, not stock.

## 2. Keep your name, address and phone number identical everywhere

Google cross-checks your business details across the web. If your website says "Shop 4, MG Road" and a directory says "Shop No. 4, Mahatma Gandhi Road", that small mismatch weakens trust in your listing.

Write down one exact version of your name, address and phone number, and use it on your website, Google Business Profile, Justdial, Sulekha, IndiaMART, Facebook and any industry directories you are listed in.

## 3. Build a steady flow of genuine reviews

Reviews influence both rankings and whether people call. What matters is a steady flow of genuine reviews, not a burst of fifty in one week.

- Ask every happy customer, at the moment they are happiest, usually right after the job is done.
- Send a direct review link by WhatsApp. It takes them two taps.
- Reply to every review, good and bad, politely and specifically.
- Never buy reviews or offer discounts in exchange for them. It breaks Google's policies and can get reviews removed.

## 4. Give every location and service its own page

If you have branches in three cities, one "Locations" page with three addresses is not enough. Each branch deserves its own page with its address, map, timings, photos, the services offered there and directions from nearby landmarks.

The same applies to services. A page about "root canal treatment" can rank for root canal searches. A generic "Our services" page with one line about root canals cannot.

## 5. Post on your profile and keep it current

Google Business Profile lets you publish posts, offers and updates. Businesses that keep their profile active tend to look more trustworthy to searchers, and updating it takes ten minutes a week. Share new work, seasonal offers and answers to common questions.

## 6. Track calls, not just rankings

Rankings are a means to an end. In your Google Business Profile performance report, watch calls, direction requests and website clicks. On your website, track phone taps and WhatsApp clicks. If those numbers rise, your local SEO is working, whatever the ranking tool says.

## Where to start this week

If you only have an hour, do three things: complete every field in your Google Business Profile, fix any mismatched addresses on your top three directories, and ask your last five happy customers for a review. Those three steps alone fix the most common reasons local businesses do not show up.

Want us to check your local SEO for you? Our [free audit](/contact) covers your profile, citations and location pages.`,
  },
  {
    slug: "google-ads-cost-per-lead-rising",
    title: "Why your Google Ads cost per lead keeps rising, and how to fix it",
    excerpt:
      "Budgets go up, leads stay flat. Usually the cause is not competition but a handful of fixable account problems.",
    category: "google-ads",
    publishedAt: "2026-10-21",
    cover: "1460925895917-afdab827c52f",
    content: `It is one of the most common complaints we hear: "We doubled the budget and got the same number of leads." Competition does push costs up over time, but most of the time a rising cost per lead comes from problems inside the account.

Here are the usual causes, and what to do about each.

## 1. You are paying for searches that will never buy

Broad match keywords and automatically applied recommendations let Google show your ads for searches it thinks are related. Sometimes they are. Often they are students, job seekers or people looking for a free version.

**Fix it:** open the search terms report every week. Add irrelevant searches as negative keywords: "free", "jobs", "course", "salary", "DIY" and anything specific to your industry. Turn off auto-apply recommendations and review each suggestion yourself.

## 2. Your conversion tracking is counting the wrong things

If your account counts page views, button clicks or every form view as a conversion, Smart Bidding optimises for those cheap actions instead of real enquiries. The reported cost per conversion looks fine while actual leads get expensive.

**Fix it:** make sure your primary conversion actions are real outcomes: a submitted form, a phone call over 60 seconds, a WhatsApp click. Mark everything else as secondary so it is reported but not optimised for.

## 3. One campaign is trying to do everything

When all your services, locations and keyword themes sit in one campaign, budget flows to whatever is cheapest to click, not what is most profitable to win.

**Fix it:** split campaigns by service or by margin. Give your most profitable service its own budget so it never runs out while a lower-value service spends freely.

## 4. Your landing page is leaking enquiries

Ads bring visitors to a page. If that page is slow on mobile, does not match the ad, or hides the phone number below three screens of text, people leave.

**Fix it:** send each ad group to the most relevant page, not your home page. Put the offer, the proof and the enquiry form or call button on the first screen. Test page speed on a mid-range Android phone on mobile data, because that is how many of your visitors arrive.

## 5. Bidding changed before the data was ready

Switching to Target CPA or Maximise Conversions with only a handful of conversions a month gives the algorithm too little to learn from. Costs swing wildly and usually rise.

**Fix it:** let a campaign collect enough real conversions before moving to target-based bidding, and set targets close to what you actually achieve today rather than what you wish you achieved.

## 6. Nobody is looking at the account

Accounts drift. Ads get disapproved, budgets cap out at noon, competitors start bidding on your brand name. Small problems pile up when nobody checks.

**Fix it:** a weekly routine of search terms, budgets, ad status and conversion trends catches most issues before they get expensive.

## The short version

A rising cost per lead is usually a measurement problem, a structure problem or a neglect problem, and all three are fixable. Start with the search terms report and your conversion settings: they are free to check and often explain most of the waste.

If you would like a second pair of eyes, we offer a [free Google Ads audit](/ppc) that looks at exactly these issues.`,
  },
  {
    slug: "meta-lead-forms-vs-landing-pages",
    title: "Meta lead forms vs landing pages: which brings better leads?",
    excerpt:
      "Instant forms are cheap per lead, landing pages usually bring better ones. How to choose, and how to improve whichever you use.",
    category: "meta-ads",
    publishedAt: "2026-10-14",
    cover: "1611262588024-d12430b98920",
    content: `If you run lead generation ads on Facebook and Instagram, you have two main options. Instant forms (Meta's lead forms) open inside the app, pre-filled with the person's details. Landing pages take people to your website, where they fill in a form there.

Both work. They just trade off different things.

## Instant forms: more leads, lower intent

Because the form opens inside Facebook or Instagram and fills in the name, email and phone number automatically, submitting takes seconds. That usually means more leads at a lower cost per lead.

The catch is quality. Some people submit by accident, some forget they did, and some use an old number saved on their account. Your sales team may find many leads hard to reach.

**Instant forms suit you when:**

- You have a team that calls leads back within minutes.
- Your offer is simple and low-commitment, such as a free consultation or a price list.
- You need volume and can qualify on the phone.

## Landing pages: fewer leads, higher intent

Sending people to your website adds friction: the page has to load, they have to type their details. Fewer people complete it, so the cost per lead is usually higher.

But the people who do complete it have read about your offer and chosen to act. They tend to answer the phone and know what they enquired about.

**Landing pages suit you when:**

- Your product needs explaining: real estate, education, high-value services.
- You want to show proof, pricing or a video before people enquire.
- You care more about cost per qualified lead than cost per lead.

## How to improve instant forms

If you use instant forms, a few changes make a big difference to quality:

- **Choose "Higher intent" as the form type.** It adds a review step before submitting, which cuts accidental leads.
- **Add one or two qualifying questions,** such as budget, location or timeline. Use multiple choice, not free text.
- **Write a clear intro** that says exactly what happens next: "We will call you within one working day to discuss your requirements."
- **Call within five minutes** where you can. Contact rates drop quickly as hours pass.
- **Send leads straight to your CRM or WhatsApp** instead of downloading a spreadsheet once a week.

## How to improve landing pages

- **Match the ad.** The headline on the page should repeat the promise in the ad.
- **Keep the form short.** Name, phone and one qualifying question are often enough.
- **Make it fast on mobile.** Most Meta traffic is on phones, often on mobile data.
- **Install the Meta Pixel and Conversions API** so Meta can learn which visitors become leads.

## Our usual approach

We rarely pick one blindly. We run both for the same offer, then judge them on cost per qualified lead: the leads your team could actually reach and that matched your criteria. Whichever wins gets the budget.

The number to watch is not the cheapest lead. It is the cheapest lead your team can turn into a customer. [Talk to us about Meta ads](/meta-ads) if you would like help setting up that comparison.`,
  },
  {
    slug: "roas-cac-payback-explained",
    title: "ROAS, CAC and payback: the three numbers to judge your ad spend",
    excerpt:
      "Clicks and impressions do not pay salaries. These three numbers tell you whether marketing is making money, and when to spend more.",
    category: "performance",
    publishedAt: "2026-10-07",
    cover: "1554224155-6726b3ff858f",
    content: `Ad platforms report dozens of metrics. Most business owners only need three to decide whether their marketing is working: return on ad spend, customer acquisition cost and payback period.

## Return on ad spend (ROAS)

**ROAS = revenue from ads ÷ ad spend.**

If you spent ₹1,00,000 on ads and they brought in ₹4,00,000 in sales, your ROAS is 4. Every rupee returned four.

ROAS is most useful for e-commerce, where each sale has a clear value. Two cautions:

- **ROAS is revenue, not profit.** A ROAS of 4 is excellent at a 60% margin and loses money at a 20% margin once you include product, shipping and returns.
- **Platforms overlap.** Google and Meta may both count the same sale. Add their reported revenue together and you can end up with more sales than you made. Compare against your actual orders.

**Work out your break-even ROAS:** divide 1 by your gross margin. At a 40% margin, break-even ROAS is 2.5. Anything below that loses money on the first order.

## Customer acquisition cost (CAC)

**CAC = total marketing spend ÷ new customers.**

For lead-generation businesses this is often more useful than ROAS. If you spent ₹2,00,000 across Google, Meta and agency fees and won 40 new customers, your CAC is ₹5,000.

Two things make CAC honest:

- **Count all spend,** not just media: agency fees, creative production and tools.
- **Count customers, not leads.** A cheap lead that never buys is not cheap.

## Payback period

**Payback = how long a new customer takes to cover what you spent to win them.**

If a customer costs ₹5,000 to acquire and brings in ₹2,500 of gross profit a month, payback is two months. After that, they are profit.

Payback is what tells you whether you can afford to spend more. A short payback means growth funds itself quickly. A long payback means you need cash in the bank to keep acquiring customers before they pay back.

## Putting them together

These numbers answer three questions:

1. **ROAS:** is the money coming back?
2. **CAC:** what does a new customer cost?
3. **Payback:** how quickly can we reinvest?

A healthy setup has a CAC well below what a customer is worth over time, and a payback period your cash flow can support. When both hold steady, spending more is usually safe. When CAC rises faster than customer value, it is time to fix conversion rates or creative before adding budget.

## Start simple

You do not need an attribution platform to begin. A spreadsheet with monthly spend, new customers and revenue from those customers gets you most of the way. Update it monthly and the trends will tell you more than any dashboard.

This is exactly how we plan [performance marketing](/performance-marketing): agree the targets first, then judge every channel against them.`,
  },
  {
    slug: "technical-seo-basics-website-owners",
    title: "Technical SEO basics every website owner should check",
    excerpt:
      "Great content cannot rank if Google cannot crawl it. Six checks you can do yourself, no developer needed.",
    category: "seo",
    publishedAt: "2026-09-30",
    cover: "1461749280684-dccba630e2f6",
    content: `Technical SEO sounds intimidating, but the basics come down to one question: can Google find, read and trust your pages? Here are six checks you can run yourself with free tools.

## 1. Are your important pages indexed?

Open Google Search Console and look at the **Pages** report. It lists which pages are indexed and, more importantly, which are not and why.

Common reasons pages are left out:

- **Crawled, currently not indexed:** Google saw the page and decided it was not worth including, often because it is thin or very similar to another page.
- **Excluded by noindex tag:** someone told Google to skip it, sometimes by accident during a site redesign.
- **Duplicate without user-selected canonical:** Google found several versions of the same page.

If a page that sells your main service is not indexed, fix that before anything else.

## 2. Does your site work properly on mobile?

Google primarily uses the mobile version of your site for ranking. Open your key pages on your own phone and check:

- Text is readable without zooming.
- Buttons are big enough to tap.
- Nothing is cut off or hidden behind pop-ups.
- The phone number and enquiry form are easy to find.

## 3. How fast do your pages load?

Run your main pages through **PageSpeed Insights** and look at Core Web Vitals:

- **Largest Contentful Paint (LCP):** how quickly the main content appears.
- **Interaction to Next Paint (INP):** how quickly the page responds when someone taps.
- **Cumulative Layout Shift (CLS):** whether things jump around while loading.

The usual culprits are oversized images, too many plugins or third-party scripts, and slow hosting. Compressing images alone often makes a visible difference.

## 4. Is everything on HTTPS?

Your site should load on https:// with a padlock, and the http:// version should redirect to it. Also check that images and scripts are loaded over HTTPS, otherwise browsers may show a "not secure" warning.

## 5. Do you have a sitemap and a sensible robots.txt?

Visit yourdomain.com/sitemap.xml. You should see a list of your pages. Submit it in Search Console under **Sitemaps**.

Then visit yourdomain.com/robots.txt. Make sure it does not block pages you want found. A stray "Disallow: /" left over from development can hide an entire site.

## 6. Are there broken links and redirect chains?

Broken links waste visitors' time and Google's crawl attention. Redirect chains (page A redirects to B, which redirects to C) slow things down. A free crawler such as Screaming Frog (free up to 500 URLs) will list both.

## Fix in order of impact

Indexing problems come first, because an unindexed page cannot rank at all. Then mobile usability and speed on your money pages. Then housekeeping like broken links.

If you would rather hand this over, our [SEO audit](/seo) covers all six checks and gives you a prioritised list of fixes.`,
  },
  {
    slug: "search-pmax-demand-gen-which-campaign",
    title: "Search, Performance Max or Demand Gen: which Google Ads campaign is right?",
    excerpt:
      "Google offers more campaign types than ever. A plain-language guide to what each one does and when to use it.",
    category: "google-ads",
    publishedAt: "2026-09-23",
    cover: "1573804633927-bfcbcd909acd",
    content: `Google Ads now offers several campaign types, and the default recommendation is not always the right one for your business. Here is what the three you will hear about most actually do.

## Search campaigns

Search campaigns show text ads on Google search results when someone types a query that matches your keywords.

**Strengths:**

- You reach people at the moment they are actively looking.
- You control keywords, ad copy and landing pages.
- The search terms report shows exactly what people searched.

**Best for:** service businesses, lead generation and anyone whose customers search with clear intent: "CA firm for GST filing", "physiotherapy clinic in Pune".

For most businesses starting with Google Ads, a well-structured Search campaign is the right first step.

## Performance Max

Performance Max (PMax) runs one campaign across all of Google's inventory: Search, Shopping, YouTube, Display, Gmail, Discover and Maps. You provide images, videos, text and audience signals, and Google decides where and to whom to show ads.

**Strengths:**

- Reach across every Google channel from one campaign.
- Strong for e-commerce with a good product feed.

**Watch-outs:**

- Less visibility into where money goes, although reporting has improved.
- It can lean on your brand searches and remarketing, which might have converted anyway.
- It needs accurate conversion tracking and a fair amount of data to perform.

**Best for:** e-commerce stores with a clean Merchant Center feed and reliable conversion tracking. Use brand exclusions and watch results against your actual sales.

## Demand Gen

Demand Gen campaigns show visual ads on YouTube (including Shorts), Discover and Gmail. They target people based on interests, behaviour and lookalikes rather than what they are searching right now.

**Strengths:**

- Builds demand among people not yet searching for you.
- Image and video formats that suit products and services with a visual story.

**Best for:** creating awareness and interest that later shows up as searches, and remarketing to people who visited your site.

## How we usually combine them

1. **Start with Search** for the services people already look for. Get tracking right and learn your real cost per lead.
2. **Add Performance Max** if you sell products online and have a good feed, or once Search is profitable and you want more reach.
3. **Add Demand Gen** when you want to grow demand beyond existing searches, with creative ready to support it.

The right mix depends on your margins, how people find businesses like yours and how much budget there is to learn with. If you are not sure where to start, our [Google Ads team](/ppc) can recommend a structure after a free audit.`,
  },
  {
    slug: "meta-ads-creative-fatigue",
    title: "Creative fatigue on Meta: how to tell when your ads need refreshing",
    excerpt:
      "Results drop, costs climb, nothing else changed. Often the ad itself has simply worn out. Here is how to spot it and what to do.",
    category: "meta-ads",
    publishedAt: "2026-09-16",
    cover: "1432888622747-4eb9a8efeb07",
    content: `On Facebook and Instagram, the same people see your ads again and again. At first, repetition helps. Eventually it stops working: people scroll past an ad they have seen ten times. That is creative fatigue, and it is one of the most common reasons Meta campaigns slowly get worse.

## Signs your creative is fatigued

Look at each ad over the last few weeks:

- **Frequency is climbing.** The average number of times each person has seen the ad keeps going up.
- **Click-through rate is falling** while targeting has not changed.
- **Cost per result is rising** steadily rather than jumping suddenly.
- **Comments and reactions dry up,** or turn into "seen this a hundred times".

No single number proves fatigue. When frequency rises while click-through rate falls on the same ad, that is the clearest sign.

## What does not fix it

- **Raising the budget.** More spend on a tired ad shows it more often to the same people.
- **Duplicating the ad set.** It resets learning but uses the same tired creative.
- **Small tweaks.** Changing a word in the caption rarely makes people stop scrolling again.

## What does fix it

**New concepts, not just new versions.** A different angle on the same offer: a customer problem instead of a feature, a demonstration instead of a claim, a founder talking to camera instead of a designed graphic.

A practical rhythm:

1. **Keep a creative pipeline.** Plan new ads every month, not only when results drop.
2. **Test several concepts at once** so you always have a likely replacement ready.
3. **Mix formats:** static images, carousels, short vertical videos for Reels and Stories.
4. **Use what your customers actually say.** Reviews, sales call notes and WhatsApp questions are full of hooks.
5. **Make regional language versions** if your customers prefer Hindi or a local language. They often feel fresh to audiences who have tuned out English ads.

## How many new ads do you need?

It depends on budget and audience size. A small local audience sees ads quickly and wears them out faster. A national audience with a modest budget can run the same ad much longer. Watch frequency and click-through rate rather than following a fixed rule.

## Keep the winners, retire the rest

When a new ad beats the old one, give it the budget and keep the old one paused rather than deleted, so you can learn from what worked. Over time, you build a library of winning angles to remix.

If keeping up with creative feels like a full-time job, that is because it is. Our [Meta ads service](/meta-ads) includes fresh creative every month.`,
  },
  {
    slug: "how-to-choose-digital-marketing-agency",
    title: "How to choose a digital marketing agency: questions to ask before you sign",
    excerpt:
      "Most agency relationships go wrong for predictable reasons. Ask these questions upfront and you will avoid most of them.",
    category: "digital-marketing",
    publishedAt: "2026-09-09",
    cover: "1552664730-d307ca884978",
    content: `Hiring a digital marketing agency is a big decision. The right one becomes an extension of your team. The wrong one burns months of budget with little to show for it. These questions help you tell them apart before you sign.

## About results and reporting

**What will you report on each month?** Look for leads, sales, cost per lead and revenue, not only impressions, reach and rankings. If the sample report is full of vanity metrics, the work probably will be too.

**How will you track leads and sales?** A good agency will talk about conversion tracking, call tracking and connecting ad data to your CRM or orders before they talk about creative.

**What results can I realistically expect, and when?** Be wary of guarantees, especially "page one in 30 days". Honest agencies give ranges and explain what they depend on.

## About ownership and access

**Whose name will the ad accounts be in?** Your Google Ads account, Meta Business Manager, Analytics and Search Console should belong to you, with the agency given access. If you part ways, you keep the history and data.

**Will I have access to everything?** You should be able to log in and see your campaigns at any time.

## About the team

**Who will actually work on my account?** The senior person in the pitch is not always the person running your campaigns. Ask who will, and how experienced they are.

**How often will we talk, and who is my point of contact?** A named account manager and a regular review call prevent most misunderstandings.

## About pricing and contracts

**How do you charge?** Fixed monthly fees, percentage of ad spend and retainers all exist. Make sure you understand what is included and what costs extra, such as creative, landing pages or tools.

**What is the minimum term, and how do I leave?** A short minimum term is reasonable, because campaigns need time to learn. Long lock-ins with heavy exit penalties are a warning sign.

**Is ad spend paid to the platform directly?** Ideally, your card is on the ad account and you pay Google and Meta directly, so you always know exactly what was spent.

## About fit

**Have you worked with businesses like mine?** Industry experience helps, especially in regulated areas like healthcare, finance and real estate.

**What would you do first?** A good agency asks about your margins, customers and sales process before recommending channels. If they jump straight to a package, they are selling, not planning.

## Red flags

- Guaranteed rankings or a guaranteed number of leads.
- Accounts set up in the agency's name.
- Reports with no link to enquiries or sales.
- Pressure to sign quickly with a "this week only" discount.

## A good first step

Ask for an audit of your current marketing before committing. It shows how the agency thinks, what they find, and whether their advice makes sense for your business.

We offer exactly that: a [free audit](/contact) of your SEO, Google Ads and Meta ads, with clear next steps whether or not you work with us.`,
  },
];
