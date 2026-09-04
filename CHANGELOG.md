# Changelog

All notable changes to this project are documented in this file.

## [1.1.0]

### Added
- **Primary Access Point layout**: when one AP is marked as Primary, it now
  sits directly in the trunk between Router (or Internet, if Router is
  hidden) and the rest of the topology. The remaining Access Points fan
  out from the Primary AP's own T-bar/bus-line instead of from Router.
  If no AP is marked Primary, the layout is unchanged from v1.0.x — all
  APs hang below Router as before.

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
