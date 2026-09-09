/**
 * NETWORK-FLOW-CARD v1.6.0
 * A power-flow-card-plus style custom visual card for Home Assistant
 * featuring internet, router, LAN, Wi-Fi access points, and multi-row individual device monitoring.
 *
 * Visual style inspired by power-flow-card-plus by flixlix:
 * https://github.com/flixlix/power-flow-card-plus
 * (independent implementation, no shared code)
 *
 * https://github.com/YOUR_GITHUB_USERNAME/network-flow-card
 */

import {
  LitElement,
  html,
  css,
  svg
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

console.info(
  "%c NETWORK-FLOW-CARD %c v1.6.0 ",
  "color: white; background: #3b82f6; font-weight: 700;",
  "color: #3b82f6; background: white; font-weight: 700;"
);

// --- Default Configurations ---
const DEFAULT_ACCESS_POINT = {
  entity: "",
  name: "",
  icon: "mdi:wifi",
  devices_icon: "mdi:devices",
  is_primary: false,
  show_backhaul_icon: true,
  show_primary_badge: true,
  entities: {
    connected_devices: "",
    download: "",
    upload: "",
    backhaul_type: "",
    backhaul_speed: ""
  },
  colors: {
    icon: "var(--primary-color)",
    circle: "var(--primary-color)",
    download: "var(--blue-color)",
    upload: "var(--orange-color)",
    line: "var(--primary-text-color)",
    devices_circle: "var(--purple-color)",
    devices_icon: "var(--primary-color)",
    devices_line: "var(--purple-color)",
    backhaul_icon: "var(--secondary-text-color)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)",
    devices_offline_circle: "var(--error-color)",
    devices_offline_icon: "var(--error-color)",
    primary_badge: "var(--orange-color)",
    primary_badge_icon: "var(--card-background-color)",
    primary_badge_border: "transparent"
  }
};

const DEFAULT_INDIVIDUAL_DEVICE = {
  entity: "",
  icon: "mdi:devices",
  colors: {
    circle: "var(--primary-color)",
    icon: "var(--primary-color)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)"
  }
};

const DEFAULT_CONFIG = {
  type: "custom:network-flow-card",
  title: "",
  summary_position: "top",
  summary_items: ["download", "upload", "ping"],
  primary_ap_layout: "tiered",
  primary_badge_icon: "mdi:star",
  primary_badge_size: 18,
  primary_badge_icon_size: 12,
  vpn_entity: "",
  vpn_target: "router",
  vpn_animate_offline: false,
  vpn_badge_icon: "mdi:vpn",
  vpn_badge_color: "var(--blue-color)",
  vpn_badge_icon_color: "var(--card-background-color)",
  vpn_badge_border_color: "transparent",
  vpn_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  vpn_badge_offline_icon_color: "var(--card-background-color)",
  vpn_badge_offline_border_color: "transparent",
  vpn_badge_size: 18,
  vpn_badge_icon_size: 12,
  firewall_entity: "",
  firewall_target: "router",
  firewall_animate_offline: false,
  firewall_badge_icon: "mdi:wall-fire",
  firewall_badge_color: "var(--orange-color)",
  firewall_badge_icon_color: "var(--card-background-color)",
  firewall_badge_border_color: "transparent",
  firewall_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  firewall_badge_offline_icon_color: "var(--card-background-color)",
  firewall_badge_offline_border_color: "transparent",
  firewall_badge_size: 18,
  firewall_badge_icon_size: 12,
  ap_circle_size: 72,
  ap_icon_size: 24,
  ap_devices_circle_size: 56,
  ap_devices_icon_size: 20,
  individual_device_circle_size: 42,
  individual_device_icon_size: 20,
  internet: {
    name: "",
    entity: "",
    icon: "mdi:web",
    circle_size: 72,
    icon_size: 24,
    download_icon: "mdi:download",
    upload_icon: "mdi:upload",
    ping_icon: "mdi:speedometer",
    entities: {
      ping: "",
      jitter: "",
      download: "",
      upload: "",
      total_download: "",
      total_upload: "",
      billing_total: "",
      billing_remaining: ""
    },
    colors: {
      icon: "var(--primary-color)",
      billing_remaining: "var(--divider-color)",
      billing_progress: "var(--primary-color)",
      download: "var(--blue-color)",
      upload: "var(--orange-color)",
      circle: "var(--primary-color)",
      download_badge: "var(--green-color)",
      download_badge_icon: "var(--text-primary-color)",
      upload_badge: "var(--pink-color)",
      upload_badge_icon: "var(--text-primary-color)",
      ping_badge: "var(--cyan-color)",
      ping_badge_icon: "var(--text-primary-color)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)"
    }
  },
  router: {
    entity: "",
    name: "",
    icon: "mdi:router-network",
    circle_size: 72,
    icon_size: 24,
    entities: {
      status: ""
    },
    colors: {
      icon: "var(--primary-color)",
      circle: "var(--primary-color)",
      bus_line: "var(--divider-color, #ccc)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)"
    }
  },
  lan: {
    entity: "",
    icon: "mdi:lan",
    circle_size: 56,
    icon_size: 20,
    colors: {
      icon: "var(--primary-color)",
      circle: "var(--primary-color)",
      line: "var(--primary-text-color)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)"
    }
  },
  switch: {
    entity: "",
    name: "",
    icon: "mdi:switch",
    circle_size: 60,
    icon_size: 22,
    devices_icon: "mdi:devices",
    entities: {
      connected_devices: ""
    },
    colors: {
      icon: "var(--primary-color)",
      circle: "var(--primary-color)",
      bus_line: "var(--divider-color, #ccc)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)",
      devices_circle: "var(--purple-color)",
      devices_icon: "var(--primary-color)",
      devices_offline_circle: "var(--error-color)",
      devices_offline_icon: "var(--error-color)"
    }
  },
  access_points: [],
  individual_devices: [],
  individual_devices_box_color: "var(--divider-color)",
  individual_devices_line_color: "var(--primary-text-color)",
  show_summary: true,
  animation: true,
  min_flow_duration: 0.6,
  max_flow_duration: 6
};

// --- Helper Functions ---
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source || {})) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object"
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      result[key] = source[key];
    }
  }
  return result;
}

function setPathValue(obj, path, value) {
  const keys = path.split(".");
  const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
  let current = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    const isNextKeyNum = !isNaN(parseInt(nextKey, 10));

    if (Array.isArray(current[key])) {
      current[key] = [...current[key]];
    } else if (typeof current[key] === "object" && current[key] !== null) {
      current[key] = { ...current[key] };
    } else {
      current[key] = isNextKeyNum ? [] : {};
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  return newObj;
}

function getEntityState(hass, entityId) {
  if (!hass || !entityId || !hass.states[entityId]) return null;
  const stateObj = hass.states[entityId];
  const numValue = parseFloat(stateObj.state);
  return {
    stateObj,
    value: isNaN(numValue) ? null : numValue,
    display: isNaN(numValue) ? stateObj.state : formatNumber(numValue),
    unit: stateObj.attributes.unit_of_measurement || "",
    name: stateObj.attributes.friendly_name || entityId
  };
}

function getCircleLabel(customName, entityState, fallback) {
  if (customName != null && customName !== "") return customName;
  if (entityState) return entityState.display || entityState.state;
  return fallback;
}

function isDeviceOnline(hass, entityId) {
  if (!hass || !entityId || !hass.states[entityId]) return false;
  const state = String(hass.states[entityId].state).toLowerCase();
  return state === "on" || state === "home";
}

function isEntityUnavailable(hass, entityId) {
  if (!entityId) return false;
  if (!hass || !hass.states[entityId]) return true;
  const state = String(hass.states[entityId].state).toLowerCase();
  return state === "unavailable" || state === "unknown" || state === "off" || state === "not_home";
}

function isVpnActive(hass, entityId) {
  if (!entityId || !hass || !hass.states[entityId]) return false;
  const state = String(hass.states[entityId].state).toLowerCase();
  return state === "on";
}

function isBackhaulWired(hass, ap) {
  const entityId = ap.entities?.backhaul_type;
  if (!entityId || !hass || !hass.states[entityId]) return true;
  const state = String(hass.states[entityId].state).toLowerCase();
  return state === "wired";
}

function formatNumber(val) {
  if (val == null) return "-";
  if (Math.abs(val) >= 100) return val.toFixed(0);
  if (Math.abs(val) >= 10) return val.toFixed(1);
  return val.toFixed(2);
}

function roundVal(val) {
  return val == null || isNaN(val) ? "-" : String(Math.round(val));
}

function calcFlowDuration(rate, minDuration, maxDuration) {
  if (!rate || rate <= 0) return maxDuration;
  const duration = maxDuration - (maxDuration - minDuration) / (1 + 50 / rate);
  return Math.max(minDuration, Math.min(maxDuration, duration));
}

// --- Main Card Component ---
class NetworkFlowCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true }
    };
  }

  static getConfigElement() {
    return document.createElement("network-flow-card-editor");
  }

  static getStubConfig() {
    return { ...DEFAULT_CONFIG };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    const merged = deepMerge(DEFAULT_CONFIG, config);
    merged.access_points = (config.access_points || []).map((ap) =>
      deepMerge(DEFAULT_ACCESS_POINT, ap)
    );
    merged.individual_devices = (config.individual_devices || []).map((dev) =>
      deepMerge(DEFAULT_INDIVIDUAL_DEVICE, dev)
    );
    this._config = merged;
  }

  getCardSize() {
    return 4;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this._alignBusLine());
    }
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) this._resizeObserver.unobserve(this);
  }

  updated(changedProps) {
    super.updated(changedProps);
    requestAnimationFrame(() => this._alignBusLine());
  }

  // The bus-line's endpoints need to reach the exact center of the
  // outermost AP columns, which depends on their actual rendered width
  // (circle size, devices-circle size, label text, single vs dual line -
  // whatever ends up being the widest thing in that column). Rather than
  // guessing this from config values before layout happens (which was
  // fragile and broke for the common case), measure the real rendered
  // positions after the browser has laid everything out, and set the
  // bus-line's margins to match exactly.
  _alignBusLine() {
    const root = this.shadowRoot;
    if (!root) return;
    const branches = root.querySelector(".branches");
    if (!branches) return;
    const busLine = branches.querySelector(".bus-line");
    if (!busLine) return;

    branches.style.transform = "";
    const branchesRect = branches.getBoundingClientRect();

    let candidates = Array.from(
      branches.querySelectorAll(".vline, .vline-offline, .ap-col-fillline, .offline-x-mid")
    );
    let usingWideFallback = false;
    if (candidates.length < 2) {
      candidates = Array.from(
        branches.querySelectorAll(".ap-col-line, .ap-col-fillline-wrap, .offline-x-mid")
      );
      usingWideFallback = true;
    }
    if (candidates.length < 2) return;

    const rects = candidates.map((el) => el.getBoundingClientRect());
    const leftMost = rects.reduce((a, b) => (a.left < b.left ? a : b));
    const rightMost = rects.reduce((a, b) =>
      a.left + a.width > b.left + b.width ? a : b
    );

    const leftMargin = usingWideFallback
      ? Math.max(0, leftMost.left + leftMost.width / 2 - branchesRect.left)
      : Math.max(0, leftMost.left - branchesRect.left);
    const rightMargin = usingWideFallback
      ? Math.max(0, branchesRect.right - (rightMost.left + rightMost.width / 2))
      : Math.max(0, branchesRect.right - (rightMost.left + rightMost.width));
    busLine.style.marginLeft = `${leftMargin}px`;
    busLine.style.marginRight = `${rightMargin}px`;
    this._busMarginLeft = leftMargin;
    this._busMarginRight = rightMargin;

    const trunkEl = root.querySelector(".trunk");
    const trunkCircles = trunkEl
      ? Array.from(
          trunkEl.querySelectorAll(
            ":scope > .circle-wrap, :scope > .internet-row > .circle-wrap"
          )
        )
      : [];
    const feederCircle = trunkCircles[trunkCircles.length - 1];
    if (feederCircle) {
      const leftColCenter = leftMost.left + leftMost.width / 2;
      const rightColCenter = rightMost.left + rightMost.width / 2;
      const branchesMidpoint = (leftColCenter + rightColCenter) / 2;
      const feederRect = feederCircle.getBoundingClientRect();
      const feederCenterX = feederRect.left + feederRect.width / 2;
      const shiftX = feederCenterX - branchesMidpoint;
      branches.style.transform = `translateX(${shiftX}px)`;
      this._branchesShiftX = shiftX;

      // The trunk-drop defaults to justify-self:center, which centers it
      // against the whole grid group's geometric width - the same wrong
      // reference point that caused the whole-block shift bug. Position
      // it explicitly at the same midpoint used above, so it can never
      // disagree with where the block was just shifted to.
      const trunkDrop = branches.querySelector(".trunk-drop");
      if (trunkDrop) {
        const trunkMarginLeft = branchesMidpoint - branchesRect.left - 1;
        trunkDrop.style.justifySelf = "start";
        trunkDrop.style.marginLeft = `${Math.max(0, trunkMarginLeft)}px`;
        this._trunkMarginLeft = trunkMarginLeft;
      }
    }
  }

  _handleMoreInfo(entityId) {
    if (!entityId) return;
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId }
    });
    this.dispatchEvent(event);
  }

  // Shared VPN badge renderer - used on both Router and Primary AP,
  // wherever a VPN entity is actually configured. Always shows once
  // configured, switching between active/offline color sets based on
  // state. Colors are global (one consistent badge look regardless of
  // which node it appears on).
  _renderVpnBadge(hass, entityId) {
    if (!entityId) return null;
    const cfg = this._config;
    const vpnOn = isVpnActive(hass, entityId);
    const bg = vpnOn ? (cfg.vpn_badge_color ?? 'var(--blue-color)') : (cfg.vpn_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
    const iconColor = vpnOn ? (cfg.vpn_badge_icon_color ?? 'var(--card-background-color)') : (cfg.vpn_badge_offline_icon_color ?? 'var(--card-background-color)');
    const borderColor = vpnOn ? (cfg.vpn_badge_border_color ?? 'transparent') : (cfg.vpn_badge_offline_border_color ?? 'transparent');
    const flashClass = !vpnOn && cfg.vpn_animate_offline ? "vpn-badge-flash" : "";
    return html`<div
      class="vpn-badge ${flashClass}"
      style="background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; width:${cfg.vpn_badge_size ?? 18}px; height:${cfg.vpn_badge_size ?? 18}px;"
    >
      <ha-icon icon="${cfg.vpn_badge_icon || 'mdi:vpn'}" style="--mdc-icon-size:${cfg.vpn_badge_icon_size ?? 12}px"></ha-icon>
    </div>`;
  }

  _renderFirewallBadge(hass, entityId) {
    if (!entityId) return null;
    const cfg = this._config;
    const fwOn = isVpnActive(hass, entityId);
    const bg = fwOn ? (cfg.firewall_badge_color ?? 'var(--orange-color)') : (cfg.firewall_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
    const iconColor = fwOn ? (cfg.firewall_badge_icon_color ?? 'var(--card-background-color)') : (cfg.firewall_badge_offline_icon_color ?? 'var(--card-background-color)');
    const borderColor = fwOn ? (cfg.firewall_badge_border_color ?? 'transparent') : (cfg.firewall_badge_offline_border_color ?? 'transparent');
    const flashClass = !fwOn && cfg.firewall_animate_offline ? "firewall-badge-flash" : "";
    return html`<div
      class="firewall-badge ${flashClass}"
      style="background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; width:${cfg.firewall_badge_size ?? 18}px; height:${cfg.firewall_badge_size ?? 18}px;"
    >
      <ha-icon icon="${cfg.firewall_badge_icon || 'mdi:wall-fire'}" style="--mdc-icon-size:${cfg.firewall_badge_icon_size ?? 12}px"></ha-icon>
    </div>`;
  }

  // Renders one summary row by key, or null if that item isn't
  // configured (e.g. "download" selected but no download entity set).
  // ctx carries the pre-computed entity states needed for download/
  // upload/ping, since those are already resolved once in render().
  _renderSummaryItem(key, config, hass, ctx) {
    const internet = config.internet;
    if (key === "download") {
      if (!internet.entities.download) return null;
      return html`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(internet.entities.download)}
        >
          <div
            class="summary-badge"
            style="background:${internet.colors.download_badge}"
          >
            <ha-icon
              .icon=${internet.download_icon || "mdi:download"}
              style="color:${internet.colors.download_badge_icon}"
            ></ha-icon>
          </div>
          <div class="summary-text">
            <div class="summary-primary">
              ${ctx.downloadState ? `${ctx.downloadState.display}${ctx.downloadState.unit}` : "-"}
            </div>
            ${ctx.totalDlState
              ? html`<div class="summary-secondary">
                  ${ctx.totalDlState.display}${ctx.totalDlState.unit}
                </div>`
              : null}
          </div>
        </div>
      `;
    }
    if (key === "upload") {
      if (!internet.entities.upload) return null;
      return html`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(internet.entities.upload)}
        >
          <div
            class="summary-badge"
            style="background:${internet.colors.upload_badge}"
          >
            <ha-icon
              .icon=${internet.upload_icon || "mdi:upload"}
              style="color:${internet.colors.upload_badge_icon}"
            ></ha-icon>
          </div>
          <div class="summary-text">
            <div class="summary-primary">
              ${ctx.uploadState ? `${ctx.uploadState.display}${ctx.uploadState.unit}` : "-"}
            </div>
            ${ctx.totalUlState
              ? html`<div class="summary-secondary">
                  ${ctx.totalUlState.display}${ctx.totalUlState.unit}
                </div>`
              : null}
          </div>
        </div>
      `;
    }
    if (key === "ping") {
      if (!ctx.pingState) return null;
      return html`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(internet.entities.ping)}
        >
          <div
            class="summary-badge"
            style="background:${internet.colors.ping_badge || '#00bcd4'}"
          >
            <ha-icon
              .icon=${internet.ping_icon || "mdi:speedometer"}
              style="color:${internet.colors.ping_badge_icon || '#ffffff'}"
            ></ha-icon>
          </div>
          <div class="summary-text">
            <div class="summary-primary">
              ${ctx.pingState.display}${ctx.pingState.unit || " ms"}
            </div>
            ${ctx.jitterState
              ? html`<div class="summary-secondary">
                  ${ctx.jitterState.display}${ctx.jitterState.unit ? ` ${ctx.jitterState.unit}` : ""}
                </div>`
              : null}
          </div>
        </div>
      `;
    }
    if (key === "vpn") {
      if (!config.vpn_entity) return null;
      const vpnOn = isVpnActive(hass, config.vpn_entity);
      const bg = vpnOn ? (config.vpn_badge_color ?? 'var(--blue-color)') : (config.vpn_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
      const iconColor = vpnOn ? (config.vpn_badge_icon_color ?? 'var(--card-background-color)') : (config.vpn_badge_offline_icon_color ?? 'var(--card-background-color)');
      return html`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(config.vpn_entity)}
        >
          <div
            class="summary-badge"
            style="background:${bg}"
          >
            <ha-icon
              .icon=${config.vpn_badge_icon || "mdi:vpn"}
              style="color:${iconColor}"
            ></ha-icon>
          </div>
          <div class="summary-text">
            <div class="summary-primary">VPN</div>
            <div class="summary-secondary">${vpnOn ? "Online" : "Offline"}</div>
          </div>
        </div>
      `;
    }
    if (key === "firewall") {
      if (!config.firewall_entity) return null;
      const fwOn = isVpnActive(hass, config.firewall_entity);
      const bg = fwOn ? (config.firewall_badge_color ?? 'var(--orange-color)') : (config.firewall_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
      const iconColor = fwOn ? (config.firewall_badge_icon_color ?? 'var(--card-background-color)') : (config.firewall_badge_offline_icon_color ?? 'var(--card-background-color)');
      return html`
        <div
          class="summary-row"
          @click=${() => this._handleMoreInfo(config.firewall_entity)}
        >
          <div
            class="summary-badge"
            style="background:${bg}"
          >
            <ha-icon
              .icon=${config.firewall_badge_icon || "mdi:wall-fire"}
              style="color:${iconColor}"
            ></ha-icon>
          </div>
          <div class="summary-text">
            <div class="summary-primary">Firewall</div>
            <div class="summary-secondary">${fwOn ? "Online" : "Offline"}</div>
          </div>
        </div>
      `;
    }
    return null;
  }

  render() {
    if (!this._config || !this.hass) return html``;

    const config = this._config;
    const hass = this.hass;
    const minDur = config.min_flow_duration ?? 0.6;
    const maxDur = config.max_flow_duration ?? 6;
    const animate = config.animation !== false;
    const summaryPos = config.summary_position || "top";

    const internet = config.internet;
    const internetState = getEntityState(hass, internet.entity);
    const pingState = getEntityState(hass, internet.entities.ping);
    const jitterState = getEntityState(hass, internet.entities.jitter);
    const downloadState = getEntityState(hass, internet.entities.download);
    const uploadState = getEntityState(hass, internet.entities.upload);
    const totalDlState = getEntityState(hass, internet.entities.total_download);
    const totalUlState = getEntityState(hass, internet.entities.total_upload);
    const billingTotalState = getEntityState(hass, internet.entities.billing_total);
    const billingRemState = getEntityState(hass, internet.entities.billing_remaining);

    const dlDur = calcFlowDuration(downloadState?.value, minDur, maxDur);
    const ulDur = calcFlowDuration(uploadState?.value, minDur, maxDur);

    const bTotal = billingTotalState?.value;
    const bRem = billingRemState?.value;
    const hasBilling =
      internet.entities.billing_total &&
      internet.entities.billing_remaining &&
      bTotal != null &&
      bTotal > 0 &&
      bRem != null;
    const billingRatio = hasBilling ? Math.max(0, Math.min(1, bRem / bTotal)) : 0;
    const billingCompletedRatio = hasBilling ? 1 - billingRatio : 0;

    const lan = config.lan;
    const lanState = getEntityState(hass, lan.entity);
    const lanDur = calcFlowDuration(lanState?.value, minDur, maxDur);

    const router = config.router;
    const routerEnabled = !!router.entity;
    const routerEntityState = getEntityState(hass, router.entity);
    const routerStatusState = getEntityState(hass, router.entities?.status);
    const routerOfflineTop = routerEnabled && isEntityUnavailable(hass, router.entity);
    const routerOfflineColor = routerOfflineTop
      ? router.colors.offline_circle || "var(--error-color)"
      : router.colors.circle;

    const switchConfig = config.switch || {};
    const switchEnabled = !!switchConfig.entity;
    const switchEntityState = getEntityState(hass, switchConfig.entity);
    const switchDevicesState = getEntityState(hass, switchConfig.entities?.connected_devices);
    const switchOfflineTop = switchEnabled && isEntityUnavailable(hass, switchConfig.entity);
    const switchOfflineColor = switchOfflineTop
      ? switchConfig.colors?.offline_circle || "var(--error-color)"
      : switchConfig.colors?.circle;
    const switchDur = (minDur + maxDur) / 2;

    const apData = (config.access_points || []).map((ap) => {
      const apEntityState = getEntityState(hass, ap.entity);
      const devicesState = getEntityState(hass, ap.entities.connected_devices);
      const apDlState = getEntityState(hass, ap.entities.download);
      const apUlState = getEntityState(hass, ap.entities.upload);

      return {
        ap,
        apEntityState,
        devicesState,
        dlState: apDlState,
        ulState: apUlState,
        dlDur: calcFlowDuration(apDlState?.value, minDur, maxDur),
        ulDur: calcFlowDuration(apUlState?.value, minDur, maxDur),
        devDur: calcFlowDuration(devicesState?.value, minDur, maxDur),
        hasDevices: !!ap.entities.connected_devices
      };
    });

    const primaryApLayout = config.primary_ap_layout || "tiered";
    const primaryApItem = primaryApLayout === "tiered"
      ? apData.find((a) => a.ap.is_primary) || null
      : null;
    const branchApData = primaryApItem
      ? apData.filter((a) => a !== primaryApItem)
      : apData;
    const primaryApOffline = primaryApItem
      ? isEntityUnavailable(hass, primaryApItem.ap.entity)
      : false;
    const primaryApOfflineColor = primaryApItem
      ? (primaryApOffline
          ? primaryApItem.ap.colors.offline_circle || "var(--error-color)"
          : primaryApItem.ap.colors.circle)
      : "";

    const summaryCtx = { downloadState, uploadState, totalDlState, totalUlState, pingState, jitterState };
    const summaryTemplate = config.show_summary !== false
      ? html`
          <div class="flow-summary pos-${summaryPos}">
            ${(config.summary_items || ["download", "upload", "ping"])
              .slice(0, 3)
              .map((key) => this._renderSummaryItem(key, config, hass, summaryCtx))}
          </div>
        `
      : null;

    return html`
      <ha-card>
        ${config.title
          ? html`<h1 class="card-header">${config.title}</h1>`
          : null}
        <div class="card-content">
          <div class="flow-main-layout pos-${summaryPos}">
            ${summaryPos === "top" || summaryPos === "left" || summaryPos === "right" ? summaryTemplate : null}
            <div class="flow-diagram">
              ${this._renderTrunk(
                internet,
                internetState,
                lan,
                lanState,
                lanDur,
                pingState,
                hasBilling,
                billingCompletedRatio,
                dlDur,
                ulDur,
                animate,
                router,
                routerEntityState,
                routerStatusState,
                summaryPos,
                hass,
                routerEnabled,
                primaryApItem,
                branchApData.length > 0,
                switchConfig,
                switchEnabled,
                switchEntityState,
                switchDevicesState,
                switchOfflineTop,
                switchDur
              )}
              ${branchApData.length
                ? this._renderBranches(
                    branchApData,
                    animate,
                    switchEnabled ? (switchConfig.colors?.bus_line || "var(--divider-color, #ccc)") : config.router.colors.bus_line,
                    !!(config.individual_devices && config.individual_devices.length),
                    config.individual_devices_line_color || "var(--primary-text-color)",
                    hass,
                    primaryApItem ? primaryApOffline : (switchEnabled ? (routerOfflineTop || switchOfflineTop) : routerOfflineTop),
                    primaryApItem ? primaryApOfflineColor : (switchEnabled ? switchOfflineColor : routerOfflineColor),
                    primaryApItem ? true : (routerEnabled || switchEnabled),
                    primaryApItem,
                    primaryApLayout
                  )
                : null}
            </div>
            ${this._renderIndividualDevices(config.individual_devices, hass, config, animate, minDur, maxDur, branchApData.length)}
            ${summaryPos === "bottom" ? summaryTemplate : null}
          </div>
        </div>
      </ha-card>
    `;
  }

  _renderIndividualDevices(devices, hass, config, animate, minDur, maxDur, apCount) {
    if (!devices || !devices.length) return null;
    const boxColor = config.individual_devices_box_color || "var(--divider-color)";
    const lineColor = config.individual_devices_line_color || "var(--primary-text-color)";
    const needsFallbackConnector = !apCount;

    return html`
      <div class="dev-row-container">
        ${needsFallbackConnector
          ? html`
              <div class="ap-col-devconnector single">
                <div
                  class="dev-dotted-line"
                  style="background-image:repeating-linear-gradient(to bottom, ${lineColor} 0px, ${lineColor} 2px, transparent 2px, transparent 6px)"
                ></div>
              </div>
            `
          : null}
        <div class="individual-devices-box">
          <svg class="individual-devices-box-border">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="16"
              ry="16"
              fill="none"
              stroke="${boxColor}"
              stroke-width="2"
              stroke-dasharray="2 4"
              stroke-linecap="round"
            ></rect>
          </svg>
          <div class="individual-devices-row">
            ${devices.map((dev) => {
              const online = isDeviceOnline(hass, dev.entity);
              const size = config.individual_device_circle_size ?? 42;
              const circleColor = online
                ? (dev.colors?.circle || "var(--primary-color)")
                : (dev.colors?.offline_circle || dev.colors?.circle || "var(--error-color)");
              const iconColor = online
                ? (dev.colors?.icon || "var(--primary-color)")
                : (dev.colors?.offline_icon || "var(--error-color)");

              return html`
                <div
                  class="circle-wrap"
                  style="width:${size}px; height:${size}px; opacity: ${online ? 1 : 0.6}"
                  @click=${() => this._handleMoreInfo(dev.entity)}
                  title="${dev.entity || 'Device'}"
                >
                  <div class="circle" style="border-color:${circleColor}">
                    <ha-icon
                      .icon=${dev.icon || "mdi:devices"}
                      style="color:${iconColor};--mdc-icon-size:${config.individual_device_icon_size ?? 20}px"
                    ></ha-icon>
                  </div>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  _backhaulBadge(ap, hass) {
    if (ap.show_backhaul_icon === false) return null;
    const entityId = ap.entities?.backhaul_type;
    if (!entityId || !hass || !hass.states[entityId]) return null;
    const state = String(hass.states[entityId].state).toLowerCase();
    const icon = state === "wired" ? "mdi:ethernet" : "mdi:wifi";
    const color = ap.colors.backhaul_icon || "var(--secondary-text-color)";
    return html`
      <div class="backhaul-icon-mid" style="color:${color}">
        <ha-icon icon="${icon}"></ha-icon>
      </div>
    `;
  }

  _renderXOnlyVertical(height = 32) {
    return html`
      <div class="vline-pair" style="height:${height}px; justify-content:center;">
        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
          <ha-icon icon="mdi:close"></ha-icon>
        </div>
      </div>
    `;
  }

  _renderXOnlyHorizontal(width = 28) {
    return html`
      <div class="hline-single" style="width:${width}px; justify-content:center;">
        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
          <ha-icon icon="mdi:close"></ha-icon>
        </div>
      </div>
    `;
  }

  _verticalDualLine(c1, c2, d1, d2, animate, height = 32, dashed = false) {
    const strandStyle = (color, left) =>
      dashed
        ? `left:${left}px;background-image:repeating-linear-gradient(to bottom, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px);`
        : `left:${left}px;background:${color}`;
    return html`
      <div class="vline-pair" style="height:${height}px">
        <div class="vline" style="${strandStyle(c1, 16)}"></div>
        <div class="vline" style="${strandStyle(c2, 32)}"></div>
        ${animate
          ? html`
              ${this._cssDotsY(c1, d1, 16, false)}
              ${this._cssDotsY(c2, d2, 32, true)}
            `
          : null}
      </div>
    `;
  }

  _verticalSingleLine(color, duration, animate, height = 24, dashed = false) {
    return html`
      <div class="vline-single" style="height:${height}px">
        <div
          class="vline"
          style="${dashed
            ? `left:50%;background-image:repeating-linear-gradient(to bottom, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px);`
            : `left:50%;background:${color}`}"
        ></div>
        ${animate ? this._cssDotsY(color, duration, "50%", false, 2) : null}
      </div>
    `;
  }

  _horizontalSingleLine(color, duration, animate, width = 36, reverse = false) {
    return html`
      <div class="hline-single" style="width:${width}px">
        <div class="hline" style="background:${color}"></div>
        ${animate ? this._cssDotsX(color, duration, "50%", reverse, 2) : null}
      </div>
    `;
  }

  _cssDotsY(color, duration, posX, reverse, count = 3) {
    const leftPos = typeof posX === "number" ? `${posX}px` : posX;
    return Array.from({ length: count }).map(
      (_, i) => html`
        <div
          class="flow-dot"
          style="
            left:${leftPos};
            background:${color};
            animation-name:${reverse ? "nf-dot-btt" : "nf-dot-ttb"};
            animation-duration:${duration}s;
            animation-delay:${(i * duration) / count}s;
          "
        ></div>
      `
    );
  }

  _cssDotsX(color, duration, posY, reverse, count = 3) {
    const topPos = typeof posY === "number" ? `${posY}px` : posY;
    return Array.from({ length: count }).map(
      (_, i) => html`
        <div
          class="flow-dot flow-dot-x"
          style="
            top:${topPos};
            background:${color};
            animation-name:${reverse ? "nf-dot-rtl" : "nf-dot-ltr"};
            animation-duration:${duration}s;
            animation-delay:${(i * duration) / count}s;
          "
        ></div>
      `
    );
  }

  _ring(completedPct, remainingPct, colorRem, colorProg, entityRem) {
    const radius = 49;
    const circumference = 2 * Math.PI * radius;
    const completedDash = (completedPct / 100) * circumference;
    const remainingDash = circumference - completedDash;

    return svg`
      <svg class="ring-svg" viewBox="0 0 100 100">
        <g transform="rotate(-90 50 50)">
          <circle
            cx="50" cy="50" r="${radius}"
            fill="none"
            stroke="${colorRem}"
            stroke-width="3"
          />
          <circle
            cx="50" cy="50" r="${radius}"
            fill="none"
            stroke="${colorProg}"
            stroke-width="3"
            stroke-dasharray="${completedDash} ${remainingDash}"
            stroke-linecap="butt"
            @click=${() => this._handleMoreInfo(entityRem)}
          />
        </g>
      </svg>
    `;
  }

  _renderTrunk(
    internet,
    internetState,
    lan,
    lanState,
    lanDur,
    pingState,
    hasBilling,
    completedRatio,
    dlDur,
    ulDur,
    animate,
    router,
    routerEntityState,
    routerStatus,
    summaryPos,
    hass,
    routerEnabled,
    primaryApItem,
    hasOtherAps,
    switchConfig,
    switchEnabled,
    switchEntityState,
    switchDevicesState,
    switchOfflineTop,
    switchDur
  ) {
    const completedPct = completedRatio * 100;
    const remainingPct = 100 - completedPct;
    const internetLabel = getCircleLabel(internet.name, internetState, "Internet");
    const routerLabel = getCircleLabel(router.name, routerEntityState, "Router");

    const internetSize = internet.circle_size ?? 72;
    const routerSize = router.circle_size ?? 72;
    const lanSize = lan.circle_size ?? 56;

    const internetOffline = isEntityUnavailable(hass, internet.entity);
    const routerOffline = routerEnabled && isEntityUnavailable(hass, router.entity);
    const lanOffline = isEntityUnavailable(hass, lan.entity);
    const internetOrRouterOffline = internetOffline || routerOffline;
    const internetHasBandwidth = !!(internet.entities.download || internet.entities.upload);

    // Primary AP, when designated, sits inline in the trunk directly below
    // Switch (if configured), Router (or Internet, if Router is hidden) -
    // the remaining APs then fan out from the primary AP instead of from
    // whatever's directly above it.
    const primaryApOffline = primaryApItem
      ? isEntityUnavailable(hass, primaryApItem.ap.entity)
      : false;
    const beforePrimaryOffline =
      (routerEnabled ? routerOffline : internetOffline) || (switchEnabled && switchOfflineTop);
    const primaryLineOffline = beforePrimaryOffline || primaryApOffline;
    const primaryApCircleColor = primaryApItem
      ? (primaryApOffline
          ? primaryApItem.ap.colors.offline_circle || "var(--error-color)"
          : primaryApItem.ap.colors.circle)
      : "";
    const primaryApIconColor = primaryApItem
      ? (primaryApOffline
          ? primaryApItem.ap.colors.offline_icon || "var(--error-color)"
          : primaryApItem.ap.colors.icon)
      : "";
    const primaryApLabel = primaryApItem
      ? getCircleLabel(primaryApItem.ap.name, primaryApItem.apEntityState, "AP")
      : "";
    const primaryApSize = this._config.ap_circle_size ?? 72;
    const primaryApHasBandwidth = primaryApItem
      ? !!(primaryApItem.ap.entities.download || primaryApItem.ap.entities.upload)
      : false;


    const internetCircleColor = internetOffline
      ? internet.colors.offline_circle || "var(--error-color)"
      : internet.colors.circle;
    const internetIconColor = internetOffline
      ? internet.colors.offline_icon || "var(--error-color)"
      : internet.colors.icon;
    const routerCircleColor = routerOffline
      ? router.colors.offline_circle || "var(--error-color)"
      : router.colors.circle;
    const routerIconColor = routerOffline
      ? router.colors.offline_icon || "var(--error-color)"
      : router.colors.icon;
    const lanCircleColor = lanOffline
      ? lan.colors.offline_circle || "var(--error-color)"
      : lan.colors.circle;
    const lanIconColor = lanOffline
      ? lan.colors.offline_icon || "var(--error-color)"
      : lan.colors.icon;
    const switchCircleColor = switchOfflineTop
      ? switchConfig.colors?.offline_circle || "var(--error-color)"
      : switchConfig.colors?.circle;
    const switchIconColor = switchOfflineTop
      ? switchConfig.colors?.offline_icon || "var(--error-color)"
      : switchConfig.colors?.icon;
    const switchSize = switchConfig.circle_size ?? 60;
    const switchLabel = getCircleLabel(switchConfig.name, switchEntityState, "Switch");

    return html`
      <div class="trunk">
        <div class="internet-row pos-${summaryPos}">
          <div
            class="circle-wrap"
            style="width:${internetSize}px; height:${internetSize}px; opacity:${internetOffline ? 0.6 : 1};"
            @click=${() => this._handleMoreInfo(internet.entity)}
          >
            <div
              class="circle ${internetOffline ? "circle-pulse" : ""}"
              style="border-color:${internetOffline ? internetCircleColor : (hasBilling ? "transparent" : internetCircleColor)}; --pulse-color:${internetCircleColor};"
            >
              <ha-icon class="${internetOffline ? "icon-pulse" : ""}" .icon=${internetOffline ? "mdi:exclamation-thick" : (internet.icon || "mdi:web")} style="color:${internetIconColor};--mdc-icon-size:${internet.icon_size ?? 24}px"></ha-icon>
              <span class="circle-value">${internetLabel}</span>
            </div>
            ${hasBilling && !internetOffline
              ? this._ring(
                  completedPct,
                  remainingPct,
                  internet.colors.billing_remaining,
                  internet.colors.billing_progress,
                  internet.entities.billing_remaining
                )
              : null}
          </div>
        </div>

        ${internetOrRouterOffline
          ? this._renderXOnlyVertical(32)
          : internetHasBandwidth
          ? this._verticalDualLine(
              internet.colors.download,
              internet.colors.upload,
              dlDur,
              ulDur,
              animate
            )
          : this._verticalSingleLine(
              internet.colors.download,
              dlDur,
              animate,
              32
            )}

        ${routerEnabled
          ? html`
        <div
          class="circle-wrap router-anchor"
          style="width:${routerSize}px; height:${routerSize}px;"
          @click=${() => this._handleMoreInfo(router.entity)}
        >
          <div class="circle ${routerOffline ? "circle-pulse" : ""}" style="border-color:${routerCircleColor}; opacity:${routerOffline ? 0.6 : 1}; --pulse-color:${routerCircleColor};">
            <ha-icon class="${routerOffline ? "icon-pulse" : ""}" .icon=${routerOffline ? "mdi:exclamation-thick" : (router.icon || "mdi:router-network")} style="color:${routerIconColor};--mdc-icon-size:${router.icon_size ?? 24}px"></ha-icon>
            <span class="circle-value">
              ${routerStatus
                ? `${routerStatus.display}${routerStatus.unit ? ` ${routerStatus.unit}` : ""}`
                : routerLabel}
            </span>
          </div>
          ${this._config.vpn_target !== "primary_ap" ? this._renderVpnBadge(hass, this._config.vpn_entity) : null}
          ${this._config.firewall_target !== "primary_ap" ? this._renderFirewallBadge(hass, this._config.firewall_entity) : null}
          ${lan.entity
            ? html`
                <div class="lan-branch ${summaryPos === "right" ? "flip-left" : ""}">
                  ${routerOffline
                    ? this._renderXOnlyHorizontal(28)
                    : this._horizontalSingleLine(lan.colors.line, lanDur, animate, 28, summaryPos === "right")}
                  <div
                    class="circle-wrap"
                    style="width:${lanSize}px; height:${lanSize}px; opacity:${lanOffline ? 0.6 : 1};"
                    @click=${(e) => {
                      e.stopPropagation();
                      this._handleMoreInfo(lan.entity);
                    }}
                  >
                    <div class="circle ${lanOffline ? "circle-pulse" : ""}" style="border-color:${lanCircleColor}; --pulse-color:${lanCircleColor};">
                      <ha-icon class="${lanOffline ? "icon-pulse" : ""}" .icon=${lanOffline ? "mdi:exclamation-thick" : (lan.icon || "mdi:lan")} style="color:${lanIconColor};--mdc-icon-size:${lan.icon_size ?? 20}px"></ha-icon>
                      <span class="circle-value">
                        ${lanState ? roundVal(lanState.value) : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              `
            : null}
        </div>
          `
          : null}

        ${switchEnabled
          ? html`
              ${(routerEnabled ? routerOffline : internetOffline) || switchOfflineTop
                ? this._renderXOnlyVertical(28)
                : this._verticalSingleLine(
                    switchConfig.colors?.bus_line || "var(--divider-color, #ccc)",
                    switchDur,
                    animate,
                    28
                  )}
              <div
                class="circle-wrap"
                style="width:${switchSize}px; height:${switchSize}px; opacity:${switchOfflineTop ? 0.6 : 1};"
                @click=${() => this._handleMoreInfo(switchConfig.entity)}
              >
                <div class="circle ${switchOfflineTop ? "circle-pulse" : ""}" style="border-color:${switchCircleColor}; --pulse-color:${switchCircleColor};">
                  <ha-icon class="${switchOfflineTop ? "icon-pulse" : ""}" .icon=${switchOfflineTop ? "mdi:exclamation-thick" : (switchConfig.icon || "mdi:switch")} style="color:${switchIconColor};--mdc-icon-size:${switchConfig.icon_size ?? 22}px"></ha-icon>
                  <span class="circle-value">${switchLabel}</span>
                </div>
                ${switchConfig.entities?.connected_devices
                  ? (() => {
                      const swDevOffline = switchOfflineTop || isEntityUnavailable(hass, switchConfig.entities.connected_devices);
                      const swDevCircleColor = swDevOffline
                        ? switchConfig.colors?.devices_offline_circle || "var(--error-color)"
                        : switchConfig.colors?.devices_circle;
                      const swDevIconColor = swDevOffline
                        ? switchConfig.colors?.devices_offline_icon || "var(--error-color)"
                        : switchConfig.colors?.devices_icon;
                      return html`
                        <div class="lan-branch ${summaryPos === "right" ? "flip-left" : ""}">
                          ${swDevOffline
                            ? this._renderXOnlyHorizontal(28)
                            : this._horizontalSingleLine(switchConfig.colors?.bus_line || "var(--divider-color, #ccc)", switchDur, animate, 28, summaryPos === "right")}
                          <div
                            class="circle-wrap"
                            style="width:48px; height:48px; opacity:${swDevOffline ? 0.6 : 1};"
                            @click=${(e) => {
                              e.stopPropagation();
                              this._handleMoreInfo(switchConfig.entities.connected_devices);
                            }}
                          >
                            <div class="circle ${swDevOffline ? "circle-pulse" : ""}" style="border-color:${swDevCircleColor}; --pulse-color:${swDevCircleColor};">
                              <ha-icon class="${swDevOffline ? "icon-pulse" : ""}" .icon=${swDevOffline ? "mdi:exclamation-thick" : (switchConfig.devices_icon || "mdi:devices")} style="color:${swDevIconColor};--mdc-icon-size:18px"></ha-icon>
                              <span class="circle-value">${switchDevicesState ? roundVal(switchDevicesState.value) : "-"}</span>
                            </div>
                          </div>
                        </div>
                      `;
                    })()
                  : null}
              </div>
            `
          : null}

        ${primaryApItem
          ? html`
              ${!routerEnabled && !switchEnabled
                ? null
                : primaryLineOffline
                ? this._renderXOnlyVertical(32)
                : primaryApHasBandwidth
                ? this._verticalDualLine(
                    primaryApItem.ap.colors.download,
                    primaryApItem.ap.colors.upload,
                    primaryApItem.dlDur,
                    primaryApItem.ulDur,
                    animate,
                    32
                  )
                : this._verticalSingleLine(
                    primaryApItem.ap.colors.line || primaryApItem.ap.colors.download,
                    primaryApItem.dlDur,
                    animate,
                    32
                  )}
              <div
                class="circle-wrap"
                style="width:${primaryApSize}px; height:${primaryApSize}px; opacity:${primaryApOffline ? 0.6 : 1};"
                @click=${() => this._handleMoreInfo(primaryApItem.ap.entity)}
              >
                <div
                  class="circle ${primaryApOffline ? "circle-pulse" : ""}"
                  style="border-color:${primaryApCircleColor}; --pulse-color:${primaryApCircleColor};"
                >
                  <ha-icon
                    class="${primaryApOffline ? "icon-pulse" : ""}"
                    .icon=${primaryApOffline ? "mdi:exclamation-thick" : (primaryApItem.ap.icon || "mdi:wifi")}
                    style="color:${primaryApIconColor};--mdc-icon-size:${this._config.ap_icon_size ?? 24}px"
                  ></ha-icon>
                  <span class="circle-value">${primaryApLabel}</span>
                </div>
                ${primaryApItem.ap.show_primary_badge !== false
                  ? html`<div
                      class="primary-ap-badge"
                      style="background:${primaryApItem.ap.colors.primary_badge ?? 'var(--orange-color)'}; color:${primaryApItem.ap.colors.primary_badge_icon ?? 'var(--card-background-color)'}; border:2px solid ${primaryApItem.ap.colors.primary_badge_border ?? 'transparent'}; width:${this._config.primary_badge_size ?? 18}px; height:${this._config.primary_badge_size ?? 18}px;"
                    >
                      <ha-icon icon="${this._config.primary_badge_icon || 'mdi:star'}" style="--mdc-icon-size:${this._config.primary_badge_icon_size ?? 12}px"></ha-icon>
                    </div>`
                  : null}
                ${this._config.vpn_target === "primary_ap" ? this._renderVpnBadge(hass, this._config.vpn_entity) : null}
                ${this._config.firewall_target === "primary_ap" ? this._renderFirewallBadge(hass, this._config.firewall_entity) : null}
              </div>
              ${!hasOtherAps && primaryApItem.hasDevices
                ? (() => {
                    const devOffline =
                      primaryApOffline ||
                      isEntityUnavailable(hass, primaryApItem.ap.entities.connected_devices);
                    const devCircleSize = this._config.ap_devices_circle_size ?? 56;
                    const devCircleColor = devOffline
                      ? primaryApItem.ap.colors.devices_offline_circle || "var(--error-color)"
                      : primaryApItem.ap.colors.devices_circle;
                    const devIconColor = devOffline
                      ? primaryApItem.ap.colors.devices_offline_icon || "var(--error-color)"
                      : primaryApItem.ap.colors.devices_icon;
                    return html`
                      ${this._verticalSingleLine(
                        primaryApItem.ap.colors.devices_line,
                        primaryApItem.devDur,
                        animate,
                        24,
                        true
                      )}
                      <div
                        class="circle-wrap"
                        style="width:${devCircleSize}px; height:${devCircleSize}px; opacity:${devOffline ? 0.6 : 1};"
                        @click=${() =>
                          this._handleMoreInfo(primaryApItem.ap.entities.connected_devices)}
                      >
                        <div
                          class="circle ${devOffline ? "circle-pulse" : ""}"
                          style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                        >
                          <ha-icon
                            class="${devOffline ? "icon-pulse" : ""}"
                            .icon=${devOffline ? "mdi:exclamation-thick" : (primaryApItem.ap.devices_icon || "mdi:devices")}
                            style="color:${devIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px"
                          ></ha-icon>
                          <span class="circle-value">
                            ${primaryApItem.devicesState ? roundVal(primaryApItem.devicesState.value) : "-"}
                          </span>
                        </div>
                      </div>
                    `;
                  })()
                : null}
            `
          : null}
      </div>
    `;
  }

  _renderBranches(apData, animate, busLineColor, hasIndividualDevices, individualDevicesLineColor, hass, routerOffline, routerOfflineColor, routerEnabled, primaryApItem, primaryApLayout) {
    const count = apData.length;
    const primaryHasDevices = !!(primaryApItem && primaryApItem.hasDevices);
    const showPrimaryExtraCol = !!primaryApItem && (primaryHasDevices || hasIndividualDevices);
    const totalCols = count + (showPrimaryExtraCol ? 1 : 0);
    const midCol = showPrimaryExtraCol ? Math.ceil((count + 1) / 2) : null;
    const extraCol = midCol;
    const apCol = (i) => {
      if (!showPrimaryExtraCol) return i + 1;
      return (i + 1) < midCol ? (i + 1) : (i + 2);
    };
    const collapseTbar = count === 1 && !showPrimaryExtraCol;
    const hideApOwnLine = !routerEnabled && count === 1 && !showPrimaryExtraCol;

    // Initial fallback margin only - the real alignment is computed after
    // render from actual measured positions, see _alignBusLine().
    const fallbackLeft = this._busMarginLeft ?? 24;
    const fallbackRight = this._busMarginRight ?? 24;
    const busLineStyle = `background:${busLineColor}; margin-left:${fallbackLeft}px; margin-right:${fallbackRight}px;`;
    const fallbackShift = this._branchesShiftX ?? 0;
    const trunkFallbackLeft = this._trunkMarginLeft;
    const trunkDropStyle = trunkFallbackLeft != null
      ? `justify-self:start; margin-left:${trunkFallbackLeft}px;`
      : "";
    return html`
      <div
        class="branches ${hasIndividualDevices ? "with-dev-connectors" : ""}"
        style="grid-template-columns:repeat(${totalCols}, max-content); grid-template-rows:${collapseTbar ? '0px' : (routerEnabled ? '26px' : '0px')} ${collapseTbar ? '0px' : '2px'} auto auto auto auto 24px; transform:translateX(${fallbackShift}px);"
      >
        ${collapseTbar
          ? null
          : !routerEnabled
          ? html`
              <div class="bus-line" style="${busLineStyle}"></div>
            `
          : routerOffline
          ? html`
              <div class="trunk-drop" style="${trunkDropStyle} display:flex; justify-content:center; align-items:center;">
                <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                  <ha-icon icon="mdi:close"></ha-icon>
                </div>
              </div>
              <div class="bus-line" style="${busLineStyle}"></div>
            `
          : html`
              <div class="trunk-drop" style="${trunkDropStyle} background:${busLineColor};"></div>
              <div class="bus-line" style="${busLineStyle}"></div>
            `}
        ${apData.map(
          (item, i) => {
            const apLineOffline = routerOffline || isEntityUnavailable(hass, item.ap.entity);
            const apWired = isBackhaulWired(hass, item.ap);
            const apHasBandwidth = !!(item.ap.entities.download || item.ap.entities.upload);
            return html`
            <div class="ap-col-line" style="grid-column:${apCol(i)}">
              ${hideApOwnLine
                ? null
                : apLineOffline
                ? this._renderXOnlyVertical(28)
                : apHasBandwidth
                ? this._verticalDualLine(
                    item.ap.colors.download,
                    item.ap.colors.upload,
                    item.dlDur,
                    item.ulDur,
                    animate,
                    28,
                    !apWired
                  )
                : this._verticalSingleLine(
                    item.ap.colors.line || item.ap.colors.download,
                    item.dlDur,
                    animate,
                    28,
                    !apWired
                  )}
              ${!hideApOwnLine && !apLineOffline
                ? this._backhaulBadge(item.ap, hass)
                : null}
            </div>
          `;
          }
        )}
        ${apData.map(
          (item, idx) => {
            const apLabel = getCircleLabel(item.ap.name, item.apEntityState, "AP");
            const apSize = this._config.ap_circle_size ?? 72;
            const apOffline = routerOffline || isEntityUnavailable(hass, item.ap.entity);
            const apCircleColor = apOffline
              ? item.ap.colors.offline_circle || "var(--error-color)"
              : item.ap.colors.circle;
            const apIconColor = apOffline
              ? item.ap.colors.offline_icon || "var(--error-color)"
              : item.ap.colors.icon;
            return html`
              <div
                class="circle-wrap ap-col-circle"
                style="width:${apSize}px; height:${apSize}px; grid-column:${apCol(idx)}; opacity:${apOffline ? 0.6 : 1};"
                @click=${() => this._handleMoreInfo(item.ap.entity)}
              >
                <div class="circle ${apOffline ? "circle-pulse" : ""}" style="border-color:${apCircleColor}; --pulse-color:${apCircleColor};">
                  <ha-icon class="${apOffline ? "icon-pulse" : ""}" .icon=${apOffline ? "mdi:exclamation-thick" : (item.ap.icon || "mdi:wifi")} style="color:${apIconColor};--mdc-icon-size:${this._config.ap_icon_size ?? 24}px"></ha-icon>
                  <span class="circle-value">${apLabel}</span>
                </div>
                ${primaryApLayout === "flat" && item.ap.is_primary && item.ap.show_primary_badge !== false
                  ? html`<div
                      class="primary-ap-badge"
                      style="background:${item.ap.colors.primary_badge ?? 'var(--orange-color)'}; color:${item.ap.colors.primary_badge_icon ?? 'var(--card-background-color)'}; border:2px solid ${item.ap.colors.primary_badge_border ?? 'transparent'}; width:${this._config.primary_badge_size ?? 18}px; height:${this._config.primary_badge_size ?? 18}px;"
                    >
                      <ha-icon icon="${this._config.primary_badge_icon || 'mdi:star'}" style="--mdc-icon-size:${this._config.primary_badge_icon_size ?? 12}px"></ha-icon>
                    </div>`
                  : null}
                ${item.ap.is_primary && this._config.vpn_target === "primary_ap" ? this._renderVpnBadge(hass, this._config.vpn_entity) : null}
                ${item.ap.is_primary && this._config.firewall_target === "primary_ap" ? this._renderFirewallBadge(hass, this._config.firewall_entity) : null}
              </div>
            `;
          }
        )}
        ${apData.map(
          (item, i) => {
            const apLineOffline = routerOffline || isEntityUnavailable(hass, item.ap.entity);
            const devLineOffline = apLineOffline || (item.hasDevices && isEntityUnavailable(hass, item.ap.entities.connected_devices));
            return html`
            <div class="ap-col-devline" style="grid-column:${apCol(i)}; ${devLineOffline ? 'display:flex; justify-content:center; align-items:center;' : ''}">
              ${devLineOffline && (item.hasDevices || hasIndividualDevices)
                ? html`
                    <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                      <ha-icon icon="mdi:close"></ha-icon>
                    </div>
                  `
                : !devLineOffline && (item.hasDevices || hasIndividualDevices)
                ? html`<div
                    class="ap-col-fillline"
                    style="background-image:repeating-linear-gradient(to bottom, ${item.ap.colors.devices_line} 0px, ${item.ap.colors.devices_line} 2px, transparent 2px, transparent 6px)"
                  ></div>`
                : null}
            </div>
          `;
          }
        )}
        ${apData.map((item, idx) => {
          const devCircleSize = this._config.ap_devices_circle_size ?? 56;
          const apLineOffline = routerOffline || isEntityUnavailable(hass, item.ap.entity);
          const devOffline = apLineOffline || (item.hasDevices && isEntityUnavailable(hass, item.ap.entities.connected_devices));
          if (item.hasDevices && !apLineOffline) {
            const devCircleColor = devOffline
              ? item.ap.colors.devices_offline_circle || "var(--error-color)"
              : item.ap.colors.devices_circle;
            const devIconColor = devOffline
              ? item.ap.colors.devices_offline_icon || "var(--error-color)"
              : item.ap.colors.devices_icon;
            return html`
                <div
                  class="circle-wrap ap-col-devcircle"
                  style="width:${devCircleSize}px; height:${devCircleSize}px; grid-column:${apCol(idx)}; opacity:${devOffline ? 0.6 : 1};"
                  @click=${() =>
                    this._handleMoreInfo(item.ap.entities.connected_devices)}
                >
                  <div
                    class="circle ${devOffline ? "circle-pulse" : ""}"
                    style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                  >
                    <ha-icon
                      class="${devOffline ? "icon-pulse" : ""}"
                      .icon=${devOffline ? "mdi:exclamation-thick" : (item.ap.devices_icon || "mdi:devices")}
                      style="color:${devIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px"
                    ></ha-icon>
                    <span class="circle-value">
                      ${item.devicesState ? roundVal(item.devicesState.value) : "-"}
                    </span>
                  </div>
                </div>
              `;
          }
          return hasIndividualDevices && !apLineOffline
            ? html`<div
                class="ap-col-devcircle-spacer"
                style="grid-column:${apCol(idx)}; ${devOffline ? 'display:flex; justify-content:center; align-items:center;' : ''}"
              >
                ${devOffline
                  ? html`
                      <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                        <ha-icon icon="mdi:close"></ha-icon>
                      </div>
                    `
                  : html`
                      <div
                        class="ap-col-fillline"
                        style="background-image:repeating-linear-gradient(to bottom, ${item.ap.colors.devices_line} 0px, ${item.ap.colors.devices_line} 2px, transparent 2px, transparent 6px)"
                      ></div>
                    `}
              </div>`
            : html`<div
                class="ap-col-devcircle-spacer"
                style="grid-column:${apCol(idx)}"
              ></div>`;
        })}
        ${hasIndividualDevices
          ? apData.map(
              (item, i) => {
                const apLineOffline = routerOffline || isEntityUnavailable(hass, item.ap.entity);
                const devLineOffline = !apLineOffline && item.hasDevices && isEntityUnavailable(hass, item.ap.entities.connected_devices);
                return html`
                  <div class="ap-col-devconnector" style="grid-column:${apCol(i)}; ${(devLineOffline || apLineOffline) ? 'display:flex; justify-content:center; align-items:center;' : ''}">
                    ${apLineOffline
                      ? null
                      : devLineOffline
                      ? html`
                          <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                            <ha-icon icon="mdi:close"></ha-icon>
                          </div>
                        `
                      : html`
                          <div
                            class="dev-dotted-line"
                            style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                          ></div>
                        `}
                  </div>
                `;
              }
            )
          : null}

        ${showPrimaryExtraCol
          ? (() => {
              if (routerOffline) {
                // Primary itself is offline - its whole devices column
                // goes blank, matching how a regular AP's devices column
                // disappears entirely when that AP is offline (not just
                // its circle).
                return null;
              }
              if (!primaryHasDevices) {
                // Primary has no devices entity of its own, but Individual
                // Devices exists - still show a continuous line down to
                // it, matching how a regular AP without devices behaves.
                return hasIndividualDevices
                  ? html`
                      <div
                        class="ap-col-fillline-wrap"
                        style="grid-column:${extraCol}; grid-row:3 / 7; display:flex; justify-content:center; width:100%; box-sizing:border-box;"
                      >
                        <div
                          class="ap-col-fillline"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      </div>
                      <div
                        class="ap-col-devconnector"
                        style="grid-column:${extraCol};"
                      >
                        <div
                          class="dev-dotted-line"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      </div>
                    `
                  : null;
              }
              const devOffline = routerOffline || isEntityUnavailable(hass, primaryApItem.ap.entities.connected_devices);
              const devCircleSize = this._config.ap_devices_circle_size ?? 56;
              const devCircleColor = devOffline
                ? primaryApItem.ap.colors.devices_offline_circle || "var(--error-color)"
                : primaryApItem.ap.colors.devices_circle;
              const devIconColor = devOffline
                ? primaryApItem.ap.colors.devices_offline_icon || "var(--error-color)"
                : primaryApItem.ap.colors.devices_icon;
              return html`
                <div
                  class="ap-col-fillline-wrap"
                  style="grid-column:${extraCol}; grid-row:3 / 6; display:flex; justify-content:center; width:100%; box-sizing:border-box;"
                >
                  <div
                    class="ap-col-fillline"
                    style="background-image:repeating-linear-gradient(to bottom, ${primaryApItem.ap.colors.devices_line} 0px, ${primaryApItem.ap.colors.devices_line} 2px, transparent 2px, transparent 6px)"
                  ></div>
                </div>
                <div
                  class="circle-wrap ap-col-devcircle"
                  style="width:${devCircleSize}px; height:${devCircleSize}px; grid-column:${extraCol}; opacity:${devOffline ? 0.6 : 1};"
                  @click=${() =>
                    this._handleMoreInfo(primaryApItem.ap.entities.connected_devices)}
                >
                  <div
                    class="circle ${devOffline ? "circle-pulse" : ""}"
                    style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                  >
                    <ha-icon
                      class="${devOffline ? "icon-pulse" : ""}"
                      .icon=${devOffline ? "mdi:exclamation-thick" : (primaryApItem.ap.devices_icon || "mdi:devices")}
                      style="color:${devIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px"
                    ></ha-icon>
                    <span class="circle-value">
                      ${primaryApItem.devicesState ? roundVal(primaryApItem.devicesState.value) : "-"}
                    </span>
                  </div>
                </div>
                ${hasIndividualDevices
                  ? html`
                      <div
                        class="ap-col-devconnector"
                        style="grid-column:${extraCol};"
                      >
                        <div
                          class="dev-dotted-line"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      </div>
                    `
                  : null}
              `;
            })()
          : null}
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        font-family: var(
          --ha-font-family-body,
          var(--paper-font-body1_-_font-family, var(--primary-font-family, sans-serif))
        );
      }
      ha-card {
        overflow: hidden;
        font-family: inherit;
        color: var(--primary-text-color);
        isolation: isolate;
      }
      .card-header {
        padding: 12px 16px 0 16px;
        font-size: 1.1rem;
        font-family: inherit;
      }
      .card-content {
        padding: 16px 12px;
        font-family: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      }

      .flow-main-layout {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }
      .flow-main-layout.pos-top,
      .flow-main-layout.pos-bottom {
        flex-direction: column;
      }
      .flow-main-layout.pos-left,
      .flow-main-layout.pos-right {
        flex-direction: column;
      }
      .flow-main-layout.pos-left .flow-diagram,
      .flow-main-layout.pos-right .flow-diagram {
        padding: 0 130px;
        box-sizing: border-box;
      }

      .flow-diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .trunk {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .internet-row {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .circle-wrap {
        position: relative;
        z-index: 2;
        flex-shrink: 0;
      }

      .circle {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid var(--divider-color, #e1e1e1);
        background: var(--primary-background-color, #fafafa);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        cursor: pointer;
        overflow: hidden;
      }
      .circle ha-icon {
        --mdc-icon-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .circle-value {
        font-size: 10px;
        font-weight: 400;
        color: var(--primary-text-color);
        line-height: 1;
        max-width: calc(100% - 8px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ring-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .ring-svg circle[stroke-dasharray] {
        pointer-events: auto;
        cursor: pointer;
      }

      .lan-branch {
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        flex-direction: row;
      }
      .lan-branch.flip-left {
        left: auto;
        right: 100%;
        flex-direction: row-reverse;
      }
      .hline-single {
        position: relative;
        height: 8px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .hline {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        transform: translateY(-50%);
        opacity: 0.9;
      }
      .lan-branch .circle-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .router-anchor .circle {
        position: relative;
        z-index: 2;
      }
      .router-anchor .lan-branch {
        z-index: 1;
      }

      .vline-pair {
        position: relative;
        width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .offline-x-mid {
        position: relative;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
      .offline-x-mid ha-icon {
        --mdc-icon-size: 16px;
      }
      .vline-single {
        position: relative;
        width: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .vline {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2px;
        transform: translateX(-50%);
        opacity: 0.9;
      }
      .vline-offline {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2px;
        transform: translateX(-50%);
        opacity: 0.9;
      }
      .hline-offline {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        transform: translateY(-50%);
        opacity: 0.9;
      }
      .flow-dot {
        position: absolute;
        top: 0;
        width: 6px;
        height: 6px;
        margin-left: -3px;
        margin-top: -3px;
        border-radius: 50%;
        opacity: 0.95;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        pointer-events: none;
      }
      @keyframes nf-dot-ttb {
        from { top: 0%; }
        to { top: 100%; }
      }
      @keyframes nf-dot-btt {
        from { top: 100%; }
        to { top: 0%; }
      }
      @keyframes nf-dot-ltr {
        from { left: 0%; }
        to { left: 100%; }
      }
      @keyframes nf-dot-rtl {
        from { left: 100%; }
        to { left: 0%; }
      }
      @keyframes nf-pulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.15); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes nf-vpn-flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.15; }
      }
      .vpn-badge-flash {
        animation: nf-vpn-flash 1.8s ease-in-out infinite;
      }
      .firewall-badge-flash {
        animation: nf-vpn-flash 1.8s ease-in-out infinite;
      }
      .icon-pulse {
        animation: nf-pulse 2.4s ease-in-out infinite;
      }
      .offline-x-pulse {
        animation: nf-pulse 2.4s ease-in-out infinite;
      }
      @keyframes nf-pulse-ring {
        0% { box-shadow: 0 0 0 0 var(--pulse-color, currentColor); }
        70% { box-shadow: 0 0 0 6px transparent; }
        100% { box-shadow: 0 0 0 0 transparent; }
      }
      .circle-pulse {
        animation: nf-pulse-ring 2.4s ease-out infinite;
      }

      .branches {
        display: grid;
        grid-template-rows: 26px 2px auto auto auto auto 24px;
        column-gap: 32px;
        row-gap: 0;
        justify-content: center;
      }
      .trunk-drop {
        grid-column: 1 / -1;
        grid-row: 1;
        width: 2px;
        height: 100%;
        margin-top: 0px;
        justify-self: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bus-line {
        grid-column: 1 / -1;
        grid-row: 2;
        height: 2px;
      }
      .ap-col-line {
        grid-row: 3;
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;
        box-sizing: border-box;
      }
      .backhaul-icon-mid {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }
      .backhaul-icon-mid ha-icon {
        --mdc-icon-size: 13px;
      }
      .primary-ap-badge {
        position: absolute;
        top: 15%;
        left: 8%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        z-index: 3;
      }
      .vpn-badge {
        position: absolute;
        top: 15%;
        right: 8%;
        transform: translate(50%, -50%);
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        z-index: 3;
      }
      .firewall-badge {
        position: absolute;
        bottom: 15%;
        right: 8%;
        transform: translate(50%, 50%);
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        z-index: 3;
      }
      .ap-col-circle {
        grid-row: 4;
        justify-self: center;
      }
      .ap-col-devline {
        grid-row: 5;
        display: flex;
        justify-content: center;
        height: 24px;
      }
      .ap-col-devcircle {
        grid-row: 6;
        justify-self: center;
      }
      .ap-col-devcircle-spacer {
        grid-row: 6;
        display: flex;
        justify-content: center;
      }
      .ap-col-fillline {
        width: 2px;
        height: 100%;
        opacity: 0.9;
      }
      .ap-col-devconnector {
        grid-row: 7;
        display: flex;
        justify-content: center;
        height: 24px;
      }
      .ap-col-devconnector.single {
        display: flex;
        justify-content: center;
        width: 100%;
      }
      .dev-dotted-line {
        width: 2px;
        height: 100%;
        opacity: 0.9;
      }

      .dev-row-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0;
        width: 100%;
        box-sizing: border-box;
      }
      .individual-devices-box {
        position: relative;
        border: none;
        border-radius: 16px;
        padding: 16px;
        box-sizing: border-box;
        width: 100%;
        align-self: stretch;
      }
      .individual-devices-box-border {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .individual-devices-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        width: 100%;
        position: relative;
      }

      .flow-summary {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
      }
      .flow-summary.pos-top {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 24px;
        width: 100%;
      }
      .flow-summary.pos-bottom {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 20px;
        width: 100%;
      }

      .flow-summary.pos-left {
        position: absolute;
        left: 8px;
        right: auto;
        top: 16px;
        transform: none;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        margin: 0;
        white-space: nowrap;
      }
      .flow-summary.pos-left .summary-row {
        flex-direction: row;
      }

      .flow-summary.pos-right {
        position: absolute;
        right: 8px;
        left: auto;
        top: 16px;
        transform: none;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        margin: 0;
        white-space: nowrap;
      }
      .flow-summary.pos-right .summary-row {
        flex-direction: row;
      }

      .summary-row {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .summary-badge {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: none;
      }
      .summary-badge ha-icon {
        --mdc-icon-size: 24px;
      }
      .summary-text {
        display: flex;
        flex-direction: column;
        line-height: 1.25;
      }
      .summary-primary {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      .summary-secondary {
        font-size: 0.78rem;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
    `;
  }
}

customElements.define("network-flow-card", NetworkFlowCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "network-flow-card",
  name: "Network Flow Card",
  description: "A power-flow-card-plus style visual for internet, router, LAN, Wi-Fi access points, and multi-row monitored individual devices.",
  preview: false
});

// --- Editor Component ---
const MENU_ITEMS = [
  { key: "internet", title: "Internet", icon: "mdi:web", summary: "Entity, name, icon, billing, bandwidth, ping, colors" },
  { key: "router", title: "Router", icon: "mdi:router-network", summary: "Entity, name, icon, LAN, colors" },
  { key: "switch", title: "Switch", icon: "mdi:switch", summary: "Optional node between Router and Access Points" },
  { key: "security", title: "Security", icon: "mdi:shield-lock", summary: "VPN and Firewall badges, target, colors" },
  { key: "access_points", title: "Access Points", icon: "mdi:wifi", summary: "Wi-Fi AP nodes, backhaul, bandwidth" },
  { key: "individual_devices", title: "Individual Devices", icon: "mdi:devices", summary: "Specific device tracker icons & colors" },
  { key: "advanced", title: "Advanced", icon: "mdi:cog", summary: "Layout, animation & sizes" }
];

class NetworkFlowCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _page: { state: true },
      _editingApIndex: { state: true },
      _editingDevIndex: { state: true }
    };
  }

  constructor() {
    super();
    this._page = null;
    this._editingApIndex = null;
    this._editingDevIndex = null;
  }

  setConfig(config) {
    const merged = deepMerge(DEFAULT_CONFIG, config || {});
    merged.access_points = (config && config.access_points || []).map((ap) =>
      deepMerge(DEFAULT_ACCESS_POINT, ap)
    );
    merged.individual_devices = (config && config.individual_devices || []).map((dev) =>
      deepMerge(DEFAULT_INDIVIDUAL_DEVICE, dev)
    );
    this._config = merged;
  }

  _fireChanged() {
    if (this._fireTimeout) clearTimeout(this._fireTimeout);
    this._fireTimeout = setTimeout(() => this._flushFireChanged(), 200);
  }

  _flushFireChanged() {
    if (this._fireTimeout) {
      clearTimeout(this._fireTimeout);
      this._fireTimeout = null;
    }
    const event = new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config: this._config }
    });
    this.dispatchEvent(event);
  }

  _valueChanged(e, path) {
    if (!this._config) return;
    let val;

    if (e.detail && e.detail.value !== undefined) {
      val = e.detail.value;
    } else if (e.target.checked !== undefined && (e.target.tagName === "HA-SWITCH" || e.target.type === "checkbox")) {
      val = Boolean(e.target.checked);
    } else {
      val = e.target.value;
    }

    if (path.includes("circle_size") || path.includes("icon_size") || path === "min_flow_duration" || path === "max_flow_duration") {
      val = parseFloat(val);
    }

    this._config = setPathValue(this._config, path, val);
    this._fireChanged();
  }

  _handleSelectChange(e, path) {
    const val = e.target.value;
    this._valueChanged({ target: { value: val } }, path);
  }

  _renderInput(label, value, path, type = "text") {
    return html`
      <div class="input-field">
        <label class="input-label">${label}</label>
        <input
          type="${type}"
          class="text-input"
          .value=${value ?? ""}
          @input=${(e) => this._valueChanged(e, path)}
        />
      </div>
    `;
  }

  _renderSlider(label, value, path, min = 20, max = 120, step = 2) {
    const numVal = value ?? 72;
    return html`
      <div class="input-field">
        <label class="input-label">${label}: ${numVal}px</label>
        <input
          type="range"
          min="${min}"
          max="${max}"
          step="${step}"
          .value=${numVal}
          @input=${(e) => this._valueChanged(e, path)}
        />
      </div>
    `;
  }

  _renderColorInput(label, value, path) {
    return html`
      <div class="color-picker-row">
        <span class="color-picker-label">${label}</span>
        <div class="color-picker-group">
          <input
            type="color"
            class="color-picker-input"
            .value=${value || "#000000"}
            @input=${(e) => this._valueChanged(e, path)}
          />
          <input
            type="text"
            class="text-input dense"
            .value=${value || ""}
            @input=${(e) => this._valueChanged(e, path)}
          />
        </div>
      </div>
    `;
  }

  render() {
    if (!this.hass || !this._config) return html``;

    if (this._page === null) {
      return this._renderMenu();
    }

    return html`
      <div class="editor">
        <div class="back-header" @click=${() => this._goBack()}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
          <span class="back-title">${this._getPageTitle()}</span>
        </div>
        ${this._renderPageContent()}
      </div>
    `;
  }

  _goBack() {
    if (this._editingApIndex !== null) {
      this._editingApIndex = null;
    } else if (this._editingDevIndex !== null) {
      this._editingDevIndex = null;
    } else {
      this._page = null;
    }
  }

  _getPageTitle() {
    if (this._page === "access_points" && this._editingApIndex !== null) {
      return `Access Point ${this._editingApIndex + 1}`;
    }
    if (this._page === "individual_devices" && this._editingDevIndex !== null) {
      return `Individual Device ${this._editingDevIndex + 1}`;
    }
    const item = MENU_ITEMS.find((m) => m.key === this._page);
    return item ? item.title : "";
  }

  _renderMenu() {
    return html`
      <div class="editor-menu">
        ${MENU_ITEMS.map(
          (item) => html`
            <div class="menu-item" @click=${() => (this._page = item.key)}>
              <div class="menu-item-left">
                <ha-icon .icon=${item.icon} style="color:var(--primary-color);"></ha-icon>
                <div class="menu-item-text">
                  <div class="menu-item-title">${item.title}</div>
                  ${item.summary
                    ? html`<div class="menu-item-summary">${item.summary}</div>`
                    : null}
                </div>
              </div>
              <ha-icon icon="mdi:chevron-right" class="chevron"></ha-icon>
            </div>
          `
        )}
      </div>
    `;
  }

  _renderPageContent() {
    switch (this._page) {
      case "internet":
        return this._renderInternetPage();
      case "router":
        return this._renderRouterPage();
      case "switch":
        return this._renderSwitchPage();
      case "security":
        return this._renderSecurityPage();
      case "access_points":
        return this._renderAccessPointsPage();
      case "individual_devices":
        return this._renderIndividualDevicesPage();
      case "advanced":
        return this._renderAdvancedPage();
      default:
        return html``;
    }
  }

  _renderInternetPage() {
    const internet = this._config.internet || {};
    const c = internet.colors || {};

    return html`
      <div class="form-section">
        <div class="sub-header">Internet</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entity || ""}
          .label=${"Internet Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name Override (Optional)", internet.name, "internet.name")}

        <ha-icon-picker
          .label=${"Icon"}
          .value=${internet.icon || "mdi:web"}
          @value-changed=${(e) => this._valueChanged(e, "internet.icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, "internet.colors.circle")}
            ${this._renderColorInput("Icon Color", c.icon, "internet.colors.icon")}
            ${this._renderColorInput("Download Line", c.download, "internet.colors.download")}
            ${this._renderColorInput("Upload Line", c.upload, "internet.colors.upload")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, "internet.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, "internet.colors.offline_icon")}
          </div>
        </div>

        <div class="sub-header">Billing</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.billing_total || ""}
          .label=${"Billing Total Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.billing_total")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.billing_remaining || ""}
          .label=${"Billing Remaining Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.billing_remaining")}
          allow-custom-entity
        ></ha-entity-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Billing Progress Color", c.billing_progress, "internet.colors.billing_progress")}
          </div>
          <div>
            ${this._renderColorInput("Billing Remaining Color", c.billing_remaining, "internet.colors.billing_remaining")}
          </div>
        </div>

        <div class="sub-header">Metrics</div>
        <div class="two-col">
          <div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.download || ""}
              .label=${"Download Speed Entity"}
              @value-changed=${(e) => this._valueChanged(e, "internet.entities.download")}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.total_download || ""}
              .label=${"Total Downloaded Entity"}
              @value-changed=${(e) => this._valueChanged(e, "internet.entities.total_download")}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-icon-picker
              .label=${"Download Icon"}
              .value=${internet.download_icon || "mdi:download"}
              @value-changed=${(e) => this._valueChanged(e, "internet.download_icon")}
            ></ha-icon-picker>
            ${this._renderColorInput("Download Badge Icon Color", c.download_badge_icon, "internet.colors.download_badge_icon")}
            ${this._renderColorInput("Download Badge Background Color", c.download_badge, "internet.colors.download_badge")}
          </div>
          <div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.upload || ""}
              .label=${"Upload Speed Entity"}
              @value-changed=${(e) => this._valueChanged(e, "internet.entities.upload")}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${internet.entities?.total_upload || ""}
              .label=${"Total Uploaded Entity"}
              @value-changed=${(e) => this._valueChanged(e, "internet.entities.total_upload")}
              allow-custom-entity
            ></ha-entity-picker>
            <ha-icon-picker
              .label=${"Upload Icon"}
              .value=${internet.upload_icon || "mdi:upload"}
              @value-changed=${(e) => this._valueChanged(e, "internet.upload_icon")}
            ></ha-icon-picker>
            ${this._renderColorInput("Upload Badge Icon Color", c.upload_badge_icon, "internet.colors.upload_badge_icon")}
            ${this._renderColorInput("Upload Badge Background Color", c.upload_badge, "internet.colors.upload_badge")}
          </div>
        </div>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.ping || ""}
          .label=${"Ping Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.ping")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.jitter || ""}
          .label=${"Jitter Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.jitter")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderColorInput("Ping Badge Icon Color", c.ping_badge_icon, "internet.colors.ping_badge_icon")}
        ${this._renderColorInput("Ping Badge Background Color", c.ping_badge, "internet.colors.ping_badge")}
      </div>
    `;
  }

  _renderRouterPage() {
    const router = this._config.router || {};
    const c = router.colors || {};
    const lan = this._config.lan || {};
    const lc = lan.colors || {};

    return html`
      <div class="form-section">
        <div class="sub-header">Router</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">The Router node only appears once an entity is selected below.</p>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entity || ""}
          .label=${"Router Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name Override (Optional)", router.name, "router.name")}

        <ha-icon-picker
          .label=${"Icon"}
          .value=${router.icon || "mdi:router-network"}
          @value-changed=${(e) => this._valueChanged(e, "router.icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, "router.colors.circle")}
            ${this._renderColorInput("Icon Color", c.icon, "router.colors.icon")}
            ${this._renderColorInput("Connection Line Color", c.bus_line, "router.colors.bus_line")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, "router.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, "router.colors.offline_icon")}
          </div>
        </div>

        <div class="sub-header">LAN Connected Devices</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${lan.entity || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._valueChanged(e, "lan.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${lan.icon || "mdi:lan"}
          @value-changed=${(e) => this._valueChanged(e, "lan.icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", lc.circle, "lan.colors.circle")}
            ${this._renderColorInput("Icon Color", lc.icon, "lan.colors.icon")}
            ${this._renderColorInput("Connection Line Color", lc.line, "lan.colors.line")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", lc.offline_circle, "lan.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", lc.offline_icon, "lan.colors.offline_icon")}
          </div>
        </div>
      </div>
    `;
  }

  _renderSwitchPage() {
    const sw = this._config.switch || {};
    const c = sw.colors || {};

    return html`
      <div class="form-section">
        <div class="sub-header">Switch</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">Optional node between Router and your Access Points. Only appears once an entity is selected below.</p>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${sw.entity || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._valueChanged(e, "switch.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name Override (Optional)", sw.name, "switch.name")}

        <ha-icon-picker
          .label=${"Icon"}
          .value=${sw.icon || "mdi:switch"}
          @value-changed=${(e) => this._valueChanged(e, "switch.icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, "switch.colors.circle")}
            ${this._renderColorInput("Icon Color", c.icon, "switch.colors.icon")}
            ${this._renderColorInput("Connection Line Color", c.bus_line, "switch.colors.bus_line")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, "switch.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, "switch.colors.offline_icon")}
          </div>
        </div>

        <div class="sub-header">Connected Devices</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${sw.entities?.connected_devices || ""}
          .label=${"Entity (Optional)"}
          @value-changed=${(e) => this._valueChanged(e, "switch.entities.connected_devices")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${sw.devices_icon || "mdi:devices"}
          @value-changed=${(e) => this._valueChanged(e, "switch.devices_icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.devices_circle, "switch.colors.devices_circle")}
            ${this._renderColorInput("Icon Color", c.devices_icon, "switch.colors.devices_icon")}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.devices_offline_circle, "switch.colors.devices_offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.devices_offline_icon, "switch.colors.devices_offline_icon")}
          </div>
        </div>
      </div>
    `;
  }

  _renderSecurityPage() {
    const vpnTarget = this._config.vpn_target || "router";
    const firewallTarget = this._config.firewall_target || "router";
    const aps = this._config.access_points || [];
    const hasPrimaryAp = aps.some((ap) => ap.is_primary);

    return html`
      <div class="form-section">
        <div class="sub-header">VPN</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.vpn_entity || ""}
          .label=${"VPN Entity"}
          @value-changed=${(e) => this._valueChanged(e, "vpn_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <div class="select-field">
          <label class="input-label">Applies To</label>
          <select
            class="native-select"
            .value=${vpnTarget}
            @change=${(e) => this._handleSelectChange(e, "vpn_target")}
          >
            <option value="router">Router</option>
            <option value="primary_ap">Primary Access Point</option>
          </select>
        </div>

        ${vpnTarget === "primary_ap" && !hasPrimaryAp
          ? html`
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">
                No Access Point is currently marked Primary - the badge
                won't appear until one is (on the Access Points page).
              </p>
            `
          : null}

        <div class="toggle-row">
          <span>Animate when Offline</span>
          <ha-switch
            .checked=${this._config.vpn_animate_offline ?? false}
            @change=${(e) => this._valueChanged(e, "vpn_animate_offline")}
          ></ha-switch>
        </div>

        <ha-icon-picker
          .label=${"Badge Icon"}
          .value=${this._config.vpn_badge_icon || "mdi:vpn"}
          @value-changed=${(e) => this._valueChanged(e, "vpn_badge_icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Badge Icon Color", this._config.vpn_badge_icon_color, "vpn_badge_icon_color")}
            ${this._renderColorInput("Badge Background Color", this._config.vpn_badge_color, "vpn_badge_color")}
            ${this._renderColorInput("Badge Border Color", this._config.vpn_badge_border_color, "vpn_badge_border_color")}
          </div>
          <div>
            ${this._renderColorInput("Offline Badge Icon Color", this._config.vpn_badge_offline_icon_color, "vpn_badge_offline_icon_color")}
            ${this._renderColorInput("Offline Badge Background Color", this._config.vpn_badge_offline_color, "vpn_badge_offline_color")}
            ${this._renderColorInput("Offline Badge Border Color", this._config.vpn_badge_offline_border_color, "vpn_badge_offline_border_color")}
          </div>
        </div>

        <div class="sub-header">Firewall</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.firewall_entity || ""}
          .label=${"Firewall Entity"}
          @value-changed=${(e) => this._valueChanged(e, "firewall_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <div class="select-field">
          <label class="input-label">Applies To</label>
          <select
            class="native-select"
            .value=${firewallTarget}
            @change=${(e) => this._handleSelectChange(e, "firewall_target")}
          >
            <option value="router">Router</option>
            <option value="primary_ap">Primary Access Point</option>
          </select>
        </div>

        ${firewallTarget === "primary_ap" && !hasPrimaryAp
          ? html`
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">
                No Access Point is currently marked Primary - the badge
                won't appear until one is (on the Access Points page).
              </p>
            `
          : null}

        <div class="toggle-row">
          <span>Animate when Offline</span>
          <ha-switch
            .checked=${this._config.firewall_animate_offline ?? false}
            @change=${(e) => this._valueChanged(e, "firewall_animate_offline")}
          ></ha-switch>
        </div>

        <ha-icon-picker
          .label=${"Badge Icon"}
          .value=${this._config.firewall_badge_icon || "mdi:wall-fire"}
          @value-changed=${(e) => this._valueChanged(e, "firewall_badge_icon")}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Badge Icon Color", this._config.firewall_badge_icon_color, "firewall_badge_icon_color")}
            ${this._renderColorInput("Badge Background Color", this._config.firewall_badge_color, "firewall_badge_color")}
            ${this._renderColorInput("Badge Border Color", this._config.firewall_badge_border_color, "firewall_badge_border_color")}
          </div>
          <div>
            ${this._renderColorInput("Offline Badge Icon Color", this._config.firewall_badge_offline_icon_color, "firewall_badge_offline_icon_color")}
            ${this._renderColorInput("Offline Badge Background Color", this._config.firewall_badge_offline_color, "firewall_badge_offline_color")}
            ${this._renderColorInput("Offline Badge Border Color", this._config.firewall_badge_offline_border_color, "firewall_badge_offline_border_color")}
          </div>
        </div>
      </div>
    `;
  }

  _renderAccessPointsPage() {
    if (this._editingApIndex !== null) {
      return this._renderApEditor(this._editingApIndex);
    }

    const aps = this._config.access_points || [];
    return html`
      <div class="form-section">
        ${aps.map(
          (ap, idx) => html`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon .icon=${ap.icon || "mdi:wifi"} style="color:var(--primary-color);"></ha-icon>
                <span>${ap.name || ap.entity || `AP ${idx + 1}`}</span>
              </div>
              <div class="list-item-actions">
                <ha-icon-button
                  @click=${() => this._moveAp(idx, -1)}
                  .disabled=${idx === 0}
                  title="Move up"
                >
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  @click=${() => this._moveAp(idx, 1)}
                  .disabled=${idx === aps.length - 1}
                  title="Move down"
                >
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  @click=${() => (this._editingApIndex = idx)}
                  title="Edit"
                >
                  <ha-icon icon="mdi:pencil"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  @click=${() => this._removeAp(idx)}
                  title="Delete"
                >
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
            </div>
          `
        )}
        <button class="add-btn" @click=${() => this._addAp()}>
          + Add Access Point
        </button>
      </div>
    `;
  }

  _setPrimaryAp(index, value) {
    const aps = (this._config.access_points || []).map((ap, i) => ({
      ...ap,
      is_primary: i === index ? value : false
    }));
    this._config = { ...this._config, access_points: aps };
    this._fireChanged();
  }

  _renderApEditor(index) {
    const ap = this._config.access_points[index] || DEFAULT_ACCESS_POINT;
    const prefix = `access_points.${index}`;
    const c = ap.colors || {};

    return html`
      <div class="form-section">
        <div class="sub-header">Access Point</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entity || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name", ap.name, `${prefix}.name`)}

        <ha-icon-picker
          .label=${"Icon"}
          .value=${ap.icon || "mdi:wifi"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
        ></ha-icon-picker>

        <div class="toggle-row">
          <span>Primary Access Point</span>
          <ha-switch
            .checked=${!!ap.is_primary}
            @change=${(e) => this._setPrimaryAp(index, e.target.checked)}
          ></ha-switch>
        </div>

        ${ap.is_primary
          ? html`
              <div class="toggle-row">
                <span>Show Primary AP Badge</span>
                <ha-switch
                  .checked=${ap.show_primary_badge !== false}
                  @change=${(e) => this._valueChanged(e, `${prefix}.show_primary_badge`)}
                ></ha-switch>
              </div>
              ${ap.show_primary_badge !== false
                ? html`
                    <div class="two-col">
                      <div>
                        ${this._renderColorInput("Background Color", c.primary_badge, `${prefix}.colors.primary_badge`)}
                        ${this._renderColorInput("Icon Color", c.primary_badge_icon, `${prefix}.colors.primary_badge_icon`)}
                      </div>
                      <div>
                        ${this._renderColorInput("Border Color", c.primary_badge_border, `${prefix}.colors.primary_badge_border`)}
                      </div>
                    </div>
                  `
                : null}
            `
          : null}

        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entities?.download || ""}
          .label=${"Download Speed Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.download`)}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entities?.upload || ""}
          .label=${"Upload Speed Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.upload`)}
          allow-custom-entity
        ></ha-entity-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, `${prefix}.colors.circle`)}
            ${this._renderColorInput("Icon Color", c.icon, `${prefix}.colors.icon`)}
            ${this._renderColorInput("Download Connection Line Color", c.download, `${prefix}.colors.download`)}
            ${this._renderColorInput("Upload Connection Line Color", c.upload, `${prefix}.colors.upload`)}
            ${this._renderColorInput("Connection Lines Color", c.line, `${prefix}.colors.line`)}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, `${prefix}.colors.offline_circle`)}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, `${prefix}.colors.offline_icon`)}
          </div>
        </div>

        ${!ap.is_primary
          ? html`
              <div class="sub-header">Backhaul</div>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${ap.entities?.backhaul_type || ""}
                .label=${"Type"}
                @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.backhaul_type`)}
                allow-custom-entity
              ></ha-entity-picker>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${ap.entities?.backhaul_speed || ""}
                .label=${"Speed"}
                @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.backhaul_speed`)}
                allow-custom-entity
              ></ha-entity-picker>
              <div class="toggle-row">
                <span>Show Backhaul Icon</span>
                <ha-switch
                  .checked=${ap.show_backhaul_icon !== false}
                  @change=${(e) => this._valueChanged(e, `${prefix}.show_backhaul_icon`)}
                ></ha-switch>
              </div>
              ${this._renderColorInput("Backhaul Icon Color", c.backhaul_icon, `${prefix}.colors.backhaul_icon`)}
            `
          : null}

        <div class="sub-header">AP Connected Devices</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entities?.connected_devices || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${ap.devices_icon || "mdi:devices"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.devices_icon`)}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.devices_circle, `${prefix}.colors.devices_circle`)}
            ${this._renderColorInput("Icon Color", c.devices_icon, `${prefix}.colors.devices_icon`)}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.devices_offline_circle, `${prefix}.colors.devices_offline_circle`)}
            ${this._renderColorInput("Offline Icon Color", c.devices_offline_icon, `${prefix}.colors.devices_offline_icon`)}
          </div>
        </div>
      </div>
    `;
  }

  _addAp() {
    const aps = [...(this._config.access_points || []), { ...DEFAULT_ACCESS_POINT }];
    this._config = { ...this._config, access_points: aps };
    this._fireChanged();
  }

  _removeAp(idx) {
    const aps = (this._config.access_points || []).filter((_, i) => i !== idx);
    this._config = { ...this._config, access_points: aps };
    this._fireChanged();
  }

  _moveAp(idx, direction) {
    const aps = [...(this._config.access_points || [])];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= aps.length) return;
    [aps[idx], aps[newIdx]] = [aps[newIdx], aps[idx]];
    this._config = { ...this._config, access_points: aps };
    this._fireChanged();
  }

  _renderIndividualDevicesPage() {
    if (this._editingDevIndex !== null) {
      return this._renderDevEditor(this._editingDevIndex);
    }

    const devs = this._config.individual_devices || [];
    return html`
      <div class="form-section">
        <div class="sub-header">Box & Connector</div>
        ${this._renderColorInput(
          "Box Border Color",
          this._config.individual_devices_box_color,
          "individual_devices_box_color"
        )}
        ${this._renderColorInput(
          "Connector Line Color",
          this._config.individual_devices_line_color,
          "individual_devices_line_color"
        )}
        <div class="sub-header">Devices</div>
        ${devs.map(
          (dev, idx) => html`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon .icon=${dev.icon || "mdi:devices"} style="color:var(--primary-color);"></ha-icon>
                <span>${dev.entity || `Device ${idx + 1}`}</span>
              </div>
              <div class="list-item-actions">
                <ha-icon-button
                  @click=${() => this._moveDev(idx, -1)}
                  .disabled=${idx === 0}
                  title="Move up"
                >
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  @click=${() => this._moveDev(idx, 1)}
                  .disabled=${idx === devs.length - 1}
                  title="Move down"
                >
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  @click=${() => (this._editingDevIndex = idx)}
                  title="Edit"
                >
                  <ha-icon icon="mdi:pencil"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  @click=${() => this._removeDev(idx)}
                  title="Delete"
                >
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
            </div>
          `
        )}
        <button class="add-btn" @click=${() => this._addDev()}>
          + Add Individual Device (${devs.length})
        </button>
      </div>
    `;
  }

  _renderDevEditor(index) {
    const dev = this._config.individual_devices[index] || DEFAULT_INDIVIDUAL_DEVICE;
    const prefix = `individual_devices.${index}`;
    const c = dev.colors || {};

    return html`
      <div class="form-section">
        <div class="sub-header">Device</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${dev.entity || ""}
          .label=${"Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${dev.icon || "mdi:devices"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
        ></ha-icon-picker>

        <div class="two-col">
          <div>
            ${this._renderColorInput("Border Color", c.circle, `${prefix}.colors.circle`)}
            ${this._renderColorInput("Icon Color", c.icon, `${prefix}.colors.icon`)}
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, `${prefix}.colors.offline_circle`)}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, `${prefix}.colors.offline_icon`)}
          </div>
        </div>
      </div>
    `;
  }

  _addDev() {
    const devs = [...(this._config.individual_devices || []), { ...DEFAULT_INDIVIDUAL_DEVICE }];
    this._config = { ...this._config, individual_devices: devs };
    this._fireChanged();
  }

  _removeDev(idx) {
    const devs = (this._config.individual_devices || []).filter((_, i) => i !== idx);
    this._config = { ...this._config, individual_devices: devs };
    this._fireChanged();
  }

  _moveDev(idx, direction) {
    const devs = [...(this._config.individual_devices || [])];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= devs.length) return;
    [devs[idx], devs[newIdx]] = [devs[newIdx], devs[idx]];
    this._config = { ...this._config, individual_devices: devs };
    this._fireChanged();
  }

  _renderAdvancedPage() {
    const pos = this._config.summary_position || "top";
    const apLayout = this._config.primary_ap_layout || "tiered";
    const showSummary = this._config.show_summary !== false;
    const animationOn = this._config.animation !== false;

    return html`
      <div class="form-section">
        <div class="sub-header">Layout</div>
        ${this._renderInput("Title", this._config.title, "title")}

        <div class="select-field">
          <label class="input-label">Primary AP Structure</label>
          <select
            class="native-select"
            .value=${apLayout}
            @change=${(e) => this._handleSelectChange(e, "primary_ap_layout")}
          >
            <option value="tiered">Tiered (Primary AP above the others)</option>
            <option value="flat">Flat (Primary AP in line with the others)</option>
          </select>
        </div>

        <div class="toggle-row">
          <span>Show Summary</span>
          <ha-switch
            .checked=${showSummary}
            @change=${(e) => this._valueChanged(e, "show_summary")}
          ></ha-switch>
        </div>

        ${showSummary
          ? html`
              <div class="select-field">
                <label class="input-label">Summary Position</label>
                <select
                  class="native-select"
                  .value=${pos}
                  @change=${(e) => this._handleSelectChange(e, "summary_position")}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              ${[0, 1, 2].map((idx) => {
                const items = this._config.summary_items || ["download", "upload", "ping"];
                const value = items[idx] || "";
                return html`
                  <div class="select-field">
                    <label class="input-label">Summary Item ${idx + 1}</label>
                    <select
                      class="native-select"
                      .value=${value}
                      @change=${(e) => this._handleSelectChange(e, `summary_items.${idx}`)}
                    >
                      <option value="">None</option>
                      <option value="download">Download</option>
                      <option value="upload">Upload</option>
                      <option value="ping">Latency and Jitter</option>
                      <option value="vpn">VPN Status</option>
                      <option value="firewall">Firewall Status</option>
                    </select>
                  </div>
                `;
              })}
            `
          : null}

        <div class="sub-header">Animation</div>
        <div class="toggle-row">
          <span>Enable Flow Animation</span>
          <ha-switch
            .checked=${animationOn}
            @change=${(e) => this._valueChanged(e, "animation")}
          ></ha-switch>
        </div>

        ${animationOn
          ? html`
              <div class="two-col">
                <div>
                  ${this._renderInput("Min Flow Duration (seconds)", String(this._config.min_flow_duration ?? 0.6), "min_flow_duration", "number")}
                </div>
                <div>
                  ${this._renderInput("Max Flow Duration (seconds)", String(this._config.max_flow_duration ?? 6), "max_flow_duration", "number")}
                </div>
              </div>
            `
          : null}

        <div class="sub-header">Sizes</div>
        ${this._renderSlider("Internet Circle Size", this._config.internet?.circle_size, "internet.circle_size", 40, 120)}
        ${this._renderSlider("Internet Icon Size", this._config.internet?.icon_size, "internet.icon_size", 12, 64)}
        ${this._renderSlider("Router Circle Size", this._config.router?.circle_size, "router.circle_size", 40, 120)}
        ${this._renderSlider("Router Icon Size", this._config.router?.icon_size, "router.icon_size", 12, 64)}
        ${this._renderSlider("LAN Circle Size", this._config.lan?.circle_size, "lan.circle_size", 30, 90)}
        ${this._renderSlider("LAN Icon Size", this._config.lan?.icon_size, "lan.icon_size", 10, 48)}
        ${this._renderSlider("AP Circle Size", this._config.ap_circle_size, "ap_circle_size", 40, 120)}
        ${this._renderSlider("AP Icon Size", this._config.ap_icon_size, "ap_icon_size", 12, 64)}
        ${this._renderSlider("Connected Devices Circle Size", this._config.ap_devices_circle_size, "ap_devices_circle_size", 30, 90)}
        ${this._renderSlider("Connected Devices Icon Size", this._config.ap_devices_icon_size, "ap_devices_icon_size", 10, 48)}
        ${this._renderSlider("Individual Device Circle Size", this._config.individual_device_circle_size, "individual_device_circle_size", 20, 70)}
        ${this._renderSlider("Individual Device Icon Size", this._config.individual_device_icon_size, "individual_device_icon_size", 10, 40)}
        ${this._renderSlider("Primary Badge Size", this._config.primary_badge_size, "primary_badge_size", 12, 40)}
        ${this._renderSlider("Primary Badge Icon Size", this._config.primary_badge_icon_size, "primary_badge_icon_size", 8, 28)}
        ${this._renderSlider("VPN Badge Size", this._config.vpn_badge_size, "vpn_badge_size", 12, 40)}
        ${this._renderSlider("VPN Badge Icon Size", this._config.vpn_badge_icon_size, "vpn_badge_icon_size", 8, 28)}
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 4px;
      }
      .editor-menu {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .menu-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e1e1e1);
        border-radius: 8px;
        cursor: pointer;
      }
      .menu-item:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }
      .menu-item-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .menu-item-title {
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .menu-item-summary {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .chevron {
        color: var(--secondary-text-color);
      }
      .back-header {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 4px 0 8px 0;
        font-weight: 600;
        color: var(--primary-color, #3b82f6);
      }
      .form-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .sub-header {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--primary-text-color);
        margin-top: 8px;
        margin-bottom: 4px;
        border-bottom: 1px solid var(--divider-color, #e1e1e1);
        padding-bottom: 4px;
      }
      .input-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .input-label {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .text-input {
        width: 100%;
        padding: 10px 12px;
        border-radius: 4px;
        border: 1px solid var(--divider-color, #ccc);
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 0.95rem;
        box-sizing: border-box;
        outline: none;
      }
      .text-input:focus {
        border-color: var(--primary-color, #3b82f6);
      }
      .text-input.dense {
        padding: 8px 10px;
        flex: 1;
        min-width: 0;
      }
      input[type="range"] {
        width: 100%;
        cursor: pointer;
      }
      .two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 16px;
        align-items: start;
      }
      .two-col > div {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }
      .color-picker-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 8px;
      }
      .color-picker-label {
        font-size: 0.85rem;
        color: var(--primary-text-color);
      }
      .color-picker-group {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
      }
      .color-picker-input {
        width: 32px;
        height: 32px;
        padding: 0;
        border: 1px solid var(--divider-color, #ccc);
        border-radius: 4px;
        cursor: pointer;
        background: none;
      }
      .color-picker-input::-webkit-color-swatch-wrapper {
        padding: 0;
      }
      .color-picker-input::-webkit-color-swatch {
        border: none;
        border-radius: 2px;
      }
      .color-picker-input::-moz-color-swatch {
        border: none;
        border-radius: 2px;
      }
      .select-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .native-select {
        padding: 10px 12px;
        border-radius: 4px;
        border: 1px solid var(--divider-color, #ccc);
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 0.95rem;
        outline: none;
        cursor: pointer;
      }
      .list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e1e1e1);
        border-radius: 8px;
      }
      .list-item-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .list-item-actions {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .list-item-actions ha-icon-button ha-icon {
        --mdc-icon-size: 20px;
        color: var(--primary-text-color);
      }
      .add-btn {
        padding: 10px;
        background: var(--primary-color, #3b82f6);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 4px;
      }
      .add-btn:hover {
        opacity: 0.9;
      }
      .toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
      }
    `;
  }
}

customElements.define("network-flow-card-editor", NetworkFlowCardEditor);