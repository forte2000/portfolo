// Official Visitor Tracking API from Vercel deployment (viewapi-alpha.vercel.app)
const VERCEL_API_URL = "https://viewapi-alpha.vercel.app";
const BACKUP_API_URL = "https://countapi.mileshilliard.com/api/v1";
const BACKUP_KEY = "forte2000_portfolio_views";
const DEFAULT_VIEWS = 351;

/**
 * Track visitor (increment view if new visitor session)
 */
export async function trackVisitor() {
  const visited = localStorage.getItem("visited") === "true";

  // 1. Try your primary Vercel viewapi-alpha backend
  try {
    const res = await fetch(`${VERCEL_API_URL}/api/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newVisitor: !visited }),
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.total === "number") {
        localStorage.setItem("visited", "true");
        localStorage.setItem("forte_views_count", data.total.toString());
        return data.total;
      }
    }
  } catch (err) {
    console.warn("Primary Vercel viewapi error:", err);
  }

  // 2. Fallback to Cloud CountAPI if primary backend database is paused
  try {
    const res = await fetch(`${BACKUP_API_URL}/hit/${BACKUP_KEY}`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === "number") {
        localStorage.setItem("visited", "true");
        localStorage.setItem("forte_views_count", data.value.toString());
        return data.value;
      }
    }
  } catch (err) {
    console.warn("Backup counter error:", err);
  }

  // 3. Local fallback
  let stored = parseInt(localStorage.getItem("forte_views_count") || "0", 10);
  if (!stored || stored < DEFAULT_VIEWS) stored = DEFAULT_VIEWS;
  if (!visited) stored += 1;
  localStorage.setItem("visited", "true");
  localStorage.setItem("forte_views_count", stored.toString());
  return stored;
}

/**
 * Get total views without incrementing
 */
export async function getTotalViews() {
  // 1. Try your primary Vercel viewapi-alpha backend
  try {
    const res = await fetch(`${VERCEL_API_URL}/api/views`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.total === "number") {
        localStorage.setItem("forte_views_count", data.total.toString());
        return data.total;
      }
    }
  } catch (err) {
    console.warn("Primary Vercel viewapi get error:", err);
  }

  // 2. Fallback to Cloud CountAPI if primary backend database is paused
  try {
    const res = await fetch(`${BACKUP_API_URL}/get/${BACKUP_KEY}`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === "number") {
        localStorage.setItem("forte_views_count", data.value.toString());
        return data.value;
      }
    }
  } catch (err) {
    console.warn("Backup counter get error:", err);
  }

  // 3. Local fallback
  let stored = parseInt(localStorage.getItem("forte_views_count") || "0", 10);
  if (!stored || stored < DEFAULT_VIEWS) stored = DEFAULT_VIEWS;
  return stored;
}
