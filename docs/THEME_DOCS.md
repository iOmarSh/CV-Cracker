# cv.craft — Dark Theme Design System

## Overview

The cv.craft application uses a premium dark theme with green accent colors. This document serves as the single source of truth for all UI styling decisions.

> [!IMPORTANT]
> **CV Isolation Rule**: All theme styles apply ONLY to the editor UI. The CV preview/export uses black text on white background for ATS compatibility.

---

## Color Palette

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-base` | `#0f1113` | Main app background |
| `bg-panel` | `#111316` | Cards, panels, modals |
| `bg-elevated` | `#1a1d21` | Inputs, hover states, elevated surfaces |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#E6E9EB` | Headings, primary content |
| `text-secondary` | `#9AA3A8` | Labels, secondary content |
| `text-muted` | `#6b7280` | Placeholders, disabled text |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `accent-green` | `#2EFF8A` | Primary buttons, focus rings, icons |
| `accent-green-dark` | `#00D066` | Gradient end, hover states |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `border-default` | `#2a2d32` | Card borders, dividers |

### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `error` | `red-400` | Delete buttons, error states |
| `success` | `#2EFF8A` | Confirmation, success |
| `warning` | `yellow-500` | Sync, attention |

---

## Component Styles

### Cards
```css
background: #111316;
border-radius: 12px;
box-shadow: 0 0 15px rgba(0,0,0,0.3);
```

### Inputs
```css
background: #1a1d21;
border: 1px solid #2a2d32;
color: #E6E9EB;
placeholder-color: #6b7280;
focus:border-color: #2EFF8A;
focus:ring: 1px #2EFF8A/30;
```

### Primary Button (Save, Add, Submit)
```css
background: #2EFF8A;
color: #0f1113;
font-weight: 800;
border-radius: 9999px;
hover:opacity: 0.8;
```

### Secondary Button (Cancel)
```css
background: transparent;
color: #9AA3A8;
border: 1px solid #2a2d32;
hover:color: #E6E9EB;
```

### Delete/Remove Button
```css
color: red-400;
background: transparent or #1a1d21;
hover:color: red-300;
```

---

## Action Button Colors (Right Sidebar)

Each button has a distinct color conveying its function:

| Action | Color | Tailwind Class |
|--------|-------|----------------|
| Download | Blue | `bg-blue-500` |
| Copy | Amber | `bg-amber-500` |
| Upload | Cyan | `bg-cyan-500` |
| Paste | Green | `bg-[#2EFF8A]` |
| Sync | Yellow | `bg-yellow-500` |

---

## MUI Components Override

For Material UI components (Select, Switch), use `sx` prop:

```jsx
sx={{
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#1a1d21',
    color: '#E6E9EB',
    '& fieldset': { borderColor: '#2a2d32' },
    '&:hover fieldset': { borderColor: '#2EFF8A' },
    '&.Mui-focused fieldset': { borderColor: '#2EFF8A' },
  },
  '& .MuiInputLabel-root': { color: '#9AA3A8' },
}}
```

---

## Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 (Hero) | 7xl | 800 | `#E6E9EB` |
| H2 (Section) | 2xl-4xl | 700 | `#E6E9EB` |
| H3 (Card Title) | xl-2xl | 800 | `#E6E9EB` |
| Body | base | 400 | `#E6E9EB` |
| Label | sm-base | 600 | `#E6E9EB` |
| Muted | sm | 400 | `#6b7280` |

---

## Icon Guidelines

- **Accent Icons**: Use `#2EFF8A` for actionable icons
- **Muted Icons**: Use `#9AA3A8` for secondary actions
- **Delete Icons**: Use `red-400` for destructive actions

---

## Files Updated for Theme

### Core Components
- `components/general/card.js`
- `components/general/text-input.js`
- `components/general/minimized-card.js`
- `components/general/link-modal.js`

### Layout
- `app/(control)/layout.js`
- `app/(home)/layout.js`
- `components/layout/premium-navbar.js`
- `components/layout/footer.js`

### CV Builder
- `components/cv-builder/builder.js`
- `components/cv-builder/builder-sidebar.js`
- `components/cv-builder/right-sidebar.js`
- `components/cv-builder/control-panel.js`

### Item Editors
- `*-item-editor.js` files in `control-components/`

### Dashboard
- `app/(control)/dashboard/page.js`
- `components/dashboard/resume-list.js`
