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
function render() { refreshFilterOptions(); populateRetailerSuggestions(); populateManufacturerSuggestions(); const data = filteredRecords(); $("recordCount").textContent = records.length; $("visibleCount").textContent = data.length; $("emptyState").style.display = data.length ? "none" : "block"; renderMetrics(data); $("priceTable").innerHTML = data.map(r => `<tr><td><input type="checkbox" class="row-check" data-id="${r.id}"></td><td>${r.date || "—"}</td><td><b>${escapeHtml(r.store)}</b><span class="subtle">${escapeHtml(r.manufacturer || "")} · ${escapeHtml(r.collector || "")} · ${escapeHtml(r.channel || "")}</span></td><td><span class="product-name">${escapeHtml(r.protein)}</span><span class="subtle">${escapeHtml(r.product)}${r.subProduct ? ` · ${escapeHtml(r.subProduct)}` : ""}${r.promotion ? " · Promotion" : ""}</span></td><td><span class="tag ${r.temperature === "Frozen" ? "cold" : ""}">${r.temperature}</span></td><td class="price">${money(r.priceKg, r.currency || "USD")}</td><td class="price teal-price">${money(r.priceUsdKg)}</td><td class="price teal-price">${money(r.industryPrice, r.currency || "USD")}</td><td><button class="row-action edit-row" data-id="${r.id}" title="Edit">✎</button></td></tr>`).join(""); renderInsights(data); $("deleteSelected").style.display = data.length ? "block" : "none"; }
function renderInsights(data) { const avg = data.length ? data.reduce((sum, r) => sum + number(r.priceKg), 0) / data.length : 0, below = data.filter(r => number(r.priceKg) < avg).slice(0, 5); $("insights").innerHTML = below.length ? below.map(r => `<div class="insight"><div><b>${escapeHtml(r.product)}</b><small>${escapeHtml(r.store)} · ${escapeHtml(r.country)}</small></div><strong>${money(r.priceKg, r.currency || "USD")}</strong></div>`).join("") : `<div class="empty-state"><span>Below-average prices will appear here.</span></div>`; }
function csvCell(value) { return `"${String(value ?? "").replace(/"/g, '""')}"`; }
function exportCsv() { const headers = ["id", "date", "manufacturer", "collector", "channel", "city", "country", "currency", "retailer", "protein", "temperature", "product", "sub_product", "package_weight_kg", "package_price", "price_kg_rsp_label", "price_usd_kg", "retailer_margin_pct", "industry_price", "manual_industry_price", "promotion", "full_price", "promo_pack", "combo_quantity", "combo_unit_weight_kg", "combo_total_price"]; const rows = records.map(r => [r.id, r.date, r.manufacturer, r.collector, r.channel, r.city, r.country, r.currency, r.store, r.protein, r.temperature, r.product, r.subProduct, r.weight, r.packPrice, r.priceKg, r.priceUsdKg, r.margin, r.industryPrice, r.manualIndustryPrice, r.promotion, r.fullPrice, r.promoPack, r.comboQty, r.comboUnitWeight, r.comboTotalPrice]); const blob = new Blob(["\ufeff" + [headers, ...rows].map(row => row.map(csvCell).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" }), a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `pricescope-${today()}.csv`; a.click(); URL.revokeObjectURL(a.href); showToast("File exported for Excel."); }
function parseCsv(text) { const lines = text.replace(/^\ufeff/, "").split(/\r?\n/).filter(Boolean), split = line => line.match(/(?:^|;)("(?:[^"]|"")*"|[^;]*)/g)?.map(v => v.replace(/^;/, "").replace(/^"|"$/g, "").replace(/""/g, '"')) || [], headers = split(lines.shift()).map(h => h.toLowerCase()); return lines.map(line => { const values = split(line), get = key => values[headers.indexOf(key)] || "", currency = get("currency") || CURRENCIES[get("country")] || "USD", priceKg = number(get("price_kg_rsp_label")); return { id: get("id") || crypto.randomUUID(), date: get("date"), manufacturer: get("manufacturer"), collector: get("collector"), channel: get("channel"), city: get("city"), country: get("country"), currency, store: get("retailer"), protein: get("protein"), temperature: get("temperature"), product: get("product"), subProduct: get("sub_product"), weight: number(get("package_weight_kg")), packPrice: number(get("package_price")), priceKg, priceUsdKg: number(get("price_usd_kg")) || priceKg / (FX_TO_USD[currency] || 1), margin: number(get("retailer_margin_pct")), industryPrice: number(get("industry_price")), manualIndustryPrice: get("manual_industry_price") === "true", promotion: get("promotion") === "true", fullPrice: number(get("full_price")), promoPack: get("promo_pack") === "true", comboQty: number(get("combo_quantity")), comboUnitWeight: number(get("combo_unit_weight_kg")), comboTotalPrice: number(get("combo_total_price")) }; }); }
function applyTranscript(text) {
  const lower = text.toLowerCase();
  const field = (names) => { for (const name of names) { const match = text.match(new RegExp(`${name}\\s*[:=-]\\s*([^,;.\\n]+)`, "i")); if (match) return match[1].trim(); } return ""; };
  const country = field(["country"]) || COUNTRIES.find(item => lower.includes(item.toLowerCase())) || "";
  if (country) { $("country").value = country; populateCountryFields(country); }
  const city = field(["city"]) || Object.values(CITIES).flat().find(item => lower.includes(item.toLowerCase())) || "";
  if (city) { const knownCity = CITIES[country]?.includes(city); $("city").value = knownCity ? city : "__custom"; $("cityCustom").value = knownCity ? "" : city; $("cityCustom").hidden = knownCity; $("cityCustom").required = !knownCity; }
  const manufacturer = field(["manufacturer", "brand"]); if (manufacturer) $("manufacturer").value = manufacturer;
  const collector = field(["collector", "collected by"]); if (collector) $("collector").value = collector;
  const retailer = field(["retailer", "store", "supermarket"]); if (retailer) $("store").value = retailer;
  const channel = ["Modern Trade", "Traditional Trade", "Food Service", "Wholesaler"].find(item => lower.includes(item.toLowerCase())); if (channel) $("channel").value = channel;
  const protein = ["Chicken", "Beef", "Lamb", "Goat"].find(item => lower.includes(item.toLowerCase())); if (protein) { $("protein").value = protein; populateProducts(); }
  const product = Object.values(PRODUCTS).flat().find(item => lower.includes(item.toLowerCase())); if (product) { $("product").value = product; populateSubProducts(); }
  const temperature = lower.includes("frozen") ? "Frozen" : lower.includes("chilled") ? "Chilled" : ""; if (temperature) $("temperature").value = temperature;
  const currency = Object.keys(FX_TO_USD).find(item => new RegExp(`\\b${item}\\b`, "i").test(text)); if (currency) $("currency").value = currency;
  const nums = [...text.matchAll(/(\d+(?:[,.]\d+)?)/g)].map(match => Number(match[1].replace(",", "."))); if (nums.length >= 2) { $("weight").value = nums[0]; $("packPrice").value = nums[1]; } else if (nums.length === 1) $("packPrice").value = nums[0];
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
function startAudio() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { $("transcriptionStatus").textContent = "Speech recognition is not supported in this browser."; return; }
  recognition = new SpeechRecognition(); recognition.lang = "en-US"; recognition.continuous = true; recognition.interimResults = true;
  let finalTranscript = $("transcriptEditor").value.trim();
  $("startTranscription").disabled = true; $("stopTranscription").disabled = false; $("transcriptionStatus").textContent = "Recording... speak the complete collection.";
  recognition.onresult = event => { let interim = ""; for (let index = event.resultIndex; index < event.results.length; index++) { const result = event.results[index]; if (result.isFinal) finalTranscript += `${result[0].transcript.trim()} `; else interim += result[0].transcript; } $("transcriptEditor").value = `${finalTranscript}${interim}`.trim(); };
  recognition.onerror = () => $("transcriptionStatus").textContent = "Recording failed. You can edit the text and try again."; recognition.onend = () => { $("startTranscription").disabled = false; $("stopTranscription").disabled = true; if ($("transcriptEditor").value) $("transcriptionStatus").textContent = "Transcript ready to review."; }; recognition.start();
}
function stopAudio() { if (recognition) recognition.stop(); }
function openTranscriptionTab() { const page = window.open(`${window.location.href.split("#")[0]}#transcribe`, "_blank"); if (!page) showToast("Please allow pop-ups to open the transcription tab."); }
$("manualBtn").onclick = () => openDialog(); $("closeDialog").onclick = closeDialog; $("cancelDialog").onclick = closeDialog; $("country").onchange = () => populateCountryFields(); $("city").onchange = () => { $("cityCustom").hidden = $("city").value !== "__custom"; $("cityCustom").required = $("city").value === "__custom"; }; $("protein").onchange = () => populateProducts(); $("product").onchange = () => populateSubProducts(); $("subProduct").onchange = toggleSubProductCustom; ["weight", "packPrice", "priceKg", "industryPrice", "margin", "currency", "comboQty", "comboUnitWeight", "comboTotalPrice"].forEach(id => $(id).oninput = updateCalculation); $("promotion").onchange = toggleConditionalFields; $("promoPack").onchange = toggleConditionalFields; $("audioBtn").onclick = openTranscriptionTab;
$("entryForm").addEventListener("invalid", event => { event.preventDefault(); showToast(`Please complete: ${event.target.labels?.[0]?.textContent?.replace(" *", "") || "the highlighted field"}.`); event.target.focus(); }, true);
$("entryForm").onsubmit = async event => { event.preventDefault(); const button = event.submitter; if (button) button.disabled = true; const item = recordFromForm(), index = records.findIndex(r => r.id === item.id); try { await saveRecords([item]); localStorage.setItem(COLLECTOR_KEY, item.collector); if (index >= 0) records[index] = item; else records.unshift(item); render(); closeDialog(); showToast(index >= 0 ? "Collection updated." : "Collection saved."); } catch (error) { reportStorageError(error); } finally { if (button) button.disabled = false; } };
document.querySelectorAll(".filters input,.filters select").forEach(el => el.addEventListener("change", render)); $("clearFilters").onclick = () => { document.querySelectorAll(".filters input,.filters select").forEach(el => el.value = ""); render(); }; $("priceTable").onclick = event => { const button = event.target.closest(".edit-row"); if (button) openDialog(records.find(r => r.id === button.dataset.id)); }; $("selectAll").onchange = event => document.querySelectorAll(".row-check").forEach(c => c.checked = event.target.checked); $("deleteSelected").onclick = async () => { const ids = [...document.querySelectorAll(".row-check:checked")].map(c => c.dataset.id); if (ids.length && confirm(`Delete ${ids.length} collection(s)?`)) { try { await deleteRecords(ids); records = records.filter(r => !ids.includes(r.id)); render(); showToast("Collections deleted."); } catch (error) { reportStorageError(error); } } }; $("exportBtn").onclick = exportCsv; $("importInput").onchange = event => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = async () => { try { const imported = parseCsv(reader.result); await saveRecords(imported); records = [...imported, ...records.filter(old => !imported.some(item => item.id === old.id))]; render(); showToast(`${imported.length} record(s) imported.`); } catch (error) { reportStorageError(error); } }; reader.readAsText(file, "UTF-8"); event.target.value = ""; }; $("photoBtn").onclick = () => $("photoInput").click(); $("photoInput").onchange = event => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => openDialog(null, reader.result); reader.readAsDataURL(file); event.target.value = ""; };
if (window.location.hash === "#transcribe") {
  document.querySelector("main.shell:not(#transcriptionPage)").hidden = true; $("transcriptionPage").hidden = false;
  $("startTranscription").onclick = startAudio; $("stopTranscription").onclick = stopAudio; $("backToCollection").onclick = () => window.close();
  const sendTranscript = (batch = false) => { const text = $("transcriptEditor").value.trim(); if (!text) { $("transcriptionStatus").textContent = "Enter or record a transcript first."; return; } if (window.opener && !window.opener.closed) { window.opener.postMessage({ type: batch ? "pricescope-transcript-batch" : "pricescope-transcript", text }, window.location.origin === "null" ? "*" : window.location.origin); window.close(); } else { localStorage.setItem(batch ? "pricescope-pending-transcript-batch" : "pricescope-pending-transcript", text); window.location.hash = ""; window.location.reload(); } };
  $("applyTranscript").onclick = () => sendTranscript(false); $("applyTranscriptBatch").onclick = () => sendTranscript(true);
} else {
  window.addEventListener("message", async event => { if (event.data?.type === "pricescope-transcript") { openDialog(null, null, event.data.text); applyTranscript(event.data.text); showToast("Transcript applied. Review the recognized fields and save."); } if (event.data?.type === "pricescope-transcript-batch") { const items = transcriptRecords(event.data.text); const added = items.map(item => { openDialog(null, null, item.text); applyTranscript(item.text); const record = recordFromForm(); if (item.weight) record.weight = item.weight; if (item.price) { record.packPrice = item.price; record.priceKg = item.weight ? item.price / item.weight : item.price; record.priceUsdKg = record.priceKg / (FX_TO_USD[record.currency] || 1); record.industryPrice = record.priceKg * (1 - record.margin / 100); } if (item.protein) record.protein = item.protein; if (item.product) record.product = item.product; if (item.subProduct) record.subProduct = item.subProduct; closeDialog(); return record; }); try { await saveRecords(added); records = [...added, ...records]; render(); showToast(`${added.length} product record(s) added from transcript.`); } catch (error) { reportStorageError(error); } } });
}
let deferredPrompt; configureFormLabels(); window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); deferredPrompt = event; $("installBtn").hidden = false; }); $("installBtn").onclick = async () => { if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; $("installBtn").hidden = true; } }; if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
async function startApp() { try { await loadRecords(); render(); } catch (error) { reportStorageError(error); render(); } }
startApp();
