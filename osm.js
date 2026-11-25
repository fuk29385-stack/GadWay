(() => {
  const OVERPASS = "https://overpass-api.de/api/interpreter";
  const NOMINATIM = "https://nominatim.openstreetmap.org";
  const OVERPASS_STORAGE_PREFIX = "gadway-overpass-cache-v2:";
  const GEOCODE_STORAGE_PREFIX = "gadway-osm-cache:";
  const cache = new Map();
  let overpassQueue = Promise.resolve();
  let lastOverpassRequestAt = 0;
  let geocodeQueue = Promise.resolve();
  let lastGeocodeAt = 0;

  const categoryMap = [
    [["shop", "supermarket"], "Супермаркет", "🛒", "food"], [["shop", "convenience"], "Продуктовый магазин", "🛒", "food"],
    [["shop", "mall"], "Торговый центр", "🛍️", "shop"], [["shop", "*"], "Магазин", "🛍️", "shop"],
    [["amenity", "cafe"], "Кафе", "☕", "food"], [["amenity", "restaurant"], "Ресторан", "🍽️", "food"],
    [["amenity", "fast_food"], "Кафе быстрого питания", "🥡", "food"], [["amenity", "bar"], "Бар", "🍸", "food"],
    [["amenity", "pharmacy"], "Аптека", "💊", "health"], [["amenity", "clinic"], "Клиника", "⚕️", "health"],
    [["healthcare", "*"], "Медицинский центр", "⚕️", "health"], [["amenity", "hospital"], "Больница", "⚕️", "health"],
    [["amenity", "doctors"], "Врачебный кабинет", "⚕️", "health"], [["amenity", "dentist"], "Стоматология", "🦷", "health"],
    [["amenity", "bank"], "Банк", "🏦", "service"], [["amenity", "atm"], "Банкомат", "🏧", "service"],
    [["leisure", "fitness_centre"], "Фитнес-клуб", "🏋️", "sport"], [["leisure", "sports_centre"], "Спортивный центр", "🏟️", "sport"],
    [["leisure", "park"], "Парк", "🌳", "walk"], [["leisure", "playground"], "Детская площадка", "🛝", "walk"],
    [["tourism", "museum"], "Музей", "🏛️", "culture"], [["tourism", "attraction"], "Достопримечательность", "📍", "culture"],
    [["tourism", "hotel"], "Отель", "⌂", "hotel"], [["tourism", "hostel"], "Хостел", "⌂", "hotel"], [["tourism", "viewpoint"], "Смотровая площадка", "📸", "culture"],
    [["historic", "*"], "Историческое место", "🏛️", "culture"], [["amenity", "*"], "Место обслуживания", "📍", "service"]
  ];

  function category(tags = {}) {
    for (const [[key, value], label, icon, type] of categoryMap) {
      if (tags[key] && (value === "*" || tags[key] === value)) return { label, icon, type };
    }
    return { label: "Место", icon: "📍", type: "place" };
  }
  function idFor(element) {
    if (element.place_id) return String(element.place_id);
    const type = String(element.osm_type || element.type || "").toLowerCase();
    const id = element.osm_id ?? element.id;
    if (["node", "way", "relation"].includes(type) && id != null) return `osm:${type}:${id}`;
    const lat = Number(element.lat ?? element.center?.lat), lon = Number(element.lon ?? element.center?.lon);
    const name = String(element.name || element.tags?.name || "place").trim().toLocaleLowerCase("ru").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 48) || "place";
    return `osm:${name}:${lat.toFixed(5)}:${lon.toFixed(5)}`;
  }
  function coordinates(element) {
    return [Number(element.lat ?? element.center?.lat), Number(element.lon ?? element.center?.lon)];
  }
  function distanceMeters(a, b) {
    const rad = n => n * Math.PI / 180;
    const [lat1, lon1] = a.map(rad), [lat2, lon2] = b.map(rad);
    const h = Math.sin((lat2-lat1)/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin((lon2-lon1)/2)**2;
    return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1-h));
  }
  function toPlace(element) {
    const tags = element.tags || {}, [lat, lon] = coordinates(element), kind = category(tags);
    const social = Object.fromEntries(["instagram", "vk", "telegram", "youtube"].map(k => [k, tags[`contact:${k}`] || tags[k]]).filter(([,v]) => v));
    return {
      id: idFor(element), osm_type: element.osm_type || element.type, osm_id: element.osm_id ?? element.id,
      provider: "osm", name: tags["name:ru"] || tags.name || tags.brand || kind.label, tags,
      type: kind.type, icon: kind.icon, shortType: kind.label, category: kind.label,
      lat, lon, district: "Адрес загружается…", description: tags.description || "Данные OpenStreetMap",
      rating: "—", hours: tags.opening_hours || "График не указан", image: tags.image || "", website: tags.website || tags["contact:website"] || "",
      phone: tags.phone || tags["contact:phone"] || "", social
    };
  }
  async function fetchJson(url, options = {}, timeout = 5000) {
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (!response.ok) throw new Error(`OSM API: HTTP ${response.status}`);
      return await response.json();
    } finally { clearTimeout(timer); }
  }
  async function overpass(query) {
    const key = query.trim();
    if (cache.has(key)) return cache.get(key);
    const task = overpassQueue.then(async () => {
      const wait=Math.max(0,2000-(Date.now()-lastOverpassRequestAt));
      if(wait)await new Promise(resolve=>setTimeout(resolve,wait));
      lastOverpassRequestAt=Date.now();
      const result = await fetchJson(OVERPASS, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", Accept: "application/json" }, body: new URLSearchParams({ data: query }) }, 5000);
      cache.set(key, result.elements || []);
      if (cache.size > 35) cache.delete(cache.keys().next().value);
      return result.elements || [];
    });
    overpassQueue = task.catch(() => {});
    return task;
  }
  function aroundQuery(lat, lon, radius, limit = null) {
    const tags = "amenity|shop|leisure|tourism|historic|healthcare|office|craft|sport|public_transport|natural";
    return `[out:json][timeout:25];(nwr(around:${radius},${lat},${lon})[~"^(${tags})$"~"."];);out center tags${limit?" "+limit:""};`;
  }
  async function nearby(lat, lon, radius = 3000, limit = null) {
    const cellLat=Number(Number(lat).toFixed(2)),cellLon=Number(Number(lon).toFixed(2)),key=`${cellLat}:${cellLon}`;
    try{const saved=JSON.parse(localStorage.getItem(OVERPASS_STORAGE_PREFIX+key)||"null");if(saved?.elements&&Date.now()-saved.savedAt<6*60*60*1000)return saved.elements;}catch{}
    const elements=(await overpass(aroundQuery(cellLat.toFixed(2),cellLon.toFixed(2),Math.max(3500,radius),limit))).filter(el => el.tags && Object.keys(el.tags).some(k => ["amenity", "shop", "leisure", "tourism", "historic", "healthcare", "office", "craft", "sport", "public_transport", "natural", "emergency", "club", "attraction", "man_made", "place"].includes(k)));
    try{
      localStorage.setItem(OVERPASS_STORAGE_PREFIX+key,JSON.stringify({savedAt:Date.now(),elements}));
      const entries=Object.keys(localStorage).filter(k=>k.startsWith(OVERPASS_STORAGE_PREFIX)).map(k=>{try{return [k,JSON.parse(localStorage.getItem(k)||"null")?.savedAt||0];}catch{return [k,0];}}).sort((a,b)=>b[1]-a[1]);
      entries.slice(6).forEach(([oldKey])=>localStorage.removeItem(oldKey));
    }catch{}
    return elements;
  }
  async function findAt(lat, lon, radius = 25, preferredId = null) {
    const key=`point:${Number(lat).toFixed(5)}:${Number(lon).toFixed(5)}:${radius}`;
    let elements=cache.get(key);
    if(!elements){
      elements=await overpass(aroundQuery(Number(lat).toFixed(6),Number(lon).toFixed(6),Math.max(25,radius),100));
      cache.set(key,elements);
    }
    if(preferredId!=null){const preferred=elements.find(el=>String(el.id)===String(preferredId)||String(el.osm_id)===String(preferredId));if(preferred)return preferred;}
    const point=[Number(lat),Number(lon)];
    return elements.slice().sort((a,b)=>distanceMeters(point,coordinates(a))-distanceMeters(point,coordinates(b))).find(el=>distanceMeters(point,coordinates(el))<=radius+5)||null;
  }
  async function details(place) {
    if (!place?.osm_type || !place?.osm_id || !["node","way","relation"].includes(String(place.osm_type).toLowerCase())) return place;
    const type = String(place.osm_type).replace("osm:", "");
    const elements = await overpass(`[out:json][timeout:15];${type}(${Number(place.osm_id)});out center tags;`);
    return elements[0] ? toPlace(elements[0]) : place;
  }
  async function nominatim(params, persist=false) {
    const url = `${NOMINATIM}${params}`;
    if (cache.has(url)) return cache.get(url);
    const task = geocodeQueue.then(async () => {
      let previous=lastGeocodeAt;try{previous=Math.max(previous,Number(localStorage.getItem("gadway-last-nominatim-request"))||0);}catch{}
      const pause = Math.max(0, 1100 - (Date.now() - previous));
      if (pause) await new Promise(resolve => setTimeout(resolve, pause));
      lastGeocodeAt = Date.now();
      try{localStorage.setItem("gadway-last-nominatim-request",String(lastGeocodeAt));}catch{}
      const result = await fetchJson(url, { headers: { Accept: "application/json" }, referrerPolicy: "strict-origin-when-cross-origin" }, 5000);
      cache.set(url, result);
      if(persist)try {
        localStorage.setItem(GEOCODE_STORAGE_PREFIX+url,JSON.stringify({savedAt:Date.now(),result}));
        const entries=Object.keys(localStorage).filter(k=>k.startsWith(GEOCODE_STORAGE_PREFIX)).map(k=>{try{return [k,JSON.parse(localStorage.getItem(k)||"null")?.savedAt||0];}catch{return [k,0];}}).sort((a,b)=>b[1]-a[1]);
        entries.slice(100).forEach(([oldKey])=>localStorage.removeItem(oldKey));
      } catch {}
      return result;
    });
    geocodeQueue = task.catch(() => {});
    return task;
  }
  async function reverse(lat, lon) {
    const params = new URLSearchParams({ format: "jsonv2", lat: String(lat), lon: String(lon), addressdetails: "1", "accept-language": "ru" });
    const key = `${NOMINATIM}/reverse?${params}`;
    if (cache.has(key)) return cache.get(key);
    try {
      const stored = JSON.parse(localStorage.getItem(GEOCODE_STORAGE_PREFIX + key) || "null");
      if (stored?.result && Date.now() - stored.savedAt < 30 * 86400000) { cache.set(key, stored.result); return stored.result; }
    } catch {}
    return nominatim(`/reverse?${params}`,true);
  }
  async function search(query) {
    const params = new URLSearchParams({ format: "jsonv2", q: query, limit: "8", addressdetails: "1", namedetails: "1", "accept-language": "ru" });
    const result = await nominatim(`/search?${params}`);
    return (Array.isArray(result) ? result : []).map(item => {
      const place=toPlace({ type: ({N:"node",W:"way",R:"relation"})[item.osm_type] || item.osm_type, id: item.osm_id, lat: Number(item.lat), lon: Number(item.lon), tags: { name: item.name || String(item.display_name || "").split(",")[0], ...(item.class ? { [item.class]: item.type } : {}), ...item.namedetails } });
      place.display_name=item.display_name||"";place.address=addressLabel(item.address||{});return place;
    });
  }
  function addressLabel(address = {}) {
    return [
      [address.road || address.pedestrian || address.footway, address.house_number].filter(Boolean).join(", "),
      address.neighbourhood || address.suburb || address.city_district || address.county,
      address.city || address.town || address.village || address.municipality
    ].filter(Boolean).join(", ");
  }
  function cityName(result) {
    const a = result?.address || {};
    return a.city || a.town || a.municipality || a.village || a.county || "Рядом с вами";
  }
  function openingStatus(value, now = new Date()) {
    if (!value) return "График не указан";
    if (value === "24/7") return "Открыто";
    const dayMap = {Mo:1,Tu:2,We:3,Th:4,Fr:5,Sa:6,Su:0}, day = now.getDay(), minute = now.getHours()*60+now.getMinutes();
    for (const raw of value.split(";")) {
      const rule = raw.trim(); if (!rule) continue;
      const days = rule.match(/^(Mo|Tu|We|Th|Fr|Sa|Su)(?:-(Mo|Tu|We|Th|Fr|Sa|Su))?/);
      if (days) {
        const start=dayMap[days[1]], end=dayMap[days[2]||days[1]], active=start<=end?day>=start&&day<=end:day>=start||day<=end;
        if (!active) continue;
      }
      if (/\b(off|closed)\b/i.test(rule)) return "Закрыто";
      const ranges=[...rule.matchAll(/(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/g)];
      if (!ranges.length) return "Режим работы уточняйте";
      const parse=t=>Number(t.slice(0,2))*60+Number(t.slice(3));
      if (ranges.some(([,from,to])=>{const start=parse(from),end=parse(to);return start<=end?minute>=start&&minute<end:minute>=start||minute<end;}))return "Открыто";
    }
    return "Закрыто";
  }
  async function photos(lat, lon, radius=60, tags={}) {
    const found=[];
    if(/^https?:\/\//i.test(tags.image||""))found.push({url:tags.image,title:tags.name||"Фото объекта",source:"OpenStreetMap",link:tags.image});
    let commonsFile=tags.wikimedia_commons||(/^file:/i.test(tags.image||"")?tags.image:"");
    if(tags.wikidata){
      try{
        const data=await fetchJson(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${encodeURIComponent(tags.wikidata)}&props=claims&format=json&origin=*`);
        commonsFile=data.entities?.[tags.wikidata]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value||commonsFile;
      }catch{}
    }
    if(commonsFile){
      try{
        const file=String(commonsFile).replace(/^File:/i,"");
        const data=await fetchJson(`https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent("File:"+file)}&prop=imageinfo&iiprop=url&iiurlwidth=720&format=json&origin=*`);
        const page=Object.values(data.query?.pages||{})[0],image=page?.imageinfo?.[0];
        if(image?.thumburl||image?.url)found.push({url:image.thumburl||image.url,title:page.title,source:"Wikimedia Commons",link:image.descriptionurl});
      }catch{}
    }
    try {
      const url=new URL("https://commons.wikimedia.org/w/api.php");
      Object.entries({action:"query",generator:"geosearch",gscoord:`${lat}|${lon}`,gsradius:String(Math.min(10000,radius)),gsnamespace:"6",gsrlimit:"8",prop:"imageinfo",iiprop:"url",iiurlwidth:"720",format:"json",origin:"*"}).forEach(([k,v])=>url.searchParams.set(k,v));
      const data=await fetchJson(url.toString());
      for(const page of Object.values(data.query?.pages||{})){const image=page.imageinfo?.[0];if(image?.thumburl||image?.url)found.push({url:image.thumburl||image.url,title:page.title,source:"Wikimedia Commons",link:page.descriptionurl});}
    } catch {}
    try {
      const url=`https://api.panoramax.xyz/api/search?place_position=${lon},${lat}&place_distance=0-${radius}`;
      const data=await fetchJson(url);
      for(const feature of data.features||[]){const p=feature.properties||{},image=p.thumbnail||p.preview||p.assets?.thumbnail?.href||p.assets?.preview?.href;if(image)found.push({url:image,title:p.title||"Фото Panoramax",source:"Panoramax",link:feature.id});}
    } catch {}
    return found;
  }
  window.GadWayOSM = { idFor, category, toPlace, coordinates, distanceMeters, nearby, findAt, details, reverse, search, addressLabel, cityName, openingStatus, photos };
})();
