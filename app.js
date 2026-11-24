(function () {
  "use strict";

  const cityCenter = [59.9386, 30.3141];
  const places = [
    {id:"hermitage",name:"Государственный Эрмитаж",type:"culture",icon:"🏛️",shortType:"Музей",district:"Дворцовая набережная",lat:59.9398,lon:30.3146,rating:"4,9",hours:"Вт, чт–вс · примерно 11:00–18:00",visit:"2–3 часа",distance:"Главная музейная коллекция города",image:"https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=600&q=80",description:"Зимний дворец на берегу Невы и одна из крупнейших художественных коллекций мира. На осмотр стоит заложить несколько часов; расписание и входные билеты лучше проверить перед визитом."},
    {id:"isaac",name:"Исаакиевский собор",type:"photo",icon:"📸",shortType:"Архитектура",district:"Исаакиевская площадь",lat:59.9321,lon:30.3061,rating:"4,9",hours:"Ежедневно · расписание зависит от сезона",visit:"1–1,5 часа",distance:"Колоннада открывает вид на центр Петербурга",image:"https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=600&q=80",description:"Монументальный собор на Исаакиевской площади. Если подняться на колоннаду, можно увидеть исторический центр с высоты. Часы работы и доступ на колоннаду уточняйте заранее."},
    {id:"new-holland",name:"Остров Новая Голландия",type:"walk",icon:"🌿",shortType:"Прогулка",district:"Адмиралтейский район",lat:59.9293,lon:30.2917,rating:"4,8",hours:"Ежедневно · общественные пространства",visit:"1–2 часа",distance:"Парк, архитектура и места для отдыха",image:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",description:"Исторический остров с кирпичной аркой, зелёным газоном и культурными площадками. Хорошее место, чтобы передохнуть между прогулками по центру."},
    {id:"summer-garden",name:"Летний сад",type:"walk",icon:"🌳",shortType:"Прогулка",district:"У набережной Фонтанки",lat:59.9442,lon:30.3353,rating:"4,8",hours:"Сезонный график · проверьте перед посещением",visit:"1–1,5 часа",distance:"Тихие аллеи, фонтаны и скульптуры",image:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=600&q=80",description:"Сад у Летнего дворца Петра I с прямыми аллеями, фонтанами и мраморными скульптурами. Вход и часы работы зависят от сезона и погодных условий."},
    {id:"spit",name:"Стрелка Васильевского острова",type:"photo",icon:"📸",shortType:"Фото-место",district:"У Биржевой площади",lat:59.9447,lon:30.3065,rating:"4,9",hours:"Открытое городское пространство",visit:"30–45 минут",distance:"Панорама Невы и Петропавловской крепости",image:"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",description:"Одна из лучших открытых панорам города: Нева, Дворцовая набережная и Петропавловская крепость. Особенно красиво на закате и в период белых ночей."},
    {id:"palkin",name:"Ресторан «Палкинъ»",type:"food",icon:"🍽️",shortType:"Ресторан",district:"Невский проспект",lat:59.9346,lon:30.3397,rating:"4,7",hours:"Время работы проверьте перед визитом",visit:"1–2 часа",distance:"Историческая русская кухня",image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",description:"Ресторан на Невском проспекте с историческим интерьером и русской кухней. Для вечернего визита лучше заранее уточнить часы и наличие столиков."},
    {id:"bonch",name:"Bonch",type:"food",icon:"☕",shortType:"Кофейня",district:"У Казанского собора",lat:59.9341,lon:30.3237,rating:"4,6",hours:"Часы работы уточните перед визитом",visit:"30–60 минут",distance:"Кофе и лёгкий завтрак в центре",image:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",description:"Уютная остановка для кофе и завтрака рядом с Казанским собором. Удобно заглянуть сюда во время прогулки по Невскому проспекту."},
    {id:"mikhailovsky",name:"Михайловский сад",type:"walk",icon:"🌿",shortType:"Прогулка",district:"У Русского музея",lat:59.9381,lon:30.3316,rating:"4,8",hours:"Открытое пространство · сезонный режим",visit:"30–60 минут",distance:"Зелёный маршрут между музеями",image:"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80",description:"Зелёный сад рядом с Русским музеем и храмом Спаса на Крови. Можно продолжить прогулку к Марсову полю или набережной канала Грибоедова."}
  ];

  const hotels = [
    {id:"astoria",name:"Отель «Астория»",type:"5 звёзд · исторический отель",district:"Исаакиевская площадь",lat:59.9327,lon:30.3065,rating:"4,8",price:23000,center:"В самом центре",image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",description:"Исторический отель на Исаакиевской площади рядом с главными достопримечательностями центра."},
    {id:"helvetia",name:"Гельвеция",type:"4 звезды · бутик-отель",district:"Литейный проспект",lat:59.9316,lon:30.3574,rating:"4,8",price:16500,center:"Около 1,5 км до центра",image:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",description:"Бутик-отель в историческом здании на Литейном проспекте, недалеко от Невского."},
    {id:"domina",name:"Domina Санкт-Петербург",type:"5 звёзд · современный комфорт",district:"Набережная реки Мойки",lat:59.9282,lon:30.3027,rating:"4,7",price:14500,center:"Около 1 км до центра",image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",description:"Отель на набережной Мойки, откуда удобно гулять к Исаакиевской площади и Новой Голландии."},
    {id:"indigo",name:"Indigo Санкт-Петербург — Чайковского",type:"4 звезды · видовые террасы",district:"У Летнего сада",lat:59.9467,lon:30.3498,rating:"4,7",price:12800,center:"Около 2 км до центра",image:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=600&q=80",description:"Отель в тихом районе недалеко от Летнего сада и набережной Невы."}
  ];

  const tips = [
    {id:"sunset-spit",placeId:"spit",tag:"ЛУЧШИЙ ВИД",area:"Васильевский остров",title:"Приходите на Стрелку к закату",text:"Найдите место у воды: отсюда особенно хорошо видны Дворцовый мост и Петропавловская крепость.",image:"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80"},
    {id:"morning-garden",placeId:"summer-garden",tag:"ТИХИЙ УГОЛОК",area:"Летний сад",title:"Начните прогулку пораньше",text:"Утром в саду спокойнее. Проверьте сезонное расписание и входы до того, как отправитесь в путь.",image:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=600&q=80"},
    {id:"new-holland-pause",placeId:"new-holland",tag:"ПЕРЕДЫШКА",area:"Новая Голландия",title:"Оставьте время без плана",text:"После музеев загляните на остров: можно просто посидеть у воды и решить, куда идти дальше.",image:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"},
    {id:"isaac-panorama",placeId:"isaac",tag:"СМОТРОВАЯ",area:"Исаакиевская площадь",title:"Посмотрите на город сверху",text:"Колоннада собора — известная обзорная точка. Уточните часы доступа и заранее оцените количество ступеней.",image:"https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=600&q=80"},
    {id:"bonch-stop",placeId:"bonch",tag:"КОФЕ-ПАУЗА",area:"Невский проспект",title:"Сделайте остановку на кофе",text:"Небольшая пауза помогает пройти центр пешком без спешки. Проверьте часы работы выбранной кофейни.",image:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80"},
    {id:"hermitage-plan",placeId:"hermitage",tag:"ПЛАНИРУЙТЕ ЗАРАНЕЕ",area:"Дворцовая набережная",title:"Не пытайтесь увидеть всё за раз",text:"Выберите несколько залов и оставьте время на перерыв. Билеты и расписание лучше проверить на официальном сайте музея.",image:"https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=600&q=80"}
  ];

  const placeById = new Map(places.map(place => [place.id, place]));
  const hotelById = new Map(hotels.map(hotel => [hotel.id, hotel]));
  const routeDefaults = [
    {placeId:"hermitage",time:"10:00",visited:false},
    {placeId:"isaac",time:"13:00",visited:false},
    {placeId:"new-holland",time:"15:30",visited:false}
  ];
  function readStorage(key,fallback) {
    try { const value=JSON.parse(localStorage.getItem(key)||"null");return value==null?fallback:value; }
    catch { return fallback; }
  }
  function saveStorage(key,value) {
    try { localStorage.setItem(key,JSON.stringify(value));return true; }
    catch { showToast("Не удалось сохранить изменения на устройстве.");return false; }
  }
  function escapeHtml(value) {
    return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  }
  const storedRoute=readStorage("gadway-spb-route",null);
  let routeItems=Array.isArray(storedRoute)?storedRoute.filter(item=>item&&placeById.has(item.placeId)).map(item=>({placeId:item.placeId,time:/^\d{2}:\d{2}$/.test(item.time)?item.time:"10:00",visited:Boolean(item.visited)})):routeDefaults.map(item=>({...item}));
  routeItems=routeItems.filter((item,index,array)=>array.findIndex(candidate=>candidate.placeId===item.placeId)===index);
  let activeTab="map";
  let filter="all";
  let query="";
  let selectedPlaceId=null;
  let selectedHotelId=null;
  let maxBudget=25000;
  let tipIndex=0;
  let tipHistory=[];
  let currentUserLocation=null;
  let toastTimer=0;
  let wikipediaRequest=0;
  const markerById=new Map();
  let leafletMap=null;
  let routeLine=null;
  const appShell=document.querySelector("#app-shell");
  const sheet=document.querySelector("#bottom-sheet");
  const sheetScroll=document.querySelector("#sheet-content");
  const toast=document.querySelector("#toast");

  function showToast(message) {
    toast.textContent=message;toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);toastTimer=window.setTimeout(()=>toast.classList.remove("is-visible"),2600);
  }
  function imageFallbacks(root=document) {
    root.querySelectorAll("img[data-fallback]").forEach(img=>{
      if (img.dataset.fallbackBound) return;
      img.dataset.fallbackBound = "true";
      img.addEventListener("error", () => {
        if (img.dataset.fallbackTried) {
          img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><rect width="640" height="400" fill="#dce5dd"/><path d="M0 330 180 170l100 95 100-135 260 200v70H0z" fill="#b7c9bd"/><circle cx="465" cy="105" r="38" fill="#f4e5b6"/></svg>');
          img.classList.add("image-fallback");
          img.onerror = null;
          return;
        }
        img.dataset.fallbackTried = "true";
        const fallback = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&q=75";
        if (img.src !== fallback) img.src = fallback;
      });
    });
  }
  function formatPrice(value) { return new Intl.NumberFormat("ru-RU").format(value)+" ₽"; }
  function pluralPlaces(value) { const n=value%100,unit=value%10;return n>10&&n<20?value+" мест":unit===1?value+" место":unit>1&&unit<5?value+" места":value+" мест"; }
  function distanceKm(a,b) {
    const toRad=value=>value*Math.PI/180,lat1=toRad(a[0]),lat2=toRad(b[0]);
    const dLat=lat2-lat1,dLon=toRad(b[1]-a[1]);
    const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
    return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));
  }
  function escapeTime(value) { return escapeHtml(value); }
  function filteredPlaces() {
    const normalized=query.trim().toLocaleLowerCase("ru");
    return places.filter(place=>(filter==="all"||place.type===filter)&&(!normalized||(place.name+" "+place.district+" "+place.description+" "+place.shortType).toLocaleLowerCase("ru").includes(normalized)));
  }

  function iconFor(type) { return type==="hotel"?"⌂":type==="food"?"☕":"✦"; }
  function createPin(type,icon,label) {
    return L.divIcon({className:"custom-pin-wrap",html:'<span class="map-pin '+escapeHtml(type)+'" title="'+escapeHtml(label)+'"><span class="pin-icon">'+icon+'</span></span>',iconSize:[42,48],iconAnchor:[21,45]});
  }
  function initMap() {
    if(!window.L){appShell.classList.add("map-offline");document.querySelector("#map-caption").innerHTML='<span class="caption-dot"></span><span>Карта недоступна офлайн</span>';return;}
    leafletMap=L.map("map",{zoomControl:false,attributionControl:false,preferCanvas:true}).setView(cityCenter,13);
    const tiles=L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:20,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(leafletMap);
    const mapFallback=document.querySelector("#map-fallback");
    tiles.once("load",()=>{if(!appShell.classList.contains("map-tiles-error"))mapFallback.hidden=true;});
    tiles.on("tileerror",()=>{appShell.classList.add("map-tiles-error");mapFallback.hidden=false;});
    tiles.on("tileload",()=>{appShell.classList.remove("map-tiles-error");mapFallback.hidden=true;});
    places.forEach(place=>{
      const marker=L.marker([place.lat,place.lon],{icon:createPin(place.type,place.icon||iconFor(place.type),place.name),keyboard:true,title:place.name}).addTo(leafletMap);
      marker.on("click",()=>openPlace(place.id,true));markerById.set(place.id,marker);
    });
    hotels.forEach(hotel=>{
      const marker=L.marker([hotel.lat,hotel.lon],{icon:createPin("hotel","⌂",hotel.name),keyboard:true,title:hotel.name}).addTo(leafletMap);
      marker.on("click",()=>openHotel(hotel.id,true));markerById.set(hotel.id,marker);
    });
    leafletMap.on("click",()=>{if(selectedPlaceId){selectedPlaceId=null;renderPlaces();}});
    window.setTimeout(()=>leafletMap&&leafletMap.invalidateSize(),80);
    updateMapLayers();
  }

  function updateMapLayers() {
    if(!leafletMap)return;
    const visiblePlaces=new Set(filteredPlaces().map(place=>place.id));
    const visibleHotels=new Set(hotels.filter(hotel=>hotel.price<=maxBudget).map(hotel=>hotel.id));
    markerById.forEach((marker,id)=>{
      const shouldShow=activeTab==="hotels"?visibleHotels.has(id):activeTab==="route"?routeItems.some(item=>item.placeId===id):activeTab==="tips"?Boolean(tips[tipIndex]&&tips[tipIndex].placeId===id||routeItems.some(item=>item.placeId===id)):visiblePlaces.has(id)||(filter==="all"&&!query&&hotelById.has(id));
      const isVisible=leafletMap.hasLayer(marker);
      if(shouldShow&&!isVisible)marker.addTo(leafletMap);
      else if(!shouldShow&&isVisible)leafletMap.removeLayer(marker);
    });
    if(activeTab==="route")drawRouteLine();else if(routeLine){leafletMap.removeLayer(routeLine);routeLine=null;}
  }
  function drawRouteLine() {
    if(!leafletMap)return;
    const points=routeItems.map(item=>placeById.get(item.placeId)).filter(Boolean).map(place=>[place.lat,place.lon]);
    if(routeLine){leafletMap.removeLayer(routeLine);routeLine=null;}
    if(points.length>1)routeLine=L.polyline(points,{color:"#317e61",weight:4,opacity:.88,dashArray:"2 9",lineCap:"round",lineJoin:"round"}).addTo(leafletMap);
    if(points.length>1)leafletMap.fitBounds(points,{paddingTopLeft:[35,95],paddingBottomRight:[35,Math.round(window.innerHeight*.4)],maxZoom:14,animate:true,duration:.55});
  }
  function updateSelectedMarker(id) {
    markerById.forEach((marker,key)=>{
      const element=marker.getElement();const pin=element&&element.querySelector(".map-pin");
      if(pin)pin.classList.toggle("is-selected",key===id);
    });
  }
  function flyTo(coords,zoom=15) { if(leafletMap)leafletMap.flyTo(coords,zoom,{duration:.8,easeLinearity:.25}); }

  function renderPlaces() {
    const detail=document.querySelector("#place-detail"),list=document.querySelector("#place-list"),sectionRow=document.querySelector("#panel-map .section-row"),chips=document.querySelector("#filter-chips"),search=document.querySelector(".search-box");
    if(selectedPlaceId&&placeById.has(selectedPlaceId)) {
      const place=placeById.get(selectedPlaceId);
      sectionRow.hidden=true;chips.hidden=true;search.hidden=true;list.hidden=true;detail.hidden=false;
      document.querySelector("#sheet-kicker").textContent=place.shortType.toLocaleUpperCase("ru");
      document.querySelector("#sheet-title").textContent=place.name;
      document.querySelector("#sheet-summary").textContent=place.district+" · ★ "+place.rating;
      document.querySelector("#map-caption").innerHTML='<span class="caption-dot"></span><span>'+escapeHtml(place.name)+'</span><span class="caption-separator">·</span><span>'+escapeHtml(place.district)+'</span>';
      detail.innerHTML='<div class="detail-hero"><img data-fallback src="'+escapeHtml(place.image)+'" alt="Вид места: '+escapeHtml(place.name)+'"><button class="detail-back" type="button" data-action="back-place" aria-label="Назад">‹</button></div><div class="detail-copy"><div class="card-meta"><span class="card-rating">★ '+escapeHtml(place.rating)+'</span><span>·</span><span>'+escapeHtml(place.shortType)+'</span></div><h2>'+escapeHtml(place.name)+'</h2><p>'+escapeHtml(place.description)+'</p><div class="detail-facts"><span class="fact-pill">◷ '+escapeHtml(place.hours)+'</span><span class="fact-pill">⌖ '+escapeHtml(place.visit)+'</span></div><p>'+escapeHtml(place.distance)+'</p><button class="primary-button full-button" type="button" data-action="add-place" data-id="'+escapeHtml(place.id)+'">＋ Добавить в маршрут</button></div>';
      detail.querySelector(".detail-copy").insertAdjacentHTML("beforeend",'<div class="wiki-info" aria-live="polite"><span class="wiki-spinner" aria-hidden="true"></span><span>Загружаем дополнительные сведения…</span></div>');
      imageFallbacks(detail);updateSelectedMarker(place.id);loadWikipediaSummary(place);return;
    }
    sectionRow.hidden=false;chips.hidden=false;search.hidden=false;list.hidden=false;detail.hidden=true;
    document.querySelector("#sheet-kicker").textContent="ВАШ ГОРОДСКОЙ ГИД";
    document.querySelector("#sheet-title").textContent="Исследуйте Петербург";
    document.querySelector("#sheet-summary").textContent="Красивые места, прогулки и маленькие открытия рядом.";
    document.querySelector("#map-caption").innerHTML='<span class="caption-dot"></span><span>Исаакиевский собор</span><span class="caption-separator">·</span><span>центр города</span>';
    const visible=filteredPlaces();
    document.querySelector("#result-count").textContent=visible.length+" мест";
    list.innerHTML=visible.length?visible.map(place=>'<article class="place-card" data-place-card="'+escapeHtml(place.id)+'"><img class="card-image" data-fallback src="'+escapeHtml(place.image)+'" alt="'+escapeHtml(place.name)+'" loading="lazy"><div class="card-copy"><p class="card-meta"><span class="card-rating">★ '+escapeHtml(place.rating)+'</span><span>·</span><span>'+escapeHtml(place.shortType)+'</span></p><h3 class="card-title">'+escapeHtml(place.name)+'</h3><p class="card-subtitle">'+escapeHtml(place.district)+' · '+escapeHtml(place.visit)+'</p><div class="card-actions"><button class="mini-button" type="button" data-action="add-place" data-id="'+escapeHtml(place.id)+'">＋ В маршрут</button><span class="card-distance">Открыть ›</span></div></div></article>').join(""):'<p class="empty-message">Ничего не найдено. Попробуйте другое слово или фильтр.</p>';
    imageFallbacks(list);updateSelectedMarker(null);updateMapLayers();
  }

  function openPlace(id,focusMap) {
    const place=placeById.get(id);if(!place)return;
    selectedPlaceId=id;selectedHotelId=null;
    setTab("map",false);renderPlaces();setSheetState("half");
    if(focusMap)flyTo([place.lat,place.lon],16);
  }
  async function loadWikipediaSummary(place) {
    const requestId=++wikipediaRequest;
    async function fetchSummary(language) {
      const endpoint="https://"+language+".wikipedia.org/w/api.php?"+new URLSearchParams({action:"query",generator:"search",gsrsearch:place.name,gsrlimit:"1",prop:"extracts",exintro:"1",explaintext:"1",format:"json",origin:"*"});
      try {
        const response=await fetch(endpoint,{headers:{Accept:"application/json"}});
        if(!response.ok)return "";
        const payload=await response.json();
        const page=Object.values(payload?.query?.pages||{})[0];
        return typeof page?.extract==="string"?page.extract.trim().slice(0,700):"";
      } catch { return ""; }
    }
    let summary=await fetchSummary("ru");
    if(!summary)summary=await fetchSummary("en");
    if(requestId!==wikipediaRequest||selectedPlaceId!==place.id)return;
    const target=document.querySelector("#place-detail .wiki-info");
    if(!target)return;
    target.innerHTML=summary?'<strong>Из Википедии</strong><p>'+escapeHtml(summary)+'</p>':'<span>Дополнительные сведения сейчас недоступны.</span>';
  }
  function addRouteStop(id) {
    if(!placeById.has(id))return false;
    if(routeItems.some(item=>item.placeId===id)){showToast("Это место уже есть в маршруте.");return false;}
    const nextHour=Math.min(20,10+routeItems.length*2);const time=String(nextHour).padStart(2,"0")+":00";
    routeItems.push({placeId:id,time,visited:false});persistRoute();renderRoute();updateBadge();showToast("Добавили «"+placeById.get(id).name+"» в маршрут");return true;
  }
  function persistRoute() { saveStorage("gadway-spb-route",routeItems); }
  function renderRoute() {
    const valid=routeItems.filter(item=>placeById.has(item.placeId));
    routeItems=valid;
    persistRoute();
    const list=document.querySelector("#route-list");
    document.querySelector("#route-summary").textContent=valid.length?pluralPlaces(valid.length)+" · маршрут можно менять":"Начните с любимых мест и соберите свой план";
    if(!valid.length){
      document.querySelector("#route-stats").innerHTML="";
      list.innerHTML='<div class="empty-message route-empty">Маршрут пока пуст. Добавьте места с карты или из советов — они появятся здесь.</div>';
      updateMapLayers();return;
    }
    let totalKm=0,totalMinutes=0;
    const routePlaces=valid.map(item=>placeById.get(item.placeId));
    const legs=routePlaces.map((place,index)=>{
      if(index===routePlaces.length-1)return null;
      const km=distanceKm([place.lat,place.lon],[routePlaces[index+1].lat,routePlaces[index+1].lon]);
      const minutes=Math.max(4,Math.round(km/4.5*60));totalKm+=km;totalMinutes+=minutes;return{km,minutes};
    });
    document.querySelector("#route-stats").innerHTML='<div class="route-stat"><strong>'+valid.length+'</strong><small>места</small></div><div class="route-stat"><strong>'+totalKm.toFixed(1)+' км</strong><small>в пути</small></div><div class="route-stat"><strong>'+totalMinutes+' мин</strong><small>пешком</small></div>';
    list.innerHTML=valid.map((item,index)=>{
      const place=placeById.get(item.placeId),leg=legs[index];
      return '<article class="route-stop '+(item.visited?'is-visited':'')+'" data-route-index="'+index+'"><label class="stop-marker" title="'+(item.visited?'Посещено':'Не посещено')+'"><input class="stop-check" type="checkbox" data-action="visit" data-index="'+index+'" '+(item.visited?'checked':'')+' aria-label="Отметить как посещённое место: '+escapeHtml(place.name)+'"><span>'+(index+1)+'</span></label><div class="stop-copy"><span class="stop-time">'+escapeTime(item.time)+'</span><strong>'+escapeHtml(place.name)+'</strong><small>'+escapeHtml(place.district)+(leg?' · далее '+leg.km.toFixed(1)+' км, '+leg.minutes+' мин пешком':' · последняя точка маршрута')+'</small></div><div class="stop-tools"><button type="button" data-action="move-up" data-index="'+index+'" aria-label="Переместить выше" '+(index===0?'disabled':'')+'>↑</button><button type="button" data-action="move-down" data-index="'+index+'" aria-label="Переместить ниже" '+(index===valid.length-1?'disabled':'')+'>↓</button><button type="button" data-action="remove-stop" data-index="'+index+'" aria-label="Удалить '+escapeHtml(place.name)+'">×</button></div></article>';
    }).join("");
    updateMapLayers();
  }
  function updateBadge() {
    const badge=document.querySelector("#route-badge");badge.hidden=routeItems.length===0;badge.title=routeItems.length+" места в маршруте";
  }
  function routeAction(action,index) {
    const i=Number(index);if(!Number.isInteger(i)||i<0||i>=routeItems.length)return;
    if(action==="visit")routeItems[i].visited=!routeItems[i].visited;
    if(action==="remove-stop")routeItems.splice(i,1);
    if(action==="move-up"&&i>0)[routeItems[i-1],routeItems[i]]=[routeItems[i],routeItems[i-1]];
    if(action==="move-down"&&i<routeItems.length-1)[routeItems[i+1],routeItems[i]]=[routeItems[i],routeItems[i+1]];
    renderRoute();updateBadge();
  }

  function renderHotels() {
    const filtered=hotels.filter(hotel=>hotel.price<=maxBudget);
    document.querySelector("#budget-value").textContent="до "+formatPrice(maxBudget);
    document.querySelector("#hotel-list").innerHTML=filtered.length?filtered.map(hotel=>'<article class="hotel-card '+(selectedHotelId===hotel.id?'is-selected':'')+'" data-hotel="'+escapeHtml(hotel.id)+'"><img class="card-image" data-fallback src="'+escapeHtml(hotel.image)+'" alt="'+escapeHtml(hotel.name)+'" loading="lazy"><div class="hotel-copy"><p class="hotel-stars">★★★★★ <span class="card-rating">'+escapeHtml(hotel.rating)+'</span></p><h3 class="card-title">'+escapeHtml(hotel.name)+'</h3><p class="card-subtitle">'+escapeHtml(hotel.type)+' · '+escapeHtml(hotel.district)+'</p><div class="hotel-price">от '+formatPrice(hotel.price)+' <small>/ ночь</small></div><div class="hotel-actions"><span class="hotel-distance">'+escapeHtml(hotel.center)+'</span><button class="mini-button" type="button" data-action="book" data-id="'+escapeHtml(hotel.id)+'">Подробнее</button></div></div></article>').join(""):'<p class="empty-message">В этом бюджете отелей не нашлось. Передвиньте ползунок, чтобы увидеть другие варианты.</p>';
    imageFallbacks(document.querySelector("#hotel-list"));updateMapLayers();
  }
  function openHotel(id,focusMap) {
    const hotel=hotelById.get(id);if(!hotel)return;
    selectedHotelId=id;setTab("hotels",false);renderHotels();document.querySelector("#map-caption").innerHTML='<span class="caption-dot"></span><span>'+escapeHtml(hotel.name)+'</span><span class="caption-separator">·</span><span>'+escapeHtml(hotel.district)+'</span>';setSheetState("half");
    document.querySelectorAll(".hotel-card").forEach(card=>card.classList.toggle("is-selected",card.dataset.hotel===id));
    if(focusMap)flyTo([hotel.lat,hotel.lon],16);
  }
  function showBooking(id) {
    const hotel=hotelById.get(id);if(!hotel)return;
    document.querySelector("#booking-title").textContent=hotel.name;
    document.querySelector("#booking-description").textContent=hotel.description;
    document.querySelector("#booking-facts").innerHTML='<div class="booking-fact"><small>Примерная цена</small><strong>от '+formatPrice(hotel.price)+' / ночь</strong></div><div class="booking-fact"><small>Район</small><strong>'+escapeHtml(hotel.district)+'</strong></div><div class="booking-fact"><small>Рейтинг</small><strong>★ '+escapeHtml(hotel.rating)+'</strong></div><div class="booking-fact"><small>Расположение</small><strong>'+escapeHtml(hotel.center)+'</strong></div>';
    document.querySelector("#booking-dialog").showModal();
  }

  function renderTips() {
    const stage=document.querySelector("#tip-stage"),progress=document.querySelector("#tip-progress");
    if(tipIndex>=tips.length){
      stage.innerHTML='<div class="tips-done"><div><div class="done-icon">✓</div><h3>Вы посмотрели все советы</h3><p>Отличная подготовка к прогулке по Петербургу.</p><button class="primary-button" type="button" data-action="restart-tips">Посмотреть заново</button></div></div>';
      progress.innerHTML="";document.querySelector("#tip-undo").disabled=tipHistory.length===0;updateMapLayers();return;
    }
    stage.innerHTML=tips.slice(tipIndex,tipIndex+3).map((tip,index)=>'<article class="tip-card '+(index===0?'is-top':index===1?'is-next':'is-last')+'" data-tip-id="'+escapeHtml(tip.id)+'"><img data-fallback src="'+escapeHtml(tip.image)+'" alt="'+escapeHtml(tip.title)+'" draggable="false"><div class="tip-shade"></div><span class="tip-tag">'+escapeHtml(tip.tag)+'</span><span class="swipe-label swipe-like">В МАРШРУТ ♥</span><span class="swipe-label swipe-skip">ПРОПУСТИТЬ</span><div class="tip-content"><p>'+escapeHtml(tip.area)+'</p><h3>'+escapeHtml(tip.title)+'</h3><small>'+escapeHtml(tip.text)+'</small></div></article>').join("");
    progress.innerHTML=tips.map((tip,index)=>'<span class="'+(index===tipIndex?'is-active':'')+'"></span>').join("");
    document.querySelector("#tip-undo").disabled=tipHistory.length===0;
    imageFallbacks(stage);updateMapLayers();
  }
  function decideTip(liked) {
    if(tipIndex>=tips.length)return;
    const tip=tips[tipIndex],wasInRoute=routeItems.some(item=>item.placeId===tip.placeId);
    const historyEntry={index:tipIndex,liked,wasInRoute,tipId:tip.id};
    if(liked&&!wasInRoute){const h=10+routeItems.length*2;historyEntry.routeItem={placeId:tip.placeId,time:String(Math.min(20,h)).padStart(2,"0")+":00",visited:false};routeItems.push(historyEntry.routeItem);persistRoute();renderRoute();updateBadge();}
    tipHistory.push(historyEntry);
    tipIndex++;renderTips();
    if(liked)showToast(wasInRoute?"Это место уже есть в маршруте":"«"+placeById.get(tip.placeId).name+"» добавлено в маршрут");
  }
  function undoTip() {
    const last=tipHistory.pop();if(!last)return;
    tipIndex=last.index;
    if(last.routeItem){const index=routeItems.indexOf(last.routeItem);if(index!==-1){routeItems.splice(index,1);persistRoute();renderRoute();updateBadge();}}
    renderTips();showToast("Вернули предыдущую карточку");
  }
  function restartTips() { tipIndex=0;tipHistory=[];renderTips(); }

  const tabContent={map:document.querySelector("#panel-map"),route:document.querySelector("#panel-route"),hotels:document.querySelector("#panel-hotels"),tips:document.querySelector("#panel-tips")};
  const tabText={
    map:{kicker:"ВАШ ГОРОДСКОЙ ГИД",title:"Исследуйте Петербург",summary:"Красивые места, прогулки и маленькие открытия рядом."},
    route:{kicker:"ПЛАН НА СЕГОДНЯ",title:"Ваш маршрут",summary:"Меняйте порядок остановок и отмечайте посещённое."},
    hotels:{kicker:"КОМФОРТНОЕ ПУТЕШЕСТВИЕ",title:"Где остановиться",summary:"Подберите отель рядом с местами, которые хотите увидеть."},
    tips:{kicker:"МЕСТНЫЕ ПОДСКАЗЫВАЮТ",title:"Советы Петербурга",summary:"Листайте карточки и сохраняйте идеи в маршрут."}
  };
  function setTab(tab,openSheet=true) {
    if(!tabContent[tab])return;
    activeTab=tab;
    Object.entries(tabContent).forEach(([name,element])=>{element.hidden=name!==tab;});
    document.querySelectorAll(".nav-item").forEach(button=>{const active=button.dataset.tab===tab;button.classList.toggle("is-active",active);if(active)button.setAttribute("aria-current","page");else button.removeAttribute("aria-current");});
    document.querySelector("#sheet-kicker").textContent=tabText[tab].kicker;
    document.querySelector("#sheet-title").textContent=tabText[tab].title;
    document.querySelector("#sheet-summary").textContent=tabText[tab].summary;
    if(tab!=="map"){selectedPlaceId=null;document.querySelector("#place-detail").hidden=true;document.querySelector("#place-list").hidden=false;document.querySelector("#filter-chips").hidden=false;document.querySelector(".search-box").hidden=false;document.querySelector("#panel-map .section-row").hidden=false;}
    sheetScroll.scrollTop=0;
    if(openSheet)setSheetState("half");
    updateMapLayers();
    if(leafletMap)window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>leafletMap&&leafletMap.invalidateSize({pan:false})));
  }

  function visibleFor(state) {
    const height=appShell.clientHeight||window.innerHeight;
    const full=Math.max(280,height-Math.max(74,parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"))||76));
    const peek=Math.min(146,Math.max(112,height*.17));
    return state==="peek"?Math.round(peek):state==="half"?Math.round(Math.min(full,Math.max(peek+50,height*.53))):Math.round(full);
  }
  function setSheetState(state) {
    sheet.dataset.state=state;
    const visible=visibleFor(state)+"px";sheet.style.setProperty("--sheet-visible",visible);appShell.style.setProperty("--sheet-visible",visible);appShell.classList.toggle("sheet-full",state==="full");
    document.querySelector("#sheet-handle").setAttribute("aria-expanded",String(state!=="peek"));
    if(state==="full")sheetScroll.scrollTop=0;
  }
  function nearestSheetState(visible,velocity=0) {
    const options=[{name:"peek",height:visibleFor("peek")},{name:"half",height:visibleFor("half")},{name:"full",height:visibleFor("full")}];
    if(Math.abs(velocity)>.45){const current=options.reduce((best,item)=>Math.abs(item.height-visible)<Math.abs(best.height-visible)?item:best);const index=options.indexOf(current);return options[Math.max(0,Math.min(2,index+(velocity<0?1:-1)))].name;}
    return options.reduce((best,item)=>Math.abs(item.height-visible)<Math.abs(best.height-visible)?item:best).name;
  }
  const handle=document.querySelector("#sheet-handle");
  const sheetHeading=document.querySelector(".sheet-heading");
  let sheetDrag=null;
  let suppressHandleClick=false;
  function startSheetDrag(event, fromContent=false) {
    if(event.button!==undefined&&event.button!==0)return;
    if(fromContent && sheetScroll.scrollTop>0)return;
    if(fromContent && event.target.closest("button,a,input,select,textarea,[data-action]"))return;
    sheetDrag={startY:event.clientY,lastY:event.clientY,lastTime:performance.now(),startVisible:visibleFor(sheet.dataset.state),velocity:0};
    sheetDrag.pointerId=event.pointerId;
    sheetDrag.target=event.currentTarget;
    sheetDrag.fromContent=fromContent;
    sheetDrag.moved=false;
    if(!fromContent){
      sheet.classList.add("is-dragging");
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch {}
      event.preventDefault();
    }
  }
  handle.addEventListener("pointerdown",event=>startSheetDrag(event));
  sheetHeading.addEventListener("pointerdown",event=>{ if(!window.matchMedia("(min-width: 900px)").matches&&!event.target.closest("button,a,input"))startSheetDrag(event); });
  sheetScroll.addEventListener("pointerdown",event=>{ if(sheetScroll.scrollTop===0)startSheetDrag(event,true); },{passive:true});
  function moveSheetDrag(event){
    if(!sheetDrag)return;
    const now=performance.now(),delta=event.clientY-sheetDrag.startY;
    if(sheetDrag.fromContent && delta< -5){sheetDrag=null;sheet.classList.remove("is-dragging");return;}
    if(sheetDrag.fromContent && delta>5){
      event.preventDefault();
      if(!sheetDrag.moved){
        sheetDrag.moved=true;
        sheet.classList.add("is-dragging");
        try { sheetScroll.setPointerCapture(event.pointerId); } catch {}
      }
    }
    if(sheetDrag.fromContent && !sheetDrag.moved)return;
    if(Math.abs(delta)>6)suppressHandleClick=true;
    const next=Math.max(visibleFor("peek"),Math.min(visibleFor("full"),sheetDrag.startVisible-delta));
    sheet.style.setProperty("--sheet-visible",next+"px");
    sheetDrag.velocity=(event.clientY-sheetDrag.lastY)/Math.max(1,now-sheetDrag.lastTime);
    sheetDrag.lastY=event.clientY;sheetDrag.lastTime=now;
  }
  handle.addEventListener("pointermove",moveSheetDrag);
  sheetHeading.addEventListener("pointermove",moveSheetDrag);
  sheetScroll.addEventListener("pointermove",moveSheetDrag,{passive:false});
  function finishSheetDrag(){
    if(!sheetDrag)return;
    if(sheetDrag.fromContent&&!sheetDrag.moved){sheetDrag=null;return;}
    const visible=parseFloat(getComputedStyle(sheet).getPropertyValue("--sheet-visible"))||visibleFor(sheet.dataset.state);
    const state=nearestSheetState(visible,sheetDrag.velocity);sheetDrag=null;sheet.classList.remove("is-dragging");setSheetState(state);
  }
  [handle,sheetHeading,sheetScroll].forEach(target=>{target.addEventListener("pointerup",finishSheetDrag);target.addEventListener("pointercancel",()=>{finishSheetDrag();suppressHandleClick=false;});});
  handle.addEventListener("click",()=>{if(suppressHandleClick){suppressHandleClick=false;return;}if(sheetDrag)return;const state=sheet.dataset.state;setSheetState(state==="peek"?"half":state==="half"?"full":"peek");});

  document.querySelectorAll(".nav-item").forEach(button=>button.addEventListener("click",()=>setTab(button.dataset.tab)));
  document.querySelector("#filter-chips").addEventListener("click",event=>{
    const chip=event.target.closest("[data-filter]");if(!chip)return;
    filter=chip.dataset.filter;document.querySelectorAll(".filter-chip").forEach(item=>item.classList.toggle("is-active",item===chip));
    selectedPlaceId=null;renderPlaces();updateMapLayers();
  });
  const searchInput=document.querySelector("#place-search");
  searchInput.addEventListener("input",()=>{query=searchInput.value;document.querySelector("#clear-search").hidden=!query;selectedPlaceId=null;renderPlaces();updateMapLayers();});
  document.querySelector("#clear-search").addEventListener("click",()=>{searchInput.value="";query="";document.querySelector("#clear-search").hidden=true;renderPlaces();searchInput.focus();});
  document.querySelector("#place-list").addEventListener("click",event=>{
    const add=event.target.closest('[data-action="add-place"]');if(add){addRouteStop(add.dataset.id);setTab("route");return;}
    const card=event.target.closest("[data-place-card]");if(card)openPlace(card.dataset.placeCard,true);
  });
  document.querySelector("#place-detail").addEventListener("click",event=>{
    if(event.target.closest('[data-action="back-place"]')){selectedPlaceId=null;renderPlaces();return;}
    const add=event.target.closest('[data-action="add-place"]');if(add){if(addRouteStop(add.dataset.id))setTab("route");}
  });
  document.querySelector("#panel-route").addEventListener("click",event=>{
    const control=event.target.closest("[data-action]");if(control&&control.dataset.action!=="visit")routeAction(control.dataset.action,control.dataset.index);
    if(event.target.id==="find-route-places"){setTab("map");selectedPlaceId=null;renderPlaces();setSheetState("half");}
    if(event.target.id==="clear-route"){routeItems=[];persistRoute();renderRoute();updateBadge();showToast("Маршрут очищен");}
  });
  document.querySelector("#panel-route").addEventListener("change",event=>{const check=event.target.closest('[data-action="visit"]');if(check)routeAction("visit",check.dataset.index);});
  document.querySelector("#budget-slider").addEventListener("input",event=>{maxBudget=Number(event.target.value);renderHotels();});
  document.querySelector("#hotel-list").addEventListener("click",event=>{
    const book=event.target.closest('[data-action="book"]');if(book){showBooking(book.dataset.id);return;}
    const card=event.target.closest("[data-hotel]");if(card)openHotel(card.dataset.hotel,true);
  });
  document.querySelector("#booking-confirm").addEventListener("click",()=>{document.querySelector("#booking-dialog").close();showToast("Проверьте доступность у отеля перед поездкой");});
  document.querySelector("#tip-skip").addEventListener("click",()=>dismissTip(false));
  document.querySelector("#tip-like").addEventListener("click",()=>dismissTip(true));
  document.querySelector("#tip-undo").addEventListener("click",undoTip);
  document.querySelector("#tip-stage").addEventListener("click",event=>{if(event.target.closest('[data-action="restart-tips"]'))restartTips();});

  let tipDismissing=false;
  function dismissTip(liked) {
    if(tipDismissing)return;
    const top=document.querySelector(".tip-card.is-top");if(!top)return;
    tipDismissing=true;
    top.style.transition="transform .36s cubic-bezier(.3,.8,.2,1), opacity .32s ease";
    let completed=false;
    const finish=()=>{if(completed)return;completed=true;top.removeEventListener("transitionend",onEnd);decideTip(liked);tipDismissing=false;};
    const onEnd=event=>{if(event.target===top&&event.propertyName==="transform")finish();};
    top.addEventListener("transitionend",onEnd);
    top.style.transform="translate3d("+(liked?"130%":"-130%")+", 0, 0) rotate("+(liked?"18deg":"-18deg")+")";top.style.opacity="0";
    window.setTimeout(finish,420);
  }
  let tipDrag=null;
  const tipStage=document.querySelector("#tip-stage");
  tipStage.addEventListener("pointerdown",event=>{
    const card=event.target.closest(".tip-card.is-top");if(!card||event.button!==undefined&&event.button!==0)return;
    tipDrag={card,startX:event.clientX,startY:event.clientY,lastX:event.clientX,lastTime:performance.now(),velocity:0};card.setPointerCapture(event.pointerId);card.style.transition="none";
  });
  tipStage.addEventListener("pointermove",event=>{
    if(!tipDrag)return;const dx=event.clientX-tipDrag.startX,dy=event.clientY-tipDrag.startY;
    tipDrag.velocity=(event.clientX-tipDrag.lastX)/Math.max(1,performance.now()-tipDrag.lastTime);tipDrag.lastX=event.clientX;tipDrag.lastTime=performance.now();
    tipDrag.card.style.transform="translate3d("+dx+"px, "+Math.min(16,Math.max(-16,dy*.035))+"px, 0) rotate("+(dx*.075)+"deg)";
    tipDrag.card.classList.toggle("drag-right",dx>18);tipDrag.card.classList.toggle("drag-left",dx< -18);
  });
  function finishTipDrag(){
    if(!tipDrag)return;const dx=tipDrag.lastX-tipDrag.startX,card=tipDrag.card;tipDrag=null;
    if(Math.abs(dx)>90){dismissTip(dx>0);return;}
    card.style.transition="transform .36s cubic-bezier(.2,1,.3,1)";card.style.transform="";card.classList.remove("drag-left","drag-right");
  }
  tipStage.addEventListener("pointerup",finishTipDrag);tipStage.addEventListener("pointercancel",finishTipDrag);
  document.querySelector("#locate-button").addEventListener("click",()=>{
    if(!navigator.geolocation){showToast("Геолокация недоступна в этом браузере");return;}
    showToast("Определяем ваше местоположение…");
    navigator.geolocation.getCurrentPosition(position=>{
      currentUserLocation=[position.coords.latitude,position.coords.longitude];
      if(leafletMap){flyTo(currentUserLocation,15);if(window.userLocationMarker)leafletMap.removeLayer(window.userLocationMarker);window.userLocationMarker=L.circleMarker(currentUserLocation,{radius:8,color:"#fff",weight:3,fillColor:"#4d91ef",fillOpacity:1}).addTo(leafletMap);}
      showToast("Местоположение найдено");
    },()=>showToast("Не удалось определить местоположение. Проверьте разрешение браузера."),{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
  });
  document.querySelector("#zoom-in").addEventListener("click",()=>leafletMap&&leafletMap.zoomIn());
  document.querySelector("#zoom-out").addEventListener("click",()=>leafletMap&&leafletMap.zoomOut());
  document.querySelector("#sheet-action").addEventListener("click",async()=>{
    const shareData={title:"GadWay — Петербург",text:"Мой карманный путеводитель по Санкт-Петербургу",url:location.href};
    if(navigator.share){try{await navigator.share(shareData);}catch(error){if(error.name!=="AbortError")showToast("Не удалось открыть меню отправки");}}
    else if(navigator.clipboard){try{await navigator.clipboard.writeText(location.href);showToast("Ссылка скопирована");}catch{showToast("Скопируйте ссылку из адресной строки");}}
    else showToast("Скопируйте ссылку из адресной строки");
  });

  window.addEventListener("resize",()=>{setSheetState(sheet.dataset.state);if(leafletMap)leafletMap.invalidateSize({pan:false});});
  if("ResizeObserver" in window){
    const mapObserver=new ResizeObserver(()=>{if(leafletMap)leafletMap.invalidateSize({pan:false});});
    mapObserver.observe(document.querySelector("#map"));
    mapObserver.observe(appShell);
  }
  window.addEventListener("keydown",event=>{if(event.key==="Escape"&&selectedPlaceId){selectedPlaceId=null;renderPlaces();}});

  function init() {
    initMap();
    document.querySelector("#budget-slider").value=maxBudget;
    renderPlaces();renderRoute();renderHotels();renderTips();updateBadge();
    setTab("map",false);setSheetState("half");
  }
  init();
})();
