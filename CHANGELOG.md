# Changelog

All notable changes to this project are documented in this file.

## [1.3.0]

### Changed
- **All default colors now use Home Assistant theme variables** instead
  of hardcoded hex values, based on
  [`color.globals.ts`](https://github.com/home-assistant/frontend/blob/3bd45dd29b57136b190539cfea7984235928b861/src/resources/theme/color/color.globals.ts):
  - Circle outlines and icons default to `var(--primary-color)`.
  - Circle fills default to `var(--primary-background-color)`.
  - Offline/error states (circles, icons, and "X" line markers) default
    to `var(--error-color)`.
  - Flow lines and dots that don't need a distinct accent default to
    `var(--primary-text-color)`.
  - Elements that benefit from staying visually distinct from one
    another (e.g. download vs. upload, or the four summary badges) use
    the theme's named palette variables (`--blue-color`,
    `--orange-color`, `--purple-color`, `--pink-color`, `--green-color`,
    `--cyan-color`, etc.) rather than fixed hex codes.
  - Badge icon colors sitting on solid colored backgrounds now use
    `var(--text-primary-color)`.

  The practical effect: a freshly-added node or Access Point now
  automatically matches your Home Assistant theme (including dark mode)
  instead of using a fixed color scheme. All of this remains fully
  overridable per-element in the GUI editor exactly as before — only the
  *defaults* changed.

## [1.2.1]

### Fixed
- The known limitation from 1.2.0 is resolved: a Primary AP with no
  sibling Access Points (i.e. it's the only AP configured) now correctly
  shows its Connected Devices node hanging directly below it, the same
  as any normal single AP would.

## [1.2.0]

### Added
- **Backhaul type icon** on each AP↔T-bar flow line: shows `mdi:ethernet`
  when the Backhaul Type entity reports "Wired", `mdi:wifi` for any other
  state, and nothing at all when no Backhaul Type entity is selected.
  Icon color is configurable per AP.
- When an AP has no download/upload entities selected, its connection to
  the T-bar now renders as a single line instead of two overlapping
  strands — still solid for wired / dashed for wireless based on Backhaul
  Type.
- **Primary AP's Connected Devices node** now renders correctly: it hangs
  directly off the T-bar as its own branch, at the same row as the other
  APs' device counts, instead of disappearing when that AP is marked
  Primary.

### Known limitation
- If the Primary AP is the *only* configured Access Point (no other APs
  exist to form a T-bar), its Connected Devices node will not currently
  render, since there's no T-bar for it to hang from in that case. This
  is being tracked as a follow-up.

## [1.1.1]

### Fixed
- Internet's download/upload connector line no longer disappears entirely
  when neither entity is selected. It now shows a default line matching
  how Access Points already behave in the same situation (a plain
  connector still renders even with no bandwidth entity attached).

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
