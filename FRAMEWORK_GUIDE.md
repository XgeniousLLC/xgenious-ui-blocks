# Xgenious UI Blocks - Framework Guide

## Overview

The Xgenious UI Blocks plugin includes a comprehensive CSS framework (`framework.scss`) with a complete grid system, utilities, and reusable components. All classes use the `xg-` prefix to avoid conflicts.

**Container Width:** 1320px (configurable)
**Prefix:** `xg-`
**Grid System:** 12-column responsive grid

---

## Container System

### Basic Container
```html
<div class="xg-container">
    <!-- Max-width: 1320px, centered -->
</div>
```

### Container Variants
```html
<!-- Fluid container (full width with padding) -->
<div class="xg-container-fluid">...</div>

<!-- Narrow container (960px) -->
<div class="xg-container xg-container-narrow">...</div>

<!-- Wide container (1600px) -->
<div class="xg-container xg-container-wide">...</div>
```

---

## Grid System

### 12-Column Responsive Grid

```html
<div class="xg-container">
    <div class="xg-row">
        <div class="xg-col-12 xg-col-md-6 xg-col-lg-4">
            <!-- 100% mobile, 50% tablet, 33.33% desktop -->
        </div>
        <div class="xg-col-12 xg-col-md-6 xg-col-lg-4">
            <!-- Column 2 -->
        </div>
        <div class="xg-col-12 xg-col-md-12 xg-col-lg-4">
            <!-- Column 3 -->
        </div>
    </div>
</div>
```

### Column Classes

**Mobile-first (default):**
- `xg-col-1` through `xg-col-12`
- `xg-col-auto` - Auto width

**Tablet (768px+):**
- `xg-col-md-1` through `xg-col-md-12`

**Desktop (1024px+):**
- `xg-col-lg-1` through `xg-col-lg-12`

**Large Desktop (1280px+):**
- `xg-col-xl-1` through `xg-col-xl-12`

### No Gutters
```html
<div class="xg-row no-gutters">
    <!-- Removes spacing between columns -->
</div>
```

---

## Flexbox Utilities

### Display
```html
<div class="xg-d-flex">...</div>
<div class="xg-d-inline-flex">...</div>
<div class="xg-d-block">...</div>
<div class="xg-d-none">...</div>
```

### Flex Direction
```html
<div class="xg-d-flex xg-flex-row">...</div>
<div class="xg-d-flex xg-flex-column">...</div>
<div class="xg-d-flex xg-flex-row-reverse">...</div>
```

### Justify Content
```html
<div class="xg-d-flex xg-justify-start">...</div>
<div class="xg-d-flex xg-justify-center">...</div>
<div class="xg-d-flex xg-justify-between">...</div>
<div class="xg-d-flex xg-justify-around">...</div>
```

### Align Items
```html
<div class="xg-d-flex xg-align-start">...</div>
<div class="xg-d-flex xg-align-center">...</div>
<div class="xg-d-flex xg-align-end">...</div>
```

### Combined Example
```html
<div class="xg-d-flex xg-justify-between xg-align-center">
    <div>Left</div>
    <div>Right</div>
</div>
```

---

## Spacing Utilities

### Margin Classes
```html
<!-- All sides -->
<div class="xg-m-0">...</div>    <!-- 0 -->
<div class="xg-m-xs">...</div>   <!-- 8px -->
<div class="xg-m-sm">...</div>   <!-- 16px -->
<div class="xg-m-md">...</div>   <!-- 24px -->
<div class="xg-m-lg">...</div>   <!-- 32px -->
<div class="xg-m-xl">...</div>   <!-- 48px -->
<div class="xg-m-2xl">...</div>  <!-- 64px -->
<div class="xg-m-3xl">...</div>  <!-- 80px -->

<!-- Single sides -->
<div class="xg-mt-lg">...</div>  <!-- Margin top -->
<div class="xg-mb-md">...</div>  <!-- Margin bottom -->
<div class="xg-ml-sm">...</div>  <!-- Margin left -->
<div class="xg-mr-xs">...</div>  <!-- Margin right -->

<!-- Auto margin (centering) -->
<div class="xg-ml-auto">...</div>
<div class="xg-mr-auto">...</div>
```

### Padding Classes
```html
<!-- All sides -->
<div class="xg-p-md">...</div>

<!-- Single sides -->
<div class="xg-pt-xl">...</div>  <!-- Padding top -->
<div class="xg-pb-lg">...</div>  <!-- Padding bottom -->
<div class="xg-pl-md">...</div>  <!-- Padding left (not shown but available) -->
<div class="xg-pr-sm">...</div>  <!-- Padding right (not shown but available) -->
```

---

## Typography

### Headings
```html
<h1 class="xg-heading xg-h1">Heading 1</h1>    <!-- 56px -->
<h2 class="xg-heading xg-h2">Heading 2</h2>    <!-- 48px -->
<h3 class="xg-heading xg-h3">Heading 3</h3>    <!-- 36px -->
<h4 class="xg-heading xg-h4">Heading 4</h4>    <!-- 28px -->
<h5 class="xg-heading xg-h5">Heading 5</h5>    <!-- 24px -->
<h6 class="xg-heading xg-h6">Heading 6</h6>    <!-- 20px -->
```

### Text Sizes
```html
<p class="xg-text xg-text-xs">Extra Small</p>  <!-- 12px -->
<p class="xg-text xg-text-sm">Small</p>        <!-- 14px -->
<p class="xg-text xg-text-base">Base</p>       <!-- 16px -->
<p class="xg-text xg-text-lg">Large</p>        <!-- 18px -->
<p class="xg-text xg-text-xl">Extra Large</p>  <!-- 20px -->
```

### Text Alignment
```html
<p class="xg-text-left">Left aligned</p>
<p class="xg-text-center">Center aligned</p>
<p class="xg-text-right">Right aligned</p>
```

### Text Colors
```html
<p class="xg-text-dark">Dark text</p>      <!-- #1a1a1a -->
<p class="xg-text-light">Light text</p>    <!-- #666666 -->
<p class="xg-text-lighter">Lighter</p>     <!-- #999999 -->
<p class="xg-text-primary">Primary</p>     <!-- #FF7B6D -->
```

### Font Weight
```html
<p class="xg-font-light">Light (300)</p>
<p class="xg-font-normal">Normal (400)</p>
<p class="xg-font-medium">Medium (500)</p>
<p class="xg-font-semibold">Semibold (600)</p>
<p class="xg-font-bold">Bold (700)</p>
```

---

## Button System

### Basic Buttons
```html
<!-- Primary button -->
<a href="#" class="xg-btn xg-btn-primary">Primary Button</a>

<!-- Secondary button -->
<a href="#" class="xg-btn xg-btn-secondary">Secondary Button</a>

<!-- Outline button -->
<a href="#" class="xg-btn xg-btn-outline">Outline Button</a>

<!-- Ghost button -->
<a href="#" class="xg-btn xg-btn-ghost">Ghost Button</a>
```

### Button Sizes
```html
<a href="#" class="xg-btn xg-btn-primary xg-btn-sm">Small</a>
<a href="#" class="xg-btn xg-btn-primary">Default</a>
<a href="#" class="xg-btn xg-btn-primary xg-btn-lg">Large</a>

<!-- Full width -->
<a href="#" class="xg-btn xg-btn-primary xg-btn-block">Block Button</a>
```

### Disabled State
```html
<button class="xg-btn xg-btn-primary" disabled>Disabled</button>
```

---

## Badge Component

```html
<!-- Default badge -->
<span class="xg-badge">New</span>

<!-- Badge with icon -->
<span class="xg-badge">
    400+ Projects
    <span>🚀</span>
</span>

<!-- Small badge -->
<span class="xg-badge xg-badge-sm">Small</span>
```

---

## Responsive Utilities

### Hide on Specific Devices
```html
<!-- Hide on mobile only -->
<div class="xg-hide-mobile">Visible on tablet+</div>

<!-- Hide on tablet only -->
<div class="xg-hide-tablet">Visible on mobile and desktop</div>

<!-- Hide on desktop+ -->
<div class="xg-hide-desktop">Visible on mobile and tablet</div>
```

---

## CSS Variables

You can customize the framework by overriding CSS variables:

```css
:root {
    /* Container */
    --xg-container-width: 1320px;
    --xg-container-padding: 20px;

    /* Colors */
    --xg-primary: #FF7B6D;
    --xg-primary-hover: #ff5f4d;
    --xg-text-dark: #1a1a1a;
    --xg-text-light: #666666;

    /* Typography */
    --xg-font-primary: 'Inter', sans-serif;
    --xg-font-heading: 'Poppins', sans-serif;
    --xg-heading-h1: 56px;

    /* Spacing */
    --xg-spacing-xs: 8px;
    --xg-spacing-sm: 16px;
    --xg-spacing-md: 24px;
    --xg-spacing-lg: 32px;
    --xg-spacing-xl: 48px;

    /* Border Radius */
    --xg-radius-sm: 4px;
    --xg-radius-md: 8px;
    --xg-radius-lg: 12px;
    --xg-radius-full: 9999px;

    /* Shadows */
    --xg-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
    --xg-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
    --xg-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

    /* Transitions */
    --xg-transition-fast: 150ms ease-in-out;
    --xg-transition-base: 300ms ease-in-out;
}
```

---

## Real-World Examples

### Hero Section Layout
```html
<div class="xg-container">
    <div class="xg-row xg-align-center">
        <div class="xg-col-12 xg-col-lg-7">
            <span class="xg-badge xg-mb-md">New Feature 🚀</span>
            <h1 class="xg-heading xg-h1 xg-mb-lg">
                Build Amazing Websites
            </h1>
            <p class="xg-text xg-text-lg xg-text-light xg-mb-xl">
                Create professional websites with our powerful blocks
            </p>
            <div class="xg-d-flex" style="gap: 16px;">
                <a href="#" class="xg-btn xg-btn-primary">Get Started</a>
                <a href="#" class="xg-btn xg-btn-ghost">Learn More</a>
            </div>
        </div>
    </div>
</div>
```

### Feature Grid
```html
<div class="xg-container">
    <div class="xg-row">
        <div class="xg-col-12 xg-col-md-6 xg-col-lg-4">
            <div class="xg-p-lg">
                <h3 class="xg-heading xg-h4 xg-mb-md">Feature 1</h3>
                <p class="xg-text xg-text-light">Description here</p>
            </div>
        </div>
        <div class="xg-col-12 xg-col-md-6 xg-col-lg-4">
            <div class="xg-p-lg">
                <h3 class="xg-heading xg-h4 xg-mb-md">Feature 2</h3>
                <p class="xg-text xg-text-light">Description here</p>
            </div>
        </div>
        <div class="xg-col-12 xg-col-md-6 xg-col-lg-4">
            <div class="xg-p-lg">
                <h3 class="xg-heading xg-h4 xg-mb-md">Feature 3</h3>
                <p class="xg-text xg-text-light">Description here</p>
            </div>
        </div>
    </div>
</div>
```

### Card Layout
```html
<div class="xg-container">
    <div class="xg-row">
        <div class="xg-col-12 xg-col-md-4">
            <div class="xg-p-lg" style="background: white; border-radius: 8px; box-shadow: var(--xg-shadow-md);">
                <h4 class="xg-heading xg-h5 xg-mb-sm">Card Title</h4>
                <p class="xg-text xg-text-light xg-mb-md">Card description goes here</p>
                <a href="#" class="xg-btn xg-btn-primary xg-btn-sm">Learn More</a>
            </div>
        </div>
    </div>
</div>
```

---

## Tips & Best Practices

1. **Always use the container:** Wrap your content in `xg-container` for proper alignment
2. **Mobile-first:** Start with mobile classes, add tablet/desktop modifiers
3. **Use flexbox utilities:** Combine `xg-d-flex`, `xg-justify-*`, `xg-align-*` for layouts
4. **Consistent spacing:** Use spacing utilities instead of custom margins/paddings
5. **Reuse components:** Use `xg-btn`, `xg-badge`, `xg-heading` for consistency
6. **Custom colors:** Override CSS variables for brand customization

---

## Responsive Breakpoints

```scss
/* Mobile: < 768px (default) */
/* Tablet: 768px - 1023px */
@media (min-width: 768px) { ... }

/* Desktop: 1024px - 1279px */
@media (min-width: 1024px) { ... }

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) { ... }
```

---

## Framework File Location

**Path:** `src/framework.scss`
**Imported in:**
- `src/style.scss` (Frontend)
- `src/editor.scss` (Editor)

All blocks automatically have access to the framework classes!

---

**Happy Building! 🚀**
