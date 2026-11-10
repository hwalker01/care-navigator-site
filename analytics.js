// Page-view counts with Umami (cookie-free, no personal data). Off unless umamiWebsiteId is set in config.js.
// Never sends what people type: the page address is counted without its ?query or #part, and visitors who turn on
// "Do Not Track" in their browser are not counted at all. Umami does not use cookies, so no cookie banner is needed.
(function () {
  if (typeof document === "undefined" || typeof NAV_CONFIG === "undefined") return;
  var c = NAV_CONFIG.SITE_SERVICES || {};
  // Tell people when anything is counted (PRIVACY.md, "Before real patients" item 4).
  if ((c.supabaseUrl && c.supabaseAnonKey) || c.umamiWebsiteId || c.vercelAnalyticsHost) document.addEventListener("DOMContentLoaded", function () {
    var n = document.getElementById("servicesNote"); if (n) n.classList.remove("hidden");
  });
  // Vercel Web Analytics (cookie-free). Only on the Vercel site; skipped with "Do Not Track"; the address is sent without ?query or #part.
  var dnt = typeof navigator !== "undefined" && (navigator.doNotTrack === "1" || window.doNotTrack === "1");
  if (c.vercelAnalyticsHost && !dnt && typeof location !== "undefined" && location.hostname === c.vercelAnalyticsHost) {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    window.va("beforeSend", function (ev) { if (ev && ev.url) ev.url = String(ev.url).split(/[?#]/)[0]; return ev; });
    var v = document.createElement("script"); v.defer = true; v.src = "/_vercel/insights/script.js"; document.head.appendChild(v);
  }
  if (!c.umamiWebsiteId || !c.umamiScript) return;
  var s = document.createElement("script");
  s.defer = true;
  s.src = c.umamiScript;
  s.setAttribute("data-website-id", c.umamiWebsiteId);
  s.setAttribute("data-do-not-track", "true");
  s.setAttribute("data-exclude-search", "true");
  s.setAttribute("data-exclude-hash", "true");
  if (c.umamiDomains) s.setAttribute("data-domains", c.umamiDomains);
  document.head.appendChild(s);
})();
