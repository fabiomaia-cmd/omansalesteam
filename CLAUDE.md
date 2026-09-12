# PriceScope — GCC Meat Price Intelligence Tool

Static site (no framework, no build step) deployed via GitHub Pages at
https://fabiomaia-cmd.github.io/omansalesteam/ — repo:
https://github.com/fabiomaia-cmd/omansalesteam

Field price-collection tool for GCC meat markets: chicken, beef, lamb, goat
(frozen/chilled) across Modern Trade, Traditional Trade, Food Service and
Wholesaler channels in UAE, Oman, Saudi Arabia, Qatar, Bahrain, Kuwait,
Iraq and Yemen. Entry via manual form, photo OCR (Tesseract.js), or audio
transcription. Exports/imports CSV for Excel round-tripping.

## Stack

- `index.html` / `app.js` / `styles.css` — plain HTML/CSS/JS, no build step
- Supabase (Postgres + PostgREST) as the backend. `SUPABASE_URL` and
  `SUPABASE_KEY` (a publishable/anon key, safe for client-side use) are
  hardcoded near the top of `app.js`. Table: `collections`.
- `@supabase/supabase-js@2` and `tesseract.js@5` loaded from jsdelivr CDN
  in `index.html`.
- RLS policies on the table allow the anon key to select/insert/update/delete
  — there is no separate auth layer. Treat any write as immediately live for
  the whole team.

## Key business rule — Retailer margin

`suggestedRetailMargin(protein, country)` in `app.js`:

```
base = (Beef or Lamb) ? 30% : 20%   // Chicken, Goat, etc. = 20%
margin = base + COUNTRY_VAT_RATES[country]
```

`COUNTRY_VAT_RATES`: Oman 0%, KSA 15%, UAE 5%, Qatar 5%, Bahrain 10%,
Kuwait/Iraq/Yemen 0%.

This margin drives `industry_price` ("Price to industry"):
`industry_price = price_usd_kg * (1 - margin/100)`, then converted through
`FX_TO_USD[currency]` before being stored (and divided back out on load) —
so the DB column is in local-currency terms, not USD, despite the app
always displaying USD/kg.

**Important:** the margin is only auto-applied client-side when a record is
created or edited AND the user hasn't typed over the suggested value. If
this rule changes in the code, existing Supabase rows do NOT update
themselves — they need a one-off recalculation pushed via the API. There is
no stored flag distinguishing "auto-suggested margin" from "manually typed
margin" other than eyeballing whether the stored value matches the current
formula.

## Data model (`collections` table)

id (uuid), date, manufacturer, collector, channel, city, country,
origin_country, currency, retailer, protein, temperature, product,
sub_product, packaging_type, package_weight_kg, package_price, price_kg,
price_usd_kg, margin_pct, industry_price, manual_industry_price (bool),
promotion (bool), full_price, promo_pack (bool), combo_qty,
combo_unit_weight, combo_total_price, created_at.

`app.js` field name → DB column mapping lives in `toDbRecord()` /
`fromDbRecord()`.

## Known state (as of 2026-09-12)

- 49 records total. All `margin_pct` values verified consistent with the
  current formula above (last correction: 21 stale rows fixed on 2026-09-12,
  moving Beef/Lamb Oman 20%→30% and Beef/Lamb KSA 20%/28%→45%, with
  `industry_price` recalculated alongside).
- Retailers collected so far: Nesto (Oman), Aljazeerah (KSA).
- No exact duplicate collections (same retailer+date+product+price). A few
  same store/date/product rows with different manufacturer + price are
  expected (competing brands on the same shelf), not duplicates.

## Working conventions

- This is a live production tool the team enters real field data into —
  any Supabase write here is immediately visible to everyone using the
  tool. Prefer targeted `.update()` on specific ids over broad rewrites,
  and sanity-check a sample before/after a bulk change.
- No CI/build — changes to `index.html`/`app.js`/`styles.css` go live on
  GitHub Pages as soon as they're pushed/uploaded to `main`.
