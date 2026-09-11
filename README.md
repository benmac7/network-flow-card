# Network Flow Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A [power-flow-card-plus](https://github.com/flixlix/power-flow-card-plus)-style
Lovelace card for Home Assistant — but for your **network** instead of your
energy dashboard. Visualize Internet → Router → LAN / Wi-Fi Access Points →
Individual Devices as a live, animated topology diagram, built entirely from
your existing sensors and device trackers.

> Inspired by the excellent [power-flow-card-plus](https://github.com/flixlix/power-flow-card-plus)
> by [flixlix](https://github.com/flixlix) — see [Credits](#credits) below.

![Network Flow Card screenshot](docs/screenshot.png)

## Features

- **Internet node** — ping, jitter, download/upload speed with animated flow
  lines, lifetime data totals, a billing-cycle progress ring, and offline
  detection (pulsing "!" icon, line markers) when its entity goes
  unavailable. Its own connection line color is independently configurable,
  separate from every other line on the card.
- **Router node** — fully optional. Leave its entity blank and it (and the
  LAN node hanging off it) disappear automatically.
- **Switch node** — also optional, sits between Router and the bus. Supports
  its own Connected Devices count, shown as a side-branch.
- **LAN node** — a simple connected-devices count hanging off the Router.
- **Nodes** — the bus below Router/Switch is made up of Nodes, and each one
  can independently be:
  - A plain **Access Point**, with its own entity, icon, download/upload
    lines, and an optional connected-devices sub-circle. Mark one AP as
    **Primary**, and set a **Backhaul Type** entity to automatically switch
    its uplink line between solid (wired) and dashed (wireless/mesh).
  - A standalone **Switch**, with its own Connected Devices count.
  - A **Switch feeding one or more Access Points** — each AP underneath gets
    its own full configuration, connected via a small secondary bus-line
    splitting off the Switch.
  - Reorder Nodes freely; the diagram always renders them left-to-right in
    the same order they appear in the list.
- **Security (VPN + Firewall)** — independent badges for VPN and Firewall
  status, each targetable at either the Router or the Primary AP, with
  Animate-when-Offline and full color customization.
- **PoE monitoring on Switches** — a summed wattage badge on any Switch
  (top-level or Node-level), sourced automatically from every PoE-related
  entity on that switch's device, or from a manually chosen list (works
  even if the Switch itself has no status entity). Color it with a single
  fixed color or up to three configurable thresholds (e.g.
  green/orange/red), with an optional flash animation once the total
  exceeds the top threshold. Badge size and font size are independently
  adjustable. A matching **PoE Total** Summary item adds up every PoE
  badge shown across the whole diagram.
- **Individual Devices** — group any number of arbitrary trackers
  (phones, laptops, IoT, whatever you like) into a dashed, auto-sizing box
  beneath the diagram, each showing online/offline state. Devices
  currently on a guest network (detected automatically from TP-Link
  Deco's `interface` attribute or the UniFi integration's `is_guest`
  attribute) get a small guest-network icon while online, with globally
  configurable icon, icon color, badge background color (transparent by
  default), and independent badge/icon size sliders.
- **Offline-aware everywhere** — every node independently detects
  `unavailable` / `unknown` / `off` states and reflects it with a pulsing
  warning icon, dimmed colors, and "X" markers on the flow lines feeding it.
- **Smart single-node layout** — with exactly one Node configured, the card
  automatically collapses the T-bar/bus-line so the upstream node connects
  directly to it, instead of drawing a pointless one-branch fan-out.
- **Fully configurable summary** — pick any 3 of Download, Upload, Latency
  and Jitter, VPN Status, or Firewall Status, in any order, shown as
  colored badge rows positionable at the top, bottom, left, or right.
- **One Flow Line Color setting** — a single color and animation controls
  every connection line and flow dot on the card (except Internet's own
  line, which stays independently configurable), so the whole diagram's
  wiring reads as one consistent style. Circle borders, icons, and badges
  remain individually customizable.
- **Deeply customizable colors** — every icon, circle outline, and badge
  has its own color field, and every field accepts either a hex value or a
  Home Assistant theme variable (e.g. `var(--accent-color)`).
- **[card_mod](https://github.com/thomasloven/lovelace-card-mod) compatible**
  out of the box — target `.circle`, `.flow-dot`, `.branches`, etc.
  directly.
- **Full visual GUI editor** — every option above is configurable without
  touching YAML, including a dedicated Nodes list with add/edit/remove/
  reorder, and an Individual Devices list.

## Installation

### HACS (recommended)

This card isn't in the HACS default store — add it as a **custom
repository**:

1. In Home Assistant, go to **HACS → ⋮ (top right) → Custom repositories**.
2. Add this repository's URL, set the category to **Dashboard**.
3. Find **Network Flow Card** in HACS and click **Download**.
4. Add the resource if HACS doesn't do it automatically:
   **Settings → Dashboards → ⋮ → Resources**:
   - URL: `/hacsfiles/network-flow-card/network-flow-card.js`
   - Type: `JavaScript Module`
5. Hard-refresh your browser (Ctrl/Cmd+Shift+R).

### Manual installation

1. Download `network-flow-card.js` from the
   [latest release](../../releases/latest).
2. Copy it to `config/www/network-flow-card.js`.
3. **Settings → Dashboards → ⋮ → Resources** → add
   `/local/network-flow-card.js` as a `JavaScript Module`.
4. Hard-refresh your browser.

> **Updating manually?** Home Assistant caches Lovelace resources by URL.
> If changes don't appear after replacing the file, bump the resource URL
> with a version query string, e.g. `/local/network-flow-card.js?v=2`.

## Adding the card

**Settings → Dashboards → [your dashboard] → Edit → Add Card → search
"Network Flow Card"**, or add manually via YAML:

```yaml
type: custom:network-flow-card
```

Then use the visual editor to select your entities — start with
**Internet**, then **Router** (optional), **Switch** (optional), and
**Nodes** for your Access Points and any standalone Switches.

## Example configuration

```yaml
type: custom:network-flow-card
title: Network
internet:
  entity: sensor.internet_status
  icon: mdi:web
  entities:
    ping: sensor.speedtest_ping
    jitter: sensor.speedtest_jitter
    download: sensor.speedtest_download
    upload: sensor.speedtest_upload
    total_download: sensor.nbn_downloaded
    total_upload: sensor.nbn_uploaded
    billing_total: sensor.nbn_billing_cycle_length
    billing_remaining: sensor.nbn_billing_cycle_remaining
  colors:
    circle: "#4caf50"
    download: "#3b82f6"
    upload: "#f7931a"
router:
  entity: sensor.router_status
  icon: mdi:router-network
lan:
  entity: sensor.lan_connected_devices
nodes:
  - name: ""
    switch: null
    access_points:
      - entity: sensor.lounge_ap_status
        name: Lounge
        icon: mdi:wifi
        is_primary: true
        entities:
          connected_devices: sensor.lounge_ap_devices
          download: sensor.lounge_ap_download
          upload: sensor.lounge_ap_upload
  - name: ""
    switch: null
    access_points:
      - entity: sensor.garage_ap_status
        name: Garage
        icon: mdi:wifi
        entities:
          connected_devices: sensor.garage_ap_devices
          download: sensor.garage_ap_download
          upload: sensor.garage_ap_upload
          backhaul_type: sensor.garage_ap_backhaul_type
  - name: "Core Switch"
    switch:
      entity: sensor.core_switch_status
      entities:
        connected_devices: sensor.core_switch_devices
    access_points:
      - entity: sensor.bedroom_ap_status
        name: Bedroom
        icon: mdi:wifi
individual_devices:
  - entity: device_tracker.phone_1
    icon: mdi:cellphone
  - entity: device_tracker.laptop_1
    icon: mdi:laptop
show_summary: true
summary_items:
  - download
  - upload
  - ping
animation: true
flow_line_color: "var(--divider-color, #ccc)"
```

This is a small slice of the available options — the visual editor exposes
everything (colors, sizes, summary position, offline colors, Nodes with a
Switch feeding multiple Access Points, etc.) without needing to hand-write
YAML. If you have an older config using the flat `access_points:` array,
it's migrated to the `nodes:` structure automatically the first time it
loads — no manual changes needed.

## Theming & card_mod

Every color field accepts a Home Assistant theme variable directly, e.g.
`var(--accent-color)`, so the card can follow your theme automatically.

For deeper styling,
[card_mod](https://github.com/thomasloven/lovelace-card-mod) works with no
special setup:

```yaml
type: custom:network-flow-card
entities: ...
card_mod:
  style: |
    ha-card {
      box-shadow: none !important;
      border: none !important;
    }
    .circle {
      box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important;
    }
```

## Known limitations

- This card loads [Lit](https://lit.dev) from a CDN (`unpkg.com`) at
  runtime rather than bundling it locally. This keeps the file small and
  simple to maintain, but means the card requires outbound internet access
  from the browser and depends on `unpkg.com` staying available. A fully
  bundled, offline-capable build is on the roadmap for a future release.
- LAN's node currently hangs directly off Router's circle for positioning;
  if Router is hidden (no entity set), LAN hides with it.
- A Switch feeding Access Points is limited to two levels (Switch → APs);
  a Switch feeding another Switch isn't supported as a Node-level
  structure — use the top-level Switch (above the bus, between Router and
  the bus-line) for one of the two switches in that scenario instead.

## Credits

The visual style of this card — circular nodes, animated flow lines, and
the overall "distribution diagram" concept — was inspired by
[power-flow-card-plus](https://github.com/flixlix/power-flow-card-plus) by
[flixlix](https://github.com/flixlix), an excellent card for visualizing
Home Assistant's Energy Dashboard. Network Flow Card is an independent
implementation built specifically for network topology (Internet, Router,
Access Points, connected devices) rather than power distribution, and
shares no code with the original — but the idea of representing live data
as an animated node-and-line diagram is very much indebted to that
project. If you like this card, consider checking out (and starring)
power-flow-card-plus too.

## Contributing

Issues and pull requests are welcome. If you're filing a bug, a screenshot
of your rendered card plus your YAML config (with entity IDs redacted if
you'd like) helps a lot.

## License

[MIT](LICENSE)
