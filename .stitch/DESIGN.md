# Design System: Granny's Kerala Pickle Shop
**Project ID:** 5940240067636279546

## 1. Visual Theme & Atmosphere
The design captures a **Tactile, Editorial, and Artisanal** atmosphere inspired by traditional ancestral Kerala homes ("Tharavadu"). The layout is organic and warm, rejecting sterile digital designs in favor of physical, earthly textures. It mimics high-quality print catalogs or recipe books. Faint paper grain overlays, custom jute/twine borders, wood-textured primary buttons, and product cards styled to look like actual glass preserve jars (complete with dark wooden lids and glassy reflection overlays) are utilized to establish depth and authenticity.

## 2. Color Palette & Roles
The color mapping is drawn directly from natural Kerala ingredients and kitchenware:
* **Banana Leaf Green (`#345329` / `#4b6b3f`):** Used as the primary brand accent, active navigation states, and visual cues representing freshness or organic nature.
* **Clay Pot Orange/Brown (`#934b19` / `#8b4513`):** Represents structural wood, earthen terracotta chattis, and secondary branding/headings.
* **Spice Red (`#980a13` / `#bb2927`):** Tertiary indicator for warnings, tags (e.g., spice level "FIRE"), or call-outs.
* **Warm Parchment/Cream (`#fff8ef`):** The default background canvas. It prevents the site from feeling clinical or cold.
* **Dried Peppercorn Charcoal (`#1e1b13`):** High-contrast dark brown/black color used for all primary body text, titles, and labels to maintain readability while keeping a soft tone.
* **Soft Sage Grey (`#73796e` / `#c3c8bc`):** Used for subtle dividing lines, borders, and input strokes.
* **Wood-Grain Brown (`#5d4037` / `#3e2723`):** Rich brown used for primary CTA buttons and lid visuals.

## 3. Typography Rules
* **Headlines & Titles:** Set in **Libre Caslon Text**. This serif font conveys historical authority and heritage. Titles use a bold weight (`700` or `600`) with tight letter-spacing (`-0.02em`) and generous leading, creating a modern editorial rhythm.
* **Body & UI Labels:** Set in **Plus Jakarta Sans**. A clean, modern sans-serif with friendly terminals that balance the editorial feel of the headlines. Weights range from light-medium (`400` to `500` for body) to semi-bold (`600` for buttons and secondary labels).
* **Flavor Text & Captions:** Frequently uses italic styling for grandmother quotes or process details to add a human, hand-written voice to the interface.

## 4. Component Stylings
* **Buttons:** 
  * *Primary CTAs:* Designed as **Wooden Buttons** (`.wooden-button`) utilizing a rich brown color, a subtle wood-grain pattern overlay, and an inner radial-gradient highlight representing simulated physical depth. They have slightly rounded corners (`0.25rem` or `0.5rem`) and uppercase tracking for headers.
  * *Carousel Toggles:* Pill-shaped circular navigation buttons with thin border lines and icon symbols (`chevron_left`, `chevron_right`).
* **Cards/Containers:**
  * *Product Jars:* Feature an aspect ratio of `3:4` with a dark wooden lid block at the top, a full-bleed product photo in the middle, and a glassy reflection overlay to replicate a physical glass jar. Corner radius is set to `0.5rem` (`rounded-xl`).
  * *Borders:* Defined by tonal layers or subtle `1px` borders instead of digital drop shadows. Custom dividers imitate twisted twine or jute fibers.
* **Inputs/Forms:**
  * Underlined style featuring a transparent background, a bottom border stroke in sage grey (`#c3c8bc`), and minimal visual footprint to keep the parchment backdrop clean.

## 5. Layout Principles
* **Whitespace & Breathing Room:** Relies heavily on generous vertical sections (`section-gap` of `80px`) to let components rest.
* **Centered Composition:** Desktop views leverage structured, centered columns framed by wide gutters (`24px` margins) to resemble an open cookbook.
* **Asymmetric Alignment:** Cards and highlight panels use alternating offsets (like shifting card columns slightly lower) to mirror the organic irregularities of rural markets.
