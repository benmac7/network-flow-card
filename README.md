# Network Flow Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A [power-flow-card-plus](https://github.com/flixlix/power-flow-card-plus)-style
Lovelace card for Home Assistant — but for your **network** instead of your
energy dashboard. Visualize Internet → Router → Switches / Access Points →
Clients as a live, animated topology diagram, built from your existing
sensors and device trackers.

> Inspired by the excellent [power-flow-card-plus](https://github.com/flixlix/power-flow-card-plus)
> by [flixlix](https://github.com/flixlix) — see [Credits](#credits) below.

![Network Flow Card screenshot](docs/screenshot.png)

## Features

- **Auto-Discovery** — scan a supported integration directly from the
  editor and pick from what it finds, instead of hand-entering every
  entity. Covers Router/Gateway, Core Switch, Nodes (Access Points,
  Switches, Servers), Clients, Internet, Security (DNS Filtering), and
  Containers/VMs. Nothing is ever applied without an explicit
  selection, and a discovered Access Point, Switch, or Server can be
  attached under any Switch or Access Point already in your tree, at
  any depth, instead of always creating a new top-level Node. See the
  [Supported integrations](#supported-integrations) table below for
  the full list and which are considered experimental.
- **Internet node** — ping, jitter, download/upload with animated flow
  lines, lifetime data totals, a billing-cycle progress ring, and offline
  detection. Its connection line color is independently configurable.
- **Router/Gateway and Core Switch nodes** — both fully optional; leave
  the entity blank and the node (and anything hanging off it) disappears
  automatically. The Core Switch sits between Router and the bus, with
  its own Connected Devices count and full PoE support. (This is the one
  Core Switch element between Router and Nodes — a Node's own Switch,
  below, is a separate, unlimited-depth concept and keeps the plain name
  "Switch" throughout the editor.)
- **Nodes** — the bus below Router/Core Switch is made of Nodes, freely
  reordered, each independently one of:
  - A plain **Access Point** — own entity, icon, download/upload lines,
    optional Connected Devices sub-circle, and an IP Address badge. Mark
    one AP **Primary**, and a **Backhaul Type** entity automatically
    switches its uplink line between solid (wired) and dashed
    (wireless/mesh). An Access Point can itself feed further Access
    Points (a wireless mesh), Switches, and/or Servers — see below — and
    gets its own line down to the Clients box when it does.
  - A standalone **Switch**, with its own Connected Devices count.
  - A **Switch feeding one or more Access Points, other Switches, and/or
    Servers** ("Fed Switches") — each fed item keeps its own full
    configuration, connected via a secondary bus-line off the parent
    Switch, and can itself feed further items of its own to any depth.
    (Earlier versions capped this at one level; there's no longer a
    depth limit.)
  - A **Server** node (formerly called "Homelab" — the label changed,
    the `homelab`/`homelabs` config keys did not) for a box running
    several network functions at once (DNS filter, VPN, reverse proxy)
    — track any number of Containers/VMs as independent status badges on
    its circle. A Server can sit at the top level as before, or be fed
    by any Switch or Access Point at any depth.
- **Security** — VPN, Firewall, DNS Filtering, and Reverse Proxy badges,
  each independently targetable at Router/Gateway, Core Switch, Primary
  AP, or Server, with Animate-when-Offline and full color customization.
  When targeted at Server, each individual Server can choose which of
  these items it actually shows, instead of every Server always showing
  everything pointed at that device type.
- **PoE monitoring** on the Router, Core Switch, any Node-level Switch,
  any Access Point, and any Server — a summed wattage badge sourced
  automatically from every PoE-related entity on that device, or from a
  manually chosen list. Single-color or
  up to three thresholds (e.g. green/orange/red) with an optional flash
  once over the top threshold. A matching **PoE Total** summary item adds
  up every PoE badge on the diagram. Off by default.
- **Configurable badge positions** — Primary AP, VPN, Firewall, DNS
  Filtering, Reverse Proxy, PoE, and IP Address badges can each be placed
  in any corner of their circle (PoE and Primary AP are set per-device;
  the rest are global). Badges landing in the same corner fan out so both
  stay visible.
- **Clients** — group any number of arbitrary trackers into an
  auto-sizing box beneath the diagram, each showing online/offline state
  and an optional name label beneath its circle. Split the box into
  labeled sub-groups by SSID, VLAN, Connected AP, or Home Assistant
  Device Area. Devices on a guest network get an automatic badge.
- **Offline-aware everywhere** — every node independently detects
  `unavailable` / `unknown` / `off` (and `not_home` for device trackers)
  and reflects it with a pulsing warning icon, dimmed colors, and "X"
  markers on affected flow lines.
- **Unique default colors per device type**, a **fully configurable
  summary** row (pick any 3 of Download/Upload/Ping/Jitter/VPN/Firewall,
  positioned top/bottom/left/right), and **one Flow Line Color** setting
  controlling every connection line and flow dot on the card at once
  (Internet's own line stays independently configurable).
- **Deeply customizable colors** — every icon, circle outline, and badge
  accepts a hex value or a Home Assistant theme variable (e.g.
  `var(--accent-color)`), and the card is
  [card_mod](https://github.com/thomasloven/lovelace-card-mod) compatible
  out of the box.
- **Full visual GUI editor** — every option above is configurable without
  touching YAML.

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

Open the visual editor and either run **Discover** to scan your
integrations, or set entities up manually starting with **Internet**,
then **Router/Gateway** (optional), **Switch** (optional), and **Nodes**
for your Access Points and any standalone Switches.

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

This is a small slice of the available options — the visual editor
exposes everything (colors, sizes, summary position, offline colors,
Servers, Fed Switches at any depth, badge positions, etc.) without
hand-writing YAML. Older configs using the flat `access_points:` array,
the `individual_devices` key, or the `homelab`/`homelabs` keys, keep
working unchanged — all are migrated/aliased automatically (the
`homelab`/`homelabs` keys themselves didn't change in 3.2.0, only the
label shown for them in the editor and on the diagram, which is now
"Server").

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

## Supported integrations

Every Auto-Discovery scan shows a list to review and select from — nothing is ever applied automatically. The **Experimental** column reflects real-world testing, not technical confidence: an integration can be well-understood from its own source and still be marked experimental simply because it hasn't seen much use yet.

| Integration | Discovers | Experimental |
|---|---|:---:|
| TP-Link Router | Router/Gateway | |
| TP-Link Deco | Router/Gateway (master unit), Nodes (satellites, as Access Points), Clients | |
| TP-Link Omada | Router/Gateway, Nodes (switches & APs), Clients | ✅ |
| UniFi Network | Router/Gateway, Nodes (switches & APs), Clients | ✅ |
| AsusRouter (AiMesh) | Router/Gateway, Nodes (satellites, as Access Points), Clients | ✅ |
| OpenWrt (LuCI) | Router/Gateway (via a client-tracker proxy), Clients | ✅ |
| Synology SRM | Router/Gateway (via a client-tracker proxy, best-effort), Clients | ✅ |
| Netgear (Orbi, Nighthawk, ...) | Router/Gateway (via a client-tracker proxy), Clients | ✅ |
| Proxmox VE | Nodes (as Server nodes, with VMs/Containers attached) | |
| Portainer | Containers/VMs | |
| AdGuard Home | Security (DNS Filtering) | ✅ |
| Speedtest.net | Internet (Ping, Download, Upload) | |
| Ookla Speedtest | Internet (Ping, Download, Upload, Jitter, ISP) | |
| Cloudflare Speed Test | Internet (latency, 90th-percentile Download/Upload) | ✅ |
| LibreSpeed | Internet (Ping, Download, Upload, Jitter) | ✅ |
| Fast.com | Internet (Download only — the only figure it measures) | ✅ |
| Home Assistant Mobile App | Clients (every device running the Companion app) | ✅ |
| Aussie Broadband | Internet (billing cycle, data usage) | |
| Starlink | Internet (session data usage, connectivity) | ✅ |
| Start.ca | Internet (billing cycle, data usage) | ✅ |

## Known limitations

- Auto-Discovery never knows which switch physically feeds which
  switch/AP — no supported integration exposes that uplink topology to
  Home Assistant — so discovered items are flat lists. Use the
  attach-to-existing option on the Nodes/Clients discovery lists (any
  Switch or Access Point in your tree, at any depth), or the Node editor
  directly, to place one under another by hand. Netgear's own
  integration goes a step further and never distinguishes a satellite,
  switch, or AP from an ordinary client at all, so its devices only ever
  show up as Clients, never as Switch/AP nodes.
- Each Security item (VPN, Firewall, DNS Filtering, Reverse Proxy) still
  has one entity; a Server can choose whether to show it, not point it
  at a different entity per server.
- LAN's node hangs directly off Router's circle for positioning; if
  Router is hidden (no entity set), LAN hides with it.

## Credits

The visual style of this card — circular nodes, animated flow lines, and
the overall "distribution diagram" concept — was inspired by
[power-flow-card-plus](https://github.com/flixlix/power-flow-card-plus) by
[flixlix](https://github.com/flixlix), an excellent card for visualizing
Home Assistant's Energy Dashboard. Network Flow Card is an independent
implementation built specifically for network topology rather than power
distribution, and shares no code with the original — but the idea of
representing live data as an animated node-and-line diagram is very much
indebted to that project. If you like this card, consider checking out
(and starring) power-flow-card-plus too.

## Contributing

Issues and pull requests are welcome. If you're filing a bug, a screenshot
of your rendered card plus your YAML config (with entity IDs redacted if
you'd like) helps a lot.

## License

[MIT](LICENSE)
