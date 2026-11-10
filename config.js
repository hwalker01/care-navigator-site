// Everything a hospital customer would change lives here.
// Anything marked SAMPLE is a placeholder, not a real hospital's policy.

var NAV_CONFIG = {
  // 2026 HHS poverty guidelines, 48 contiguous states + DC.
  // Federal Register Vol. 91 No. 10, 15 Jan 2026 (2026-00755).
  // Alaska and Hawaii use separate, higher tables - not loaded yet.
  FPL: { year: 2026, base: 15960, perAdditional: 5680, unsupportedStates: ["AK", "HI"] },

  // No made-up hospital discount tiers. The 501(r) screener uses, in order:
  // the hospital's own policy (if entered), then the state's legal minimum (state-laws.js), else "depends on the hospital".
  // Federal minimums from Treas. Reg. 1.501(r)-6. Hospitals may be more generous.
  RULES_501R: {
    applicationWindowDays: 240, // must accept applications for at least 240 days after first post-discharge bill
    noEcaBeforeDays: 120        // no extraordinary collection actions before 120 days after first post-discharge bill
  },

  // Online services for the public site. Leave a value empty to turn that service off (the app works the same).
  // See DEPLOY.md, "Vercel + Supabase + Umami". These values are public by design: they end up in every visitor's browser.
  SITE_SERVICES: {
    // Supabase: only the anonymous "Was this helpful?" answers (tab, yes/no, fixed reason, day). See supabase/feedback.sql.
    supabaseUrl: "https://islogcsodswrtanzpwhj.supabase.co",       // e.g. "https://abcdefgh.supabase.co"  (Project Settings → API → Project URL)
    supabaseAnonKey: "sb_publishable_yG-jz0Uc9DwmvnBzYr2v1g_KhhnFsGs",   // the "anon" / "publishable" key, NEVER the service_role / secret key
    // Umami: cookie-free page-view counts. No personal data, no cookie banner needed.
    umamiWebsiteId: "ae2cfadd-2813-4950-a53b-26d790f1a2cb",    // Umami → Settings → Websites → Edit → Website ID
    umamiScript: "https://cloud.umami.is/script.js",
    umamiDomains: "care-navigator-site.vercel.app",      // only count visits on these hostnames, e.g. "care-navigator.vercel.app" (empty = everywhere)
    // Vercel Web Analytics: cookie-free page-view counts. Turn it on in Vercel → project → Analytics → Enable first.
    vercelAnalyticsHost: "care-navigator-site.vercel.app"  // only loads on this hostname (empty = off)
  }
};

if (typeof module !== "undefined") module.exports = NAV_CONFIG;
