# Changelog

All notable changes to this project are documented in this file.

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
