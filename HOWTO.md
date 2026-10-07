# Network Flow Card - how-to guide

A complete guide to setting up and using Network Flow Card, from first install to
every page of the editor. For an overview of what the card is and which
integrations it supports, see the [README](README.md).

**Contents**

1. [Before you start](#1-before-you-start)
2. [Install the card and add it to a dashboard](#2-install-the-card-and-add-it-to-a-dashboard)
3. [Build a diagram the fast way: Discover](#3-build-a-diagram-the-fast-way-discover)
4. [The editor, page by page](#4-the-editor-page-by-page)
5. [Choosing and using the two views](#5-choosing-and-using-the-two-views)
6. [The details panel](#6-the-details-panel)
7. [The Summary](#7-the-summary)
8. [IP addresses and PoE](#8-ip-addresses-and-poe)
9. [Servers, VMs and containers](#9-servers-vms-and-containers)
10. [Offline detection and colours](#10-offline-detection-and-colours)
11. [Fitting the card on small screens](#11-fitting-the-card-on-small-screens)
12. [Styling with card_mod](#12-styling-with-card_mod)
13. [Worked examples](#13-worked-examples)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Before you start

- **Home Assistant 2023.4 or later.**
- **Your network devices must already be in Home Assistant**, usually through an
  integration for your router, switches and access points (UniFi, TP-Link, FRITZ!Box,
  MikroTik, OPNsense and many more - see the README's supported integrations list). The
  card draws what Home Assistant already knows; it does not talk to your devices itself.
- **For history graphs** (in the details panel), the sensors you want graphed must be
  recorded by Home Assistant's recorder. Anything excluded from the recorder will show
  no history.
- It helps to know which entity represents each device. For most integrations, a
  device's "status" entity is a sensor or a device tracker for that device. If you use
  Discover (next section), the card picks these for you.

## 2. Install the card and add it to a dashboard

**With HACS** (recommended): HACS → ⋮ → **Custom repositories** → add this repository,
category **Dashboard** → find **Network Flow Card** → **Download**. If HACS doesn't add
the resource itself, go to **Settings → Dashboards → ⋮ → Resources** and add
`/hacsfiles/network-flow-card/network-flow-card.js` as a **JavaScript Module**. Then
hard-refresh your browser (Ctrl/Cmd+Shift+R).

**Manually**: download `network-flow-card.js` from the latest release, put it in
`config/www/`, add `/local/network-flow-card.js` as a JavaScript Module resource, and
hard-refresh. After replacing the file later, add `?v=2` (then `?v=3`...) to the resource
URL so Home Assistant doesn't serve the cached copy.

**Add the card**: edit a dashboard → **Add Card** → search **Network Flow Card**. Or add
it in YAML:

```yaml
type: custom:network-flow-card
```

The card's editor opens with a menu. At the top is **Discover**; below it are the pages
described in section 4: **Internet**, **Router/Gateway**, **Core Switch**, **Security**,
**Nodes**, **Clients**, **Monitoring** and **Layout**.

## 3. Build a diagram the fast way: Discover

**Discover** scans every supported integration in one pass and shows what it found, in
sections. Nothing is applied until you select it.

1. Open the editor and tap **Discover**.
2. At the top, under **How should the card look?**, choose **Flat** or **Hyperbolic**. You
   can change this any time (here, or under **Layout**).
3. Tap **Re-scan Everything**. The page shows when it last scanned.
4. Work through the sections, top to bottom:

   | Section | What it finds |
   |---|---|
   | **Internet · Speedtest** | speed test sensors (ping, download, upload, jitter) |
   | **Internet · ISP** | billing cycle and data usage from your ISP's integration |
   | **Router / Gateway** | your router, with its real-time speeds and addresses where known |
   | **Security · Firewall & VPN (pfSense)** | pfSense firewall and VPN entities |
   | **Security · DNS Filtering** | AdGuard Home, and OPNsense's Unbound Blocklist |
   | **Nodes (Access Point / Switch / Server)** | access points, switches and servers |
   | **Server · Container / VM** | containers and VMs for a Server you have added |
   | **Clients** | device trackers |
   | **Monitoring** | Uptime Kuma, Ping, Gatus and UptimeRobot services |

5. In each list, choose items and press **Select** (or select several and add them).
   Every list has a **keyword search** (by name or entity id) and, where it makes sense,
   a **Filter by integration**.
6. For Nodes, each discovered item has an **Add as** choice: a new top-level Node, or
   *under* a Switch or Access Point already on the card, at any depth. For UniFi devices
   that report which device they are plugged into, the card defaults to that parent.
   Discovery can't otherwise know which switch feeds which - see section 4.5 to arrange
   them by hand.
7. Each section has a **Remove All** button (a sweep icon) if you want to undo what you
   added.

> Discovery never guesses silently: some integrations are marked **experimental** in the
> README because they haven't seen much real-world use. Review what they find.

When you are done, close the editor and look at the card. Then use the pages below to
refine it.

## 4. The editor, page by page

The pages are listed here in menu order. Every page shows only what it needs: leave an
entity blank and the matching node or badge isn't drawn.

### 4.1 Internet

The top of the diagram. Fields:

- **Internet Entity** and **Icon** - the entity that says whether the connection is up.
- **Quota** - **Quota Total Entity** and **Quota Remaining Entity** draw a progress ring
  around the Internet circle for a billing cycle. The ring uses **Quota Progress Color**
  and **Quota Remaining Color**. With no quota entities, the circle's outline is its
  **Border Color**.
- **Metrics** - **Download Speed Test Entity** and **Total Downloaded Entity**, **Upload
  Speed Test Entity** and **Total Uploaded Entity**, **Ping Entity** and **Jitter Entity**.
  The **Download Icon** and **Upload Icon** are used on the Summary badges.
- **Colours** - **Border Color**, **Icon Color**, and their **Offline** versions, used when
  the entity is down.

**A second connection.** The Internet page has **Primary** and **Secondary** tabs. Fill in
the Secondary for a backup line or a genuine second connection. **Mode** chooses how it is
drawn: **Active/Active** (solid and animated, carrying traffic) or **Active/Standby**
(dashed and still while idle, switching to solid the moment the primary is down).

### 4.2 Router/Gateway

Optional - leave **Router Entity** blank and the Router (and anything hanging off it,
including LAN) disappears.

- **Router Entity**, **Icon**, and colours (**Border Color**, **Icon Color**, offline
  versions).
- **Download Speed Entity** and **Upload Speed Entity** - the Router's live throughput.
  These feed the **Real-time Download / Upload** Summary items. With no Router, they fall
  back to the Primary Access Point's own speed entities; a Router that is configured but
  has no speed entity shows nothing for that direction.
- **WAN Address Entity** (and, once a Secondary Internet exists, **Secondary WAN Address
  Entity**) and **LAN Address Entity** - shown as IP pills. See section 8 for how the
  address is read.
- **LAN Connected Clients** - an entity for the number of clients on the LAN, drawn as its
  own circle beside the Router.
- **Total Clients Entity** (Hyperbolic view) - an entity for the router's total client
  count, used by its Connected clients graph.
- **Badge Background / Badge Text Color** colour the IP pill.

### 4.3 Core Switch

Optional - the one switch that sits between Router and the bus of Nodes. (A Node's own
Switch, in 4.5, is separate and unlimited in depth.)

- **Entity**, **Icon**, colours, and **Connected Clients** (an optional entity for its
  client count, drawn as a side circle).
- **IP Address** - an **IP Address Entity (Optional)** and pill colours (see section 8).
- **PoE** (see section 8).

### 4.4 Security

Four badges, each with its own entity, and each pointed at a device with **Applies To**:
**Router/Gateway**, **Primary Access Point**, **Server** or **Main Switch**.

- **VPN** - **VPN Entity**, and an optional **Connected Peers Entity (Optional)**.
- **Firewall** - **Firewall Entity**.
- **DNS Filtering** - **DNS Filtering Entity** (AdGuard Home, or an OPNsense Unbound
  Blocklist switch).
- **Reverse Proxy** - **Reverse Proxy Entity**.

For each badge you can set its icon, **Badge Icon Color**, **Badge Background Color**,
**Badge Border Color**, the same three for the **Offline** state, and **Animate when
Offline** to make it flash when it goes down. Where a Server is targeted, each individual
Server chooses (on its own page, under **Security**) which of these it shows.

The VPN, Firewall, DNS Filtering and Reverse Proxy states can also appear as Summary items.

### 4.5 Nodes

Nodes make up the bus below the Router / Core Switch. The list is an expandable tree: add,
edit, reorder and remove. Each Node has a **Node Type**:

- **Access Point** - own entity, icon, and:
  - **Download Speed Entity** / **Upload Speed Entity** for its line on the diagram.
  - **Backhaul** - **Type** and **Speed** entities. A Backhaul Type entity switches its
    uplink line between solid (wired) and dashed (wireless / mesh); **Show Backhaul Icon**
    toggles the icon on the line.
  - **AP Connected Clients** - an entity for its client count, drawn as a circle below it.
  - **Primary Access Point** - mark one AP as Primary. It gets a star badge
    (**Show Primary AP Badge**), and is the default target for Security badges. The
    **Primary AP Structure** on the Layout page chooses whether it stands above the
    others (**Tiered**) or in line with them (**Flat**).
  - **IP Address Entity**, **WAN Address Entity (if this AP is your router)**, and PoE.
  - An Access Point can itself feed further Access Points, Switches and Servers.
- **Switch** - a standalone Switch with its own **Connected Clients** count, which can feed
  **Access Points**, other Switches and Servers ("Fed Switches"), each with its full
  configuration, to any depth.
- **Server** - a box running several network functions (DNS filter, VPN, reverse proxy).
  Add any number of **Containers / VMs** to it as status badges on its circle. A Server can
  be a top-level Node or hang off any Switch or Access Point.

Each node has **Entity**, **Icon**, **Border Color**, **Icon Color** and **Offline Border /
Icon Color**, an **IP Address** section, and **PoE**. Switches and Servers also have
**Connected Clients**; Servers have a **Security** section, a **VMs and Containers**
section (section 9) and a **Show connection to Connected/Clients** toggle.

To move a discovered device under another, open the device and use the Nodes page, or use
the *Add as* choice when you add it from Discover.

### 4.6 Clients

The box of client devices beneath the diagram (and the clients in the Hyperbolic view).

- Add trackers one at a time (**Client**) with **Entity**, **Icon**, **Circle Color** /
  **Border Color**, **Icon Color** and offline colours - or add many from Discover.
- **Layout** and **Group By** - **None**, **SSID**, **VLAN**, **Connected Device** or
  **Device Area** split the box into labelled sub-groups. **Sub-Group Width** chooses how
  sub-groups share space: **Fit content, fill gaps between boxes**, **Fit content, last
  box fills remaining space**, **Widest box fits content, others share the rest**, or
  **Even - every box exactly the same width** (one equal column per sub-group, across
  the whole Clients box).
  **Show Sub-Group Outlines** draws a border round each.
- **Show Client Names** puts each client's name beneath its circle.
- Clients on a guest network get an automatic badge.
- **Unknown Node (Hyperbolic)** - colours for the node that collects clients the card
  cannot place.

### 4.7 Monitoring

Brings **Uptime Kuma**, **Ping**, **Gatus** and **UptimeRobot** monitors onto the diagram.

- **Monitored Services** - add by hand or from Discover. Each has **Entity**, **Icon**, a
  **Type** and colours (including **Down Border Color** and **Down Icon Color**).
- **Type**: **External** services draw in a dashed box above Internet; **Internal**
  services join the Clients box in a "Monitored" group, or - with **Assign to:** - attach
  as a badge to any device or client already on the card; **Auto** decides live, from the
  monitor's own tags or the address it checks.
- **Response Time** - an optional **Response Time Entity (Optional)**, with **Show Response
  Time Badge**, coloured as one **Single color** or **Threshold colors**.
- **Layout** and **Badge Icons** - badge colours and icons by state (**Up**, **Pending**,
  **Down**, **Maintenance**), the badge position, **Treat Unavailable As** (Pending or
  Down), and **Show Monitored Names**.
- A device with several services shows the worst state among them.

### 4.8 Layout

View, summary, details panel, sizes and animation. It is organised into five collapsible
sections.

**General** - **Title**, **Arrangement** (**Auto (by card width)**, **Phone - summary,
diagram and details stacked**, or **Tablet - summary and details on the right**), and, on
a tablet, either **Tablet: fit tree to screen height** or the tree's width. In the
Hyperbolic view, **Glass style (frosted, iOS-like)** with **Glass Blur**, and
**Transparent card background**.

**Graph** - **Show IP Addressing**, **Flow Line Color** (one colour for every connection
line and flow dot, including Internet's), and then:
- *Flat view:* **Primary AP Structure**, **Card Size** (section 11), **Horizontal Scroll**
  and **Hide Names**.
- *Hyperbolic view:* **Show node names**, **Clients** (**Attach to the AP / switch they are
  connected to** or **Group under a Clients node**), **Tree Appearance** (**Outline Color**,
  **Background Color** and their transparency), and **Offline Nodes** (**Offline Badge
  Color**, **Offline Line Color**).

**Summary** - **Show Summary**, **Summary Position** (**Top** or **Bottom**), the **Summary Card** (an optional "Summary" title, **Card Background Color**
and **Card Outline Color**), up to six items, and a colour pair for each item (section 7).

**Details Panel** - **Show Details Panel**, **Header Button**, **Show as Pop-up**,
**Show connected clients, services and PoE ports**, **Show history graphs**, **Default
Graph Timescale**, **Graph Colors**, and the panel's colours (section 6).

**Sizing and Animations** - circle and icon sizes for every node type (in the Hyperbolic
view, **Node Sizes** - one **All Nodes** slider plus one per type), **Badge Sizes**,
**IP/PoE Badge Size**, **Column Gap**, **Enable Animations** (the master switch for flow dots,
offline pulsing and animated badges - **off by default**), and the flow durations.

## 5. Choosing and using the two views

Pick the view with the **Flat** / **Hyperbolic** tiles at the top of **Layout** (or
**Discover**). Both use the same devices, and you can switch at any time.

**Flat** is the classic animated diagram. With **Show Details Panel** on, tap a circle to
select it - the panel updates and the circle gets a ring in its own border colour - and
tap it again to open it (its device page or More Info).

**Hyperbolic** is an explorable tree with the Router at the centre.
- **Drag** empty space to pan. **Pinch**, or use the **+** / **-** buttons, to zoom. The
  **target** button returns to the centre.
- **Tap a node** to bring it to the centre and select it; **tap it again** to open it.
- Clients attach to the access point or switch they are connected to. Choose **Group under
  a Clients node** (Layout → Graph → Clients) to collect them instead.
- A node that is offline gets a "!" badge and a dotted line; colour them under **Offline
  Nodes**.
- On a phone the tree sits above the summary and details; on a tablet the summary and
  details sit to its right. With **Tablet: fit tree to screen height** on, the tree is sized
  to end exactly at the bottom of the screen.

## 6. The details panel

Select a node (Hyperbolic view, or Flat with **Show Details Panel**). The panel contains:

1. **A header** - icon, name, state, and a button: **Device Page** (opens the device in
   Settings → Devices, under its integration) or **More Info** (the entity's own dialog). A
   node with no device, or a user who cannot open Settings, gets **More Info**. Choose with
   **Header Button**.
2. **Chips** - live download and upload, IP addresses, VPN / firewall / DNS state, and
   whatever the device reports: CPU, RAM, temperature, traffic received and sent, PoE power,
   ports up, uptime, firmware, model. For a server or container, CPU, memory, disk, uptime
   and network readings from the sensors on its device.
3. **Lists** - **Clients** (online first; tap one to jump to it), **Services** (a server's
   VMs and containers), **PoE Ports** (a switch's ports, busiest first, with watts), and for
   a single client **Client Info** (connected to, IP, MAC, hostname, SSID, VLAN, switch port,
   band, channel, signal, link speed, traffic, uptime, manufacturer, guest network, area,
   last online and any other attributes the tracker reports). **Show connected clients,
   services and PoE ports** switches the lists on or off.
4. **Graphs** - Throughput, Latency (ping and jitter), Connected clients, Response time,
   Resources (CPU, memory and disk for a server; CPU and memory for a VM or container) and a
   client's own Throughput (if its tracker keeps speed attributes - `down_speed` / `up_speed`,
   Down / Up kilobytes per second, and similar - or its device has download and upload speed
   sensors).

| Node | Graphs |
|---|---|
| Internet | Throughput, Latency (when their entities are set) |
| Router | Throughput, Connected clients (total) |
| Access point, switch | Throughput (when download / upload entities are set), Connected clients |
| Server | Resources, Connected clients |
| VM or container | Resources (CPU and memory) |
| Client | Throughput, if its tracker keeps speed attributes or its device has speed sensors |
| Monitored service | Response time |

**Timescales.** Each graph has **5m 30m 1h 12h 24h 72h** buttons; your choice is remembered
on that device. **Default Graph Timescale** sets the starting one. Graphs follow live
readings as they arrive, and always end "now". If a graph says "Loading history..." wait a
few seconds; "History unavailable" means the recorder call failed; a note under a graph
says if the recorder returned nothing for a sensor.

**Graph Colors.** Under **Graph Colors** set one colour for each kind of series: Download,
Upload, Ping, Jitter, Connected Clients, Response Time, CPU, Memory and Disk. Blank keeps the
usual colour (Download and Upload follow each device's own line colours or your Summary
colours).

**Panel colours.** **Panel Background Color** and **Panel Outline Color**; the corner radius
and shadow follow your theme's `--border-radius` and `--box-shadow`.

**Show as Pop-up.** With this on, the panel is not on the page at all. Tap a node and its
details slide up from the bottom as a sheet: swipe it down, tap outside it, press the cross
or press Escape to close. On a phone nothing sits below the diagram; on a tablet there is no
side column, so the summary moves to the top (per **Summary Position**) and the diagram fills
the card. The sheet's header button opens the device page or More Info (the sheet closes first).
The pop-up needs a browser with the `<dialog>` element (iOS 15.4 and later).

## 7. The Summary

A card of up to six items, chosen under **Layout → Summary** (**Summary Item 1** to **6**):

| Item | Shows |
|---|---|
| **Speed test Download** / **Upload** | the Internet page's speed test entities, with the integration's name beneath |
| **Real-time Download** / **Upload** | the Router's live speed entities, with the Total Downloaded / Uploaded entity beneath |
| **Latency and Jitter** | the Internet page's ping and jitter |
| **VPN Status**, **Firewall Status** | the Security badges' state |
| **PoE Total** | the sum of every PoE badge on the diagram |

Items appear only when their entities are set. Real-time Download and Upload are the
default first two.

**Colours.** For each speed test, real-time and latency item you choose, a **Badge Color**
and **Badge Icon Color** pair appears below the item list (for example **Real-time Download
Summary Color**). **PoE Summary Color** has its own single / threshold colours. The **Summary
Card** has an optional "Summary" title and its own background and outline colours; blank
follows the details panel's, then your theme.

**Position.** **Summary Position** puts it at the top or bottom of the card. A **Left** or
**Right** saved by an older version is still shown, marked as an older setting: the classic
Flat strip still honours it, while the Hyperbolic view and the Flat view with a details panel
place the summary as Bottom would.

**Centred.** When there is no details panel beside it (switched off, or shown as a pop-up),
the summary's badges are centred across the card; beside a panel they fill the column.

## 8. IP addresses and PoE

**IP addresses.** **Show IP Addressing** (Layout → Graph; on by default) shows pills for the
Router (WAN and LAN), access points, managed switches and servers. The card reads an address
from an entity whose state is the address, or from an `ip` / `ip_address` attribute (for a
gateway, `lan_ip` for the LAN pill and `wan_ip` for the WAN pill, so one sensor can supply
both). "Unknown" is never shown as an address.

For a Core Switch, Switch or Server, set **IP Address Entity (Optional)** on its page. Leave
it blank and the card looks for the address itself: the device's own entity, then other
sensors on the same device, then the host in the device's web address. **IP Badge
Background** and **IP Badge Text Color** colour the pill; **IP Address Badge Opacity** and
the **IP/PoE Badge Size** sliders are on Layout.

**PoE.** Every device that can have one has a **Power over Ethernet (PoE)** section with a
**Mode**: **Auto (sum PoE ports on this device)**, **Manual (choose entities)** or **Off**.
Auto sums every PoE-related wattage entity on the device. Colour the badge as one **Single
color** or up to three **Threshold colors**, optionally flashing when above the top
threshold. The **PoE Total** Summary item adds every badge up. In the details panel, a
switch's **PoE Ports** list shows the watts each port delivers.

## 9. Servers, VMs and containers

A **Server** node represents a machine running containers or VMs. Add them as badges on its
circle - from Discover (**Server · Container / VM**, after adding the Server), or by hand.

In the details panel, a server's **Services** heading counts *all* its VMs and containers,
for example **11 of 12 online**, while the list shows the ones you added. The total comes
from the first of these that exists:

1. **Count entities you choose** - on the Server's page, **VMs and Containers**: a **Total**
   and a **Running** sensor (for example Portainer's container counts).
2. **Count sensors on the server's device**, found automatically.
3. **What the card can list**: the VMs and containers you added, those the integration links
   to the server, and those carrying the server's **label**. With no label, for Proxmox VE,
   Portainer and Monitor Docker, the other status sensors of the same integration count.

**Using a label.** No integration links a server to guests of a different integration, so a
label is the way that works for any of them:

1. **Settings → Areas, labels & zones → Labels → Create label** - a short plain name such as
   `pve`.
2. **Settings → Devices & services → Devices**, filter by integration, switch on selection
   mode, tick the VMs and containers, **Add label**. For things that are entities with no
   device, do the same on the **Entities** page.
3. Don't label the server itself, a Node or Storage device, or a Portainer endpoint.
4. In the card editor, open the server and type the label in **Label for its VMs and
   Containers**.

The card matches the label's id - your text in lower case, spaces and symbols as underscores
(`Home Lab` matches `home_lab`). A label that nothing carries gives no list and no count,
rather than a guess.

## 10. Offline detection and colours

Every node reads its entity's state: `unavailable`, `unknown`, `off`, `down` (and `not_home`
for device trackers) mean offline. An offline node shows a pulsing warning icon, dimmed
colours, and an "X" on the line feeding it (in the Hyperbolic view, a "!" badge and a dotted
line). UniFi Device Info devices report on / off in a `status` attribute, which the card reads.

Colours: every icon, outline and badge has its own colour field, and each accepts a hex
value or a theme variable such as `var(--accent-color)`. **Flow Line Color** (Layout → Graph)
sets every connection line and flow dot at once, Internet's included. Offline colours are set
per device (**Offline Border Color**, **Offline Icon Color**).

## 11. Fitting the card on small screens

**Card Size** (Layout → Graph, Flat view):

- **Normal** - no change.
- **Compact** - every circle, badge and icon shrinks to its smallest usable size, names and
  IP addresses hide.
- **Fit to Width** - the whole diagram zooms down just enough to fit the card, recalculated
  whenever the card resizes (down to 40%).
- **Scaled** - a manual percentage (40-100%).

**Horizontal Scroll** (every size except Fit to Width) lets a wide diagram pan sideways
instead of being clipped. **Hide Names** hides every name on the card at once.

The Hyperbolic view adapts by itself (**Arrangement**: Auto, Phone or Tablet), and the
**Show as Pop-up** option keeps phones uncluttered.

## 12. Styling with card_mod

The card's editor covers colours, sizes and layout. For anything finer - a different shadow,
dashed lines, hiding a piece of text - use
[card_mod](https://github.com/thomasloven/lovelace-card-mod), a separate add-on installed
from HACS. It is not part of this card, and nothing here needs it unless you want it.

### How to use it

Add a `card_mod` block to the card's YAML, under the card's own settings:

```yaml
type: custom:network-flow-card
view_mode: hyperbolic
card_mod:
  style: |
    .hyp-summary,
    .hyp-details {
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35) !important;
    }
```

- The CSS inside `style:` is applied **inside the card**, so it can reach every part of it by
  its class name (the tables below list them). `ha-card` is the card's outer frame.
- Add **`!important`** when a rule doesn't seem to take effect. The card sets many styles
  itself, some directly on the element, and only `!important` beats those.
- The classes are the card's own and can change between versions. The ones listed here
  are in v4.
- To find another part's class name, open your dashboard in a desktop browser, right-click
  the part, choose **Inspect**, and look inside the card's `#shadow-root`. Or ask for it in an
  issue.
- Anything the editor can already set (a colour, a size) is better set there; use card_mod
  for the rest. Shadows and corner radius also follow your **theme**: `--box-shadow` and
  `--border-radius` in your theme change them on every card that uses them, with no
  card_mod at all.

### Class names

| Part | Class |
|---|---|
| The card's frame | `ha-card` |
| Flat: a circle, and what's inside | `.circle`, `.circle-wrap`, `.circle ha-svg-icon` |
| Flat: connection lines | `.vline`, `.hline`, `.bus-line`, `.mini-bus-line`, `.mini-bus-stem` |
| Flat: the moving dots | `.flow-dot` |
| Flat: badges | `.vpn-badge`, `.firewall-badge`, `.poe-badge`, `.guest-badge`, `.primary-ap-badge`, `.monitor-badge` |
| Flat: the Clients box, and a sub-group | `.individual-devices-box`, `.individual-device-group` |
| Summary items (both views) | `.summary-row`, `.summary-badge`, `.summary-primary`, `.summary-secondary` |
| The summary card | `.hyp-summary`, `.hyp-sum-title`, `.hyp-sum-grid` |
| Hyperbolic: the tree, a node, a line | `.hyp-stage`, `.hyp-node`, `.hyp-edge` |
| The details panel | `.hyp-details`, `.hyp-d-head`, `.hyp-d-icon`, `.hyp-d-name`, `.hyp-d-btn` |
| Inside the panel | `.hyp-chip`, `.hyp-cl` (a client row), `.hyp-cl-dot`, `.hyp-g-title`, `.hyp-range` (timescale buttons), `.hyp-hint` |
| The pop-up sheet | `dialog.hyp-sheet`, `.hyp-sheet::backdrop`, `.hyp-sheet-grab`, `.hyp-sheet-close` |

### Examples

Each of these was tested against the card. Combine them by putting the rules one after
another in the same `style: |` block.

**A shadow round the summary and the details panel**

```yaml
card_mod:
  style: |
    .hyp-summary,
    .hyp-details {
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35) !important;
    }
```

**Dashed borders on the summary and the details panel**

```yaml
card_mod:
  style: |
    .hyp-summary,
    .hyp-details {
      border-style: dashed !important;
    }
```

**Dashed lines in the Hyperbolic tree.** This reuses the card's own dash length, so the
dashes stay in proportion as the tree is zoomed.

```yaml
card_mod:
  style: |
    .hyp-edge {
      stroke-dasharray: var(--hyp-d5) var(--hyp-d5) !important;
    }
```

**Dashed connection lines in the Flat view.** The lines are plain coloured bars, so the
dashes are cut out of them with a mask - each line keeps its own colour.

```yaml
card_mod:
  style: |
    .vline, .mini-bus-stem {
      mask-image: repeating-linear-gradient(to bottom, #000 0 6px, transparent 6px 11px);
      -webkit-mask-image: repeating-linear-gradient(to bottom, #000 0 6px, transparent 6px 11px);
    }
    .hline, .bus-line, .mini-bus-line {
      mask-image: repeating-linear-gradient(to right, #000 0 6px, transparent 6px 11px);
      -webkit-mask-image: repeating-linear-gradient(to right, #000 0 6px, transparent 6px 11px);
    }
```

Change `6px` (the dash) and `11px` (dash plus gap) to taste.

**Bigger, bolder summary text**

```yaml
card_mod:
  style: |
    .summary-primary {
      font-size: 1.15rem !important;
      font-weight: 700 !important;
    }
```

**Squarer, larger summary badges**

```yaml
card_mod:
  style: |
    .summary-badge {
      border-radius: 12px !important;
      width: 44px !important;
      height: 44px !important;
    }
```

**An upper-case, spaced "Summary" title**

```yaml
card_mod:
  style: |
    .hyp-sum-title {
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
```

**Hide the "Drag to explore..." / "Tap a circle..." hint**

```yaml
card_mod:
  style: |
    .hyp-hint {
      display: none !important;
    }
```

**Squarer timescale buttons and chips in the details panel**

```yaml
card_mod:
  style: |
    .hyp-range,
    .hyp-range button,
    .hyp-chip {
      border-radius: 6px !important;
    }
```

**A frosted details panel**

```yaml
card_mod:
  style: |
    .hyp-details {
      background: rgba(30, 30, 40, 0.55) !important;
      backdrop-filter: blur(12px);
    }
```

**Larger client dots in the Clients list**

```yaml
card_mod:
  style: |
    .hyp-cl-dot {
      width: 12px !important;
      height: 12px !important;
    }
```

**A soft shadow on every circle** - Flat first, then the Hyperbolic tree

```yaml
card_mod:
  style: |
    .circle {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35) !important;
    }
    .hyp-node {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35) !important;
    }
```

**No moving dots** (Flat view)

```yaml
card_mod:
  style: |
    .flow-dot {
      display: none !important;
    }
```

**Stop offline circles pulsing** (Flat view)

```yaml
card_mod:
  style: |
    .circle-pulse,
    .icon-pulse {
      animation: none !important;
    }
```

**A card with no background, border or shadow**

```yaml
card_mod:
  style: |
    ha-card {
      background: none !important;
      box-shadow: none !important;
      border: none !important;
    }
```

**A darker backdrop and a narrower pop-up sheet**

```yaml
card_mod:
  style: |
    .hyp-sheet::backdrop {
      background: rgba(0, 0, 0, 0.7) !important;
    }
    dialog.hyp-sheet {
      width: min(100%, 460px) !important;
    }
```

### If a rule does nothing

1. Add `!important`.
2. Check the class name against the table, or inspect it in your browser.
3. Make sure the rule is under `card_mod: style: |` of **this** card, not a surrounding stack
   card.
4. Reload the dashboard - card_mod reads its CSS when the card loads.

## 13. Worked examples

### A UniFi gateway, switch and access points (UniFi Device Info)

1. Install UniFi Device Info (it publishes each UniFi device as an MQTT sensor).
2. **Discover → Re-scan Everything.** Select the gateway under **Router / Gateway** - it is
   paired with its WAN sensor, so the LAN address fills in from the gateway's own sensor and
   the WAN address from the WAN sensor. Select switches and APs under **Nodes**; each switch's address comes
   with it.
3. Open a switch in the details panel: CPU, RAM, traffic, temperature, PoE power, ports up,
   uptime, firmware and model appear, with a **PoE Ports** list.

### Proxmox and containers

1. **Discover**: select your Proxmox node under **Nodes** (it arrives as a Server, with its
   VMs and containers attached).
2. For containers in another integration (Portainer, say), add them under **Server ·
   Container / VM**.
3. To see "x of y online" for everything, give the server count entities or a label (section 9).

### A backup internet line

1. **Internet** page → **Secondary** tab: set its entity, speeds and quota.
2. Set **Mode** to **Active/Standby**. The secondary is dashed while the primary is up and
   turns solid when the primary goes down.
3. On the Router page, set **Secondary WAN Address Entity** if you want its address shown.

### A phone-friendly dashboard

1. **Layout → General → Arrangement**: **Auto** (or **Phone**).
2. **Layout → Details Panel → Show as Pop-up**: on.
3. In the Flat view, set **Card Size** to **Fit to Width**.

## 14. Troubleshooting

| Symptom | What to check |
|---|---|
| The card says "custom element doesn't exist" | the resource is added and you hard-refreshed; with a manual install, bump `?v=` on the resource URL |
| Discover finds nothing for an integration | the integration is installed and its entities are enabled in Home Assistant; some integrations only create entities for devices they track |
| A node shows as offline when it isn't | its entity's state: `off`, `down`, `unknown`, `unavailable` and `not_home` all count as offline - pick a different status entity |
| A graph is empty | the sensor is recorded; the note under the graph says if the recorder returned nothing |
| A graph shows "Loading history..." | wait a few seconds; the first fetch of a timescale takes a moment |
| The header button says More Info, not Device Page | the node's entity has no device in Home Assistant, you are not an administrator, or **Header Button** is set to More Info |
| A server shows only the VMs you added | give it count entities, or use a label (section 9) |
| No IP on a switch or server | **Show IP Addressing** is on, then set its **IP Address Entity** |
| The pop-up doesn't open | **Show as Pop-up** is on and you tapped a node; the browser must support `<dialog>` |
| A Summary item is missing | the entities it needs aren't set (for example Real-time Download needs the Router's speed entity) |
| Changes don't appear after updating | hard-refresh (Ctrl/Cmd+Shift+R), or add `?v=4` to the resource URL |
| The diagram is cut off on a phone | **Card Size → Fit to Width**, or turn on **Horizontal Scroll** |
