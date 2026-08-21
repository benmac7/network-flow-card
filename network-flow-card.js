/**
 * NETWORK-FLOW-CARD v2.10.10
 * A power-flow-card-plus style custom visual card for Home Assistant
 * featuring internet, router, LAN, Wi-Fi access points, and multi-row individual device monitoring.
 */

import {
  LitElement,
  html,
  css,
  svg
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

console.info(
  "%c NETWORK-FLOW-CARD %c v2.10.10 ",
  "color: white; background: #3b82f6; font-weight: 700;",
  "color: #3b82f6; background: white; font-weight: 700;"
);

// --- Default Configurations ---
const DEFAULT_ACCESS_POINT = {
  entity: "",
  name: "",
  icon: "mdi:wifi",
  devices_icon: "mdi:devices",
  circle_size: 72,
  icon_size: 24,
  devices_circle_size: 56,
  devices_icon_size: 20,
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

const DEFAULT_INDIVIDUAL_DEVICE = {
  entity: "",
  icon: "mdi:devices",
  circle_size: 42,
  icon_size: 20,
  colors: {
    circle: "#e1e1e1",
    icon: "var(--primary-text-color)",
    offline_circle: "#e1e1e1",
    offline_icon: "var(--secondary-text-color)"
  }
};

const DEFAULT_CONFIG = {
  type: "custom:network-flow-card",
  title: "",
  summary_position: "top",
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
      circle: "#e1e1e1",
      download_badge: "#4caf50",
      download_badge_icon: "#ffffff",
      upload_badge: "#e91e63",
      upload_badge_icon: "#ffffff",
      ping_badge: "#00bcd4",
      ping_badge_icon: "#ffffff"
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
      icon: "var(--primary-text-color)",
      circle: "#e1e1e1",
      bus_line: "var(--divider-color, #ccc)"
    }
  },
  lan: {
    entity: "",
    icon: "mdi:lan",
    circle_size: 56,
    icon_size: 20,
    colors: {
      icon: "var(--primary-text-color)",
      circle: "#8a8a8a",
      line: "#8a8a8a"
    }
  },
  access_points: [],
  individual_devices: [],
  individual_devices_box_color: "#9e9e9e",
  individual_devices_line_color: "#9e9e9e",
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

  _handleMoreInfo(entityId) {
    if (!entityId) return;
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId }
    });
    this.dispatchEvent(event);
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
    const routerEntityState = getEntityState(hass, router.entity);
    const routerStatusState = getEntityState(hass, router.entities?.status);

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

    const summaryTemplate = config.show_summary !== false
      ? html`
          <div class="flow-summary pos-${summaryPos}">
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
                  ${downloadState ? `${downloadState.display}${downloadState.unit}` : "-"}
                </div>
                ${totalDlState
                  ? html`<div class="summary-secondary">
                      ${totalDlState.display}${totalDlState.unit}
                    </div>`
                  : null}
              </div>
            </div>
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
                  ${uploadState ? `${uploadState.display}${uploadState.unit}` : "-"}
                </div>
                ${totalUlState
                  ? html`<div class="summary-secondary">
                      ${totalUlState.display}${totalUlState.unit}
                    </div>`
                  : null}
              </div>
            </div>
            ${pingState
              ? html`
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
                        ${pingState.display}${pingState.unit || " ms"}
                      </div>
                    </div>
                  </div>
                `
              : null}
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
                summaryPos
              )}
              ${apData.length
                ? this._renderBranches(
                    apData,
                    animate,
                    config.router.colors.bus_line,
                    !!(config.individual_devices && config.individual_devices.length),
                    config.individual_devices_line_color || "#9e9e9e"
                  )
                : null}
            </div>
            ${this._renderIndividualDevices(config.individual_devices, hass, config, animate, minDur, maxDur, apData.length)}
            ${summaryPos === "bottom" ? summaryTemplate : null}
          </div>
        </div>
      </ha-card>
    `;
  }

  _renderIndividualDevices(devices, hass, config, animate, minDur, maxDur, apCount) {
    if (!devices || !devices.length) return null;
    const boxColor = config.individual_devices_box_color || "#9e9e9e";
    const lineColor = config.individual_devices_line_color || "#9e9e9e";
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
              const size = dev.circle_size ?? 42;
              const circleColor = online
                ? (dev.colors?.circle || "#e1e1e1")
                : (dev.colors?.offline_circle || dev.colors?.circle || "#e1e1e1");
              const iconColor = online
                ? (dev.colors?.icon || "var(--primary-text-color)")
                : (dev.colors?.offline_icon || "var(--secondary-text-color)");

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
                      style="color:${iconColor};--mdc-icon-size:${dev.icon_size ?? 20}px"
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
    summaryPos
  ) {
    const completedPct = completedRatio * 100;
    const remainingPct = 100 - completedPct;
    const hasInternetFlow =
      internet.entities.download || internet.entities.upload;
    const internetLabel = getCircleLabel(internet.name, internetState, "Internet");
    const routerLabel = getCircleLabel(router.name, routerEntityState, "Router");

    const internetSize = internet.circle_size ?? 72;
    const routerSize = router.circle_size ?? 72;
    const lanSize = lan.circle_size ?? 56;

    return html`
      <div class="trunk">
        <div class="internet-row pos-${summaryPos}">
          <div
            class="circle-wrap"
            style="width:${internetSize}px; height:${internetSize}px;"
            @click=${() => this._handleMoreInfo(internet.entity)}
          >
            <div
              class="circle"
              style="border-color:${hasBilling ? "transparent" : internet.colors.circle}"
            >
              <ha-icon .icon=${internet.icon || "mdi:web"} style="color:${internet.colors.icon};--mdc-icon-size:${internet.icon_size ?? 24}px"></ha-icon>
              <span class="circle-value">${internetLabel}</span>
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
          class="circle-wrap router-anchor"
          style="width:${routerSize}px; height:${routerSize}px;"
          @click=${() => this._handleMoreInfo(router.entity)}
        >
          <div class="circle" style="border-color:${router.colors.circle}">
            <ha-icon .icon=${router.icon || "mdi:router-network"} style="color:${router.colors.icon};--mdc-icon-size:${router.icon_size ?? 24}px"></ha-icon>
            <span class="circle-value">
              ${routerStatus
                ? `${routerStatus.display}${routerStatus.unit ? ` ${routerStatus.unit}` : ""}`
                : routerLabel}
            </span>
          </div>
          ${lan.entity
            ? html`
                <div class="lan-branch ${summaryPos === "right" ? "flip-left" : ""}">
                  ${this._horizontalSingleLine(lan.colors.line, lanDur, animate, 28, summaryPos === "right")}
                  <div
                    class="circle-wrap"
                    style="width:${lanSize}px; height:${lanSize}px;"
                    @click=${(e) => {
                      e.stopPropagation();
                      this._handleMoreInfo(lan.entity);
                    }}
                  >
                    <div class="circle" style="border-color:${lan.colors.circle}">
                      <ha-icon .icon=${lan.icon || "mdi:lan"} style="color:${lan.colors.icon};--mdc-icon-size:${lan.icon_size ?? 20}px"></ha-icon>
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

  _renderBranches(apData, animate, busLineColor, hasIndividualDevices, individualDevicesLineColor) {
    const count = apData.length;
    return html`
      <div
        class="branches ${hasIndividualDevices ? "with-dev-connectors" : ""}"
        style="grid-template-columns:repeat(${count}, max-content)"
      >
        <div class="trunk-drop" style="background:${busLineColor}"></div>
        <div class="bus-line ${count === 1 ? 'single' : ''}" style="background:${busLineColor}"></div>
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
          (item, idx) => {
            const apLabel = getCircleLabel(item.ap.name, item.apEntityState, "AP");
            const apSize = item.ap.circle_size ?? 72;
            return html`
              <div
                class="circle-wrap ap-col-circle"
                style="width:${apSize}px; height:${apSize}px; grid-column:${idx + 1}"
                @click=${() => this._handleMoreInfo(item.ap.entity)}
              >
                <div class="circle" style="border-color:${item.ap.colors.circle}">
                  <ha-icon .icon=${item.ap.icon || "mdi:wifi"} style="color:${item.ap.colors.icon};--mdc-icon-size:${item.ap.icon_size ?? 24}px"></ha-icon>
                  <span class="circle-value">${apLabel}</span>
                </div>
              </div>
            `;
          }
        )}
        ${apData.map(
          (item, i) => html`
            <div class="ap-col-devline" style="grid-column:${i + 1}">
              ${item.hasDevices || hasIndividualDevices
                ? html`<div
                    class="ap-col-fillline"
                    style="background-image:repeating-linear-gradient(to bottom, ${item.ap.colors.devices_line} 0px, ${item.ap.colors.devices_line} 2px, transparent 2px, transparent 6px)"
                  ></div>`
                : null}
            </div>
          `
        )}
        ${apData.map((item, idx) => {
          const devCircleSize = item.ap.devices_circle_size ?? 56;
          if (item.hasDevices) {
            return html`
                <div
                  class="circle-wrap ap-col-devcircle"
                  style="width:${devCircleSize}px; height:${devCircleSize}px; grid-column:${idx + 1}"
                  @click=${() =>
                    this._handleMoreInfo(item.ap.entities.connected_devices)}
                >
                  <div
                    class="circle"
                    style="border-color:${item.ap.colors.devices_circle}"
                  >
                    <ha-icon
                      .icon=${item.ap.devices_icon || "mdi:devices"}
                      style="color:${item.ap.colors.devices_icon};--mdc-icon-size:${item.ap.devices_icon_size ?? 20}px"
                    ></ha-icon>
                    <span class="circle-value">
                      ${item.devicesState ? roundVal(item.devicesState.value) : "-"}
                    </span>
                  </div>
                </div>
              `;
          }
          return hasIndividualDevices
            ? html`<div
                class="ap-col-devcircle-spacer"
                style="grid-column:${idx + 1}"
              >
                <div
                  class="ap-col-fillline"
                  style="background-image:repeating-linear-gradient(to bottom, ${item.ap.colors.devices_line} 0px, ${item.ap.colors.devices_line} 2px, transparent 2px, transparent 6px)"
                ></div>
              </div>`
            : html`<div
                class="ap-col-devcircle-spacer"
                style="grid-column:${idx + 1}"
              ></div>`;
        })}
        ${hasIndividualDevices
          ? apData.map(
              (item, i) => html`
                <div class="ap-col-devconnector" style="grid-column:${i + 1}">
                  <div
                    class="dev-dotted-line"
                    style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                  ></div>
                </div>
              `
            )
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
        left: calc(100% - 6px);
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        flex-direction: row;
      }
      .lan-branch.flip-left {
        left: auto;
        right: calc(100% - 6px);
        flex-direction: row-reverse;
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
      }
      .bus-line {
        grid-column: 1 / -1;
        grid-row: 2;
        height: 2px;
        margin-left: 28px;
        margin-right: 28px;
      }
      .bus-line.single {
        width: 16px;
        margin-left: 0;
        margin-right: 0;
        justify-self: center;
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
        top: 0;
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
        top: 0;
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
  { key: "internet", title: "Internet", icon: "mdi:web", summary: "Entity, name, size, bandwidth, ping, billing, colors" },
  { key: "router", title: "Router", icon: "mdi:router-network", summary: "Entity, name, size, status entity, icon, colors" },
  { key: "lan", title: "LAN Connections", icon: "mdi:lan", summary: "Connected devices entity, size, icon, colors" },
  { key: "access_points", title: "Access Points", icon: "mdi:wifi", summary: "Wi-Fi AP nodes, sizes, entities & bandwidth" },
  { key: "individual_devices", title: "Individual Devices", icon: "mdi:devices", summary: "Specific device tracker icons & sizes" },
  { key: "advanced", title: "Advanced", icon: "mdi:cog", summary: "Title, layout, animation & speed" }
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
                <ha-icon .icon=${item.icon}></ha-icon>
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
      case "lan":
        return this._renderLanPage();
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
        <div class="sub-header">General & Size</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entity || ""}
          .label=${"Internet Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Internet Name Override (Optional)", internet.name, "internet.name")}
        ${this._renderSlider("Internet Circle Size", internet.circle_size, "internet.circle_size", 40, 120)}
        ${this._renderSlider("Internet Icon Size", internet.icon_size, "internet.icon_size", 12, 64)}

        <ha-icon-picker
          .label=${"Main Icon"}
          .value=${internet.icon || "mdi:web"}
          @value-changed=${(e) => this._valueChanged(e, "internet.icon")}
        ></ha-icon-picker>

        <div class="sub-header">Badge Icons</div>
        <ha-icon-picker
          .label=${"Download Badge Icon"}
          .value=${internet.download_icon || "mdi:download"}
          @value-changed=${(e) => this._valueChanged(e, "internet.download_icon")}
        ></ha-icon-picker>

        <ha-icon-picker
          .label=${"Upload Badge Icon"}
          .value=${internet.upload_icon || "mdi:upload"}
          @value-changed=${(e) => this._valueChanged(e, "internet.upload_icon")}
        ></ha-icon-picker>

        <ha-icon-picker
          .label=${"Ping Badge Icon"}
          .value=${internet.ping_icon || "mdi:speedometer"}
          @value-changed=${(e) => this._valueChanged(e, "internet.ping_icon")}
        ></ha-icon-picker>

        <div class="sub-header">Entities</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.download || ""}
          .label=${"Download Speed Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.download")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.upload || ""}
          .label=${"Upload Speed Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.upload")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.ping || ""}
          .label=${"Ping Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.ping")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.total_download || ""}
          .label=${"Total Download Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.total_download")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${internet.entities?.total_upload || ""}
          .label=${"Total Upload Entity"}
          @value-changed=${(e) => this._valueChanged(e, "internet.entities.total_upload")}
          allow-custom-entity
        ></ha-entity-picker>

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

        <div class="sub-header">Colors & Visuals</div>
        ${this._renderColorInput("Border Color", c.circle, "internet.colors.circle")}
        ${this._renderColorInput("Main Icon Color", c.icon, "internet.colors.icon")}
        ${this._renderColorInput("Download Line Color", c.download, "internet.colors.download")}
        ${this._renderColorInput("Upload Line Color", c.upload, "internet.colors.upload")}
        ${this._renderColorInput("Download Badge BG", c.download_badge, "internet.colors.download_badge")}
        ${this._renderColorInput("Download Badge Icon", c.download_badge_icon, "internet.colors.download_badge_icon")}
        ${this._renderColorInput("Upload Badge BG", c.upload_badge, "internet.colors.upload_badge")}
        ${this._renderColorInput("Upload Badge Icon", c.upload_badge_icon, "internet.colors.upload_badge_icon")}
        ${this._renderColorInput("Ping Badge BG", c.ping_badge, "internet.colors.ping_badge")}
        ${this._renderColorInput("Ping Badge Icon", c.ping_badge_icon, "internet.colors.ping_badge_icon")}
        ${this._renderColorInput("Billing Progress Ring", c.billing_progress, "internet.colors.billing_progress")}
        ${this._renderColorInput("Billing Remaining Ring", c.billing_remaining, "internet.colors.billing_remaining")}
      </div>
    `;
  }

  _renderRouterPage() {
    const router = this._config.router || {};
    const c = router.colors || {};

    return html`
      <div class="form-section">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entity || ""}
          .label=${"Router Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Router Name Override (Optional)", router.name, "router.name")}
        ${this._renderSlider("Router Circle Size", router.circle_size, "router.circle_size", 40, 120)}
        ${this._renderSlider("Router Icon Size", router.icon_size, "router.icon_size", 12, 64)}

        <ha-icon-picker
          .label=${"Router Icon"}
          .value=${router.icon || "mdi:router-network"}
          @value-changed=${(e) => this._valueChanged(e, "router.icon")}
        ></ha-icon-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entities?.status || ""}
          .label=${"Router Status Entity (Optional)"}
          @value-changed=${(e) => this._valueChanged(e, "router.entities.status")}
          allow-custom-entity
        ></ha-entity-picker>

        <div class="sub-header">Colors</div>
        ${this._renderColorInput("Border Color", c.circle, "router.colors.circle")}
        ${this._renderColorInput("Icon Color", c.icon, "router.colors.icon")}
        ${this._renderColorInput("Trunk / Bus Line Color", c.bus_line, "router.colors.bus_line")}
      </div>
    `;
  }

  _renderLanPage() {
    const lan = this._config.lan || {};
    const c = lan.colors || {};

    return html`
      <div class="form-section">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${lan.entity || ""}
          .label=${"LAN Connected Devices Entity"}
          @value-changed=${(e) => this._valueChanged(e, "lan.entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-icon-picker
          .label=${"LAN Icon"}
          .value=${lan.icon || "mdi:lan"}
          @value-changed=${(e) => this._valueChanged(e, "lan.icon")}
        ></ha-icon-picker>

        ${this._renderSlider("LAN Circle Size", lan.circle_size, "lan.circle_size", 30, 90)}
        ${this._renderSlider("LAN Icon Size", lan.icon_size, "lan.icon_size", 10, 48)}

        <div class="sub-header">Colors</div>
        ${this._renderColorInput("Border Color", c.circle, "lan.colors.circle")}
        ${this._renderColorInput("Icon Color", c.icon, "lan.colors.icon")}
        ${this._renderColorInput("Connection Line Color", c.line, "lan.colors.line")}
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
                <ha-icon .icon=${ap.icon || "mdi:wifi"}></ha-icon>
                <span>${ap.name || ap.entity || `AP ${idx + 1}`}</span>
              </div>
              <div class="list-item-actions">
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

  _renderApEditor(index) {
    const ap = this._config.access_points[index] || DEFAULT_ACCESS_POINT;
    const prefix = `access_points.${index}`;
    const c = ap.colors || {};

    return html`
      <div class="form-section">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entity || ""}
          .label=${"Access Point Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("AP Name Override (Optional)", ap.name, `${prefix}.name`)}
        ${this._renderSlider("AP Circle Size", ap.circle_size, `${prefix}.circle_size`, 40, 120)}
        ${this._renderSlider("AP Icon Size", ap.icon_size, `${prefix}.icon_size`, 12, 64)}
        ${this._renderSlider("Connected Devices Circle Size", ap.devices_circle_size, `${prefix}.devices_circle_size`, 30, 90)}
        ${this._renderSlider("Connected Devices Icon Size", ap.devices_icon_size, `${prefix}.devices_icon_size`, 10, 48)}

        <ha-icon-picker
          .label=${"AP Main Icon"}
          .value=${ap.icon || "mdi:wifi"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
        ></ha-icon-picker>

        <ha-icon-picker
          .label=${"Connected Devices Sub-Icon"}
          .value=${ap.devices_icon || "mdi:devices"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.devices_icon`)}
        ></ha-icon-picker>

        <div class="sub-header">Entities</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entities?.connected_devices || ""}
          .label=${"Connected Devices Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
          allow-custom-entity
        ></ha-entity-picker>

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

        <div class="sub-header">Colors</div>
        ${this._renderColorInput("Main Border Color", c.circle, `${prefix}.colors.circle`)}
        ${this._renderColorInput("Main Icon Color", c.icon, `${prefix}.colors.icon`)}
        ${this._renderColorInput("Download Line Color", c.download, `${prefix}.colors.download`)}
        ${this._renderColorInput("Upload Line Color", c.upload, `${prefix}.colors.upload`)}
        ${this._renderColorInput("Devices Circle Color", c.devices_circle, `${prefix}.colors.devices_circle`)}
        ${this._renderColorInput("Devices Icon Color", c.devices_icon, `${prefix}.colors.devices_icon`)}
        ${this._renderColorInput("Devices Line Color", c.devices_line, `${prefix}.colors.devices_line`)}
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
                <ha-icon .icon=${dev.icon || "mdi:devices"}></ha-icon>
                <span>${dev.entity || `Device ${idx + 1}`}</span>
              </div>
              <div class="list-item-actions">
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
        <ha-entity-picker
          .hass=${this.hass}
          .value=${dev.entity || ""}
          .label=${"Device Tracker Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-icon-picker
          .label=${"Device Icon"}
          .value=${dev.icon || "mdi:devices"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
        ></ha-icon-picker>

        ${this._renderSlider("Device Circle Size", dev.circle_size, `${prefix}.circle_size`, 20, 70)}
        ${this._renderSlider("Device Icon Size", dev.icon_size, `${prefix}.icon_size`, 10, 40)}

        <div class="sub-header">Colors</div>
        ${this._renderColorInput("Online Border Color", c.circle, `${prefix}.colors.circle`)}
        ${this._renderColorInput("Online Icon Color", c.icon, `${prefix}.colors.icon`)}
        ${this._renderColorInput("Offline Border Color", c.offline_circle, `${prefix}.colors.offline_circle`)}
        ${this._renderColorInput("Offline Icon Color", c.offline_icon, `${prefix}.colors.offline_icon`)}
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

  _renderAdvancedPage() {
    const pos = this._config.summary_position || "top";

    return html`
      <div class="form-section">
        ${this._renderInput("Card Title", this._config.title, "title")}

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

        <div class="sub-header">Behaviors & Timing</div>
        <div class="toggle-row">
          <span>Show Summary</span>
          <ha-switch
            .checked=${this._config.show_summary !== false}
            @change=${(e) => this._valueChanged(e, "show_summary")}
          ></ha-switch>
        </div>

        <div class="toggle-row">
          <span>Enable Flow Animation</span>
          <ha-switch
            .checked=${this._config.animation !== false}
            @change=${(e) => this._valueChanged(e, "animation")}
          ></ha-switch>
        </div>

        ${this._renderInput("Min Flow Duration (seconds)", String(this._config.min_flow_duration ?? 0.6), "min_flow_duration", "number")}
        ${this._renderInput("Max Flow Duration (seconds)", String(this._config.max_flow_duration ?? 6), "max_flow_duration", "number")}
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
      }
      input[type="range"] {
        width: 100%;
        cursor: pointer;
      }
      .color-picker-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 4px;
      }
      .color-picker-label {
        font-size: 0.85rem;
        color: var(--primary-text-color);
        flex: 1;
      }
      .color-picker-group {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 160px;
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