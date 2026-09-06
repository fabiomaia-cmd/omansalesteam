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
const CITIES = { Oman: ["Muscat", "Salalah", "Sohar", "Ibri", "Nizwa", "Dhank", "Barka", "Seeb", "Sur", "Rustaq", "Samail"], UAE: ["Dubai", "Sharjah", "Abu Dhabi", "Al Ain", "Fujairah", "Ajman", "Ras Al Khaimah", "Umm Al Quwain"], Qatar: ["Doha", "Al Wakrah", "Mesaieed", "Rayyan"], KSA: ["Riyadh", "Jeddah", "Dammam", "Khobar", "Makkah", "Madinah"], Bahrain: ["Manama", "Muharraq", "Riffa"], Kuwait: ["Kuwait City", "Ahmadi", "Salmiya", "Fahaheel"], Iraq: ["Baghdad", "Basra", "Najaf", "Erbil"], Yemen: ["Sanaa", "Aden", "Taiz"] };
const GCC_MANUFACTURERS = ["Seara", "Sadia", "ASaffa", "A Saffa", "Almarai", "Dhofar", "Tanmia", "Alwatania", "Nadec", "Atyab", "Al Kabeer", "Al Qudra", "Meyah", "Al Rafi", "Al Safa", "Mabani", "AlJazeera", "Alyawer", "Al Bawadi", "Al Ain Farms", "Al Rawdah", "Sewan", "Bahar", "Bakem", "Bazan", "Aseel", "Al Nasser", "Al Safi", "Maqsood", "Nabil", "Musaed", "Gulf Meat", "Dammam Poultry", "Sama", "Khalis" ];
const GCC_RETAILERS = ["Lulu", "Carrefour", "Nesto", "Spinneys", "Geant", "AlMeera", "Al Meera", "Safeer", "Danube", "Sharaf DG", "Grand Stores", "Oasis", "Maqsad", "Qmart", "ABM", "Aman", "Aswaq", "Spar", "Farm Fresh", "Bawadi", "Gulf Mart", "Al Jazeera", "Maf Carrefour", "Lulu Hypermarket"];
const VOICE_COUNTRY_ALIASES = { Oman: ["oman", "o man", "oh man", "omman", "omani", "muscat", "salalah", "sohar", "ibri", "nizwa"], UAE: ["uae", "u a e", "united arab emirates", "emirates", "dubai", "abu dhabi", "abudhabi", "sharjah", "al ain", "fujairah", "ajman", "ras al khaimah"], KSA: ["ksa", "saudi arabia", "saudi", "riyadh", "jeddah", "dammam", "khobar"], Qatar: ["qatar", "catar", "doha", "al wakrah"], Bahrain: ["bahrain", "bahrein", "manama", "muharraq"], Kuwait: ["kuwait", "kwait", "kuwait city", "salmiya", "fahaheel"], Iraq: ["iraq", "iraq country", "baghdad", "basra", "erbil"], Yemen: ["yemen", "yaman", "sanaa", "aden", "taiz"] };
const VOICE_CITY_ALIASES = {
  Muscat: ["muscat", "muscat city"],
  Salalah: ["salalah"],
  Sohar: ["sohar"],
  Ibri: ["ibri"],
  Nizwa: ["nizwa"],
  Dhank: ["dhank", "dank"],
  Barka: ["barka"],
  Seeb: ["seeb"],
  Sur: ["sur"],
  Rustaq: ["rustaq"],
  Samail: ["samail"],
  Dubai: ["dubai"],
  Sharjah: ["sharjah"],
  "Abu Dhabi": ["abu dhabi", "abudhabi"],
  "Al Ain": ["al ain"],
  Fujairah: ["fujairah"],
  Ajman: ["ajman"],
  "Ras Al Khaimah": ["ras al khaimah", "rasalkhaimah"],
  "Umm Al Quwain": ["umm al quwain", "ummalquwain"],
  Doha: ["doha"],
  "Al Wakrah": ["al wakrah"],
  Mesaieed: ["mesaieed"],
  Rayyan: ["rayyan"],
  Riyadh: ["riyadh"],
  Jeddah: ["jeddah"],
  Dammam: ["dammam"],
  Khobar: ["khobar"],
  Makkah: ["makkah"],
  Madinah: ["madinah"],
  Manama: ["manama"],
  Muharraq: ["muharraq"],
  Riffa: ["riffa"],
  "Kuwait City": ["kuwait city", "kwait city"],
  Ahmadi: ["ahmadi"],
  Salmiya: ["salmiya"],
  Fahaheel: ["fahaheel"],
  Baghdad: ["baghdad"],
  Basra: ["basra"],
  Najaf: ["najaf"],
  Erbil: ["erbil"],
  Sanaa: ["sanaa"],
  Aden: ["aden"],
  Taiz: ["taiz"]
};
const VOICE_CURRENCY_ALIASES = { AED: ["aed", "dirham", "dirhams", "dihram", "dihrans", "dhs", "dhs"], OMR: ["omr", "rial", "riyals"], SAR: ["sar", "saudi riyal", "riyal"], QAR: ["qar", "qatari riyal"], BHD: ["bhd", "bahraini dinar"], KWD: ["kwd", "kuwaiti dinar"], IQD: ["iqd", "iraqi dinar"], YER: ["yer", "yemeni riyal"] };
const VOICE_RETAILER_ALIASES = {
  Lulu: ["lulu", "lulu hypermarket", "lulu supermarket", "lulu market"],
  Carrefour: ["carrefour", "carfour"],
  Nesto: ["nesto"],
  Spinneys: ["spinneys"],
  Geant: ["geant"],
  "AlMeera": ["almeera", "al meera", "al-meera"],
  Safeer: ["safeer"],
  Danube: ["danube"],
  "Sharaf DG": ["sharaf dg", "sharafdg", "sharaf"],
  "Grand Stores": ["grand stores", "grandstore"],
  Oasis: ["oasis"],
  "Farm Fresh": ["farm fresh", "farmfresh"],
  "Gulf Mart": ["gulf mart", "gulfmart"],
  "Spar": ["spar"],
  "Bawadi": ["bawadi"]
};
const CURRENCIES = { UAE: "AED", Oman: "OMR", KSA: "SAR", Qatar: "QAR", Bahrain: "BHD", Kuwait: "KWD", Iraq: "IQD", Yemen: "YER" };
const FX_TO_USD = { USD: 1, AED: 3.6725, OMR: 0.3845, SAR: 3.75, QAR: 3.64, BHD: 0.376, KWD: 0.306, IQD: 1310, YER: 250 };
const COLLECTOR_KEY = "pricescope-last-collector";
const SUPABASE_URL = "https://lleckfusapsrkdcgvfhp.supabase.co";
const SUPABASE_KEY = "sb_publishable_PqYYW2XPI_qAANQm_jZ9fQ_Nzl3dLEp";
const SUPABASE_TABLE = "collections";
const LEGACY = { Frango: "Chicken", Bovino: "Beef", Carneiro: "Lamb", Congelado: "Frozen", Resfriado: "Chilled", "Bahrein": "Bahrain", Kwait: "Kuwait", Iemen: "Yemen", "Inteiro": "Whole", "Cortes": "Cuts", "Cortes com osso": "Cuts with bone", Desossado: "Boneless cuts", "Vácuo": "Vaccum", "Cubos e cortes": "Cubes and cuts", "Hambúrguer": "Hamburger", Moída: "Minced beef", "Carne com osso": "Bone in beef" };
const supabaseClient = window.supabase && window.supabase.createClient ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;
let records = [];
let editingId = null, recognition = null;
const $ = id => document.getElementById(id);
const number = value => Number(value) || 0;
const today = () => new Date().toISOString().slice(0, 10);
const money = (value, currency = "USD") => value === "" || value == null || Number.isNaN(Number(value)) ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Number(value));
const escapeHtml = value => String(value == null ? "" : value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
function normalizeRecord(record) { return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, typeof value === "string" && LEGACY[value] ? LEGACY[value] : value])); }
function nullableNumber(value) { return value === "" || value == null || value === undefined ? null : Number(value); }
function toDbRecord(record) {
  return {
    id: record.id, date: record.date, manufacturer: record.manufacturer, collector: record.collector,
    channel: record.channel, city: record.city, country: record.country, currency: record.currency,
    retailer: record.store, protein: record.protein, temperature: record.temperature, product: record.product,
    sub_product: record.subProduct || null, package_weight_kg: nullableNumber(record.weight), package_price: nullableNumber(record.packPrice),
    price_kg: nullableNumber(record.priceKg), price_usd_kg: nullableNumber(record.priceUsdKg), margin_pct: nullableNumber(record.margin),
    industry_price: nullableNumber(record.industryPrice) == null ? null : nullableNumber(record.industryPrice) * (FX_TO_USD[record.currency] || 1), manual_industry_price: Boolean(record.manualIndustryPrice),
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
    industryPrice: Number(record.industry_price) / (FX_TO_USD[record.currency] || 1), manualIndustryPrice: record.manual_industry_price,
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
function populateSubProducts(selected = "") { const protein = $("protein").value, product = $("product").value, productOptions = SUBPRODUCTS[product] || {}, options = productOptions[protein] || [], isCustom = selected && !options.includes(selected); $("subProduct").innerHTML = `<option value="">Not applicable</option>${options.map(item => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("")}<option value="__custom" ${isCustom ? "selected" : ""}>Other...</option>`; $("subProductCustom").value = isCustom ? selected : ""; toggleSubProductCustom(); }
function toggleSubProductCustom() { const custom = $("subProduct").value === "__custom"; $("subProductCustom").hidden = !custom; $("subProductCustom").required = custom; }
function populateCountryFields(country = $("country").value, city = "") {
  $("countryCustom").hidden = country !== "__custom"; $("countryCustom").required = country === "__custom";
  const cities = CITIES[country] || []; $("city").innerHTML = `<option value="">${cities.length ? "Select" : "Enter if needed"}</option>${cities.map(item => `<option ${item === city ? "selected" : ""}>${item}</option>`).join("")}<option value="__custom">Other city...</option>`;
  const custom = Boolean(city && !cities.includes(city)); $("city").value = custom ? "__custom" : $("city").value; $("cityCustom").hidden = !custom && $("city").value !== "__custom"; $("cityCustom").required = custom || $("city").value === "__custom"; if (custom) $("cityCustom").value = city;
  if (CURRENCIES[country]) $("currency").value = CURRENCIES[country];
}
function toggleConditionalFields() { $("fullPriceField").hidden = !$("promotion").checked; const hidden = !$("promoPack").checked; ["comboQtyField", "comboWeightField"].forEach(id => $(id).hidden = hidden); $("comboPriceField").hidden = true; updateCalculation(); }
function openDialog(record = null, photo = null, transcript = "") {
  editingId = record && record.id ? record.id : null; $("entryForm").reset(); configureFormLabels(); $("date").value = record && record.date ? record.date : today(); $("collector").value = record && record.collector ? record.collector : localStorage.getItem(COLLECTOR_KEY) || ""; $("dialogEyebrow").textContent = editingId ? "EDIT COLLECTION" : "NEW COLLECTION"; $("dialogTitle").textContent = editingId ? "Edit price" : "Add price";
  if (record) {
    $("country").value = COUNTRIES.includes(record.country) ? record.country : "__custom"; $("countryCustom").value = COUNTRIES.includes(record.country) ? "" : record.country; populateCountryFields($("country").value, record.city);
    for (const key of ["manufacturer", "collector", "channel", "store", "protein", "temperature", "weight", "packPrice", "margin", "industryPrice", "currency", "fullPrice", "comboQty", "comboUnitWeight", "comboTotalPrice"]) if ($(key)) $(key).value = record[key] == null ? "" : record[key];
    if (record.city && !(CITIES[record.country] || []).includes(record.city)) { $("city").value = "__custom"; $("cityCustom").value = record.city; $("cityCustom").hidden = false; }
    $("promotion").checked = Boolean(record.promotion); $("promoPack").checked = Boolean(record.promoPack); $("protein").value = record.protein; populateProducts(record.product); populateSubProducts(record.subProduct);
  } else { $("margin").value = 20; populateProducts(); $("audioNotice").hidden = !transcript; $("transcriptText").textContent = transcript; }
  toggleConditionalFields(); $("photoNotice").hidden = !photo; if (photo) $("photoPreview").src = photo; $("entryDialog").showModal(); updateCalculation();
}
function closeDialog() { $("entryDialog").close(); editingId = null; }
function selectedCountry() { return $("country").value === "__custom" ? $("countryCustom").value.trim() : $("country").value; }
function selectedCity() { return $("city").value === "__custom" ? $("cityCustom").value.trim() : $("city").value; }
function calculatedWeight() { return $("promoPack").checked ? number($("comboQty").value) * number($("comboUnitWeight").value) : number($("weight").value); }
function calculatedPackPrice() { return number($("packPrice").value); }
function updateCalculation() {
  const weight = calculatedWeight(), packPrice = calculatedPackPrice(), marketPrice = weight && packPrice ? packPrice / weight : 0, fx = FX_TO_USD[$("currency").value] || 1, marketPriceUsd = marketPrice / fx, manual = number($("industryPrice").value), margin = number($("margin").value), industryUsd = manual || marketPriceUsd * (1 - margin / 100);
  $("priceKg").value = marketPrice ? marketPrice : ""; $("priceUsdKg").value = marketPrice ? marketPriceUsd.toFixed(2) : ""; $("estimatedSale").textContent = industryUsd ? money(industryUsd, "USD") : "—";
}
function recordFromForm() {
  const weight = calculatedWeight(), packPrice = calculatedPackPrice(), priceKg = weight && packPrice ? packPrice / weight : 0, currency = $("currency").value, fx = FX_TO_USD[currency] || 1, priceUsdKg = priceKg / fx, manual = number($("industryPrice").value), margin = number($("margin").value);
  return { id: editingId || crypto.randomUUID(), date: $("date").value, manufacturer: $("manufacturer").value.trim(), collector: $("collector").value.trim(), channel: $("channel").value, city: selectedCity(), country: selectedCountry(), currency, store: $("store").value.trim(), protein: $("protein").value, temperature: $("temperature").value, product: $("product").value, subProduct: $("subProduct").value === "__custom" ? $("subProductCustom").value.trim() : $("subProduct").value, weight, packPrice, priceKg, priceUsdKg, margin, industryPrice: manual || priceUsdKg * (1 - margin / 100), manualIndustryPrice: Boolean(manual), promotion: $("promotion").checked, fullPrice: $("promotion").checked ? number($("fullPrice").value) : "", promoPack: $("promoPack").checked, comboQty: $("promoPack").checked ? number($("comboQty").value) : "", comboUnitWeight: $("promoPack").checked ? number($("comboUnitWeight").value) : "", comboTotalPrice: $("promoPack").checked ? packPrice : "" };
}
function filteredRecords() { const from = $("filterFrom").value, to = $("filterTo").value, promotion = $("filterPromotion").value; return records.filter(r => (!from || r.date >= from) && (!to || r.date <= to) && (!$("filterCountry").value || r.country === $("filterCountry").value) && (!$("filterStore").value || r.store === $("filterStore").value) && (!$("filterProtein").value || r.protein === $("filterProtein").value) && (!$("filterTemp").value || r.temperature === $("filterTemp").value) && (!$("filterProduct").value || r.product === $("filterProduct").value) && (promotion === "" || (promotion === "with" ? Boolean(r.promotion) : !r.promotion))); }
function refreshFilterOptions() { const fill = (id, values, label) => { const current = $(id).value; $(id).innerHTML = `<option value="">${label}</option>${[...new Set(values.filter(Boolean))].sort().map(v => `<option ${v === current ? "selected" : ""}>${escapeHtml(v)}</option>`).join("")}`; }; fill("filterCountry", records.map(r => r.country), "All countries"); fill("filterStore", records.map(r => r.store), "All retailers"); fill("filterProduct", Object.values(PRODUCTS).flat(), "All"); }
function renderMetrics(data) { const prices = data.map(r => number(r.priceKg)).filter(Boolean), avg = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0, max = prices.length ? Math.max(...prices) : 0, promoItems = data.filter(r => r.promotion), promoAvg = promoItems.length ? promoItems.reduce((sum, r) => sum + number(r.priceKg), 0) / promoItems.length : 0, regularItems = data.filter(r => !r.promotion), regularAvg = regularItems.length ? regularItems.reduce((sum, r) => sum + number(r.priceKg), 0) / regularItems.length : 0, currency = data[0] && data[0].currency ? data[0].currency : "USD"; $("metrics").innerHTML = `<div class="metric"><small>Average price</small><strong>${money(avg, currency)}</strong><span>per filtered kg</span></div><div class="metric"><small>Maximum price</small><strong>${money(max, currency)}</strong><span>per filtered kg</span></div><div class="metric"><small>Temperature variation</small><strong>${money(temperatureVariation(data), currency)}</strong><span>lowest to highest per product</span></div><div class="metric"><small>Comparable groups</small><strong>${new Set(data.map(r => `${r.country}|${r.store}|${r.protein}|${r.product}`)).size}</strong><span>retailer, country and product</span></div><div class="metric"><small>Promo share</small><strong>${promoItems.length ? `${((promoItems.length / data.length) * 100).toFixed(0)}%` : "0%"}</strong><span>${promoItems.length} active promos</span></div><div class="metric"><small>Promo discount</small><strong>${money(Math.max(0, regularAvg - promoAvg), currency)}</strong><span>avg promo vs normal</span></div>`; }
function temperatureVariation(data) { const groups = {}; data.forEach(r => { const key = `${r.country}|${r.protein}|${r.product}`; if (!groups[key]) groups[key] = {}; groups[key][r.temperature] = number(r.priceKg); }); return Math.max(0, ...Object.values(groups).map(group => { const values = Object.values(group).filter(Boolean); return values.length > 1 ? Math.max(...values) - Math.min(...values) : 0; })); }
function render() { refreshFilterOptions(); populateRetailerSuggestions(); populateManufacturerSuggestions(); const data = filteredRecords(); $("recordCount").textContent = records.length; $("visibleCount").textContent = data.length; $("emptyState").style.display = data.length ? "none" : "block"; renderMetrics(data); $("priceTable").innerHTML = data.map(r => `<tr><td><input type="checkbox" class="row-check" data-id="${r.id}"></td><td>${r.date || "—"}</td><td><b>${escapeHtml(r.store)}</b><span class="subtle">${escapeHtml(r.manufacturer || "")} · ${escapeHtml(r.collector || "")} · ${escapeHtml(r.channel || "")}</span></td><td><span class="product-name">${escapeHtml(r.protein)}</span><span class="subtle">${escapeHtml(r.product)}${r.subProduct ? ` · ${escapeHtml(r.subProduct)}` : ""}${r.promotion ? " · Promotion" : ""}</span></td><td><span class="tag ${r.temperature === "Frozen" ? "cold" : ""}">${r.temperature}</span></td><td class="price">${money(r.priceKg, r.currency || "USD")}</td><td class="price teal-price">${money(r.priceUsdKg)}</td><td class="price teal-price">${money(r.industryPrice, "USD")}</td><td><button class="row-action edit-row" data-id="${r.id}" title="Edit">✎</button></td></tr>`).join(""); renderInsights(data); renderPromoInsights(data); if (!$("reportPage").hidden) renderReport(); $("deleteSelected").style.display = data.length ? "block" : "none"; }
function renderInsights(data) { const avg = data.length ? data.reduce((sum, r) => sum + number(r.priceKg), 0) / data.length : 0, below = data.filter(r => number(r.priceKg) < avg).slice(0, 5); $("insights").innerHTML = below.length ? below.map(r => `<div class="insight"><div><b>${escapeHtml(r.product)}</b><small>${escapeHtml(r.store)} · ${escapeHtml(r.country)}</small></div><strong>${money(r.priceKg, r.currency || "USD")}</strong></div>`).join("") : `<div class="empty-state"><span>Below-average prices will appear here.</span></div>`; }
function renderPromoInsights(data) { const promoItems = data.filter(r => r.promotion), regularItems = data.filter(r => !r.promotion); if (!data.length) { $("promoInsights").innerHTML = `<div class="promo-card"><strong>No activity</strong><span>Use the filters or add a promotion to compare.</span></div>`; return; } if (!promoItems.length) { $("promoInsights").innerHTML = `<div class="promo-card"><strong>No active promos</strong><span>Currently no promotional items are in the filtered view.</span></div>`; return; } const currency = (data[0] && data[0].currency) || "USD"; const avgPromo = promoItems.reduce((sum, r) => sum + number(r.priceKg), 0) / promoItems.length; const avgRegular = regularItems.length ? regularItems.reduce((sum, r) => sum + number(r.priceKg), 0) / regularItems.length : avgPromo; const discount = Math.max(0, avgRegular - avgPromo); const bestProduct = [...promoItems].sort((a, b) => (number(b.priceUsdKg) - number(b.industryPrice)) - (number(a.priceUsdKg) - number(a.industryPrice))).slice(0, 1)[0]; const retailerMap = {}; promoItems.forEach(r => { const key = r.store || "Unknown"; if (!retailerMap[key]) retailerMap[key] = { retailer: key, promoCount: 0, avgPromo: 0, avgRegular: 0, promoTotal: 0, regularTotal: 0 }; retailerMap[key].promoCount++; retailerMap[key].promoTotal += number(r.priceKg); const sameProductRegular = data.filter(item => !item.promotion && item.store === r.store && item.product === r.product && item.temperature === r.temperature); if (sameProductRegular.length) retailerMap[key].regularTotal += sameProductRegular.reduce((sum, item) => sum + number(item.priceKg), 0); }); const retailerRows = Object.values(retailerMap).map(item => { const avgPromoByRetailer = item.promoTotal / item.promoCount; const avgRegularByRetailer = item.regularTotal ? (item.regularTotal / Math.max(1, item.promoCount)) : avgPromoByRetailer; const gap = Math.max(0, avgRegularByRetailer - avgPromoByRetailer); return { retailer: item.retailer, avgPromoByRetailer, avgRegularByRetailer, gap }; }).sort((a, b) => b.gap - a.gap).slice(0, 3); const productMap = {}; data.forEach(r => { const key = `${r.product}|${r.temperature}`; if (!productMap[key]) productMap[key] = { product: r.product, temperature: r.temperature, promo: [], regular: [] }; if (r.promotion) productMap[key].promo.push(number(r.priceKg)); else productMap[key].regular.push(number(r.priceKg)); }); const productRows = Object.values(productMap).filter(item => item.promo.length && item.regular.length).map(item => { const promoAvg = item.promo.reduce((sum, value) => sum + value, 0) / item.promo.length; const regularAvg = item.regular.reduce((sum, value) => sum + value, 0) / item.regular.length; return { ...item, promoAvg, regularAvg, gap: regularAvg - promoAvg }; }).sort((a, b) => b.gap - a.gap).slice(0, 3); $("promoInsights").innerHTML = `<div class="promo-grid"><div class="promo-card"><strong>${promoItems.length}</strong><span>active promos</span></div><div class="promo-card"><strong>${money(discount, currency)}</strong><span>avg discount</span></div><div class="promo-card full"><strong>${bestProduct ? escapeHtml(bestProduct.product) : "—"}</strong><span>${bestProduct ? `${money(bestProduct.priceKg, bestProduct.currency || "USD")} promo price` : "No product"}</span></div></div><div class="promo-note">Promo basket vs. regular basket: ${money(avgPromo, currency)} vs ${money(avgRegular, currency)}.</div><div class="promo-table-box"><h4>Retailer opportunity</h4><table class="promo-table"><thead><tr><th>Retailer</th><th>Promo</th><th>Regular</th><th>Gap</th></tr></thead><tbody>${retailerRows.map(row => `<tr><td>${escapeHtml(row.retailer)}</td><td>${money(row.avgPromoByRetailer, currency)}</td><td>${money(row.avgRegularByRetailer, currency)}</td><td class="promo-gap">${money(row.gap, currency)}</td></tr>`).join("") || `<tr><td colspan="4">No retailer data</td></tr>`}</tbody></table></div><div class="promo-table-box"><h4>Promo vs regular by product</h4><table class="promo-table"><thead><tr><th>Product</th><th>Temp</th><th>Promo</th><th>Regular</th><th>Gap</th></tr></thead><tbody>${productRows.map(row => `<tr><td>${escapeHtml(row.product)}</td><td>${escapeHtml(row.temperature)}</td><td>${money(row.promoAvg, currency)}</td><td>${money(row.regularAvg, currency)}</td><td class="promo-gap">${money(row.gap, currency)}</td></tr>`).join("") || `<tr><td colspan="5">No product comparison</td></tr>`}</tbody></table></div>`; }
function reportFilteredRecords() {
  const protein = $("reportProtein").value, temperature = $("reportTemp").value, manufacturer = $("reportManufacturer").value, product = $("reportProduct").value, subProduct = $("reportSubProduct").value;
  return filteredRecords().filter(r => (!protein || r.protein === protein) && (!temperature || r.temperature === temperature) && (!manufacturer || r.manufacturer === manufacturer) && (!product || r.product === product) && (!subProduct || r.subProduct === subProduct)).map(r => ({ ...r, priceKg: number(r.priceUsdKg) || number(r.priceKg) / (FX_TO_USD[r.currency] || 1), currency: "USD" }));
}
function standardDeviation(values) {
  if (values.length < 2) return 0;
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.sqrt(values.reduce((sum, value) => sum + ((value - average) ** 2), 0) / values.length);
}
function refreshReportFilters() {
  const fill = (id, values, label) => { const current = $(id).value; $(id).innerHTML = `<option value="">${label}</option>${[...new Set(values.filter(Boolean))].sort().map(value => `<option value="${escapeHtml(value)}" ${value === current ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}`; };
  fill("reportManufacturer", records.map(r => r.manufacturer), "All manufacturers");
  fill("reportProduct", records.map(r => r.product), "All products");
  fill("reportSubProduct", records.map(r => r.subProduct), "All sub-products");
}
function renderReport() {
  refreshReportFilters();
  const data = reportFilteredRecords();
  $("reportRecordCount").textContent = `${data.length} record${data.length === 1 ? "" : "s"} shown`;
  if (!data.length) {
    $("reportSummary").innerHTML = `<div class="report-stat"><small>Average RSP</small><strong>—</strong><span>US$/kg · No data</span></div><div class="report-stat"><small>Min RSP</small><strong>—</strong><span>US$/kg · No data</span></div><div class="report-stat"><small>Max RSP</small><strong>—</strong><span>US$/kg · No data</span></div><div class="report-stat"><small>Std. deviation RSP</small><strong>—</strong><span>US$/kg · No data</span></div><div class="report-stat"><small>Average industry</small><strong>—</strong><span>US$/kg · No data</span></div><div class="report-stat"><small>Min industry</small><strong>—</strong><span>US$/kg · No data</span></div><div class="report-stat"><small>Max industry</small><strong>—</strong><span>US$/kg · No data</span></div>`;
    $("reportProductTemp").innerHTML = `<table class="report-table"><thead><tr><th>Product</th><th>Temp.</th><th>Min RSP</th><th>Avg RSP</th><th>Max RSP</th><th>Min Industry</th><th>Avg Industry</th><th>Max Industry</th></tr></thead><tbody><tr><td colspan="8">No rows available</td></tr></tbody></table>`;
    $("reportCountryCity").innerHTML = `<table class="report-table"><thead><tr><th>Country</th><th>City</th><th>Avg</th><th>Trend</th></tr></thead><tbody><tr><td colspan="4">No rows available</td></tr></tbody></table>`;
    $("reportManufacturers").innerHTML = `<table class="report-table"><thead><tr><th>Manufacturer</th><th>Avg</th><th>Products</th></tr></thead><tbody><tr><td colspan="3">No rows available</td></tr></tbody></table>`;
    return;
  }

  const rspValues = data.map(r => number(r.priceKg)).filter(Boolean);
  const industryValues = data.map(r => number(r.industryPrice)).filter(Boolean);
  const avgPrice = rspValues.length ? rspValues.reduce((sum, value) => sum + value, 0) / rspValues.length : 0;
  const priceMax = rspValues.length ? Math.max(...rspValues) : 0;
  const priceMin = rspValues.length ? Math.min(...rspValues) : 0;
  const avgIndustry = industryValues.length ? industryValues.reduce((sum, value) => sum + value, 0) / industryValues.length : 0;
  const rspStdDev = standardDeviation(rspValues);
  const industryMax = industryValues.length ? Math.max(...industryValues) : 0;
  const industryMin = industryValues.length ? Math.min(...industryValues) : 0;
  const countries = new Set(data.map(r => r.country).filter(Boolean)).size;
  const products = new Set(data.map(r => r.product).filter(Boolean)).size;

  const productTempMap = {};
  data.forEach(r => {
    const key = `${r.product}|${r.temperature}`;
    if (!productTempMap[key]) productTempMap[key] = { product: r.product, temperature: r.temperature, rsp: [], rspUsd: [], industry: [] };
    productTempMap[key].rsp.push(number(r.priceKg));
    productTempMap[key].rspUsd.push(number(r.priceUsdKg) || number(r.priceKg) / (FX_TO_USD[r.currency] || 1));
    productTempMap[key].industry.push(number(r.industryPrice));
  });
  const productTempRows = Object.values(productTempMap).map(item => {
    const rsp = item.rsp.filter(Boolean);
    const rspUsd = item.rspUsd.filter(Boolean);
    const industry = item.industry.filter(Boolean);
    const priceAvg = rsp.length ? rsp.reduce((sum, value) => sum + value, 0) / rsp.length : 0;
    const minRsp = rsp.length ? Math.min(...rsp) : 0;
    const maxRsp = rsp.length ? Math.max(...rsp) : 0;
    const indAvg = industry.length ? industry.reduce((sum, value) => sum + value, 0) / industry.length : 0;
    const minInd = industry.length ? Math.min(...industry) : 0;
    const maxInd = industry.length ? Math.max(...industry) : 0;
    const avgRspUsd = rspUsd.length ? rspUsd.reduce((sum, value) => sum + value, 0) / rspUsd.length : 0;
    return { product: item.product, temperature: item.temperature, minRsp, avgRsp: priceAvg, maxRsp, avgRspUsd, minInd, avgInd: indAvg, maxInd, spread: maxRsp - minRsp };
  }).sort((a, b) => b.avgRsp - a.avgRsp).slice(0, 10);

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
  const maxChartAvg = productTempRows.length ? Math.max(...productTempRows.map(row => row.avgRsp)) : 1;
  const currency = data[0] && data[0].currency ? data[0].currency : "USD";

  const retailerMap = {};
  data.forEach(r => {
    const key = r.store || "Unknown";
    if (!retailerMap[key]) retailerMap[key] = { retailer: key, prices: [], pricesUsd: [], industry: [] };
    retailerMap[key].prices.push(number(r.priceKg));
    retailerMap[key].pricesUsd.push(number(r.priceUsdKg) || number(r.priceKg) / (FX_TO_USD[r.currency] || 1));
    retailerMap[key].industry.push(number(r.industryPrice));
  });
  const retailerRows = Object.values(retailerMap).map(item => {
    const rsp = item.prices.filter(Boolean);
    const ind = item.industry.filter(Boolean);
    const avgRsp = rsp.length ? rsp.reduce((sum, value) => sum + value, 0) / rsp.length : 0;
    const avgIndustry = ind.length ? ind.reduce((sum, value) => sum + value, 0) / ind.length : 0;
    const rspUsd = item.pricesUsd.filter(Boolean);
    const spread = rsp.length ? Math.max(...rsp) - Math.min(...rsp) : 0;
    const avgRspUsd = rspUsd.length ? rspUsd.reduce((sum, value) => sum + value, 0) / rspUsd.length : 0;
    const marginPct = avgIndustry ? ((avgIndustry - avgRspUsd) / avgIndustry) * 100 : 0;
    return { retailer: item.retailer, avgRsp, avgRspUsd, avgIndustry, spread, marginPct };
  }).sort((a, b) => a.avgRsp - b.avgRsp);

  const topValueRetailer = retailerRows[0];
  const avgMarginPct = retailerRows.length ? retailerRows.reduce((sum, row) => sum + row.marginPct, 0) / retailerRows.length : 0;
  const marketSpread = rspValues.length ? Math.max(...rspValues) - Math.min(...rspValues) : 0;
  const pricingGapPct = avgPrice ? ((priceMax - priceMin) / avgPrice) * 100 : 0;

  $("reportSummary").innerHTML = `<div class="report-stat"><small>Average RSP</small><strong>${money(avgPrice, "USD")}</strong><span>US$/kg</span></div><div class="report-stat"><small>Min RSP</small><strong>${money(priceMin, "USD")}</strong><span>US$/kg lowest observed</span></div><div class="report-stat"><small>Max RSP</small><strong>${money(priceMax, "USD")}</strong><span>US$/kg highest observed</span></div><div class="report-stat"><small>Std. deviation RSP</small><strong>${money(rspStdDev, "USD")}</strong><span>US$/kg price dispersion</span></div><div class="report-stat"><small>Average industry</small><strong>${money(avgIndustry, "USD")}</strong><span>US$/kg estimated sell price</span></div><div class="report-stat"><small>Min industry</small><strong>${money(industryMin, "USD")}</strong><span>US$/kg lowest industry</span></div><div class="report-stat"><small>Max industry</small><strong>${money(industryMax, "USD")}</strong><span>US$/kg highest industry</span></div><div class="report-stat"><small>Avg margin</small><strong>${Number(avgMarginPct).toFixed(1)}%</strong><span>vs. industry benchmark</span></div><div class="report-stat"><small>Price spread</small><strong>${money(marketSpread, currency)}</strong><span>${Number(pricingGapPct).toFixed(1)}% market delta</span></div><div class="report-stat"><small>Best value retailer</small><strong>${escapeHtml(topValueRetailer ? topValueRetailer.retailer : "—")}</strong><span>${topValueRetailer ? money(topValueRetailer.avgRsp, currency) : "No retailer"} avg RSP</span></div>`;

  $("reportProductTemp").innerHTML = `<table class="report-table"><thead><tr><th>Product</th><th>Temp.</th><th>Min RSP</th><th>Avg RSP</th><th>Max RSP</th><th>Min Industry (US$)</th><th>Avg Industry (US$)</th><th>Max Industry (US$)</th></tr></thead><tbody>${productTempRows.map(row => `<tr><td>${escapeHtml(row.product)}</td><td>${escapeHtml(row.temperature)}</td><td>${money(row.minRsp, currency)}</td><td>${money(row.avgRsp, currency)}</td><td>${money(row.maxRsp, currency)}</td><td>${money(row.minInd, "USD")}</td><td>${money(row.avgInd, "USD")}</td><td>${money(row.maxInd, "USD")}</td></tr>`).join("") || `<tr><td colspan="8">No rows available</td></tr>`}</tbody></table>`;

  $("reportCountryCity").innerHTML = `<table class="report-table"><thead><tr><th>Country</th><th>City</th><th>Avg</th><th>Trend</th></tr></thead><tbody>${geographyRows.map(row => `<tr><td>${escapeHtml(row.country)}</td><td>${escapeHtml(row.city)}</td><td>${money(row.avg, currency)}</td><td><div class="report-bar"><span style="width:${Math.min(100, (row.avg / maxGeoAvg) * 100)}%"></span></div></td></tr>`).join("") || `<tr><td colspan="4">No rows available</td></tr>`}</tbody></table>`;
  $("reportManufacturers").innerHTML = `<table class="report-table"><thead><tr><th>Manufacturer</th><th>Avg</th><th>Products</th></tr></thead><tbody>${manufacturerRows.map(row => `<tr><td>${escapeHtml(row.manufacturer)}</td><td>${money(row.avg, currency)}</td><td>${row.products}</td></tr>`).join("") || `<tr><td colspan="3">No rows available</td></tr>`}</tbody></table>`;

  const similarProductRows = productTempRows.map(row => `<tr><td>${escapeHtml(row.product)}</td><td>${escapeHtml(row.temperature)}</td><td>${money(row.avgRsp, currency)}</td><td>${money(row.avgInd, "USD")}</td><td><div class="report-bar"><span style="width:${Math.min(100, (row.avgRsp / maxChartAvg) * 100)}%"></span></div></td></tr>`).join("");
  const productPriorityRows = [...productTempRows].sort((a, b) => ((b.avgInd - b.avgRsp) / (b.avgInd || 1)) - ((a.avgInd - a.avgRsp) / (a.avgInd || 1))).slice(0, 5).map(row => {
    const marginPct = row.avgInd ? ((row.avgInd - row.avgRspUsd) / row.avgInd) * 100 : 0;
    return `<tr><td>${escapeHtml(row.product)}</td><td>${escapeHtml(row.temperature)}</td><td>${money(row.avgRsp, currency)}</td><td>${money(row.avgInd, "USD")}</td><td>${Number(marginPct).toFixed(1)}%</td></tr>`;
  }).join("");
  const retailerSpreadRows = retailerRows.slice(0, 5).map(row => `<tr><td>${escapeHtml(row.retailer)}</td><td>${money(row.avgRsp, currency)}</td><td>${money(row.avgIndustry, "USD")}</td><td>${money(row.spread, currency)}</td><td>${Number(row.marginPct).toFixed(1)}%</td></tr>`).join("");
  const outlierRows = [...data].sort((a, b) => {
    const gapA = number(a.industryPrice) ? ((number(a.priceUsdKg) - number(a.industryPrice)) / number(a.industryPrice)) * 100 : 0;
    const gapB = number(b.industryPrice) ? ((number(b.priceUsdKg) - number(b.industryPrice)) / number(b.industryPrice)) * 100 : 0;
    return Math.abs(gapB) - Math.abs(gapA);
  }).slice(0, 5).map(row => {
    const gap = number(row.industryPrice) ? ((number(row.priceUsdKg) - number(row.industryPrice)) / number(row.industryPrice)) * 100 : 0;
    return `<tr><td>${escapeHtml(row.product)}</td><td>${escapeHtml(row.store)}</td><td>${escapeHtml(row.country)}</td><td>${Number(gap).toFixed(1)}%</td></tr>`;
  }).join("");

  $("reportProductTemp").innerHTML += `<div class="report-compare"><h3>Similar product comparison</h3><table class="report-table compact"><thead><tr><th>Product</th><th>Temp.</th><th>Avg RSP</th><th>Avg industry</th><th>Chart</th></tr></thead><tbody>${similarProductRows || `<tr><td colspan="5">No comparable products</td></tr>`}</tbody></table></div><div class="report-multi-table"><div><h3>Commercial priorities</h3><table class="report-table compact"><thead><tr><th>Product</th><th>Temp.</th><th>Avg RSP</th><th>Avg industry</th><th>Margin</th></tr></thead><tbody>${productPriorityRows || `<tr><td colspan="5">No priority data</td></tr>`}</tbody></table></div><div><h3>Retailer spread</h3><table class="report-table compact"><thead><tr><th>Retailer</th><th>Avg RSP</th><th>Avg industry</th><th>Spread</th><th>Margin</th></tr></thead><tbody>${retailerSpreadRows || `<tr><td colspan="5">No retailer spread</td></tr>`}</tbody></table></div><div class="span-2"><h3>Price outliers</h3><table class="report-table compact"><thead><tr><th>Product</th><th>Retailer</th><th>Country</th><th>Gap to industry</th></tr></thead><tbody>${outlierRows || `<tr><td colspan="4">No outliers</td></tr>`}</tbody></table></div></div>`;
}
function csvCell(value) { return `"${String(value == null ? "" : value).replace(/"/g, '""')}"`; }
function exportCsv() { const headers = ["id", "date", "manufacturer", "collector", "channel", "city", "country", "currency", "retailer", "protein", "temperature", "product", "sub_product", "package_weight_kg", "package_price", "price_kg_rsp_label", "price_usd_kg", "retailer_margin_pct", "industry_price_usd_kg", "manual_industry_price", "promotion", "full_price", "promo_pack", "combo_quantity", "combo_unit_weight_kg", "combo_total_price"]; const rows = records.map(r => [r.id, r.date, r.manufacturer, r.collector, r.channel, r.city, r.country, r.currency, r.store, r.protein, r.temperature, r.product, r.subProduct, r.weight, r.packPrice, r.priceKg, r.priceUsdKg, r.margin, r.industryPrice, r.manualIndustryPrice, r.promotion, r.fullPrice, r.promoPack, r.comboQty, r.comboUnitWeight, r.comboTotalPrice]); const blob = new Blob(["\ufeff" + [headers, ...rows].map(row => row.map(csvCell).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" }), a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `pricescope-${today()}.csv`; a.click(); URL.revokeObjectURL(a.href); showToast("File exported for Excel."); }
function reportCsvRows(data) {
  const currency = (data[0] && data[0].currency) || "USD";
  const rows = [];
  const avgPrice = data.length ? data.reduce((sum, r) => sum + number(r.priceKg), 0) / data.length : 0;
  const avgIndustry = data.length ? data.reduce((sum, r) => sum + number(r.industryPrice), 0) / data.length : 0;
  const priceMin = data.length ? Math.min(...data.map(r => number(r.priceKg))) : 0;
  const priceMax = data.length ? Math.max(...data.map(r => number(r.priceKg))) : 0;
  const industryMin = data.length ? Math.min(...data.map(r => number(r.industryPrice))) : 0;
  const industryMax = data.length ? Math.max(...data.map(r => number(r.industryPrice))) : 0;
  rows.push(["Report date", today()]);
  rows.push(["Filter records", data.length]);
  rows.push(["Average RSP", `${avgPrice}`]);
  rows.push(["Min RSP", `${priceMin}`]);
  rows.push(["Max RSP", `${priceMax}`]);
  rows.push(["Average industry", `${avgIndustry}`]);
  rows.push(["Min industry", `${industryMin}`]);
  rows.push(["Max industry", `${industryMax}`]);
  rows.push([]);
  rows.push(["Date", "Country", "City", "Retailer", "Protein", "Product", "Temp", "Promotion", "Price/kg", "Industry price", "Currency"]);
  data.forEach(r => rows.push([r.date || "", r.country || "", r.city || "", r.store || "", r.protein || "", r.product || "", r.temperature || "", Boolean(r.promotion) ? "Yes" : "No", number(r.priceKg), number(r.industryPrice), r.currency || currency]));
  return rows;
}
function exportReportCsv() {
  const data = reportFilteredRecords();
  const rows = reportCsvRows(data);
  const blob = new Blob(["\ufeff" + rows.map(row => row.map(value => csvCell(value)).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `pricescope-report-${today()}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast("Report exported to CSV.");
}
function printReport() {
  window.print();
}
function parseCsv(text) { const lines = text.replace(/^\ufeff/, "").split(/\r?\n/).filter(Boolean), split = line => { const matches = line.match(/(?:^|;)("(?:[^"]|"")*"|[^;]*)/g); return matches ? matches.map(v => v.replace(/^;/, "").replace(/^"|"$/g, "").replace(/""/g, '"')) : []; }, headers = split(lines.shift()).map(h => h.toLowerCase()); return lines.map(line => { const values = split(line), get = key => values[headers.indexOf(key)] || "", currency = get("currency") || CURRENCIES[get("country")] || "USD", fx = FX_TO_USD[currency] || 1, priceKg = number(get("price_kg_rsp_label")), industryUsd = get("industry_price_usd_kg") !== "" ? number(get("industry_price_usd_kg")) : number(get("industry_price")) / fx; return { id: get("id") || crypto.randomUUID(), date: get("date"), manufacturer: get("manufacturer"), collector: get("collector"), channel: get("channel"), city: get("city"), country: get("country"), currency, store: get("retailer"), protein: get("protein"), temperature: get("temperature"), product: get("product"), subProduct: get("sub_product"), weight: number(get("package_weight_kg")), packPrice: number(get("package_price")), priceKg, priceUsdKg: number(get("price_usd_kg")) || priceKg / fx, margin: number(get("retailer_margin_pct")), industryPrice: industryUsd, manualIndustryPrice: get("manual_industry_price") === "true", promotion: get("promotion") === "true", fullPrice: number(get("full_price")), promoPack: get("promo_pack") === "true", comboQty: number(get("combo_quantity")), comboUnitWeight: number(get("combo_unit_weight_kg")), comboTotalPrice: number(get("combo_total_price")) }; }); }
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
function findAliasMatch(text, aliasMap) {
  const normalized = normalizeSpeechToken(text);
  for (const [label, aliases] of Object.entries(aliasMap)) {
    if (aliases.some(alias => normalized.includes(normalizeSpeechToken(alias)))) return label;
  }
  return "";
}
function detectManufacturer(text) {
  const normalized = normalizeSpeechToken(cleanVoiceText(text));
  const match = GCC_MANUFACTURERS.find(brand => normalized.includes(normalizeSpeechToken(brand)));
  return match || "";
}
function detectRetailer(text) {
  return findAliasMatch(cleanVoiceText(text), VOICE_RETAILER_ALIASES) || GCC_RETAILERS.find(store => normalizeSpeechToken(cleanVoiceText(text)).includes(normalizeSpeechToken(store))) || "";
}
function detectCurrency(text) {
  const normalized = normalizeSpeechToken(cleanVoiceText(text));
  for (const [currency, aliases] of Object.entries(VOICE_CURRENCY_ALIASES)) {
    if (aliases.some(alias => normalized.includes(normalizeSpeechToken(alias)))) return currency;
  }
  return Object.keys(FX_TO_USD).find(item => new RegExp(`${String.raw`\b`}${item}${String.raw`\b`}`, "i").test(cleanVoiceText(text))) || "";
}
function detectCountry(text) {
  return findAliasMatch(cleanVoiceText(text), VOICE_COUNTRY_ALIASES) || COUNTRIES.find(item => normalizeSpeechToken(cleanVoiceText(text)).includes(normalizeSpeechToken(item))) || "";
}
function detectCity(text, country) {
  const cleaned = cleanVoiceText(text);
  const normalized = normalizeSpeechToken(cleaned);
  const directAlias = findAliasMatch(cleaned, VOICE_CITY_ALIASES);
  if (directAlias) return directAlias;
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
  if (city) { const knownCity = CITIES[country] ? CITIES[country].includes(city) : false; $("city").value = knownCity ? city : "__custom"; $("cityCustom").value = knownCity ? "" : city; $("cityCustom").hidden = knownCity; $("cityCustom").required = !knownCity; }
  const manufacturer = detectManufacturer(cleaned) || fieldValue(cleaned, ["manufacturer", "brand", "producer", "company"]) || valueBeforeKeyword(cleaned, ["manufacturer", "brand", "producer", "company"], ["collector", "country", "city", "retailer", "price", "weight"]);
  if (manufacturer) $("manufacturer").value = manufacturer;
  const collector = fieldValue(cleaned, ["collector", "collected by", "recorded by"]) || valueBeforeKeyword(cleaned, ["collector", "collected by", "recorded by"], ["country", "city", "retailer", "price", "weight"]);
  if (collector) $("collector").value = collector;
  const retailer = detectRetailer(cleaned) || fieldValue(cleaned, ["retailer", "store", "supermarket", "market", "shop"]) || valueBeforeKeyword(cleaned, ["retailer", "store", "supermarket", "market", "shop"], ["country", "city", "manufacturer", "collector", "price", "weight"]);
  if (retailer) $("store").value = retailer;
  const channel = ["Modern Trade", "Traditional Trade", "Food Service", "Wholesaler"].find(item => lower.includes(item.toLowerCase())); if (channel) $("channel").value = channel;
  const protein = ["Chicken", "Beef", "Lamb", "Goat"].find(item => lower.includes(item.toLowerCase())); if (protein) { $("protein").value = protein; populateProducts(); }
  const product = Object.values(PRODUCTS).flat().find(item => lower.includes(item.toLowerCase())); if (product) { $("product").value = product; populateSubProducts(); }
  const temperature = lower.includes("frozen") ? "Frozen" : lower.includes("chilled") ? "Chilled" : ""; if (temperature) $("temperature").value = temperature;
  const currency = detectCurrency(cleaned) || Object.keys(FX_TO_USD).find(item => new RegExp(`${String.raw`\b`}${item}${String.raw`\b`}`, "i").test(cleaned)) || "";
  if (currency) $("currency").value = currency;
  const nums = [...cleaned.matchAll(/(\d+(?:[,.]\d+)?)/g)].map(match => Number(match[1].replace(",", "."))); if (nums.length >= 2) { $("weight").value = nums[0]; $("packPrice").value = nums[1]; } else if (nums.length === 1) $("packPrice").value = nums[0];
  updateCalculation();
}
function transcriptValue(text, labels) {
  for (const label of labels) {
    const match = text.match(new RegExp(`(?:^|[.;])\\s*${label}\\s*[:=-]\\s*([^,;.\\n]+)`, "i"));
    if (match) return match[1].trim();
  }
  return "";
}
function transcriptRecords(text) {
  const productParts = text.split(/(?=\bproduct\s*(?:number\s*)?\d+\s*[:=-]?)/i).filter(part => /\bproduct\s*(?:number\s*)?\d+/i.test(part));
  const parts = productParts.length ? productParts : [text];
  const context = productParts.length ? text.slice(0, text.indexOf(productParts[0])) : "";
  return parts.map(part => {
    const combined = `${context}; ${part}`;
    const productText = transcriptValue(part, ["product"]) || part;
    const lower = combined.toLowerCase();
    const protein = ["Chicken", "Beef", "Lamb", "Goat"].find(item => lower.includes(item.toLowerCase())) || "";
    const product = Object.values(PRODUCTS).flat().find(item => productText.toLowerCase().includes(item.toLowerCase())) || "";
    const subProduct = Object.values(SUBPRODUCTS).flatMap(group => Object.values(group).flat()).find(item => productText.toLowerCase().includes(item.toLowerCase())) || "";
    const numbers = [...part.matchAll(/(\d+(?:[,.]\d+)?)/g)].map(match => Number(match[1].replace(",", ".")));
    const weightMatch = part.match(/(\d+(?:[,.]\d+)?)\s*kg/i);
    const priceMatch = part.match(/(?:rsp|price|aed|omr|sar|qar|bhd|kwd|iqd|yer)\D*(\d+(?:[,.]\d+)?)/i);
    return { text: combined, context, protein, product, subProduct, weight: weightMatch ? Number(weightMatch[1].replace(",", ".")) : numbers[0], price: priceMatch ? Number(priceMatch[1].replace(",", ".")) : numbers[1] };
  });
}
let transcriptReviewQueue = [];
function reviewNextTranscriptItem() {
  const next = transcriptReviewQueue.shift();
  if (!next) {
    showToast("Transcript review complete.");
    return;
  }
  openDialog(null, null, next.text);
  applyTranscript(next.text);
  showToast("Review the item, edit if needed, and save to continue to the next one.");
}
function beginTranscriptReview(items) {
  const valid = (items || []).filter(item => item && (item.text || item.weight || item.price || item.protein || item.product || item.subProduct));
  if (!valid.length) {
    showToast("No valid records were found in the transcript.");
    return;
  }
  transcriptReviewQueue = valid.slice();
  reviewNextTranscriptItem();
}
function startAudio() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { $("transcriptionStatus").textContent = "Speech recognition is not supported in this browser."; return; }
  const selectedLang = $("voiceLang") ? $("voiceLang").value : "en-US";
  recognition = new SpeechRecognition(); recognition.lang = selectedLang; recognition.continuous = true; recognition.interimResults = true;
  let finalTranscript = $("transcriptEditor").value.trim();
  $("startTranscription").disabled = true; $("stopTranscription").disabled = false; $("transcriptionStatus").textContent = `Recording... speak in ${selectedLang === "en-US" ? "English" : "Português"}.`;
  recognition.onresult = event => { let interim = ""; for (let index = event.resultIndex; index < event.results.length; index++) { const result = event.results[index]; if (result.isFinal) finalTranscript += `${result[0].transcript.trim()} `; else interim += result[0].transcript; } $("transcriptEditor").value = `${finalTranscript}${interim}`.trim(); };
  recognition.onerror = event => { console.error(event.error, event.message); $("transcriptionStatus").textContent = `Recording failed. Try another language or edit the text manually.`; }; recognition.onend = () => { $("startTranscription").disabled = false; $("stopTranscription").disabled = true; if ($("transcriptEditor").value) $("transcriptionStatus").textContent = "Transcript ready to review."; }; recognition.start();
}
function stopAudio() { if (recognition) recognition.stop(); }
function openTranscriptionTab() { const page = window.open(`${window.location.href.split("#")[0]}#transcribe`, "_blank"); if (!page) { window.location.hash = "#transcribe"; window.location.reload(); return; } }
async function readPhotoFromCanvas() {
  const source = $("photoPreview").src;
  if (!source) { showToast("Select a photo first."); return; }
  if (!window.Tesseract) { showToast("OCR is not available in this browser."); return; }
  $("readPhotoBtn").disabled = true; $("readPhotoBtn").textContent = "Reading...";
  try {
    const { data } = await Tesseract.recognize(source, "eng");
    const text = data.text || "";
    if (!text.trim()) { showToast("No text could be read in the image."); return; }
    openDialog(null, source, text);
    applyTranscript(text);
    showToast("Photo text read. Review and save.");
  } catch (error) {
    console.error(error);
    showToast("The photo could not be read. Try another image.");
  } finally {
    $("readPhotoBtn").disabled = false; $("readPhotoBtn").textContent = "Read text from photo";
  }
}
function showPage(page) {
  const all = document.querySelectorAll("main.shell");
  all.forEach(panel => panel.hidden = true);
  if (page === "collection") {
    const collectionMain = document.querySelector("main.shell");
    if (collectionMain) collectionMain.hidden = false;
    return;
  }
  if (page === "transcription") {
    $("transcriptionPage").hidden = false;
    return;
  }
  if (page === "report") {
    $("reportPage").hidden = false;
  }
}
$("manualBtn").onclick = () => openDialog(); $("closeDialog").onclick = closeDialog; $("cancelDialog").onclick = closeDialog; $("country").onchange = () => { populateCountryFields(); updateCalculation(); }; $("city").onchange = () => { $("cityCustom").hidden = $("city").value !== "__custom"; $("cityCustom").required = $("city").value === "__custom"; }; $("protein").onchange = () => populateProducts(); $("product").onchange = () => populateSubProducts(); $("subProduct").onchange = toggleSubProductCustom; ["weight", "packPrice", "priceKg", "industryPrice", "margin", "currency", "comboQty", "comboUnitWeight", "comboTotalPrice"].forEach(id => $(id).oninput = updateCalculation); $("promotion").onchange = toggleConditionalFields; $("promoPack").onchange = toggleConditionalFields; $("audioBtn").onclick = openTranscriptionTab; $("readPhotoBtn").onclick = readPhotoFromCanvas; $("reportBtn").onclick = () => { showPage("report"); renderReport(); };
$("reportProtein").onchange = renderReport; $("reportTemp").onchange = renderReport; $("reportManufacturer").onchange = renderReport; $("reportProduct").onchange = renderReport; $("reportSubProduct").onchange = renderReport; $("clearReportFilters").onclick = () => { ["reportProtein", "reportTemp", "reportManufacturer", "reportProduct", "reportSubProduct"].forEach(id => $(id).value = ""); renderReport(); };
$("entryForm").addEventListener("invalid", event => { const labels = event.target && event.target.labels ? event.target.labels : []; const label = labels[0] ? labels[0].textContent : ""; event.preventDefault(); showToast(`Please complete: ${label.replace(" *", "") || "the highlighted field"}.`); event.target.focus(); }, true);
$("entryForm").onsubmit = async event => { event.preventDefault(); const button = event.submitter; if (button) button.disabled = true; const item = recordFromForm(), index = records.findIndex(r => r.id === item.id); const wasTranscriptReview = transcriptReviewQueue.length > 0; try { await saveRecords([item]); localStorage.setItem(COLLECTOR_KEY, item.collector); if (index >= 0) records[index] = item; else records.unshift(item); render(); closeDialog(); showToast(index >= 0 ? "Collection updated." : "Collection saved."); if (wasTranscriptReview) { setTimeout(() => { if (transcriptReviewQueue.length) reviewNextTranscriptItem(); else showToast("All reviewed transcript items have been saved."); }, 150); } } catch (error) { reportStorageError(error); } finally { if (button) button.disabled = false; } };
document.querySelectorAll(".filters input,.filters select").forEach(el => el.addEventListener("change", render)); $("clearFilters").onclick = () => { document.querySelectorAll(".filters input,.filters select").forEach(el => el.value = ""); render(); }; $("priceTable").onclick = event => { const button = event.target.closest(".edit-row"); if (button) openDialog(records.find(r => r.id === button.dataset.id)); }; $("selectAll").onchange = event => document.querySelectorAll(".row-check").forEach(c => c.checked = event.target.checked); $("deleteSelected").onclick = async () => { const ids = [...document.querySelectorAll(".row-check:checked")].map(c => c.dataset.id); if (ids.length && confirm(`Delete ${ids.length} collection(s)?`)) { try { await deleteRecords(ids); records = records.filter(r => !ids.includes(r.id)); render(); showToast("Collections deleted."); } catch (error) { reportStorageError(error); } } }; $("exportBtn").onclick = exportCsv; $("importInput").onchange = event => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = async () => { try { const imported = parseCsv(reader.result); await saveRecords(imported); records = [...imported, ...records.filter(old => !imported.some(item => item.id === old.id))]; render(); showToast(`${imported.length} record(s) imported.`); } catch (error) { reportStorageError(error); } }; reader.readAsText(file, "UTF-8"); event.target.value = ""; }; $("photoBtn").onclick = () => $("photoInput").click(); $("photoInput").onchange = event => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => openDialog(null, reader.result); reader.readAsDataURL(file); event.target.value = ""; }; $("reportBtn").onclick = () => { showPage("report"); renderReport(); }; $("exportReportBtn").onclick = exportReportCsv; $("printReportBtn").onclick = printReport; $("backToCollectionFromReport").onclick = () => showPage("collection");
if (window.location.hash === "#transcribe") {
  showPage("transcription");
  $("startTranscription").onclick = startAudio; $("stopTranscription").onclick = stopAudio; $("backToCollection").onclick = () => window.close();
  const sendTranscript = (batch = false) => { const text = $("transcriptEditor").value.trim(); if (!text) { $("transcriptionStatus").textContent = "Enter or record a transcript first."; return; } if (window.opener && !window.opener.closed) { window.opener.postMessage({ type: batch ? "pricescope-transcript-batch" : "pricescope-transcript", text }, window.location.origin === "null" ? "*" : window.location.origin); window.close(); } else { const key = batch ? "pricescope-pending-transcript-batch" : "pricescope-pending-transcript"; localStorage.setItem(key, text); if (batch) { const items = transcriptRecords(text); beginTranscriptReview(items); } else { const pending = localStorage.getItem(key); if (pending) { openDialog(null, null, pending); applyTranscript(pending); showToast("Transcript applied. Review the recognized fields and save."); } } window.location.hash = ""; window.location.reload(); } };
  $("applyTranscript").onclick = () => sendTranscript(false); $("applyTranscriptBatch").onclick = () => sendTranscript(true);
} else {
  const pendingTranscript = localStorage.getItem("pricescope-pending-transcript"); const pendingBatchTranscript = localStorage.getItem("pricescope-pending-transcript-batch"); if (pendingTranscript) { localStorage.removeItem("pricescope-pending-transcript"); openDialog(null, null, pendingTranscript); applyTranscript(pendingTranscript); showToast("Transcript applied. Review the recognized fields and save."); } if (pendingBatchTranscript) { localStorage.removeItem("pricescope-pending-transcript-batch"); const text = pendingBatchTranscript; beginTranscriptReview(transcriptRecords(text)); }
  window.addEventListener("message", async event => { if (event.data && event.data.type === "pricescope-transcript") { openDialog(null, null, event.data.text); applyTranscript(event.data.text); showToast("Transcript applied. Review the recognized fields and save."); } if (event.data && event.data.type === "pricescope-transcript-batch") { beginTranscriptReview(transcriptRecords(event.data.text)); } });
}
let deferredPrompt; configureFormLabels(); window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); deferredPrompt = event; $("installBtn").hidden = false; }); $("installBtn").onclick = async () => { if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; $("installBtn").hidden = true; } }; if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
async function startApp() { try { await loadRecords(); render(); } catch (error) { reportStorageError(error); render(); } }
if (window.location.hash === "#report") { showPage("report"); renderReport(); }
startApp();
