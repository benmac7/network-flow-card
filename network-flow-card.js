/**
 * NETWORK-FLOW-CARD v2.5.0
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
  "%c NETWORK-FLOW-CARD %c v2.5.0 ",
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
  primary_badge_location: "top-left",
  show_backhaul_icon: true,
  show_primary_badge: true,
  connects_to_switch: false,
  ip_badge_color: "var(--blue-color)",
  ip_badge_icon_color: "var(--card-background-color)",
  entities: {
    connected_devices: "",
    download: "",
    upload: "",
    backhaul_type: "",
    backhaul_speed: "",
    // IP Address badges (Advanced > Layout > Show IP Addressing).
    // ip_address is this AP's own LAN-side address - shown below the
    // circle for the Primary AP in tiered layout, or above it
    // otherwise (Primary in flat layout, or any non-Primary AP).
    // wan_ip only applies when this AP is Primary and doubles as the
    // router/gateway (no separate Router node) - shown below the
    // Internet circle exactly like the Router's own WAN badge would be.
    ip_address: "",
    wan_ip: ""
  },
  colors: {
    icon: "var(--cyan-color)",
    circle: "var(--cyan-color)",
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

// Power-over-Ethernet badge config, shared by the top-level Switch and
// every node-level Switch. "auto" sums every entity on the switch's
// device that reports watts and looks PoE-related (covers per-port
// sensors from integrations like UniFi Insights without the user
// listing each port); "manual" sums exactly the entities configured
// below. Threshold coloring evaluates `thresholds` in order and uses
// the first one whose `up_to` the total is at or under - the final
// entry has no `up_to` and acts as the catch-all above every other tier.
const DEFAULT_POE = {
  mode: "off", // "auto" | "manual" | "off"
  manual_entities: [],
  unit: "W",
  icon: "mdi:lightning-bolt",
  location: "bottom-right",
  color_mode: "single", // "single" | "threshold"
  color: "var(--orange-color)",
  text_color: "var(--card-background-color)",
  thresholds: [
    { up_to: 15, color: "var(--green-color)" },
    { up_to: 30, color: "var(--orange-color)" },
    { color: "var(--red-color)" }
  ],
  animate_over_threshold: false
};

// Access Points get the same PoE capability as Switches, added after
// DEFAULT_POE's own declaration (DEFAULT_ACCESS_POINT is declared
// earlier in the file, so it can't reference DEFAULT_POE inline).
DEFAULT_ACCESS_POINT.poe = { ...DEFAULT_POE };

// A node-level Switch (distinct from the top-level Switch that sits
// above the bus between Router and the Access Point row). This one
// lives inside a single Node, optionally feeding that node's own
// Access Point(s).
const DEFAULT_NODE_SWITCH = {
  entity: "",
  name: "",
  icon: "mdi:switch",
  devices_icon: "mdi:devices",
  entities: {
    connected_devices: ""
  },
  colors: {
    icon: "var(--amber-color)",
    circle: "var(--amber-color)",
    bus_line: "var(--divider-color, #ccc)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)",
    devices_circle: "var(--purple-color)",
    devices_icon: "var(--primary-color)",
    devices_line: "var(--divider-color, #ccc)",
    devices_offline_circle: "var(--error-color)",
    devices_offline_icon: "var(--error-color)"
  },
  poe: { ...DEFAULT_POE }
};

// A Homelab node - a dedicated node type for an appliance running
// multiple network functions at once (DNS filtering, a VPN server,
// a reverse proxy), which is common on a single mini-PC/NAS/Proxmox
// box. Structurally it behaves like a standalone Switch (its own
// circle sits directly on the bus, solid unanimated lines throughout,
// no bandwidth metrics) since it's infrastructure rather than a
// Wi-Fi access point - it just carries a different default icon and
// three additional optional service badges alongside PoE.
// A single container/VM status badge on a Homelab node - shaped like
// the VPN/Firewall badges (active vs offline color sets, an icon)
// since "is it running" is the only meaningful reading. Homelab holds
// an array of these (one per container/VM the user wants to track),
// each independently positioned and stacking with everything else on
// that circle.
const DEFAULT_CONTAINER_BADGE = {
  entity: "",
  name: "",
  icon: "mdi:docker",
  location: "top-right",
  color: "var(--green-color)",
  icon_color: "var(--card-background-color)",
  border_color: "transparent",
  offline_color: "var(--disabled-text-color, #bdbdbd)",
  offline_icon_color: "var(--card-background-color)",
  offline_border_color: "transparent",
  animate_offline: false
};

const DEFAULT_HOMELAB = {
  entity: "",
  name: "",
  icon: "mdi:server",
  devices_icon: "mdi:devices",
  entities: {
    connected_devices: ""
  },
  colors: {
    icon: "var(--deep-purple-color)",
    circle: "var(--deep-purple-color)",
    bus_line: "var(--divider-color, #ccc)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)",
    devices_circle: "var(--purple-color)",
    devices_icon: "var(--primary-color)",
    devices_line: "var(--divider-color, #ccc)",
    devices_offline_circle: "var(--error-color)",
    devices_offline_icon: "var(--error-color)"
  },
  poe: { ...DEFAULT_POE },
  // Off by default expectation is that most Homelab nodes have
  // nothing hanging directly off them the way a Switch feeds APs or
  // clients - this lets the connecting line down toward Connected
  // Devices / the shared Clients box be turned off
  // entirely rather than always drawing toward a box this node has
  // nothing to do with.
  show_devices_line: true,
  // DNS Filtering, VPN, Firewall, and Reverse Proxy are now global
  // Security elements that can each target this node (see
  // dns_target/vpn_target/firewall_target/reverse_proxy_target) -
  // Homelab no longer carries its own separate copies of those.
  containers: []
};

// A Node is one branch hanging off the main bus line. It can be a bare
// Access Point (the only shape that existed before this schema), or it
// can contain a node-level Switch feeding one or more Access Points.
// `access_points` always has at least one entry.
const DEFAULT_NODE = {
  name: "",
  switch: null,
  homelab: null,
  access_points: [],
  // Additional Switches fed by this node's own `switch`, alongside
  // (not instead of) its access_points - rendered in the same row as
  // the fed APs, each a leaf (no further feeding of its own), with
  // solid connecting lines the whole way down through its own
  // Connected Devices circle to Clients, matching how any
  // Switch's own output always renders solid.
  fed_switches: []
};

const DEFAULT_INDIVIDUAL_DEVICE = {
  entity: "",
  // Manual name override. Blank means the entity's own friendly_name
  // is used at display/tooltip time (see _renderIndividualDeviceCircle)
  // - this is prefilled from the entity's friendly_name automatically
  // whenever it's picked/changed in the editor while still blank, but
  // stays fully editable afterward.
  name: "",
  icon: "mdi:devices",
  // Manual override for which sub-group this device sits in when
  // Group By is active. Blank means auto-detect from the entity's own
  // attributes (see getDeviceGroupName); when set, this exact label
  // is used regardless of the entity's actual attributes.
  group_override: "",
  colors: {
    circle: "var(--pink-color)",
    icon: "var(--pink-color)",
    offline_circle: "var(--error-color)",
    offline_icon: "var(--error-color)"
  }
};

const DEFAULT_CONFIG = {
  type: "custom:network-flow-card",
  title: "",
  summary_position: "top",
  summary_items: ["download", "upload", "ping"],
  // Colors the PoE summary badge, mirroring the per-switch PoE badge's
  // own color options (single fixed color, or ascending thresholds).
  // Separate from any individual switch's `poe` config since this one
  // colors an aggregate total across every switch shown on the card.
  summary_poe_color_mode: "single", // "single" | "threshold"
  summary_poe_color: "var(--orange-color)",
  summary_poe_thresholds: [
    { up_to: 15, color: "var(--green-color)" },
    { up_to: 30, color: "var(--orange-color)" },
    { color: "var(--red-color)" }
  ],
  primary_ap_layout: "flat",
  // IP Address badges (Router WAN/LAN, Primary/other AP addresses) -
  // off by default since not everyone has, or wants to expose, IP
  // sensors on their diagram.
  show_ip_addressing: false,
  primary_badge_icon: "mdi:star",
  badge_size: 18,
  badge_icon_size: 12,
  poe_badge_size: 16,
  poe_badge_font_size: 9,
  vpn_entity: "",
  vpn_target: "router", // "router" | "primary_ap" | "homelab" | "switch"
  vpn_animate_offline: false,
  vpn_badge_icon: "mdi:vpn",
  vpn_badge_location: "bottom-right",
  vpn_badge_color: "var(--blue-color)",
  vpn_badge_icon_color: "var(--card-background-color)",
  vpn_badge_border_color: "transparent",
  vpn_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  vpn_badge_offline_icon_color: "var(--card-background-color)",
  vpn_badge_offline_border_color: "transparent",
  // Optional - when set, the VPN badge shows this entity's value next
  // to its icon (a widened pill instead of a plain circle). Left
  // blank, the badge stays icon-only exactly as before.
  vpn_peers_entity: "",
  firewall_entity: "",
  firewall_target: "router", // "router" | "primary_ap" | "homelab" | "switch"
  firewall_animate_offline: false,
  firewall_badge_icon: "mdi:wall-fire",
  firewall_badge_location: "bottom-left",
  firewall_badge_color: "var(--orange-color)",
  firewall_badge_icon_color: "var(--card-background-color)",
  firewall_badge_border_color: "transparent",
  firewall_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  firewall_badge_offline_icon_color: "var(--card-background-color)",
  firewall_badge_offline_border_color: "transparent",
  // DNS Filtering (e.g. Pi-hole/AdGuard Home) - a numeric pill like
  // PoE's, shown on whichever device it's targeted at.
  dns_entity: "",
  dns_target: "router", // "router" | "primary_ap" | "homelab" | "switch"
  dns_unit: "",
  dns_badge_icon: "mdi:shield-check",
  dns_badge_location: "top-left",
  dns_color_mode: "single", // "single" | "threshold"
  dns_badge_color: "var(--blue-color)",
  dns_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  dns_text_color: "var(--card-background-color)",
  dns_thresholds: [
    { up_to: 50, color: "var(--green-color)" },
    { up_to: 100, color: "var(--orange-color)" },
    { color: "var(--red-color)" }
  ],
  dns_animate_over_threshold: false,
  // Reverse Proxy - shaped exactly like VPN/Firewall (active/offline
  // icon badge), since "is it up" is the only meaningful reading for
  // most reverse proxy setups.
  reverse_proxy_entity: "",
  reverse_proxy_target: "router", // "router" | "primary_ap" | "homelab" | "switch"
  reverse_proxy_animate_offline: false,
  reverse_proxy_badge_icon: "mdi:server-network",
  reverse_proxy_badge_location: "top-right",
  reverse_proxy_badge_color: "var(--green-color)",
  reverse_proxy_badge_icon_color: "var(--card-background-color)",
  reverse_proxy_badge_border_color: "transparent",
  reverse_proxy_badge_offline_color: "var(--disabled-text-color, #bdbdbd)",
  reverse_proxy_badge_offline_icon_color: "var(--card-background-color)",
  reverse_proxy_badge_offline_border_color: "transparent",
  ap_circle_size: 72,
  ap_icon_size: 24,
  ap_devices_circle_size: 56,
  ap_devices_icon_size: 20,
  ap_column_gap: 32,
  homelab_circle_size: 60,
  homelab_icon_size: 22,
  flow_line_color: "var(--divider-color, #ccc)",
  backhaul_icon_size: 13,
  individual_device_circle_size: 42,
  individual_device_icon_size: 20,
  individual_device_guest_icon: "mdi:account-question",
  individual_device_guest_icon_color: "var(--secondary-text-color)",
  individual_device_guest_icon_bg: "transparent",
  individual_device_guest_icon_size: 16,
  individual_device_guest_badge_size: 24,
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
      icon: "var(--green-color)",
      billing_remaining: "var(--divider-color)",
      billing_progress: "var(--green-color)",
      download: "var(--blue-color)",
      upload: "var(--orange-color)",
      circle: "var(--green-color)",
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
      status: "",
      // IP Address badges (Advanced > Layout > Show IP Addressing) -
      // WAN centers below the Internet circle (this router doubles as
      // the gateway), LAN centers below this Router circle itself.
      wan_ip: "",
      lan_ip: ""
    },
    ip_badge_color: "var(--blue-color)",
    ip_badge_icon_color: "var(--card-background-color)",
    colors: {
      icon: "var(--indigo-color)",
      circle: "var(--indigo-color)",
      bus_line: "var(--divider-color, #ccc)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)"
    },
    poe: { ...DEFAULT_POE }
  },
  lan: {
    entity: "",
    icon: "mdi:lan",
    circle_size: 56,
    icon_size: 20,
    colors: {
      icon: "var(--teal-color)",
      circle: "var(--teal-color)",
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
      icon: "var(--amber-color)",
      circle: "var(--amber-color)",
      bus_line: "var(--divider-color, #ccc)",
      offline_circle: "var(--error-color)",
      offline_icon: "var(--error-color)",
      devices_circle: "var(--purple-color)",
      devices_icon: "var(--primary-color)",
      devices_offline_circle: "var(--error-color)",
      devices_offline_icon: "var(--error-color)"
    },
    poe: { ...DEFAULT_POE }
  },
  nodes: [],
  individual_devices: [],
  individual_devices_box_color: "var(--divider-color)",
  individual_devices_box_radius: "var(--ha-card-border-radius, 12px)",
  // "none" | "vlan" | "ap" - splits the Clients box into
  // labeled sub-groups instead of one flat row.
  individual_devices_group_by: "none",
  individual_devices_group_padding: 10,
  // Separate from individual_devices_box_radius so sub-group corners
  // can differ from the main box's - defaults to the same value.
  individual_devices_group_box_radius: "var(--ha-card-border-radius, 12px)",
  individual_devices_group_show_border: true,
  // Blank means "fall back to individual_devices_box_color" at render
  // time, so this stays in sync with the main box's color by default
  // until explicitly overridden.
  individual_devices_group_border_color: "",
  // Per-group color overrides, matched by exact group name (e.g.
  // "Wired", "Guest", "VLAN 20") - falls back to
  // individual_devices_group_border_color, then to
  // individual_devices_box_color, when no override matches.
  individual_devices_group_colors: [],
  // "gaps": boxes size to content, extra space goes into the gaps
  // between them (justify-content: space-between).
  // "last_fill": boxes size to content except the very last one,
  // which stretches to consume whatever space is left. Only reliable
  // when groups fit on one row - CSS can't target "last box per
  // wrapped row" dynamically, so an earlier row's trailing box won't
  // stretch if groups wrap onto multiple lines.
  // "widest_fits": whichever group has the most devices sizes to its
  // own content, and every other group equally shares whatever space
  // is left on that row. Computed per-render from actual device
  // counts, not something pure CSS can express, since "which group is
  // widest" is data-dependent.
  individual_devices_group_layout: "widest_fits",
  show_summary: true,
  animation: true,
  min_flow_duration: 0.6,
  max_flow_duration: 6
};

// --- Helper Functions ---
// Migrates a config from the old flat `access_points: [AP, AP, ...]`
// schema to the new `nodes: [{switch, access_points: [AP]}, ...]`
// schema. Each old AP becomes its own single-AP node, with no switch -
// this preserves the exact same rendered result as before migration.
// Safe to call on an already-migrated config (it's a no-op if `nodes`
// is already present, or if there's nothing to migrate).
function migrateAccessPointsToNodes(config) {
  if (!config) return config;
  if (config.nodes) return config;
  if (!config.access_points || !config.access_points.length) return config;
  const nodes = config.access_points.map((ap) => ({
    name: "",
    switch: null,
    access_points: [ap]
  }));
  const { access_points, ...rest } = config;
  return { ...rest, nodes };
}

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

function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Determines which Group By sub-group a Client belongs
// in. A manual group_override always wins. Otherwise: a device_tracker
// attribute of `connection: wired` always means "Wired" regardless of
// grouping mode (this matches common integrations like TP-Link Deco).
// For "vlan" mode, the group is the entity's `interface` attribute
// (the SSID/VLAN name); for "ap" mode, it's the `deco_device`
// attribute (the connected Access Point's name). Anything missing the
// relevant attribute (e.g. a binary_sensor with neither) falls into
// "Unknown" rather than being silently dropped.
// Determines which Group By sub-group a Client belongs
// in. A manual group_override always wins. Otherwise: a device_tracker
// attribute of `connection: wired` always means "Wired" regardless of
// grouping mode (this matches common integrations like TP-Link Deco).
// For "vlan" mode, the group is the entity's `interface` attribute
// (TP-Link Deco) or `essid` attribute (UniFi's SSID name) - whichever
// is present; for "ap" mode, it's the `deco_device` attribute (Deco's
// friendly AP name) or, failing that, UniFi's `ap_mac` (a MAC address
// rather than a friendly name - UniFi doesn't expose one directly, so
// this will show as a MAC unless the device's Group Override is set
// manually to a friendlier label). Anything missing the relevant
// attribute (e.g. a binary_sensor with neither) falls into "Unknown"
// rather than being silently dropped.
// Determines which Group By sub-group a Client belongs
// in. A manual group_override always wins. Otherwise: a device_tracker
// attribute of `connection: wired` always means "Wired" regardless of
// grouping mode (matches TP-Link Deco and similar integrations).
//
// - "ssid": groups by network name - TP-Link Deco's `interface`
//   attribute, or UniFi's `essid`. UniFi's `is_guest` boolean forces
//   "Guest" regardless of the actual SSID name, since a guest SSID
//   isn't necessarily named "guest".
// - "vlan": groups by VLAN - UniFi's numeric `vlan` attribute takes
//   priority whenever present, even if `is_guest` is also true (a
//   guest client on a specific VLAN groups by that VLAN, not as
//   "Guest"). Only falls back to "Guest" when there's no VLAN ID at
//   all; falls back further to TP-Link's `interface` (which has no
//   separate VLAN concept of its own).
// - "ap": groups by connected Access Point - TP-Link's `deco_device`
//   (a friendly name), or UniFi's `ap_mac` (a MAC address, since
//   UniFi doesn't expose a friendly AP name on the client attributes).
//
// Anything missing the relevant attribute (e.g. a binary_sensor with
// none of these) falls into "Unknown" rather than being silently
// dropped.
function getDeviceGroupName(hass, dev, groupBy) {
  if (dev.group_override) return dev.group_override;
  if (!groupBy || groupBy === "none") return null;
  const attrs = hass?.states?.[dev.entity]?.attributes || {};
  // TP-Link Deco reports this as `connection_type` on real devices
  // (confirmed against actual entity attributes); UniFi and some other
  // integrations use the shorter `connection` - both are checked since
  // they don't collide.
  if (attrs.connection === "wired" || attrs.connection_type === "wired") return "Wired";

  if (groupBy === "ssid") {
    if (attrs.is_guest === true) return "Guest";
    const ssid = attrs.interface || attrs.essid;
    return ssid ? capitalizeFirst(ssid) : "Unknown";
  }

  if (groupBy === "vlan") {
    if (attrs.vlan != null && attrs.vlan !== "") return `VLAN ${attrs.vlan}`;
    if (attrs.is_guest === true) return "Guest";
    return attrs.interface ? capitalizeFirst(attrs.interface) : "Unknown";
  }

  if (groupBy === "ap") {
    return attrs.deco_device || attrs.ap_mac || "Unknown";
  }

  return "Unknown";
}

// Buckets devices into ordered {name, devices} groups: "Wired" always
// first if present, "Unknown" always last if present, everything else
// in the order its group name was first encountered.
function groupIndividualDevices(hass, devices, groupBy) {
  const order = [];
  const map = {};
  devices.forEach((dev) => {
    const name = getDeviceGroupName(hass, dev, groupBy) || "Unknown";
    if (!map[name]) {
      map[name] = [];
      order.push(name);
    }
    map[name].push(dev);
  });
  const sortedNames = [
    ...(order.includes("Wired") ? ["Wired"] : []),
    ...order.filter((n) => n !== "Wired" && n !== "Unknown"),
    ...(order.includes("Unknown") ? ["Unknown"] : [])
  ];
  return sortedNames.map((name) => ({ name, devices: map[name] }));
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
  const stateObj = hass.states[entityId];
  // Some TP-Link Deco setups expose connection type as a
  // `connection_type` attribute directly on the unit's own tracker
  // entity (confirmed against real Deco attributes) rather than as a
  // separate sensor - check that first, then fall back to the entity's
  // own state for integrations/forks that DO use a dedicated sensor.
  const raw = stateObj.attributes?.connection_type ?? stateObj.state;
  const state = String(raw).toLowerCase();
  return state === "wired";
}

// True when an entity's own attributes mark it as connected to a guest
// network. Checks two known shapes: TP-Link Deco's "interface"
// attribute (value "guest"), and the official UniFi integration's
// "is_guest" boolean attribute (confirmed against HA core's
// CLIENT_CONNECTED_ATTRIBUTES for the unifi device_tracker - it's
// "is_guest", snake_case, not "isGuest"). Both are checked
// unconditionally since they're distinct attribute names that won't
// collide with other integrations' data.
function isGuestDevice(hass, entityId) {
  if (!entityId || !hass?.states[entityId]) return false;
  const attrs = hass.states[entityId].attributes || {};
  if (attrs.interface === "guest") return true;
  if (attrs.is_guest === true || attrs.is_guest === "true") return true;
  return false;
}

// --- TP-Link Auto-Discovery ---------------------------------------
// Scans the entity registry (hass.entities) for anything owned by the
// TP-Link Deco or TP-Link Router integrations and sorts it into three
// buckets: the Router/Gateway (Deco's master unit, or the single
// tplink_router device), Nodes (Deco satellite units - each a Wi-Fi
// access point on the mesh), and Clients (every remaining
// client). Only entity IDs are ever handed back to the caller - the
// caller decides what to actually do with them (populate a form,
// write straight into config, etc).
//
// This relies on hass.entities carrying a `platform` field (standard
// on the frontend's entity registry) and hass.devices carrying a
// `model` field the integration sets to the real hardware name. In
// practice this turned out unreliable (real TP-Link Deco entities
// report `device_model: "BE25"` - a bare product number with no word
// "deco" in it - so a model-substring check never matched). The
// classification below instead uses attributes confirmed directly
// against real Deco device_tracker entities: `device_type: "deco"`
// marks the entity as a mesh unit itself (clients never carry this
// attribute at all), and `master: true` identifies the gateway unit
// among those. If your installed integration version doesn't populate
// these the same way, check Developer Tools > States on one of your
// own Deco entities and adjust tplinkIsDecoUnit/tplinkIsDecoMaster
// below.
const TPLINK_PLATFORMS = ["tplink_deco", "tplink_router"];

function tplinkBuildDeviceEntityMap(hass) {
  const map = {};
  for (const [entityId, entry] of Object.entries(hass.entities || {})) {
    if (!entry?.device_id) continue;
    (map[entry.device_id] ||= []).push(entityId);
  }
  return map;
}

function tplinkIsDecoUnit(hass, entityId) {
  const attrs = hass.states?.[entityId]?.attributes || {};
  return attrs.device_type === "deco";
}

function tplinkIsDecoMaster(hass, entityId) {
  const attrs = hass.states?.[entityId]?.attributes || {};
  return attrs.master === true || attrs.master === "true";
}

function tplinkCollectEntities(hass, platforms) {
  const out = [];
  for (const [entityId, entry] of Object.entries(hass.entities || {})) {
    if (!platforms.includes(entry.platform)) continue;
    out.push({ entityId, deviceId: entry.device_id, domain: entityId.split(".")[0], platform: entry.platform });
  }
  return out;
}

// Finds a sibling entity on the same device matching one of the given
// suffixes - checked first against the registry's translation_key
// (stable, integration-defined) and falling back to the formatted
// entity_id's own suffix (which can drift if the user renamed things,
// but still works out of the box for most installs). Skips anything
// without a live state, since several TP-Link Deco forks ship their
// backhaul-type/speed sensors DISABLED by default - matching a
// disabled entity would wire up a field that silently shows nothing
// until the user finds and enables it by hand.
function tplinkFindSibling(hass, entityIds, suffixes) {
  const isLive = (id) => !!hass.states?.[id];
  for (const eid of entityIds) {
    const key = hass.entities?.[eid]?.translation_key;
    if (key && suffixes.includes(key) && isLive(eid)) return eid;
  }
  for (const eid of entityIds) {
    if (suffixes.some((s) => eid.endsWith(s)) && isLive(eid)) return eid;
  }
  return "";
}

function scanTplinkDevices(hass) {
  if (!hass?.entities || !hass?.devices) return { routerCandidates: [], nodes: [], individualDevices: [] };

  const deviceEntityMap = tplinkBuildDeviceEntityMap(hass);
  const all = tplinkCollectEntities(hass, TPLINK_PLATFORMS);
  const trackers = all.filter((e) => e.domain === "device_tracker");

  // Every Deco mesh unit's own tracker (per-entity attribute check -
  // deliberately NOT grouped by device_id, since whether a client's
  // tracker shares a device_id with its connecting Deco unit varies by
  // integration version/fork; checking the entity's own attributes
  // works regardless of how devices are grouped).
  const decoUnitTrackers = trackers.filter((e) => e.platform === "tplink_deco" && tplinkIsDecoUnit(hass, e.entityId));

  // TP-Link Router only ever represents ONE physical router, and a
  // router doesn't track its own presence as a device_tracker - every
  // device_tracker entity on this platform is a client, so the router
  // itself is whichever OTHER entity (sensor/binary_sensor/button/etc)
  // shares that platform.
  const routerNonTrackerEntities = all.filter((e) => e.platform === "tplink_router" && e.domain !== "device_tracker");
  const routerDeviceId = routerNonTrackerEntities[0]?.deviceId || null;

  // --- Router / Gateway candidates: every plausible candidate is
  // returned rather than silently picking one - a Deco master and a
  // TP-Link Router can both legitimately exist at once (e.g. a TP-Link
  // Router acting as modem/gateway with a Deco mesh riding behind it),
  // and there's no reliable way to know which one the user actually
  // wants without asking. The caller presents these and lets the user
  // choose.
  const routerCandidates = [];
  const decoMasterTracker = decoUnitTrackers.find((e) => tplinkIsDecoMaster(hass, e.entityId));
  if (decoMasterTracker) {
    routerCandidates.push({
      entity: decoMasterTracker.entityId,
      deviceId: decoMasterTracker.deviceId,
      name: hass.states[decoMasterTracker.entityId]?.attributes?.friendly_name || "",
      source: "tplink_deco",
      // Deco doesn't distinguish WAN vs LAN the way a traditional
      // router does, but the master's own tracker carries its LAN-side
      // management address as an `ip` attribute (confirmed against
      // real Deco entities) - that's the closest equivalent to a LAN
      // IP this integration exposes, so wanIpEntity is left blank
      // rather than guessed.
      lanIpEntity: decoMasterTracker.entityId
    });
  }
  if (routerDeviceId) {
    // Confirmed against sensor.py: "Connection Type" (key `conn_type`,
    // object_id `connection_type`) is the preferred Router entity, and
    // "Total wired clients" (key `wired_clients_total`, object_id
    // `total_wired_clients`) is the preferred LAN Connected Devices
    // entity - both in the integration's base sensor set unconditionally
    // (unlike the LTE/VPN/serving-cell sensors, which only appear on
    // matching hardware), so both are present on every install. Buttons
    // are excluded from the router-entity fallback entirely - a
    // button's state reflects when it was last pressed, not the
    // router's reachability, so using one here would make the Router
    // node look permanently offline.
    const onDevice = all.filter((e) => e.deviceId === routerDeviceId && e.domain !== "button");
    const preferred = onDevice.find((e) => e.domain === "sensor" && e.entityId.endsWith("connection_type"));
    const statusLike = onDevice.find((e) => /status|online|connection/.test(e.entityId));
    const anySensor = onDevice.find((e) => e.domain === "sensor");
    const chosen = preferred || statusLike || anySensor || onDevice[0];
    const lanCandidate = onDevice.find((e) => e.domain === "sensor" && e.entityId.endsWith("total_wired_clients"));
    // "WAN IPv4 Address" / "LAN IPv4 Address" (keys `wan_ipv4_addr` /
    // `lan_ipv4_addr`) - confirmed from sensor.py, enabled by default,
    // object IDs slugified from their names same as everything else on
    // this integration.
    const wanIpCandidate = onDevice.find((e) => e.domain === "sensor" && e.entityId.endsWith("wan_ipv4_address"));
    const lanIpCandidate = onDevice.find((e) => e.domain === "sensor" && e.entityId.endsWith("lan_ipv4_address"));
    if (chosen) {
      routerCandidates.push({
        entity: chosen.entityId,
        deviceId: routerDeviceId,
        name: hass.devices[routerDeviceId]?.name_by_user || hass.devices[routerDeviceId]?.name || "",
        source: "tplink_router",
        lanEntity: lanCandidate?.entityId || "",
        wanIpEntity: wanIpCandidate?.entityId || "",
        lanIpEntity: lanIpCandidate?.entityId || ""
      });
    }
  }

  // --- Node candidates: every Deco unit, master included - if the
  // master ends up used as the Router, the usual "already added" dedupe
  // (which also checks config.router.entity) grays it out here rather
  // than hiding it outright, so the user can still choose to add it as
  // a Node too if they'd rather represent it that way instead. ---
  const nodes = decoUnitTrackers
    .map((e) => {
      const siblings = e.deviceId ? deviceEntityMap[e.deviceId] || [] : [];
      // Suffixes confirmed straight from amosyuen/ha-tplink-deco's own
      // sensor.py: its "Backhaul type"/"Backhaul speed" diagnostic
      // sensors are DISABLED by default (isLive skips these until the
      // user enables them), while its per-deco "<name> Down"/"<name>
      // Up" throughput sensors and "Connected clients" count ARE
      // enabled by default. Object IDs are slugified from the entity's
      // NAME, not its `key`, hence "backhaul_type" (not
      // "connection_type") and "_down"/"_up" (not "download_speed"/
      // "upload_speed") - a mismatch that silently produced empty
      // discovery results before. Older attribute-only suffixes are
      // kept as a fallback for other forks/versions.
      const backhaulFromSibling = tplinkFindSibling(hass, siblings, ["backhaul_type", "connection_type", "connection"]);
      return {
        deviceId: e.deviceId,
        entity: e.entityId,
        name: hass.states[e.entityId]?.attributes?.friendly_name || "",
        isMaster: tplinkIsDecoMaster(hass, e.entityId),
        // Falls back to the unit's own tracker entity when there's no
        // separate sibling sensor (or it's disabled) - its
        // `connection_type` attribute (confirmed present on real Deco
        // trackers) works directly since isBackhaulWired checks
        // attributes before raw state.
        backhaulType: backhaulFromSibling || e.entityId,
        backhaulSpeed: tplinkFindSibling(hass, siblings, ["backhaul_speed"]),
        download: tplinkFindSibling(hass, siblings, ["_down", "download_speed"]),
        upload: tplinkFindSibling(hass, siblings, ["_up", "upload_speed"]),
        connectedDevices: tplinkFindSibling(hass, siblings, [
          "connected_clients",
          "client_count",
          "connected_devices",
          "clients"
        ]),
        // Same self-referencing pattern as backhaulType - the unit's
        // own tracker carries its address as an `ip` attribute
        // (confirmed against real Deco entities), which _renderIpBadge
        // already knows to check before falling back to raw state.
        ipAddress: e.entityId
      };
    });

  // --- Individual device candidates: every device_tracker on these
  // platforms that ISN'T itself a Deco mesh unit (and actually has a
  // live state - a disabled entity would otherwise show as a phantom
  // "always offline" device once added) ---
  const individualDevices = trackers
    .filter((e) => hass.states?.[e.entityId] && !(e.platform === "tplink_deco" && tplinkIsDecoUnit(hass, e.entityId)))
    .map((e) => ({
      entity: e.entityId,
      name: hass.states[e.entityId]?.attributes?.friendly_name || e.entityId,
      source: e.platform
    }));

  return { routerCandidates, nodes, individualDevices };
}

// --- Speedtest Auto-Discovery ---------------------------------------
// Looks across four speed-test integrations: the official core
// "Speedtest.net" (platform `speedtestdotnet` - ping/download/upload
// only, no jitter or ISP), the community "Ookla Speedtest" (platform
// `ookla_speedtest` - adds jitter and ISP), "Cloudflare Speed Test"
// (platform `cloudflare_speed_test` - reports latency as
// translation_key "latency" rather than "ping", and its closest
// single-number download/upload equivalent is the "90th percentile"
// sensor rather than a plain "download"/"upload" one), and "LibreSpeed"
// (platform `librespeed` - download/upload/ping/jitter match the same
// translation_keys as Speedtest.net, no ISP sensor at all). Field names
// confirmed straight from each integration's own sensor.py/const.py.
// Returns every service found across all four as a separate candidate
// - a user might have more than one configured - so the editor
// presents all of them and lets the person choose rather than one
// being silently preferred.
// Reuses the same device-sibling lookup helpers as the TP-Link scan
// above (tplinkBuildDeviceEntityMap/tplinkFindSibling) - they're
// generic despite the name, just introduced alongside that feature
// first.
const SPEEDTEST_PLATFORMS = ["speedtestdotnet", "ookla_speedtest", "cloudflare_speed_test", "librespeed"];
const SPEEDTEST_FIELD_SUFFIXES = {
  ping: ["ping", "latency"],
  jitter: ["jitter"],
  download: ["download", "90th_percentile_down"],
  upload: ["upload", "90th_percentile_up"],
  isp: ["isp"]
};
const SPEEDTEST_PLATFORM_LABELS = {
  speedtestdotnet: "Speedtest.net",
  ookla_speedtest: "Ookla Speedtest",
  cloudflare_speed_test: "Cloudflare Speed Test",
  librespeed: "LibreSpeed"
};

// Buckets a list of entity IDs by whichever HA device they belong to,
// so an integration with several independent services/instances (e.g.
// several Aussie Broadband services, or two separate Speedtest set
// ups) surfaces as separate candidates instead of one merged blob.
// Deviceless entities (no device_id) each become their own singleton
// group rather than being merged together, since they aren't
// necessarily related to each other.
// Compares a candidate's proposed field values against whatever is
// already configured, returning the list of field names that would
// actually CHANGE (both sides non-blank and different) - used to ask
// "overwrite?" only when there's a genuine conflict, never when a
// field is simply being filled in for the first time.
function findFieldConflicts(existingFields, incomingFields) {
  const conflicts = [];
  for (const [key, incoming] of Object.entries(incomingFields)) {
    const existing = existingFields[key];
    if (incoming && existing && existing !== incoming) conflicts.push(key);
  }
  return conflicts;
}

function groupEntitiesByDevice(hass, entityIds) {
  const groups = {};
  const order = [];
  for (const eid of entityIds) {
    const deviceId = hass.entities?.[eid]?.device_id || null;
    const key = deviceId || `__deviceless__:${eid}`;
    if (!groups[key]) {
      groups[key] = { deviceId, entityIds: [] };
      order.push(key);
    }
    groups[key].entityIds.push(eid);
  }
  return order.map((key) => ({
    deviceId: groups[key].deviceId,
    entityIds: groups[key].entityIds,
    name: groups[key].deviceId
      ? hass.devices?.[groups[key].deviceId]?.name_by_user || hass.devices?.[groups[key].deviceId]?.name || ""
      : ""
  }));
}

function scanSpeedtestIntegration(hass) {
  if (!hass?.entities) return [];

  const byPlatform = Object.fromEntries(SPEEDTEST_PLATFORMS.map((p) => [p, []]));
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (SPEEDTEST_PLATFORMS.includes(entry.platform)) byPlatform[entry.platform].push(entityId);
  }

  const deviceEntityMap = tplinkBuildDeviceEntityMap(hass);
  const services = [];

  for (const platform of SPEEDTEST_PLATFORMS) {
    for (const group of groupEntitiesByDevice(hass, byPlatform[platform])) {
      const siblings = group.deviceId ? deviceEntityMap[group.deviceId] || [] : group.entityIds;
      const pool = [...new Set([...group.entityIds, ...siblings])];
      const find = (suffixes) => tplinkFindSibling(hass, pool, suffixes);
      const ispEntity = find(SPEEDTEST_FIELD_SUFFIXES.isp);

      services.push({
        deviceId: group.deviceId,
        platform,
        name: group.name || SPEEDTEST_PLATFORM_LABELS[platform],
        ping: find(SPEEDTEST_FIELD_SUFFIXES.ping),
        jitter: find(SPEEDTEST_FIELD_SUFFIXES.jitter),
        download: find(SPEEDTEST_FIELD_SUFFIXES.download),
        upload: find(SPEEDTEST_FIELD_SUFFIXES.upload),
        isp: ispEntity ? hass.states[ispEntity]?.state || "" : ""
      });
    }
  }

  return services;
}

// --- ISP Auto-Discovery (billing / usage / connectivity) ------------
// Looks for three ISP account integrations: Aussie Broadband
// (platform `aussie_broadband`), Starlink (platform `starlink`), and
// Start.ca (platform `startca`). Returns every SERVICE found across
// all three as a separate candidate rather than picking one - Aussie
// Broadband in particular commonly has several services under one
// account (each its own HA device, e.g. "NBN: 39 Ultimo St..."), and
// there's no way to know which address/line the person actually wants
// without asking. Field names below are confirmed straight from each
// integration's own source in home-assistant/core (Aussie Broadband's
// sensor.py, Starlink's sensor.py/binary_sensor.py) plus Start.ca's
// documented sensor list, as of the versions checked - a future
// upstream rename would need a matching update here.
//
// Aussie Broadband: translation_key "billing_cycle_length" (days in
// the cycle), "billing_cycle_remaining" (days left), "downloaded" /
// "uploaded" (cycle data usage, resets each billing period).
// Starlink: translation_key "download" / "upload" (cumulative session
// usage since HA last restarted - NOT billing-cycle data, since
// Starlink doesn't expose one; treat as an approximation). Its
// "Connected" sensor is a binary_sensor with device_class
// "connectivity" and no translation_key of its own, so it's matched
// by device_class rather than name/key - the only reliable signal
// since its exact entity_id depends on how HA names an entity with no
// explicit translation_key.
// Start.ca: legacy YAML platform with no translation_key at all - its
// sensors are named from a plain `name=` string ("Total Download",
// "Remaining", etc), matched below by a plain substring against the
// slugified object_id.
const ISP_PLATFORMS = ["aussie_broadband", "starlink", "startca"];
const ISP_PLATFORM_LABELS = { aussie_broadband: "Aussie Broadband", starlink: "Starlink", startca: "Start.ca" };
const ISP_FIELD_HINTS = {
  billing_total: ["billing_cycle_length", "cycle_length", "billing_length", "plan_length", "total_bandwidth", "limit"],
  billing_remaining: ["billing_cycle_remaining", "days_remaining", "cycle_remaining", "billing_remaining", "used_remaining", "remaining"],
  total_download: ["total_download", "downloaded", "download", "used_download"],
  total_upload: ["total_upload", "uploaded", "upload", "used_upload"]
};

// Looser than tplinkFindSibling: matches by translation_key exact
// match OR a plain substring anywhere in the entity_id's object_id.
// `preferDomain`, when given, searches only that domain first
// (falling back to the full pool if nothing matches).
function ispFindField(hass, entityIds, hints, { preferDomain } = {}) {
  const scoped = preferDomain ? entityIds.filter((id) => id.startsWith(`${preferDomain}.`)) : [];
  const pools = scoped.length ? [scoped, entityIds] : [entityIds];

  for (const pool of pools) {
    for (const eid of pool) {
      const key = hass.entities?.[eid]?.translation_key;
      if (key && hints.includes(key) && hass.states?.[eid]) return eid;
    }
    for (const eid of pool) {
      const objectId = eid.split(".")[1] || "";
      if (hints.some((h) => objectId.includes(h)) && hass.states?.[eid]) return eid;
    }
  }
  return "";
}

// Starlink's "Connected" sensor carries no translation_key, so name/
// suffix matching can't reliably find it - its device_class
// ("connectivity", confirmed in Starlink's own binary_sensor.py) is
// the one guaranteed signal regardless of how HA ends up naming the
// entity.
function ispFindConnected(hass, entityIds) {
  for (const eid of entityIds) {
    if (!eid.startsWith("binary_sensor.")) continue;
    if (hass.states?.[eid]?.attributes?.device_class === "connectivity") return eid;
  }
  return ispFindField(hass, entityIds, ["connected", "connection", "online"], { preferDomain: "binary_sensor" });
}

function scanIspIntegration(hass) {
  if (!hass?.entities) return [];

  const byPlatform = {};
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (ISP_PLATFORMS.includes(entry.platform)) (byPlatform[entry.platform] ||= []).push(entityId);
  }

  const deviceEntityMap = tplinkBuildDeviceEntityMap(hass);
  const services = [];

  for (const platform of ISP_PLATFORMS) {
    for (const group of groupEntitiesByDevice(hass, byPlatform[platform] || [])) {
      const siblings = group.deviceId ? deviceEntityMap[group.deviceId] || [] : group.entityIds;
      const pool = [...new Set([...group.entityIds, ...siblings])];
      const connectedEntity = ispFindConnected(hass, pool);

      services.push({
        deviceId: group.deviceId,
        platform,
        name: group.name || ISP_PLATFORM_LABELS[platform],
        connected: connectedEntity,
        billingTotal: ispFindField(hass, pool, ISP_FIELD_HINTS.billing_total),
        billingRemaining: ispFindField(hass, pool, ISP_FIELD_HINTS.billing_remaining),
        totalDownload: ispFindField(hass, pool, ISP_FIELD_HINTS.total_download),
        totalUpload: ispFindField(hass, pool, ISP_FIELD_HINTS.total_upload)
      });
    }
  }

  return services;
}

// --- AdGuard Home Auto-Discovery (DNS Filtering) --------------------
// Confirmed straight from home-assistant/core's adguard/sensor.py: the
// "queries blocked" sensor has translation_key "dns_queries_blocked"
// (key `blocked_filtering`) - exactly the numeric pill the card's DNS
// Filtering badge is built around. "dns_queries" (total, not blocked)
// is kept as a secondary reference only, never applied automatically -
// the badge is specifically about blocking, so the blocked-count
// sensor is what dns_entity should point at. Grouped by device since a
// setup can run more than one AdGuard Home instance (e.g. a primary
// and a secondary/failover DNS server).
const ADGUARD_PLATFORM = "adguard";

function scanAdGuardIntegration(hass) {
  if (!hass?.entities) return [];

  const entityIds = [];
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform === ADGUARD_PLATFORM) entityIds.push(entityId);
  }

  return groupEntitiesByDevice(hass, entityIds).map((group) => {
    const blocked = group.entityIds.find(
      (id) => hass.entities?.[id]?.translation_key === "dns_queries_blocked" && hass.states?.[id]
    );
    const total = group.entityIds.find(
      (id) => hass.entities?.[id]?.translation_key === "dns_queries" && hass.states?.[id]
    );
    return {
      deviceId: group.deviceId,
      name: group.name || "AdGuard Home",
      entity: blocked || "",
      totalQueries: total || ""
    };
  });
}

// --- Proxmox VE Auto-Discovery (Homelab node) ------------------------
// Confirmed straight from home-assistant/core's proxmoxve/entity.py:
// every Node, VM, Container, and Storage gets its own HA device, and
// EVERY one of them exposes an identically-named "status" binary_sensor
// (translation_key "status") - so translation_key alone can't tell them
// apart. What does: VM/Container/Storage devices all set `model` to
// exactly "VM"/"Container"/"Storage" in their device_info, while the
// physical/cluster Node's own device does not - so "status" entities
// whose device model ISN'T one of those three are Node candidates.
// VM/Container devices additionally carry `via_device_id` pointing at
// their parent Node's device, so a discovered Node's own VMs/
// Containers can be attached as its containers[] automatically, rather
// than requiring a second separate scan.
const PROXMOX_PLATFORM = "proxmoxve";

function scanProxmoxIntegration(hass) {
  if (!hass?.entities || !hass?.devices) return [];

  const nodeCandidates = [];
  const containersByParent = {};

  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform !== PROXMOX_PLATFORM) continue;
    if (!entityId.startsWith("binary_sensor.") || entry.translation_key !== "status") continue;
    if (!hass.states?.[entityId]) continue;

    const deviceId = entry.device_id;
    if (!deviceId) continue;
    const device = hass.devices[deviceId];
    const model = device?.model;
    const name = device?.name_by_user || device?.name || "";

    if (model === "VM" || model === "Container") {
      const parentId = device?.via_device_id;
      (containersByParent[parentId] ||= []).push({ entity: entityId, name, kind: model });
    } else if (model !== "Storage") {
      nodeCandidates.push({ deviceId, entity: entityId, name });
    }
  }

  return nodeCandidates.map((n) => ({ ...n, containers: containersByParent[n.deviceId] || [] }));
}

// --- Portainer Auto-Discovery (Containers/VMs badges) ----------------
// Confirmed straight from home-assistant/core's portainer/entity.py:
// Portainer devices set `model` to "Endpoint" (a Docker host), "Stack"
// (a docker-compose stack), "Container", or "Volume". Only "Container"
// devices are surfaced here - Portainer's containers are attached to
// an EXISTING Homelab node the person picks (a node discovered via
// Proxmox, or a plain Docker host added by hand), rather than this
// scan creating a node of its own the way Proxmox's does, since an
// "Endpoint" on its own doesn't carry the same host-identity signal a
// Proxmox physical/cluster Node does.
const PORTAINER_PLATFORM = "portainer";

function scanPortainerContainers(hass) {
  if (!hass?.entities || !hass?.devices) return [];

  const containers = [];
  for (const [entityId, entry] of Object.entries(hass.entities)) {
    if (entry.platform !== PORTAINER_PLATFORM) continue;
    if (!entityId.startsWith("binary_sensor.") || entry.translation_key !== "status") continue;
    if (!hass.states?.[entityId]) continue;

    const deviceId = entry.device_id;
    if (!deviceId) continue;
    const device = hass.devices[deviceId];
    if (device?.model !== "Container") continue;

    containers.push({
      deviceId,
      entity: entityId,
      name: device?.name_by_user || device?.name || ""
    });
  }
  return containers;
}

// --- OpenWrt (LuCI) Auto-Discovery (Router + Clients) ----------------
// Confirmed straight from home-assistant/core's luci/device_tracker.py:
// this integration ONLY ever creates per-client device_tracker
// entities (no device_info at all, so they're deviceless) - there's no
// separate "router status"/"gateway" entity of its own. Any one of its
// client trackers still works as a genuine router-reachability proxy
// though: they're all CoordinatorEntity-based, so HA marks every one
// of them "unavailable" together the instant the router itself can't
// be reached, regardless of whether that specific client happens to be
// connected - exactly the signal isEntityUnavailable already reads
// everywhere else in this card. A currently-connected ("home") tracker
// is preferred only for a nicer-looking default state, not because it
// works any better as a proxy.
const LUCI_PLATFORM = "luci";

function scanOpenWrtIntegration(hass) {
  if (!hass?.entities) return { routerCandidate: null, clients: [] };

  const trackers = Object.keys(hass.entities).filter(
    (id) => hass.entities[id].platform === LUCI_PLATFORM && id.startsWith("device_tracker.") && hass.states?.[id]
  );
  if (!trackers.length) return { routerCandidate: null, clients: [] };

  const proxyEntity = trackers.find((id) => hass.states[id].state === "home") || trackers[0];

  return {
    routerCandidate: { entity: proxyEntity, name: "OpenWrt Router (via LuCI)", source: "luci" },
    clients: trackers.map((id) => ({
      entity: id,
      name: hass.states[id]?.attributes?.friendly_name || id,
      source: "luci"
    }))
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

// Sums PoE draw for a switch. "auto" walks hass.entities for every
// entity sharing the switch's device_id, matching on unit_of_measurement
// "W" plus "poe" appearing in the entity_id or friendly_name - this
// covers per-port PoE sensors (e.g. UniFi Insights) without the user
// listing every port. "manual" sums exactly the configured entities.
// Returns null (not 0) when there's nothing to show, so the caller can
// hide the badge entirely rather than rendering "0 W".
function computePoeTotal(hass, switchEntityId, poeConfig) {
  if (!poeConfig || poeConfig.mode === "off") return null;

  let entityIds = [];

  if (poeConfig.mode === "manual") {
    entityIds = (poeConfig.manual_entities || []).filter(Boolean);
  } else {
    if (!hass?.entities || !switchEntityId) return null;
    const deviceId = hass.entities[switchEntityId]?.device_id;
    if (!deviceId) return null;
    // Derive each candidate's entity_id from the hass.entities
    // dictionary KEY, not from an `entity_id` field on the value -
    // that field isn't guaranteed to exist on every registry entry
    // shape, and relying on it silently produced an empty match list
    // (and therefore a permanently missing badge) in testing. The key
    // is correct by definition regardless of the value's own shape.
    entityIds = Object.entries(hass.entities)
      .filter(([, e]) => e.device_id === deviceId)
      .map(([id]) => id)
      .filter((id) => {
        const state = hass.states[id];
        if (!state || state.attributes?.unit_of_measurement !== "W") return false;
        const haystack = `${id} ${state.attributes?.friendly_name || ""}`.toLowerCase();
        return haystack.includes("poe");
      });
  }

  if (!entityIds.length) return null;

  let total = 0;
  let hasValue = false;
  for (const id of entityIds) {
    const val = parseFloat(hass.states[id]?.state);
    if (isNaN(val)) continue;
    total += val;
    hasValue = true;
  }
  return hasValue ? total : null;
}

// Picks the PoE badge background: a fixed color, or the first
// ascending threshold whose up_to the total sits at or under. The
// last entry (no up_to) is the catch-all above every configured
// threshold.
// Sums PoE across every switch actually shown on the card - the
// top-level Switch (if configured) plus every Node-level Switch -
// using each switch's own `poe` config exactly as its individual
// badge would. Only switches that would actually show a badge
// (computePoeTotal returns non-null) contribute, matching "sum of the
// PoE badges shown in the diagram" rather than every switch that
// merely exists.
function computeDiagramPoeTotal(hass, config) {
  const switches = [];
  // Gate on the switch existing and having PoE enabled - NOT on its
  // own status `entity` being set. Manual-mode PoE sums a fixed list
  // of sensors and never touches the switch's own entity at all, so a
  // switch used purely to attach PoE entities (with no status entity
  // configured) is entirely valid and must still be included here,
  // exactly as its individual badge already treats it.
  if (config.switch?.poe && config.switch.poe.mode !== "off") switches.push(config.switch);
  if (config.router?.poe && config.router.poe.mode !== "off") switches.push(config.router);
  (config.nodes || []).forEach((node) => {
    if (node.switch?.poe && node.switch.poe.mode !== "off") switches.push(node.switch);
    if (node.homelab?.poe && node.homelab.poe.mode !== "off") switches.push(node.homelab);
    (node.access_points || []).forEach((ap) => {
      if (ap.poe && ap.poe.mode !== "off") switches.push(ap);
    });
    (node.fed_switches || []).forEach((sw) => {
      if (sw.poe && sw.poe.mode !== "off") switches.push(sw);
    });
  });

  let total = 0;
  let hasValue = false;
  for (const sw of switches) {
    const t = computePoeTotal(hass, sw.entity, sw.poe);
    if (t != null) {
      total += t;
      hasValue = true;
    }
  }
  return hasValue ? total : null;
}

function resolvePoeColor(total, poeConfig) {
  if (poeConfig.color_mode !== "threshold") {
    return poeConfig.color || "var(--orange-color)";
  }
  const thresholds = poeConfig.thresholds || [];
  for (const t of thresholds) {
    if (t.up_to == null || total <= t.up_to) return t.color;
  }
  return thresholds[thresholds.length - 1]?.color || "var(--orange-color)";
}

// True when the total has exceeded every explicit up_to in the
// threshold list - i.e. it landed in the open-ended catch-all tier
// rather than being capped by a defined threshold. Only meaningful in
// "threshold" color mode; a cleared (null) up_to on a middle tier is
// simply excluded from the comparison rather than short-circuiting it.
function isAbovePoeTopThreshold(total, poeConfig) {
  if (!poeConfig || poeConfig.color_mode !== "threshold" || total == null) return false;
  const upTos = (poeConfig.thresholds || [])
    .map((t) => t.up_to)
    .filter((v) => v != null);
  if (!upTos.length) return false;
  return total > Math.max(...upTos);
}

// Builds the inline position style for a corner badge (Primary AP,
// VPN, Firewall, PoE), given its configured corner and how many other
// badges are already stacked in that same corner on this circle.
// stackIndex 0 sits at the normal corner position; each subsequent
// index shifts further along the circle's edge (horizontally) by
// roughly half the badge's own size, so multiple badges in the same
// corner overlap partially rather than sitting exactly on top of each
// other or fully separating into a different corner.
function badgeCornerStyle(location, stackIndex, sizePx) {
  const loc = location || "top-right";
  const vertical = loc.startsWith("bottom") ? "bottom" : "top";
  const horizontal = loc.endsWith("left") ? "left" : "right";
  const vSign = vertical === "top" ? -1 : 1;
  const hSign = horizontal === "left" ? -1 : 1;
  const shiftPx = stackIndex * Math.round((sizePx || 18) * 0.55) * hSign;
  return `position:absolute; ${vertical}:15%; ${horizontal}:8%; transform:translate(${hSign * 50}%, ${vSign * 50}%) translateX(${shiftPx}px); z-index:${3 + stackIndex};`;
}

// Positions an IP-address badge centered directly above or below its
// circle - unlike every other badge in this card (PoE, DNS, VPN,
// Firewall, Container, Primary AP star), which anchor to a CORNER via
// badgeCornerStyle and can overlap each other. IP badges never share
// space with those corner badges since they float outside the circle
// entirely, so no stacking logic is needed here.
function centeredBadgeStyle(position) {
  const gap = 4;
  const edge = position === "above" ? "bottom" : "top";
  return `position:absolute; ${edge}:calc(100% + ${gap}px); left:50%; transform:translateX(-50%); z-index:3; white-space:nowrap;`;
}

// Given a list of { key, location, visible } entries for the badges
// that could appear on one circle, returns { key: stackIndex } for
// every visible one - counting only the OTHER visible badges sharing
// the same corner that come before it in the array, so the first
// badge in a corner stays at stackIndex 0 (normal position) and later
// ones fan outward from there.
function computeBadgeStacks(items) {
  const counts = {};
  const result = {};
  items.forEach((item) => {
    if (!item.visible) return;
    const idx = counts[item.location] || 0;
    result[item.key] = idx;
    counts[item.location] = idx + 1;
  });
  return result;
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
    const migrated = migrateAccessPointsToNodes(config);
    const merged = deepMerge(DEFAULT_CONFIG, migrated);
    merged.nodes = (migrated.nodes || []).map((node) => {
      const mergedNode = deepMerge(DEFAULT_NODE, node);
      mergedNode.switch = node.switch ? deepMerge(DEFAULT_NODE_SWITCH, node.switch) : null;
      mergedNode.homelab = node.homelab ? deepMerge(DEFAULT_HOMELAB, node.homelab) : null;
      if (mergedNode.homelab) {
        mergedNode.homelab.containers = (node.homelab?.containers || []).map((c) =>
          deepMerge(DEFAULT_CONTAINER_BADGE, c)
        );
      }
      mergedNode.access_points = (node.access_points || []).map((ap) =>
        deepMerge(DEFAULT_ACCESS_POINT, ap)
      );
      mergedNode.fed_switches = (node.fed_switches || []).map((sw) =>
        deepMerge(DEFAULT_NODE_SWITCH, sw)
      );
      return mergedNode;
    });
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

    // .vline/.vline-offline/.offline-x-mid are thin (~2px) - their own
    // left edge is effectively their center, so it's used directly.
    // .ap-col-fillline-wrap (the Primary AP's own extra devices column)
    // and, in fallback mode, .bus-top-connector itself are full-width
    // containers whose actual dotted/solid line sits centered inside -
    // for these, the midpoint is used instead of the raw edge.
    const isWideWrapper = (el) =>
      el.classList.contains("ap-col-fillline-wrap") || el.classList.contains("bus-top-connector");

    let candidates = Array.from(
      branches.querySelectorAll(".bus-top-connector .vline, .bus-top-connector .vline-offline, .bus-top-connector .offline-x-mid, .ap-col-fillline-wrap")
    );
    if (candidates.length < 2) {
      candidates = Array.from(
        branches.querySelectorAll(".bus-top-connector, .ap-col-fillline-wrap")
      );
    }
    if (candidates.length < 2) return;

    const refs = candidates.map((el) => {
      const rect = el.getBoundingClientRect();
      const wide = isWideWrapper(el);
      const center = rect.left + rect.width / 2;
      return {
        refLeft: wide ? center : rect.left,
        refRight: wide ? center : rect.left + rect.width,
        center
      };
    });
    const leftMost = refs.reduce((a, b) => (a.refLeft < b.refLeft ? a : b));
    const rightMost = refs.reduce((a, b) => (a.refRight > b.refRight ? a : b));

    const leftMargin = Math.max(0, leftMost.refLeft - branchesRect.left);
    const rightMargin = Math.max(0, branchesRect.right - rightMost.refRight);
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
      const leftColCenter = leftMost.center;
      const rightColCenter = rightMost.center;
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
  // Primary AP star badge - shared by both the tiered-layout Primary
  // AP circle and the flat-layout AP-row rendering, which previously
  // duplicated this markup inline in two places.
  _renderPrimaryApBadge(ap, stackIndex = 0) {
    if (ap.show_primary_badge === false) return null;
    const cfg = this._config;
    const size = cfg.badge_size ?? 18;
    const posStyle = badgeCornerStyle(ap.primary_badge_location, stackIndex, size);
    return html`<div
      class="primary-ap-badge"
      style="${posStyle} background:${ap.colors.primary_badge ?? 'var(--orange-color)'}; color:${ap.colors.primary_badge_icon ?? 'var(--card-background-color)'}; border:2px solid ${ap.colors.primary_badge_border ?? 'transparent'}; width:${size}px; height:${size}px;"
    >
      <ha-icon icon="${cfg.primary_badge_icon || 'mdi:star'}" style="--mdc-icon-size:${cfg.badge_icon_size ?? 12}px"></ha-icon>
    </div>`;
  }

  _renderVpnBadge(hass, entityId, stackIndex = 0) {
    if (!entityId) return null;
    const cfg = this._config;
    const vpnOn = isVpnActive(hass, entityId);
    const bg = vpnOn ? (cfg.vpn_badge_color ?? 'var(--blue-color)') : (cfg.vpn_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
    const iconColor = vpnOn ? (cfg.vpn_badge_icon_color ?? 'var(--card-background-color)') : (cfg.vpn_badge_offline_icon_color ?? 'var(--card-background-color)');
    const borderColor = vpnOn ? (cfg.vpn_badge_border_color ?? 'transparent') : (cfg.vpn_badge_offline_border_color ?? 'transparent');
    const flashClass = !vpnOn && cfg.vpn_animate_offline ? "vpn-badge-flash" : "";
    const size = cfg.badge_size ?? 18;
    const posStyle = badgeCornerStyle(cfg.vpn_badge_location, stackIndex, size);
    // When a Connected Peers entity is configured and has a numeric
    // reading, the badge widens into a pill showing the icon plus that
    // count, instead of staying a plain icon-only circle.
    const peersState = cfg.vpn_peers_entity ? getEntityState(hass, cfg.vpn_peers_entity) : null;
    const showPeers = peersState && peersState.value != null;
    const shapeStyle = showPeers
      ? `border-radius:${Math.round(size / 2)}px; padding:0 ${Math.round(size * 0.28)}px; gap:${Math.round(size * 0.2)}px;`
      : `border-radius:50%; width:${size}px;`;
    return html`<div
      class="vpn-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; height:${size}px; ${shapeStyle}"
    >
      <ha-icon icon="${cfg.vpn_badge_icon || 'mdi:vpn'}" style="--mdc-icon-size:${cfg.badge_icon_size ?? 12}px"></ha-icon>
      ${showPeers ? html`<span style="font-size:${Math.round(size * 0.55)}px; font-weight:600; line-height:1; font-family:inherit;">${roundVal(peersState.value)}</span>` : null}
    </div>`;
  }

  _renderFirewallBadge(hass, entityId, stackIndex = 0) {
    if (!entityId) return null;
    const cfg = this._config;
    const fwOn = isVpnActive(hass, entityId);
    const bg = fwOn ? (cfg.firewall_badge_color ?? 'var(--orange-color)') : (cfg.firewall_badge_offline_color ?? 'var(--disabled-text-color, #bdbdbd)');
    const iconColor = fwOn ? (cfg.firewall_badge_icon_color ?? 'var(--card-background-color)') : (cfg.firewall_badge_offline_icon_color ?? 'var(--card-background-color)');
    const borderColor = fwOn ? (cfg.firewall_badge_border_color ?? 'transparent') : (cfg.firewall_badge_offline_border_color ?? 'transparent');
    const flashClass = !fwOn && cfg.firewall_animate_offline ? "firewall-badge-flash" : "";
    const size = cfg.badge_size ?? 18;
    const posStyle = badgeCornerStyle(cfg.firewall_badge_location, stackIndex, size);
    return html`<div
      class="firewall-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; width:${size}px; height:${size}px;"
    >
      <ha-icon icon="${cfg.firewall_badge_icon || 'mdi:wall-fire'}" style="--mdc-icon-size:${cfg.badge_icon_size ?? 12}px"></ha-icon>
    </div>`;
  }

  // PoE badge - shows a summed wattage value (no icon) top-right on a
  // switch circle. Works for both the top-level Switch and any
  // node-level Switch, since both share the same `poe` config shape.
  // Hides itself entirely when computePoeTotal has nothing to show,
  // so a switch with no PoE-capable ports (or no PoE sensors enabled)
  // renders exactly as it did before this feature existed.
  _renderPoeBadge(hass, switchEntityId, poeConfig, stackIndex = 0) {
    if (!poeConfig) return null;
    const total = computePoeTotal(hass, switchEntityId, poeConfig);
    if (total == null) return null;
    const bg = resolvePoeColor(total, poeConfig);
    const textColor = poeConfig.text_color || "var(--card-background-color)";
    const badgeSize = this._config.poe_badge_size ?? 16;
    const fontSize = this._config.poe_badge_font_size ?? 9;
    const hPad = Math.round(badgeSize * 0.35);
    const flashClass =
      poeConfig.animate_over_threshold && isAbovePoeTopThreshold(total, poeConfig)
        ? "poe-badge-flash"
        : "";
    const posStyle = badgeCornerStyle(poeConfig.location, stackIndex, badgeSize);
    return html`<div
      class="poe-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${textColor}; height:${badgeSize}px; line-height:${badgeSize}px; padding:0 ${hPad}px; gap:${Math.round(badgeSize * 0.2)}px; border-radius:${Math.round(badgeSize / 2)}px; font-size:${fontSize}px;"
    >
      <ha-icon icon="${poeConfig.icon || 'mdi:lightning-bolt'}" style="--mdc-icon-size:${fontSize}px; color:${textColor};"></ha-icon>
      <span>${roundVal(total)}${poeConfig.unit || "W"}</span>
    </div>`;
  }

  // IP Address badge - a small pill showing a plain IP address string,
  // gated globally by Advanced > Layout > Show IP Addressing. Unlike
  // every other badge it's centered directly above or below its
  // circle rather than anchored to a corner (see centeredBadgeStyle),
  // and per the ask it's sized identically to the PoE badge
  // (poe_badge_size/poe_badge_font_size) rather than the general
  // badge_size/badge_icon_size the other status badges share.
  // `ownerCfg` is whichever config object (router or an access point)
  // owns the ip_badge_color/ip_badge_icon_color fields for this badge.
  _renderIpBadge(hass, entityId, position, ownerCfg) {
    if (!this._config.show_ip_addressing) return null;
    if (!entityId) return null;
    const stateObj = hass?.states?.[entityId];
    if (!stateObj) return null;
    // Some integrations (e.g. TP-Link Deco) report the address as an
    // `ip`/`ip_address` attribute on a device_tracker entity whose
    // actual state is home/not_home, rather than as a dedicated
    // sensor whose state IS the address (e.g. TP-Link Router's WAN/LAN
    // IPv4 sensors) - check attributes first, then fall back to state.
    const value = stateObj.attributes?.ip ?? stateObj.attributes?.ip_address ?? stateObj.state;
    if (!value || value === "unknown" || value === "unavailable") return null;

    const badgeSize = this._config.poe_badge_size ?? 16;
    const fontSize = this._config.poe_badge_font_size ?? 9;
    const hPad = Math.round(badgeSize * 0.35);
    const bg = ownerCfg?.ip_badge_color || "var(--blue-color)";
    const textColor = ownerCfg?.ip_badge_icon_color || "var(--card-background-color)";
    const posStyle = centeredBadgeStyle(position);

    return html`<div
      class="poe-badge"
      style="${posStyle} background:${bg}; color:${textColor}; height:${badgeSize}px; line-height:${badgeSize}px; padding:0 ${hPad}px; gap:${Math.round(badgeSize * 0.2)}px; border-radius:${Math.round(badgeSize / 2)}px; font-size:${fontSize}px;"
    >
      <ha-icon icon="mdi:ip-network" style="--mdc-icon-size:${fontSize}px; color:${textColor};"></ha-icon>
      <span>${value}</span>
    </div>`;
  }

  // DNS Filtering badge (e.g. Pi-hole/AdGuard Home queries blocked) -
  // a global Security element like VPN/Firewall, targetable at Router,
  // Primary AP, Homelab, or the main Switch. Shares PoE's coloring
  // helpers (resolvePoeColor / isAbovePoeTopThreshold work on any
  // {color_mode, thresholds, color} shape) and its .poe-badge pill
  // styling, since both are "a single number in a small pill" badges.
  // DNS Filtering badge. Supports two entity shapes:
  // - A numeric sensor (e.g. queries blocked, block %) - renders as an
  //   icon+value pill with the usual single/threshold coloring.
  // - A binary_sensor or switch (e.g. "protection enabled") - renders
  //   as an icon-only status badge (active/offline colors), matching
  //   the VPN/Firewall/Reverse Proxy pattern, since there's no number
  //   to show for those domains.
  // Which shape applies is detected automatically from whether the
  // entity's state actually parses as a number, not from a config
  // toggle - so switching entities never requires reconfiguring mode.
  _renderDnsBadge(hass, stackIndex = 0) {
    const cfg = this._config;
    if (!cfg.dns_entity) return null;
    const stateObj = hass?.states?.[cfg.dns_entity];
    if (!stateObj) return null;
    const numeric = getEntityState(hass, cfg.dns_entity);
    const isNumeric = numeric && numeric.value != null;
    // Sized off the same Badge Size / Badge Icon Size sliders every
    // other badge (VPN, Firewall, Primary AP, Reverse Proxy,
    // Container) uses, rather than PoE's own separate pair - so
    // adjusting one slider keeps every badge on the diagram in sync,
    // DNS included.
    const badgeSize = cfg.badge_size ?? 18;
    const iconSize = cfg.badge_icon_size ?? 12;
    const fontSize = Math.round(badgeSize * 0.55);
    const textColor = cfg.dns_text_color || "var(--card-background-color)";
    const posStyle = badgeCornerStyle(cfg.dns_badge_location, stackIndex, badgeSize);

    if (isNumeric) {
      const val = numeric.value;
      const thresholdCfg = { color_mode: cfg.dns_color_mode, thresholds: cfg.dns_thresholds, color: cfg.dns_badge_color };
      const bg = cfg.dns_color_mode === "threshold" ? resolvePoeColor(val, thresholdCfg) : (cfg.dns_badge_color || "var(--blue-color)");
      const hPad = Math.round(badgeSize * 0.35);
      const flashClass =
        cfg.dns_animate_over_threshold && isAbovePoeTopThreshold(val, thresholdCfg) ? "poe-badge-flash" : "";
      return html`<div
        class="poe-badge ${flashClass}"
        style="${posStyle} background:${bg}; color:${textColor}; height:${badgeSize}px; line-height:${badgeSize}px; padding:0 ${hPad}px; gap:${Math.round(badgeSize * 0.2)}px; border-radius:${Math.round(badgeSize / 2)}px; font-size:${fontSize}px;"
      >
        <ha-icon icon="${cfg.dns_badge_icon || 'mdi:shield-check'}" style="--mdc-icon-size:${iconSize}px; color:${textColor};"></ha-icon>
        <span>${roundVal(val)}${cfg.dns_unit || ""}</span>
      </div>`;
    }

    // Binary status fallback - on/off from a binary_sensor or switch.
    const isOn = !isEntityUnavailable(hass, cfg.dns_entity) && String(stateObj.state).toLowerCase() !== "off";
    const bg = isOn ? (cfg.dns_badge_color || "var(--blue-color)") : (cfg.dns_badge_offline_color || "var(--disabled-text-color, #bdbdbd)");
    return html`<div
      class="poe-badge"
      style="${posStyle} background:${bg}; color:${textColor}; width:${badgeSize}px; height:${badgeSize}px; border-radius:50%;"
    >
      <ha-icon icon="${cfg.dns_badge_icon || 'mdi:shield-check'}" style="--mdc-icon-size:${iconSize}px; color:${textColor};"></ha-icon>
    </div>`;
  }

  // Reverse Proxy status badge - a global Security element shaped
  // exactly like VPN/Firewall (active/offline icon badge), targetable
  // at Router, Primary AP, Homelab, or the main Switch.
  _renderReverseProxyBadge(hass, stackIndex = 0) {
    const cfg = this._config;
    if (!cfg.reverse_proxy_entity) return null;
    const state = hass?.states?.[cfg.reverse_proxy_entity];
    if (!state) return null;
    const isUp = !isEntityUnavailable(hass, cfg.reverse_proxy_entity) && String(state.state).toLowerCase() !== "off";
    const bg = isUp ? (cfg.reverse_proxy_badge_color ?? "var(--green-color)") : (cfg.reverse_proxy_badge_offline_color ?? "var(--disabled-text-color, #bdbdbd)");
    const iconColor = isUp ? (cfg.reverse_proxy_badge_icon_color ?? "var(--card-background-color)") : (cfg.reverse_proxy_badge_offline_icon_color ?? "var(--card-background-color)");
    const borderColor = isUp ? (cfg.reverse_proxy_badge_border_color ?? "transparent") : (cfg.reverse_proxy_badge_offline_border_color ?? "transparent");
    const flashClass = !isUp && cfg.reverse_proxy_animate_offline ? "vpn-badge-flash" : "";
    const size = cfg.badge_size ?? 18;
    const posStyle = badgeCornerStyle(cfg.reverse_proxy_badge_location, stackIndex, size);
    return html`<div
      class="vpn-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; width:${size}px; height:${size}px;"
    >
      <ha-icon icon="${cfg.reverse_proxy_badge_icon || 'mdi:server-network'}" style="--mdc-icon-size:${cfg.badge_icon_size ?? 12}px"></ha-icon>
    </div>`;
  }

  // A single container/VM status badge on a Homelab node. Shaped like
  // VPN/Firewall (active/offline icon badge) but per-item, since a
  // Homelab node can carry any number of these (one per tracked
  // container/VM), each independently positioned and stacking with
  // everything else on that circle.
  _renderContainerBadge(hass, containerCfg, stackIndex = 0) {
    if (!containerCfg || !containerCfg.entity) return null;
    const state = hass?.states?.[containerCfg.entity];
    if (!state) return null;
    const isUp = !isEntityUnavailable(hass, containerCfg.entity) && String(state.state).toLowerCase() !== "off";
    const bg = isUp ? (containerCfg.color ?? "var(--green-color)") : (containerCfg.offline_color ?? "var(--disabled-text-color, #bdbdbd)");
    const iconColor = isUp ? (containerCfg.icon_color ?? "var(--card-background-color)") : (containerCfg.offline_icon_color ?? "var(--card-background-color)");
    const borderColor = isUp ? (containerCfg.border_color ?? "transparent") : (containerCfg.offline_border_color ?? "transparent");
    const flashClass = !isUp && containerCfg.animate_offline ? "vpn-badge-flash" : "";
    const size = this._config.badge_size ?? 18;
    const posStyle = badgeCornerStyle(containerCfg.location, stackIndex, size);
    return html`<div
      class="vpn-badge ${flashClass}"
      style="${posStyle} background:${bg}; color:${iconColor}; border:2px solid ${borderColor}; width:${size}px; height:${size}px;"
    >
      <ha-icon icon="${containerCfg.icon || 'mdi:docker'}" style="--mdc-icon-size:${this._config.badge_icon_size ?? 12}px"></ha-icon>
    </div>`;
  }

  // Guest-network badge for Clients - a transparent-background
  // icon (not a filled circle like the other badges) shown top-right
  // when the device's own entity attributes mark it as being on a
  // guest network. Icon, color, and size are global settings under
  // Clients / Advanced, applying uniformly to every device
  // rather than being configured per-device. Only shown while the
  // device is online - an offline device's last-known guest status
  // isn't necessarily still accurate, so the badge hides along with it.
  _renderGuestBadge(hass, entityId, online) {
    if (!online) return null;
    if (!isGuestDevice(hass, entityId)) return null;
    const icon = this._config.individual_device_guest_icon || "mdi:account-question";
    const color = this._config.individual_device_guest_icon_color || "var(--secondary-text-color)";
    const bg = this._config.individual_device_guest_icon_bg || "transparent";
    const size = this._config.individual_device_guest_icon_size ?? 16;
    // Container size is independently configurable (Advanced -> Sizes)
    // rather than derived from the icon size, so the badge and its
    // icon can be scaled separately - matching how the PoE badge
    // separates Badge Size from Badge Font Size.
    const containerSize = this._config.individual_device_guest_badge_size ?? 24;
    return html`<div
      class="guest-badge"
      style="background:${bg}; width:${containerSize}px; height:${containerSize}px;"
    >
      <ha-icon icon="${icon}" style="color:${color};--mdc-icon-size:${size}px"></ha-icon>
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
    if (key === "poe") {
      const total = computeDiagramPoeTotal(hass, config);
      if (total == null) return null;
      const bg =
        config.summary_poe_color_mode === "threshold"
          ? resolvePoeColor(total, {
              color_mode: "threshold",
              thresholds: config.summary_poe_thresholds || DEFAULT_POE.thresholds
            })
          : config.summary_poe_color || "var(--orange-color)";
      // Fixed to match every other summary badge's icon color
      // (download/upload/ping/vpn/firewall all use the card background
      // color for contrast against their own colored badge) - not
      // independently configurable, so the summary row stays visually
      // consistent regardless of which PoE threshold color is active.
      const iconColor = "var(--card-background-color)";
      return html`
        <div class="summary-row">
          <div class="summary-badge" style="background:${bg}">
            <ha-icon icon="mdi:lightning-bolt" style="color:${iconColor}"></ha-icon>
          </div>
          <div class="summary-text">
            <div class="summary-primary">PoE</div>
            <div class="summary-secondary">${roundVal(total)}W</div>
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

    // Nodes are the new schema. Rather than forcing every node into an
    // "AP-shaped" adapter, each node now contributes one or more
    // "columns" to the bus - a column is one AP-width slot. A node
    // with a Switch feeding N APs contributes N columns, all sharing
    // the same `switch` reference so the render layer can group them
    // (switchGroupStart marks the first column in that group, which is
    // where the Switch's own circle renders, centered across the
    // group's full span). A Switch-only node (no APs) contributes a
    // single column with `ap: null`. A plain AP node contributes one
    // column with `switch: null`.
    const columns = [];
    (config.nodes || []).forEach((node) => {
      const feedAps = node.access_points || [];
      const feedSwitches = node.fed_switches || [];
      const hasFeedChildren = feedAps.length > 0 || feedSwitches.length > 0;
      if (node.switch && hasFeedChildren) {
        const groupTotal = feedAps.length + feedSwitches.length;
        feedAps.forEach((ap, i) => {
          columns.push({
            ap,
            subSwitch: null,
            switch: node.switch,
            switchGroupStart: i === 0,
            switchGroupSize: groupTotal
          });
        });
        // Fed Switches render in the same row as fed APs, as leaf
        // columns of their own (no further feeding) - solid lines the
        // whole way down through their own Connected Devices circle,
        // exactly like any Switch's output. switchGroupStart only
        // lands here if there were no APs to claim it first, since the
        // parent switch's own circle needs exactly one column
        // responsible for anchoring it regardless of child mix.
        feedSwitches.forEach((sw, i) => {
          columns.push({
            ap: null,
            subSwitch: sw,
            switch: node.switch,
            switchGroupStart: feedAps.length === 0 && i === 0,
            switchGroupSize: groupTotal
          });
        });
      } else if (node.switch) {
        columns.push({ ap: null, subSwitch: null, switch: node.switch, switchGroupStart: true, switchGroupSize: 1 });
      } else if (node.homelab) {
        // A Homelab node reuses the exact same rendering path as a
        // standalone Switch (its own circle, solid unanimated lines
        // the whole way down) - aliased into the `switch` slot with
        // isHomelab set so the badge-rendering step knows to also
        // show DNS/VPN-peers/Reverse-Proxy alongside PoE.
        columns.push({ ap: null, subSwitch: null, switch: node.homelab, switchGroupStart: true, switchGroupSize: 1, isHomelab: true });
      } else {
        (node.access_points || []).forEach((ap) => {
          columns.push({ ap, subSwitch: null, switch: null, switchGroupStart: false, switchGroupSize: 0 });
        });
      }
    });

    const buildApDataEntry = (ap) => {
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
    };
    // apData is the flat list of real APs only (Switch-only columns
    // have no AP, so they're naturally excluded) - used purely for
    // Primary-AP detection, which only ever applies to real APs.
    const apData = columns.filter((c) => c.ap).map((c) => buildApDataEntry(c.ap));

    const primaryApLayout = config.primary_ap_layout || "flat";
    const rawPrimaryApItem = primaryApLayout === "tiered"
      ? apData.find((a) => a.ap.is_primary) || null
      : null;
    // A Primary AP inside a Switch group can't be promoted to Tiered -
    // pulling just that one AP out of its switch's group would break
    // the group structure. Silently behaves as Flat in this case.
    const primaryIsInSwitchGroup = !!rawPrimaryApItem && columns.some(
      (col) => col.ap === rawPrimaryApItem.ap && col.switch
    );
    const primaryApItem = primaryIsInSwitchGroup ? null : rawPrimaryApItem;
    // The Primary AP's own column index within the full, unfiltered
    // columns list - i.e. its position in Node-menu order. Used to
    // reinsert its Clients extra column at that same
    // relative position, rather than always at a fixed spot.
    const primaryOriginalIndex = primaryApItem
      ? columns.findIndex((col) => col.ap === primaryApItem.ap)
      : -1;
    const branchApData = primaryApItem
      ? apData.filter((a) => a !== primaryApItem)
      : apData;
    // The columns actually rendered on the bus - same exclusion as
    // branchApData, just applied to the richer column list.
    const branchColumns = primaryApItem
      ? columns.filter((col) => col.ap !== primaryApItem.ap)
      : columns;
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
                branchColumns.length > 0,
                switchConfig,
                switchEnabled,
                switchEntityState,
                switchDevicesState,
                switchOfflineTop,
                switchDur
              )}
              ${branchColumns.length
                ? this._renderBranches(
                    branchColumns,
                    animate,
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    !!(config.individual_devices && config.individual_devices.length),
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    hass,
                    primaryApItem ? primaryApOffline : (switchEnabled ? (routerOfflineTop || switchOfflineTop) : routerOfflineTop),
                    primaryApItem ? primaryApOfflineColor : (switchEnabled ? switchOfflineColor : routerOfflineColor),
                    primaryApItem ? true : (routerEnabled || switchEnabled),
                    primaryApItem,
                    primaryApLayout,
                    minDur,
                    maxDur,
                    primaryOriginalIndex
                  )
                : null}
            </div>
            ${this._renderIndividualDevices(config.individual_devices, hass, config, animate, minDur, maxDur, branchColumns.length)}
            ${summaryPos === "bottom" ? summaryTemplate : null}
          </div>
        </div>
      </ha-card>
    `;
  }

  // Renders one device's circle (icon, colors, offline state, guest
  // badge) - shared by both the flat (ungrouped) row and each
  // grouped sub-box, so the two layouts stay visually identical.
  _renderIndividualDeviceCircle(dev, hass, config) {
    const online = isDeviceOnline(hass, dev.entity);
    const size = config.individual_device_circle_size ?? 42;
    const circleColor = online
      ? (dev.colors?.circle || "var(--pink-color)")
      : (dev.colors?.offline_circle || dev.colors?.circle || "var(--error-color)");
    const iconColor = online
      ? (dev.colors?.icon || "var(--pink-color)")
      : (dev.colors?.offline_icon || "var(--error-color)");

    const displayName = dev.name || hass?.states?.[dev.entity]?.attributes?.friendly_name || dev.entity || "Device";

    return html`
      <div
        class="circle-wrap"
        style="width:${size}px; height:${size}px; opacity: ${online ? 1 : 0.6}"
        @click=${() => this._handleMoreInfo(dev.entity)}
        title="${displayName}"
      >
        <div class="circle" style="border-color:${circleColor}">
          <ha-icon
            .icon=${dev.icon || "mdi:devices"}
            style="color:${iconColor};--mdc-icon-size:${config.individual_device_icon_size ?? 20}px"
          ></ha-icon>
        </div>
        ${this._renderGuestBadge(hass, dev.entity, online)}
      </div>
    `;
  }

  _renderIndividualDevices(devices, hass, config, animate, minDur, maxDur, apCount) {
    if (!devices || !devices.length) return null;
    const boxColor = config.individual_devices_box_color || "var(--divider-color)";
    const lineColor = config.flow_line_color || "var(--divider-color, #ccc)";
    const needsFallbackConnector = !apCount;
    const groupBy = config.individual_devices_group_by || "none";
    const groups = groupBy !== "none" ? groupIndividualDevices(hass, devices, groupBy) : null;
    const groupLayout = config.individual_devices_group_layout || "widest_fits";
    const maxGroupSize = groups ? Math.max(...groups.map((g) => g.devices.length)) : 0;

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
        <div class="individual-devices-box" style="${groups ? 'padding:8px;' : ''}">
          <svg class="individual-devices-box-border">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              style="rx:${config.individual_devices_box_radius || 'var(--ha-card-border-radius, 12px)'}; ry:${config.individual_devices_box_radius || 'var(--ha-card-border-radius, 12px)'};"
              fill="none"
              stroke="${boxColor}"
              stroke-width="1.5"
              stroke-dasharray="2 4"
            ></rect>
          </svg>
          ${groups
            ? html`
                <div class="individual-devices-groups ${config.individual_devices_group_layout === 'last_fill' ? 'layout-last-fill' : ''}">
                  ${groups.map((group) => {
                    const radius = config.individual_devices_group_box_radius || "var(--ha-card-border-radius, 12px)";
                    const pad = config.individual_devices_group_padding ?? 10;
                    const showBorder = config.individual_devices_group_show_border !== false;
                    const colorOverride = (config.individual_devices_group_colors || []).find(
                      (o) => o.name === group.name
                    );
                    const groupBorderColor = colorOverride?.color || config.individual_devices_group_border_color || boxColor;
                    const flexStyle =
                      groupLayout === "widest_fits"
                        ? (group.devices.length === maxGroupSize ? "flex:0 0 auto;" : "flex:1 1 0;")
                        : "";
                    return html`
                      <div class="individual-device-group" style="padding:${pad}px; gap:${pad}px; ${flexStyle}">
                        ${showBorder
                          ? html`
                              <svg class="individual-devices-box-border">
                                <rect
                                  x="1"
                                  y="1"
                                  width="calc(100% - 2px)"
                                  height="calc(100% - 2px)"
                                  style="rx:${radius}; ry:${radius};"
                                  fill="none"
                                  stroke="${groupBorderColor}"
                                  stroke-width="1.5"
                                  stroke-dasharray="2 4"
                                ></rect>
                              </svg>
                            `
                          : null}
                        <div class="individual-device-group-label">${group.name}</div>
                        <div class="individual-device-group-row">
                          ${group.devices.map((dev) => this._renderIndividualDeviceCircle(dev, hass, config))}
                        </div>
                      </div>
                    `;
                  })}
                </div>
              `
            : html`
                <div class="individual-devices-row">
                  ${devices.map((dev) => this._renderIndividualDeviceCircle(dev, hass, config))}
                </div>
              `}
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
        <ha-icon icon="${icon}" style="--mdc-icon-size:${this._config.backhaul_icon_size ?? 13}px"></ha-icon>
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

  // Same visual as _renderXOnlyVertical, but stretches to fill 100% of
  // its container instead of a fixed pixel height - pairs with
  // _verticalPassThroughLine so that a column going offline doesn't
  // introduce a smaller fixed-height element into a grid row where
  // every other column's content stretches. A fixed height DOES
  // contribute to CSS Grid's auto-row sizing, while stretching content
  // doesn't - so swapping one for the other in an already-established
  // row can shrink that row's computed height for every column in it.
  _renderXOnlyVerticalStretch() {
    return html`
      <div class="vline-pair" style="height:100%; min-height:24px; justify-content:center;">
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
    const heightStyle = typeof height === "string"
      ? `height:${height}; min-height:32px;`
      : `height:${height}px;`;
    return html`
      <div class="vline-pair" style="${heightStyle}">
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
    const heightStyle = typeof height === "string"
      ? `height:${height}; min-height:24px;`
      : `height:${height}px;`;
    return html`
      <div class="vline-single" style="${heightStyle}">
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

  // A vertical pass-through line that stretches to fill 100% of its
  // container's height, rather than a fixed pixel value. Needed for
  // columns where a given layer (Switch or AP) is inactive but the
  // row still has to visually connect through it - since that row's
  // actual rendered height is set by other columns' taller content
  // (e.g. a Switch circle), a fixed-height line would leave a gap.
  _verticalPassThroughLine(color, duration, animate, dashed = false) {
    return html`
      <div class="vline-single" style="height:100%; min-height:28px;">
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
            ${routerEnabled && router.entities.wan_ip
              ? this._renderIpBadge(hass, router.entities.wan_ip, "below", router)
              : primaryApItem && primaryApItem.ap.entities.wan_ip
              ? this._renderIpBadge(hass, primaryApItem.ap.entities.wan_ip, "below", primaryApItem.ap)
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
          ${(() => {
            const vpnVisible = this._config.vpn_target === "router" && !!this._config.vpn_entity;
            const fwVisible = this._config.firewall_target === "router" && !!this._config.firewall_entity;
            const dnsVisible = this._config.dns_target === "router" && !!this._config.dns_entity;
            const rpVisible = this._config.reverse_proxy_target === "router" && !!this._config.reverse_proxy_entity;
            const poeVisible = computePoeTotal(hass, router.entity, router.poe) != null;
            const stacks = computeBadgeStacks([
              { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
              { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
              { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
              { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible },
              { key: "poe", location: router.poe?.location, visible: poeVisible }
            ]);
            return html`
              ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
              ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
              ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
              ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
              ${this._renderPoeBadge(hass, router.entity, router.poe, stacks.poe || 0)}
              ${this._renderIpBadge(hass, router.entities.lan_ip, "below", router)}
            `;
          })()}
          ${lan.entity
            ? html`
                <div class="lan-branch ${summaryPos === "right" ? "flip-left" : ""}">
                  ${routerOffline
                    ? this._renderXOnlyHorizontal(28)
                    : this._horizontalSingleLine(this._config.flow_line_color || "var(--divider-color, #ccc)", lanDur, animate, 28, summaryPos === "right")}
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
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
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
                ${(() => {
                  const vpnVisible = this._config.vpn_target === "switch" && !!this._config.vpn_entity;
                  const fwVisible = this._config.firewall_target === "switch" && !!this._config.firewall_entity;
                  const dnsVisible = this._config.dns_target === "switch" && !!this._config.dns_entity;
                  const rpVisible = this._config.reverse_proxy_target === "switch" && !!this._config.reverse_proxy_entity;
                  const poeVisible = computePoeTotal(hass, switchConfig.entity, switchConfig.poe) != null;
                  const stacks = computeBadgeStacks([
                    { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
                    { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
                    { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
                    { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible },
                    { key: "poe", location: switchConfig.poe?.location, visible: poeVisible }
                  ]);
                  return html`
                    ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
                    ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
                    ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
                    ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
                    ${this._renderPoeBadge(hass, switchConfig.entity, switchConfig.poe, stacks.poe || 0)}
                  `;
                })()}
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
                            : this._horizontalSingleLine(this._config.flow_line_color || "var(--divider-color, #ccc)", switchDur, animate, 28, summaryPos === "right")}
                          <div
                            class="circle-wrap"
                            style="width:${this._config.ap_devices_circle_size ?? 56}px; height:${this._config.ap_devices_circle_size ?? 56}px; opacity:${swDevOffline ? 0.6 : 1};"
                            @click=${(e) => {
                              e.stopPropagation();
                              this._handleMoreInfo(switchConfig.entities.connected_devices);
                            }}
                          >
                            <div class="circle ${swDevOffline ? "circle-pulse" : ""}" style="border-color:${swDevCircleColor}; --pulse-color:${swDevCircleColor};">
                              <ha-icon class="${swDevOffline ? "icon-pulse" : ""}" .icon=${swDevOffline ? "mdi:exclamation-thick" : (switchConfig.devices_icon || "mdi:devices")} style="color:${swDevIconColor};--mdc-icon-size:${this._config.ap_devices_icon_size ?? 20}px"></ha-icon>
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
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
                    primaryApItem.dlDur,
                    primaryApItem.ulDur,
                    animate,
                    32
                  )
                : this._verticalSingleLine(
                    this._config.flow_line_color || "var(--divider-color, #ccc)",
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
                ${(() => {
                  const ap = primaryApItem.ap;
                  const vpnVisible = this._config.vpn_target === "primary_ap" && !!this._config.vpn_entity;
                  const fwVisible = this._config.firewall_target === "primary_ap" && !!this._config.firewall_entity;
                  const dnsVisible = this._config.dns_target === "primary_ap" && !!this._config.dns_entity;
                  const rpVisible = this._config.reverse_proxy_target === "primary_ap" && !!this._config.reverse_proxy_entity;
                  const stacks = computeBadgeStacks([
                    { key: "primary", location: ap.primary_badge_location, visible: ap.show_primary_badge !== false },
                    { key: "poe", location: ap.poe?.location, visible: computePoeTotal(hass, ap.entity, ap.poe) != null },
                    { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
                    { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
                    { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
                    { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible }
                  ]);
                  return html`
                    ${this._renderPrimaryApBadge(ap, stacks.primary || 0)}
                    ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
                    ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
                    ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
                    ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
                    ${this._renderPoeBadge(hass, ap.entity, ap.poe, stacks.poe || 0)}
                    ${this._renderIpBadge(hass, ap.entities.ip_address, "above", ap)}
                  `;
                })()}
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
                        this._config.flow_line_color || "var(--divider-color, #ccc)",
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

  _renderBranches(columns, animate, busLineColor, hasIndividualDevices, individualDevicesLineColor, hass, routerOffline, routerOfflineColor, routerEnabled, primaryApItem, primaryApLayout, minDur, maxDur, primaryOriginalIndex = -1) {
    const count = columns.length;
    const primaryHasDevices = !!(primaryApItem && primaryApItem.hasDevices);
    const showPrimaryExtraCol = !!primaryApItem && (primaryHasDevices || hasIndividualDevices);
    const totalCols = count + (showPrimaryExtraCol ? 1 : 0);
    const extraCol = showPrimaryExtraCol ? Math.max(0, primaryOriginalIndex) + 1 : null;
    const apCol = (i) => {
      if (!showPrimaryExtraCol) return i + 1;
      return i < primaryOriginalIndex ? (i + 1) : (i + 2);
    };
    const collapseTbar = count === 1 && !showPrimaryExtraCol;
    const hideApOwnLine = !routerEnabled && count === 1 && !showPrimaryExtraCol;

    // Three independent layers - Switch, AP, Devices - each spans two
    // grid rows (its own connecting line, then its own circle row).
    // A layer collapses to 0px entirely when nothing in the whole bus
    // uses it, exactly like the Devices layer already did before
    // Nodes existed.
    const hasAnySwitch = columns.some((c) => c.switch);
    const hasAnyAp = columns.some((c) => c.ap) || showPrimaryExtraCol;
    const hasAnyFedSwitch = columns.some((c) => c.subSwitch);
    const hasApRow = hasAnyAp || hasAnyFedSwitch;
    const columnHasDevices = (c) => (c.isHomelab && c.switch.show_devices_line === false) ? false : (c.subSwitch ? !!c.subSwitch.entities.connected_devices : c.ap ? !!c.ap.entities.connected_devices : !!(c.switch && c.switch.entities.connected_devices));
    const hasAnyDevices = columns.some(columnHasDevices) || hasIndividualDevices || primaryHasDevices;

    // Each column's animation duration, computed once upfront so every
    // segment of the same logical bus->...->AP connection (Switch-layer
    // pass-through, AP-layer pass-through, and the real terminal line)
    // animates at the same speed. A mismatched duration on pass-through
    // segments is what made the flow look broken/static before, since
    // most of a plain AP's visible connection is pass-through rows.
    // Everything needed to render a plain AP's own line consistently
    // across every row it passes through (Switch-layer pass-through
    // rows 3-4, and its own terminal row 5) - computed once so a dual-
    // bandwidth AP shows both strands the whole way from the bus down
    // to its circle, not just on the final segment.
    const columnLineInfo = columns.map((col) => {
      if (!col.ap) {
        return { hasBandwidth: false, wired: true, dlDur: 3, ulDur: 3 };
      }
      const dl = getEntityState(hass, col.ap.entities.download);
      const ul = getEntityState(hass, col.ap.entities.upload);
      const dlDur = calcFlowDuration(dl?.value, minDur, maxDur);
      const ulDur = calcFlowDuration(ul?.value, minDur, maxDur);
      const wired = col.switch ? true : isBackhaulWired(hass, col.ap);
      return {
        hasBandwidth: !!(col.ap.entities.download || col.ap.entities.upload),
        wired,
        dlDur,
        ulDur
      };
    });
    const columnDurations = columnLineInfo.map((info) => Math.min(info.dlDur, info.ulDur));
    const columnWired = columnLineInfo.map((info) => info.wired);

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

    // Row 3 (the connecting line/stem from the bus down) always
    // reserves at least a small height, even with no Switch anywhere
    // on the bus - otherwise every column's drop from the bus-line
    // collapses to nothing, which looked inconsistent depending on
    // whether any node happened to have a Switch. Row 4 (the Switch
    // circle itself) still fully collapses when unused, since there's
    // nothing to show there without an actual Switch.
    const switchRowHeight = hasAnySwitch ? "auto auto" : "0px 0px";
    const apRowHeight = hasAnyAp ? "auto auto" : "0px 0px";
    const devRowHeight = hasAnyDevices ? "auto auto" : "0px 0px";

    // Every column is at least as wide as the largest circle that
    // actually appears within the Node columns themselves - never the
    // Internet/Router/top-level Switch circles above the bus. Each
    // size only counts if that element type is actually present in
    // this diagram (e.g. Switch's circle_size is shared with the
    // top-level Switch above the bus, so it's excluded entirely unless
    // a Node-level Switch is actually part of this bus).
    const circleSizeCandidates = [];
    if (hasAnyAp) circleSizeCandidates.push(this._config.ap_circle_size ?? 72);
    if (hasAnySwitch) circleSizeCandidates.push(this._config.switch?.circle_size ?? 60);
    if (hasAnyDevices) circleSizeCandidates.push(this._config.ap_devices_circle_size ?? 56);
    const maxCircleSize = circleSizeCandidates.length ? Math.max(...circleSizeCandidates) : 0;

    return html`
      <div
        class="branches ${hasIndividualDevices ? "with-dev-connectors" : ""}"
        style="grid-template-columns:repeat(${totalCols}, minmax(${maxCircleSize}px, max-content)); grid-template-rows:${collapseTbar ? '0px' : (routerEnabled ? '26px' : '0px')} ${collapseTbar ? '0px' : '2px'} ${switchRowHeight} ${apRowHeight} ${devRowHeight} 24px; column-gap:${this._config.ap_column_gap ?? 32}px; transform:translateX(${fallbackShift}px);"
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

        ${!hasAnySwitch ? null : columns.map((col, i) => {
          if (!col.switch) {
            return html`
              <div class="ap-col-line bus-top-connector" style="grid-column:${apCol(i)}; grid-row:3;">
                ${hideApOwnLine || routerOffline
                  ? null
                  : columnLineInfo[i].hasBandwidth
                  ? this._verticalDualLine(
                      busLineColor,
                      busLineColor,
                      columnLineInfo[i].dlDur,
                      columnLineInfo[i].ulDur,
                      animate,
                      "100%",
                      !columnWired[i]
                    )
                  : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate, !columnWired[i])}
              </div>
            `;
          }
          if (!col.switchGroupStart) return null;
          const colSpan = col.switchGroupSize;
          const swOffline = isEntityUnavailable(hass, col.switch.entity);
          const swColor = swOffline
            ? col.switch.colors?.offline_circle || "var(--error-color)"
            : col.switch.colors?.circle;
          const swIconColor = swOffline
            ? col.switch.colors?.offline_icon || "var(--error-color)"
            : col.switch.colors?.icon;
          const swSize = col.isHomelab ? (this._config.homelab_circle_size ?? 60) : (this._config.switch?.circle_size ?? 60);
          const swIconSize = col.isHomelab ? (this._config.homelab_icon_size ?? 22) : (this._config.switch?.icon_size ?? 22);
          const defaultIcon = col.isHomelab ? "mdi:server" : "mdi:switch";
          const defaultLabel = col.isHomelab ? "Homelab" : "Switch";
          const swLabel = getCircleLabel(col.switch.name, getEntityState(hass, col.switch.entity), defaultLabel);
          return html`
            <div class="ap-col-line bus-top-connector" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:3;">
              ${routerOffline
                ? null
                : this._verticalSingleLine(busLineColor, 3, animate, "100%", false)}
            </div>
            <div
              class="circle-wrap ap-col-circle"
              style="width:${swSize}px; height:${swSize}px; grid-column:${apCol(i)} / span ${colSpan}; grid-row:4; opacity:${(swOffline || routerOffline) ? 0.6 : 1};"
              @click=${() => this._handleMoreInfo(col.switch.entity)}
            >
              <div class="circle ${(swOffline || routerOffline) ? "circle-pulse" : ""}" style="border-color:${swColor}; --pulse-color:${swColor};">
                <ha-icon class="${(swOffline || routerOffline) ? "icon-pulse" : ""}" .icon=${(swOffline || routerOffline) ? "mdi:exclamation-thick" : (col.switch.icon || defaultIcon)} style="color:${swIconColor};--mdc-icon-size:${swIconSize}px"></ha-icon>
                <span class="circle-value">${swLabel}</span>
              </div>
              ${(() => {
                if (!col.isHomelab) {
                  return this._renderPoeBadge(hass, col.switch.entity, col.switch.poe);
                }
                const poeVisible = computePoeTotal(hass, col.switch.entity, col.switch.poe) != null;
                const vpnVisible = this._config.vpn_target === "homelab" && !!this._config.vpn_entity;
                const fwVisible = this._config.firewall_target === "homelab" && !!this._config.firewall_entity;
                const dnsVisible = this._config.dns_target === "homelab" && !!this._config.dns_entity;
                const rpVisible = this._config.reverse_proxy_target === "homelab" && !!this._config.reverse_proxy_entity;
                const containers = col.switch.containers || [];
                const containerVisibility = containers.map((c) => !!c.entity && !!hass?.states?.[c.entity]);
                const stackItems = [
                  { key: "poe", location: col.switch.poe?.location, visible: poeVisible },
                  { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
                  { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
                  { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
                  { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible },
                  ...containers.map((c, ci) => ({ key: `container${ci}`, location: c.location, visible: containerVisibility[ci] }))
                ];
                const stacks = computeBadgeStacks(stackItems);
                return html`
                  ${this._renderPoeBadge(hass, col.switch.entity, col.switch.poe, stacks.poe || 0)}
                  ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
                  ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
                  ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
                  ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
                  ${containers.map((c, ci) => this._renderContainerBadge(hass, c, stacks[`container${ci}`] || 0))}
                `;
              })()}
            </div>
          `;
        })}
        ${!hasAnySwitch ? null : columns.map((col, i) => {
          if (col.switch) return null;
          // Columns with no switch still need a pass-through line at
          // the switch-circle row, so the vertical connection from bus
          // to AP stays unbroken.
          return routerOffline ? null : html`
            <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:4;">
              ${columnLineInfo[i].hasBandwidth
                ? this._verticalDualLine(
                    busLineColor,
                    busLineColor,
                    columnLineInfo[i].dlDur,
                    columnLineInfo[i].ulDur,
                    animate,
                    "100%",
                    !columnWired[i]
                  )
                : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate, !columnWired[i])}
            </div>
          `;
        })}

        ${!hasApRow ? null : columns.map((col, i) => {
          const feederOffline = routerOffline || (col.switch && isEntityUnavailable(hass, col.switch.entity));

          // Fed sub-switch: a leaf Switch fed by this column's parent
          // switch, in the same row as any fed APs. Always solid,
          // never animated (it's wired infrastructure, not a bandwidth
          // metric) - mirrors the group/stem structure used for a
          // multi-AP switch group, just with a forced-solid line style.
          if (col.subSwitch) {
            const subOffline = feederOffline || isEntityUnavailable(hass, col.subSwitch.entity);
            if (col.switchGroupSize > 1 && col.switchGroupStart) {
              const colSpan = col.switchGroupSize;
              const apSizeForInset = this._config.ap_circle_size ?? 72;
              return html`
                <div class="mini-bus-stem" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:5; background:${busLineColor};"></div>
                <div class="mini-bus-line" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:5; margin-left:${apSizeForInset / 2}px; margin-right:${apSizeForInset / 2}px; background:${busLineColor};"></div>
                <div class="ap-col-line ap-col-line-grouped" style="grid-column:${apCol(i)}; grid-row:5;">
                  ${subOffline ? this._renderXOnlyVerticalStretch() : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate)}
                </div>
              `;
            }
            if (col.switchGroupSize > 1 && !col.switchGroupStart) {
              return html`
                <div class="ap-col-line ap-col-line-grouped" style="grid-column:${apCol(i)}; grid-row:5;">
                  ${subOffline ? this._renderXOnlyVerticalStretch() : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate)}
                </div>
              `;
            }
            return html`
              <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:5;">
                ${subOffline ? this._renderXOnlyVerticalStretch() : this._verticalSingleLine(busLineColor, 3, animate, "100%", false)}
              </div>
            `;
          }

          if (!col.ap) {
            // Switch-only column with no AP - pass the line straight
            // through the AP layer toward the Devices layer below, but
            // only when there's actually something down there to reach
            // (its own Connected Devices circle, or the shared
            // Clients box) - otherwise the line has nowhere
            // to terminate and just trails off. Always solid, never
            // animated when it does show, since it represents the
            // switch's own wired connection, not a specific metric.
            const hasDownstream = (!!col.switch?.entities?.connected_devices || hasIndividualDevices) && !(col.isHomelab && col.switch.show_devices_line === false);
            // Row 4 (the standalone Switch/Homelab circle row) is one
            // shared grid row across the whole bus - since Homelab can
            // now have its own circle size independent of the global
            // Switch size, a Homelab node sitting alongside a regular
            // Switch-only node of a different size needs the same
            // gap-fill treatment used where APs and fed Switches share
            // a row, or the smaller circle's line would fall short.
            const rowMaxSize4 = Math.max(this._config.switch?.circle_size ?? 60, this._config.homelab_circle_size ?? 60);
            const ownSize4 = col.isHomelab ? (this._config.homelab_circle_size ?? 60) : (this._config.switch?.circle_size ?? 60);
            const gapFill4 = Math.max(0, rowMaxSize4 - ownSize4);
            const fillLineStyle4 = gapFill4 > 0 ? `margin-top:-${gapFill4}px; height:calc(100% + ${gapFill4}px);` : "";
            if (!hasDownstream) {
              return html`<div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:5;"></div>`;
            }
            return html`
              <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:5; ${fillLineStyle4}">
                ${feederOffline ? null : this._verticalPassThroughLine(busLineColor, columnDurations[i], false)}
              </div>
            `;
          }
          const apDlState = getEntityState(hass, col.ap.entities.download);
          const apUlState = getEntityState(hass, col.ap.entities.upload);
          const apDlDur = calcFlowDuration(apDlState?.value, minDur, maxDur);
          const apUlDur = calcFlowDuration(apUlState?.value, minDur, maxDur);
          const apLineOffline = feederOffline || isEntityUnavailable(hass, col.ap.entity);
          const apWired = isBackhaulWired(hass, col.ap);
          const apHasBandwidth = !!(col.ap.entities.download || col.ap.entities.upload);

          if (col.switch && col.switchGroupSize > 1 && col.switchGroupStart) {
            // First column of a multi-AP switch group: render the
            // stem connecting down from the Switch circle above, the
            // mini bus-line spanning the whole group (inset by half a
            // circle width on each side so it stops at the outer APs'
            // centers rather than their outer edges), plus this
            // column's own drop into its AP circle.
            const colSpan = col.switchGroupSize;
            const apSizeForInset = this._config.ap_circle_size ?? 72;
            return html`
              <div class="mini-bus-stem" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:5; background:${busLineColor};"></div>
              <div class="mini-bus-line" style="grid-column:${apCol(i)} / span ${colSpan}; grid-row:5; margin-left:${apSizeForInset / 2}px; margin-right:${apSizeForInset / 2}px; background:${busLineColor};"></div>
              <div class="ap-col-line ap-col-line-grouped" style="grid-column:${apCol(i)}; grid-row:5;">
                ${apLineOffline ? this._renderXOnlyVerticalStretch() : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate)}
              </div>
            `;
          }
          if (col.switch && col.switchGroupSize > 1 && !col.switchGroupStart) {
            return html`
              <div class="ap-col-line ap-col-line-grouped" style="grid-column:${apCol(i)}; grid-row:5;">
                ${apLineOffline ? this._renderXOnlyVerticalStretch() : this._verticalPassThroughLine(busLineColor, columnDurations[i], animate)}
              </div>
            `;
          }
          return html`
            <div class="ap-col-line ${!hasAnySwitch ? "bus-top-connector" : ""}" style="grid-column:${apCol(i)}; grid-row:5;">
              ${hideApOwnLine
                ? null
                : apLineOffline
                ? this._renderXOnlyVerticalStretch()
                : col.switch
                ? this._verticalSingleLine(busLineColor, 3, animate, "100%", false)
                : apHasBandwidth
                ? this._verticalDualLine(
                    busLineColor,
                    busLineColor,
                    apDlDur,
                    apUlDur,
                    animate,
                    "100%",
                    !apWired
                  )
                : this._verticalSingleLine(
                    busLineColor,
                    apDlDur,
                    animate,
                    "100%",
                    !apWired
                  )}
              ${!hideApOwnLine && !apLineOffline && !col.switch
                ? this._backhaulBadge(col.ap, hass)
                : null}
            </div>
          `;
        })}
        ${!hasApRow ? null : columns.map((col, i) => {
          if (col.subSwitch) {
            // A fed sub-switch's own circle, in the same row as any
            // fed APs. Reuses the top-level Switch's size settings
            // since there's no separate sizing namespace for these.
            const feederOffline = routerOffline || (col.switch && isEntityUnavailable(hass, col.switch.entity));
            const subOffline = feederOffline || isEntityUnavailable(hass, col.subSwitch.entity);
            const subSize = this._config.switch?.circle_size ?? 60;
            const subIconSize = this._config.switch?.icon_size ?? 22;
            const subColor = subOffline
              ? col.subSwitch.colors?.offline_circle || "var(--error-color)"
              : col.subSwitch.colors?.circle;
            const subIconColor = subOffline
              ? col.subSwitch.colors?.offline_icon || "var(--error-color)"
              : col.subSwitch.colors?.icon;
            const subLabel = getCircleLabel(col.subSwitch.name, getEntityState(hass, col.subSwitch.entity), "Switch");
            return html`
              <div
                class="circle-wrap ap-col-circle"
                style="width:${subSize}px; height:${subSize}px; grid-column:${apCol(i)}; grid-row:6; opacity:${subOffline ? 0.6 : 1};"
                @click=${() => this._handleMoreInfo(col.subSwitch.entity)}
              >
                <div class="circle ${subOffline ? "circle-pulse" : ""}" style="border-color:${subColor}; --pulse-color:${subColor};">
                  <ha-icon class="${subOffline ? "icon-pulse" : ""}" .icon=${subOffline ? "mdi:exclamation-thick" : (col.subSwitch.icon || "mdi:switch")} style="color:${subIconColor};--mdc-icon-size:${subIconSize}px"></ha-icon>
                  <span class="circle-value">${subLabel}</span>
                </div>
                ${this._renderPoeBadge(hass, col.subSwitch.entity, col.subSwitch.poe)}
              </div>
            `;
          }
          if (!col.ap) {
            const swFeederOffline = routerOffline || (col.switch && isEntityUnavailable(hass, col.switch.entity));
            const hasDownstream = (!!col.switch?.entities?.connected_devices || hasIndividualDevices) && !(col.isHomelab && col.switch.show_devices_line === false);
            if (swFeederOffline || !hasDownstream) {
              return html`<div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:6;"></div>`;
            }
            return html`
              <div class="ap-col-line" style="grid-column:${apCol(i)}; grid-row:6;">
                ${this._verticalPassThroughLine(busLineColor, columnDurations[i], false)}
              </div>
            `;
          }
          const feederOffline = routerOffline || (col.switch && isEntityUnavailable(hass, col.switch.entity));
          const apLabel = getCircleLabel(col.ap.name, getEntityState(hass, col.ap.entity), "AP");
          const apSize = this._config.ap_circle_size ?? 72;
          const apOffline = feederOffline || isEntityUnavailable(hass, col.ap.entity);
          const apCircleColor = apOffline
            ? col.ap.colors.offline_circle || "var(--error-color)"
            : col.ap.colors.circle;
          const apIconColor = apOffline
            ? col.ap.colors.offline_icon || "var(--error-color)"
            : col.ap.colors.icon;
          return html`
            <div
              class="circle-wrap ap-col-circle"
              style="width:${apSize}px; height:${apSize}px; grid-column:${apCol(i)}; grid-row:6; opacity:${apOffline ? 0.6 : 1};"
              @click=${() => this._handleMoreInfo(col.ap.entity)}
            >
              <div class="circle ${apOffline ? "circle-pulse" : ""}" style="border-color:${apCircleColor}; --pulse-color:${apCircleColor};">
                <ha-icon class="${apOffline ? "icon-pulse" : ""}" .icon=${apOffline ? "mdi:exclamation-thick" : (col.ap.icon || "mdi:wifi")} style="color:${apIconColor};--mdc-icon-size:${this._config.ap_icon_size ?? 24}px"></ha-icon>
                <span class="circle-value">${apLabel}</span>
              </div>
              ${(() => {
                const ap = col.ap;
                const poeVisible = computePoeTotal(hass, ap.entity, ap.poe) != null;
                if (!ap.is_primary) {
                  return html`
                    ${this._renderPoeBadge(hass, ap.entity, ap.poe, 0)}
                    ${this._renderIpBadge(hass, ap.entities.ip_address, "above", ap)}
                  `;
                }
                const vpnVisible = this._config.vpn_target === "primary_ap" && !!this._config.vpn_entity;
                const fwVisible = this._config.firewall_target === "primary_ap" && !!this._config.firewall_entity;
                const dnsVisible = this._config.dns_target === "primary_ap" && !!this._config.dns_entity;
                const rpVisible = this._config.reverse_proxy_target === "primary_ap" && !!this._config.reverse_proxy_entity;
                const stacks = computeBadgeStacks([
                  { key: "primary", location: ap.primary_badge_location, visible: ap.show_primary_badge !== false },
                  { key: "poe", location: ap.poe?.location, visible: poeVisible },
                  { key: "vpn", location: this._config.vpn_badge_location, visible: vpnVisible },
                  { key: "firewall", location: this._config.firewall_badge_location, visible: fwVisible },
                  { key: "dns", location: this._config.dns_badge_location, visible: dnsVisible },
                  { key: "rp", location: this._config.reverse_proxy_badge_location, visible: rpVisible }
                ]);
                return html`
                  ${this._renderPrimaryApBadge(ap, stacks.primary || 0)}
                  ${vpnVisible ? this._renderVpnBadge(hass, this._config.vpn_entity, stacks.vpn || 0) : null}
                  ${fwVisible ? this._renderFirewallBadge(hass, this._config.firewall_entity, stacks.firewall || 0) : null}
                  ${dnsVisible ? this._renderDnsBadge(hass, stacks.dns || 0) : null}
                  ${rpVisible ? this._renderReverseProxyBadge(hass, stacks.rp || 0) : null}
                  ${this._renderPoeBadge(hass, ap.entity, ap.poe, stacks.poe || 0)}
                  ${this._renderIpBadge(hass, ap.entities.ip_address, "above", ap)}
                `;
              })()}
            </div>
          `;
        })}

        ${!hasAnyDevices ? null : columns.map((col, i) => {
          const feederOffline = routerOffline || (col.switch && isEntityUnavailable(hass, col.switch.entity)) || (col.ap && isEntityUnavailable(hass, col.ap.entity)) || (col.subSwitch && isEntityUnavailable(hass, col.subSwitch.entity));
          const homelabHidesLine = col.isHomelab && col.switch.show_devices_line === false;
          const devEntity = homelabHidesLine ? null : (col.subSwitch ? col.subSwitch.entities.connected_devices : col.ap ? col.ap.entities.connected_devices : col.switch?.entities.connected_devices);
          const isSwitchDevices = !col.ap;
          const devLineOffline = feederOffline || (devEntity && isEntityUnavailable(hass, devEntity));
          // Row 6 (the AP/fed-Switch circle row) auto-sizes to the
          // TALLEST circle actually present there - if an AP and a fed
          // Switch share that row and their configured sizes differ
          // (e.g. the default 72px AP vs 60px Switch), the smaller
          // circle sits flush at the top of a taller cell, leaving
          // empty space below it before this row's line even starts.
          // Stretching the line upward by that same gap (via a
          // negative margin) closes it, rather than leaving a visible
          // break between the smaller circle and its own devices line.
          const rowMaxSize = Math.max(this._config.ap_circle_size ?? 72, this._config.switch?.circle_size ?? 60);
          const ownRowSize = col.subSwitch
            ? (this._config.switch?.circle_size ?? 60)
            : col.ap
            ? (this._config.ap_circle_size ?? 72)
            : null;
          const gapFill = ownRowSize != null ? Math.max(0, rowMaxSize - ownRowSize) : 0;
          const fillLineStyle = gapFill > 0 ? `margin-top:-${gapFill}px; height:calc(100% + ${gapFill}px);` : "";
          return html`
            <div class="ap-col-devline" style="grid-column:${apCol(i)}; grid-row:7; ${devLineOffline ? 'display:flex; justify-content:center; align-items:center;' : ''}">
              ${devLineOffline && (devEntity || (hasIndividualDevices && !homelabHidesLine))
                ? html`
                    <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                      <ha-icon icon="mdi:close"></ha-icon>
                    </div>
                  `
                : !devLineOffline && (devEntity || (hasIndividualDevices && !homelabHidesLine))
                ? isSwitchDevices
                  ? html`<div class="ap-col-fillline" style="background:${busLineColor}; ${fillLineStyle}"></div>`
                  : html`<div
                      class="ap-col-fillline"
                      style="background-image:repeating-linear-gradient(to bottom, ${busLineColor} 0px, ${busLineColor} 2px, transparent 2px, transparent 6px); ${fillLineStyle}"
                    ></div>`
                : null}
            </div>
          `;
        })}
        ${!hasAnyDevices ? null : columns.map((col, i) => {
          const feederOffline = routerOffline || (col.switch && isEntityUnavailable(hass, col.switch.entity)) || (col.ap && isEntityUnavailable(hass, col.ap.entity)) || (col.subSwitch && isEntityUnavailable(hass, col.subSwitch.entity));
          const homelabHidesLine = col.isHomelab && col.switch.show_devices_line === false;
          const devEntity = homelabHidesLine ? null : (col.subSwitch ? col.subSwitch.entities.connected_devices : col.ap ? col.ap.entities.connected_devices : col.switch?.entities.connected_devices);
          const devColorSource = col.subSwitch ? col.subSwitch.colors : col.ap ? col.ap.colors : col.switch?.colors;
          const devIcon = col.subSwitch ? col.subSwitch.devices_icon : col.ap ? col.ap.devices_icon : col.switch?.devices_icon;
          const devCircleSize = this._config.ap_devices_circle_size ?? 56;
          const devIconSize = this._config.ap_devices_icon_size ?? 20;
          const devOffline = feederOffline || (devEntity && isEntityUnavailable(hass, devEntity));
          if (devEntity && !feederOffline) {
            const devState = getEntityState(hass, devEntity);
            const devCircleColor = devOffline
              ? devColorSource?.devices_offline_circle || "var(--error-color)"
              : devColorSource?.devices_circle;
            const devIconColor = devOffline
              ? devColorSource?.devices_offline_icon || "var(--error-color)"
              : devColorSource?.devices_icon;
            return html`
                <div
                  class="circle-wrap ap-col-devcircle"
                  style="width:${devCircleSize}px; height:${devCircleSize}px; grid-column:${apCol(i)}; grid-row:8; opacity:${devOffline ? 0.6 : 1};"
                  @click=${() => this._handleMoreInfo(devEntity)}
                >
                  <div
                    class="circle ${devOffline ? "circle-pulse" : ""}"
                    style="border-color:${devCircleColor}; --pulse-color:${devCircleColor};"
                  >
                    <ha-icon
                      class="${devOffline ? "icon-pulse" : ""}"
                      .icon=${devOffline ? "mdi:exclamation-thick" : (devIcon || "mdi:devices")}
                      style="color:${devIconColor};--mdc-icon-size:${devIconSize}px"
                    ></ha-icon>
                    <span class="circle-value">
                      ${devState ? roundVal(devState.value) : "-"}
                    </span>
                  </div>
                </div>
              `;
          }
          return hasIndividualDevices && !feederOffline && !homelabHidesLine
            ? html`<div
                class="ap-col-devcircle-spacer"
                style="grid-column:${apCol(i)}; grid-row:8; ${devOffline ? 'display:flex; justify-content:center; align-items:center;' : ''}"
              >
                ${devOffline
                  ? html`
                      <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                        <ha-icon icon="mdi:close"></ha-icon>
                      </div>
                    `
                  : !col.ap
                  ? html`<div class="ap-col-fillline" style="background:${busLineColor}"></div>`
                  : html`
                      <div
                        class="ap-col-fillline"
                        style="background-image:repeating-linear-gradient(to bottom, ${busLineColor} 0px, ${busLineColor} 2px, transparent 2px, transparent 6px)"
                      ></div>
                    `}
              </div>`
            : html`<div
                class="ap-col-devcircle-spacer"
                style="grid-column:${apCol(i)}; grid-row:8;"
              ></div>`;
        })}
        ${hasIndividualDevices
          ? columns.map((col, i) => {
              const feederOffline = routerOffline || (col.switch && isEntityUnavailable(hass, col.switch.entity)) || (col.ap && isEntityUnavailable(hass, col.ap.entity)) || (col.subSwitch && isEntityUnavailable(hass, col.subSwitch.entity));
              const homelabHidesLine = col.isHomelab && col.switch.show_devices_line === false;
              const devEntity = col.subSwitch ? col.subSwitch.entities.connected_devices : col.ap ? col.ap.entities.connected_devices : col.switch?.entities.connected_devices;
              const devLineOffline = !feederOffline && devEntity && isEntityUnavailable(hass, devEntity);
              const isSwitchFed = !col.ap;
              if (homelabHidesLine) {
                return html`<div class="ap-col-devconnector" style="grid-column:${apCol(i)}; grid-row:9;"></div>`;
              }
              return html`
                <div class="ap-col-devconnector" style="grid-column:${apCol(i)}; grid-row:9; ${(devLineOffline || feederOffline) ? 'display:flex; justify-content:center; align-items:center;' : ''}">
                  ${feederOffline
                    ? null
                    : devLineOffline
                    ? html`
                        <div class="offline-x-mid offline-x-pulse" style="color:var(--error-color, #f44336)">
                          <ha-icon icon="mdi:close"></ha-icon>
                        </div>
                      `
                    : isSwitchFed
                    ? html`<div class="dev-dotted-line" style="background:${individualDevicesLineColor}"></div>`
                    : html`
                        <div
                          class="dev-dotted-line"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      `}
                </div>
              `;
            })
          : null}

        ${showPrimaryExtraCol
          ? (() => {
              if (routerOffline) {
                return null;
              }
              if (!primaryHasDevices) {
                return hasIndividualDevices
                  ? html`
                      <div
                        class="ap-col-fillline-wrap"
                        style="grid-column:${extraCol}; grid-row:3 / 9; display:flex; justify-content:center; width:100%; box-sizing:border-box;"
                      >
                        <div
                          class="ap-col-fillline"
                          style="background-image:repeating-linear-gradient(to bottom, ${individualDevicesLineColor} 0px, ${individualDevicesLineColor} 2px, transparent 2px, transparent 6px)"
                        ></div>
                      </div>
                      <div
                        class="ap-col-devconnector"
                        style="grid-column:${extraCol}; grid-row:9;"
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
                  style="grid-column:${extraCol}; grid-row:3 / 8; display:flex; justify-content:center; width:100%; box-sizing:border-box;"
                >
                  <div
                    class="ap-col-fillline"
                    style="background-image:repeating-linear-gradient(to bottom, ${this._config.flow_line_color || 'var(--divider-color, #ccc)'} 0px, ${this._config.flow_line_color || 'var(--divider-color, #ccc)'} 2px, transparent 2px, transparent 6px)"
                  ></div>
                </div>
                <div
                  class="circle-wrap ap-col-devcircle"
                  style="width:${devCircleSize}px; height:${devCircleSize}px; grid-column:${extraCol}; grid-row:8; opacity:${devOffline ? 0.6 : 1};"
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
                        style="grid-column:${extraCol}; grid-row:9;"
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
      .poe-badge-flash {
        animation: nf-vpn-flash 1.8s ease-in-out infinite;
      }
      .guest-badge {
        position: absolute;
        top: 15%;
        right: 8%;
        transform: translate(50%, -50%);
        border-radius: 50%;
        padding: 2px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
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
        display: flex;
        justify-content: center;
        align-items: stretch;
        position: relative;
        width: 100%;
        box-sizing: border-box;
      }
      .ap-col-line-grouped {
        align-items: stretch;
        padding-top: 14px;
        box-sizing: border-box;
      }
      .mini-bus-line {
        align-self: start;
        height: 2px;
        margin-top: 12px;
      }
      .mini-bus-stem {
        align-self: start;
        justify-self: center;
        width: 2px;
        height: 12px;
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
      .primary-ap-badge {
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .vpn-badge {
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .firewall-badge {
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .poe-badge {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
      .ap-col-circle {
        justify-self: center;
      }
      /* Icon-bearing badges (guest, primary AP, VPN, firewall, and now
         PoE's own class since the DNS badge - which reuses .poe-badge
         for its pill shape - carries an icon too) need the same
         explicit centering rule applied directly to the ha-icon
         element that .circle ha-icon already gets - the parent's own
         flex centering isn't enough on its own, since ha-icon's
         internal rendering otherwise leaves it sitting slightly low. */
      .guest-badge ha-icon,
      .primary-ap-badge ha-icon,
      .vpn-badge ha-icon,
      .firewall-badge ha-icon,
      .poe-badge ha-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ap-col-devline {
        display: flex;
        justify-content: center;
        height: 24px;
      }
      .ap-col-devcircle {
        justify-self: center;
      }
      .ap-col-devcircle-spacer {
        display: flex;
        justify-content: center;
      }
      .ap-col-fillline {
        width: 2px;
        height: 100%;
        opacity: 0.9;
      }
      .ap-col-devconnector {
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
      .individual-devices-groups {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: stretch;
        gap: 6px;
        width: 100%;
      }
      .individual-devices-groups.layout-last-fill {
        justify-content: flex-start;
      }
      .individual-devices-groups.layout-last-fill > .individual-device-group:last-child {
        flex: 1 1 auto;
      }
      .individual-device-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        box-sizing: border-box;
        flex: 0 1 auto;
      }
      .individual-device-group-label {
        font-size: 10px;
        font-weight: 400;
        color: var(--primary-text-color);
        line-height: 1;
        white-space: nowrap;
      }
      .individual-device-group-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
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
  { key: "router", title: "Router/Gateway", icon: "mdi:router-network", summary: "Entity, name, icon, LAN, colors" },
  { key: "switch", title: "Switch", icon: "mdi:switch", summary: "Optional element between Router/Gateway and Nodes, PoE" },
  { key: "security", title: "Security", icon: "mdi:shield-lock", summary: "VPN, Firewall, DNS Filtering, and Reverse Proxy badges, target, colors" },
  { key: "nodes", title: "Nodes", icon: "mdi:wifi", summary: "AP, Switch (with fed APs/Switches), or Homelab nodes, PoE" },
  { key: "individual_devices", title: "Clients", icon: "mdi:devices", summary: "Device icons & colors, grouping by SSID/VLAN/AP" },
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
    this._editingSwitchApIndex = null;
    this._editingFedSwitchIndex = null;
    this._editingContainerIndex = null;
    // Transient auto-discovery state - never persisted to config, just
    // scan results held in the editor while the user decides what to
    // do with them.
    this._discoveredDevices = null;
    this._discoveredSelected = new Set();
    this._nodeScanMessage = "";
    this._routerScanMessage = "";
    this._internetScanMessage = "";
    this._ispScanMessage = "";
    this._discoveredNodes = null;
    this._discoveredRouters = null;
    this._discoveredSpeedtestServices = null;
    this._discoveredIspServices = null;
    this._discoveredNodesSelected = new Set();
    this._discoveredNodesPage = 0;
    this._discoveredDevicesPage = 0;
    this._discoveredDevicesFilter = "";
    this._discoveredAdGuard = null;
    this._adguardScanMessage = "";
    this._discoveredProxmox = null;
    this._discoveredProxmoxSelected = new Set();
    this._proxmoxScanMessage = "";
    this._discoveredPortainer = null;
    this._discoveredPortainerSelected = new Set();
    this._portainerScanMessage = "";
  }

  setConfig(config) {
    const migrated = migrateAccessPointsToNodes(config || {});
    const merged = deepMerge(DEFAULT_CONFIG, migrated);
    merged.nodes = (migrated.nodes || []).map((node) => {
      const mergedNode = deepMerge(DEFAULT_NODE, node);
      mergedNode.switch = node.switch ? deepMerge(DEFAULT_NODE_SWITCH, node.switch) : null;
      mergedNode.homelab = node.homelab ? deepMerge(DEFAULT_HOMELAB, node.homelab) : null;
      if (mergedNode.homelab) {
        mergedNode.homelab.containers = (node.homelab?.containers || []).map((c) =>
          deepMerge(DEFAULT_CONTAINER_BADGE, c)
        );
      }
      mergedNode.access_points = (node.access_points || []).map((ap) =>
        deepMerge(DEFAULT_ACCESS_POINT, ap)
      );
      mergedNode.fed_switches = (node.fed_switches || []).map((sw) =>
        deepMerge(DEFAULT_NODE_SWITCH, sw)
      );
      return mergedNode;
    });
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

    if (path.includes("circle_size") || path.includes("icon_size") || path === "min_flow_duration" || path === "max_flow_duration" || path.includes(".up_to")) {
      val = val === "" ? null : parseFloat(val);
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

  // Reusable "which corner" select for the four badge types that
  // support configurable positioning (Primary AP, VPN, Firewall, PoE).
  // Overlap between badges sharing a corner is handled automatically
  // at render time (computeBadgeStacks), so this dropdown doesn't need
  // to warn about collisions - multiple badges in the same corner just
  // fan out slightly rather than hiding each other.
  _renderLocationSelect(value, path) {
    return html`
      <div class="select-field">
        <label class="input-label">Badge Location</label>
        <select
          class="native-select"
          .value=${value || "top-right"}
          @change=${(e) => this._handleSelectChange(e, path)}
        >
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
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

  // Shared PoE editor section - used by both the top-level Switch page
  // and each node-level Switch's fields, since they share the same
  // `poe` config shape (DEFAULT_POE). `path` is the dotted path to the
  // switch's own `poe` object, e.g. "switch.poe" or
  // "nodes.2.switch.poe".
  _renderPoeSection(poe, path) {
    const p = poe || DEFAULT_POE;
    return html`
      <div class="sub-header">Power over Ethernet (PoE)</div>
      <div class="select-field">
        <label class="input-label">Mode</label>
        <select
          class="native-select"
          .value=${p.mode || "off"}
          @change=${(e) => this._handleSelectChange(e, `${path}.mode`)}
        >
          <option value="auto">Auto (sum PoE ports on this device)</option>
          <option value="manual">Manual (choose entities)</option>
          <option value="off">Off</option>
        </select>
      </div>

      ${p.mode !== "off"
        ? html`
            <ha-icon-picker
              .label=${"Badge Icon"}
              .value=${p.icon || "mdi:lightning-bolt"}
              @value-changed=${(e) => this._valueChanged(e, `${path}.icon`)}
            ></ha-icon-picker>
            ${this._renderLocationSelect(p.location, `${path}.location`)}
          `
        : null}

      ${p.mode === "manual"
        ? html`
            ${(p.manual_entities || []).map(
              (ent, i) => html`
                <div class="list-item">
                  <div class="list-item-info" style="flex:1;">
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${ent || ""}
                      .label=${`PoE Entity ${i + 1}`}
                      @value-changed=${(e) => this._valueChanged(e, `${path}.manual_entities.${i}`)}
                      allow-custom-entity
                      style="width:100%;"
                    ></ha-entity-picker>
                  </div>
                  <div class="list-item-actions">
                    <ha-icon-button @click=${() => this._removePoeEntity(path, i)} title="Delete">
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </ha-icon-button>
                  </div>
                </div>
              `
            )}
            <button class="add-btn" @click=${() => this._addPoeEntity(path)}>
              + Add Entity
            </button>
          `
        : null}

      ${p.mode !== "off"
        ? html`
            <div class="select-field">
              <label class="input-label">Badge Color</label>
              <select
                class="native-select"
                .value=${p.color_mode || "single"}
                @change=${(e) => this._handleSelectChange(e, `${path}.color_mode`)}
              >
                <option value="single">Single color</option>
                <option value="threshold">Threshold colors</option>
              </select>
            </div>

            ${p.color_mode === "threshold"
              ? (() => {
                  const thresholds = p.thresholds || [];
                  return thresholds.map(
                    (t, i) => {
                      // The LAST row is always the open-ended catch-all
                      // ("above every other tier"), determined by its
                      // position in the array - never by whether up_to
                      // currently holds a value. Deciding this by value
                      // instead would mean clearing the field (which
                      // parses to an empty/null up_to) permanently
                      // flips a row into "Above previous" with no way
                      // to type a number back in.
                      const isCatchAll = i === thresholds.length - 1;
                      return html`
                        <div class="two-col">
                          ${isCatchAll
                            ? html`<span style="color:var(--secondary-text-color); align-self:center;">Above previous</span>`
                            : this._renderInput(
                                `Up to (${p.unit || "W"})`,
                                t.up_to,
                                `${path}.thresholds.${i}.up_to`,
                                "number"
                              )}
                          ${this._renderColorInput("Color", t.color, `${path}.thresholds.${i}.color`)}
                        </div>
                      `;
                    }
                  );
                })()
              : this._renderColorInput("Badge Color", p.color, `${path}.color`)}

            ${p.color_mode === "threshold"
              ? html`
                  <div class="toggle-row">
                    <span>Animate when above top threshold</span>
                    <ha-switch
                      .checked=${p.animate_over_threshold ?? false}
                      @change=${(e) => this._valueChanged(e, `${path}.animate_over_threshold`)}
                    ></ha-switch>
                  </div>
                `
              : null}

            ${this._renderColorInput("Text Color", p.text_color, `${path}.text_color`)}
          `
        : null}
    `;
  }

  // Fields for a single Container/VM status badge on a Homelab node -
  // entity, icon, location, and active/offline colors, matching the
  // VPN/Firewall badge editor pattern (no Enabled toggle needed, since
  // presence in the Containers list already means shown).
  _renderContainerFields(nodeIndex, node, containerIndex) {
    const c = node.homelab?.containers?.[containerIndex] || DEFAULT_CONTAINER_BADGE;
    const prefix = `nodes.${nodeIndex}.homelab.containers.${containerIndex}`;

    return html`
      <div class="sub-header">Container / VM</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${c.entity || ""}
        .label=${"Entity"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
        allow-custom-entity
      ></ha-entity-picker>

      ${this._renderInput("Name (Optional)", c.name, `${prefix}.name`)}

      <ha-icon-picker
        .label=${"Badge Icon"}
        .value=${c.icon || "mdi:docker"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
      ></ha-icon-picker>

      ${this._renderLocationSelect(c.location, `${prefix}.location`)}

      <div class="toggle-row">
        <span>Animate when Offline</span>
        <ha-switch
          .checked=${c.animate_offline ?? false}
          @change=${(e) => this._valueChanged(e, `${prefix}.animate_offline`)}
        ></ha-switch>
      </div>

      <div class="two-col">
        <div>
          ${this._renderColorInput("Icon Color", c.icon_color, `${prefix}.icon_color`)}
          ${this._renderColorInput("Background Color", c.color, `${prefix}.color`)}
          ${this._renderColorInput("Border Color", c.border_color, `${prefix}.border_color`)}
        </div>
        <div>
          ${this._renderColorInput("Offline Icon Color", c.offline_icon_color, `${prefix}.offline_icon_color`)}
          ${this._renderColorInput("Offline Background Color", c.offline_color, `${prefix}.offline_color`)}
          ${this._renderColorInput("Offline Border Color", c.offline_border_color, `${prefix}.offline_border_color`)}
        </div>
      </div>
    `;
  }

  // Reads the poe object currently at `path` (dotted, may include
  // array indices) off this._config, walking one segment at a time.
  _getAtPath(path) {
    let cur = this._config;
    for (const key of path.split(".")) {
      cur = cur?.[key];
    }
    return cur;
  }

  _addPoeEntity(path) {
    const poe = this._getAtPath(path) || {};
    const updated = [...(poe.manual_entities || []), ""];
    this._config = setPathValue(this._config, `${path}.manual_entities`, updated);
    this._fireChanged();
  }

  _removePoeEntity(path, index) {
    const poe = this._getAtPath(path) || {};
    const updated = (poe.manual_entities || []).filter((_, i) => i !== index);
    this._config = setPathValue(this._config, `${path}.manual_entities`, updated);
    this._fireChanged();
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
    if (this._editingSwitchApIndex !== null) {
      this._editingSwitchApIndex = null;
    } else if (this._editingFedSwitchIndex !== null) {
      this._editingFedSwitchIndex = null;
    } else if (this._editingContainerIndex !== null) {
      this._editingContainerIndex = null;
    } else if (this._editingApIndex !== null) {
      this._editingApIndex = null;
    } else if (this._editingDevIndex !== null) {
      this._editingDevIndex = null;
    } else {
      this._page = null;
    }
  }

  _getPageTitle() {
    if (this._page === "nodes" && this._editingApIndex !== null && this._editingSwitchApIndex !== null) {
      return `Access Point ${this._editingSwitchApIndex + 1}`;
    }
    if (this._page === "nodes" && this._editingApIndex !== null && this._editingFedSwitchIndex !== null) {
      return `Switch ${this._editingFedSwitchIndex + 1}`;
    }
    if (this._page === "nodes" && this._editingApIndex !== null && this._editingContainerIndex !== null) {
      return `Container ${this._editingContainerIndex + 1}`;
    }
    if (this._page === "nodes" && this._editingApIndex !== null) {
      const node = this._config.nodes?.[this._editingApIndex];
      return node?.switch ? `Node ${this._editingApIndex + 1}` : `Access Point ${this._editingApIndex + 1}`;
    }
    if (this._page === "individual_devices" && this._editingDevIndex !== null) {
      return `Client ${this._editingDevIndex + 1}`;
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
      case "nodes":
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

        <div class="sub-header">Auto-Discovery (Speedtest)</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Looks for both the official Speedtest.net integration and the
          community Ookla Speedtest integration, and lists every
          service found on either (e.g. if you have both configured,
          or more than one instance of one) so you choose which to
          apply - nothing is set automatically. Only blank fields are
          filled in on the one you pick - anything you've already set
          by hand is left alone.
        </p>
        <button class="add-btn" @click=${() => this._scanForInternet()}>
          Scan for Speedtest
        </button>
        ${this._internetScanMessage
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._internetScanMessage}</p>`
          : null}
        ${this._discoveredSpeedtestServices !== null ? this._renderDiscoveredSpeedtestList() : null}

        <div class="sub-header">Auto-Discovery (ISP)</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Looks for Aussie Broadband, Starlink, and Start.ca, and lists
          every service found across all three - Aussie Broadband in
          particular often has several services on one account (each
          its own address/line), so you pick the right one rather than
          one being assumed. Applies Billing Total, Billing Remaining,
          Total Downloaded, and Total Uploaded from whichever you
          choose; for Starlink, also sets the Internet Entity itself to
          its "Connected" binary sensor if that field is still blank.
        </p>
        <button class="add-btn" @click=${() => this._scanForIsp()}>
          Scan for ISP
        </button>
        ${this._ispScanMessage
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._ispScanMessage}</p>`
          : null}
        ${this._discoveredIspServices !== null ? this._renderDiscoveredIspList() : null}

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

        <div class="sub-header">Auto-Discovery (TP-Link / OpenWrt)</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Looks for the master unit on a TP-Link Deco mesh, the single
          device from the TP-Link Router integration, and an OpenWrt
          router via the LuCI integration - if more than one exists
          (e.g. a TP-Link Router acting as your modem/gateway with a
          Deco mesh riding behind it), you choose which one is the
          Router below rather than having one picked for you. LuCI has
          no dedicated router-status entity of its own, so its
          candidate uses one of its client-tracker entities as a
          reachability proxy - that still works correctly for
          online/offline detection, just don't be surprised by the
          entity name.
        </p>
        <button class="add-btn" @click=${() => this._scanForRouter()}>
          Scan for Router / Gateway
        </button>
        ${this._routerScanMessage
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._routerScanMessage}</p>`
          : null}
        ${this._discoveredRouters !== null ? this._renderDiscoveredRoutersList() : null}

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
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, "router.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, "router.colors.offline_icon")}
          </div>
        </div>

        ${this._renderPoeSection(router.poe, "router.poe")}

        <div class="sub-header">IP Addressing</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Shown only when Advanced > Layout > Show IP Addressing is on.
          WAN Address renders centered below the Internet circle; LAN
          Address renders centered below this Router circle.
        </p>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entities?.wan_ip || ""}
          .label=${"WAN Address Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entities.wan_ip")}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${router.entities?.lan_ip || ""}
          .label=${"LAN Address Entity"}
          @value-changed=${(e) => this._valueChanged(e, "router.entities.lan_ip")}
          allow-custom-entity
        ></ha-entity-picker>
        <div class="two-col">
          <div>${this._renderColorInput("Badge Background", router.ip_badge_color, "router.ip_badge_color")}</div>
          <div>${this._renderColorInput("Badge Icon Color", router.ip_badge_icon_color, "router.ip_badge_icon_color")}</div>
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
          </div>
          <div>
            ${this._renderColorInput("Offline Border Color", c.offline_circle, "switch.colors.offline_circle")}
            ${this._renderColorInput("Offline Icon Color", c.offline_icon, "switch.colors.offline_icon")}
          </div>
        </div>

        ${this._renderPoeSection(sw.poe, "switch.poe")}

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

  // Shared "Applies To" select for the four Security elements - any
  // of them can target the Router, Primary AP, the Homelab node, or
  // the main (top-level) Switch. Node-level/fed Switches aren't a
  // target option here since there can be several of them and no
  // single one is "the" switch the way there's one Router or one
  // top-level Switch.
  _renderSecurityTargetSelect(value, path) {
    return html`
      <div class="select-field">
        <label class="input-label">Applies To</label>
        <select
          class="native-select"
          .value=${value || "router"}
          @change=${(e) => this._handleSelectChange(e, path)}
        >
          <option value="router">Router/Gateway</option>
          <option value="primary_ap">Primary Access Point</option>
          <option value="homelab">Homelab Server</option>
          <option value="switch">Main Switch</option>
        </select>
      </div>
    `;
  }

  _renderSecurityPage() {
    const vpnTarget = this._config.vpn_target || "router";
    const firewallTarget = this._config.firewall_target || "router";
    const dnsTarget = this._config.dns_target || "router";
    const reverseProxyTarget = this._config.reverse_proxy_target || "router";
    const aps = (this._config.nodes || []).flatMap((node) => node.access_points || []);
    const hasPrimaryAp = aps.some((ap) => ap.is_primary);
    const hasHomelab = (this._config.nodes || []).some((node) => node.homelab);
    const hasMainSwitch = !!this._config.switch?.entity;

    const targetWarning = (target) => {
      if (target === "primary_ap" && !hasPrimaryAp) {
        return "No Access Point is currently marked Primary - the badge won't appear until one is (on the Access Points page).";
      }
      if (target === "homelab" && !hasHomelab) {
        return "No Homelab node exists yet - the badge won't appear until one is added (on the Nodes page).";
      }
      if (target === "switch" && !hasMainSwitch) {
        return "The main Switch has no entity configured - the badge won't appear until one is set (on the Switch page).";
      }
      return null;
    };

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

        ${this._renderSecurityTargetSelect(vpnTarget, "vpn_target")}

        ${targetWarning(vpnTarget)
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">${targetWarning(vpnTarget)}</p>`
          : null}

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.vpn_peers_entity || ""}
          .label=${"Connected Peers Entity (Optional)"}
          @value-changed=${(e) => this._valueChanged(e, "vpn_peers_entity")}
          allow-custom-entity
        ></ha-entity-picker>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          When set, the VPN badge widens to show this entity's value
          next to its icon. Leave blank to keep the badge icon-only.
        </p>

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

        ${this._renderLocationSelect(this._config.vpn_badge_location, "vpn_badge_location")}

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

        ${this._renderSecurityTargetSelect(firewallTarget, "firewall_target")}

        ${targetWarning(firewallTarget)
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">${targetWarning(firewallTarget)}</p>`
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

        ${this._renderLocationSelect(this._config.firewall_badge_location, "firewall_badge_location")}

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

        <div class="sub-header">DNS Filtering</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          e.g. Pi-hole or AdGuard Home - queries blocked, or block percentage.
        </p>

        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          <strong>Auto-Discovery (AdGuard Home):</strong> finds each
          AdGuard Home instance's "queries blocked" sensor - the same
          numeric pill this badge is built around.
        </p>
        <button class="add-btn" @click=${() => this._scanForAdGuard()}>
          Scan for AdGuard Home
        </button>
        ${this._adguardScanMessage
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._adguardScanMessage}</p>`
          : null}
        ${this._discoveredAdGuard !== null ? this._renderDiscoveredAdGuardList() : null}

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.dns_entity || ""}
          .label=${"DNS Filtering Entity"}
          @value-changed=${(e) => this._valueChanged(e, "dns_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderSecurityTargetSelect(dnsTarget, "dns_target")}

        ${targetWarning(dnsTarget)
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">${targetWarning(dnsTarget)}</p>`
          : null}

        ${this._renderInput("Unit (Optional)", this._config.dns_unit, "dns_unit")}

        <ha-icon-picker
          .label=${"Badge Icon"}
          .value=${this._config.dns_badge_icon || "mdi:shield-check"}
          @value-changed=${(e) => this._valueChanged(e, "dns_badge_icon")}
        ></ha-icon-picker>

        ${this._renderLocationSelect(this._config.dns_badge_location, "dns_badge_location")}

        <div class="select-field">
          <label class="input-label">Badge Color</label>
          <select
            class="native-select"
            .value=${this._config.dns_color_mode || "single"}
            @change=${(e) => this._handleSelectChange(e, "dns_color_mode")}
          >
            <option value="single">Single color</option>
            <option value="threshold">Threshold colors</option>
          </select>
        </div>

        ${this._config.dns_color_mode === "threshold"
          ? (() => {
              const thresholds = this._config.dns_thresholds || [];
              return thresholds.map((t, i) => {
                const isCatchAll = i === thresholds.length - 1;
                return html`
                  <div class="two-col">
                    ${isCatchAll
                      ? html`<span style="color:var(--secondary-text-color); align-self:center;">Above previous</span>`
                      : this._renderInput(
                          `Up to${this._config.dns_unit ? ` (${this._config.dns_unit})` : ""}`,
                          t.up_to,
                          `dns_thresholds.${i}.up_to`,
                          "number"
                        )}
                    ${this._renderColorInput("Color", t.color, `dns_thresholds.${i}.color`)}
                  </div>
                `;
              });
            })()
          : this._renderColorInput("Badge Color", this._config.dns_badge_color, "dns_badge_color")}

        ${this._config.dns_color_mode === "threshold"
          ? html`
              <div class="toggle-row">
                <span>Animate when above top threshold</span>
                <ha-switch
                  .checked=${this._config.dns_animate_over_threshold ?? false}
                  @change=${(e) => this._valueChanged(e, "dns_animate_over_threshold")}
                ></ha-switch>
              </div>
            `
          : null}

        ${this._renderColorInput("Text Color", this._config.dns_text_color, "dns_text_color")}

        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          If the entity above is a binary_sensor or switch rather than
          a number, the badge shows the icon only, using the color
          below when off (the settings above still apply for numeric
          entities).
        </p>
        ${this._renderColorInput("Offline Badge Color", this._config.dns_badge_offline_color, "dns_badge_offline_color")}

        <div class="sub-header">Reverse Proxy</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          e.g. Nginx Proxy Manager, Caddy, Traefik - up/down status.
        </p>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.reverse_proxy_entity || ""}
          .label=${"Reverse Proxy Entity"}
          @value-changed=${(e) => this._valueChanged(e, "reverse_proxy_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderSecurityTargetSelect(reverseProxyTarget, "reverse_proxy_target")}

        ${targetWarning(reverseProxyTarget)
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0;">${targetWarning(reverseProxyTarget)}</p>`
          : null}

        <div class="toggle-row">
          <span>Animate when Offline</span>
          <ha-switch
            .checked=${this._config.reverse_proxy_animate_offline ?? false}
            @change=${(e) => this._valueChanged(e, "reverse_proxy_animate_offline")}
          ></ha-switch>
        </div>

        <ha-icon-picker
          .label=${"Badge Icon"}
          .value=${this._config.reverse_proxy_badge_icon || "mdi:server-network"}
          @value-changed=${(e) => this._valueChanged(e, "reverse_proxy_badge_icon")}
        ></ha-icon-picker>

        ${this._renderLocationSelect(this._config.reverse_proxy_badge_location, "reverse_proxy_badge_location")}

        <div class="two-col">
          <div>
            ${this._renderColorInput("Badge Icon Color", this._config.reverse_proxy_badge_icon_color, "reverse_proxy_badge_icon_color")}
            ${this._renderColorInput("Badge Background Color", this._config.reverse_proxy_badge_color, "reverse_proxy_badge_color")}
            ${this._renderColorInput("Badge Border Color", this._config.reverse_proxy_badge_border_color, "reverse_proxy_badge_border_color")}
          </div>
          <div>
            ${this._renderColorInput("Offline Badge Icon Color", this._config.reverse_proxy_badge_offline_icon_color, "reverse_proxy_badge_offline_icon_color")}
            ${this._renderColorInput("Offline Badge Background Color", this._config.reverse_proxy_badge_offline_color, "reverse_proxy_badge_offline_color")}
            ${this._renderColorInput("Offline Badge Border Color", this._config.reverse_proxy_badge_offline_border_color, "reverse_proxy_badge_offline_border_color")}
          </div>
        </div>
      </div>
    `;
  }

  _renderAccessPointsPage() {
    if (this._editingApIndex !== null) {
      return this._renderApEditor(this._editingApIndex);
    }

    const nodes = this._config.nodes || [];
    return html`
      <div class="form-section">
        ${nodes.map((node, idx) => {
          const isSwitchNode = !!node.switch;
          const isHomelabNode = !!node.homelab;
          const ap = node.access_points?.[0] || {};
          const hasPrimary = (node.access_points || []).some((a) => a.is_primary);
          const displayIcon = isSwitchNode
            ? (node.switch.icon || "mdi:switch")
            : isHomelabNode
            ? (node.homelab.icon || "mdi:server")
            : (ap.icon || "mdi:wifi");
          const baseLabel = node.name || (isSwitchNode
            ? (node.switch.name || node.switch.entity)
            : isHomelabNode
            ? (node.homelab.name || node.homelab.entity || "Homelab Server")
            : (ap.name || ap.entity)) || `Node ${idx + 1}`;
          const label = hasPrimary ? `${baseLabel} (Primary)` : baseLabel;
          return html`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon .icon=${displayIcon} style="color:${hasPrimary ? 'var(--accent-color)' : 'var(--primary-color)'};"></ha-icon>
                <span>${label}</span>
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
                  .disabled=${idx === nodes.length - 1}
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
          `;
        })}
        <button class="add-btn" @click=${() => this._addAp()}>
          + Add Node
        </button>

        <div class="sub-header">Auto-Discovery (TP-Link Deco)</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Scans for satellite Deco units on your mesh. Nothing is added
          automatically; review the list and select which ones you
          want, then Connected Devices, Backhaul Type, and Download/
          Upload are wired up from that unit's own entities
          automatically where available.
        </p>
        <button class="add-btn" @click=${() => this._scanForNodes()}>
          Scan for Nodes
        </button>
        ${this._nodeScanMessage
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._nodeScanMessage}</p>`
          : null}
        ${this._discoveredNodes !== null ? this._renderDiscoveredNodesList() : null}

        <div class="sub-header">Auto-Discovery (Proxmox VE)</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Scans for each Proxmox node (physical host or cluster member)
          and adds it as a Homelab Server node, with any VMs/Containers
          running on it attached as Container badges automatically.
        </p>
        <button class="add-btn" @click=${() => this._scanForProxmox()}>
          Scan for Proxmox
        </button>
        ${this._proxmoxScanMessage
          ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._proxmoxScanMessage}</p>`
          : null}
        ${this._discoveredProxmox !== null ? this._renderDiscoveredProxmoxList() : null}
      </div>
    `;
  }

  _setNodeType(index, type) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[index];
    if (!node) return;
    if (type === "switch") {
      nodes[index] = {
        ...node,
        switch: node.switch || { ...DEFAULT_NODE_SWITCH },
        homelab: null,
        access_points: []
      };
    } else if (type === "homelab") {
      nodes[index] = {
        ...node,
        switch: null,
        homelab: node.homelab || { ...DEFAULT_HOMELAB },
        access_points: []
      };
    } else {
      nodes[index] = {
        ...node,
        switch: null,
        homelab: null,
        access_points: node.access_points && node.access_points.length
          ? node.access_points
          : [{ ...DEFAULT_ACCESS_POINT }]
      };
    }
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _setPrimaryAp(index, apIndex, value) {
    const nodes = (this._config.nodes || []).map((node, i) => ({
      ...node,
      access_points: (node.access_points || []).map((ap, j) => ({
        ...ap,
        is_primary: i === index && j === apIndex ? value : false
      }))
    }));
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _renderApEditor(index) {
    const node = this._config.nodes[index] || DEFAULT_NODE;
    const isSwitchNode = !!node.switch;
    const isHomelabNode = !!node.homelab;

    if (isSwitchNode && this._editingSwitchApIndex !== null) {
      return html`
        <div class="form-section">
          ${this._renderApNodeFields(index, node, this._editingSwitchApIndex)}
        </div>
      `;
    }

    if (isSwitchNode && this._editingFedSwitchIndex !== null) {
      return html`
        <div class="form-section">
          ${this._renderFedSwitchFields(index, node, this._editingFedSwitchIndex)}
        </div>
      `;
    }

    if (isHomelabNode && this._editingContainerIndex !== null) {
      return html`
        <div class="form-section">
          ${this._renderContainerFields(index, node, this._editingContainerIndex)}
        </div>
      `;
    }

    return html`
      <div class="form-section">
        <div class="select-field">
          <label class="input-label">Node Type</label>
          <select
            class="native-select"
            .value=${isSwitchNode ? "switch" : isHomelabNode ? "homelab" : "ap"}
            @change=${(e) => this._setNodeType(index, e.target.value)}
          >
            <option value="ap">Access Point</option>
            <option value="switch">Switch</option>
            <option value="homelab">Homelab Server</option>
          </select>
        </div>

        ${this._renderInput("Node Name Override (Optional)", node.name, `nodes.${index}.name`)}

        ${isSwitchNode
          ? this._renderSwitchNodeFields(index, node)
          : isHomelabNode
          ? this._renderHomelabFields(index, node)
          : this._renderApNodeFields(index, node)}
      </div>
    `;
  }

  _renderSwitchNodeFields(index, node) {
    const sw = node.switch || DEFAULT_NODE_SWITCH;
    const prefix = `nodes.${index}.switch`;
    const c = sw.colors || {};

    return html`
      <div class="sub-header">Switch</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${sw.entity || ""}
        .label=${"Entity"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
        allow-custom-entity
      ></ha-entity-picker>

      ${this._renderInput("Name", sw.name, `${prefix}.name`)}

      <ha-icon-picker
        .label=${"Icon"}
        .value=${sw.icon || "mdi:switch"}
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

      ${this._renderPoeSection(sw.poe, `${prefix}.poe`)}

      <div class="sub-header">Access Points</div>
      <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">Access Points added here hang off this Switch's own connector line.</p>
      ${(node.access_points || []).map((ap, apIdx) => html`
        <div class="list-item">
          <div class="list-item-info">
            <ha-icon .icon=${ap.icon || "mdi:wifi"} style="color:var(--primary-color);"></ha-icon>
            <span>${ap.name || ap.entity || `AP ${apIdx + 1}`}</span>
          </div>
          <div class="list-item-actions">
            <ha-icon-button
              @click=${() => (this._editingSwitchApIndex = apIdx)}
              title="Edit"
            >
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button
              @click=${() => this._removeApFromSwitch(index, apIdx)}
              title="Delete"
            >
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addApToSwitch(index)}>
        + Add Access Point
      </button>

      <div class="sub-header">Fed Switches</div>
      <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
        Switches added here hang off this Switch too, in the same row as
        its Access Points - each a leaf with its own Connected Devices
        and PoE, connected with solid lines the whole way down.
      </p>
      ${(node.fed_switches || []).map((fedSw, fedIdx) => html`
        <div class="list-item">
          <div class="list-item-info">
            <ha-icon .icon=${fedSw.icon || "mdi:switch"} style="color:var(--primary-color);"></ha-icon>
            <span>${fedSw.name || fedSw.entity || `Switch ${fedIdx + 1}`}</span>
          </div>
          <div class="list-item-actions">
            <ha-icon-button
              @click=${() => (this._editingFedSwitchIndex = fedIdx)}
              title="Edit"
            >
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button
              @click=${() => this._removeFedSwitch(index, fedIdx)}
              title="Delete"
            >
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addFedSwitch(index)}>
        + Add Fed Switch
      </button>

      <div class="sub-header">Connected Devices</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${sw.entities?.connected_devices || ""}
        .label=${"Entity (Optional)"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
        allow-custom-entity
      ></ha-entity-picker>

      <ha-icon-picker
        .label=${"Icon"}
        .value=${sw.devices_icon || "mdi:devices"}
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
    `;
  }

  _addFedSwitch(nodeIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node) return;
    nodes[nodeIndex] = {
      ...node,
      fed_switches: [...(node.fed_switches || []), { ...DEFAULT_NODE_SWITCH }]
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _addContainer(nodeIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node || !node.homelab) return;
    nodes[nodeIndex] = {
      ...node,
      homelab: {
        ...node.homelab,
        containers: [...(node.homelab.containers || []), { ...DEFAULT_CONTAINER_BADGE }]
      }
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _removeContainer(nodeIndex, containerIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node || !node.homelab) return;
    nodes[nodeIndex] = {
      ...node,
      homelab: {
        ...node.homelab,
        containers: (node.homelab.containers || []).filter((_, i) => i !== containerIndex)
      }
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  // Every container entity already used as a badge, on ANY homelab
  // node - not just the one currently being edited - so the same
  // container can't accidentally end up added twice across two nodes.
  _existingContainerEntities() {
    const existing = new Set();
    (this._config.nodes || []).forEach((n) => {
      (n.homelab?.containers || []).forEach((c) => c.entity && existing.add(c.entity));
    });
    return existing;
  }

  _scanForPortainer() {
    this._discoveredPortainer = scanPortainerContainers(this.hass);
    this._discoveredPortainerSelected = new Set();
    this._portainerScanMessage = this._discoveredPortainer.length ? "" : "No Portainer containers found.";
    this.requestUpdate();
  }

  _togglePortainerSelection(entityId) {
    const set = new Set(this._discoveredPortainerSelected);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._discoveredPortainerSelected = set;
    this.requestUpdate();
  }

  _toggleSelectAllPortainer() {
    const existing = this._existingContainerEntities();
    const selectable = (this._discoveredPortainer || []).filter((c) => !existing.has(c.entity));
    const allSelected = selectable.length > 0 && selectable.every((c) => this._discoveredPortainerSelected.has(c.entity));
    this._discoveredPortainerSelected = allSelected ? new Set() : new Set(selectable.map((c) => c.entity));
    this.requestUpdate();
  }

  _addSelectedPortainer(nodeIndex) {
    const existing = this._existingContainerEntities();
    const toAdd = (this._discoveredPortainer || []).filter(
      (c) => this._discoveredPortainerSelected.has(c.entity) && !existing.has(c.entity)
    );
    if (!toAdd.length) return;

    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node || !node.homelab) return;

    const newContainers = toAdd.map((c) => ({
      ...DEFAULT_CONTAINER_BADGE,
      entity: c.entity,
      name: c.name,
      icon: "mdi:docker"
    }));

    nodes[nodeIndex] = {
      ...node,
      homelab: {
        ...node.homelab,
        containers: [...(node.homelab.containers || []), ...newContainers]
      }
    };

    this._config = { ...this._config, nodes };
    this._discoveredPortainerSelected = new Set();
    this._portainerScanMessage = `Added ${newContainers.length} container${newContainers.length === 1 ? "" : "s"}: ${newContainers
      .map((c) => c.name || c.entity)
      .join(", ")}`;
    this._fireChanged();
  }

  _renderDiscoveredPortainerList(nodeIndex) {
    const existing = this._existingContainerEntities();
    const list = this._discoveredPortainer || [];
    if (!list.length) {
      return html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No Portainer containers found.</p>`;
    }
    const selectable = list.filter((c) => !existing.has(c.entity));
    const allSelected = selectable.length > 0 && selectable.every((c) => this._discoveredPortainerSelected.has(c.entity));

    return html`
      <div class="toggle-row">
        <span>Select All (${selectable.length} available)</span>
        <ha-switch
          .checked=${allSelected}
          .disabled=${!selectable.length}
          @change=${() => this._toggleSelectAllPortainer()}
        ></ha-switch>
      </div>
      ${list.map((c) => {
        const already = existing.has(c.entity);
        const checked = this._discoveredPortainerSelected.has(c.entity);
        return html`
          <div class="list-item" style="opacity:${already ? 0.5 : 1}">
            <div class="list-item-info">
              <ha-icon icon="mdi:docker"></ha-icon>
              <span>${c.name || c.entity}</span>
            </div>
            ${already
              ? html`<span style="font-size:0.85em; color:var(--secondary-text-color);">Already added</span>`
              : html`
                  <ha-icon-button
                    @click=${() => this._togglePortainerSelection(c.entity)}
                    title=${checked ? "Deselect" : "Select"}
                  >
                    <ha-icon icon=${checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
                  </ha-icon-button>
                `}
          </div>
        `;
      })}
      <button class="add-btn" .disabled=${!this._discoveredPortainerSelected.size} @click=${() => this._addSelectedPortainer(nodeIndex)}>
        Add Selected (${this._discoveredPortainerSelected.size})
      </button>
    `;
  }

  _removeFedSwitch(nodeIndex, fedIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node) return;
    nodes[nodeIndex] = {
      ...node,
      fed_switches: (node.fed_switches || []).filter((_, i) => i !== fedIndex)
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  // Fields for a single fed Switch (a leaf Switch hanging off a node's
  // own Switch, alongside its Access Points). Deliberately a subset of
  // _renderSwitchNodeFields - no Access Points/Fed Switches list of
  // its own, since fed switches don't feed further children.
  _renderFedSwitchFields(nodeIndex, node, fedIndex) {
    const sw = node.fed_switches?.[fedIndex] || DEFAULT_NODE_SWITCH;
    const prefix = `nodes.${nodeIndex}.fed_switches.${fedIndex}`;
    const c = sw.colors || {};

    return html`
      <div class="sub-header">Switch</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${sw.entity || ""}
        .label=${"Entity"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
        allow-custom-entity
      ></ha-entity-picker>

      ${this._renderInput("Name", sw.name, `${prefix}.name`)}

      <ha-icon-picker
        .label=${"Icon"}
        .value=${sw.icon || "mdi:switch"}
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

      <div class="sub-header">Connected Devices</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${sw.entities?.connected_devices || ""}
        .label=${"Entity (Optional)"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
        allow-custom-entity
      ></ha-entity-picker>

      <ha-icon-picker
        .label=${"Icon"}
        .value=${sw.devices_icon || "mdi:devices"}
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

      ${this._renderPoeSection(sw.poe, `${prefix}.poe`)}

      <div class="sub-header">Connected Devices</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${sw.entities?.connected_devices || ""}
        .label=${"Entity (Optional)"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
        allow-custom-entity
      ></ha-entity-picker>

      <ha-icon-picker
        .label=${"Icon"}
        .value=${sw.devices_icon || "mdi:devices"}
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
    `;
  }

  // Homelab node fields: like a Switch's own fields (entity, icon,
  // colors, Connected Devices), plus PoE and a Containers/VMs list -
  // one status badge per tracked container/VM. DNS Filtering, VPN,
  // Firewall, and Reverse Proxy are configured on the Security page
  // and can each be targeted at this node from there.
  _renderHomelabFields(index, node) {
    const hl = node.homelab || DEFAULT_HOMELAB;
    const prefix = `nodes.${index}.homelab`;
    const c = hl.colors || {};

    return html`
      <div class="sub-header">Homelab Server</div>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${hl.entity || ""}
        .label=${"Entity"}
        @value-changed=${(e) => this._valueChanged(e, `${prefix}.entity`)}
        allow-custom-entity
      ></ha-entity-picker>

      ${this._renderInput("Name", hl.name, `${prefix}.name`)}

      <ha-icon-picker
        .label=${"Icon"}
        .value=${hl.icon || "mdi:server"}
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

      ${this._renderPoeSection(hl.poe, `${prefix}.poe`)}

      <div class="sub-header">Containers / VMs</div>
      <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
        One status badge per tracked container or VM (e.g. Plex,
        Nextcloud, a Proxmox LXC) - each independently positioned
        around this circle.
      </p>
      ${(hl.containers || []).map((container, ci) => html`
        <div class="list-item">
          <div class="list-item-info">
            <ha-icon .icon=${container.icon || "mdi:docker"} style="color:var(--primary-color);"></ha-icon>
            <span>${container.name || container.entity || `Container ${ci + 1}`}</span>
          </div>
          <div class="list-item-actions">
            <ha-icon-button
              @click=${() => (this._editingContainerIndex = ci)}
              title="Edit"
            >
              <ha-icon icon="mdi:pencil"></ha-icon>
            </ha-icon-button>
            <ha-icon-button
              @click=${() => this._removeContainer(index, ci)}
              title="Delete"
            >
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${() => this._addContainer(index)}>
        + Add Container / VM
      </button>

      <div class="sub-header">Auto-Discovery (Portainer)</div>
      <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
        Scans for Docker containers reporting through Portainer and
        lets you add the ones you want as badges on this node. Already
        added containers (on this node or any other) show as
        unavailable to select again.
      </p>
      <button class="add-btn" @click=${() => this._scanForPortainer()}>
        Scan for Portainer
      </button>
      ${this._portainerScanMessage
        ? html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:4px 0 8px;">${this._portainerScanMessage}</p>`
        : null}
      ${this._discoveredPortainer !== null ? this._renderDiscoveredPortainerList(index) : null}

      <div class="sub-header">Connected Devices</div>
      <div class="toggle-row">
        <span>Show connection to Connected/Clients</span>
        <ha-switch
          .checked=${hl.show_devices_line !== false}
          @change=${(e) => this._valueChanged(e, `${prefix}.show_devices_line`)}
        ></ha-switch>
      </div>
      <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
        Most Homelab nodes have nothing hanging directly off them -
        turn this off to hide the line down to Connected Devices and
        the shared Clients box entirely.
      </p>

      ${hl.show_devices_line !== false
        ? html`
            <ha-entity-picker
              .hass=${this.hass}
              .value=${hl.entities?.connected_devices || ""}
              .label=${"Entity (Optional)"}
              @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.connected_devices`)}
              allow-custom-entity
            ></ha-entity-picker>

            <ha-icon-picker
              .label=${"Icon"}
              .value=${hl.devices_icon || "mdi:devices"}
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
          `
        : null}
    `;
  }

  _addApToSwitch(nodeIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node) return;
    nodes[nodeIndex] = {
      ...node,
      access_points: [...(node.access_points || []), { ...DEFAULT_ACCESS_POINT }]
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _removeApFromSwitch(nodeIndex, apIndex) {
    const nodes = [...(this._config.nodes || [])];
    const node = nodes[nodeIndex];
    if (!node) return;
    nodes[nodeIndex] = {
      ...node,
      access_points: (node.access_points || []).filter((_, i) => i !== apIndex)
    };
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _renderApNodeFields(index, node, apIndex = 0) {
    const ap = node.access_points?.[apIndex] || DEFAULT_ACCESS_POINT;
    const prefix = `nodes.${index}.access_points.${apIndex}`;
    const c = ap.colors || {};

    return html`
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
            @change=${(e) => this._setPrimaryAp(index, apIndex, e.target.checked)}
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
                    ${this._renderLocationSelect(ap.primary_badge_location, `${prefix}.primary_badge_location`)}
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

        ${this._renderPoeSection(ap.poe, `${prefix}.poe`)}

        <div class="sub-header">IP Addressing</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Shown only when Advanced > Layout > Show IP Addressing is on.
          IP Address renders centered above this circle.
        </p>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${ap.entities?.ip_address || ""}
          .label=${"IP Address Entity"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.ip_address`)}
          allow-custom-entity
        ></ha-entity-picker>
        ${ap.is_primary
          ? html`
              <ha-entity-picker
                .hass=${this.hass}
                .value=${ap.entities?.wan_ip || ""}
                .label=${"WAN Address Entity (if this AP is your router)"}
                @value-changed=${(e) => this._valueChanged(e, `${prefix}.entities.wan_ip`)}
                allow-custom-entity
              ></ha-entity-picker>
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
                Only relevant if this AP doubles as your router/gateway
                with no separate Router node - renders centered below
                the Internet circle, same spot the Router's own WAN
                badge would use.
              </p>
            `
          : null}
        <div class="two-col">
          <div>${this._renderColorInput("Badge Background", ap.ip_badge_color, `${prefix}.ip_badge_color`)}</div>
          <div>${this._renderColorInput("Badge Icon Color", ap.ip_badge_icon_color, `${prefix}.ip_badge_icon_color`)}</div>
        </div>

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
    `;
  }

  _addAp() {
    const nodes = [
      ...(this._config.nodes || []),
      { ...DEFAULT_NODE, access_points: [{ ...DEFAULT_ACCESS_POINT }] }
    ];
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _removeAp(idx) {
    const nodes = (this._config.nodes || []).filter((_, i) => i !== idx);
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  _moveAp(idx, direction) {
    const nodes = [...(this._config.nodes || [])];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= nodes.length) return;
    [nodes[idx], nodes[newIdx]] = [nodes[newIdx], nodes[idx]];
    this._config = { ...this._config, nodes };
    this._fireChanged();
  }

  // --- Auto-Discovery actions (TP-Link + Speedtest) -------------------

  _scanForInternet() {
    this._discoveredSpeedtestServices = scanSpeedtestIntegration(this.hass);
    this._internetScanMessage = this._discoveredSpeedtestServices.length
      ? ""
      : "No Speedtest.net or Ookla Speedtest entities found.";
    this.requestUpdate();
  }

  _selectSpeedtestService(svc) {
    const internet = this._config.internet || {};
    const incoming = { name: svc.isp, ping: svc.ping, jitter: svc.jitter, download: svc.download, upload: svc.upload };
    const existing = {
      name: internet.name,
      ping: internet.entities?.ping,
      jitter: internet.entities?.jitter,
      download: internet.entities?.download,
      upload: internet.entities?.upload
    };
    const conflicts = findFieldConflicts(existing, incoming);
    if (conflicts.length && !window.confirm(`Overwrite your existing ${conflicts.join(", ")} with values from ${svc.name}?`)) {
      return;
    }

    this._config = {
      ...this._config,
      internet: {
        ...internet,
        name: svc.isp || internet.name,
        entities: {
          ...internet.entities,
          ping: svc.ping || internet.entities?.ping,
          jitter: svc.jitter || internet.entities?.jitter,
          download: svc.download || internet.entities?.download,
          upload: svc.upload || internet.entities?.upload
        }
      }
    };
    this._internetScanMessage = `Applied ${svc.name}.`;
    this._fireChanged();
  }

  _renderDiscoveredSpeedtestList() {
    const list = this._discoveredSpeedtestServices || [];
    if (!list.length) {
      return html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    return html`
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${list.map((svc) => {
          const found = [
            svc.ping && "Ping",
            svc.jitter && "Jitter",
            svc.download && "Download",
            svc.upload && "Upload",
            svc.isp && `ISP: ${svc.isp}`
          ].filter(Boolean);
          return html`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon icon="mdi:speedometer"></ha-icon>
                <div>
                  <div>${svc.name}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${SPEEDTEST_PLATFORM_LABELS[svc.platform] || svc.platform}${found.length ? " · " + found.join(", ") : " · no matching fields"}
                  </div>
                </div>
              </div>
              <button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectSpeedtestService(svc)}>
                Select
              </button>
            </div>
          `;
        })}
      </div>
    `;
  }

  _scanForIsp() {
    this._discoveredIspServices = scanIspIntegration(this.hass);
    this._ispScanMessage = this._discoveredIspServices.length
      ? ""
      : "No Aussie Broadband, Starlink, or Start.ca entities found.";
    this.requestUpdate();
  }

  _selectIspService(svc) {
    const internet = this._config.internet || {};
    const incoming = {
      entity: svc.connected,
      billing_total: svc.billingTotal,
      billing_remaining: svc.billingRemaining,
      total_download: svc.totalDownload,
      total_upload: svc.totalUpload
    };
    const existing = {
      entity: internet.entity,
      billing_total: internet.entities?.billing_total,
      billing_remaining: internet.entities?.billing_remaining,
      total_download: internet.entities?.total_download,
      total_upload: internet.entities?.total_upload
    };
    const conflicts = findFieldConflicts(existing, incoming);
    if (conflicts.length && !window.confirm(`Overwrite your existing ${conflicts.join(", ")} with values from ${svc.name}?`)) {
      return;
    }

    this._config = {
      ...this._config,
      internet: {
        ...internet,
        entity: svc.connected || internet.entity,
        entities: {
          ...internet.entities,
          billing_total: svc.billingTotal || internet.entities?.billing_total,
          billing_remaining: svc.billingRemaining || internet.entities?.billing_remaining,
          total_download: svc.totalDownload || internet.entities?.total_download,
          total_upload: svc.totalUpload || internet.entities?.total_upload
        }
      }
    };
    this._ispScanMessage = `Applied ${svc.name}.`;
    this._fireChanged();
  }

  _renderDiscoveredIspList() {
    const list = this._discoveredIspServices || [];
    if (!list.length) {
      return html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    return html`
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${list.map((svc) => {
          const found = [
            svc.connected && "Connected",
            svc.billingTotal && "Billing total",
            svc.billingRemaining && "Billing remaining",
            svc.totalDownload && "Downloaded",
            svc.totalUpload && "Uploaded"
          ].filter(Boolean);
          return html`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon icon="mdi:account-network"></ha-icon>
                <div>
                  <div>${svc.name}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${ISP_PLATFORM_LABELS[svc.platform] || svc.platform}${found.length ? " · " + found.join(", ") : " · no matching fields"}
                  </div>
                </div>
              </div>
              <button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectIspService(svc)}>
                Select
              </button>
            </div>
          `;
        })}
      </div>
    `;
  }

  _scanForAdGuard() {
    this._discoveredAdGuard = scanAdGuardIntegration(this.hass);
    this._adguardScanMessage = this._discoveredAdGuard.length ? "" : "No AdGuard Home entities found.";
    this.requestUpdate();
  }

  _selectAdGuardService(candidate) {
    const incoming = { dns_entity: candidate.entity };
    const existing = { dns_entity: this._config.dns_entity };
    const conflicts = findFieldConflicts(existing, incoming);
    if (conflicts.length && !window.confirm(`Overwrite your existing DNS Filtering entity with values from ${candidate.name}?`)) {
      return;
    }

    this._config = {
      ...this._config,
      dns_entity: candidate.entity || this._config.dns_entity
    };
    this._adguardScanMessage = `DNS Filtering entity set from ${candidate.name}.`;
    this._fireChanged();
  }

  _renderDiscoveredAdGuardList() {
    const list = this._discoveredAdGuard || [];
    if (!list.length) {
      return html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching entities found.</p>`;
    }
    const current = this._config.dns_entity;
    return html`
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${list.map((c) => {
          const isCurrent = !!c.entity && c.entity === current;
          return html`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon icon="mdi:shield-check"></ha-icon>
                <div>
                  <div>${c.name}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${c.entity ? `Blocked: ${c.entity}` : "No queries-blocked sensor found"}
                  </div>
                </div>
              </div>
              ${isCurrent
                ? html`<span style="font-size:0.85em; color:var(--secondary-text-color);">Selected</span>`
                : html`
                    <button class="add-btn" style="margin:0; white-space:nowrap;" .disabled=${!c.entity} @click=${() => this._selectAdGuardService(c)}>
                      Select
                    </button>
                  `}
            </div>
          `;
        })}
      </div>
    `;
  }

  _scanForRouter() {
    const tplinkResult = scanTplinkDevices(this.hass);
    const openwrtResult = scanOpenWrtIntegration(this.hass);
    const candidates = [...tplinkResult.routerCandidates];
    if (openwrtResult.routerCandidate) candidates.push(openwrtResult.routerCandidate);

    this._discoveredRouters = candidates;
    this._routerScanMessage = candidates.length ? "" : "No TP-Link Router, Deco master unit, or OpenWrt (LuCI) router found.";
    this.requestUpdate();
  }

  _selectDiscoveredRouter(candidate) {
    const current = this._config.router || {};
    const lan = this._config.lan || {};
    const incoming = {
      entity: candidate.entity,
      name: candidate.name,
      lan_entity: candidate.lanEntity,
      wan_ip: candidate.wanIpEntity,
      lan_ip: candidate.lanIpEntity
    };
    const existing = {
      entity: current.entity,
      name: current.name,
      lan_entity: lan.entity,
      wan_ip: current.entities?.wan_ip,
      lan_ip: current.entities?.lan_ip
    };
    const conflicts = findFieldConflicts(existing, incoming);
    if (
      conflicts.length &&
      !window.confirm(`Overwrite your existing Router ${conflicts.join(", ")} with values from ${candidate.name || candidate.entity}?`)
    ) {
      return;
    }

    this._config = {
      ...this._config,
      router: {
        ...current,
        entity: candidate.entity || current.entity,
        name: candidate.name || current.name,
        entities: {
          ...current.entities,
          wan_ip: candidate.wanIpEntity || current.entities?.wan_ip,
          lan_ip: candidate.lanIpEntity || current.entities?.lan_ip
        }
      },
      lan: {
        ...lan,
        entity: candidate.lanEntity || lan.entity
      }
    };
    this._routerScanMessage = `Router set to ${candidate.name || candidate.entity}.`;
    this._fireChanged();
  }

  _renderDiscoveredRoutersList() {
    const list = this._discoveredRouters || [];
    if (!list.length) {
      return html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No TP-Link Router or Deco master unit found.</p>`;
    }
    const sourceLabel = { tplink_deco: "TP-Link Deco (master)", tplink_router: "TP-Link Router", luci: "OpenWrt (LuCI)" };
    const current = this._config.router?.entity;

    return html`
      <div style="border:0.5px solid var(--divider-color); border-radius:8px; overflow:hidden; margin-bottom:8px;">
        ${list.map((c) => {
          const isCurrent = c.entity === current;
          return html`
            <div class="list-item" style="${isCurrent ? 'background:var(--accent-color); background:rgba(var(--rgb-accent-color, 3,169,244),0.1);' : ''}">
              <div class="list-item-info">
                <ha-icon icon="mdi:router-network"></ha-icon>
                <div>
                  <div>${c.name || c.entity}</div>
                  <div style="font-size:0.8em; color:var(--secondary-text-color);">
                    ${sourceLabel[c.source] || c.source} · ${c.entity}
                    ${c.lanEntity ? html` · LAN: ${c.lanEntity}` : null}
                    ${c.wanIpEntity ? html` · WAN IP: ${c.wanIpEntity}` : null}
                    ${c.lanIpEntity ? html` · LAN IP: ${c.lanIpEntity}` : null}
                  </div>
                </div>
              </div>
              ${isCurrent
                ? html`<span style="font-size:0.85em; color:var(--secondary-text-color);">Selected</span>`
                : html`
                    <button class="add-btn" style="margin:0; white-space:nowrap;" @click=${() => this._selectDiscoveredRouter(c)}>
                      Select
                    </button>
                  `}
            </div>
          `;
        })}
      </div>
    `;
  }

  _scanForNodes() {
    const result = scanTplinkDevices(this.hass);
    this._discoveredNodes = result.nodes;
    this._discoveredNodesSelected = new Set();
    this._discoveredNodesPage = 0;
    this._nodeScanMessage = result.nodes.length ? "" : "No TP-Link Deco satellite units found.";
    this.requestUpdate();
  }

  _existingNodeEntities() {
    const existing = new Set();
    (this._config.nodes || []).forEach((n) => {
      (n.access_points || []).forEach((ap) => ap.entity && existing.add(ap.entity));
    });
    if (this._config.router?.entity) existing.add(this._config.router.entity);
    return existing;
  }

  _toggleNodeSelection(entityId) {
    const set = new Set(this._discoveredNodesSelected);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._discoveredNodesSelected = set;
    this.requestUpdate();
  }

  _toggleSelectAllNodes() {
    const existing = this._existingNodeEntities();
    const selectable = (this._discoveredNodes || []).filter((n) => !existing.has(n.entity));
    const allSelected = selectable.length > 0 && selectable.every((n) => this._discoveredNodesSelected.has(n.entity));
    this._discoveredNodesSelected = allSelected ? new Set() : new Set(selectable.map((n) => n.entity));
    this.requestUpdate();
  }

  _addSelectedNodes() {
    const existing = this._existingNodeEntities();
    const toAdd = (this._discoveredNodes || []).filter(
      (n) => this._discoveredNodesSelected.has(n.entity) && !existing.has(n.entity)
    );
    if (!toAdd.length) return;

    const newNodes = toAdd.map((n) => ({
      ...DEFAULT_NODE,
      name: n.name,
      switch: null,
      access_points: [
        {
          ...DEFAULT_ACCESS_POINT,
          entity: n.entity,
          name: n.name,
          icon: "mdi:wifi",
          is_primary: !!n.isMaster,
          entities: {
            ...DEFAULT_ACCESS_POINT.entities,
            connected_devices: n.connectedDevices,
            download: n.download,
            upload: n.upload,
            backhaul_type: n.backhaulType,
            backhaul_speed: n.backhaulSpeed,
            ip_address: n.ipAddress
          }
        }
      ]
    }));

    this._config = { ...this._config, nodes: [...(this._config.nodes || []), ...newNodes] };
    this._discoveredNodesSelected = new Set();
    this._nodeScanMessage = `Added ${newNodes.length} node${newNodes.length === 1 ? "" : "s"}: ${newNodes
      .map((n) => n.name || n.access_points[0].entity)
      .join(", ")}`;
    this._fireChanged();
  }

  // Shared pager controls for the discovered-devices and
  // discovered-nodes lists - 10 items per page.
  _renderPager(page, totalItems, perPage, onPage) {
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    if (totalPages <= 1) return null;
    return html`
      <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin:8px 0;">
        <ha-icon-button
          .disabled=${page <= 0}
          @click=${() => onPage(page - 1)}
          title="Previous page"
        >
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </ha-icon-button>
        <span style="font-size:0.9em; color:var(--secondary-text-color);">Page ${page + 1} of ${totalPages}</span>
        <ha-icon-button
          .disabled=${page >= totalPages - 1}
          @click=${() => onPage(page + 1)}
          title="Next page"
        >
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </ha-icon-button>
      </div>
    `;
  }

  _renderDiscoveredNodesList() {
    const existing = this._existingNodeEntities();
    const list = this._discoveredNodes || [];
    if (!list.length) {
      return html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching TP-Link Deco units found.</p>`;
    }
    const selectable = list.filter((n) => !existing.has(n.entity));
    const allSelected = selectable.length > 0 && selectable.every((n) => this._discoveredNodesSelected.has(n.entity));

    const perPage = 10;
    const page = Math.min(this._discoveredNodesPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return html`
      <div class="toggle-row">
        <span>Select All (${selectable.length} available)</span>
        <ha-switch
          .checked=${allSelected}
          .disabled=${!selectable.length}
          @change=${() => this._toggleSelectAllNodes()}
        ></ha-switch>
      </div>
      ${pageItems.map((n) => {
        const already = existing.has(n.entity);
        const checked = this._discoveredNodesSelected.has(n.entity);
        return html`
          <div class="list-item" style="opacity:${already ? 0.5 : 1}">
            <div class="list-item-info">
              <ha-icon icon="mdi:wifi"></ha-icon>
              <span>${n.name || n.entity}${n.isMaster ? html` <span style="color:var(--secondary-text-color); font-size:0.85em;">(Master · will default to Primary AP)</span>` : null}</span>
            </div>
            ${already
              ? html`<span style="font-size:0.85em; color:var(--secondary-text-color);">Already added</span>`
              : html`
                  <ha-icon-button
                    @click=${() => this._toggleNodeSelection(n.entity)}
                    title=${checked ? "Deselect" : "Select"}
                  >
                    <ha-icon icon=${checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
                  </ha-icon-button>
                `}
          </div>
        `;
      })}
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredNodesPage = p;
        this.requestUpdate();
      })}
      <button class="add-btn" .disabled=${!this._discoveredNodesSelected.size} @click=${() => this._addSelectedNodes()}>
        Add Selected (${this._discoveredNodesSelected.size})
      </button>
    `;
  }

  _existingHomelabEntities() {
    const existing = new Set();
    (this._config.nodes || []).forEach((n) => {
      if (n.homelab?.entity) existing.add(n.homelab.entity);
    });
    return existing;
  }

  _scanForProxmox() {
    this._discoveredProxmox = scanProxmoxIntegration(this.hass);
    this._discoveredProxmoxSelected = new Set();
    this._proxmoxScanMessage = this._discoveredProxmox.length ? "" : "No Proxmox VE nodes found.";
    this.requestUpdate();
  }

  _toggleProxmoxSelection(entityId) {
    const set = new Set(this._discoveredProxmoxSelected);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._discoveredProxmoxSelected = set;
    this.requestUpdate();
  }

  _toggleSelectAllProxmox() {
    const existing = this._existingHomelabEntities();
    const selectable = (this._discoveredProxmox || []).filter((n) => !existing.has(n.entity));
    const allSelected = selectable.length > 0 && selectable.every((n) => this._discoveredProxmoxSelected.has(n.entity));
    this._discoveredProxmoxSelected = allSelected ? new Set() : new Set(selectable.map((n) => n.entity));
    this.requestUpdate();
  }

  _addSelectedProxmox() {
    const existing = this._existingHomelabEntities();
    const toAdd = (this._discoveredProxmox || []).filter(
      (n) => this._discoveredProxmoxSelected.has(n.entity) && !existing.has(n.entity)
    );
    if (!toAdd.length) return;

    const newNodes = toAdd.map((n) => ({
      ...DEFAULT_NODE,
      name: n.name,
      switch: null,
      homelab: {
        ...DEFAULT_HOMELAB,
        entity: n.entity,
        name: n.name,
        containers: n.containers.map((c) => ({
          ...DEFAULT_CONTAINER_BADGE,
          entity: c.entity,
          name: c.name,
          icon: c.kind === "VM" ? "mdi:desktop-tower" : "mdi:docker"
        }))
      },
      access_points: []
    }));

    this._config = { ...this._config, nodes: [...(this._config.nodes || []), ...newNodes] };
    this._discoveredProxmoxSelected = new Set();
    this._proxmoxScanMessage = `Added ${newNodes.length} node${newNodes.length === 1 ? "" : "s"}: ${newNodes
      .map((n) => n.name || n.homelab.entity)
      .join(", ")}`;
    this._fireChanged();
  }

  _renderDiscoveredProxmoxList() {
    const existing = this._existingHomelabEntities();
    const list = this._discoveredProxmox || [];
    if (!list.length) {
      return html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No Proxmox VE nodes found.</p>`;
    }
    const selectable = list.filter((n) => !existing.has(n.entity));
    const allSelected = selectable.length > 0 && selectable.every((n) => this._discoveredProxmoxSelected.has(n.entity));

    return html`
      <div class="toggle-row">
        <span>Select All (${selectable.length} available)</span>
        <ha-switch
          .checked=${allSelected}
          .disabled=${!selectable.length}
          @change=${() => this._toggleSelectAllProxmox()}
        ></ha-switch>
      </div>
      ${list.map((n) => {
        const already = existing.has(n.entity);
        const checked = this._discoveredProxmoxSelected.has(n.entity);
        return html`
          <div class="list-item" style="opacity:${already ? 0.5 : 1}">
            <div class="list-item-info">
              <ha-icon icon="mdi:server"></ha-icon>
              <div>
                <div>${n.name || n.entity}</div>
                <div style="font-size:0.8em; color:var(--secondary-text-color);">
                  ${n.containers.length} container${n.containers.length === 1 ? "" : "s"}/VM(s) found
                </div>
              </div>
            </div>
            ${already
              ? html`<span style="font-size:0.85em; color:var(--secondary-text-color);">Already added</span>`
              : html`
                  <ha-icon-button
                    @click=${() => this._toggleProxmoxSelection(n.entity)}
                    title=${checked ? "Deselect" : "Select"}
                  >
                    <ha-icon icon=${checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
                  </ha-icon-button>
                `}
          </div>
        `;
      })}
      <button class="add-btn" .disabled=${!this._discoveredProxmoxSelected.size} @click=${() => this._addSelectedProxmox()}>
        Add Selected (${this._discoveredProxmoxSelected.size})
      </button>
    `;
  }

  _scanIndividualDevices() {
    const tplinkResult = scanTplinkDevices(this.hass);
    const openwrtResult = scanOpenWrtIntegration(this.hass);
    this._discoveredDevices = [...tplinkResult.individualDevices, ...openwrtResult.clients];
    this._discoveredSelected = new Set();
    this._discoveredDevicesPage = 0;
    this._discoveredDevicesFilter = "";
    this.requestUpdate();
  }

  _toggleDiscoveredSelection(entityId) {
    const set = new Set(this._discoveredSelected);
    if (set.has(entityId)) set.delete(entityId);
    else set.add(entityId);
    this._discoveredSelected = set;
    this.requestUpdate();
  }

  _toggleSelectAllDiscovered() {
    const existing = new Set((this._config.individual_devices || []).map((d) => d.entity));
    const selectable = (this._discoveredDevices || []).filter((d) => !existing.has(d.entity));
    const allSelected = selectable.length > 0 && selectable.every((d) => this._discoveredSelected.has(d.entity));
    this._discoveredSelected = allSelected ? new Set() : new Set(selectable.map((d) => d.entity));
    this.requestUpdate();
  }

  _addSelectedDiscovered() {
    const existing = new Set((this._config.individual_devices || []).map((d) => d.entity));
    const toAdd = (this._discoveredDevices || [])
      .filter((d) => this._discoveredSelected.has(d.entity) && !existing.has(d.entity))
      .map((d) => ({ ...DEFAULT_INDIVIDUAL_DEVICE, entity: d.entity, name: d.name || "" }));
    if (!toAdd.length) return;
    this._config = { ...this._config, individual_devices: [...(this._config.individual_devices || []), ...toAdd] };
    this._discoveredSelected = new Set();
    this._fireChanged();
  }

  _renderDiscoveredDevicesList() {
    const existing = new Set((this._config.individual_devices || []).map((d) => d.entity));
    const all = this._discoveredDevices || [];
    if (!all.length) {
      return html`<p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 12px;">No matching TP-Link entities found.</p>`;
    }

    const sourceLabel = { tplink_deco: "TP-Link Deco", tplink_router: "TP-Link Router", luci: "OpenWrt (LuCI)" };
    const sources = [...new Set(all.map((d) => d.source))];
    const activeFilter = this._discoveredDevicesFilter || "";
    const list = activeFilter ? all.filter((d) => d.source === activeFilter) : all;

    const selectable = list.filter((d) => !existing.has(d.entity));
    const allSelected = selectable.length > 0 && selectable.every((d) => this._discoveredSelected.has(d.entity));

    const perPage = 10;
    const page = Math.min(this._discoveredDevicesPage, Math.max(0, Math.ceil(list.length / perPage) - 1));
    const pageItems = list.slice(page * perPage, page * perPage + perPage);

    return html`
      ${sources.length > 1
        ? html`
            <div class="toggle-row">
              <span>Filter by integration</span>
              <select
                style="padding:6px 8px; border-radius:6px; border:0.5px solid var(--divider-color); background:var(--card-background-color); color:var(--primary-text-color);"
                .value=${activeFilter}
                @change=${(e) => {
                  this._discoveredDevicesFilter = e.target.value;
                  this._discoveredDevicesPage = 0;
                  this._discoveredSelected = new Set();
                  this.requestUpdate();
                }}
              >
                <option value="">All (${all.length})</option>
                ${sources.map(
                  (s) => html`<option value=${s}>${sourceLabel[s] || s} (${all.filter((d) => d.source === s).length})</option>`
                )}
              </select>
            </div>
          `
        : null}
      <div class="toggle-row">
        <span>Select All (${selectable.length} available)</span>
        <ha-switch
          .checked=${allSelected}
          .disabled=${!selectable.length}
          @change=${() => this._toggleSelectAllDiscovered()}
        ></ha-switch>
      </div>
      ${pageItems.map((d) => {
        const already = existing.has(d.entity);
        const checked = this._discoveredSelected.has(d.entity);
        return html`
          <div class="list-item" style="opacity:${already ? 0.5 : 1}">
            <div class="list-item-info">
              <ha-icon icon="mdi:devices"></ha-icon>
              <span>${d.name} <span style="color:var(--secondary-text-color); font-size:0.85em;">(${sourceLabel[d.source] || d.source})</span></span>
            </div>
            ${already
              ? html`<span style="font-size:0.85em; color:var(--secondary-text-color);">Already added</span>`
              : html`
                  <ha-icon-button
                    @click=${() => this._toggleDiscoveredSelection(d.entity)}
                    title=${checked ? "Deselect" : "Select"}
                  >
                    <ha-icon icon=${checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
                  </ha-icon-button>
                `}
          </div>
        `;
      })}
      ${this._renderPager(page, list.length, perPage, (p) => {
        this._discoveredDevicesPage = p;
        this.requestUpdate();
      })}
      <button class="add-btn" .disabled=${!this._discoveredSelected.size} @click=${() => this._addSelectedDiscovered()}>
        Add Selected (${this._discoveredSelected.size})
      </button>
    `;
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
        ${this._renderInput(
          "Box Border Radius",
          this._config.individual_devices_box_radius,
          "individual_devices_box_radius"
        )}

        <div class="sub-header">Grouping</div>
        <div class="select-field">
          <label class="input-label">Group By</label>
          <select
            class="native-select"
            .value=${this._config.individual_devices_group_by || "none"}
            @change=${(e) => this._handleSelectChange(e, "individual_devices_group_by")}
          >
            <option value="none">None</option>
            <option value="ssid">SSID</option>
            <option value="vlan">VLAN</option>
            <option value="ap">Connected AP</option>
          </select>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Splits the box into labeled sub-groups. A wired device (its
          entity's "connection" attribute is "wired") always groups as
          "Wired". <strong>SSID</strong> groups by network name (TP-Link
          Deco's "interface" attribute, or UniFi's "essid" - UniFi's
          "is_guest" always groups as "Guest" regardless of the actual
          SSID name). <strong>VLAN</strong> groups by UniFi's numeric
          "vlan" attribute when present (even for a guest client on a
          specific VLAN), falling back to "Guest" if there's no VLAN
          but "is_guest" is true, then to Deco's "interface".
          <strong>Connected AP</strong> groups by Deco's "deco_device"
          (a friendly name) or UniFi's "ap_mac" (a MAC address, since
          UniFi doesn't expose a friendly AP name here). Anything
          missing the relevant attribute falls into "Unknown". Override
          any individual device's group on its own page below.
        </p>

        ${this._config.individual_devices_group_by && this._config.individual_devices_group_by !== "none"
          ? html`
              <div class="select-field">
                <label class="input-label">Sub-Group Width</label>
                <select
                  class="native-select"
                  .value=${this._config.individual_devices_group_layout || "widest_fits"}
                  @change=${(e) => this._handleSelectChange(e, "individual_devices_group_layout")}
                >
                  <option value="gaps">Fit content, fill gaps between boxes</option>
                  <option value="last_fill">Fit content, last box fills remaining space</option>
                  <option value="widest_fits">Widest box fits content, others share the rest</option>
                </select>
              </div>

              ${this._renderInput(
                "Group Box Border Radius",
                this._config.individual_devices_group_box_radius,
                "individual_devices_group_box_radius"
              )}

              <div class="toggle-row">
                <span>Show Sub-Group Outlines</span>
                <ha-switch
                  .checked=${this._config.individual_devices_group_show_border !== false}
                  @change=${(e) => this._valueChanged(e, "individual_devices_group_show_border")}
                ></ha-switch>
              </div>
              ${this._config.individual_devices_group_show_border !== false
                ? html`
                    ${this._renderColorInput(
                      "Default Sub-Group Outline Color",
                      this._config.individual_devices_group_border_color,
                      "individual_devices_group_border_color"
                    )}

                    <p style="color:var(--secondary-text-color); font-size:0.9em; margin:8px 0;">
                      Per-group color overrides - the Name must match a
                      sub-group's label exactly as it appears on the
                      diagram (e.g. "Wired", "Guest", "VLAN 20"). Any
                      group without a matching override uses the
                      default color above.
                    </p>
                    ${(this._config.individual_devices_group_colors || []).map((override, i) => html`
                      <div style="display:flex; align-items:flex-end; gap:8px; margin-bottom:4px;">
                        <div style="flex:1;">${this._renderInput("Group Name", override.name, `individual_devices_group_colors.${i}.name`)}</div>
                        <div style="flex:1;">${this._renderColorInput("Color", override.color, `individual_devices_group_colors.${i}.color`)}</div>
                        <ha-icon-button
                          @click=${() => this._removeGroupColorOverride(i)}
                          title="Delete"
                        >
                          <ha-icon icon="mdi:delete"></ha-icon>
                        </ha-icon-button>
                      </div>
                    `)}
                    <button class="add-btn" @click=${() => this._addGroupColorOverride()}>
                      + Add Group Color Override
                    </button>
                  `
                : null}
            `
          : null}

        <div class="sub-header">Guest Network Badge</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Shown automatically on any device whose entity reports it's on
          a guest network (TP-Link Deco's "interface" attribute, or the
          UniFi integration's "is_guest" attribute). Applies to every
          Client - no per-device setup needed.
        </p>
        <ha-icon-picker
          .label=${"Icon"}
          .value=${this._config.individual_device_guest_icon || "mdi:account-question"}
          @value-changed=${(e) => this._valueChanged(e, "individual_device_guest_icon")}
        ></ha-icon-picker>
        ${this._renderColorInput(
          "Icon Color",
          this._config.individual_device_guest_icon_color,
          "individual_device_guest_icon_color"
        )}
        ${this._renderColorInput(
          "Badge Background Color",
          this._config.individual_device_guest_icon_bg,
          "individual_device_guest_icon_bg"
        )}

        <div class="sub-header">Devices</div>
        ${devs.map(
          (dev, idx) => html`
            <div class="list-item">
              <div class="list-item-info">
                <ha-icon .icon=${dev.icon || "mdi:devices"} style="color:var(--primary-color);"></ha-icon>
                <span>${dev.name || dev.entity || `Device ${idx + 1}`}</span>
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
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="add-btn" style="flex:1;" @click=${() => this._addDev()}>
            + Add Client (${devs.length})
          </button>
          ${devs.length
            ? html`
                <button class="add-btn" style="flex:0 0 auto; color:var(--error-color);" @click=${() => this._deleteAllDevices()}>
                  Delete All
                </button>
              `
            : null}
        </div>

        <div class="sub-header">Auto-Discovery (TP-Link / OpenWrt)</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Scans for device_tracker entities from the TP-Link Deco,
          TP-Link Router, and OpenWrt (LuCI) integrations (mesh units
          and the router itself are excluded - use the Nodes and
          Router pages for those). Nothing is added automatically;
          review the list and select which ones you want, then add
          them like any other device - icon, color, name, and group
          are all still yours to set afterward.
        </p>
        <button class="add-btn" @click=${() => this._scanIndividualDevices()}>
          Scan for Devices
        </button>
        ${this._discoveredDevices !== null ? this._renderDiscoveredDevicesList() : null}
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
          @value-changed=${(e) => this._devEntityChanged(e, index)}
          allow-custom-entity
        ></ha-entity-picker>

        ${this._renderInput("Name (Optional)", dev.name, `${prefix}.name`)}
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Defaults to the entity's own Friendly Name the first time you
          pick it above; edit it here any time.
        </p>

        <ha-icon-picker
          .label=${"Icon"}
          .value=${dev.icon || "mdi:devices"}
          @value-changed=${(e) => this._valueChanged(e, `${prefix}.icon`)}
        ></ha-icon-picker>

        ${this._config.individual_devices_group_by && this._config.individual_devices_group_by !== "none"
          ? html`
              ${this._renderInput("Group Override (Optional)", dev.group_override, `${prefix}.group_override`)}
              <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
                Leave blank to auto-detect the group from this device's
                own entity attributes; set a value to force it into
                that group regardless.
              </p>
            `
          : null}

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

  _deleteAllDevices() {
    const count = (this._config.individual_devices || []).length;
    if (!count) return;
    if (!window.confirm(`Delete all ${count} client${count === 1 ? "" : "s"}? This can't be undone.`)) return;
    this._config = { ...this._config, individual_devices: [] };
    this._fireChanged();
  }

  // Entity picker handler for a Client: behaves like the
  // normal _valueChanged path for the entity field itself, but also
  // prefills the Name field from the newly-picked entity's own
  // friendly_name the first time - only when Name is still blank, so
  // it never overwrites something the user already typed.
  _devEntityChanged(e, index) {
    const entityId = e.detail?.value !== undefined ? e.detail.value : e.target.value;
    const devs = [...(this._config.individual_devices || [])];
    const current = devs[index] || { ...DEFAULT_INDIVIDUAL_DEVICE };
    const next = { ...current, entity: entityId };
    if (!next.name) {
      next.name = this.hass?.states?.[entityId]?.attributes?.friendly_name || "";
    }
    devs[index] = next;
    this._config = { ...this._config, individual_devices: devs };
    this._fireChanged();
  }

  _addGroupColorOverride() {
    const overrides = [...(this._config.individual_devices_group_colors || []), { name: "", color: "" }];
    this._config = { ...this._config, individual_devices_group_colors: overrides };
    this._fireChanged();
  }

  _removeGroupColorOverride(index) {
    const overrides = (this._config.individual_devices_group_colors || []).filter((_, i) => i !== index);
    this._config = { ...this._config, individual_devices_group_colors: overrides };
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
    const apLayout = this._config.primary_ap_layout || "flat";
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
          <span>Show IP Addressing</span>
          <ha-switch
            .checked=${this._config.show_ip_addressing === true}
            @change=${(e) => this._valueChanged(e, "show_ip_addressing")}
          ></ha-switch>
        </div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">
          Shows WAN/LAN IP badges on the Router (or Primary AP, if it's
          acting as your router) and IP badges on every Access Point,
          wherever an IP Address entity is set. Off by default.
        </p>

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
                      <option value="poe">PoE Total</option>
                    </select>
                  </div>
                `;
              })}

              ${(this._config.summary_items || ["download", "upload", "ping"]).includes("poe")
                ? html`
                    <div class="sub-header">PoE Summary Color</div>
                    <div class="select-field">
                      <label class="input-label">Badge Color</label>
                      <select
                        class="native-select"
                        .value=${this._config.summary_poe_color_mode || "single"}
                        @change=${(e) => this._handleSelectChange(e, "summary_poe_color_mode")}
                      >
                        <option value="single">Single color</option>
                        <option value="threshold">Threshold colors</option>
                      </select>
                    </div>

                    ${this._config.summary_poe_color_mode === "threshold"
                      ? (() => {
                          const thresholds = this._config.summary_poe_thresholds || DEFAULT_POE.thresholds;
                          // Same index-based catch-all rule as the
                          // per-switch PoE thresholds: the last row is
                          // always the open-ended tier, decided by
                          // position rather than by whether up_to
                          // currently has a value, so clearing a field
                          // can never lock the row.
                          return thresholds.map((t, i) => {
                            const isCatchAll = i === thresholds.length - 1;
                            return html`
                              <div class="two-col">
                                ${isCatchAll
                                  ? html`<span style="color:var(--secondary-text-color); align-self:center;">Above previous</span>`
                                  : this._renderInput(
                                      "Up to (W)",
                                      t.up_to,
                                      `summary_poe_thresholds.${i}.up_to`,
                                      "number"
                                    )}
                                ${this._renderColorInput("Color", t.color, `summary_poe_thresholds.${i}.color`)}
                              </div>
                            `;
                          });
                        })()
                      : this._renderColorInput(
                          "Badge Color",
                          this._config.summary_poe_color,
                          "summary_poe_color"
                        )}
                  `
                : null}
            `
          : null}

        <div class="sub-header">Flow Lines</div>
        <p style="color:var(--secondary-text-color); font-size:0.9em; margin:0 0 8px 0;">Controls every connection line and flow dot on the card, except the Internet connection itself (set separately on the Internet page).</p>
        ${this._renderColorInput("Flow Line Color", this._config.flow_line_color, "flow_line_color")}

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
        ${this._renderSlider("Switch Circle Size", this._config.switch?.circle_size, "switch.circle_size", 30, 100)}
        ${this._renderSlider("Switch Icon Size", this._config.switch?.icon_size, "switch.icon_size", 10, 56)}
        ${this._renderSlider("Homelab Circle Size", this._config.homelab_circle_size, "homelab_circle_size", 30, 100)}
        ${this._renderSlider("Homelab Icon Size", this._config.homelab_icon_size, "homelab_icon_size", 10, 56)}
        ${this._renderSlider("LAN Circle Size", this._config.lan?.circle_size, "lan.circle_size", 30, 90)}
        ${this._renderSlider("LAN Icon Size", this._config.lan?.icon_size, "lan.icon_size", 10, 48)}
        ${this._renderSlider("AP Circle Size", this._config.ap_circle_size, "ap_circle_size", 40, 120)}
        ${this._renderSlider("AP Icon Size", this._config.ap_icon_size, "ap_icon_size", 12, 64)}
        ${this._renderSlider("Connected Devices Circle Size", this._config.ap_devices_circle_size, "ap_devices_circle_size", 30, 90)}
        ${this._renderSlider("Connected Devices Icon Size", this._config.ap_devices_icon_size, "ap_devices_icon_size", 10, 48)}
        ${this._renderSlider("Backhaul Icon Size", this._config.backhaul_icon_size, "backhaul_icon_size", 8, 24)}
        ${this._renderSlider("Client Circle Size", this._config.individual_device_circle_size, "individual_device_circle_size", 20, 70)}
        ${this._renderSlider("Client Icon Size", this._config.individual_device_icon_size, "individual_device_icon_size", 10, 40)}
        ${this._renderSlider("Guest Badge Size", this._config.individual_device_guest_badge_size, "individual_device_guest_badge_size", 12, 40)}
        ${this._renderSlider("Guest Badge Icon Size", this._config.individual_device_guest_icon_size, "individual_device_guest_icon_size", 8, 24)}
        ${this._renderSlider("Group Box Padding", this._config.individual_devices_group_padding, "individual_devices_group_padding", 0, 24)}
        ${this._renderSlider("Badge Size", this._config.badge_size, "badge_size", 12, 40)}
        ${this._renderSlider("Badge Icon Size", this._config.badge_icon_size, "badge_icon_size", 8, 28)}
        ${this._renderSlider("PoE Badge Size", this._config.poe_badge_size, "poe_badge_size", 10, 32)}
        ${this._renderSlider("PoE Badge Font Size", this._config.poe_badge_font_size, "poe_badge_font_size", 7, 16)}
        ${this._renderSlider("Column Gap", this._config.ap_column_gap, "ap_column_gap", 8, 60)}
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