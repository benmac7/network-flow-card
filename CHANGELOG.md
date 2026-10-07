# Changelog

All notable changes to this project are documented in this file.

## [4.0.0]

A major release. The headline is a second way to see your network - the
**Hyperbolic view**, an explorable tree - and a **details panel** for every
device, available in both views. The classic Flat diagram is still there and
looks as it did. Also includes everything drafted for 3.3.1, which never
shipped on its own: MikroTik and OPNsense Auto-Discovery, and the Summary
badge colours moving into the Summary section.

### Added

**Auto-Discovery (from the unreleased 3.3.1)**
- **MikroTik** - three integrations: the core **MikroTik** integration,
  **MikroTik Router** (`mikrotik_router`) and **MikroTik Extended**
  (`mikrotik_extended`). Each finds the device as a Router/Gateway and,
  because nothing tells a router from a wireless bridge, also offers it as an
  Access Point node, plus its clients. MikroTik Router and MikroTik Extended
  also fill in the Router's **Real-time Download/Upload** from the WAN
  interface's traffic sensors, and MikroTik Extended fills in the **WAN IP**
  too (its cloud public address, or the WAN interface's address).
- **OPNsense** - finds the Router/Gateway from its WAN interface status, with
  the WAN's **Real-time Download/Upload** (the interface's in and out
  kilobytes per second), and its clients. Its built-in speed test is now a
  speed test source ("OPNsense (built-in)"); its **Unbound Blocklist**
  switches (the single legacy toggle and any individually named DNSBL rules)
  appear as DNS Filtering candidates; and its VPN status sensors, which report
  "up", count as active.

**Hyperbolic view**
- **View Mode**: choose **Flat** (the original diagram) or **Hyperbolic** from
  two tiles at the top of the Layout and Discover pages.
- An explorable, zoomable tree of the whole network on a Poincare disk, with
  the Router at the centre. Drag to pan, pinch or use + / - to zoom, tap a
  node to centre it, tap it again to open it, and use the target button to
  return to the centre.
- Every device type is a node: Internet (with its quota ring), Router, LAN,
  Switches, Access Points, Servers and their VMs and containers, count
  circles, individual clients, monitored services, and an **Unknown** node for
  clients that can't be placed.
- **Clients layout**: attach clients to the access point or switch they are
  connected to, or collect them in groups.
- **Node Sizes**: one slider for all nodes, plus a slider per type.
- **Tree Appearance**: outline and background colours with their own
  transparency, an optional **Glass style** (frosted, with adjustable blur),
  and a transparent card background.
- **Offline Nodes**: colours for the "!" badge on an offline node and for the
  dotted line leading to it.
- **Arrangement**: Auto, Phone or Tablet. On a tablet the tree can be sized to
  fill the screen height exactly ("fit tree to screen height") or to a width of
  your choice.

**Details panel** (Hyperbolic view, and Flat view when switched on)
- Select any node to see its details: name and state, live throughput, IP
  addresses (WAN, secondary WAN, LAN, and a device's own), VPN, firewall and
  DNS-filtering state.
- **Device Page** button: opens the device in Settings > Devices, under the
  integration it comes from. A node with no device (or a user without access to
  Settings) gets **More Info** instead. Choose between the two with
  **Header Button**.
- **Clients list**: every client connected to the selected device, with a dot in
  its online or offline colour, online ones first. Tap one to jump to it.
- **Client Info**: for a single client - status and since when, last online,
  connected to, IP, MAC, hostname, SSID, VLAN, switch port, band, channel,
  signal, link speed, traffic, uptime, manufacturer, guest network, area, and
  any other attributes the tracker reports.
- **Device statistics**: CPU, RAM, temperature, traffic received and sent, PoE
  power, ports up, uptime, firmware and model, for any device that reports them
  (UniFi Device Info and similar).
- **PoE Ports**: a switch's PoE ports with the watts each is delivering,
  busiest first, from the switch's own attributes or from per-port PoE sensors.
- **Servers**: CPU, memory, disk, uptime, temperature, load and network
  readings from the sensors on the server's device, plus a **Services** list of
  its VMs and containers headed by a total, for example "11 of 12 online". The
  total comes from count entities you choose, from count sensors on the device,
  from the guests the integration lists, or from a Home Assistant **label** you
  put on the guests (works with any integration).
- **History graphs**: Throughput, Latency (ping and jitter), Connected clients,
  Response time, Resources (CPU, memory and disk for a server; CPU and memory
  for a VM or container) and a client's own Throughput. Each has its own
  timescale buttons (5m, 30m, 1h, 12h, 24h, 72h); the choice is remembered on
  that device. The graphs follow live readings as they arrive.
- **Graph Colors**: a colour for each kind of series - Download, Upload, Ping,
  Jitter, Connected Clients, Response Time, CPU, Memory and Disk.
- **Show as Pop-up**: show the panel as a sheet that slides up from the bottom
  instead of beside or below the diagram. On a tablet the summary then moves to
  the top and the diagram takes the whole card.
- Panel background and outline colours, and card shape and shadow that follow
  your theme (`--border-radius`, `--box-shadow`).

**Flat view with details**
- **Show Details Panel** for the Flat view: the diagram sits beside (tablet) or
  above (phone) a summary card and the same details panel. Tap a circle to see
  its details and again to open it; the selected circle gets a ring in its own
  border colour.

**Summary**
- The summary is now a card of its own: optional **Summary** title, background
  and outline colours, and up to **six** items (it was five).
- With no details panel beside it (switched off, or shown as a pop-up), the
  summary's badges are **centred** across the card instead of left-aligned.

**Clients**
- **Sub-Group Width: Even** - every sub-group exactly the same width, one equal
  column per group across the whole Clients box.

**IP addresses and discovery**
- **Managed switches and servers** can show their IP address as a pill above
  their circle, with an **IP Address Entity** setting and badge colours. If none
  is set, the card finds the address itself: the device's own attributes, a
  sensor on the same device, or the host in the device's web address.
- A gateway's **LAN IP** and **WAN IP** are read from the right attributes (for
  example UniFi Device Info's `lan_ip` and `wan_ip`), so one sensor can supply
  both.
- **UniFi Device Info** discovery now pairs a gateway with its WAN sensor and
  carries each switch's address into the configuration.

### Changed
- **Summary badge colours moved to the Summary section** (from the unreleased
  3.3.1). The Speed Test Download, Speed Test Upload, Real-time Download,
  Real-time Upload and Latency and Jitter badges each have a **Badge Color** and
  **Badge Icon Color** under Layout > Summary, shown for the items you have
  chosen, and they apply to the whole card. The Real-time badges now have
  their own pair (they used to share the Download and Upload colours). The
  Internet page no longer has **Download Badge Background Color**, **Download
  Badge Icon Color**, **Upload Badge Background Color**, **Upload Badge Icon
  Color**, **Ping Badge Background Color**, **Ping Badge Icon Color**, or
  **Download Line** and **Upload Line**. Colours you set in those fields
  (`internet.colors.download_badge`, `download_badge_icon`, `upload_badge`,
  `upload_badge_icon`, `ping_badge`, `ping_badge_icon`) are not carried over:
  the badges start from the defaults (green, pink and cyan, with
  theme-coloured icons) unless you set the new `summary_*_color` options.
- **The Internet connection line follows the global Flow Line Color** (from the
  unreleased 3.3.1), like every other line on the card. It used the Internet's
  own Download and Upload line colours.
- **Summary Position** offers **Top** and **Bottom** only. Left and Right had
  stopped doing anything in the Hyperbolic view and the Flat view with a details
  panel (both placed the summary as Bottom would). A Left or Right saved by an
  older version is still shown, marked as an older setting, and the classic Flat
  strip still honours it.
- **Advanced** is now **Layout**, rebuilt as collapsible sections: General,
  Graph, Summary, Details Panel, and Sizing and Animations. **Show IP
  Addressing** moved from General to Graph.
- The wording "Connected Devices" / "Devices" is now **"Connected Clients"** /
  **"Clients"** throughout. Configuration keys are unchanged, so existing
  configurations keep working.
- With no quota entities set, the Internet circle's ring now uses its **Border
  Color** (it used the Quota Remaining Color).
- A text state that happens to start with a number (an uptime such as
  "3d 4h") is no longer shown as that number.
- Tree circles are opaque, so a line never shows through a node.

### Fixed
- The Hyperbolic tree now uses the screen's full height, as the Flat view does. Its
  circle filled only 92% of its square stage, so the circle - and the summary and
  details panel lined up with it - stopped short of the bottom of the screen (and
  started low at the top). The circle now fills 98% of its stage and ends 20px
  above the bottom of the screen, like the Flat view's panel.
- A client's Throughput graph also works for trackers that name their speeds
  `down_speed` / `up_speed` (such as TP-Link Router), and for clients whose own
  device has download and upload speed sensors.
- Speed test discovery only considers `sensor` entities of the speed test
  integrations (from the unreleased 3.3.1), so the other entities some of them
  create are no longer offered as readings.
- The tablet layout sized to the screen height no longer overflows when the
  dashboard's header settles after the card has been measured, and no longer
  leaves a gap on a dashboard with no header.
- Icons in the tree and in the details panel header sit in the middle of their
  circle (several Material Design icons are drawn off-centre).
- Graphs show the current reading at once and always end "now"; they no longer
  wait for the next history fetch.
- Dashed edges and clipped shapes in the tree no longer draw twice in
  Chromium's software renderer.
- Fit-to-width no longer over-shrinks the Flat diagram in newer versions of
  Chromium.

## [3.3.0]

A major release built around **Monitoring**: bring Uptime Kuma, Ping,
Gatus, and UptimeRobot straight into the diagram as their own badges
and circles, not just router-brand integrations. Also adds a
**Secondary Internet** entity for a backup or genuine second
connection, real-time Download/Upload summary items sourced from the
Router itself, a **Card Size** control (Compact, Fit to Width, or a
manual Scaled percentage) aimed at fitting large networks on a phone
screen, keyword search across every Auto-Discovery list, and
everything drafted for 3.2.1, which never shipped on its own.

### Added

- **Monitoring** - a new main menu, and a new way of drawing a service's
  status directly on the diagram rather than only on the device that
  runs it. Auto-discovery covers four integrations, each confirmed
  against home-assistant/core's own test suite where one exists:
  **Uptime Kuma**, **Gatus**, and **UptimeRobot** (all three checked
  directly against their real entity/snapshot test fixtures), and
  **Ping** (from its documented `round_trip_time_avg` attribute). Each
  discovered or hand-added service gets its own entity, name override,
  icon, and border/icon colors (with separate colors while it's down),
  plus a **Type** of Auto, External, or Internal:
  - **External** services draw in a new dashed box above Internet,
    joined to it by dotted lines - one per circle when a Secondary
    Internet is configured.
  - **Internal** services can be assigned to **Clients** (their own
    "Monitored" sub-group) or to any device or client already
    configured anywhere on the card, not just Router and Servers -
    Internet, LAN, the Core Switch, any Switch or Access Point at any
    depth, any Server, or any individual Client. A device with several
    services shows the worst state among them.
  - **Auto** resolves live, from the monitor's own data: its tags,
    then the address it checks (a public address is External; a
    private range, single-word host, or `.local`/`.lan` name is
    Internal). Gatus exposes neither, so Auto falls back to checking
    its name for a keyword like "External" or "Internal" (Gatus puts
    its group name into the entity name); UptimeRobot, with nothing to
    go on, defaults to External, since a cloud checker can only be
    watching something reachable from the internet. The discovery list
    and the service editor both flag a service Auto can't classify.
  - An optional **response-time badge**, per service (Show Response
    Time Badge), at the bottom of its own circle (not on a device
    badge) - from its Response Time entity, or a status entity's own
    `round_trip_time_avg` attribute - colored globally by the same
    single-color-or-threshold choice PoE badges use.
  - A down badge flashes, following the card's own Enable Animations
    switch like every other animation on the card.
  - Global settings: badge colors and icons by state (up/down/pending/
    maintenance), badge location, the icon shown when several services
    share one device badge, how an unavailable entity is treated
    (Pending by default, or Down), Box Border Color/Radius for the
    External box, and **Show Monitored Names** - independent of the
    Clients page's own Show Names, so either can be on without the
    other.
  - Both the auto-discovery list and the list of services already
    added can be filtered by integration, each showing how many of
    each it found; filtering the already-added list also turns "Delete
    All" into "Delete Shown".
- **Real-time Download / Upload** summary items, sourced from two new
  entity pickers on the Router page (**Download Speed Entity**,
  **Upload Speed Entity**). With no Router configured, they fall back
  to the Primary Access Point's own Download/Upload entities instead;
  a Router that is configured but has no speed entity for a direction
  shows nothing for that direction rather than borrowing the Primary
  AP's. Router discovery for **FRITZ!Box**, **pfSense**, **ASUSWRT**,
  and **AsusRouter** (already supported for the router entity itself)
  now also fills these in automatically where each integration exposes
  live throughput: FRITZ!Box's and pfSense's own WAN rate sensors
  (pfSense from the default gateway's interface specifically, both
  directions from the same WAN), and ASUSWRT's and AsusRouter's
  "Download/Upload speed" sensors - both confirmed against
  home-assistant/core's own test fixtures, including which sensors are
  enabled by default and which are only created for interfaces
  selected in AsusRouter's own options. ASUSWRT's speed sensors carry
  a caution in the discovery list, since they're reported to read 0 or
  identical values on some routers. They're now the default Summary
  Item 1 and 2, ahead of the plain Speedtest-sourced Download/Upload.
- **Secondary WAN IP Address**, a new Router-page field shown only once
  a Secondary Internet exists, displayed under the secondary circle the
  same way the primary's WAN Address already is. AsusRouter fills it in
  automatically - confirmed against its own official change log
  (`wan_ip` / `wan_ip_secondary` sensors, added in integration `0.24.0`
  alongside its secondary-WAN support). Checked as well against UniFi
  and TP-Link (Omada, Deco, Router): neither exposes a distinct
  secondary WAN address in any integration this card already supports,
  so there's nothing to auto-fill there yet.
- **Card Size** (Advanced → Layout) - one choice replacing the size
  sliders as the way to fit more on a small screen:
  - **Normal** - no change; the size sliders below work as set.
  - **Compact** - every circle, badge, and icon shrinks to its
    slider's own minimum, the column gap tightens to its minimum, and
    every name on the card - client, monitored-service, and the label
    inside a Router/Switch/AP/LAN/Server circle alike - hides, all
    without touching the size sliders themselves, so switching back to
    Normal is instant.
  - **Fit to Width** - automatically zooms the whole diagram down just
    enough to fit the card's width, recalculating whenever the card
    resizes or the network changes, down to a 40% floor.
  - **Scaled** - a manual zoom percentage (40-100%), remembered on its
    own even when switching to another Card Size and back.
  - A separate **Horizontal Scroll** toggle applies to every Card Size
    except Fit to Width (already sized not to need it) - lets a
    diagram wider than the card pan sideways, in both directions, to
    reach content that overflows on either side, instead of it being
    clipped by the card's own edge, which it previously always was,
    silently, with no way to see the rest.
  - A separate **Hide Names** toggle (Advanced → Layout) is a global
    override independent of Card Size or either page's own Show Names:
    on, it hides every name on the card at once, everywhere Compact
    does, without switching the rest of Compact's sizing on too.
- **Secondary Internet**: a second `internet_secondary` entity draws
  alongside the primary, with the same fields (bandwidth, quota,
  colors) and its own dashed circle outline, for a backup line or a
  genuine second connection - always the same Circle and Icon Size as
  the primary, so the one pair of sliders governs both. Edited from
  inside the Internet page itself (Primary/Secondary tabs) rather than
  a separate menu entry, and Speedtest discovery adds or removes it
  with the same plain buttons as the primary, acting on whichever tab
  is open. A **Mode** choice - **Active/Active** or **Active/Standby**,
  defaulting to Active/Standby - decides whether the secondary is drawn
  solid and animated (carrying its own traffic) or dashed and still (a
  backup, showing no flow at all while idle); in Active/Standby, it
  switches to solid and starts animating automatically the moment the
  primary actually goes down and the secondary is the one carrying
  traffic, then back to dashed and still once the primary recovers.
  Every line in the assembly - both drop lines, the T-bar, and the stem
  into whatever sits below it - uses the one global Flow Line Color
  rather than the Internet's own Download/Upload colors, at the same
  tighter spacing a typical Access Point's own dual line uses, and the
  T-bar reaches the true outer edge of a paired download/upload line
  rather than stopping short of it. Where the Primary AP itself sits
  directly under Internet with no Router or Switch between them, its
  line uses the normal line color and its own Download/Upload entities
  to decide a single or double line, rather than Internet's.
- **Keyword search**, alongside the integration filter, on every
  Auto-Discovery list on the card - Speedtest, ISP, pfSense, AdGuard,
  Routers, Main Switches, Nodes, Clients, Containers, and Monitoring -
  matching a candidate by its name or its entity id. Where a list
  already has an integration filter, search narrows within it rather
  than replacing it.
- **ASUSWRT Auto-Discovery - experimental** (the built-in `asuswrt`
  integration, confirmed against home-assistant/core's own source; not
  the same as the community AsusRouter integration already supported,
  and the two can be installed side by side). Router: uses the
  integration's own "Devices connected" sensor, which is enabled by
  default, tied to the router's own device, and goes unavailable
  whenever the router can't be polled - so it's a genuine router-status
  entity, and also fills in the Router's LAN Connected Devices count.
  Only if that sensor has been disabled does it fall back to a client
  tracker as a best-effort proxy. Every configured ASUSWRT router is
  offered as its own candidate. Clients: every tracked device - by
  default only devices that report a name, unless "Track unknown
  devices" is turned on in the integration itself. Nothing is offered
  as a Switch/AP node; for AiMesh satellites, use AsusRouter.
- **UniFi Network Map and UniFi Device Info Auto-Discovery -
  experimental.** Two HACS integrations, checked against their own
  source. UniFi Network Map (`unifi_network_map`) labels every gateway,
  switch, and AP explicitly, so no model guessing is needed; its
  tracked-client sensors appear under Clients. UniFi Device Info
  (`unifi_mqtt`, whose entities arrive through MQTT discovery) reports
  uptime as its state and online/offline in a `status` attribute - the
  card now reads that attribute for offline detection on those entities
  only. Both feed the Router, Core Switch, and Nodes scans.
- **UniFi devices now default to "Add as: under <parent>"** when UniFi
  reports which switch/AP they're plugged into (core UniFi's "Device
  Uplink MAC" sensor, or UniFi Network Map's `uplink_device`) and that
  parent is already in your tree. It's only a default in the dropdown.
- **ha-openwrt Auto-Discovery** (FaserF/ha-openwrt, domain `openwrt`) -
  a separate, far more capable community integration from Home
  Assistant's own built-in `luci` integration (a bare device-tracker
  proxy with no router-status entities at all), confirmed against
  ha-openwrt's own source (`sensor.py`, `binary_sensor.py`,
  `device_tracker.py`). Router: prefers the WAN interface's own
  connectivity sensor, falling back to the integration's always-on
  "device reachable" sensor when a device has no separate WAN interface
  sensor of its own; Real-time Download/Upload from the WAN interface's
  live rate sensors; WAN Address from the router's externally-checked
  public IP, falling back to the WAN interface's own configured address.
  A device with no WAN interface at all - the "extra Access Point on a
  LAN cable" setup ha-openwrt's own FAQ describes - is offered as a Node
  (Access Point) candidate instead of a Router candidate, detected from
  that absence alone, since nothing WAN-related exists for it in that
  case; a device with one is only ever offered as a Router, never both.
  Clients: every tracked device, the same device_tracker pattern this
  card already uses for TP-Link, UniFi, and everything else.
- **Synology SRM and Netgear now also offer their Router candidate as a
  Node (Access Point) candidate**, matching how TP-Link Deco's master
  unit already works: both run on hardware that genuinely supports an
  Access Point mode, but - unlike ha-openwrt - neither integration
  exposes anything beyond a single device_tracker per device, so there's
  no signal to tell which mode is active. Offering the same entity both
  ways lets the person choose, rather than only ever seeing it as a
  Router candidate regardless of how it's actually configured.

### Changed

- **The Internet page's "Download Speed Entity" and "Upload Speed
  Entity" are now "Download Speed Test Entity" and "Upload Speed Test
  Entity"**, to read clearly alongside the Router page's own Real-time
  speed fields, with default icons of `mdi:progress-download` and
  `mdi:progress-upload` in place of the plain download/upload arrows.
  Neither icon is in this card's small hand-picked icon set, so both
  render through Home Assistant's own icon component instead - anyone
  who already set a different icon here keeps it.
- **Summary badges: Download/Upload and Real-time Download/Upload now
  show different second-line information, each better suited to what
  actually feeds it.** Download and Upload - sourced from the Internet
  page's speed-test entities - now name whichever integration is
  providing that reading (e.g. "Speedtest.net", "Aussie Broadband")
  instead of the lifetime total. Real-time Download and Real-time
  Upload now show the Total Downloaded/Uploaded entity instead of the
  Router or Access Point's name; with no Total entity configured, the
  line is simply blank rather than falling back to the old text. A
  fresh card's Summary now defaults to Real-time Download and Real-time
  Upload in the first two slots, Latency third - the Speedtest-based
  Download/Upload badges are still there to choose, just no longer
  selected automatically. Summary also grew from 3 badge slots to 5;
  the two new ones are empty by default.
- **"Connected AP" is now "Connected Device"**, and groups wired clients
  by their switch as well as wireless ones by their AP. Only TP-Link
  Omada exposes which switch a wired client is on (`switch_name`,
  falling back to `switch_mac`, confirmed from its own
  device_tracker.py source) - no other integration supported here
  reports this for any client, wired or not, so a wired client on
  anything else still falls to "Unknown", the same as before this
  existed. The config value is unchanged (`individual_devices_group_by:
  ap`), so no existing config needs to change - only the editor's label
  and what the mode covers.
- **Show IP Addressing (Advanced → Layout) now defaults to on.**
  Anyone who had already turned it off keeps that setting.

### Fixed

- **A device offline by Uptime Kuma's or UptimeRobot's own word for
  it - "down" - wasn't recognised as offline** if that device's own
  entity was a Kuma/UptimeRobot status sensor directly (as opposed to a
  Monitoring service pointed at the device, which already understood
  "down" correctly): it kept its normal color and connector lines
  rather than turning red. The shared offline check used by every
  device on the card - Router, Switch, LAN, Internet, every Access
  Point and Server - now recognises "down" alongside off, unavailable,
  unknown, not_home, and offline.
- **The line from the bus down to an offline Access Point, Switch, or
  Server either vanished or stayed a plain online-colored line instead
  of showing the usual offline "X".** Three connector segments only
  ever checked whether the Router itself was offline - and even then
  hid the line outright rather than marking it - never the state of
  the node at the other end. All three now show the "X" whenever
  either side is down, matching every other offline indicator on the
  card, and cascade correctly when the Router itself is the one that's
  down.
- The Nodes discovery "Add as" dropdown could show "New Node" while a
  different choice was actually stored after a re-render.
- **UniFi discovery found nothing at all for most switches, even after
  the model-code fix below.** Core UniFi's `device_tracker.py` sets
  `device_info_fn` to a hard-coded `None` for every device's own
  tracker (confirmed straight from source) - it is never linked to a
  Home Assistant device by the integration itself, so grouping entities
  by `device_id` (the previous approach) could never find the tracker
  and its sibling diagnostic sensors (Connected Devices, Uplink MAC,
  ...) together, and the switch/AP/gateway was skipped even when its
  model correctly classified as one. Confirmed against a report of a
  real US-16-150W (`US16P150`) never appearing, misfiled as a Client
  instead. Discovery now matches a device's own tracker to its
  diagnostic entities by MAC address, via the device registry's own
  `connections` - the same mechanism Home Assistant itself uses to
  merge devices - instead of relying on `device_id` at all.
- **UniFi discovery missed most switches (and some APs and gateways).**
  The core UniFi integration puts the controller's raw model code in the
  device registry (e.g. `US24P250`, `USL8LP`, `USMINI`, `UAL6`, `UGW3`),
  not the marketing name (`USW-24-PoE`, `U6-Lite`, `USG`); the card only
  matched marketing-style prefixes, so a US-8-60W, Flex Mini, U6-Lite,
  or USG was never offered and could end up listed as a Client instead.
  Classification now matches raw codes, checked against a curated list
  of 334 UniFi model codes, and a device with a WAN latency sensor is
  treated as a gateway whatever its model. UniFi hardware that isn't a
  gateway, switch, or AP (a PDU, Cloud Key, UNAS, ...) no longer shows up
  under Clients.
- **Proxmox VE discovery misfired badly against the dougiteixeira/proxmoxve
  HACS "Proxmox VE Custom" integration** - many people's actual Proxmox
  integration, sharing the same `proxmoxve` domain as the one built into
  Home Assistant core but using different `model` values in its device
  registry entries (confirmed against its own `__init__.py`/`const.py`
  source): `"QEMU"`/`"LXC"` for guests, rather than core's `"VM"`/
  `"Container"`, plus `"Cluster"` and `"Shared storage"` device types
  core doesn't have at all. The classifier only recognised core's exact
  strings, so on the HACS integration every physical Node, VM, Container,
  the whole Cluster, and any shared Storage all showed up as separate
  "node" candidates instead of each VM/Container being attached under
  its actual physical Node - confirmed by reproducing a real Node with
  two guests: the old code offered 5 candidates and 0 attached
  containers; the fix offers exactly the 1 correct Node with both guests
  correctly attached. The Container/VM icon (desktop vs. Docker) is
  fixed to match either naming convention too.

### Known limitations

- **Fit to Width** measures and adjusts using the browser's own layout,
  so it needs a real render to work correctly - it, and Scaled/Compact
  sizing generally, rely on CSS `zoom`, supported by every Chromium/
  WebKit-based browser and Firefox 126+, but not older browsers.
- Monitoring's Type: Auto can only classify a service by its tags, the
  address it checks, or (Gatus only) a keyword in its name - it has no
  way to know a service is internal or external beyond that, so an
  ambiguous one defaults to Internal (or, for UptimeRobot, External)
  and may need its Type set by hand.

## [3.2.0]

Adds unlimited-depth tiers (a fed Switch, and now an Access Point too,
can feed further Switches/Access Points/Servers to any depth), renames
Homelab to Server everywhere it's shown, per-server Security targeting,
Netgear and Fast.com Auto-Discovery, a real expandable tree for the
Nodes editor page with reordering and continuous numbering at every
tier, a "Core Switch" rename for the top-level Switch menu, and a
confirmed fix for bandwidth connectors drawing a phantom second strand
whenever only one of Download/Upload was configured.

### Added

- **Unlimited tiers.** A fed Switch can carry its own `access_points`,
  `fed_switches`, and `homelabs`, and those can carry theirs, to any
  depth - not just the one level of Fed Switches supported previously.
  Every extra level adds one row to the diagram between the Access
  Point row and Connected Devices. A Switch/AP feeding several children
  is centred over every column beneath it, with its own stem and mini
  bus-line; offline state cascades down the whole chain; PoE totals sum
  Access Points, Servers, and Switches at every depth.
- **An Access Point can be a parent too.** Straight off the bus or
  nested under a Switch, an Access Point can now feed its own
  `fed_switches`, `homelabs`, and further `access_points` (a wireless
  mesh) - everywhere a Switch could feed something, an Access Point now
  can as well. An Access Point that feeds anything also gets its own
  dotted line down to the Clients box, the same as a Primary AP in
  Tiered layout, with its Connected Devices circle hanging off that
  line if it has one.
- **A Server can hang off anything**, not only sit at the top level -
  under any Switch or Access Point, at any depth, with its own
  Containers/VMs, PoE, and Connected Devices intact. (See the Homelab →
  Server rename below.)
- **Per-server Security targeting.** VPN, Firewall, DNS Filtering, and
  Reverse Proxy are still configured once and pointed at a device type
  (Server among them), but each Server can now choose which of those
  items it actually shows:
  ```yaml
  homelabs:
    - entity: sensor.server_a
      security: { dns: true, reverse_proxy: true }
    - entity: sensor.server_b
      security: { vpn: true }
  ```
  A Server with no `security` key shows every item pointed at it,
  exactly as before - additive, not a breaking change.
- **Netgear Auto-Discovery - experimental.** Covers the official
  `netgear` integration (Orbi, Nighthawk, and other pynetgear-supported
  routers), confirmed against home-assistant/core's own source. Offers
  a Router candidate via one of its connected devices' trackers as a
  reachability proxy - the same technique OpenWrt (LuCI) already uses,
  since Netgear has no dedicated router-status entity, and its
  one enabled-by-default entity (the firmware Update entity) reports
  `"off"` when simply up to date - which this card's offline check
  would otherwise misread as offline. Every attached device is offered
  as a Client; Netgear's own integration never distinguishes a
  satellite, switch, or AP from an ordinary phone or laptop, so nothing
  from it is ever offered as a Switch/AP node. Marked experimental
  because of the client-proxy reachability check and less real-world
  mileage than the router integrations already supported.
- **Fast.com added to Speedtest Auto-Discovery** (`fastdotcom` platform,
  confirmed against home-assistant/core's own source) - a single
  Download-only sensor, no Ping/Jitter/Upload/ISP, since that's the
  only figure fast.com measures. Its `single_config_entry` manifest
  flag means at most one Fast.com service will ever be found.
- **Home Assistant Mobile App Auto-Discovery** (`mobile_app` platform,
  confirmed against home-assistant/core's own source) - every device
  running the official Companion app gets one device_tracker entity,
  offered on the Clients page. Clients-only: unlike every router-brand
  integration above, there's no Router/Node concept here at all - a
  phone or tablet is always a personal device, never network hardware.
- **Editor: the Nodes page is a real expandable tree.**
  - Every Switch or Access Point row has a chevron that expands it in
    place, with a live online/offline dot and a count of everything
    below it.
  - "+ Access Point / + Switch / + Server" sit directly inside the same
    card as the row they add to, ahead of its children, instead of at
    the bottom of a long flat list.
  - "Add AP / Add Switch / Add Server" are three separate buttons at
    the bottom of the page, each creating the right node type directly,
    instead of one "Add Node" button that always defaulted to an
    Access Point.
  - Move up/down now works at every tier, not just the top level - an
    Access Point, fed Switch, or Server reorders among its own siblings
    of the same kind under the same parent (Access Points, Switches,
    and Servers are always drawn as three separate blocks, so that's
    the only reordering that's meaningful).
  - Fallback labels ("Switch 3", "AP 4", ...) now share one running
    count per kind across the whole tree, instead of restarting at 1
    under every new parent.
  - A discovered candidate's "Add as" dropdown now lists every eligible
    Switch/Access Point in the tree, with a breadcrumb ("D-Link ›
    Workshop PoE"), not only top-level Nodes - this also lets a
    discovered Proxmox Server attach under an existing node instead of
    only ever becoming a new one.
  - Deleting a Switch/AP with devices below it asks for confirmation
    first. Only one Access Point can be Primary, wherever it sits in
    the tree.

### Changed

- **"Homelab" is now "Server"** everywhere it's shown - buttons,
  headers, tooltips, dropdown options, and the diagram's own fallback
  label text. Display-only: the YAML keys (`homelab`, `homelabs`, the
  `homelab` Security target value, ...) are unchanged, so no existing
  config needs to change.
- **The top-level "Switch" menu is now "Core Switch"** - its entry in
  the menu list and its own page header only. Every Node-level "Switch"
  (Fed Switches, the node-type dropdown, "Main Switch" as a Security
  target, tree labels, ...) is unchanged, since that's a distinct,
  still-called-Switch concept from the one Core element between
  Router/Gateway and Nodes.
- A Switch's mini bus-line is now drawn as one exact centre-to-centre
  stretch per child, instead of a single line inset by a fixed amount
  from the group's edges - this replaces the previous inset-based
  adjustment, which could still overshoot the last drop by a few pixels
  in a mixed AP/Fed-Switch row.
- Four long inline descriptions became hover tooltips (the same small
  (i) icon already used elsewhere), instead of a paragraph sitting
  underneath the control: Clients page - Grouping, Show Client Names;
  Advanced page - Show IP Addressing, Enable Animations.

### Fixed

- **Bandwidth connectors drew a phantom second strand whenever only one
  of Download/Upload was configured** - discovered while adding
  Fast.com, which only ever provides a Download entity. The check
  deciding "one line or two" was `!!(download || upload)`, so setting
  either one alone still drew both strands; the missing one animated at
  the slowest configured speed (the existing fallback for "no value")
  rather than not appearing at all, which read as a live, if quiet,
  reading instead of no data. Affected every bandwidth connector on the
  card: Internet, the tiered Primary AP's own line, and every plain
  Access Point's own line. Now checks each direction independently -
  Download-only draws one line in the Download color, Upload-only one
  in the Upload color, both draws the existing dual line, and neither
  falls back to what it already did. An Upload-only line correctly
  flows bottom-to-top (matching data going out), the same direction
  Upload's own strand already used in the dual-line case - a Download-
  only line flows top-to-bottom, also matching its dual-line direction.
- Lines below a circle smaller than the tallest one in its row (a 60px
  Switch beside a 72px AP, say) now reach up to that circle instead of
  stopping a few pixels short.
- The bus (T-bar) only draws when two or more Nodes hang off it. A
  single Node with several devices beneath it used to get a wide
  horizontal line reaching past everything; it now drops straight down.
- With no Router configured, an Access Point under a lone Switch was
  missing its own connecting line.
- The dotted line under a Fed Switch no longer starts inside the circle
  when its row contains only Switches.
- A Fed Switch's own page showed its Connected Devices block twice.
- Opening a Container/VM from a Server's page, and the Edit buttons
  under a Switch's page, now respond immediately instead of lagging
  behind the next Home Assistant update.
- The Security page's "No Server node exists yet" / "No Access Point is
  currently marked Primary" warnings only checked top-level Nodes; they
  now check the whole tree.
- Deleting a plain Access Point Node no longer asks for confirmation as
  if it had a device beneath it when it doesn't.

### Known limitations

- A Switch that feeds other devices doesn't show its own Connected
  Devices circle - there's no free row for it. An Access Point in the
  same position does (see "Added" above).
- A Primary AP anywhere but straight off the bus (inside a Switch's
  group, or hanging off another Access Point) still renders Flat, not
  Tiered.
- Each Security item (VPN, Firewall, DNS, Reverse Proxy) still has one
  entity; Servers can each choose whether to show it, not point it at a
  different entity per server.
- Auto-Discovery still never knows which switch physically feeds which
  switch/AP - no supported integration exposes that uplink topology to
  Home Assistant - so a deep, discovered tree still has to be assembled
  by hand via the attach-to-existing dropdown or the Node editor.
  Netgear's own integration goes a step further and can't tell a
  satellite, switch, or AP apart from an ordinary client at all, so its
  devices only ever show up as Clients.
- The Nodes tree's expanded/collapsed state lives only in the open
  editor session; reordering or deleting inside a Switch collapses
  whatever was expanded beneath it.

## [3.1.7]

### Fixed

- **Client sub-group boxes rendered enormous whenever Show Client
  Names was on** - root-caused via direct browser DevTools inspection
  after an initial layout-based fix didn't resolve it. The actual
  cause was a JavaScript string-concatenation bug in 3.1.6:
  `individual_devices_group_padding` arrives as the string `"6"`
  (config values commonly do), and the extra bottom padding added for
  Show Client Names was computed as `pad + 18` - since `pad` was a
  string, `+` concatenated rather than added, producing `"618"` (as in
  618px) instead of `24`. Every group box independently carried this
  same broken padding, which is why it affected every box uniformly
  regardless of its own content. `pad` is now coerced to a real Number
  at its source, not just at the one call site that happened to do
  arithmetic on it, so the same class of bug can't resurface through
  some other future use of the same variable.
- **Invalid `<rect>` attribute errors on every Clients box render**
  ("`Invalid value for <rect> attribute width="calc(100% - 2px)"`",
  visible in the browser console) - `calc()` is only valid for SVG
  geometry properties when set through CSS (the `style` attribute or a
  stylesheet), not as a plain XML attribute value, which is how `width`
  and `height` were set on the dashed-border rect drawn behind the
  Clients box and each of its sub-groups. Moved both into the `style`
  attribute alongside `rx`/`ry`, which were already handled correctly
  this way. A real, confirmed bug, but a cosmetic one on its own - the
  SVG's own outer size was already correct via CSS regardless, so this
  didn't contribute to the height issue above.
- Sub-group boxes no longer stretch to match whichever sibling is
  tallest (`align-items: flex-start` instead of `stretch` on their
  shared flex container). This turned out not to be the cause of the
  height issue above, but is a real fix in its own right: without it,
  one heavily-populated group wrapping onto multiple rows could still
  impose its height on every sibling regardless of their own content.

## [3.1.6]

### Fixed

- **Client sub-group boxes (and the flat Clients box, ungrouped) didn't
  reserve enough height for Show Client Names** - the name label sits
  absolutely positioned below each circle so it doesn't disturb the
  row's own layout, but that also means it contributes nothing to the
  box's height, and its ~14px of text overlapped or hung past the
  box's own dashed border. Sub-group boxes now add extra bottom padding
  when names are shown; the flat (ungrouped) box does the same.

## [3.1.5]

### Fixed

- **"By card" search picker no longer lists the card at all** -
  discovered after 3.1.4 shipped. Home Assistant's card picker reads
  from a separate `window.customCards` registry to make a card
  searchable by name/description; this is independent of
  `customElements.define`, which only makes an element renderable once
  it's actually placed on a dashboard, and was never present in any
  version of this file going back to its first release. Added the
  registration (name, description, `documentationURL`). `preview` was
  briefly turned on and then back off in testing, since a live preview
  thumbnail replaced the plain description text in the picker rather
  than complementing it - the picker now shows the same
  name/description as before.

### Changed

- **The Internet circle's outline now defaults to the Billing
  Remaining color when no billing entities are configured at all**,
  instead of falling back to the Internet circle's general theme
  color. Previously, once billing entities were set, the plain circle
  border went transparent in favor of the SVG progress ring drawn on
  top of it (colored by Billing Remaining/Billing Progress) - but
  without billing configured, the border fell back to whatever generic
  color the Internet circle otherwise uses, which read as unrelated
  to billing styling entirely. This distinguishes "billing configured
  but a sensor value is temporarily unavailable" (still falls back to
  the general circle color, unchanged, so the border doesn't flicker
  colors as a sensor briefly goes unavailable) from "billing was never
  configured for this Internet entity" (now uses Billing Remaining
  color specifically).

## [3.1.4]

### Changed

- **The editor is no longer a separate lazily-loaded file** -
  `network-flow-card-editor.js` is gone; its entire contents (every
  Auto-Discovery scanner, the page menu, all form helpers) are now
  merged directly into `network-flow-card.js` itself. This reverses the
  file-splitting decision made earlier for performance, and was
  necessary rather than optional: testing 3.1.3 confirmed HACS's plugin
  downloader (for a non-zip, non-`dist/` repository) only fetches the
  single `.js` file named in `hacs.json`'s `filename` field, not every
  `.js` file present in a release - so the separate editor file was
  silently never installed for most users, regardless of it being
  correctly built and uploaded. A single file is the only reliably
  HACS-compatible structure available without reintroducing the
  zip-release problem 3.1.3 just fixed.
- Merging surfaced that the editor's own copy of several shared
  functions (`getDeviceGroupName` specifically) had quietly drifted out
  of date, missing the Device Area grouping and TP-Link Omada attribute
  support added to the main file in 3.1.0 - not a user-visible bug
  today (the editor never actually depended on the missing behavior for
  anything real), but worth knowing about if you'd forked or patched
  the old editor file directly. The merge keeps only the main file's
  up-to-date copy of every shared function going forward, so this
  entire class of drift is now structurally impossible.
- `release.yml` and `package.json`'s build script no longer
  build/verify/zip/upload a second file - there's only ever one to
  produce now.

### Known trade-off

- The editor's code (Auto-Discovery scanners, page menu, form
  rendering - several thousand lines) is now parsed on every card load
  instead of only when someone opens the config editor. Minified
  output grew from ~120 KB (card only) to ~271 KB (card + editor
  combined) for what loads on every dashboard view. This is the direct
  cost of the HACS compatibility fix above; there wasn't a way to keep
  both.

## [3.1.3]

### Fixed

- **Repository structure was non-compliant with HACS's rules for
  Dashboard (plugin) repositories**, per community feedback: `hacs.json`
  had `"zip_release": true` with a `.zip` `filename`, which HACS's
  validator rejects for this category regardless of whether the zip
  itself installs correctly. Removed `zip_release` and pointed
  `filename` at `network-flow-card.js` instead - HACS downloads every
  `.js` file it finds in a release's assets for a plugin repository, not
  just the one named in `filename`, so `network-flow-card-editor.js`
  still installs alongside it automatically. No change to `release.yml`
  was needed: it already uploads both raw `.js` files as release assets
  alongside the zip, which is what HACS now actually uses - the
  minified build output continues to come from those release assets,
  never from the repository's own (unminified) committed source.

## [3.1.2]

### Fixed

- **A bus made entirely of Switch nodes rendered crushed toward the
  bottom whenever no Access Point existed anywhere on the diagram** -
  the grid row reserved for a Fed Switch's own circle and connector was
  sized by whether any Access Point existed (`hasAnyAp`), while the
  content actually placed into that row was correctly gated by whether
  an Access Point *or* a Fed Switch existed (`hasApRow`). An
  Access-Point-free, Switch/Fed-Switch-only bus had real content
  rendered into a row deliberately sized to 0px, squashing every Fed
  Switch and the Clients box beneath it upward into an overlapping
  mess. Row height now uses the same condition that gates the content.
- **The mini bus-line feeding a group of Fed Switches stopped short of
  reaching them**, following on from the fix above. Its inset margin
  (how far the line pulls back from each column's edge so it lands on
  the circle's actual center rather than overshooting) was hardcoded to
  the Access Point circle size regardless of what the group actually
  contained - correct for a group of Access Points, but a
  pure-Fed-Switch group (no Access Points at all) over-inset by the
  difference between the AP and Switch circle sizes, since the two
  default to different values. Now uses the Switch circle size for a
  pure-Switch group, and the correct size at each end for a mixed
  group of Access Points followed by Fed Switches on the same node.

## [3.1.0]

Adds Auto-Discovery for UniFi Network and TP-Link Omada across Router,
Switch, Nodes, and Clients, catches up this changelog on the
Synology SRM and AsusRouter (AiMesh) discovery already in the codebase
but never previously documented, adds the ability to attach a
discovered Access Point or Switch under an already-configured Node
instead of always creating a new one, Client grouping by Home Assistant
Area, an optional "Show Client Names" label, and a substantial editor
and rendering performance pass aimed at the Companion app.

### Added

- **Synology SRM and AsusRouter (AiMesh) Auto-Discovery**, present in
  the codebase but never previously documented in this changelog:
  Synology SRM for Router/Gateway and Clients - like LuCI, it has no
  dedicated router-status entity of its own, so its candidate uses one
  of its client-tracker entities as a reachability proxy too, though
  best-effort only, since this integration's older polling model
  doesn't guarantee it goes unavailable the moment the router drops the
  way LuCI's does. AsusRouter for Router/Gateway (a real connectivity
  sensor on its main AiMesh unit, as reliable as TP-Link's), its
  satellite units as Access Point Nodes (defaulting to Primary AP when
  added, same as a TP-Link Deco satellite), and its Clients.
- **UniFi Network and TP-Link Omada Auto-Discovery** for Router/Gateway,
  Switches, Access Points, and Clients, confirmed directly against each
  integration's own source. UniFi has no dedicated "device type"
  attribute, so classification goes by matching the HA device
  registry's `model` field against known Ubiquiti product-family
  prefixes; Omada exposes its own device type directly on the device
  tracker's `type` attribute, so its classification is exact. Neither
  integration exposes uplink/topology data to Home Assistant, so
  results are flat lists, same as every other integration this card
  supports - grouping a switch under the node it actually feeds is
  still up to you (see the next item). Client grouping, Guest Network
  badge detection, and wired/SSID/VLAN sub-grouping were all extended
  to recognize Omada's attribute names (`guest`, `switch_mac`, `ssid`,
  `vlan_id`) and AsusRouter's `guest` attribute alongside the existing
  TP-Link Deco/UniFi ones.
- **Attach a discovered Access Point or Switch under an existing Node**
  instead of always creating a new one - a per-candidate dropdown on
  the Nodes discovery list sends it straight into an already-configured
  Node's Access Points or Fed Switches. Only Nodes that already have
  their own Switch are offered, since Access Points/Fed Switches only
  ever hang off a Node's Switch.
- **Auto-Discovery on the Switch page**: finds devices UniFi or Omada
  have already classified as switches - the same classification used
  for Fed Switch and Nodes discovery, not a separate check of its own.
  No other integration this card supports models a distinct switch
  role, so nothing else is scanned here.
- **Group Clients by Device Area** - a new "Device Area" option
  alongside SSID/VLAN/Connected AP, resolving each client's assigned
  Home Assistant Area (falling back to its device's Area if the entity
  itself has none), independent of any integration.
- **Show Client Names** toggle (Clients → Layout) - displays each
  client's name in small text directly below its circle. Off by
  default, since it noticeably increases visual density on a Clients
  box with a lot of devices; the full name remains available on
  tap/hover either way.

### Changed

- **Icon rendering switched from `<ha-icon>` to `<ha-svg-icon>`** for
  every fixed/default icon on the card (badges, node circles, the
  offline "X" marker) - skips the async icon-metadata lookup `ha-icon`
  performs per instance, worthwhile since a populated topology can put
  40-80 icons on screen at once. Any icon overridden with a custom
  string still renders via `<ha-icon>` as before, so customizability is
  unaffected.
- **The card and editor are now minified as part of the release
  build** (Rollup + Terser) rather than shipping full readable source -
  previously only the bundled Lit library was minified; the card's own
  several thousand lines of source shipped completely untouched,
  roughly doubling the JavaScript the browser had to parse.
- **Discover page section order**: Router/Gateway now comes before
  Security · DNS Filtering, which in turn comes before Nodes.
- **Clients page reorganized**: the "Labels" section is gone - "Show
  Client Names" now lives under a renamed "Layout" section (previously
  "Box & Connector"). Sub-sections now run Clients → Auto-Discovery →
  Grouping → Guest Network → Layout.
- **Guest Network badge default icon** changed from
  `mdi:account-question` to `mdi:account`.
- Long explanatory paragraphs under section headings throughout the
  editor (the Auto-Discovery blocks especially) are now a small info
  icon carrying the same text as a hover tooltip, instead of
  always-visible text pushing that section's actual controls further
  down the page.

### Fixed

- **Fed Switches weren't tracked as "already added"** in discovery -
  a switch already attached as a Fed Switch could be offered again as
  a new candidate. Removing a discovered entity also used to delete
  its entire parent Node rather than just that one entry, which broke
  as soon as a Node could hold more than one discovered child; both
  now handle a Node with multiple attached Access Points/Fed Switches
  correctly.
- **Homelab's "Scan for Container/VM" button didn't appear until a
  full re-scan** after a Homelab Node was added through any other
  route (the Nodes section of the Discover page, or the Nodes page
  directly) - it's now computed live from the actual config on every
  render instead of a value cached from the last full scan.
- **Checkbox alignment on the discovered-Nodes list** - a missing
  `width:100%` on an inner wrapper left the checkbox squeezed against
  the item's text instead of flush right, unlike every other discovery
  list.
- A forced double layout reflow in the bus-line alignment code (now
  batches every read before any write), and a missing
  `customElements.get()` guard that could throw if the card's resource
  was ever re-injected mid-session.
- **Router page's WAN Address Entity picker rendered as broken raw
  text** ("`.label=WAN Address Entity @value-changed=...`" visible
  directly in the editor) instead of an entity picker - introduced
  earlier in this same cycle by the info-tooltip conversion above,
  which accidentally dropped the picker's own opening
  `<ha-entity-picker>` tag along with its `.hass`/`.value` bindings,
  leaving the rest of its attributes with nothing to attach to.
- Two out-of-date editor description strings: the Guest Network badge
  explanation was missing AsusRouter/Omada's `guest` attribute, and the
  Nodes/Clients Auto-Discovery descriptions didn't mention UniFi/Omada
  even though both scans already covered them.

## [3.0.1]

A major release built around Auto-Discovery: scan a supported
integration directly from the editor to populate Router, Nodes,
Clients, Internet, Security, and Homelab, instead of hand-picking
every entity yourself. Also introduces IP Address badges and renames
Individual Devices to Clients.

### Added

- **Auto-Discovery framework** across most editor pages, all following
  the same pattern: scan, review a list of what was found, select the
  ones you want, add. Nothing is ever applied without an explicit
  choice, and re-selecting a different candidate than the one already
  in place prompts for confirmation before overwriting anything.
- **Router/Gateway discovery**: TP-Link Router, TP-Link Deco (its
  master unit), and OpenWrt via the LuCI integration (which has no
  dedicated router-status entity of its own, so its candidate uses one
  of its client trackers as a reachability proxy - a legitimate signal
  since HA marks every entity on that integration unavailable together
  the moment the router can't be reached). All candidates are listed
  together so you choose between them - e.g. a TP-Link Router acting as
  gateway with a Deco mesh riding behind it - rather than one being
  silently preferred. TP-Link Router discovery also finds its WAN/LAN
  IPv4 sensors and its "Total wired clients" sensor (wired into LAN
  Connected Devices) alongside the router pick itself.
- **Nodes discovery**: one "Scan for Nodes" button covers TP-Link Deco
  (satellite units, added as Access Points with Backhaul Type/Speed,
  Connected Devices, Download/Upload, and IP Address all wired up
  automatically from each unit's own entities) and Proxmox VE
  (physical/cluster nodes, added as Homelab Server nodes with their
  VMs/Containers attached as badges automatically). Results filter by
  Integration and by Type (Access Point / Switch / Homelab - Switch
  reserved for a future scanner). A Deco master unit is included as a
  selectable candidate here too, in case you'd rather add it as a Node
  than use it as Router, and defaults to Primary AP when added.
- **Clients discovery** (formerly "Individual Devices" - see Changed):
  TP-Link Deco, TP-Link Router, and OpenWrt (LuCI) client trackers,
  filterable by integration, with Select All and pagination (10 per
  page). Each added Client can be manually named, defaulting to its
  entity's Friendly Name.
- **Internet discovery**: Speedtest.net, Ookla Speedtest, Cloudflare
  Speed Test, and LibreSpeed for Ping, Jitter, Download, and Upload
  (plus ISP name as a one-time default for the Name Override); Aussie
  Broadband, Starlink, and Start.ca for Billing Total, Billing
  Remaining, Total Downloaded, Total Uploaded, and (Starlink) the
  Internet connectivity entity itself. Every service found on every
  matching integration is listed separately - including multiple
  services on one account, such as several Aussie Broadband lines - so
  you pick the right one instead of one being assumed.
- **Security discovery**: AdGuard Home's "queries blocked" sensor for
  the DNS Filtering entity, listing every instance found (e.g. a
  primary and a secondary DNS server).
- **Homelab discovery**: "Scan for Container/VM" on a Homelab node
  combines Portainer (Docker containers) and Proxmox VE (VMs and LXC
  containers) into one list.
- **IP Address badges**: optional WAN/LAN address badges on the Router
  (WAN centered below Internet, LAN centered below Router) and an
  address badge on every Access Point (above the circle for a
  non-Primary AP and for a Flat-layout Primary AP; below the circle for
  a Tiered-layout Primary AP), plus a WAN badge below Internet when the
  Primary AP itself is acting as the router. Gated by a new **"Show IP
  Addressing"** toggle (Advanced → Layout, off by default), sized to
  match PoE badges, with independent background/text color pickers on
  both the Router and each Access Point, and a new **IP Address Badge
  Opacity** slider (0-100%, default 100%, Advanced → Layout).
- **Delete All** button for Clients, with a confirmation prompt.
- **Remove** action on every already-applied auto-discovered candidate
  (Router, Security/AdGuard, Clients, Nodes, Container/VM) - replaces
  the old static "Selected"/"Already added" label with an actionable
  button, styled in the secondary text color, that clears exactly the
  fields that candidate contributed and makes it selectable again after
  a confirmation prompt.

### Changed

- **"Individual Devices" renamed to "Clients"** throughout the editor
  and menus. The underlying `individual_devices` config key is
  unchanged, so existing configs and dashboards keep working.
- **Discovery buttons renamed from "Use this" to "Select"**, for
  consistency across every discovery list.
- **Primary AP layout now defaults to Flat** (previously Tiered) for
  new cards; existing configs with an explicit layout are unaffected.
- **Primary AP's own IP Address badge always renders above its
  circle**, regardless of Tiered/Flat layout.
- **Primary AP's backhaul is always treated as wired**, regardless of
  any Backhaul Type entity - it's the mesh's own connection point to
  the router, not a hop backhauling through another AP.
- **"PoE Badge Size" and "PoE Badge Font Size" renamed to "IP/PoE
  Badge Size" and "IP/PoE Font Size"**, reflecting that IP Address
  badges now share the same sizing.
- The Router-to-Primary-AP connector (Tiered layout) is **50% taller
  whenever Show IP Addressing is on**, since the Router's LAN badge and
  the Primary AP's own badge sit at opposite ends of that segment and
  would otherwise overlap.
- IP Address badges are now **plain text with no icon** (previously
  included a small IP-network icon).
- The card now ships with **lit bundled directly into the file**,
  rather than importing it from a CDN at runtime.

### Fixed

- **TP-Link Router and Deco auto-discovery found nothing.** The
  original classification relied on the Home Assistant device
  registry's `model` field containing a hint like "deco" or "router" -
  but real TP-Link Router/Deco devices report bare model numbers (e.g.
  "BE25") with no such hint, so it never matched. Router and Node
  discovery now use attributes confirmed directly against real device
  data instead: TP-Link Deco's `device_type` ("deco" vs "client") and
  `master` (true/false) attributes, and, for TP-Link Router, splitting
  purely by entity domain (`device_tracker` = clients, everything else
  on that device = router candidates, explicitly excluding buttons so a
  reboot button can never be mistaken for a status entity).
- **TP-Link Router used the wrong entities.** "Total Clients" was being
  used for both the Router status entity and the LAN Connected Devices
  entity; now uses "Connection Type" for Router and "Total wired
  clients" for LAN Connected Devices.
- **Backhaul Type/Speed and node metrics used the wrong entity
  suffixes for TP-Link Deco.** Entity IDs are slugified from the
  sensor's display name, not its internal key, so the real suffixes are
  `backhaul_type` / `backhaul_speed` / `_down` / `_up` /
  `connected_clients` - not `connection_type` / `download_speed` /
  `upload_speed` / `client_count` as originally assumed. Discovery also
  now skips these sensors when they're disabled (several forks ship
  them disabled by default) and falls back to reading `connection_type`
  as an attribute directly on the unit's own tracker entity, which is
  always live.
- **"Select All" on a filtered Clients or Nodes list added devices from
  every integration, not just the filtered one.** Select All now only
  affects entities in the currently visible (filtered) list, and
  preserves selections made under a different filter instead of
  discarding them.
- **Wired-connection detection missed some TP-Link Deco setups.** Now
  checks both the `connection` and `connection_type` attribute names,
  fixing incorrect "wireless" grouping/backhaul display where only the
  latter was present.

## [2.4.1]

Adds sub-grouping to Individual Devices - split the box into labeled
groups by SSID, VLAN, or connected Access Point, with UniFi support
alongside the existing TP-Link Deco support.

### Added

- **Group By** setting for Individual Devices, with three modes:
  - **SSID** - groups by network name (TP-Link Deco's `interface`
    attribute, or UniFi's `essid`). UniFi's `is_guest` always groups
    as "Guest" regardless of the actual SSID name.
  - **VLAN** - groups by UniFi's numeric `vlan` attribute when
    present (even for a guest client on a specific VLAN), falling
    back to "Guest" if there's no VLAN but `is_guest` is true, then to
    Deco's `interface`.
  - **Connected AP** - groups by Deco's `deco_device` (a friendly
    name) or UniFi's `ap_mac` (a MAC address, since UniFi doesn't
    expose a friendly AP name on client entities).
  - A wired device (`connection: wired`) always groups as "Wired"
    regardless of mode. Anything missing the relevant attribute (e.g.
    a binary_sensor) falls into "Unknown".
- **Group Override** field on each Individual Device, to manually
  assign it to a specific sub-group regardless of what its entity
  attributes say.
- **Sub-Group Width** layout, with three options: fit content and
  fill the gaps between boxes; fit content with only the last box
  filling remaining space; or - the default - whichever group has the
  most devices sizes to its own content while every other group
  equally shares the space left on that row.
- **Per-group outline colors**: an optional list of color overrides
  matched by exact group name (e.g. "Wired", "Guest", "VLAN 20"),
  falling back to a single default sub-group outline color, which
  itself falls back to the main box's color.
- **"Show Sub-Group Outlines" toggle**, to drop the sub-group borders
  entirely for a cleaner look.
- **Group Box Border Radius**, a separate setting from the main
  Individual Devices box's own radius (defaults to the same value).
- **Group Box Padding** slider (Advanced → Sizes), controlling the
  space between each sub-group's border and its label/devices.

### Fixed

- Sub-group box borders now use the exact same stroke weight as the
  main Individual Devices box and every other dashed line on the
  card, and dropped the rounded line-cap that was making short dashes
  look like a chain of bold blobs rather than a clean thin dash.

## [2.3.0]

A major release introducing the Homelab node type, two new Security
elements (DNS Filtering and Reverse Proxy), and a more consistent,
fully targetable badge system across the whole card.

### Added

- **Homelab node**: a new Node type for an appliance running several
  network functions at once (DNS filtering, a VPN server, a reverse
  proxy - the common single-box homelab pattern). Behaves like a
  standalone Switch structurally (its own circle on the bus, solid
  unanimated lines, optional Connected Devices), with its own
  independently configurable Circle Size and Icon Size, a dedicated
  deep-purple default color, and full PoE support.
- **Containers / VMs list on Homelab**: track any number of
  containers or VMs (e.g. Plex, Nextcloud, a Proxmox LXC), each shown
  as its own status badge (icon, active/offline colors, position) on
  the Homelab circle - independently positioned and stacking with
  everything else there.
- **"Show connection to Connected/Individual Devices" toggle** on
  Homelab, since most Homelab nodes have nothing hanging directly off
  them the way a Switch feeds clients - off by default expectation,
  hides the connecting line (and Connected Devices entity fields)
  entirely rather than always drawing toward a shared Individual
  Devices box this node has nothing to do with.
- **DNS Filtering** and **Reverse Proxy** added as full Security
  elements alongside VPN and Firewall, configured the same way -
  entity, icon, colors, and a target. DNS Filtering shows a "blocked
  count" style numeric badge (or an icon-only status badge if pointed
  at a binary_sensor/switch instead of a number - detected
  automatically, no mode toggle needed) with single/threshold
  coloring; Reverse Proxy is an active/offline icon badge like
  VPN/Firewall.
- **All four Security elements can now target the Homelab node or the
  main Switch**, in addition to Router/Gateway and Primary AP - with
  an inline warning if the chosen target doesn't currently exist in
  the config (e.g. targeting Homelab with no Homelab node added yet).
- **VPN Connected Peers**: an optional entity on the VPN Security
  section - when set, the VPN badge widens into a pill showing the
  icon plus that entity's value, instead of staying icon-only.
- **PoE badges now show an icon** (`mdi:lightning-bolt` by default,
  customizable) alongside their wattage value, instead of being
  text-only.

### Changed

- **PoE badges now default to the bottom-right corner** (previously
  top-right).
- **DNS Filtering's badge size is now governed by the same Badge
  Size / Badge Icon Size sliders every other badge uses** (VPN,
  Firewall, Primary AP, Reverse Proxy, Container), instead of PoE's
  own separate sliders - so adjusting one slider keeps every badge on
  the diagram in sync.
- **"AP Column Gap" renamed to "Column Gap" and moved to the end of
  Advanced → Sizes**, reflecting that it affects the whole bus layout,
  not just Access Point columns specifically.
- **Security menu description** now mentions DNS Filtering and
  Reverse Proxy alongside VPN and Firewall.

### Fixed

- A Homelab node and a regular standalone Switch node can now have
  independently configured circle sizes, but they share the same
  underlying grid row - without a fix, a smaller circle sitting next
  to a larger one in that row would leave its connecting line short.
  Applied the same gap-fill technique already used where Access
  Points and fed Switches of different sizes share a row.

## [2.2.1]

Small follow-up fixes for the Fed Switches feature introduced in 2.2.0.

### Fixed

- **A standalone Switch with nothing downstream showed a connecting
  line trailing off into empty space.** The segments just below its
  own circle were drawn unconditionally, with no check for whether
  there was actually a Connected Devices circle or an Individual
  Devices box to reach - unlike the segments further down, which
  already correctly skipped drawing anything in that case. Both now
  use the same check, so the line simply doesn't appear when there's
  nothing for it to connect to.
- **No flow-dot animation on the line feeding a fed Switch**, unlike
  the identical line feeding a fed Access Point in the same group.
  The animation flag on that line was hardcoded off by mistake (based
  on how a Switch's own *outgoing* lines intentionally stay static),
  but this line feeds *into* the Switch, not out of it, and should
  animate under the same global Animation setting as everything else
  incoming. Line style (solid, never dashed) is unchanged - only the
  animation was wrong.

## [2.2.0]

Extends PoE to the Router and every Access Point, adds nested
("fed") Switches under a Switch's Access Point group, and makes badge
positioning fully configurable per device.

### Added

- **PoE on the Router**, in addition to Switches and Access Points -
  same Auto/Manual sourcing, single-or-threshold coloring, and
  optional flash-on-threshold. Included in the PoE Total Summary item
  alongside every other PoE-capable device.
- **PoE on Access Points**: the same PoE capability Switches already
  had, now available on any Access Point (Primary or not), also
  included in the PoE Total Summary.
- **Fed Switches**: a Switch feeding Access Points can now also feed
  additional Switches, in the same row as its Access Points - each a
  leaf with its own icon, colors, Connected Devices, and full PoE
  support, connected with solid, unanimated lines the whole way down
  to Individual Devices (matching how any Switch's own output
  behaves). Managed from a new "Fed Switches" list under each Switch
  node, alongside its existing Access Points list.
- **Configurable badge position, per device**: Primary AP, VPN,
  Firewall, and PoE badges can each be placed in any of the four
  corners (top-left, top-right, bottom-left, bottom-right):
  - **PoE location** is set per device, inside that device's own PoE
    section (Router, Switch, Access Point) - not a single global
    setting, since different devices often want their badge in
    different corners depending on what else is showing there.
  - **Primary AP badge location** is set per Access Point, right under
    its "Show Primary AP Badge" toggle (only shown while that toggle
    is on) - not a global setting either, for the same reason.
  - **VPN and Firewall badge location** remain global settings
    (Security page), since each only ever targets one place (Router or
    Primary AP) at a time.
  - When two or more badges land in the same corner on the same
    circle, they now fan out slightly along that corner's edge so both
    stay visible instead of one hiding behind the other.
- **Unique default identity colors per device type**: Internet,
  Router, LAN, Switch, Access Point, and Individual Device each now
  default to their own distinct Home-Assistant theme color (green,
  indigo, teal, amber, cyan, and pink respectively) instead of every
  type defaulting to the same `var(--primary-color)`. Fully overridable
  per item as before; functional colors (download/upload/offline/
  Connected Devices) are unchanged, since those already carry a
  consistent meaning across every device type.

### Changed

- **PoE now defaults to Off** on every device (previously Auto), and
  its Badge Location option is hidden entirely while PoE is Off, only
  appearing once Auto or Manual is selected. Default badge location
  (once enabled) is top-right.
- **PoE section moved above Connected Devices** in the Router, Switch,
  and Access Point editor pages, so it now reads in a more natural
  order: device fields → PoE → Connected Devices. For a Switch node
  specifically, the full order is now Node Type → Node Name → Switch
  fields → PoE → Access Points → Fed Switches → Connected Devices.
- **"Router" menu renamed to "Router/Gateway"** throughout the editor
  (main menu, page title, and the VPN/Firewall "Applies To" dropdown
  options), to better reflect that this node commonly represents a
  combined router/gateway device.

## [2.1.0]

Adds Power over Ethernet (PoE) monitoring for Switches (including a
PoE Total Summary item), and a guest network indicator for Individual
Devices.

### Added

- **PoE badge on Switches** (both the top-level Switch and any
  Node-level Switch): a small top-right badge showing summed PoE
  wattage, no icon - just the value and unit. Two ways to source the
  total:
  - **Auto** - sums every entity on the switch's own device that
    reports watts and looks PoE-related (covers per-port sensors from
    integrations like UniFi Insights without listing every port by
    hand).
  - **Manual** - sum exactly the entities you list. Works even if the
    Switch itself has no status entity configured - PoE only needs the
    listed sensors, not the switch's own entity.
  - The badge hides itself entirely when there's nothing to show,
    rather than displaying "0 W" for a switch with no PoE sensors
    enabled.
- **PoE badge coloring**: a single fixed color, or **threshold
  colors** - up to three tiers (e.g. green up to 15W, orange up to
  30W, red above that), each independently colorable. Text color is
  set separately from the badge background in both modes.
- **PoE "Animate when above top threshold"** toggle (only shown in
  Threshold color mode) - the badge flashes using the same animation
  as the VPN/Firewall badges once the total exceeds every configured
  threshold.
- **PoE Badge Size** and **PoE Badge Font Size** sliders (Advanced →
  Sizes) - independent controls, so the pill's size and its text size
  can be tuned separately.
- **PoE Total Summary item**: a new option for the Summary rows
  (`mdi:lightning-bolt`, "PoE" / summed wattage) that adds up every
  PoE badge actually shown across the whole diagram - the top-level
  Switch and every Node-level Switch. Supports the same single-color-
  or-threshold coloring as the per-switch badges (Advanced → Layout,
  shown once PoE Total is selected as a Summary Item); its icon color
  is fixed to match the other Summary badges, and it never flashes,
  regardless of threshold settings.
- **Guest network badge on Individual Devices**: a small icon shown
  top-right on any Individual Device currently connected to a guest
  network, only while the device is online. Detected automatically
  from the device's own entity attributes - no per-device setup
  required:
  - TP-Link Deco - `interface` attribute equal to `"guest"`.
  - UniFi integration - `is_guest` attribute equal to `true`.
- **Guest badge icon, icon color, and badge background color**
  (Individual Devices page - background defaults to transparent), plus
  independent **Guest Badge Size** and **Guest Badge Icon Size**
  sliders (Advanced → Sizes). All global settings applying uniformly
  to every Individual Device.

### Fixed

- **PoE threshold fields could get permanently stuck.** Clearing a
  threshold's "Up to" value used to parse to `NaN`, which round-tripped
  through Home Assistant's config storage as `null` - and the editor
  was deciding whether to show the number input at all based on
  whether that value was set, so a cleared field silently became an
  uneditable "Above previous" label with no way to type a number back
  in. Which row shows the input vs. the label is now decided by its
  fixed position in the list (the last tier is always the open-ended
  catch-all) rather than by the current value, so clearing a field can
  no longer lock it.
- **PoE Total Summary item could show nothing even with valid PoE
  data.** Two separate issues: entities were being matched by an
  `entity_id` field on the Home Assistant entity registry that isn't
  guaranteed to exist on every entry (now matched by the registry's
  own dictionary key instead), and the per-diagram total was
  incorrectly requiring every Switch to have its own status entity
  configured - excluding any Switch used purely to attach manual PoE
  entities with no status entity of its own.
- **Guest badge rendered as an oval instead of a circle.** It never
  had an explicit width/height the way the VPN/Firewall badges do, so
  it just wrapped the icon's own non-square rendered box. Now sized
  explicitly so it's always a true circle.
- **Icons in badges (Guest, Primary AP, VPN, Firewall) sat slightly
  below center.** The main node circles already had a rule centering
  the icon element itself, not just its container - badges were
  missing that same rule and now have it too.
- **A Switch with no Connected Devices circle showed a dashed
  pass-through line where it should be solid.** The line segment
  filling that gap wasn't distinguishing a Switch-fed column from an
  Access-Point-fed one the way the segment above it already did, so it
  always rendered the AP's dashed style regardless of source.

## [2.0.0]

A major release consolidating everything since 1.4.1 into one stable
version. The headline change is **Nodes**: Access Points are no longer
the only thing that can hang off the bus - a Node can now be a plain
AP, a standalone Switch, or a Switch feeding one or more of its own
Access Points.

### Added

- **Nodes**: the Access Points menu is now **Nodes**. Each entry in
  the list can be:
  - A plain **Access Point**, exactly as before.
  - A standalone **Switch**, with its own icon, colors, offline
    detection, and an optional Connected Devices count.
  - A **Switch feeding one or more Access Points**, connected via its
    own small secondary bus-line - each AP underneath still gets full,
    independent configuration (bandwidth, backhaul, Connected Devices,
    colors).
  - Existing configs migrate automatically on load - every existing
    Access Point becomes its own Node with no visible change.
  - An AP can be flagged **Primary** regardless of which kind of Node
    it lives in, for the star badge and VPN/Firewall targeting. Tiered
    (promoted-above-the-bus) layout is only available when the Primary
    AP's Node is AP-only; if it's inside a Switch's group, the card
    silently renders as Flat instead of breaking the group apart.
  - The Node containing the Primary AP stands out in the Nodes list -
    icon shown in `var(--accent-color)`, with "(Primary)" appended to
    its title.
- **Security page**: the VPN menu is now **Security**, and sits
  alongside a new **Firewall** badge - its own entity, an "Applies To"
  target (Router or Primary AP), an Animate-when-Offline toggle, and
  full active/offline color and icon customization. Firewall's badge
  sits at the bottom-right of its host circle (VPN stays top-right), so
  both can be shown on the same node without overlapping.
- **Fully configurable Summary**: choose any 3 items, in any order,
  from Download, Upload, Latency and Jitter, VPN Status, or Firewall
  Status (Advanced → Layout → Summary Item 1/2/3). Replaces the old
  fixed Download/Upload/Ping arrangement and separate per-badge
  "Show in Summary" toggles.
- **Global Flow Line Color** (Advanced page): one color now controls
  every connection line and flow-dot animation on the card - Router,
  Switch (top-level and Node-level), LAN, Access Points, Individual
  Devices, and every Connected Devices connector - except the Internet
  connection, which remains independently configurable on the Internet
  page. The many separate per-node line-color pickers this replaced
  have been removed from the editor.
- **AP Column Gap** slider (Advanced → Sizes) - controls the horizontal
  spacing between Node columns, so a large number of them can be
  packed tighter to fit on screen instead of stretching off it.
- **Backhaul Icon Size** slider, and an **Individual Devices Box
  Border Radius** setting (any CSS length or theme variable; defaults
  to `var(--ha-card-border-radius, 12px)`).
- **Uniform column widths**: every Node column is now at least as wide
  as the largest AP, Switch, or Connected Devices circle actually used
  in that specific diagram, so a column with only a thin connector
  line never looks visibly narrower than its neighbors.

### Changed

- **Unified badge sizing**: Primary AP, VPN, and Firewall badges now
  share a single "Badge Size" / "Badge Icon Size" pair (Advanced →
  Sizes) instead of separate controls for each.
- **Unified Switch sizing**: a Switch's own Connected Devices circle -
  whether the top-level Switch above the bus, or a Switch-only Node -
  now uses the same global AP Connected Devices size, rather than a
  separate, easy-to-miss setting.
- **Consistent solid lines out of every Switch**: any connection
  coming out of a Switch - to its own Connected Devices circle, to a
  fed Access Point, or straight through to the Individual Devices box
  - always renders solid and un-animated, since it represents a wired
  connection rather than a live, animated metric.
- **Consistent AP lines**: a plain Access Point's connecting line -
  including any pass-through segments where it has to bridge past an
  unrelated Switch elsewhere on the bus - shows dual download/upload
  strands or a single line based on that specific AP's own bandwidth
  configuration, and renders dashed when its backhaul is wireless, the
  whole way from the bus down to its own circle.
- **Primary AP's Individual Devices connector** now follows the
  Primary's actual position in the Nodes list (e.g. 3rd node → 3rd
  column from the left) instead of a fixed position, so it can never
  land awkwardly next to - or inside - an unrelated multi-AP Switch
  group.

### Fixed

Extensive alignment and rendering refinements across the bus structure
that came with introducing Nodes and Switches, including: the main
bus-line correctly stopping at each Node's actual center rather than
the outer edge of a multi-AP Switch group; a Switch feeding multiple
APs showing a properly connected mini bus-line and stem instead of an
unstyled block or a floating line; and connecting lines throughout the
bus correctly stretching to reach the circle below them instead of
leaving a gap when a shared row computes taller than expected.

## [1.4.0]

### Added
- **Switch node** - an optional node between Router and your Access
  Points, for setups with a managed switch distributing connectivity
  (e.g. a PoE switch feeding multiple APs). Only appears once an entity
  is configured (same pattern as Router). Supports its own icon,
  colors, offline state, and an optional Connected Devices count shown
  as a side branch (matching how LAN's Connected Devices renders off
  Router). Works correctly whether or not Router itself is configured,
  and correctly positions itself above a Tiered-layout Primary AP or
  directly above the Access Point row if there's no Primary AP.
- **Firewall badge** - mirrors the VPN badge exactly: single entity,
  "Applies To" target (Router or Primary AP), Animate when Offline, and
  full active/offline color and icon customization. Defaults to
  `mdi:wall-fire` with an orange background, positioned at the
  bottom-right of the circle (VPN stays top-right) so both can show
  simultaneously without overlapping.
- **Fully configurable summary**: choose any 3 items, in any order,
  from Download, Upload, Latency and Jitter, VPN Status, or Firewall
  Status (Advanced → Layout → Summary Item 1/2/3). Defaults to
  Download/Upload/Latency and Jitter, matching previous behavior. Each
  item only appears if its underlying entity is actually configured.

### Changed
- The **VPN** menu is now **Security**, housing both the VPN and
  Firewall sections together.

## [1.3.0]

### Added
- **Complete editor GUI overhaul**: every page reorganized into clear
  sub-sections with two-column color layouts - Internet
  (Internet/Billing/Metrics), Router (Router/LAN Connected Devices), a
  new dedicated VPN page, Access Point (Access Point/Backhaul/Connected
  Devices), and Advanced (Layout/Animation/Sizes).
- **VPN badge**: shows on either the Router or the Primary Access Point
  - pick one VPN entity and an "Applies To" target, and the badge
    appears wherever you've pointed it. Always visible once configured,
    switching between active and offline color sets based on the
    entity's state.
- **VPN "Animate when Offline"** toggle - the badge flashes when
  disconnected, so it's harder to miss.
- **VPN "Show in Summary"** toggle - replaces the Ping/Jitter summary
  badge with a VPN status readout ("VPN" / "Online" or "Offline"),
  matching the VPN badge's color scheme.
- **New "Connection Lines Color"** field per Access Point, used as the
  fallback color for single-line rendering when no download/upload
  entities are configured (previously silently reused the download
  color).
- Menu and list icons now use the theme's primary color throughout.

### Changed
- **LAN Connections** is no longer a top-level menu item - it's now a
  "LAN Connected Devices" sub-section within the Router page.
- **Primary AP badge**: combined the separate "Show in Tiered/Flat
  Layout" toggles into a single "Show Primary AP Badge" switch, with
  colors now set per-AP instead of globally.
- **Color picker layout**: every color selector across all pages now
  shows its label on its own row, with the swatch and hex input on the
  row below - much less cramped than the previous side-by-side layout,
  especially inside two-column sections.
- Badge and node sizing remain global settings, consolidated at the
  bottom of Advanced under "Sizes".

### Removed
- Router Status Entity picker from the editor (unused).

## [1.2.0]

### Added
- **VPN badge**: shows automatically on the Router and Primary AP nodes
  when a configured VPN-active entity reports "on". Customizable icon
  (defaults to `mdi:vpn`), background/icon/outline colors, and size -
  all under Advanced → VPN Badge. Configure the VPN entity itself on
  the Router page, or on an Access Point's page once it's marked
  Primary.

### Changed
- The Primary AP badge (Flat/Tiered layouts) now sits on the **left**
  side of the circle, making room for the new VPN badge on the right.

### Fixed
- **Offline detection now recognizes `not_home`.** Entities like
  `device_tracker`s (commonly used by network-device integrations such
  as UniFi for APs/switches) report `home`/`not_home` rather than
  `on`/`off`, and were previously never detected as offline by the
  card - only entities that became Home-Assistant-level `unavailable`
  were caught.

## [1.1.1]

### Fixed
- **Layout shifted sideways whenever an outermost AP went offline.** An
  offline AP renders an "X" marker instead of its normal connector line,
  and the alignment measurement was only looking for line elements -
  so an offline AP at either end contributed nothing to the leftmost/
  rightmost calculation, causing the whole layout to shift toward
  whichever AP was still online at that edge. The offline marker is now
  included in that measurement too.

## [1.1]

### Added
- **Primary Access Point** designation with two layout options:
  **Tiered** (promoted into the main trunk between Router/Internet and
  the rest of the topology) or **Flat** (stays inline with the other
  APs, marked with a customizable badge instead).
- **Primary AP badge**: custom icon, background/icon/outline colors,
  adjustable size, and independent show/hide toggles for Tiered and
  Flat layouts.
- **Reordering** for both Access Points and Individual Devices (move
  up/down within the editor).
- **Backhaul type icon** on each AP's connector line (wired vs.
  wireless), with a per-AP visibility toggle.
- **Global size controls**: circle and icon sizes for every node type
  (Internet, Router, LAN, Access Points, Connected Devices, Individual
  Devices) are now set once under Advanced settings, instead of being
  configured separately on every individual item.
- Download/Upload summary badges now hide independently when their
  entity isn't configured, instead of showing an empty placeholder.

### Changed
- All default colors now use Home Assistant theme variables instead of
  fixed hex values, so newly added nodes automatically match your theme
  (including dark mode). Still fully overridable per-element as before.
- Improved spacing between the card title and summary badges when
  positioned left or right.

### Fixed
- Extensive alignment fixes for the T-bar/bus-line connecting Access
  Points to the Primary AP or Router, covering uneven AP counts, dual
  vs. single bandwidth lines, a Primary AP with or without its own
  Connected Devices, and enlarged circle sizes. Alignment is now
  computed dynamically from actual rendered positions at render time,
  rather than relying on fixed layout assumptions.
- The Individual Devices connector line no longer disconnects in
  several edge cases (Primary-AP-only setups, Primary AP going offline,
  asymmetric AP layouts).
- The card's internal layering (z-index) is now fully isolated from the
  rest of the dashboard, so it can no longer visually conflict with
  other cards (e.g. custom navigation docks).
- Various single-line-fallback and offline-state rendering fixes for
  Internet, Router, and Access Point connectors when bandwidth entities
  aren't configured.

## [1.0.1]
- Added credit/acknowledgment for power-flow-card-plus as design
  inspiration (README and source header).

## [1.0.0] - Initial public release

First public release, packaged for HACS distribution.

### Features
- Internet, Router, LAN, and unlimited Access Point nodes with animated
  download/upload flow lines.
- Router is optional — hides automatically when no entity is set, with
  Internet's lines reconnecting directly to the Access Point layer.
- Per-node offline detection (`unavailable` / `unknown` / `off`) with
  pulsing warning icons, dimmed colors, and "X" markers on affected flow
  lines.
- Billing-cycle progress ring on the Internet node.
- Ping and jitter display on the Internet node.
- Primary Access Point designation and per-AP Backhaul Type entity
  (solid line for wired, dashed for wireless/mesh).
- Individual Devices section: an auto-sizing, dashed-bordered box tracking
  arbitrary entities with online/offline styling.
- Configurable summary badges (download/upload/ping/jitter) with
  top/bottom/left/right positioning.
- Smart single-AP layout collapsing to avoid a redundant one-branch T-bar.
- Full visual GUI editor covering every configuration option.
- Per-element color customization, with support for CSS/theme variables.
- card_mod compatibility.
