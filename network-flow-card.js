/**
 * NETWORK-FLOW-CARD v2.0.1
 * A power-flow-card-plus style custom visual card for Home Assistant
 * featuring internet, router, LAN, and Wi-Fi access points.
 */

import {
  LitElement,
  html,
  css,
  svg
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

console.info(
  "%c NETWORK-FLOW-CARD %c v2.0.2 ",
  "color: white; background: #3b82f6; font-weight: 700;",
  "color: #3b82f6; background: white; font-weight: 700;"
);

// --- Default Configurations ---
const DEFAULT_ACCESS_POINT = {
  device_id: "",
  name: "AP",
  icon: "mdi:wifi",
  entities: {
    connected_devices: "",
    download: "",
    upload: ""
  },
  colors: {
    icon: "var(--primary-text-color)",
    circle: "#4caf50",
    download: "#3b82f6",
    upload: "#f7931a",
    devices_circle: "#9c27b0",
    devices_icon: "var(--primary-text-color)",
    devices_line: "#9c27b0"
  }
};

const DEFAULT_CONFIG = {
  type: "custom:network-flow-card",
  title: "",
  internet: {
    device_id: "",
    icon: "mdi:web",
    entities: {
      ping: "",
      download: "",
      upload: "",
      total_download: "",
      total_upload: "",
      billing_total: "",
      billing_remaining: ""
    },
    colors: {
      icon: "var(--primary-text-color)",
      billing_remaining: "#e1e1e1",
      billing_progress: "#3b82f6",
      download: "#3b82f6",
      upload: "#f7931a",
      circle: "#e1e1e1"
    }
  },
  router: {
    device_id: "",
    name: "Router",
    icon: "mdi:router-network",
    entities: {
      status: ""
    },
    colors: {
      icon: "var(--primary-text-color)",
      circle: "#e1e1e1",
      bus_line: "var(--divider-color, #ccc)"
    }
  },
  lan: {
    entity: "",
    icon: "mdi:lan",
    colors: {
      icon: "var(--primary-text-color)",
      circle: "#8a8a8a",
      line: "#8a8a8a"
    }
  },
  access_points: [],
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
    this._config = merged;
  }

  getCardSize() {
    return 4;
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

  _handleNavigate(deviceId) {
    if (!deviceId) return;
    const url = `/config/devices/device/${deviceId}`;
    history.pushState(null, "", url);
    window.dispatchEvent(
      new CustomEvent("location-changed", { bubbles: true, composed: true })
    );
  }

  render() {
    if (!this._config || !this.hass) return html``;

    const config = this._config;
    const hass = this.hass;
    const minDur = config.min_flow_duration ?? 0.6;
    const maxDur = config.max_flow_duration ?? 6;
    const animate = config.animation !== false;

    const internet = config.internet;
    const pingState = getEntityState(hass, internet.entities.ping);
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

    const routerStatusState = getEntityState(hass, config.router.entities?.status);

    const apData = (config.access_points || []).map((ap) => {
      const devicesState = getEntityState(hass, ap.entities.connected_devices);
      const apDlState = getEntityState(hass, ap.entities.download);
      const apUlState = getEntityState(hass, ap.entities.upload);

      return {
        ap,
        devicesState,
        dlState: apDlState,
        ulState: apUlState,
        dlDur: calcFlowDuration(apDlState?.value, minDur, maxDur),
        ulDur: calcFlowDuration(apUlState?.value, minDur, maxDur),
        devDur: calcFlowDuration(devicesState?.value, minDur, maxDur),
        hasDevices: !!ap.entities.connected_devices
      };
    });

    return html`
      <ha-card>
        ${config.title
          ? html`<h1 class="card-header">${config.title}</h1>`
          : null}
        <div class="card-content">
          ${this._renderTrunk(
            internet,
            lan,
            lanState,
            lanDur,
            pingState,
            hasBilling,
            billingCompletedRatio,
            dlDur,
            ulDur,
            animate,
            config.router,
            routerStatusState
          )}
          ${apData.length
            ? this._renderBranches(apData, animate, config.router.colors.bus_line)
            : null}

          ${config.show_summary !== false
            ? html`
                <div class="flow-labels">
                  <div
                    class="flow-label download-label"
                    style="color:${internet.colors.download}"
                    @click=${() => this._handleMoreInfo(internet.entities.download)}
                  >
                    <ha-icon icon="mdi:arrow-down-bold"></ha-icon>
                    <span class="primary">
                      ${downloadState ? `${downloadState.display} ${downloadState.unit}` : "-"}
                    </span>
                    ${totalDlState
                      ? html`<span class="secondary">
                          ${totalDlState.display} ${totalDlState.unit} total
                        </span>`
                      : null}
                  </div>
                  <div
                    class="flow-label upload-label"
                    style="color:${internet.colors.upload}"
                    @click=${() => this._handleMoreInfo(internet.entities.upload)}
                  >
                    <ha-icon icon="mdi:arrow-up-bold"></ha-icon>
                    <span class="primary">
                      ${uploadState ? `${uploadState.display} ${uploadState.unit}` : "-"}
                    </span>
                    ${totalUlState
                      ? html`<span class="secondary">
                          ${totalUlState.display} ${totalUlState.unit} total
                        </span>`
                      : null}
                  </div>
                </div>
              `
            : null}
        </div>
      </ha-card>
    `;
  }

  _verticalDualLine(c1, c2, d1, d2, animate, height = 32) {
    return html`
      <div class="vline-pair" style="height:${height}px">
        <div class="vline" style="left:16px;background:${c1}"></div>
        <div class="vline" style="left:32px;background:${c2}"></div>
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

  _horizontalSingleLine(color, duration, animate, width = 36) {
    return html`
      <div class="hline-single" style="width:${width}px">
        <div class="hline" style="background:${color}"></div>
        ${animate ? this._cssDotsX(color, duration, "50%", false, 2) : null}
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
    routerStatus
  ) {
    const completedPct = completedRatio * 100;
    const remainingPct = 100 - completedPct;
    const hasInternetFlow =
      internet.entities.download || internet.entities.upload;

    return html`
      <div class="trunk">
        <div
          class="circle-wrap lg"
          @click=${() => this._handleNavigate(internet.device_id)}
        >
          <div
            class="circle"
            style="border-color:${hasBilling ? "transparent" : internet.colors.circle}"
          >
            <ha-icon .icon=${internet.icon} style="color:${internet.colors.icon}"></ha-icon>
            ${pingState
              ? html`<span class="circle-value">
                  ${roundVal(pingState.value)}${pingState.unit || " ms"}
                </span>`
              : null}
          </div>
          ${hasBilling
            ? this._ring(
                completedPct,
                remainingPct,
                internet.colors.billing_remaining,
                internet.colors.billing_progress,
                internet.entities.billing_remaining
              )
            : null}
        </div>

        ${hasInternetFlow
          ? this._verticalDualLine(
              internet.colors.download,
              internet.colors.upload,
              dlDur,
              ulDur,
              animate
            )
          : html`<div class="vline-pair" style="height:32px"></div>`}

        <div
          class="circle-wrap lg router-anchor"
          @click=${() => this._handleNavigate(router.device_id)}
        >
          <div class="circle" style="border-color:${router.colors.circle}">
            <ha-icon .icon=${router.icon} style="color:${router.colors.icon}"></ha-icon>
            ${routerStatus
              ? html`<span class="circle-value">
                  ${routerStatus.display}${routerStatus.unit ? ` ${routerStatus.unit}` : ""}
                </span>`
              : router.name
              ? html`<span class="circle-value">${router.name}</span>`
              : null}
          </div>
          ${lan.entity
            ? html`
                <div class="lan-branch">
                  ${this._horizontalSingleLine(lan.colors.line, lanDur, animate, 28)}
                  <div
                    class="circle-wrap sm"
                    @click=${(e) => {
                      e.stopPropagation();
                      this._handleMoreInfo(lan.entity);
                    }}
                  >
                    <div class="circle" style="border-color:${lan.colors.circle}">
                      <ha-icon .icon=${lan.icon} style="color:${lan.colors.icon}"></ha-icon>
                      <span class="circle-value">
                        ${lanState ? roundVal(lanState.value) : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              `
            : null}
        </div>
      </div>
    `;
  }

  _renderBranches(apData, animate, busLineColor) {
    const count = apData.length;
    return html`
      <div
        class="branches"
        style="grid-template-columns:repeat(${count}, var(--nf-circle-size))"
      >
        <div class="trunk-drop" style="background:${busLineColor}"></div>
        ${count > 1
          ? html`<div class="bus-line" style="background:${busLineColor}"></div>`
          : null}
        ${apData.map(
          (item, i) => html`
            <div class="ap-col-line" style="grid-column:${i + 1}">
              ${this._verticalDualLine(
                item.ap.colors.download,
                item.ap.colors.upload,
                item.dlDur,
                item.ulDur,
                animate,
                28
              )}
            </div>
          `
        )}
        ${apData.map(
          (item, idx) => html`
            <div
              class="circle-wrap ap-col-circle"
              style="grid-column:${idx + 1}"
              @click=${() => this._handleNavigate(item.ap.device_id)}
            >
              <div class="circle" style="border-color:${item.ap.colors.circle}">
                <ha-icon .icon=${item.ap.icon} style="color:${item.ap.colors.icon}"></ha-icon>
                ${item.ap.name
                  ? html`<span class="circle-value">${item.ap.name}</span>`
                  : null}
              </div>
            </div>
          `
        )}
        ${apData.map(
          (item, i) => html`
            <div class="ap-col-devline" style="grid-column:${i + 1}">
              ${item.hasDevices
                ? this._verticalSingleLine(
                    item.ap.colors.devices_line,
                    item.devDur,
                    animate,
                    24,
                    true
                  )
                : null}
            </div>
          `
        )}
        ${apData.map((item, idx) =>
          item.hasDevices
            ? html`
                <div
                  class="circle-wrap sm ap-col-devcircle"
                  style="grid-column:${idx + 1}"
                  @click=${() =>
                    this._handleMoreInfo(item.ap.entities.connected_devices)}
                >
                  <div
                    class="circle"
                    style="border-color:${item.ap.colors.devices_circle}"
                  >
                    <ha-icon
                      icon="mdi:devices"
                      style="color:${item.ap.colors.devices_icon}"
                    ></ha-icon>
                    <span class="circle-value">
                      ${item.devicesState ? roundVal(item.devicesState.value) : "-"}
                    </span>
                  </div>
                </div>
              `
            : html`<div
                class="ap-col-devcircle-spacer"
                style="grid-column:${idx + 1}"
              ></div>`
        )}
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
        --nf-circle-size: 72px;
        --nf-circle-size-sm: 56px;
      }
      ha-card {
        overflow: hidden;
        font-family: inherit;
        color: var(--primary-text-color);
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
      }

      .trunk {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .circle-wrap {
        position: relative;
        z-index: 2;
        width: var(--nf-circle-size);
        height: var(--nf-circle-size);
        flex-shrink: 0;
      }
      .circle-wrap.sm {
        width: var(--nf-circle-size-sm);
        height: var(--nf-circle-size-sm);
      }
      .circle {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid var(--divider-color, #e1e1e1);
        background: var(--card-background-color, #fff);
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
      .circle-wrap.sm .circle ha-icon {
        --mdc-icon-size: 20px;
      }
      .circle-value {
        font-size: 11px;
        font-weight: 400;
        color: var(--primary-text-color);
        line-height: 1;
        max-width: calc(var(--nf-circle-size) - 16px);
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
        left: calc(100% - 6px);
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        flex-direction: row;
      }
      .hline-single {
        position: relative;
        height: 8px;
        flex-shrink: 0;
      }
      .hline {
        position: absolute;
        left: -6px;
        right: -6px;
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
      }
      .vline-single {
        position: relative;
        width: 8px;
      }
      .vline {
        position: absolute;
        top: -2px;
        bottom: -8px;
        width: 2px;
        transform: translateX(-50%);
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
        from {
          top: 0%;
        }
        to {
          top: 100%;
        }
      }
      @keyframes nf-dot-btt {
        from {
          top: 100%;
        }
        to {
          top: 0%;
        }
      }
      @keyframes nf-dot-ltr {
        from {
          left: 0%;
        }
        to {
          left: 100%;
        }
      }
      @keyframes nf-dot-rtl {
        from {
          left: 100%;
        }
        to {
          left: 0%;
        }
      }

      .branches {
        display: grid;
        grid-template-rows: 26px 2px auto auto auto auto;
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
      }
      .bus-line {
        grid-column: 1 / -1;
        grid-row: 2;
        height: 2px;
        margin-left: calc(var(--nf-circle-size) / 2 - 8px);
        margin-right: calc(var(--nf-circle-size) / 2 - 8px);
      }
      .ap-col-line {
        grid-row: 3;
        display: flex;
        justify-content: center;
      }
      .ap-col-circle {
        grid-row: 4;
        justify-self: center;
      }
      .ap-col-devline {
        grid-row: 5;
        display: flex;
        justify-content: center;
      }
      .ap-col-devcircle {
        grid-row: 6;
        justify-self: center;
      }
      .ap-col-devcircle-spacer {
        grid-row: 6;
      }

      .flow-labels {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: flex-start;
        margin-top: 16px;
      }
      .flow-label {
        display: flex;
        align-items: baseline;
        gap: 6px;
        font-size: 0.85rem;
        cursor: pointer;
      }
      .flow-label ha-icon {
        --mdc-icon-size: 16px;
      }
      .flow-label .primary {
        font-weight: 700;
      }
      .flow-label .secondary {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        font-weight: 400;
      }
    `;
  }
}

customElements.define("network-flow-card", NetworkFlowCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "network-flow-card",
  name: "Network Flow Card",
  description:
    "A power-flow-card-plus style visual for internet, router, LAN, and Wi-Fi access points.",
  preview: false
});

// --- Editor Component ---
const MENU_ITEMS = [
  { key: "internet", title: "Internet", icon: "mdi:web", summary: "Bandwidth, ping, totals, billing, click action" },
  { key: "router", title: "Router", icon: "mdi:router-network", summary: "Icon, color, click action" },
  { key: "lan", title: "LAN Connections", icon: "mdi:lan", summary: "Connected devices entity (optional)" },
  { key: "access_points", title: "Access Points", icon: "mdi:wifi", summary: "" },
  { key: "advanced", title: "Advanced", icon: "mdi:cog", summary: "Title, animation, flow speed" }
];

class NetworkFlowCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _page: { state: true },
      _editingApIndex: { state: true }
    };
  }

  constructor() {
    super();
    this._page = null;
    this._editingApIndex = null;
  }

  setConfig(config) {
    const merged = deepMerge(DEFAULT_CONFIG, config || {});
    merged.access_points = (config && config.access_points || []).map((ap) =>
      deepMerge(DEFAULT_ACCESS_POINT, ap)
    );
    this._config = merged;
  }

  _fireChanged() {
    if (this._fireTimeout) clearTimeout(this._fireTimeout);
    this._fireTimeout = setTimeout(() => this._flushFireChanged(), 300);
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

  _updateTop(key, value) {
    this._config = { ...this._config, [key]: value };
    this._fireChanged();
  }

  _updateSection(section, key, value) {
    this._config = {
      ...this._config,
      [section]: { ...this._config[section], [key]: value }
    };
    this._fireChanged();
  }

  _updateSectionNested(section, subSection, key, value) {
    this._config = {
      ...this._config,
      [section]: {
        ...this._config[section],
        [subSection]: {
          ...this._config[section][subSection],
          [key]: value
        }
      }
    };
    this._fireChanged();
  }

  _updateAp(index, subSection, key, value) {
    const aps = [...this._config.access_points];
    aps[index] = subSection
      ? { ...aps[index], [subSection]: { ...aps[index][subSection], [key]: value } }
      : { ...aps[index], [key]: value };
    this._config = { ...this._config, access_points: aps };
    this._fireChanged();
  }

  _addAp() {
    const aps = [...(this._config.access_points || []), deepMerge(DEFAULT_ACCESS_POINT, {})];
    this._config = { ...this._config, access_points: aps };
    this._flushFireChanged();
    this._editingApIndex = aps.length - 1;
    this._page = "ap-edit";
  }

  _removeAp(index) {
    const aps = [...this._config.access_points];
    aps.splice(index, 1);
    this._config = { ...this._config, access_points: aps };
    this._flushFireChanged();
    this._page = "access_points";
    this._editingApIndex = null;
  }

  _openPage(page) {
    this._flushFireChanged();
    this._page = page;
  }

  _editAp(index) {
    this._flushFireChanged();
    this._editingApIndex = index;
    this._page = "ap-edit";
  }

  _goBack() {
    this._flushFireChanged();
    if (this._page === "ap-edit") {
      this._page = "access_points";
      this._editingApIndex = null;
    } else {
      this._page = null;
    }
  }

  render() {
    if (!this._config || !this.hass) return html``;
    return this._page
      ? this._renderSubPage(this._page)
      : this._renderMainMenu();
  }

  _renderMainMenu() {
    const config = this._config;
    const apCount = (config.access_points || []).length;

    return html`
      <div class="editor">
        <ha-textfield
          label="Title (optional)"
          .value=${config.title || ""}
          @change=${(e) => this._updateTop("title", e.target.value)}
        ></ha-textfield>

        <div class="menu">
          ${MENU_ITEMS.map(
            (item) => html`
              <button
                class="menu-row"
                type="button"
                @click=${() => this._openPage(item.key)}
              >
                <ha-icon class="menu-icon" .icon=${item.icon}></ha-icon>
                <div class="menu-text">
                  <div class="menu-title">${item.title}</div>
                  <div class="menu-summary">
                    ${item.key === "access_points"
                      ? `${apCount} configured`
                      : item.summary}
                  </div>
                </div>
                <ha-icon class="menu-chevron" icon="mdi:chevron-right"></ha-icon>
              </button>
            `
          )}
        </div>
      </div>
    `;
  }

  _renderSubPage(page) {
    const item = MENU_ITEMS.find((m) => m.key === page) || {
      title: page === "ap-edit" ? this._apEditTitle() : ""
    };

    return html`
      <div class="editor">
        <div class="subpage-header">
          <ha-icon-button @click=${() => this._goBack()}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </ha-icon-button>
          <span class="subpage-title">${item.title}</span>
        </div>
        ${page === "internet" ? this._renderInternetPage() : null}
        ${page === "router" ? this._renderRouterPage() : null}
        ${page === "lan" ? this._renderLanPage() : null}
        ${page === "access_points" ? this._renderAccessPointsPage() : null}
        ${page === "ap-edit" ? this._renderApEditPage() : null}
        ${page === "advanced" ? this._renderAdvancedPage() : null}
      </div>
    `;
  }

  _apEditTitle() {
    const ap = this._config.access_points[this._editingApIndex];
    return ap?.name || "Access Point";
  }

  _devicePicker(section, label) {
    return html`
      <ha-device-picker
        .hass=${this.hass}
        .value=${this._config[section]?.device_id || ""}
        .label=${label}
        @value-changed=${(e) => this._updateSection(section, "device_id", e.detail.value)}
      ></ha-device-picker>
    `;
  }

  _entityPicker(section, key, label) {
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${this._config[section]?.entities?.[key] || ""}
        .label=${label}
        allow-custom-entity
        @value-changed=${(e) => this._updateSectionNested(section, "entities", key, e.detail.value)}
      ></ha-entity-picker>
    `;
  }

  _iconPicker(section, label) {
    return html`
      <ha-icon-picker
        .hass=${this.hass}
        .value=${this._config[section]?.icon || ""}
        .label=${label}
        @value-changed=${(e) => this._updateSection(section, "icon", e.detail.value)}
      ></ha-icon-picker>
    `;
  }

  _colorField(section, key, label) {
    const colorVal = this._config[section]?.colors?.[key] || "";
    const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(colorVal);

    return html`
      <div class="color-field">
        <label>${label}</label>
        <div class="color-input-row">
          <input
            type="color"
            title="Pick a color"
            .value=${isHex ? colorVal : "#000000"}
            @input=${(e) => this._updateSectionNested(section, "colors", key, e.target.value)}
          />
          <ha-textfield
            .value=${colorVal}
            placeholder="#hex or var(--token)"
            @change=${(e) => this._updateSectionNested(section, "colors", key, e.target.value)}
          ></ha-textfield>
        </div>
      </div>
    `;
  }

  _apEntityPicker(key, label) {
    const ap = this._config.access_points[this._editingApIndex];
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${ap.entities?.[key] || ""}
        .label=${label}
        allow-custom-entity
        @value-changed=${(e) => this._updateAp(this._editingApIndex, "entities", key, e.detail.value)}
      ></ha-entity-picker>
    `;
  }

  _apColorField(key, label) {
    const ap = this._config.access_points[this._editingApIndex];
    const colorVal = ap.colors?.[key] || "";
    const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(colorVal);

    return html`
      <div class="color-field">
        <label>${label}</label>
        <div class="color-input-row">
          <input
            type="color"
            title="Pick a color"
            .value=${isHex ? colorVal : "#000000"}
            @input=${(e) => this._updateAp(this._editingApIndex, "colors", key, e.target.value)}
          />
          <ha-textfield
            .value=${colorVal}
            placeholder="#hex or var(--token)"
            @change=${(e) => this._updateAp(this._editingApIndex, "colors", key, e.target.value)}
          ></ha-textfield>
        </div>
      </div>
    `;
  }

  _renderInternetPage() {
    return html`
      <h4>Click action</h4>
      <div class="grid">${this._devicePicker("internet", "Device")}</div>

      <h4>Speed & latency</h4>
      <div class="grid">
        ${this._entityPicker("internet", "ping", "Ping / latency")}
        ${this._entityPicker("internet", "download", "Download bandwidth")}
        ${this._entityPicker("internet", "upload", "Upload bandwidth")}
      </div>

      <h4>Data totals</h4>
      <div class="grid">
        ${this._entityPicker("internet", "total_download", "Total downloaded")}
        ${this._entityPicker("internet", "total_upload", "Total uploaded")}
      </div>

      <h4>Billing cycle</h4>
      <div class="grid">
        ${this._entityPicker("internet", "billing_total", "Billing cycle length (days)")}
        ${this._entityPicker("internet", "billing_remaining", "Billing cycle days remaining")}
      </div>

      <h4>Appearance</h4>
      <div class="grid">${this._iconPicker("internet", "Icon")}</div>
      <div class="grid colors">
        ${this._colorField("internet", "icon", "Icon color")}
        ${this._colorField("internet", "circle", "Outline (no billing)")}
        ${this._colorField("internet", "download", "Download line")}
        ${this._colorField("internet", "upload", "Upload line")}
        ${this._colorField("internet", "billing_progress", "Billing: completed")}
        ${this._colorField("internet", "billing_remaining", "Billing: remaining")}
      </div>
    `;
  }

  _renderRouterPage() {
    return html`
      <h4>Label shown inside the circle</h4>
      <div class="grid">
        <ha-textfield
          label="Name"
          .value=${this._config.router?.name || ""}
          @change=${(e) => this._updateSection("router", "name", e.target.value)}
        ></ha-textfield>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.router?.entities?.status || ""}
          label="Status entity (optional, overrides name)"
          allow-custom-entity
          @value-changed=${(e) => this._updateSectionNested("router", "entities", "status", e.detail.value)}
        ></ha-entity-picker>
      </div>

      <h4>Click action</h4>
      <div class="grid">${this._devicePicker("router", "Device")}</div>

      <h4>Appearance</h4>
      <div class="grid">${this._iconPicker("router", "Icon")}</div>
      <div class="grid colors">
        ${this._colorField("router", "icon", "Icon color")}
        ${this._colorField("router", "circle", "Outline")}
        ${this._colorField("router", "bus_line", "Access point bus/T-bar line")}
      </div>
    `;
  }

  _renderLanPage() {
    return html`
      <p class="hint">
        Optional. Leave the entity blank to hide the LAN Connections node entirely.
      </p>
      <h4>Entity</h4>
      <div class="grid">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.lan?.entity || ""}
          label="Connected devices count"
          allow-custom-entity
          @value-changed=${(e) => this._updateSection("lan", "entity", e.detail.value)}
        ></ha-entity-picker>
      </div>

      <h4>Appearance</h4>
      <div class="grid">${this._iconPicker("lan", "Icon")}</div>
      <div class="grid colors">
        ${this._colorField("lan", "icon", "Icon color")}
        ${this._colorField("lan", "circle", "Outline")}
        ${this._colorField("lan", "line", "Line")}
      </div>
    `;
  }

  _renderAccessPointsPage() {
    const aps = this._config.access_points || [];
    return html`
      ${aps.length === 0
        ? html`<p class="hint">No access points yet. Add one below.</p>`
        : html`
            <div class="menu">
              ${aps.map(
                (ap, idx) => html`
                  <div class="menu-row ap-row">
                    <button
                      class="menu-row-inner"
                      type="button"
                      @click=${() => this._editAp(idx)}
                    >
                      <ha-icon class="menu-icon" .icon=${ap.icon}></ha-icon>
                      <div class="menu-text">
                        <div class="menu-title">${ap.name || "Access Point"}</div>
                        <div class="menu-summary">
                          ${ap.entities?.connected_devices || ap.entities?.download
                            ? "Configured"
                            : "Not yet configured"}
                        </div>
                      </div>
                      <ha-icon class="menu-chevron" icon="mdi:chevron-right"></ha-icon>
                    </button>
                    <ha-icon-button @click=${() => this._removeAp(idx)}>
                      <ha-icon icon="mdi:delete-outline"></ha-icon>
                    </ha-icon-button>
                  </div>
                `
              )}
            </div>
          `}
      <button class="add-button" type="button" @click=${() => this._addAp()}>
        <ha-icon icon="mdi:plus"></ha-icon>
        Add Access Point
      </button>
    `;
  }

  _renderApEditPage() {
    const ap = this._config.access_points[this._editingApIndex];
    if (!ap) return html`<p class="hint">This access point was removed.</p>`;
    const idx = this._editingApIndex;

    return html`
      <h4>Name</h4>
      <div class="grid">
        <ha-textfield
          label="Name"
          .value=${ap.name || ""}
          @change=${(e) => this._updateAp(idx, null, "name", e.target.value)}
        ></ha-textfield>
      </div>

      <h4>Click action</h4>
      <div class="grid">
        <ha-device-picker
          .hass=${this.hass}
          .value=${ap.device_id || ""}
          label="Device"
          @value-changed=${(e) => this._updateAp(idx, null, "device_id", e.detail.value)}
        ></ha-device-picker>
      </div>

      <h4>Entities</h4>
      <div class="grid">
        ${this._apEntityPicker("connected_devices", "Connected devices count")}
        ${this._apEntityPicker("download", "Download bandwidth")}
        ${this._apEntityPicker("upload", "Upload bandwidth")}
      </div>

      <h4>Appearance</h4>
      <div class="grid">
        <ha-icon-picker
          .hass=${this.hass}
          .value=${ap.icon || ""}
          label="Icon"
          @value-changed=${(e) => this._updateAp(idx, null, "icon", e.detail.value)}
        ></ha-icon-picker>
      </div>
      <div class="grid colors">
        ${this._apColorField("icon", "Icon color")}
        ${this._apColorField("circle", "Outline")}
        ${this._apColorField("download", "Download line")}
        ${this._apColorField("upload", "Upload line")}
        ${this._apColorField("devices_circle", "Devices outline")}
        ${this._apColorField("devices_icon", "Devices icon color")}
        ${this._apColorField("devices_line", "Devices line")}
      </div>

      <button class="remove-button" type="button" @click=${() => this._removeAp(idx)}>
        <ha-icon icon="mdi:delete-outline"></ha-icon>
        Remove this Access Point
      </button>
    `;
  }

  _renderAdvancedPage() {
    const config = this._config;
    return html`
      <h4>Animation</h4>
      <div class="row">
        <ha-formfield label="Animate flow dots">
          <ha-switch
            .checked=${config.animation !== false}
            @change=${(e) => this._updateTop("animation", e.target.checked)}
          ></ha-switch>
        </ha-formfield>
      </div>
      <div class="grid">
        <ha-textfield
          label="Fastest dot duration (s)"
          type="number"
          step="0.1"
          .value=${config.min_flow_duration ?? 0.6}
          @change=${(e) => this._updateTop("min_flow_duration", parseFloat(e.target.value))}
        ></ha-textfield>
        <ha-textfield
          label="Slowest dot duration (s)"
          type="number"
          step="0.1"
          .value=${config.max_flow_duration ?? 6}
          @change=${(e) => this._updateTop("max_flow_duration", parseFloat(e.target.value))}
        ></ha-textfield>
      </div>

      <h4>Summary area</h4>
      <div class="row">
        <ha-formfield label="Show download/upload summary at the bottom">
          <ha-switch
            .checked=${config.show_summary !== false}
            @change=${(e) => this._updateTop("show_summary", e.target.checked)}
          ></ha-switch>
        </ha-formfield>
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
      .editor {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 4px 0 16px 0;
      }
      h4 {
        margin: 12px 0 2px 0;
        font-size: 0.9rem;
        color: var(--secondary-text-color);
      }
      .hint {
        font-size: 0.85rem;
        color: var(--secondary-text-color);
        margin: 4px 0;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .grid.colors {
        grid-template-columns: 1fr 1fr;
      }
      .color-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .color-input-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .color-input-row input[type="color"] {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        background: none;
        padding: 0;
      }
      .color-input-row ha-textfield {
        flex: 1;
        min-width: 0;
      }
      .row {
        display: flex;
        align-items: center;
      }
      ha-textfield {
        width: 100%;
      }

      .menu {
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--divider-color, #e0e0e0);
        margin-top: 8px;
      }
      .menu-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 12px;
        background: var(--card-background-color, #fff);
        border: none;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        cursor: pointer;
        text-align: left;
        font: inherit;
        color: inherit;
        width: 100%;
      }
      .menu-row:last-child {
        border-bottom: none;
      }
      .menu-row:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }
      .menu-row.ap-row {
        padding: 4px 4px 4px 12px;
      }
      .menu-row-inner {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        font: inherit;
        color: inherit;
        padding: 8px 0;
      }
      .menu-icon {
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }
      .menu-text {
        flex: 1;
        min-width: 0;
      }
      .menu-title {
        font-weight: 500;
        font-size: 0.95rem;
      }
      .menu-summary {
        font-size: 0.78rem;
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .menu-chevron {
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }

      .add-button,
      .remove-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin-top: 12px;
        padding: 10px;
        border-radius: 8px;
        border: 1px dashed var(--divider-color, #e0e0e0);
        background: none;
        color: var(--primary-color, #03a9f4);
        cursor: pointer;
        font: inherit;
        font-weight: 500;
      }
      .remove-button {
        color: var(--error-color, #db4437);
        border-style: solid;
        margin-top: 20px;
      }

      .subpage-header {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 4px;
      }
      .subpage-title {
        font-size: 1.05rem;
        font-weight: 500;
      }
    `;
  }
}

customElements.define("network-flow-card-editor", NetworkFlowCardEditor);