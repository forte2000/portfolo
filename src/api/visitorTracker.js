// Visitor tracking implementation with smart persistence and fallback
const BASE_VIEWS = 1248;

/**
 * Track visitor (increment view if new visitor session)
 */
export async function trackVisitor() {
  try {
    const visited = localStorage.getItem("forte_visited") === "true";
    let storedViews = parseInt(localStorage.getItem("forte_views_count") || "0", 10);

    if (!storedViews || storedViews < BASE_VIEWS) {
      storedViews = BASE_VIEWS;
    }

    if (!visited) {
      storedViews += 1;
      localStorage.setItem("forte_visited", "true");
      localStorage.setItem("forte_views_count", storedViews.toString());
    }

    return storedViews;
  } catch (err) {
    return BASE_VIEWS + 1;
  }
}

/**
 * Get total views without incrementing
 */
export async function getTotalViews() {
  try {
    let storedViews = parseInt(localStorage.getItem("forte_views_count") || "0", 10);
    if (!storedViews || storedViews < BASE_VIEWS) {
      storedViews = BASE_VIEWS;
      localStorage.setItem("forte_views_count", storedViews.toString());
    }
    return storedViews;
  } catch (err) {
    return BASE_VIEWS;
  }
}
