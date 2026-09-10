# Changelog

All notable changes to this project are documented in this file.

## [2.4.3]

### Fixed
- **Switch-only node's line to Individual Devices had flow dots and
  was dashed**: a Switch-only column with no Connected Devices of its
  own passes straight through the AP layer on its way down - that
  pass-through was incorrectly using the live animation flag, giving
  it flow dots it shouldn't have (nothing below a Switch should
  animate, since it isn't tied to a specific metric). Separately, the
  Individual Devices connector itself was always dashed regardless of
  what fed it. Both are now solid, un-animated whenever the feeder is
  a Switch or its own Connected Devices circle - matching the existing
  rule that anything coming out of a Switch is solid, all the way down
  to the Individual Devices box.

## [2.4.2]

### Fixed
- **Restored dual-strand pass-through lines**: 2.4.1 over-corrected by
  removing the download/upload dual-strand visual from the Switch-layer
  pass-through rows entirely. That visual was actually correct - an AP
  with both download and upload entities configured should show two
  strands the whole way from the bus down to its circle, not just on
  its own final segment. The only part that needed reverting was the
  pass-through row always existing even with no Switch anywhere on the
  bus. Pass-through rows now correctly show dual strands or a single
  line based on each AP's own bandwidth configuration - the same rule
  as the AP's own terminal line - while still only existing at all when
  a Switch is actually present somewhere on the bus.

## [2.4.1]

### Fixed
- **Duplicated vertical lines connecting a plain AP to the bus**: the
  Switch-layer pass-through rows (3 and 4) had at some point been
  changed to render the AP's own full download/upload dual-strand line
  - the same visual that belongs only on the AP's actual terminal line
  - rather than a plain single connecting line. This meant a dual-
    bandwidth AP could show what looked like two separate line segments
  stacked on top of each other instead of one continuous connection.
  Also reverted the 2.3.2 change that made the pass-through row always
  render even with no Switch anywhere on the bus - that "fix" was
  solving an inconsistency that turned out to be correct, expected
  behavior (a plain AP's own line has always been the entire visual
  connection when no Switch is involved anywhere), and was contributing
  to the duplicated-line appearance. Pass-through rows are simple, single
  generic lines again, and only exist at all when a Switch is actually
  present somewhere on the bus.

## [2.4.0]

### Added
- **Backhaul Icon Size** slider (Advanced → Sizes) - was previously a
  fixed 13px, hardcoded in CSS.
- **Individual Devices Box Border Radius** (Individual Devices page) -
  was previously a fixed 16px SVG corner radius. Accepts any CSS
  length or variable. Defaults to `var(--ha-card-border-radius, 12px)`
  - a plain `--border-radius` variable isn't part of Home Assistant's
    default theme as far as I could confirm, so `--ha-card-border-radius`
    (HA's actual standard card-corner variable) is used instead, with a
    12px fallback for themes that don't define it.

## [2.3.3]

### Fixed
- **Root cause of the collapsed upload/download lines and hidden
  backhaul badge**: this was a real regression from 2.3.0, not 2.3.2.
  `height:100%` alone gives CSS Grid's row auto-sizing nothing to
  measure - percentage heights don't contribute to a row's intrinsic
  size. When the AP's own dual-line was changed to stretch via
  `height:100%` (to fix an earlier gap), a row where every column also
  used percentage-height content had no fixed reference point left at
  all and collapsed to zero - hiding the download/upload lines and the
  backhaul badge riding on them entirely, which is what the extra stem
  from 2.3.2 was sitting alongside. All four affected line-rendering
  helpers now combine `height:100%` with a `min-height` fallback -
  stretching to fill a taller row when one exists, while always
  contributing a real minimum size so the row itself can never
  collapse to nothing.

## [2.3.2]

### Fixed
- **Stem between the bus-line and each column was inconsistent
  depending on whether any Switch node happened to exist anywhere on
  the bus**: the whole Switch layer (both the connecting line and the
  Switch circle itself) collapsed to zero height together whenever no
  node had a Switch - which also removed every column's own short
  connecting stem, even columns with no Switch involvement at all. Row
  3 (the stem/connecting line) and Row 4 (the Switch circle itself) now
  collapse independently: Row 3 always reserves a small, consistent
  height so every column has the same visual drop from the bus-line
  regardless of whether a Switch exists anywhere, while Row 4 still
  fully collapses when there's no Switch to actually show.

## [2.3.1]

### Fixed
- **Uniform column width was factoring in the top-level Switch's size
  even when no Node-level Switch existed**: the Switch circle size
  setting is shared between the top-level Switch (above the bus) and
  any Node-level Switch, so the comparison was pulling in a size that
  had nothing to do with the Node columns themselves whenever no
  Node-level Switch was actually part of the bus. Each size now only
  counts toward the comparison if that element type actually appears
  in this specific diagram's Node columns - so with no Node-level
  Switch present, only AP and Connected Devices sizes are compared, as
  intended.

## [2.3.0]

### Changed
- Primary AP's Nodes-menu highlight now reads "(Primary)" (in
  parentheses) and uses `var(--accent-color)` - confirmed this is a
  standard Home Assistant theme variable (part of the official
  primary/accent color system) rather than guessing.
- **Uniform column widths**: every node column is now at least as wide
  as the largest circle used anywhere in the diagram (AP, Switch, or
  Connected Devices size), so a column with only a thin connector line
  no longer looks visibly narrower than its neighbors.

### Fixed
- **Likely actual cause of the persistent "gap above the AP circle"
  bug**: found via your description of exactly where it sits. An AP's
  own terminal line (the one showing the backhaul badge) had a fixed
  pixel height, but its container uses `align-items:stretch` - a fixed-
  height child can't actually stretch, so if that shared grid row ever
  computed taller than the line's fixed height for any reason, the line
  would sit at the top of the row, leaving a gap between its end and
  the AP circle below. The line (and its offline "X" counterpart) now
  stretch to fill the row instead of using a fixed height, so it always
  reaches the circle regardless of what determines the row's height.

## [2.2.2]

### Added
- **Primary AP now stands out in the Nodes menu**: the node containing
  the Primary AP shows its icon in `var(--warning-color)` (a standard
  Home Assistant theme variable) instead of the usual `--primary-color`,
  and has " Primary" appended to its list title - so it's identifiable
  at a glance without opening the node. Checks every AP within the
  node (not just the first), so this also works correctly for a
  Primary AP sitting inside a Switch's multi-AP group.

## [2.2.1]

### Fixed
- **Likely cause of offline-Switch gap in unrelated APs' lines**: an
  AP within a Switch group going offline switched its row from a
  stretching pass-through line to a fixed-height "X" icon. CSS Grid's
  auto-sized rows compute their height from the tallest fixed-size
  content across every column sharing that row - stretching content
  doesn't contribute to this calculation, but a fixed-height element
  does. Introducing a smaller fixed height into an otherwise-stretching
  row could shrink that row for every column in it, including
  unrelated plain APs elsewhere in the same bus. Added a stretching
  variant of the offline indicator specifically for pass-through
  contexts, matching the stretching behavior of its online counterpart.
  Flagging this as a likely rather than fully confirmed fix, since I
  couldn't reproduce the exact scenario to verify directly - please
  check whether this resolves it.

### Cleanup
- Removed a couple of small leftovers from the previous global flow
  color migration (one line-color reference that hadn't been fully
  simplified, one unused variable) - no behavior change.

## [2.2.0]

### Changed
- **Global Flow Line Color** (Advanced page): a single color now
  controls every connection line and flow dot on the card - Router,
  Switch (top-level and Node-level), LAN, Access Points, Individual
  Devices, and every Connected Devices connector - except the Internet
  connection, which remains independently configurable on the Internet
  page as before. Removed the now-redundant per-node line color
  pickers (Router, LAN, Switch, and each AP's Download/Upload/
  Connection Lines Color fields) since they no longer affected
  anything once the global color took over.
- **Primary AP's Individual Devices column now follows Node-menu
  order**: reverted the "always leftmost" behavior from 2.1.6. The
  extra column carrying the Primary AP's own devices connector is now
  positioned at the same relative index the Primary's node occupies in
  the Nodes list - e.g. if the Primary is the 3rd node, its devices
  connector is the 3rd column from the left - rather than always being
  forced to the first position (which risked landing awkwardly next
  to, but not inside, an unrelated multi-AP Switch group).
- **Switch-only node's Connected Devices circle now matches the global
  AP Connected Devices size**: removed the separate "Switch Connected
  Devices" size sliders entirely. A Switch's own devices circle (both
  the top-level Switch above the bus, and a Switch-only Node) now uses
  the same Connected Devices Circle/Icon Size sliders as every AP, for
  one consistent size across the whole card.

## [2.1.7]

### Fixed
- **Regression from 2.1.6**: moving the Primary AP's Individual Devices
  connector to always be the leftmost column left it completely
  excluded from the bus-line's own alignment measurement, since that
  column was never marked in a way the measurement logic would pick up
  alongside the real columns' lines. The bus-line ended too short to
  reach it, leaving the connector sitting disconnected outside the
  T-bar. Rewrote the measurement to compute each candidate's correct
  reference point individually - a real column's thin connecting line
  uses its own edge, while a full-width container like the extra
  column uses its center - so both kinds of elements are measured
  correctly in the same pass instead of assuming every candidate has
  the same shape.

## [2.1.6]

### Fixed
- **Wireless-backhaul AP line was solid-then-dashed instead of fully
  dashed**: when a Switch node exists elsewhere in the bus, a plain
  AP's connection to the trunk splits across pass-through rows (Switch
  layer) before its own terminal line (AP layer). The pass-through
  segments never carried the AP's own wired/wireless backhaul style,
  so they always rendered solid regardless of the AP's actual backhaul
  type. The whole connection - from the Primary AP or bus down to the
  AP circle - now renders fully dashed when that AP's backhaul is
  wireless, matching the AP's own terminal line.
- **Primary AP's Individual Devices connector splitting a Switch group
  in half (Tiered mode)**: the extra column carrying the Primary AP's
  own devices connector was positioned at the horizontal midpoint of
  the bus, which could land it in the middle of a multi-AP Switch
  group's column span, breaking the group's mini bus-line and stem
  visually. It's now always the leftmost column instead, so it can
  never land inside another node's own span.

## [2.1.5]

### Fixed
- **Invisible gap between a Switch node and its own Connected Devices
  circle**: found the exact cause thanks to your screenshot pinpointing
  it - the Switch node's default color schema was simply missing a
  `devices_line` field entirely. The connector line element was still
  being rendered (correctly stretching to fill its row), but with
  `background:undefined`, making it completely invisible rather than
  absent - which is exactly why it looked like a structural gap rather
  than a missing element. Added the missing default, plus a defensive
  fallback at the render site itself so a similar missing-field issue
  can't silently reproduce this again.

## [2.1.4]

### Fixed
- **Missing/invisible flow-dot animation when a plain AP node coexists
  with a Switch node**: the previous release made pass-through segments
  (rows where a layer isn't active for a given column, e.g. a plain
  AP's Switch-layer rows) static to fix an "out of sync" complaint.
  That traded one problem for a worse one - for a plain AP, those
  static pass-through rows can be the majority of its visible vertical
  connection, making the whole thing look frozen. Pass-through segments
  now animate again, but using the *same* duration as that column's own
  terminal line (computed once upfront per column) rather than a
  mismatched hardcoded value - so the flow now reads as one continuous,
  consistently-paced animation instead of either "disjointed" or
  "absent".

### Investigating
- A reported gap below a Switch specifically in Tiered mode (not
  reproduced in Flat mode) hasn't been conclusively diagnosed from
  screenshots alone - the Switch circle itself doesn't appear dimmed
  or offline-styled, which rules out my first hypothesis (an incorrect
  offline check suppressing the pass-through). Holding off on a
  speculative fix; a screenshot showing the full column from bus-line
  down to the Individual Devices box, or confirmation of exactly which
  row the gap appears at, would help pin this down precisely.

## [2.1.3]

### Fixed
- **Switch-only column showing a gap where the AP would be**: the AP
  circle layer (row 6) had no rendering at all for a column with no
  AP, unlike every other layer which correctly passes a line through.
  Added the missing pass-through, so a Switch-only column now connects
  cleanly all the way down through the Devices layer and Individual
  Devices connector.
- **Mini bus-line's vertical drop lines extending above the line
  itself**: each AP's own drop within a Switch group used a fixed
  24px line, bottom-aligned within a row whose actual height could be
  taller - pushing the line's top edge above where the mini bus-line
  visually sits. These now start exactly where the mini bus-line ends
  and stretch down to the AP circle, instead of a fixed height anchored
  to the wrong edge.
- **Flow-dot animations appearing out of sync**: pass-through segments
  (where a layer isn't active for a given column, e.g. a plain AP
  passing through the unused Switch layer) were each running their own
  independent dot animation, competing visually with the AP's own
  terminal line right below them. Pass-through segments are now static
  - only the actual Switch or AP line carries the animation, since
  that's the one representing real data.

## [2.1.2]

### Fixed
- **Main bus-line over-extension**: the alignment measurement was
  finding the leftmost/rightmost point across *every* line in the
  entire bus, including individual APs' own lines deeper inside a
  Switch group - which sit further out than the Switch's own centered
  position above them. It now only measures the top-most layer
  actually touching the main bus (the Switch layer when a Switch
  exists, or the AP layer directly when it doesn't), so the bus-line
  correctly stops at the Switch's center rather than the group's
  farthest AP.
- **Mini bus-line spanning circle edges instead of centers**: it used
  a full-width fill, extending to the outer edges of the first and
  last AP in the group. Now inset by half a circle's width on each
  side so it stops at the outer APs' centers, matching how the main
  bus-line already behaves.
- **Missing connector between a Switch and its mini bus-line**: added
  the short vertical stem that was absent between the Switch circle
  and the horizontal split below it.

## [2.1.1]

### Fixed
- **Mini bus-line rendering as a large grey block**: the horizontal
  line splitting a Switch into multiple APs had no CSS at all, so it
  filled its entire grid cell instead of appearing as a thin bar. Now
  correctly styled as a 2px line positioned at the top of its row.
- **Gaps in pass-through connector lines**: columns without a Switch
  (or without an AP) need their line to visually pass through that
  layer's row untouched. These were using a fixed 28px height, but the
  row itself can be much taller when another column in the same row
  has a large Switch or AP circle - leaving a visible gap above or
  below the short line. Pass-through lines now stretch to fill the
  row's actual height instead.
- Removed several stale `grid-row` values left over from the old
  7-row layout (now 9 rows) inside CSS classes - harmless since every
  actual usage already sets `grid-row` explicitly inline, but
  confusing to read and risky for future changes.

### Known issue
- The bus-line still appears to extend slightly beyond the leftmost
  and rightmost columns in some layouts. The alignment-measurement
  logic (`_alignBusLine()`) wasn't changed in this pass since I
  couldn't pin down the exact cause from code alone - if this persists
  after the above fixes, a fresh screenshot would help narrow it down
  further.

## [2.1.0]

### Changed
- **Rebuilt the Switch-with-APs structure (Phase 3) as three fixed
  layers** instead of column-spanning group headers. The previous
  approach tried to fit a taller Switch circle into the same grid row
  as plain APs' short connecting lines, which broke visually since a
  CSS Grid row's height is shared across every column in it. The bus
  now always has three independent layers - Switch, Access Point, and
  Connected Devices - stacked in that fixed order:
  - Every node's Switch (if it has one) renders at the Switch layer;
    nodes without one just pass a plain line straight through.
  - Every node's AP(s) render at the AP layer; a Switch feeding
    multiple APs gets its own small bus-line splitting into each one.
  - Devices (from either an AP or a Switch-only node) render at the
    Devices layer, same as before.
  - **Any layer with nothing in it across the whole bus collapses
    entirely** - e.g. if no node uses a Switch, the Switch layer takes
    zero space, exactly like the Devices layer already did.
- Switch Node name field added - was previously only available on the
  top-level Switch (above the bus), not a Switch inside a Node.

### Fixed
- The vertical line connecting a Switch (top-level or Switch-only Node)
  to its own Connected Devices circle now renders solid instead of
  dashed, matching the rest of a switch's connections.

## [2.0.2]

### Fixed
- **Switch-only Node sizing**: Switch-type Nodes were inheriting the
  global AP circle/icon size sliders (since they're internally adapted
  to reuse the AP rendering pipeline). They now correctly use the same
  Switch Circle Size / Switch Icon Size / Switch Connected Devices
  sliders as the main Switch above the bus, so every switch in the
  diagram sizes consistently from one shared control.
- Confirmed (no change needed) that all Switch connecting lines already
  render solid rather than dashed by default.

## [2.0.1]

### Added
- **Switch-only Nodes**: a Node (in the Nodes menu) can now be a Switch
  instead of an Access Point - choose via the new "Node Type" selector
  at the top of each node's editor page. A Switch node supports its own
  icon, colors, offline state, and an optional Connected Devices count,
  hanging directly off the main bus line exactly like an AP node does
  today. Not eligible as a Primary node.

### Notes
This continues the Nodes architecture introduced in the previous
release. A Node combining a Switch with one or more of its own Access
Points (feeding a secondary T-bar) is a later addition - for now, a
Node is one or the other, not both together.

## [1.5.0]

### Changed (internal foundation - no visible behavior change)
- **Schema migration groundwork for an upcoming "Nodes" system**: the
  "Access Points" menu is now "Nodes", and the underlying config schema
  moved from a flat `access_points: [AP, ...]` array to `nodes:
  [{switch, access_points: [AP]}, ...]`. Existing saved configs migrate
  automatically on load - every existing AP becomes its own single-AP
  node with no switch, producing an identical rendered result to
  before. This is groundwork for a future release that will let a
  single Node contain a Switch feeding one or more Access Points; for
  now, every node still behaves exactly like a plain AP.

## [1.4.2]

### Added
- **AP Column Gap** slider (Advanced → Sizes) - controls the horizontal
  spacing between Access Point columns, so a large number of APs can be
  packed tighter to fit on screen instead of stretching off it. Was
  previously a fixed 32px with no way to adjust it.

## [1.4.1]

### Added
- **Switch Circle Size / Icon Size** sliders, and **Switch Connected
  Devices Circle Size / Icon Size** sliders (the side-branch previously
  had a fixed, non-configurable size) - all under Advanced → Sizes.

### Changed
- **Unified badge sizing**: the separate "Primary Badge Size"/"VPN
  Badge Size" slider pairs are now a single "Badge Size" / "Badge Icon
  Size" pair that controls all badge types together (Primary AP, VPN,
  and Firewall), since there was no real reason for them to size
  independently.

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
