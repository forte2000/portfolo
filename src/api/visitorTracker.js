// Real-time visitor tracking connected to cloud counter API with local fallback
const API_URL = "https://countapi.mileshilliard.com/api/v1";
const COUNTER_KEY = "forte2000_portfolio_views";
const DEFAULT_VIEWS = 351;

/**
 * Track visitor (increment view if new visitor session)
 */
export async function trackVisitor() {
  try {
    const res = await fetch(`${API_URL}/hit/${COUNTER_KEY}`, {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === "number") {
        localStorage.setItem("visited", "true");
        localStorage.setItem("forte_visited", "true");
        localStorage.setItem("forte_views_count", data.value.toString());
        return data.value;
      }
    }
  } catch (err) {
    console.warn("View counter hit fallback:", err);
  }

  // Graceful local fallback if offline
  let storedViews = parseInt(localStorage.getItem("forte_views_count") || "0", 10);
  if (!storedViews || storedViews < DEFAULT_VIEWS) {
    storedViews = DEFAULT_VIEWS;
  }
  storedViews += 1;
  localStorage.setItem("visited", "true");
  localStorage.setItem("forte_visited", "true");
  localStorage.setItem("forte_views_count", storedViews.toString());
  return storedViews;
}

/**
 * Get total views without incrementing
 */
export async function getTotalViews() {
  try {
    const res = await fetch(`${API_URL}/get/${COUNTER_KEY}`, {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === "number") {
        localStorage.setItem("forte_views_count", data.value.toString());
        return data.value;
      }
    }
  } catch (err) {
    console.warn("View counter get fallback:", err);
  }

  // Graceful local fallback if offline
  let storedViews = parseInt(localStorage.getItem("forte_views_count") || "0", 10);
  if (!storedViews || storedViews < DEFAULT_VIEWS) {
    storedViews = DEFAULT_VIEWS;
    localStorage.setItem("forte_views_count", storedViews.toString());
  }
  return storedViews;
}
