const PRODUCTS = {
  Chicken: ["Whole", "Cuts", "FPP", "Offals"],
  Beef: ["Vaccum", "Cubes and cuts", "FPP", "Bone in beef", "Offals"],
  Lamb: ["Cuts with bone", "Boneless cuts", "Offals"],
  Goat: ["Cuts with bone", "Boneless cuts", "Offals"]
};
const SUBPRODUCTS = {
  FPP: { Chicken: ["Franks", "Tender breast", "Hamburger", "Breaded products", "Minced chicken"], Beef: ["Skewers", "Minced beef", "Hamburgers", "Cubes", "Steaks", "Kebabs"], Lamb: ["Minced lamb", "Cubes with bone", "Boneless cubes", "Kebabs"], Goat: ["Minced lamb", "Cubes with bone", "Boneless cubes", "Kebabs"] },
  Cuts: { Chicken: ["Boneless breast", "Breast with bones", "Whole leg", "Drumsticks", "Thighs", "Whole wings"] }
};
const COUNTRIES = ["UAE", "Oman", "KSA", "Qatar", "Bahrain", "Kuwait", "Iraq", "Yemen"];
const CITIES = { Oman: ["Muscat", "Salalah", "Sohar", "Ibri", "Nizwa", "Dhank"], UAE: ["Dubai", "Sharjah", "Abu Dhabi", "Al Ain", "Fujairah"], Qatar: ["Doha"] };
const GCC_MANUFACTURERS = ["Seara", "Sadia", "ASaffa", "A Saffa", "Almarai", "Dhofar", "Tanmia", "Alwatania", "Nadec", "Atyab", "Al Kabeer", "Al Qudra", "Meyah", "Al Rafi", "Al Safa", "Mabani", "AlJazeera", "Alyawer", "Al Bawadi"];
const VOICE_COUNTRY_ALIASES = { Oman: ["oman", "o man", "oh man", "omman", "omani"], UAE: ["uae", "u a e", "united arab emirates", "emirates", "dubai", "abu dhabi", "abudhabi", "sharjah", "al ain", "fujairah"], KSA: ["ksa", "saudi arabia", "saudi"], Qatar: ["qatar", "catar"], Bahrain: ["bahrain", "bahrein"], Kuwait: ["kuwait", "kwait"], Iraq: ["iraq", "iraq country"], Yemen: ["yemen", "yaman"] };
const VOICE_CURRENCY_ALIASES = { AED: ["aed", "dirham", "dirhams", "dihram", "dihrans", "dhs", "dhs"], OMR: ["omr", "rial", "riyals"], SAR: ["sar", "saudi riyal", "riyal"], QAR: ["qar", "qatari riyal"], BHD: ["bhd", "bahraini dinar"], KWD: ["kwd", "kuwaiti dinar"], IQD: ["iqd", "iraqi dinar"], YER: ["yer", "yemeni riyal"] };
const CURRENCIES = { UAE: "AED", Oman: "OMR", KSA: "SAR", Qatar: "QAR", Bahrain: "BHD", Kuwait: "KWD", Iraq: "IQD", Yemen: "YER" };
const FX_TO_USD = { USD: 1, AED: 3.6725, OMR: 0.3845, SAR: 3.75, QAR: 3.64, BHD: 0.376, KWD: 0.306, IQD: 1310, YER: 250 };
const COLLECTOR_KEY = "pricescope-last-collector";
const SUPABASE_URL = "https://lleckfusapsrkdcgvfhp.supabase.co";
const SUPABASE_KEY = "sb_publishable_PqYYW2XPI_qAANQm_jZ9fQ_Nzl3dLEp";
const SUPABASE_TABLE = "collections";
const LEGACY = { Frango: "Chicken", Bovino: "Beef", Carneiro: "Lamb", Congelado: "Frozen", Resfriado: "Chilled", "Bahrein": "Bahrain", Kwait: "Kuwait", Iemen: "Yemen", "Inteiro": "Whole", "Cortes": "Cuts", "Cortes com osso": "Cuts with bone", Desossado: "Boneless cuts", "Vácuo": "Vaccum", "Cubos e cortes": "Cubes and cuts", "Hambúrguer": "Hamburger", Moída: "Minced beef", "Carne com osso": "Bone in beef" };
const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY);
let records = [];
let editingId = null, recognition = null;
const $ = id => document.getElementById(id);
const number = value => Number(value) || 0;
const today = () => new Date().toISOString().slice(0, 10);
const money = (value, currency = "USD") => value === "" || value == null || Number.isNaN(Number(value)) ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Number(value));
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
function normalizeRecord(record) { return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, typeof value === "string" && LEGACY[value] ? LEGACY[value] : value])); }
function nullableNumber(value) { return value === "" || value == null || value === undefined ? null : Number(value); }
function toDbRecord(record) {
  return {
    id: record.id, date: record.date, manufacturer: record.manufacturer, collector: record.collector,
    channel: record.channel, city: record.city, country: record.country, currency: record.currency,
    retailer: record.store, protein: record.protein, temperature: record.temperature, product: record.product,
    sub_product: record.subProduct || null, package_weight_kg: nullableNumber(record.weight), package_price: nullableNumber(record.packPrice),
    price_kg: nullableNumber(record.priceKg), price_usd_kg: nullableNumber(record.priceUsdKg), margin_pct: nullableNumber(record.margin),
    industry_price: nullableNumber(record.industryPrice), manual_industry_price: Boolean(record.manualIndustryPrice),
    promotion: Boolean(record.promotion), full_price: nullableNumber(record.fullPrice), promo_pack: Boolean(record.promoPack),
    combo_qty: nullableNumber(record.comboQty), combo_unit_weight: nullableNumber(record.comboUnitWeight), combo_total_price: nullableNumber(record.comboTotalPrice)
  };
}
function fromDbRecord(record) {
  return normalizeRecord({
    id: record.id, date: record.date, manufacturer: record.manufacturer, collector: record.collector,
    channel: record.channel, city: record.city, country: record.country, currency: record.currency,
    store: record.retailer, protein: record.protein, temperature: record.temperature, product: record.product,
    subProduct: record.sub_product, weight: Number(record.package_weight_kg), packPrice: Number(record.package_price),
    priceKg: Number(record.price_kg), priceUsdKg: Number(record.price_usd_kg), margin: Number(record.margin_pct),
    industryPrice: Number(record.industry_price), manualIndustryPrice: record.manual_industry_price,
    promotion: record.promotion, fullPrice: Number(record.full_price), promoPack: record.promo_pack,
    comboQty: Number(record.combo_qty), comboUnitWeight: Number(record.combo_unit_weight),
    comboTotalPrice: Number(record.combo_total_price)
  });
}
async function loadRecords() {
  if (!supabaseClient) throw new Error("Supabase is not configured. Replace SUPABASE_URL and SUPABASE_KEY in app.js.");
  const { data, error } = await supabaseClient.from(SUPABASE_TABLE).select("*").order("date", { ascending: false });
  if (error) throw error;
  records = (data || []).map(fromDbRecord);
}
async function saveRecords(items) {
  if (!supabaseClient) throw new Error("Supabase is not configured. Replace SUPABASE_URL and SUPABASE_KEY in app.js.");
  const { error } = await supabaseClient.from(SUPABASE_TABLE).upsert(items.map(toDbRecord), { onConflict: "id" });
  if (error) throw error;
}
async function deleteRecords(ids) {
  const { error } = await supabaseClient.from(SUPABASE_TABLE).delete().in("id", ids);
  if (error) throw error;
}
function reportStorageError(error) { console.error(error); showToast(`Database error: ${error.message || error}`); }
function showToast(text) { const toast = $("toast"); toast.textContent = text; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 7000); }
function configureFormLabels() {
  $("packPrice").parentElement.firstChild.textContent = "RSP Price (Retail Sales Price) ";
  $("priceKg").type = "hidden";
  $("priceKg").parentElement.hidden = true;
  $("priceUsdKg").parentElement.firstChild.textContent = "Market price (US$/kg) - RSP label ";
}
function populateRetailerSuggestions() { const names = [...new Set(records.map(record => record.store).filter(Boolean))].sort(); $("retailerSuggestions").innerHTML = names.map(name => `<option value="${escapeHtml(name)}"></option>`).join(""); }
function populateManufacturerSuggestions() { const names = [...new Set(records.map(record => record.manufacturer).filter(Boolean))].sort(); $("manufacturerSuggestions").innerHTML = names.map(name => `<option value="${escapeHtml(name)}"></option>`).join(""); }
function populateProducts(selected = "") { const options = PRODUCTS[$("protein").value] || []; $("product").innerHTML = `<option value="">Select</option>${options.map(item => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("")}`; populateSubProducts(); }
function populateSubProducts(selected = "") { const protein = $("protein").value, product = $("product").value, options = SUBPRODUCTS[product]?.[protein] || [], isCustom = selected && !options.includes(selected); $("subProduct").innerHTML = `<option value="">Not applicable</option>${options.map(item => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("")}<option value="__custom" ${isCustom ? "selected" : ""}>Other...</option>`; $("subProductCustom").value = isCustom ? selected : ""; toggleSubProductCustom(); }
function toggleSubProductCustom() { const custom = $("subProduct").value === "__custom"; $("subProductCustom").hidden = !custom; $("subProductCustom").required = custom; }
function populateCountryFields(country = $("country").value, city = "") {
  $("countryCustom").hidden = country !== "__custom"; $("countryCustom").required = country === "__custom";
  const cities = CITIES[country] || []; $("city").innerHTML = `<option value="">${cities.length ? "Select" : "Enter if needed"}</option>${cities.map(item => `<option ${item === city ? "selected" : ""}>${item}</option>`).join("")}<option value="__custom">Other city...</option>`;
  const custom = Boolean(city && !cities.includes(city)); $("city").value = custom ? "__custom" : $("city").value; $("cityCustom").hidden = !custom && $("city").value !== "__custom"; $("cityCustom").required = custom || $("city").value === "__custom"; if (custom) $("cityCustom").value = city;
  if (CURRENCIES[country]) $("currency").value = CURRENCIES[country];
}
function toggleConditionalFields() { $("fullPriceField").hidden = !$("promotion").checked; const hidden = !$("promoPack").checked; ["comboQtyField", "comboWeightField", "comboPriceField"].forEach(id => $(id).hidden = hidden); updateCalculation(); }
function openDialog(record = null, photo = null, transcript = "") {
  editingId = record?.id || null; $("entryForm").reset(); configureFormLabels(); $("date").value = record?.date || today(); $("collector").value = record?.collector || localStorage.getItem(COLLECTOR_KEY) || ""; $("dialogEyebrow").textContent = editingId ? "EDIT COLLECTION" : "NEW COLLECTION"; $("dialogTitle").textContent = editingId ? "Edit price" : "Add price";
  if (record) {
    $("country").value = COUNTRIES.includes(record.country) ? record.country : "__custom"; $("countryCustom").value = COUNTRIES.includes(record.country) ? "" : record.country; populateCountryFields($("country").value, record.city);
    for (const key of ["manufacturer", "collector", "channel", "store", "protein", "temperature", "weight", "packPrice", "priceKg", "priceUsdKg", "margin", "industryPrice", "currency", "fullPrice", "comboQty", "comboUnitWeight", "comboTotalPrice"]) if ($(key)) $(key).value = record[key] ?? "";
    if (record.city && !CITIES[record.country]?.includes(record.city)) { $("city").value = "__custom"; $("cityCustom").value = record.city; $("cityCustom").hidden = false; }
    $("promotion").checked = Boolean(record.promotion); $("promoPack").checked = Boolean(record.promoPack); $("protein").value = record.protein; populateProducts(record.product); populateSubProducts(record.subProduct);
  } else { $("margin").value = 20; populateProducts(); $("audioNotice").hidden = !transcript; $("transcriptText").textContent = transcript; }
  toggleConditionalFields(); $("photoNotice").hidden = !photo; if (photo) $("photoPreview").src = photo; $("entryDialog").showModal(); updateCalculation();
}
function closeDialog() { $("entryDialog").close(); editingId = null; }
function selectedCountry() { return $("country").value === "__custom" ? $("countryCustom").value.trim() : $("country").value; }
function selectedCity() { return $("city").value === "__custom" ? $("cityCustom").value.trim() : $("city").value; }
function calculatedWeight() { return $("promoPack").checked ? number($("comboQty").value) * number($("comboUnitWeight").value) : number($("weight").value); }
function calculatedPackPrice() { return $("promoPack").checked ? number($("comboTotalPrice").value) : number($("packPrice").value); }
function updateCalculation() {
  const weight = calculatedWeight(), packPrice = calculatedPackPrice(), marketPrice = number($("priceKg").value) || (weight ? packPrice / weight : 0), fx = FX_TO_USD[$("currency").value] || 1, manual = number($("industryPrice").value), margin = number($("margin").value), industry = manual || marketPrice * (1 - margin / 100);
  $("priceKg").value = marketPrice ? marketPrice : ""; $("priceUsdKg").value = marketPrice ? (marketPrice / fx).toFixed(2) : ""; $("estimatedSale").textContent = industry ? money(industry, $("currency").value || "USD") : "—";
}
function recordFromForm() {
  const weight = calculatedWeight(), packPrice = calculatedPackPrice(), priceKg = number($("priceKg").value) || (weight ? packPrice / weight : 0), currency = $("currency").value, fx = FX_TO_USD[currency] || 1, manual = number($("industryPrice").value), margin = number($("margin").value);
  return { id: editingId || crypto.randomUUID(), date: $("date").value, manufacturer: $("manufacturer").value.trim(), collector: $("collector").value.trim(), channel: $("channel").value, city: selectedCity(), country: selectedCountry(), currency, store: $("store").value.trim(), protein: $("protein").value, temperature: $("temperature").value, product: $("product").value, subProduct: $("subProduct").value === "__custom" ? $("subProductCustom").value.trim() : $("subProduct").value, weight, packPrice, priceKg, priceUsdKg: priceKg / fx, margin, industryPrice: manual || priceKg * (1 - margin / 100), manualIndustryPrice: Boolean(manual), promotion: $("promotion").checked, fullPrice: $("promotion").checked ? number($("fullPrice").value) : "", promoPack: $("promoPack").checked, comboQty: $("promoPack").checked ? number($("comboQty").value) : "", comboUnitWeight: $("promoPack").checked ? number($("comboUnitWeight").value) : "", comboTotalPrice: $("promoPack").checked ? number($("comboTotalPrice").value) : "" };
}
function filteredRecords() { const from = $("filterFrom").value, to = $("filterTo").value; return records.filter(r => (!from || r.date >= from) && (!to || r.date <= to) && (!$("filterCountry").value || r.country === $("filterCountry").value) && (!$("filterStore").value || r.store === $("filterStore").value) && (!$("filterProtein").value || r.protein === $("filterProtein").value) && (!$("filterTemp").value || r.temperature === $("filterTemp").value) && (!$("filterProduct").value || r.product === $("filterProduct").value)); }
function refreshFilterOptions() { const fill = (id, values, label) => { const current = $(id).value; $(id).innerHTML = `<option value="">${label}</option>${[...new Set(values.filter(Boolean))].sort().map(v => `<option ${v === current ? "selected" : ""}>${escapeHtml(v)}</option>`).join("")}`; }; fill("filterCountry", records.map(r => r.country), "All countries"); fill("filterStore", records.map(r => r.store), "All retailers"); fill("filterProduct", Object.values(PRODUCTS).flat(), "All"); }
function renderMetrics(data) { const prices = data.map(r => number(r.priceKg)).filter(Boolean), avg = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0, max = prices.length ? Math.max(...prices) : 0; $("metrics").innerHTML = `<div class="metric"><small>Average price</small><strong>${money(avg, data[0]?.currency || "USD")}</strong><span>per filtered kg</span></div><div class="metric"><small>Maximum price</small><strong>${money(max, data[0]?.currency || "USD")}</strong><span>per filtered kg</span></div><div class="metric"><small>Temperature variation</small><strong>${money(temperatureVariation(data), data[0]?.currency || "USD")}</strong><span>lowest to highest per product</span></div><div class="metric"><small>Comparable groups</small><strong>${new Set(data.map(r => `${r.country}|${r.store}|${r.protein}|${r.product}`)).size}</strong><span>retailer, country and product</span></div>`; }
function temperatureVariation(data) { const groups = {}; data.forEach(r => { const key = `${r.country}|${r.protein}|${r.product}`; (groups[key] ||= {})[r.temperature] = number(r.priceKg); }); return Math.max(0, ...Object.values(groups).map(group => { const values = Object.values(group).filter(Boolean); return values.length > 1 ? Math.max(...values) - Math.min(...values) : 0; })); }
function render() { refreshFilterOptions(); populateRetailerSuggestions(); populateManufacturerSuggestions(); const data = filteredRecords(); $("recordCount").textContent = records.length; $("visibleCount").textContent = data.length; $("emptyState").style.display = data.length ? "none" : "block"; renderMetrics(data); $("priceTable").innerHTML = data.map(r => `<tr><td><input type="checkbox" class="row-check" data-id="${r.id}"></td><td>${r.date || "—"}</td><td><b>${escapeHtml(r.store)}</b><span class="subtle">${escapeHtml(r.manufacturer || "")} · ${escapeHtml(r.collector || "")} · ${escapeHtml(r.channel || "")}</span></td><td><span class="product-name">${escapeHtml(r.protein)}</span><span class="subtle">${escapeHtml(r.product)}${r.subProduct ? ` · ${escapeHtml(r.subProduct)}` : ""}${r.promotion ? " · Promotion" : ""}</span></td><td><span class="tag ${r.temperature === "Frozen" ? "cold" : ""}">${r.temperature}</span></td><td class="price">${money(r.priceKg, r.currency || "USD")}</td><td class="price teal-price">${money(r.priceUsdKg)}</td><td class="price teal-price">${money(r.industryPrice, r.currency || "USD")}</td><td><button class="row-action edit-row" data-id="${r.id}" title="Edit">✎</button></td></tr>`).join(""); renderInsights(data); if (!$("reportPage").hidden) renderReport(); $("deleteSelected").style.display = data.length ? "block" : "none"; }
function renderInsights(data) { const avg = data.length ? data.reduce((sum, r) => sum + number(r.priceKg), 0) / data.length : 0, below = data.filter(r => number(r.priceKg) < avg).slice(0, 5); $("insights").innerHTML = below.length ? below.map(r => `<div class="insight"><div><b>${escapeHtml(r.product)}</b><small>${escapeHtml(r.store)} · ${escapeHtml(r.country)}</small></div><strong>${money(r.priceKg, r.currency || "USD")}</strong></div>`).join("") : `<div class="empty-state"><span>Below-average prices will appear here.</span></div>`; }
function renderReport() {
  const data = filteredRecords();
  if (!data.length) {
    $("reportSummary").innerHTML = `<div class="report-stat"><small>Average price</small><strong>—</strong><span>No data</span></div><div class="report-stat"><small>Products</small><strong>0</strong><span>in view</span></div><div class="report-stat"><small>Countries</small><strong>0</strong><span>in view</span></div><div class="report-stat"><small>Price gap</small><strong>—</strong><span>No comparison</span></div>`;
    $("reportProductTemp").innerHTML = `<table class="report-table"><thead><tr><th>Product</th><th>Temp.</th><th>Avg</th><th>Spread</th></tr></thead><tbody><tr><td colspan="4">No rows available</td></tr></tbody></table>`;
    $("reportCountryCity").innerHTML = `<table class="report-table"><thead><tr><th>Country</th><th>City</th><th>Avg</th></tr></thead><tbody><tr><td colspan="3">No rows available</td></tr></tbody></table>`;
    $("reportManufacturers").innerHTML = `<table class="report-table"><thead><tr><th>Manufacturer</th><th>Avg</th><th>Products</th></tr></thead><tbody><tr><td colspan="3">No rows available</td></tr></tbody></table>`;
    return;
  }

  const avgPrice = data.reduce((sum, r) => sum + number(r.priceKg), 0) / data.length;
  const priceMax = Math.max(...data.map(r => number(r.priceKg)).filter(Boolean));
  const priceMin = Math.min(...data.map(r => number(r.priceKg)).filter(Boolean));
  const countries = new Set(data.map(r => r.country).filter(Boolean)).size;
  const products = new Set(data.map(r => r.product).filter(Boolean)).size;
  const productTempMap = {};
  data.forEach(r => {
    const key = `${r.product}|${r.temperature}`;
    if (!productTempMap[key]) productTempMap[key] = { product: r.product, temperature: r.temperature, prices: [] };
    productTempMap[key].prices.push(number(r.priceKg));
  });
  const productTempRows = Object.values(productTempMap).map(item => {
    const values = item.prices.filter(Boolean);
    const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
    const spread = values.length > 1 ? Math.max(...values) - Math.min(...values) : 0;
    return { ...item, avg, spread };
  }).sort((a, b) => b.avg - a.avg).slice(0, 8);

  const geographyMap = {};
  data.forEach(r => {
    const key = `${r.country}|${r.city}`;
    if (!geographyMap[key]) geographyMap[key] = { country: r.country, city: r.city || "Unknown", prices: [] };
    geographyMap[key].prices.push(number(r.priceKg));
  });
  const geographyRows = Object.values(geographyMap).map(item => {
    const values = item.prices.filter(Boolean);
    const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
    return { ...item, avg };
  }).sort((a, b) => b.avg - a.avg).slice(0, 8);

  const manufacturerMap = {};
  data.forEach(r => {
    const key = r.manufacturer || "Unknown";
    if (!manufacturerMap[key]) manufacturerMap[key] = { manufacturer: key, prices: [], products: new Set() };
    manufacturerMap[key].prices.push(number(r.priceKg));
    if (r.product) manufacturerMap[key].products.add(r.product);
  });
  const manufacturerRows = Object.values(manufacturerMap).map(item => {
    const values = item.prices.filter(Boolean);
    const avg = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
    return { manufacturer: item.manufacturer, avg, products: item.products.size };
  }).sort((a, b) => b.avg - a.avg).slice(0, 8);

  const maxGeoAvg = geographyRows.length ? Math.max(...geographyRows.map(row => row.avg)) : 1;
  $("reportSummary").innerHTML = `<div class="report-stat"><small>Average price</small><strong>${money(avgPrice, data[0]?.currency || "USD")}</strong><span>per filtered kg</span></div><div class="report-stat"><small>Products</small><strong>${products}</strong><span>active lines</span></div><div class="report-stat"><small>Countries</small><strong>${countries}</strong><span>in this view</span></div><div class="report-stat"><small>Price gap</small><strong>${money(priceMax - priceMin, data[0]?.currency || "USD")}</strong><span>max vs min</span></div>`;
  $("reportProductTemp").innerHTML = `<table class="report-table"><thead><tr><th>Product</th><th>Temp.</th><th>Avg</th><th>Spread</th></tr></thead><tbody>${productTempRows.map(row => `<tr><td>${escapeHtml(row.product)}</td><td>${escapeHtml(row.temperature)}</td><td>${money(row.avg, data[0]?.currency || "USD")}</td><td>${money(row.spread, data[0]?.currency || "USD")}</td></tr>`).join("") || `<tr><td colspan="4">No rows available</td></tr>`}</tbody></table>`;
  $("reportCountryCity").innerHTML = `<table class="report-table"><thead><tr><th>Country</th><th>City</th><th>Avg</th><th>Trend</th></tr></thead><tbody>${geographyRows.map(row => `<tr><td>${escapeHtml(row.country)}</td><td>${escapeHtml(row.city)}</td><td>${money(row.avg, data[0]?.currency || "USD")}</td><td><div class="report-bar"><span style="width:${Math.min(100, (row.avg / maxGeoAvg) * 100)}%"></span></div></td></tr>`).join("") || `<tr><td colspan="4">No rows available</td></tr>`}</tbody></table>`;
  $("reportManufacturers").innerHTML = `<table class="report-table"><thead><tr><th>Manufacturer</th><th>Avg</th><th>Products</th></tr></thead><tbody>${manufacturerRows.map(row => `<tr><td>${escapeHtml(row.manufacturer)}</td><td>${money(row.avg, data[0]?.currency || "USD")}</td><td>${row.products}</td></tr>`).join("") || `<tr><td colspan="3">No rows available</td></tr>`}</tbody></table>`;
}
function csvCell(value) { return `"${String(value ?? "").replace(/"/g, '""')}"`; }
function exportCsv() { const headers = ["id", "date", "manufacturer", "collector", "channel", "city", "country", "currency", "retailer", "protein", "temperature", "product", "sub_product", "package_weight_kg", "package_price", "price_kg_rsp_label", "price_usd_kg", "retailer_margin_pct", "industry_price", "manual_industry_price", "promotion", "full_price", "promo_pack", "combo_quantity", "combo_unit_weight_kg", "combo_total_price"]; const rows = records.map(r => [r.id, r.date, r.manufacturer, r.collector, r.channel, r.city, r.country, r.currency, r.store, r.protein, r.temperature, r.product, r.subProduct, r.weight, r.packPrice, r.priceKg, r.priceUsdKg, r.margin, r.industryPrice, r.manualIndustryPrice, r.promotion, r.fullPrice, r.promoPack, r.comboQty, r.comboUnitWeight, r.comboTotalPrice]); const blob = new Blob(["\ufeff" + [headers, ...rows].map(row => row.map(csvCell).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" }), a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `pricescope-${today()}.csv`; a.click(); URL.revokeObjectURL(a.href); showToast("File exported for Excel."); }
function parseCsv(text) { const lines = text.replace(/^\ufeff/, "").split(/\r?\n/).filter(Boolean), split = line => line.match(/(?:^|;)("(?:[^"]|"")*"|[^;]*)/g)?.map(v => v.replace(/^;/, "").replace(/^"|"$/g, "").replace(/""/g, '"')) || [], headers = split(lines.shift()).map(h => h.toLowerCase()); return lines.map(line => { const values = split(line), get = key => values[headers.indexOf(key)] || "", currency = get("currency") || CURRENCIES[get("country")] || "USD", priceKg = number(get("price_kg_rsp_label")); return { id: get("id") || crypto.randomUUID(), date: get("date"), manufacturer: get("manufacturer"), collector: get("collector"), channel: get("channel"), city: get("city"), country: get("country"), currency, store: get("retailer"), protein: get("protein"), temperature: get("temperature"), product: get("product"), subProduct: get("sub_product"), weight: number(get("package_weight_kg")), packPrice: number(get("package_price")), priceKg, priceUsdKg: number(get("price_usd_kg")) || priceKg / (FX_TO_USD[currency] || 1), margin: number(get("retailer_margin_pct")), industryPrice: number(get("industry_price")), manualIndustryPrice: get("manual_industry_price") === "true", promotion: get("promotion") === "true", fullPrice: number(get("full_price")), promoPack: get("promo_pack") === "true", comboQty: number(get("combo_quantity")), comboUnitWeight: number(get("combo_unit_weight_kg")), comboTotalPrice: number(get("combo_total_price")) }; }); }
function normalizeSpeechToken(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/\s+/g, "");
}
function stripSpeechNoise(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/^(?:is|equals|equal|named|called|the)\s+/i, "")
    .replace(/\s+(?:is|equals|equal|named|called|the)$/i, "")
    .trim();
}
function valueBeforeKeyword(text, afterKeywords, stopKeywords = []) {
  const clean = cleanVoiceText(text);
  const after = afterKeywords.map(item => item.toLowerCase());
  const stop = stopKeywords.map(item => item.toLowerCase());
  for (const keyword of after) {
    const index = clean.toLowerCase().indexOf(keyword);
    if (index >= 0) {
      const start = index + keyword.length;
      const tail = clean.slice(start);
      const stopIndex = stop.reduce((best, word) => {
        const found = tail.toLowerCase().indexOf(word);
        return found >= 0 ? (best === -1 ? found : Math.min(best, found)) : best;
      }, -1);
      const segment = stopIndex >= 0 ? tail.slice(0, stopIndex) : tail;
      const match = segment.match(/([A-Za-z0-9][A-Za-z0-9 .&/()-]{0,40})/);
      if (match) return stripSpeechNoise(match[1]);
    }
  }
  return "";
}
function cleanVoiceText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .replace(/\b(?:retailer|store|supermarket|market|shop)\s+(?:is|equals|equal|named|called)?\s*/gi, "retailer ")
    .replace(/\b(?:country|nation|location|state)\s+(?:is|equals|equal|named|called)?\s*/gi, "country ")
    .replace(/\b(?:city|town|area)\s+(?:is|equals|equal|named|called)?\s*/gi, "city ")
    .replace(/\b(?:collector|collected by|recorded by)\s+(?:is|equals|equal|named|called)?\s*/gi, "collector ")
    .replace(/\b(?:manufacturer|brand|producer|company)\s+(?:is|equals|equal|named|called)?\s*/gi, "manufacturer ")
    .replace(/\b(?:price|cost|pack price|rsp)\s+(?:is|equals|equal|named|called)?\s*/gi, "price ")
    .replace(/\b(?:o man|oh man|omman|omani|oman)\b/gi, "Oman")
    .trim();
}
function fieldValue(text, names) {
  const clean = cleanVoiceText(text);
  for (const name of names) {
    const safeName = name.replace(/\s+/g, "\\s+");
    const patterns = [
      new RegExp(`(?:^|[\\s;,:-])(?:${safeName})\\s*(?:is|=|:|-)?\\s*([^,;.\\n]+)`, "i"),
      new RegExp(`(?:${safeName})\\s+(?:is|=|:|-)?\\s*([^,;.\\n]+)`, "i"),
      new RegExp(`(?:^|[\\s;,:-])([^,;.\\n]+?)\\s*(?:is|=|:|-)?\\s*(?:${safeName})`, "i")
    ];
    for (const regex of patterns) {
      const match = clean.match(regex);
      if (match) {
        const candidate = (match[1] || match[0]).trim().replace(/[.]+$/, "");
        const value = stripSpeechNoise(candidate);
        if (value && !/^\s*(?:is|equals|equal|called|named)\s*$/i.test(value)) return value;
      }
    }
  }
  return "";
}
function detectManufacturer(text) {
  const normalized = normalizeSpeechToken(cleanVoiceText(text));
  const match = GCC_MANUFACTURERS.find(brand => normalized.includes(normalizeSpeechToken(brand)));
  return match || "";
}
function detectCurrency(text) {
  const normalized = normalizeSpeechToken(cleanVoiceText(text));
  for (const [currency, aliases] of Object.entries(VOICE_CURRENCY_ALIASES)) {
    if (aliases.some(alias => normalized.includes(normalizeSpeechToken(alias)))) return currency;
  }
  return Object.keys(FX_TO_USD).find(item => new RegExp(`${String.raw`\b`}${item}${String.raw`\b`}`, "i").test(cleanVoiceText(text))) || "";
}
function detectCountry(text) {
  const normalized = normalizeSpeechToken(cleanVoiceText(text));
  for (const [country, aliases] of Object.entries(VOICE_COUNTRY_ALIASES)) {
    if (aliases.some(alias => normalized.includes(normalizeSpeechToken(alias)))) return country;
  }
  return COUNTRIES.find(item => normalized.includes(normalizeSpeechToken(item))) || "";
}
function detectCity(text, country) {
  const normalized = normalizeSpeechToken(cleanVoiceText(text));
  const known = Object.values(CITIES).flat();
  const direct = known.find(item => normalized.includes(normalizeSpeechToken(item)));
  if (direct) return direct;
  const explicit = fieldValue(text, ["city", "town", "location", "area"]) || "";
  if (explicit) return explicit;
  if (country) {
    const knownForCountry = CITIES[country] || [];
    return knownForCountry.find(item => normalized.includes(normalizeSpeechToken(item))) || "";
  }
  return "";
}
function applyTranscript(text) {
  const cleaned = cleanVoiceText(text);
  const lower = cleaned.toLowerCase();
  const country = detectCountry(cleaned) || fieldValue(cleaned, ["country", "nation", "state"]) || "";
  if (country) { $("country").value = country; populateCountryFields(country); }
  const city = detectCity(cleaned, country) || fieldValue(cleaned, ["city", "town", "location", "area"]) || "";
  if (city) { const knownCity = CITIES[country]?.includes(city); $("city").value = knownCity ? city : "__custom"; $("cityCustom").value = knownCity ? "" : city; $("cityCustom").hidden = knownCity; $("cityCustom").required = !knownCity; }
  const manufacturer = detectManufacturer(cleaned) || fieldValue(cleaned, ["manufacturer", "brand", "producer", "company"]) || valueBeforeKeyword(cleaned, ["manufacturer", "brand", "producer", "company"], ["collector", "country", "city", "retailer", "price", "weight"]);
  if (manufacturer) $("manufacturer").value = manufacturer;
  const collector = fieldValue(cleaned, ["collector", "collected by", "recorded by"]) || valueBeforeKeyword(cleaned, ["collector", "collected by", "recorded by"], ["country", "city", "retailer", "price", "weight"]);
  if (collector) $("collector").value = collector;
  const retailer = fieldValue(cleaned, ["retailer", "store", "supermarket", "market", "shop"]) || valueBeforeKeyword(cleaned, ["retailer", "store", "supermarket", "market", "shop"], ["country", "city", "manufacturer", "collector", "price", "weight"]);
  if (retailer) $("store").value = retailer;
  const channel = ["Modern Trade", "Traditional Trade", "Food Service", "Wholesaler"].find(item => lower.includes(item.toLowerCase())); if (channel) $("channel").value = channel;
  const protein = ["Chicken", "Beef", "Lamb", "Goat"].find(item => lower.includes(item.toLowerCase())); if (protein) { $("protein").value = protein; populateProducts(); }
  const product = Object.values(PRODUCTS).flat().find(item => lower.includes(item.toLowerCase())); if (product) { $("product").value = product; populateSubProducts(); }
  const temperature = lower.includes("frozen") ? "Frozen" : lower.includes("chilled") ? "Chilled" : ""; if (temperature) $("temperature").value = temperature;
  const currency = detectCurrency(cleaned) || Object.keys(FX_TO_USD).find(item => new RegExp(`${String.raw`\b`}${item}${String.raw`\b`}`, "i").test(cleaned)) || "";
  if (currency) $("currency").value = currency;
  const nums = [...cleaned.matchAll(/(\d+(?:[,.]\d+)?)/g)].map(match => Number(match[1].replace(",", "."))); if (nums.length >= 2) { $("weight").value = nums[0]; $("packPrice").value = nums[1]; } else if (nums.length === 1) $("packPrice").value = nums[0];
