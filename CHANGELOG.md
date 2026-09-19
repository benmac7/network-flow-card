# Changelog

All notable changes to this project are documented in this file.

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
