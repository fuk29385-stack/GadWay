(() => {
  const STORAGE_PREFIX = "gadway-reviews:";
  const configuration = () => window.GADWAY_CONFIG || {};
  const apiUrl = "/api/reviews";
  const supabase = () => {
    const config = configuration();
    if (!config.supabaseUrl || !config.supabaseAnonKey) return null;
    return { url: config.supabaseUrl.replace(/\/$/, ""), key: config.supabaseAnonKey };
  };
  function normalize(rows) {
    const reviews = Array.isArray(rows) ? rows : [];
    const ratings = reviews.map(review => Number(review.rating)).filter(rating => Number.isInteger(rating) && rating >= 1 && rating <= 5);
    return { reviews, summary: { count: reviews.length, average: ratings.length ? Math.round(ratings.reduce((a,b) => a+b, 0) / ratings.length * 10) / 10 : 0 } };
  }
  function localRead(placeId) {
    try { return JSON.parse(localStorage.getItem(STORAGE_PREFIX + placeId) || "[]").filter(r => r && Number(r.rating) >= 1 && Number(r.rating) <= 5); }
    catch { return []; }
  }
  async function apiRequest(url, options = {}) {
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal, headers: { Accept: "application/json", ...(options.headers || {}) } });
      if (!response.ok) throw new Error(`Reviews API failed (${response.status})`);
      return await response.json();
    } finally { clearTimeout(timer); }
  }
  async function list(placeId) {
    if (!placeId) return normalize([]);
    try {
      const params = new URLSearchParams({ placeId });
      const result = await apiRequest(`${apiUrl}?${params}`);
      const normalized = normalize(result.reviews);
      if (result.summary) normalized.summary = { ...normalized.summary, ...result.summary };
      return normalized;
    } catch (error) {
      console.info("Neon reviews API is unavailable; trying configured fallback", error.message);
    }
    const config = supabase();
    if (!config) return normalize(localRead(placeId));
    const query = new URLSearchParams({ place_id: `eq.${placeId}`, select: "id,place_id,user_id,author_name,rating,comment,created_at", order: "created_at.desc" });
    try {
      const response = await fetch(`${config.url}/rest/v1/reviews?${query}`, { headers: { apikey: config.key, Authorization: `Bearer ${config.key}`, Accept: "application/json" } });
      if (!response.ok) throw new Error(`Supabase reviews read failed (${response.status})`);
      return normalize(await response.json());
    } catch (error) {
      console.warn("Supabase unavailable; loading reviews from this device", error);
      return normalize(localRead(placeId));
    }
  }
  async function add(placeId, input) {
    const author_name = String(input.author_name || "").trim().slice(0, 80);
    const comment = String(input.comment || "").trim();
    const rating = Number(input.rating);
    if (!placeId || !author_name || !comment || comment.length > 1000 || !Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error("Укажите имя, оценку и комментарий до 1000 символов.");
    const row = { place_id: placeId, user_id: null, author_name, rating, comment, created_at: new Date().toISOString() };
    try {
      const result = await apiRequest(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ placeId, author_name, rating, comment }) });
      return result.review || row;
    } catch (error) {
      console.info("Neon reviews API is unavailable; trying configured fallback", error.message);
    }
    const config = supabase();
    if (config) {
      try {
        const response = await fetch(`${config.url}/rest/v1/reviews`, { method: "POST", headers: { apikey: config.key, Authorization: `Bearer ${config.key}`, "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(row) });
        if (!response.ok) throw new Error(`Supabase reviews write failed (${response.status})`);
        return (await response.json())[0] || row;
      } catch (error) {
        console.warn("Supabase unavailable; saving review on this device", error);
      }
    }
    const reviews = localRead(placeId);
    const local = { ...row, id: `local:${Date.now()}:${Math.random().toString(36).slice(2, 8)}` };
    reviews.unshift(local);
    try { localStorage.setItem(STORAGE_PREFIX + placeId, JSON.stringify(reviews)); }
    catch { throw new Error("Не удалось сохранить отзыв на этом устройстве."); }
    return local;
  }
  window.GadWayReviews = { list, add };
})();
