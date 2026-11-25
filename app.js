(function () {
  "use strict";

  const cityCenter = [30.3141, 59.9386];
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
  const customMapPlaces=readStorage("gadway-spb-custom-points",[]).filter(point=>point&&typeof point.id==="string"&&point.id.startsWith("map-point-")&&Number.isFinite(point.lat)&&Number.isFinite(point.lon)).map(point=>({id:point.id,name:String(point.name||"Точка на карте").slice(0,120),type:"custom",icon:"📍",shortType:String(point.shortType||"Точка на карте").slice(0,60),district:String(point.district||"Санкт-Петербург").slice(0,160),lat:point.lat,lon:point.lon,rating:"—",hours:"Точка добавлена с карты",visit:"По плану",distance:"Место, отмеченное на карте",image:"",description:String(point.description||"Точка на карте Санкт-Петербурга").slice(0,300)}));
  customMapPlaces.forEach(point=>placeById.set(point.id,point));
  const storedRoute=readStorage("gadway-spb-route",null);
  let routeItems=Array.isArray(storedRoute)?storedRoute.filter(item=>item&&placeById.has(item.placeId)).map(item=>({placeId:item.placeId,time:/^\d{2}:\d{2}$/.test(item.time)?item.time:"10:00",visited:Boolean(item.visited)})):routeDefaults.map(item=>({...item}));
  let activeTab="map";
  let filter="all";
  let query="";
  let selectedPlaceId=null;
  let selectedHotelId=null;
  let maxBudget=25000;
  let tipIndex=0;
  let tipHistory=[];
  let currentUserLocation=null;
  let selectedMapPoint=null;
  let selectedMapPointMarker=null;
  let navigationMarkers=[];
  let navigationRoute=null;
  let navigationMode="foot";
  let navigationRequestId=0;
  let nominatimQueue=Promise.resolve();
  let lastNominatimRequestAt=0;
  let osrmQueue=Promise.resolve();
  let lastOsrmRequestAt=0;
  let routeOriginSelection=null;
  let routeDestinationSelection=null;
  const geocodeCache=readStorage("gadway-geocode-cache",{});
  const routeCache=readStorage("gadway-osrm-cache",{});
  let toastTimer=0;
  const markerById=new Map();
  let mapLibreMap=null;
  let userLocationMarker=null;
  const overpassMarkers=new Map();
  const overpassCache=new Map();
  let overpassTimer=0;
  let overpassController=null;
  let searchTimer=0;
  let searchController=null;
  const photonCache=new Map();
  const appShell=document.querySelector("#app-shell");
  const sheet=document.querySelector("#bottom-sheet");
  const sheetScroll=document.querySelector("#sheet-content");
  const toast=document.querySelector("#toast");

  function showToast(message) {
    toast.textContent=message;toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);toastTimer=window.setTimeout(()=>toast.classList.remove("is-visible"),2600);
  }
  function imageFallbacks(root=document) {
    root.querySelectorAll("img[data-fallback]").forEach(img=>{img.addEventListener("error",()=>{img.removeAttribute("src");img.classList.add("image-fallback");},{once:true});});
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
    const host=document.createElement("div");host.className="map-marker-host";
    const pin=document.createElement("button");
    pin.type="button";pin.className="map-pin "+type;pin.title=label;pin.setAttribute("aria-label",label);
    pin.innerHTML='<span class="pin-icon">'+icon+'</span>';
    host.append(pin);return host;
  }
  function addMapMarker(id,coords,type,icon,label,onClick) {
    const marker=new maplibregl.Marker({element:createPin(type,icon,label),anchor:"bottom"})
      .setLngLat(coords).addTo(mapLibreMap);
    marker.__gadwayVisible=true;
    marker.getElement().addEventListener("click",event=>{event.stopPropagation();onClick();});
    markerById.set(id,marker);
  }
  function applyDarkMapStyle() {
    if(!mapLibreMap)return;
    mapLibreMap.getStyle().layers.forEach(layer=>{
      try {
        if(layer.type==="background")mapLibreMap.setPaintProperty(layer.id,"background-color","#0d1117");
        if(layer.type==="raster"){
          mapLibreMap.setPaintProperty(layer.id,"raster-opacity",.08);
          mapLibreMap.setPaintProperty(layer.id,"raster-saturation",-.8);
          mapLibreMap.setPaintProperty(layer.id,"raster-brightness-min",.05);
          mapLibreMap.setPaintProperty(layer.id,"raster-brightness-max",.32);
        }
        if(layer.type==="symbol"){
          mapLibreMap.setPaintProperty(layer.id,"text-color","#cbd5df");
          mapLibreMap.setPaintProperty(layer.id,"text-halo-color","#0d1117");
          mapLibreMap.setPaintProperty(layer.id,"text-halo-width",1.15);
          mapLibreMap.setPaintProperty(layer.id,"icon-color","#a9c3d4");
          mapLibreMap.setPaintProperty(layer.id,"icon-halo-color","#0d1117");
          mapLibreMap.setPaintProperty(layer.id,"icon-halo-width",.8);
        }
        if(layer.type==="fill"){
          const id=layer.id;
          const color=id==="water"?"#102432":id.includes("park")||id.includes("wood")||id.includes("grass")?"#14231f":id==="building"?"#202b35":id.includes("landcover")?"#151f22":id.includes("landuse")?"#151d27":"#17202a";
          mapLibreMap.setPaintProperty(id,"fill-color",color);
          mapLibreMap.setPaintProperty(id,"fill-outline-color",id==="building"?"#344757":"#1d2a35");
          mapLibreMap.setPaintProperty(id,"fill-opacity",.88);
        }
        if(layer.type==="line"){
          const id=layer.id;
          const color=id.includes("waterway")?"#28566b":id.includes("boundary")?"#3b5263":id.includes("casing")?"#111923":id.includes("motorway")?"#647e93":id.includes("trunk")||id.includes("primary")?"#526a7e":id.includes("road")||id.includes("street")||id.includes("minor")||id.includes("bridge")||id.includes("tunnel")?"#394b5b":"#334555";
          mapLibreMap.setPaintProperty(id,"line-color",color);
          mapLibreMap.setPaintProperty(id,"line-opacity",id.includes("casing") ? .9 : .86);
        }
        if(layer.type==="fill-extrusion"){
          mapLibreMap.setPaintProperty(layer.id,"fill-extrusion-color","#263847");
          mapLibreMap.setPaintProperty(layer.id,"fill-extrusion-opacity",.94);
          mapLibreMap.setPaintProperty(layer.id,"fill-extrusion-vertical-gradient",true);
        }
      } catch(error) {
        console.debug("Пропущено неподдерживаемое свойство стиля карты:",layer.id,error.message);
      }
    });
    if(mapLibreMap.getLayer("building-3d")&&!mapLibreMap.getLayer("building-3d-outline")){
      mapLibreMap.addLayer({id:"building-3d-outline",type:"line",source:"openmaptiles","source-layer":"building",minzoom:14,filter:["!",["has","hide_3d"]],paint:{"line-color":"#84a8be","line-width":.55,"line-opacity":.28}},"waterway_line_label");
    }
    if(mapLibreMap.getSource("openmaptiles")&&!mapLibreMap.getLayer("gadway-house-numbers")){
      try {
        mapLibreMap.addLayer({id:"gadway-house-numbers",type:"symbol",source:"openmaptiles","source-layer":"housenumber",minzoom:15,layout:{"text-field":["get","housenumber"],"text-font":["Noto Sans Regular"],"text-size":["interpolate",["linear"],["zoom"],15,9,18,12],"text-padding":1,"text-allow-overlap":false,"text-ignore-placement":false},paint:{"text-color":"#d5e2ec","text-halo-color":"#101820","text-halo-width":1.2,"text-opacity":["interpolate",["linear"],["zoom"],15,.65,16,1]}});
      } catch(error) { console.info("Номера домов не включены в текущем наборе тайлов:",error.message); }
    }
    mapLibreMap.getStyle().layers.filter(layer=>layer.type==="symbol").forEach(layer=>{
      const id=layer.id.toLowerCase();
      if(id.startsWith("poi")||id.includes("highway-name")||id.includes("park")||id.includes("place")){
        try { mapLibreMap.setLayerZoomRange(layer.id,Math.max(layer.minzoom||0,id.startsWith("poi")?14:12),24); } catch {}
      }
    });
  }
  function featureName(feature) {
    const p=feature&&feature.properties||{};
    return p["name:ru"]||p.name_ru||p.name||p["name:latin"]||p.ref||"";
  }
  function featureCategory(feature) {
    if(!feature)return "Точка на карте";
    const layer=feature.layer&&feature.layer.id||"",sourceLayer=feature.sourceLayer||"",kind=feature.properties&&(feature.properties.class||feature.properties.subclass||feature.properties.type)||"";
    if(layer.startsWith("poi")||sourceLayer==="poi")return "Достопримечательность · "+String(kind||"место").replace(/_/g," ");
    if(sourceLayer==="building"||layer.includes("building"))return "Здание";
    if(sourceLayer==="transportation_name"||layer.includes("highway-name"))return "Улица";
    if(sourceLayer==="park"||sourceLayer==="landcover")return "Парк или зелёная зона";
    return "Место на карте";
  }
  function nearestMapFeature(point) {
    if(!mapLibreMap||!mapLibreMap.isStyleLoaded())return null;
    let features=[];
    try{features=mapLibreMap.queryRenderedFeatures(point)||[];}catch{return null;}
    const candidates=features.filter(feature=>feature.layer&&feature.layer.id!=="gadway-route-line"&&feature.layer.id!=="gadway-navigation-route"&&feature.layer.id!=="gadway-navigation-casing");
    return candidates.find(feature=>feature.layer.id.startsWith("poi")&&featureName(feature))
      ||candidates.find(feature=>(feature.sourceLayer==="building"||feature.layer.id.includes("building"))&&featureName(feature))
      ||candidates.find(feature=>feature.layer.type==="symbol"&&featureName(feature))
      ||candidates.find(feature=>featureName(feature))||null;
  }
  function setSelectedPointMarker(coords) {
    if(selectedMapPointMarker)selectedMapPointMarker.remove();
    const pin=document.createElement("div");pin.className="selected-map-point-marker";pin.setAttribute("aria-hidden","true");pin.addEventListener("click",event=>event.stopPropagation());
    selectedMapPointMarker=new maplibregl.Marker({element:pin,anchor:"bottom"}).setLngLat([coords[1],coords[0]]).addTo(mapLibreMap);
  }
  function safePointLabel(point) {
    return point.name&&point.name!=="Ищем адрес…"?point.name:"Точка на карте";
  }
  function renderMapPointCard() {
    const card=document.querySelector("#map-point-card");
    if(!selectedMapPoint){card.hidden=true;return;}
    const point=selectedMapPoint,lat=point.coords[0],lon=point.coords[1];
    card.hidden=false;
    card.innerHTML='<div class="map-point-card-head"><div><span class="map-point-category">'+escapeHtml(point.category)+'</span><h2>'+escapeHtml(point.name)+'</h2></div><button class="detail-back" type="button" data-action="close-map-point" aria-label="Закрыть точку">×</button></div><p class="map-point-address">'+escapeHtml(point.address||point.status||"Определяем адрес…")+'</p><p class="map-point-coordinates">'+lat.toFixed(5)+", "+lon.toFixed(5)+'</p><p class="map-point-description">'+escapeHtml(point.description||point.status||"Ищем ближайший адрес в OpenStreetMap…")+'</p><div class="map-point-actions"><button class="primary-button full-button" type="button" data-action="navigate-to-point">Построить маршрут</button><button class="soft-button full-button" type="button" data-action="add-map-point-to-day">Добавить в маршрут дня</button></div>';
  }
  function pointCaption(point) {
    document.querySelector("#map-caption").innerHTML='<span class="caption-dot"></span><span>'+escapeHtml(point.name)+'</span><span class="caption-separator">·</span><span>'+escapeHtml(point.category)+'</span>';
  }
  async function nominatimJson(url,shouldRun=()=>true) {
    if(Object.prototype.hasOwnProperty.call(geocodeCache,url))return geocodeCache[url];
    const task=nominatimQueue.then(async()=>{
      let sharedLastRequest=0;try{sharedLastRequest=Number(localStorage.getItem("gadway-last-nominatim-request"))||0;}catch{}
      lastNominatimRequestAt=Math.max(lastNominatimRequestAt,sharedLastRequest);
      const pause=Math.max(0,1100-(Date.now()-lastNominatimRequestAt));
      if(pause)await new Promise(resolve=>window.setTimeout(resolve,pause));
      if(!shouldRun())return null;
      lastNominatimRequestAt=Date.now();try{localStorage.setItem("gadway-last-nominatim-request",String(lastNominatimRequestAt));}catch{}
      const controller=new AbortController(),timer=window.setTimeout(()=>controller.abort(),10000);
      try{
        const options={signal:controller.signal,headers:{Accept:"application/json"},referrerPolicy:"origin"};
        if(location.origin&&location.origin!=="null")options.referrer=location.origin+"/";
        const response=await fetch(url,options);
        if(!response.ok)throw new Error(response.status===429?"Сервис адресов временно ограничил запросы.":"Сервис адресов ответил ошибкой "+response.status+".");
        let data;try{data=await response.json();}catch{throw new Error("Сервис адресов вернул некорректный ответ.");}geocodeCache[url]=data;
        const keys=Object.keys(geocodeCache);if(keys.length>100)delete geocodeCache[keys[0]];
        saveStorage("gadway-geocode-cache",geocodeCache);return data;
      }finally{window.clearTimeout(timer);}
    });
    nominatimQueue=task.catch(()=>{});return task;
  }
  async function fetchJsonWithTimeout(url,timeoutMs=15000) {
    const controller=new AbortController(),timer=window.setTimeout(()=>controller.abort(),timeoutMs);
    try{
      const response=await fetch(url,{signal:controller.signal,headers:{Accept:"application/json"}});
      if(!response.ok)throw new Error(response.status===429?"Сервис маршрутизации временно ограничил запросы. Попробуйте позже.":"Сервер ответил ошибкой "+response.status+".");
      try{return await response.json();}catch{throw new Error("Сервис маршрутизации вернул некорректный ответ.");}
    }catch(error){
      if(error.name==="AbortError")throw new Error("Запрос занял слишком много времени.");
      if(error instanceof TypeError)throw new Error("Не удалось связаться с сервисом маршрутизации. Проверьте интернет и попробуйте ещё раз.");
      throw error;
    }finally{window.clearTimeout(timer);}
  }
  function nominatimUrl(params) {
    const query=new URLSearchParams({...params,operation:"search"});return "/api/nominatim?"+query.toString();
  }
  async function geocodeAddress(query) {
    const trimmed=query.trim();if(trimmed.length<3)throw new Error("Введите адрес или название места (не менее 3 символов).");
    const searchQuery=/санкт-петербург|петербург|спб/i.test(trimmed)?trimmed:trimmed+", Санкт-Петербург";
    const data=await nominatimJson(nominatimUrl({format:"jsonv2",q:searchQuery,limit:"1",addressdetails:"1","accept-language":"ru"}));
    if(!Array.isArray(data)||!data.length)throw new Error("Не нашли такой адрес. Уточните название и попробуйте ещё раз.");
    const result=data[0],coords=[Number(result.lat),Number(result.lon)];
    if(!coords.every(Number.isFinite))throw new Error("Сервис адресов вернул некорректные координаты.");
    return {coords,name:result.name||String(result.display_name||trimmed).split(",")[0],label:String(result.display_name||trimmed),address:addressLabel(result.address)||result.display_name||trimmed};
  }
  function lastDayRoutePoint() {
    for(let i=routeItems.length-1;i>=0;i--){const place=placeById.get(routeItems[i].placeId);if(place)return {coords:[place.lat,place.lon],name:place.name,label:place.name,address:place.district};}
    return null;
  }
  function fallbackRouteOrigin() {
    return lastDayRoutePoint()||{coords:[cityCenter[1],cityCenter[0]],name:"Центр Санкт-Петербурга",label:"Центр Санкт-Петербурга",address:"Санкт-Петербург"};
  }
  function requestCurrentLocation(timeout=9000) {
    return new Promise((resolve,reject)=>{
      try{
        if(!navigator.geolocation){reject(new Error("Геолокация недоступна в этом браузере."));return;}
        navigator.geolocation.getCurrentPosition(position=>resolve([position.coords.latitude,position.coords.longitude]),error=>{
          const messages={1:"Нет разрешения на геолокацию.",2:"Не удалось определить местоположение.",3:"Поиск местоположения занял слишком много времени."};
          reject(new Error(messages[error.code]||"Не удалось определить местоположение."));
        },{enableHighAccuracy:true,timeout,maximumAge:60000});
      }catch(error){reject(error);}
    });
  }
  function setUserLocation(coords,focusMap=false) {
    currentUserLocation=coords;
    if(mapLibreMap){
      if(userLocationMarker)userLocationMarker.remove();
      const dot=document.createElement("span");dot.className="user-location-pin";dot.setAttribute("aria-label","Вы здесь");dot.addEventListener("click",event=>event.stopPropagation());
      userLocationMarker=new maplibregl.Marker({element:dot,anchor:"center"}).setLngLat([coords[1],coords[0]]).addTo(mapLibreMap);
      if(focusMap)flyTo(coords,15);
    }
  }
  async function resolveRouteOrigin() {
    const input=document.querySelector("#navigation-from").value.trim();
    if(routeOriginSelection&&input===routeOriginSelection.label)return routeOriginSelection;
    if(!input||/^(мо[её] местоположение|моя геолокация)$/i.test(input)){
      if(currentUserLocation)return {coords:currentUserLocation,name:"Моё местоположение",label:"Моё местоположение",address:"Текущее местоположение"};
      try{const coords=await requestCurrentLocation();setUserLocation(coords);return {coords,name:"Моё местоположение",label:"Моё местоположение",address:"Текущее местоположение"};}
      catch{return fallbackRouteOrigin();}
    }
    return geocodeAddress(input);
  }
  async function resolveRouteDestination() {
    const input=document.querySelector("#navigation-to").value.trim();
    if(routeDestinationSelection&&input===routeDestinationSelection.label)return routeDestinationSelection;
    if(selectedMapPoint&&input===safePointLabel(selectedMapPoint))return {coords:selectedMapPoint.coords,name:safePointLabel(selectedMapPoint),label:safePointLabel(selectedMapPoint),address:selectedMapPoint.address};
    if(!input)throw new Error("Сначала выберите точку на карте или введите адрес назначения.");
    return geocodeAddress(input);
  }
  function formatTravelDistance(meters) {
    return meters<1000?Math.round(meters)+" м":(meters/1000).toLocaleString("ru-RU",{maximumFractionDigits:1})+" км";
  }
  function formatTravelDuration(seconds) {
    const minutes=Math.max(1,Math.round(seconds/60));
    return minutes<60?minutes+" мин":"около "+Math.floor(minutes/60)+" ч "+(minutes%60?minutes%60+" мин":"");
  }
  function setNavigationStatus(message,state="") {
    const element=document.querySelector("#navigation-status");element.textContent=message;element.classList.toggle("is-error",state==="error");element.classList.toggle("is-loading",state==="loading");
  }
  function friendlyGeocodeError(error) {
    if(error&&error.name==="AbortError")return "Поиск адреса занял слишком много времени.";
    if(error instanceof TypeError||/failed to fetch|networkerror/i.test(error&&error.message||""))return "Нет соединения с сервисом адресов. Точку можно сохранить по координатам.";
    return error&&error.message||"Сервис адресов временно недоступен.";
  }
  function modeCaption(mode=navigationMode) {return mode==="car"?"на автомобиле":mode==="bike"?"на велосипеде":"пешком";}
  async function requestOsrmRoute(start,destination,mode) {
    const profile=mode==="car"?"routed-car":mode==="bike"?"routed-bike":"routed-foot";
    const origin=start.coords,finish=destination.coords;
    const cacheKey=[mode,origin[0].toFixed(5),origin[1].toFixed(5),finish[0].toFixed(5),finish[1].toFixed(5)].join("|");
    if(routeCache[cacheKey])return routeCache[cacheKey];
    const url="https://routing.openstreetmap.de/"+profile+"/route/v1/driving/"+origin[1]+","+origin[0]+";"+finish[1]+","+finish[0]+"?overview=full&geometries=geojson&steps=false";
    const task=osrmQueue.then(async()=>{
      const pause=Math.max(0,1100-(Date.now()-lastOsrmRequestAt));if(pause)await new Promise(resolve=>window.setTimeout(resolve,pause));
      lastOsrmRequestAt=Date.now();const result=await fetchJsonWithTimeout(url);
      if(result.code!=="Ok"||!result.routes||!result.routes[0])throw new Error(result.message||"Маршрут не найден для этого режима движения.");
      routeCache[cacheKey]=result.routes[0];const keys=Object.keys(routeCache);if(keys.length>25)delete routeCache[keys[0]];
      saveStorage("gadway-osrm-cache",routeCache);return result.routes[0];
    });
    osrmQueue=task.catch(()=>{});return task;
  }
  function replaceNavigationMarkers(start,destination) {
    navigationMarkers.forEach(marker=>marker.remove());navigationMarkers=[];
    [[start,"А","start"],[destination,"Б","finish"]].forEach(([point,label,type])=>{
      const element=document.createElement("div");element.className="navigation-endpoint-marker "+type;element.textContent=label;element.setAttribute("aria-label",type==="start"?"Начало маршрута":"Конец маршрута");element.addEventListener("click",event=>event.stopPropagation());
      navigationMarkers.push(new maplibregl.Marker({element,anchor:"center"}).setLngLat([point.coords[1],point.coords[0]]).addTo(mapLibreMap));
    });
  }
  function fitNavigationRoute(route) {
    if(!mapLibreMap||!route.geometry||!route.geometry.coordinates.length)return;
    const coordinates=route.geometry.coordinates,bounds=coordinates.reduce((result,point)=>result.extend(point),new maplibregl.LngLatBounds(coordinates[0],coordinates[0]));
    const visible=parseFloat(getComputedStyle(sheet).getPropertyValue("--sheet-visible"))||visibleFor("half"),navHeight=Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"))||76;
    mapLibreMap.fitBounds(bounds,{padding:{top:105,right:38,bottom:Math.min(mapLibreMap.getContainer().clientHeight-80,visible+navHeight-32),left:38},maxZoom:16,duration:850,pitch:60,bearing:mapLibreMap.getBearing()});
  }
  async function buildNavigationRoute() {
    const requestId=++navigationRequestId,button=document.querySelector("#build-navigation-route");button.disabled=true;
    document.querySelectorAll("#navigation-from,#navigation-to,#route-use-location,#route-swap,.route-mode-button").forEach(control=>{control.disabled=true;});
    navigationRoute=null;const navigationSource=mapLibreMap&&mapLibreMap.getSource("gadway-navigation-route");if(navigationSource)navigationSource.setData({type:"Feature",geometry:{type:"LineString",coordinates:[]},properties:{}});
    navigationMarkers.forEach(marker=>marker.remove());navigationMarkers=[];
    document.querySelector("#navigation-result").hidden=true;setNavigationStatus("Определяем начало и конец маршрута…","loading");
    try{
      const originIsDeviceLocation=/^(мо[её] местоположение|моя геолокация)$/i.test(document.querySelector("#navigation-from").value.trim());
      const start=await resolveRouteOrigin();
      if(requestId!==navigationRequestId)return;
      const destination=await resolveRouteDestination();
      if(requestId!==navigationRequestId)return;
      routeOriginSelection={...start,label:document.querySelector("#navigation-from").value.trim()||start.label};
      routeDestinationSelection={...destination,label:document.querySelector("#navigation-to").value.trim()||destination.label};
      document.querySelector("#navigation-from").value=routeOriginSelection.label;
      document.querySelector("#navigation-to").value=routeDestinationSelection.label;
      if(!currentUserLocation&&originIsDeviceLocation){
        const fallback=fallbackRouteOrigin();routeOriginSelection=fallback;document.querySelector("#navigation-from").value=fallback.label;
        setNavigationStatus("Геолокация недоступна. Начинаем от последней точки маршрута или из центра города.","loading");
      }else setNavigationStatus("Ищем путь по дорогам и пешеходным дорожкам…","loading");
      const route=await requestOsrmRoute(routeOriginSelection,routeDestinationSelection,navigationMode);
      if(requestId!==navigationRequestId)return;
      navigationRoute=route;
      const source=mapLibreMap&&mapLibreMap.getSource("gadway-navigation-route");
      if(source)source.setData({type:"Feature",geometry:route.geometry,properties:{mode:navigationMode}});
      replaceNavigationMarkers(routeOriginSelection,routeDestinationSelection);
      document.querySelector("#navigation-result-distance").textContent=formatTravelDistance(route.distance);
      document.querySelector("#navigation-result-duration").textContent="Около "+formatTravelDuration(route.duration)+" · "+modeCaption();
      document.querySelector("#navigation-result").hidden=false;
      setNavigationStatus("Маршрут построен по данным OpenStreetMap.");fitNavigationRoute(route);
    }catch(error){
      if(requestId!==navigationRequestId)return;
      setNavigationStatus(friendlyGeocodeError(error),"error");
    }finally{if(requestId===navigationRequestId){button.disabled=false;document.querySelectorAll("#navigation-from,#navigation-to,#route-use-location,#route-swap,.route-mode-button").forEach(control=>{control.disabled=false;});}}
  }
  function clearNavigationRoute() {
    navigationRequestId++;navigationRoute=null;navigationMarkers.forEach(marker=>marker.remove());navigationMarkers=[];
    const source=mapLibreMap&&mapLibreMap.getSource("gadway-navigation-route");if(source)source.setData({type:"Feature",geometry:{type:"LineString",coordinates:[]},properties:{}});
    document.querySelector("#navigation-result").hidden=true;document.querySelector("#build-navigation-route").disabled=false;
    document.querySelectorAll("#navigation-from,#navigation-to,#route-use-location,#route-swap,.route-mode-button").forEach(control=>{control.disabled=false;});
    setNavigationStatus("Выберите точку на карте или введите адрес назначения.");
  }
  function addressLabel(address) {
    if(!address)return "";
    const street=address.road||address.pedestrian||address.footway||address.path;
    const streetLine=street?[street,address.house_number].filter(Boolean).join(", "):"";
    const district=address.neighbourhood||address.suburb||address.city_district||address.city||address.town;
    return [streetLine,district].filter(Boolean).join(" · ");
  }
  async function inspectMapPoint(event) {
    const coords=[event.lngLat.lat,event.lngLat.lng],feature=nearestMapFeature(event.point),name=featureName(feature),token=Date.now()+Math.random();
    if(selectedMapPointMarker)selectedMapPointMarker.remove();
    selectedMapPoint={token,coords,name:name||"Ищем адрес…",category:featureCategory(feature),address:"Определяем адрес…",description:name?"Загружаем адрес и подробности объекта…":"Ищем ближайший адрес в OpenStreetMap…",status:"Загрузка адреса",featureName:name};
    setSelectedPointMarker(coords);selectedPlaceId=null;selectedHotelId=null;setTab("map",false);renderPlaces();renderMapPointCard();pointCaption(selectedMapPoint);setSheetState("half");
    const lat=coords[0].toFixed(6),lon=coords[1].toFixed(6),url="/api/nominatim?"+new URLSearchParams({operation:"reverse",lat,lon});
    try{
      const result=await nominatimJson(url,()=>selectedMapPoint&&selectedMapPoint.token===token);
      if(!result)return;
      if(!selectedMapPoint||selectedMapPoint.token!==token)return;
      const address=addressLabel(result.address),display=String(result.display_name||"");
      selectedMapPoint.name=name||result.name||display.split(",")[0]||"Точка на карте";
      selectedMapPoint.address=address||display||"Адрес не найден";
      selectedMapPoint.description=name?"Объект карты: "+selectedMapPoint.category+". Адрес уточнён по OpenStreetMap.":"Координаты точки на карте Санкт-Петербурга.";
      selectedMapPoint.status="Адрес найден";pointCaption(selectedMapPoint);if(activeTab==="map")renderPlaces();else renderMapPointCard();
    }catch(error){
      if(!selectedMapPoint||selectedMapPoint.token!==token)return;
      selectedMapPoint.name=name||"Точка на карте";
      selectedMapPoint.address="Адресный поиск временно недоступен";
      selectedMapPoint.description=name?"На карте отмечен объект «"+name+"». Адрес можно определить по координатам.":"Показываем точные координаты без адреса.";
      selectedMapPoint.status=friendlyGeocodeError(error);
      pointCaption(selectedMapPoint);if(activeTab==="map")renderPlaces();else renderMapPointCard();
    }
  }
  function initMap() {
    if(!window.maplibregl){
      appShell.classList.add("map-offline");
      document.querySelector("#map-caption").innerHTML='<span class="caption-dot"></span><span>Карта недоступна офлайн</span>';
      return;
    }
    mapLibreMap=new maplibregl.Map({
      container:"map",style:"https://tiles.openfreemap.org/styles/liberty",
      center:cityCenter,zoom:15,pitch:60,bearing:-17.6,
      attributionControl:false,dragRotate:true,pitchWithRotate:true,touchPitch:true,touchZoomRotate:true,
      cooperativeGestures:false,renderWorldCopies:false
    });
    mapLibreMap.on("style.load",applyDarkMapStyle);
    mapLibreMap.on("load",()=>{
      document.querySelector("#map-fallback").hidden=true;
      places.forEach(place=>addMapMarker(place.id,[place.lon,place.lat],place.type,place.icon||iconFor(place.type),place.name,()=>openPlace(place.id,true)));
      hotels.forEach(hotel=>addMapMarker(hotel.id,[hotel.lon,hotel.lat],"hotel","⌂",hotel.name,()=>openHotel(hotel.id,true)));
      customMapPlaces.forEach(place=>addMapMarker(place.id,[place.lon,place.lat],"custom","📍",place.name,()=>openCustomMapPlace(place)));
      mapLibreMap.addSource("gadway-route",{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:[]},properties:{}}});
      mapLibreMap.addLayer({id:"gadway-route-line",type:"line",source:"gadway-route",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#53d7a8","line-width":4,"line-opacity":.92,"line-dasharray":[2,1.5]}});
      mapLibreMap.addSource("gadway-navigation-route",{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:[]},properties:{}}});
      mapLibreMap.addLayer({id:"gadway-navigation-casing",type:"line",source:"gadway-navigation-route",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#07131b","line-width":9,"line-opacity":.78}});
      mapLibreMap.addLayer({id:"gadway-navigation-route",type:"line",source:"gadway-navigation-route",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#38bdf8","line-width":5,"line-opacity":1}});
      if(navigationRoute)mapLibreMap.getSource("gadway-navigation-route").setData({type:"Feature",geometry:navigationRoute.geometry,properties:{mode:navigationMode}});
      mapLibreMap.on("click",event=>{
        if(event.originalEvent&&event.originalEvent.defaultPrevented)return;
        if(selectedPlaceId){selectedPlaceId=null;renderPlaces();}
        inspectMapPoint(event);
      });
      mapLibreMap.on("pitch",updateMapModeButton);
      mapLibreMap.on("moveend",updateMapModeButton);
      updateMapModeButton();
      updateMapLayers();
      mapLibreMap.resize();
    });
    mapLibreMap.on("error",event=>{
      if(event?.error)console.warn("MapLibre tile/style error:",event.error.message||event.error);
    });
  }

  function updateMapLayers() {
    if(!mapLibreMap)return;
    const visiblePlaces=new Set(filteredPlaces().map(place=>place.id));
    const visibleHotels=new Set(hotels.filter(hotel=>hotel.price<=maxBudget).map(hotel=>hotel.id));
    markerById.forEach((marker,id)=>{
      const shouldShow=activeTab==="hotels"?visibleHotels.has(id):activeTab==="route"?routeItems.some(item=>item.placeId===id):activeTab==="tips"?Boolean(tips[tipIndex]&&tips[tipIndex].placeId===id||routeItems.some(item=>item.placeId===id)):visiblePlaces.has(id)||(filter==="all"&&!query&&hotelById.has(id));
      if(shouldShow&&!marker.__gadwayVisible){marker.addTo(mapLibreMap);marker.__gadwayVisible=true;}
      else if(!shouldShow&&marker.__gadwayVisible){marker.remove();marker.__gadwayVisible=false;}
    });
    drawRouteLine(activeTab==="route");
  }
  function drawRouteLine(fitCamera=false) {
    const source=mapLibreMap&&mapLibreMap.getSource("gadway-route");
    if(!source||!mapLibreMap.isStyleLoaded())return;
    const points=routeItems.map(item=>placeById.get(item.placeId)).filter(Boolean).map(place=>[place.lon,place.lat]);
    source.setData({type:"Feature",geometry:{type:"LineString",coordinates:activeTab==="route"?points:[]},properties:{}});
    if(!fitCamera||activeTab!=="route"||points.length===0)return;
    if(points.length===1){flyTo([points[0][1],points[0][0]],16);return;}
    const bounds=points.reduce((result,point)=>result.extend(point),new maplibregl.LngLatBounds(points[0],points[0]));
    mapLibreMap.fitBounds(bounds,{padding:{top:105,right:45,bottom:Math.round(mapLibreMap.getContainer().clientHeight*.42),left:45},maxZoom:14,duration:700,pitch:60,bearing:-17.6});
  }
  function updateSelectedMarker(id) {
    markerById.forEach((marker,key)=>{
      const pin=marker.getElement().querySelector(".map-pin");
      if(pin)pin.classList.toggle("is-selected",key===id);
    });
  }
  function flyTo(coords,zoom=15) {
    if(mapLibreMap)mapLibreMap.flyTo({center:[coords[1],coords[0]],zoom,pitch:60,bearing:mapLibreMap.getBearing()+12,duration:1100,essential:true});
  }
  function updateMapModeButton() {
    if(!mapLibreMap)return;
    const is3D=mapLibreMap.getPitch()>1,button=document.querySelector("#map-mode");
    button.textContent=is3D?"2D":"3D";button.setAttribute("aria-pressed",String(is3D));
    button.setAttribute("aria-label","Переключить на "+(is3D?"2D":"3D"));
  }

  function renderPlaces() {
    const detail=document.querySelector("#place-detail"),list=document.querySelector("#place-list"),sectionRow=document.querySelector("#panel-map .section-row"),chips=document.querySelector("#filter-chips"),search=document.querySelector(".search-box");
    const pointCard=document.querySelector("#map-point-card");
    if(selectedMapPoint){
      sectionRow.hidden=true;chips.hidden=true;search.hidden=true;list.hidden=true;detail.hidden=true;pointCard.hidden=false;
      document.querySelector("#sheet-kicker").textContent=selectedMapPoint.category.toLocaleUpperCase("ru");
      document.querySelector("#sheet-title").textContent=selectedMapPoint.name;
      document.querySelector("#sheet-summary").textContent=selectedMapPoint.address||selectedMapPoint.status;
      pointCaption(selectedMapPoint);renderMapPointCard();updateSelectedMarker(null);return;
    }
    pointCard.hidden=true;
    if(selectedPlaceId&&placeById.has(selectedPlaceId)) {
      const place=placeById.get(selectedPlaceId);
      sectionRow.hidden=true;chips.hidden=true;search.hidden=true;list.hidden=true;detail.hidden=false;
      document.querySelector("#sheet-kicker").textContent=place.shortType.toLocaleUpperCase("ru");
      document.querySelector("#sheet-title").textContent=place.name;
      document.querySelector("#sheet-summary").textContent=place.district+" · ★ "+place.rating;
      document.querySelector("#map-caption").innerHTML='<span class="caption-dot"></span><span>'+escapeHtml(place.name)+'</span><span class="caption-separator">·</span><span>'+escapeHtml(place.district)+'</span>';
      detail.innerHTML='<div class="detail-hero"><img data-fallback src="'+escapeHtml(place.image)+'" alt="Вид места: '+escapeHtml(place.name)+'"><button class="detail-back" type="button" data-action="back-place" aria-label="Назад">‹</button></div><div class="detail-copy"><div class="card-meta"><span class="card-rating">★ '+escapeHtml(place.rating)+'</span><span>·</span><span>'+escapeHtml(place.shortType)+'</span></div><h2>'+escapeHtml(place.name)+'</h2><p>'+escapeHtml(place.description)+'</p><div class="detail-facts"><span class="fact-pill">◷ '+escapeHtml(place.hours)+'</span><span class="fact-pill">⌖ '+escapeHtml(place.visit)+'</span><span class="fact-pill">'+place.lat.toFixed(5)+", "+place.lon.toFixed(5)+'</span></div><p>'+escapeHtml(place.distance)+'</p><div class="detail-navigation-actions"><button class="primary-button full-button" type="button" data-action="navigate-to-place" data-id="'+escapeHtml(place.id)+'">Построить маршрут</button><button class="soft-button full-button" type="button" data-action="add-place" data-id="'+escapeHtml(place.id)+'">＋ Добавить в маршрут</button></div></div>';
      imageFallbacks(detail);updateSelectedMarker(place.id);return;
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
    selectedMapPoint=null;if(selectedMapPointMarker){selectedMapPointMarker.remove();selectedMapPointMarker=null;}
    selectedPlaceId=id;selectedHotelId=null;
    setTab("map",false);renderPlaces();setSheetState("half");
    if(focusMap)flyTo([place.lat,place.lon],16);
  }
  function openCustomMapPlace(place) {
    selectedMapPoint={token:Date.now()+Math.random(),coords:[place.lat,place.lon],name:place.name,category:place.shortType,address:place.district,description:place.description,status:"Точка из маршрута дня"};
    setSelectedPointMarker(selectedMapPoint.coords);selectedPlaceId=null;setTab("map",false);renderPlaces();setSheetState("half");flyTo(selectedMapPoint.coords,16);
  }
  function startRouteToPoint(point) {
    if(!point)return;
    const label=point.label||point.name||"Точка на карте";
    routeDestinationSelection={coords:point.coords,name:point.name||label,label,address:point.address||""};
    document.querySelector("#navigation-to").value=label;setTab("route");buildNavigationRoute();
  }
  function closeMapPoint() {
    selectedMapPoint=null;if(selectedMapPointMarker){selectedMapPointMarker.remove();selectedMapPointMarker=null;}
    if(activeTab==="map")renderPlaces();else document.querySelector("#map-point-card").hidden=true;
  }
  function addRouteStop(id) {
    if(!placeById.has(id))return false;
    if(routeItems.some(item=>item.placeId===id)){showToast("Это место уже есть в маршруте.");return false;}
    const nextHour=Math.min(20,10+routeItems.length*2);const time=String(nextHour).padStart(2,"0")+":00";
    routeItems.push({placeId:id,time,visited:false});persistRoute();renderRoute();updateBadge();showToast("Добавили «"+placeById.get(id).name+"» в маршрут");return true;
  }
  function addSelectedMapPointToDay() {
    if(!selectedMapPoint)return;
    const point=selectedMapPoint,coords=point.coords;
    const existing=routeItems.some(item=>{const place=placeById.get(item.placeId);return place&&Math.abs(place.lat-coords[0])<.00008&&Math.abs(place.lon-coords[1])<.00008;});
    if(existing){showToast("Эта точка уже есть в маршруте дня.");return;}
    const id="map-point-"+Date.now()+"-"+Math.random().toString(36).slice(2,7),name=safePointLabel(point);
    const custom={id,name,type:"custom",icon:"📍",shortType:point.category,district:point.address||"Санкт-Петербург",lat:coords[0],lon:coords[1],rating:"—",hours:"Точка добавлена с карты",visit:"По плану",distance:"Место, отмеченное на карте",image:"",description:point.description||"Точка на карте Санкт-Петербурга."};
    customMapPlaces.push(custom);placeById.set(id,custom);saveStorage("gadway-spb-custom-points",customMapPlaces);
    if(mapLibreMap&&mapLibreMap.isStyleLoaded())addMapMarker(id,[custom.lon,custom.lat],"custom","📍",custom.name,()=>openCustomMapPlace(custom));
    const nextHour=Math.min(20,10+routeItems.length*2);
    routeItems.push({placeId:id,time:String(nextHour).padStart(2,"0")+":00",visited:false});
    persistRoute();renderRoute();updateBadge();showToast("Точка добавлена в маршрут дня.");
  }
  function persistRoute() { saveStorage("gadway-spb-route",routeItems); }
  function renderRoute() {
    const valid=routeItems.filter(item=>placeById.has(item.placeId));
    routeItems=valid;
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
    persistRoute();updateMapLayers();
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
    document.querySelector("#hotel-list").innerHTML=filtered.length?filtered.map(hotel=>'<article class="hotel-card '+(selectedHotelId===hotel.id?'is-selected':'')+'" data-hotel="'+escapeHtml(hotel.id)+'"><img class="card-image" data-fallback src="'+escapeHtml(hotel.image)+'" alt="'+escapeHtml(hotel.name)+'" loading="lazy"><div class="hotel-copy"><p class="hotel-stars">★★★★★ <span class="card-rating">'+escapeHtml(hotel.rating)+'</span></p><h3 class="card-title">'+escapeHtml(hotel.name)+'</h3><p class="card-subtitle">'+escapeHtml(hotel.type)+' · '+escapeHtml(hotel.district)+'</p><div class="hotel-price">от '+formatPrice(hotel.price)+' <small>/ ночь</small></div><div class="hotel-actions"><span class="hotel-distance">'+escapeHtml(hotel.center)+'</span><button class="mini-button" type="button" data-action="route-hotel" data-id="'+escapeHtml(hotel.id)+'">Маршрут</button><button class="mini-button" type="button" data-action="book" data-id="'+escapeHtml(hotel.id)+'">Подробнее</button></div></div></article>').join(""):'<p class="empty-message">В этом бюджете отелей не нашлось. Передвиньте ползунок, чтобы увидеть другие варианты.</p>';
    imageFallbacks(document.querySelector("#hotel-list"));updateMapLayers();
  }
  function openHotel(id,focusMap) {
    const hotel=hotelById.get(id);if(!hotel)return;
    selectedMapPoint=null;if(selectedMapPointMarker){selectedMapPointMarker.remove();selectedMapPointMarker=null;}
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
    tipHistory.push({index:tipIndex,liked,wasInRoute,tipId:tip.id});
    if(liked&&!wasInRoute){const h=10+routeItems.length*2;routeItems.push({placeId:tip.placeId,time:String(Math.min(20,h)).padStart(2,"0")+":00",visited:false});persistRoute();renderRoute();updateBadge();}
    tipIndex++;renderTips();
    if(liked)showToast(wasInRoute?"Это место уже есть в маршруте":"«"+placeById.get(tip.placeId).name+"» добавлено в маршрут");
  }
  function undoTip() {
    const last=tipHistory.pop();if(!last)return;
    tipIndex=last.index;
    if(last.liked&&!last.wasInRoute){const index=routeItems.findIndex(item=>item.placeId===tips[last.index].placeId);if(index!==-1)routeItems.splice(index,1);persistRoute();renderRoute();updateBadge();}
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
    if(tab!=="map"){selectedPlaceId=null;document.querySelector("#place-detail").hidden=true;document.querySelector("#place-list").hidden=false;document.querySelector("#filter-chips").hidden=false;document.querySelector(".search-box").hidden=false;document.querySelector("#panel-map .section-row").hidden=false;if(!selectedMapPoint)document.querySelector("#map-point-card").hidden=true;}
    sheetScroll.scrollTop=0;
    if(openSheet)setSheetState("half");
    updateMapLayers();
    if(mapLibreMap)window.setTimeout(()=>mapLibreMap&&mapLibreMap.resize(),100);
  }

  function visibleFor(state) {
    const height=appShell.clientHeight||window.innerHeight;
    return state==="peek"?Math.round(Math.max(124,Math.min(146,height*.17))):state==="half"?Math.round(height*.53):Math.round(height*.82);
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
  let sheetDrag=null;
  let suppressHandleClick=false;
  handle.addEventListener("pointerdown",event=>{
    if(event.button!==undefined&&event.button!==0)return;
    sheetDrag={startY:event.clientY,lastY:event.clientY,lastTime:performance.now(),startVisible:visibleFor(sheet.dataset.state),velocity:0};
    sheet.classList.add("is-dragging");handle.setPointerCapture(event.pointerId);event.preventDefault();
  });
  handle.addEventListener("pointermove",event=>{
    if(!sheetDrag)return;
    const now=performance.now(),delta=event.clientY-sheetDrag.startY;
    if(Math.abs(delta)>6)suppressHandleClick=true;
    const next=Math.max(visibleFor("peek"),Math.min(visibleFor("full"),sheetDrag.startVisible-delta));
    sheet.style.setProperty("--sheet-visible",next+"px");
    sheetDrag.velocity=(event.clientY-sheetDrag.lastY)/Math.max(1,now-sheetDrag.lastTime);
    sheetDrag.lastY=event.clientY;sheetDrag.lastTime=now;
  });
  function finishSheetDrag(){
    if(!sheetDrag)return;
    const visible=parseFloat(getComputedStyle(sheet).getPropertyValue("--sheet-visible"))||visibleFor(sheet.dataset.state);
    const state=nearestSheetState(visible,sheetDrag.velocity);sheetDrag=null;sheet.classList.remove("is-dragging");setSheetState(state);
  }
  handle.addEventListener("pointerup",finishSheetDrag);handle.addEventListener("pointercancel",()=>{finishSheetDrag();suppressHandleClick=false;});
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
    const route=event.target.closest('[data-action="navigate-to-place"]');if(route){const place=placeById.get(route.dataset.id);if(place)startRouteToPoint({coords:[place.lat,place.lon],name:place.name,label:place.name,address:place.district});return;}
    const add=event.target.closest('[data-action="add-place"]');if(add){if(addRouteStop(add.dataset.id))setTab("route");}
  });
  document.querySelector("#panel-map").addEventListener("click",event=>{
    const action=event.target.closest("[data-action]")?.dataset.action;
    if(action==="close-map-point"){closeMapPoint();return;}
    if(action==="add-map-point-to-day"){addSelectedMapPointToDay();return;}
    if(action==="navigate-to-point"&&selectedMapPoint)startRouteToPoint({coords:selectedMapPoint.coords,name:safePointLabel(selectedMapPoint),label:safePointLabel(selectedMapPoint),address:selectedMapPoint.address});
  });
  document.querySelector("#panel-route").addEventListener("click",event=>{
    const control=event.target.closest("[data-action]");if(control&&control.dataset.action!=="visit")routeAction(control.dataset.action,control.dataset.index);
    if(event.target.id==="find-route-places"){setTab("map");selectedPlaceId=null;renderPlaces();setSheetState("half");}
    if(event.target.id==="clear-route"){routeItems=[];persistRoute();renderRoute();updateBadge();showToast("Маршрут очищен");}
  });
  document.querySelector("#panel-route").addEventListener("change",event=>{const check=event.target.closest('[data-action="visit"]');if(check)routeAction("visit",check.dataset.index);});
  document.querySelector("#route-mode-switch").addEventListener("click",event=>{
    const button=event.target.closest("[data-route-mode]");if(!button)return;
    navigationMode=button.dataset.routeMode;
    document.querySelectorAll(".route-mode-button").forEach(item=>{const active=item===button;item.classList.toggle("is-active",active);item.setAttribute("aria-pressed",String(active));});
    if(navigationRoute){document.querySelector("#navigation-result-duration").textContent="Режим изменён · постройте маршрут заново "+modeCaption()+".";}
  });
  document.querySelector("#build-navigation-route").addEventListener("click",buildNavigationRoute);
  document.querySelector("#clear-navigation-route").addEventListener("click",clearNavigationRoute);
  document.querySelector("#route-swap").addEventListener("click",()=>{
    const from=document.querySelector("#navigation-from"),to=document.querySelector("#navigation-to"),value=from.value;
    from.value=to.value;to.value=value;[routeOriginSelection,routeDestinationSelection]=[routeDestinationSelection,routeOriginSelection];
  });
  document.querySelector("#route-use-location").addEventListener("click",async()=>{
    const button=document.querySelector("#route-use-location");button.disabled=true;setNavigationStatus("Определяем ваше местоположение…","loading");
    try{const coords=await requestCurrentLocation();setUserLocation(coords);document.querySelector("#navigation-from").value="Моё местоположение";routeOriginSelection=null;setNavigationStatus("Начало маршрута задано по геолокации.");}
    catch(error){setNavigationStatus(error.message||"Не удалось определить местоположение.","error");}
    finally{button.disabled=false;}
  });
  document.querySelector("#budget-slider").addEventListener("input",event=>{maxBudget=Number(event.target.value);renderHotels();});
  document.querySelector("#hotel-list").addEventListener("click",event=>{
    const book=event.target.closest('[data-action="book"]');if(book){showBooking(book.dataset.id);return;}
    const route=event.target.closest('[data-action="route-hotel"]');if(route){const hotel=hotelById.get(route.dataset.id);if(hotel)startRouteToPoint({coords:[hotel.lat,hotel.lon],name:hotel.name,label:hotel.name,address:hotel.district});return;}
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
    top.style.transform="translate3d("+(liked?"130%":"-130%")+", 0, 0) rotate("+(liked?"18deg":"-18deg")+")";top.style.opacity="0";
    window.setTimeout(()=>{decideTip(liked);tipDismissing=false;},180);
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
    if(Math.abs(dx)>90){decideTip(dx>0);return;}
    card.style.transition="transform .36s cubic-bezier(.2,1,.3,1)";card.style.transform="";card.classList.remove("drag-left","drag-right");
  }
  tipStage.addEventListener("pointerup",finishTipDrag);tipStage.addEventListener("pointercancel",finishTipDrag);
  document.querySelector("#locate-button").addEventListener("click",async()=>{
    showToast("Определяем ваше местоположение…");
    try{const coords=await requestCurrentLocation(12000);setUserLocation(coords,true);showToast("Местоположение найдено");}
    catch(error){showToast(error.message||"Не удалось определить местоположение.");}
  });
  document.querySelector("#zoom-in").addEventListener("click",()=>mapLibreMap&&mapLibreMap.zoomTo(mapLibreMap.getZoom()+1,{duration:300}));
  document.querySelector("#zoom-out").addEventListener("click",()=>mapLibreMap&&mapLibreMap.zoomTo(mapLibreMap.getZoom()-1,{duration:300}));
  document.querySelector("#map-mode").addEventListener("click",()=>{if(!mapLibreMap)return;const pitch=mapLibreMap.getPitch()>1?0:60;mapLibreMap.easeTo({pitch,duration:650,essential:true});});
  document.querySelector("#sheet-action").addEventListener("click",async()=>{
    const shareData={title:"GadWay — Петербург",text:"Мой карманный путеводитель по Санкт-Петербургу",url:location.href};
    if(navigator.share){try{await navigator.share(shareData);}catch(error){if(error.name!=="AbortError")showToast("Не удалось открыть меню отправки");}}
    else if(navigator.clipboard){try{await navigator.clipboard.writeText(location.href);showToast("Ссылка скопирована");}catch{showToast("Скопируйте ссылку из адресной строки");}}
    else showToast("Скопируйте ссылку из адресной строки");
  });

  window.addEventListener("resize",()=>{setSheetState(sheet.dataset.state);if(mapLibreMap)mapLibreMap.resize();});
  window.addEventListener("keydown",event=>{if(event.key==="Escape"&&selectedMapPoint)closeMapPoint();else if(event.key==="Escape"&&selectedPlaceId){selectedPlaceId=null;renderPlaces();}});

  function init() {
    initMap();
    document.querySelector("#budget-slider").value=maxBudget;
    renderPlaces();renderRoute();renderHotels();renderTips();updateBadge();
    setTab("map",false);setSheetState("half");
  }
  init();
})();
