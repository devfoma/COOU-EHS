---
name: Clinical Clarity & Safety
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c6c6cd'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#909097'
  outline-variant: '#45464d'
  surface-tint: '#bec6e0'
  primary: '#bec6e0'
  on-primary: '#283044'
  primary-container: '#0f172a'
  on-primary-container: '#798098'
  inverse-primary: '#565e74'
  secondary: '#4ae176'
  on-secondary: '#003915'
  secondary-container: '#00b954'
  on-secondary-container: '#004119'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#251400'
  on-tertiary-container: '#b47300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  sidebar-width-condensed: 72px
  sidebar-width-expanded: 240px
---

## Brand & Style
The design system focuses on precision, urgency, and absolute reliability for Environmental Health and Safety (EHS) and Healthcare Information Systems. The brand personality is authoritative yet transparent, designed to instill confidence in high-stakes decision-making environments.

The visual style is a **Hybrid Glassmorphism/Modern Corporate** aesthetic. It utilizes deep, saturated backgrounds to anchor the user, while interactive layers use frosted-glass effects to maintain a sense of lightness and technical sophistication. This approach ensures that complex clinical data feels organized and layered rather than cluttered. High-contrast ratios are strictly maintained to meet accessibility standards for healthcare professionals working in varied lighting conditions.

## Colors
This design system operates primarily in a dark mode configuration to reduce eye strain and emphasize critical alerts. 

- **Primary (Deep Slate):** The bedrock of the UI. Used for deep backgrounds, sidebars, and structural anchors.
- **Secondary (Forest Green):** Represents safety, compliance, and "Normal" status. Used for primary actions and success states.
- **Semantic Accents:** 
  - **Amber (Low/Medium Severity):** Reserved for warnings and cautionary data points.
  - **Crimson (High/Critical Severity):** High-impact color for immediate hazards and life-safety alerts.
- **Surface Strategy:** Backgrounds utilize the primary deep slate. Interactive cards and overlays use semi-transparent variations of the primary color with a `backdrop-filter: blur(12px)` to create the glassmorphic depth.

## Typography
The typography system pairs **Outfit** for structural headings and **Inter** for data-heavy content.

- **Headlines (Outfit):** Geometric and modern, providing a clean "Hub" feel for navigation and section titles.
- **Body & Data (Inter):** Highly legible at small sizes. Inter’s tall x-height is crucial for reading clinical logs and safety reports.
- **Data Mono:** While Inter is used, specific numerical data should utilize tabular figures (tnum) to ensure alignment in data tables and clinical visualization blocks.

## Layout & Spacing
The architecture follows a **Hub & Spoke** model. A central dashboard (Hub) provides high-level safety overviews, while specialized modules (Spokes) handle detailed clinical entries.

- **Grid:** A 12-column fluid grid is used for the main content area. 
- **Sidebar:** A condensed sidebar persists on the left, housing the primary "Hub" navigation icons. It expands on hover or toggle to show labels.
- **Responsive Behavior:** 
  - **Desktop:** 12 columns, 24px margins.
  - **Tablet:** 8 columns, 16px margins, sidebar collapses to icon-only.
  - **Mobile:** 4 columns, 16px margins, sidebar moves to a bottom navigation bar or top "hamburger" menu.

## Elevation & Depth
Depth is created through transparency and blur rather than traditional shadows.

1.  **Level 0 (Base):** Deep Slate solid color (#0F172A).
2.  **Level 1 (Surface):** Glassmorphic panels. Background: `rgba(30, 41, 59, 0.7)` with `backdrop-filter: blur(12px)`.
3.  **Level 2 (Interactive):** Hover states on cards. Increased transparency and a subtle 1px border using `rgba(255, 255, 255, 0.1)`.
4.  **Level 3 (Modals/Popovers):** Higher blur (20px) and a distinct 1px border using the secondary forest green (at low opacity) to indicate active focus.

Avoid heavy drop shadows; use "Glow" effects (box-shadow with color) only for critical status indicators (Crimson/Amber) to simulate light-emitting hardware alerts.

## Shapes
The shape language is **Soft (0.25rem / 4px base)**. This reflects a professional, clinical precision. 

- **Small Components:** Checkboxes, buttons, and input fields use a 4px radius.
- **Containers:** Large data cards and visualization blocks use a 8px (`rounded-lg`) radius.
- **Status Pills:** Severity badges (Low/High) use a full pill shape (999px) to differentiate them from interactive buttons.

## Components
- **Buttons:** 
  - *Primary:* Solid Forest Green with white text. 
  - *Secondary:* Ghost style with Forest Green border and glass background.
- **Clinical Data Blocks:** Reusable containers for metrics. They must include a "Sparkline" area, a large numerical value (Outfit font), and a label.
- **Severity Chips:** High-contrast background (Crimson/Amber/Green) with high-contrast text (White or Deep Slate). 
- **Sidebars:** Dark, condensed vertical strips with high-contrast white icons. Active states should be indicated by a Forest Green vertical bar on the leading edge.
- **Input Fields:** Semi-transparent background with a 1px border. On focus, the border transitions to Forest Green with a subtle outer glow.
- **Lists:** High-density rows with 1px separators (`rgba(255, 255, 255, 0.05)`). Every third row can have a slightly different glass opacity for readability.