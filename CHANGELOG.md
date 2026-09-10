# Changelog

All notable changes to this project are documented in this file.

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
