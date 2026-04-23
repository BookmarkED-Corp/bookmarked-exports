/**
 * Portal Assignments Config
 * =========================
 * Shared config + UI module for district ownership across all portal tabs.
 *
 * Fills in the GAS webapp URL after deployment  until then, the UI shows
 * read-only HubSpot-seeded assignments and disables dropdowns with a
 * friendly banner explaining "Deploy pending."
 *
 * GAS webapp URL: paste the "Web app URL" from Apps Script Deploy  Manage
 * deployments after clicking Deploy as web app.
 */
(function (global) {
  const CONFIG = {
    // Deployed 2026-04-23 by Steve. Redeploy = update URL here.
    GAS_WEBAPP_URL: "https://script.google.com/macros/s/AKfycbzS1BV8wsMOCAyXqs5sIewr9I9td_D6jsHv_SZFwzuQQGqZ9xFsy1zRvnpMR3jtGkA4/exec",
    OWNERS: ["Unassigned", "Jan", "Teela", "Steve"],
    SHEET_URL: "https://docs.google.com/spreadsheets/d/1YhHfA7fYCUFtgrtk32Q9JD2eJSJgPUnNE0msWMnEWJI/edit",
    NOTIFY: ["jan@bookmarked.com", "teela@bookmarked.com", "steve@bookmarked.com"],
  };

  const OWNER_COLORS = {
    Jan: "#7C3AED",       // violet
    Teela: "#DB2777",     // pink
    Steve: "#0891B2",     // cyan
    Unassigned: "#9CA3AF",// muted gray
  };

  // ---- Identity ----
  const IDENTITY_KEY = "bookmarkedPortalIdentity";
  function getIdentity() {
    try { return localStorage.getItem(IDENTITY_KEY) || ""; } catch (e) { return ""; }
  }
  function setIdentity(name) {
    try {
      if (CONFIG.OWNERS.indexOf(name) === -1) return;
      localStorage.setItem(IDENTITY_KEY, name);
    } catch (e) { /* ignore */ }
  }
  function ensureIdentity() {
    let who = getIdentity();
    if (!who) {
      who = promptIdentity();
    }
    return who;
  }
  function promptIdentity() {
    // Native prompt fallback; the identity picker UI in the nav handles this nicer.
    const choice = window.prompt(
      "Who are you? (type Jan, Teela, or Steve)  this is stored only on this device."
    );
    if (!choice) return "";
    const norm = choice.trim();
    const match = CONFIG.OWNERS.find(o => o.toLowerCase() === norm.toLowerCase() && o !== "Unassigned");
    if (match) { setIdentity(match); return match; }
    return "";
  }

  // ---- Data fetching ----
  let _cache = null; // { [slug]: { owner, previous_owner, updated_at, updated_by } }
  let _cacheTs = 0;
  const CACHE_TTL_MS = 60 * 1000;

  async function loadAssignments() {
    // Live GAS first (if URL configured), snapshot fallback.
    if (CONFIG.GAS_WEBAPP_URL) {
      if (_cache && Date.now() - _cacheTs < CACHE_TTL_MS) return _cache;
      try {
        const url = CONFIG.GAS_WEBAPP_URL + "?action=list&t=" + Date.now();
        const resp = await fetch(url, { method: "GET", redirect: "follow" });
        const data = await resp.json();
        if (data.ok) {
          _cache = data.assignments || {};
          _cacheTs = Date.now();
          return _cache;
        }
      } catch (e) {
        console.warn("Live assignments fetch failed, falling back to snapshot", e);
      }
    }
    // Snapshot
    try {
      const r = await fetch("media-items.json").catch(() => null); // warm
    } catch (e) {}
    try {
      const r = await fetch("assignments.json?t=" + Date.now());
      if (r.ok) {
        const json = await r.json();
        // Snapshot uses {assignments: {slug: {owner, source, ...}}}
        const out = {};
        const a = json.assignments || {};
        for (const slug in a) {
          out[slug] = {
            owner: a[slug].owner || "Unassigned",
            previous_owner: a[slug].previous_owner || "",
            updated_at: a[slug].updated_at || "",
            updated_by: a[slug].updated_by || "",
            source: a[slug].source || "",
          };
        }
        _cache = out;
        _cacheTs = Date.now();
        return out;
      }
    } catch (e) {
      console.warn("Snapshot fetch failed", e);
    }
    return {};
  }

  async function saveAssignment({ district_slug, district_name, esc_region, owner, actor }) {
    if (!CONFIG.GAS_WEBAPP_URL) {
      throw new Error("Deploy pending  webapp URL not yet configured. Assignments are read-only until the webapp is deployed.");
    }
    const body = { action: "assign", district_slug, district_name, esc_region, owner, actor };
    const resp = await fetch(CONFIG.GAS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });
    const data = await resp.json();
    if (!data.ok) throw new Error(data.error || "save failed");
    // Update local cache optimistically
    if (_cache) {
      _cache[district_slug] = {
        owner: data.owner,
        previous_owner: data.previous_owner,
        updated_at: data.updated_at,
        updated_by: data.updated_by,
        source: "ui",
      };
    }
    return data;
  }

  function invalidateCache() { _cache = null; _cacheTs = 0; }

  // ---- Rendering helpers ----
  function ownerPill(owner, opts = {}) {
    const o = owner || "Unassigned";
    const color = OWNER_COLORS[o] || OWNER_COLORS.Unassigned;
    const size = opts.size === "sm" ? "font-size:0.68rem;padding:1px 7px;" : "font-size:0.75rem;padding:2px 10px;";
    return `<span class="owner-pill" style="display:inline-block;border-radius:999px;background:${color}1A;color:${color};font-weight:700;letter-spacing:0.2px;text-transform:uppercase;${size}border:1px solid ${color}40;">${o}</span>`;
  }

  function renderAssignSection({ slug, districtName, escRegion, currentOwner, onChange }) {
    const who = getIdentity();
    const disabled = !CONFIG.GAS_WEBAPP_URL;
    const deployBanner = disabled
      ? `<div style="font-size:0.78rem;color:#92400E;background:#FFFBEB;border:1px solid #FDE68A;padding:6px 10px;border-radius:6px;margin-top:8px;">Write access pending. The assignment webapp will go live after Steve deploys it (see release email). Current values reflect HubSpot open-deal ownership.</div>`
      : "";
    const whoChip = who
      ? `<span style="font-size:0.72rem;color:#9CA3AF;">you are: <strong style="color:#101828;">${who}</strong></span>`
      : `<button type="button" onclick="PortalAssignments.changeIdentity().then(v=>{ if(v) location.reload(); })" style="font-size:0.72rem;color:#107569;background:none;border:none;cursor:pointer;text-decoration:underline;padding:0;">sign in as Jan / Teela / Steve</button>`;
    const selectHtml = CONFIG.OWNERS
      .map(o => `<option value="${o}"${o === (currentOwner || "Unassigned") ? " selected" : ""}>${o}</option>`)
      .join("");
    return `
      <section class="profile-section" id="assign-section">
        <h2 class="section-title">👤 Assigned To ${ownerPill(currentOwner || "Unassigned")}</h2>
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
          <select id="assign-select" ${disabled ? "disabled" : ""} onchange="PortalAssignments._handleAssign('${slug}', this)" style="font-family:inherit;font-size:0.95rem;padding:8px 14px;border:1.5px solid #E5E7EB;border-radius:8px;background:#fff;font-weight:600;cursor:${disabled ? "not-allowed" : "pointer"};">
            ${selectHtml}
          </select>
          ${whoChip}
          <span id="assign-status" style="font-size:0.78rem;color:#107569;"></span>
        </div>
        ${deployBanner}
        <p class="muted small" style="margin-top:10px;">Assignment changes email Jan, Teela, and Steve. Source of truth: <a href="${CONFIG.SHEET_URL}" target="_blank" rel="noopener" style="color:#107569;">assignments sheet ↗</a></p>
      </section>
    `;
  }

  async function _handleAssign(slug, selectEl) {
    const status = document.getElementById("assign-status");
    const actor = ensureIdentity();
    if (!actor) {
      if (selectEl) selectEl.value = selectEl.dataset.prev || "Unassigned";
      return;
    }
    const newOwner = selectEl.value;
    const prev = selectEl.dataset.prev || "Unassigned";
    if (newOwner === prev) return;
    if (status) { status.textContent = "saving…"; status.style.color = "#9CA3AF"; }
    try {
      // district_name + esc_region from DATA if available
      let districtName = "", escRegion = "";
      if (global.DATA && global.DATA.districts && global.DATA.districts[slug]) {
        districtName = global.DATA.districts[slug].name || "";
        escRegion = global.DATA.districts[slug].esc_region || "";
      }
      const result = await saveAssignment({
        district_slug: slug,
        district_name: districtName,
        esc_region: escRegion,
        owner: newOwner,
        actor,
      });
      selectEl.dataset.prev = newOwner;
      if (status) {
        status.textContent = `saved · email sent to team`;
        status.style.color = "#107569";
        setTimeout(() => { if (status) status.textContent = ""; }, 4000);
      }
      // Update the pill in the header
      const head = document.querySelector("#assign-section .section-title");
      if (head) {
        head.innerHTML = head.innerHTML.replace(/<span class="owner-pill"[^<]*<\/span>/, ownerPill(newOwner));
      }
    } catch (e) {
      console.error(e);
      if (status) { status.textContent = "save failed: " + e.message; status.style.color = "#C2410C"; }
      selectEl.value = prev;
    }
  }

  async function changeIdentity() {
    const who = promptIdentity();
    return who;
  }

  // ---- Identity picker for portal nav ----
  function renderIdentityPicker() {
    const who = getIdentity();
    if (who) {
      return `<div class="identity-picker" style="display:flex;align-items:center;gap:8px;padding:4px 12px;background:#F1F4F9;border-radius:999px;font-size:0.78rem;">
        <span style="color:#9CA3AF;text-transform:uppercase;letter-spacing:0.5px;font-weight:700;font-size:0.66rem;">You</span>
        ${ownerPill(who, {size: "sm"})}
        <button type="button" onclick="PortalAssignments.changeIdentity().then(v=>{ if(v) location.reload(); })" style="font-size:0.7rem;color:#9CA3AF;background:none;border:none;cursor:pointer;padding:0;">change</button>
      </div>`;
    }
    return `<div class="identity-picker" style="display:flex;align-items:center;gap:8px;">
      <button type="button" onclick="PortalAssignments.changeIdentity().then(v=>{ if(v) location.reload(); })" style="font-size:0.78rem;color:#107569;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:999px;padding:4px 12px;cursor:pointer;font-weight:600;">Sign in as Jan / Teela / Steve</button>
    </div>`;
  }

  // Insert identity picker into portal-nav-brand's parent after DOM ready
  function mountIdentityPicker() {
    const brand = document.querySelector(".portal-nav-brand");
    if (!brand) return;
    const existing = document.getElementById("portal-identity");
    if (existing) existing.remove();
    const wrap = document.createElement("div");
    wrap.id = "portal-identity";
    wrap.style.cssText = "margin-left:auto;display:flex;align-items:center;";
    wrap.innerHTML = renderIdentityPicker();
    brand.style.display = "flex";
    brand.style.alignItems = "center";
    brand.style.justifyContent = "space-between";
    brand.appendChild(wrap);
  }

  global.PortalAssignments = {
    CONFIG,
    OWNER_COLORS,
    getIdentity, setIdentity, ensureIdentity, changeIdentity,
    loadAssignments, saveAssignment, invalidateCache,
    ownerPill, renderAssignSection, renderIdentityPicker, mountIdentityPicker,
    _handleAssign,
  };

  // Auto-mount identity picker on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountIdentityPicker);
  } else {
    mountIdentityPicker();
  }
})(window);
