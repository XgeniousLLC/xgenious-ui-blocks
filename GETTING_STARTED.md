# Getting Started with Xgenious UI Blocks

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
cd /Users/sharifur/Desktop/Sharifur/localhost/xgenious/wp-content/plugins/xgenious-ui-blocks
npm install
```

### Step 2: Build the Plugin

```bash
# For development (with watch mode)
npm start

# OR for production build
npm run build
```

### Step 3: Activate in WordPress

1. Go to **WordPress Admin > Plugins**
2. Find **"Xgenious UI Blocks"**
3. Click **"Activate"**

### Step 4: Test the Hero Section Block

1. Create a new post or page
2. Click the **"+"** button to add a block
3. Search for **"Hero Section"**
4. Add the block and customize it!

---

## 📁 Project Structure Overview

```
xgenious-ui-blocks/
│
├── ✅ Main Plugin File
│   └── xgenious-ui-blocks.php          (Main entry point)
│
├── ✅ PHP Backend (PSR-4 Autoloaded)
│   └── includes/
│       ├── Admin/                       (Admin panel, settings)
│       ├── API/                         (REST API endpoints)
│       ├── Core/                        (Blocks loader, assets)
│       └── class-autoloader.php         (Autoloader)
│
├── ✅ Frontend Assets
│   └── assets/
│       ├── css/admin.css                (Admin panel styles)
│       └── js/admin.js                  (Admin panel scripts)
│
├── ⚙️ Source Files (ES6+, SCSS)
│   └── src/
│       ├── blocks/
│       │   ├── ✅ hero-section/        (COMPLETE - Example block)
│       │   ├── 🔲 feature-box/        (TODO)
│       │   ├── 🔲 testimonial/        (TODO)
│       │   ├── 🔲 pricing-table/      (TODO)
│       │   ├── 🔲 team-member/        (TODO)
│       │   ├── 🔲 counter/            (TODO)
│       │   ├── 🔲 call-to-action/     (TODO)
│       │   ├── 🔲 accordion/          (TODO)
│       │   ├── 🔲 tabs/               (TODO)
│       │   └── 🔲 progress-bar/       (TODO)
│       ├── editor.js                    (Editor entry point)
│       ├── frontend.js                  (Frontend entry point)
│       ├── editor.scss                  (Global editor styles)
│       └── style.scss                   (Global frontend styles)
│
├── 📦 Build Files (Auto-generated)
│   └── build/                           (Created by npm run build)
│
└── 📚 Documentation
    ├── README.md                        (User documentation)
    ├── DEVELOPMENT_GUIDE.md             (Developer guide)
    └── GETTING_STARTED.md               (This file)
```

---

## ✨ What's Already Built

### ✅ Complete Features

1. **Plugin Architecture**
   - ✅ Main plugin file with activation/deactivation hooks
   - ✅ PSR-4 autoloader for PHP classes
   - ✅ Modern ES6+ JavaScript with Webpack
   - ✅ SCSS preprocessing

2. **Admin Panel**
   - ✅ Settings page with toggle switches
   - ✅ Blocks manager (enable/disable individual blocks)
   - ✅ AJAX save functionality
   - ✅ Beautiful UI with responsive design

3. **Block System**
   - ✅ Dynamic block registration
   - ✅ Block categories (Xgenious UI, Xgenious Advanced)
   - ✅ Conditional block loading for performance

4. **Assets Management**
   - ✅ Smart asset enqueueing
   - ✅ Conditional loading (Google Fonts, Font Awesome, Animate.css)
   - ✅ Separate editor and frontend bundles

5. **REST API**
   - ✅ `/wp-json/xgenious-ui-blocks/v1/blocks` (Get all blocks)
   - ✅ `/wp-json/xgenious-ui-blocks/v1/settings` (Get/Update settings)
   - ✅ Permission checks

6. **Example Block - Hero Section**
   - ✅ Complete implementation with all features
   - ✅ Background image/video support
   - ✅ Overlay controls
   - ✅ Alignment options
   - ✅ Button settings
   - ✅ Animation support
   - ✅ Responsive design

---

## 🎯 Next Steps - Implementing Remaining Blocks

### Priority 1: Essential Blocks (High Impact)

#### 1. Feature Box (src/blocks/feature-box/)
- Icon picker
- Title, description
- Link support
- Hover effects
- Grid layout support

#### 2. Call to Action (src/blocks/call-to-action/)
- Heading, subheading
- Button(s)
- Background options
- Full-width support

#### 3. Testimonial (src/blocks/testimonial/)
- Avatar upload
- Name, position, company
- Rating stars
- Quote text
- Multiple layout styles

### Priority 2: Content Blocks

#### 4. Accordion (src/blocks/accordion/)
- Multiple items
- Open/close animation
- Allow multiple open
- Icon customization

#### 5. Tabs (src/blocks/tabs/)
- Horizontal/vertical layout
- Multiple tab panels
- Active state styling
- Smooth transitions

### Priority 3: Advanced Blocks

#### 6. Counter (src/blocks/counter/)
- Number animation
- Prefix/suffix
- Duration control
- Icon support

#### 7. Progress Bar (src/blocks/progress-bar/)
- Animated fill
- Percentage label
- Multiple styles
- Color customization

#### 8. Pricing Table (src/blocks/pricing-table/)
- Features list
- Pricing options
- Ribbons/badges
- Multiple columns

#### 9. Team Member (src/blocks/team-member/)
- Photo upload
- Name, position
- Bio text
- Social links
- Multiple layouts

---

## 🛠️ Development Workflow

### Starting Development

```bash
# Terminal 1: Watch for changes
npm start

# Terminal 2: Run WordPress
# Your WordPress site should be running
```

### Creating a New Block

```bash
# 1. Copy the hero-section as a template
cp -r src/blocks/hero-section src/blocks/my-new-block

# 2. Update block.json with new name
# Edit: src/blocks/my-new-block/block.json

# 3. Update webpack config
# Add entry in webpack.config.js

# 4. Register in PHP
# Add to includes/Core/Blocks_Loader.php

# 5. Import in editor.js
# Add: import './blocks/my-new-block';

# 6. Build and test
npm run build
```

### Testing Your Block

1. **In Editor:**
   - Add block to a post/page
   - Test all inspector controls
   - Verify preview updates in real-time
   - Check responsive behavior

2. **On Frontend:**
   - Publish the post/page
   - View on different devices
   - Test animations
   - Check browser compatibility

---

## 📋 Implementation Checklist

### For Each New Block:

- [ ] Create block directory structure
- [ ] Write `block.json` metadata
- [ ] Implement `edit.js` (editor component)
- [ ] Implement `save.js` (frontend output)
- [ ] Create `editor.scss` (editor styles)
- [ ] Create `style.scss` (frontend styles)
- [ ] Add to webpack config
- [ ] Register in PHP
- [ ] Import in `src/editor.js`
- [ ] Build and test
- [ ] Test responsive design
- [ ] Test accessibility
- [ ] Add frontend JavaScript if needed

---

## 🎨 Design Guidelines

### Colors
```css
--primary: #2271b1
--secondary: #135e96
--text: #2c3338
--light-bg: #f9f9f9
--border: #ddd
```

### Typography
- **Headings:** Poppins (or Inter fallback)
- **Body:** Inter
- **Base size:** 16px

### Spacing
- **Small:** 20px
- **Medium:** 40px
- **Large:** 60px
- **XL:** 80px

### Border Radius
- **Default:** 8px
- **Small:** 4px
- **Large:** 12px

### Shadows
```css
--shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
--shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.15)
```

---

## 🔧 Useful Commands

```bash
# Development
npm start                 # Watch mode with hot reload
npm run build            # Production build
npm run lint:js          # Lint JavaScript
npm run lint:css         # Lint CSS/SCSS
npm run format           # Format code

# Package
npm run plugin-zip       # Create distributable ZIP

# Debugging
npm run build -- --display-error-details

# Clean
rm -rf node_modules build/
npm install
npm run build
```

---

## 📖 Learning Resources

### WordPress Block Development
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)

### Code Examples
- **Complete Example:** `src/blocks/hero-section/`
- **PHP Classes:** `includes/Core/`, `includes/Admin/`
- **Admin UI:** `includes/Admin/views/`

### Documentation
- **User Guide:** `README.md`
- **Developer Guide:** `DEVELOPMENT_GUIDE.md`
- **This File:** `GETTING_STARTED.md`

---

## 🐛 Common Issues

### Issue: Blocks not showing in editor
**Solution:**
```bash
npm run build
# Clear browser cache (Cmd+Shift+R)
# Clear WordPress cache
```

### Issue: Styles not applying
**Solution:**
```bash
# Check for SCSS syntax errors
npm run lint:css

# Rebuild
npm run build

# Clear all caches
```

### Issue: Build errors
**Solution:**
```bash
rm -rf node_modules package-lock.json build/
npm install
npm run build
```

---

## ✅ Quick Test Checklist

After setup, verify everything works:

- [ ] Plugin activates without errors
- [ ] Admin menu "UI Blocks" appears
- [ ] Settings page loads correctly
- [ ] Blocks Manager shows all 10 blocks
- [ ] Hero Section block appears in editor
- [ ] Hero Section block can be added to a page
- [ ] Inspector controls work
- [ ] Block saves correctly
- [ ] Block displays on frontend
- [ ] No console errors

---

## 🎉 You're Ready!

Your plugin structure is complete and ready for development. The Hero Section block is fully implemented as a reference example.

### Recommended Next Steps:

1. ✅ **Test the Hero Section block** to understand the structure
2. 📝 **Copy hero-section folder** as a template for new blocks
3. 🎨 **Implement Feature Box** (simplest next block)
4. 🚀 **Continue with other blocks** based on priority

### Need Help?

- Check `DEVELOPMENT_GUIDE.md` for detailed instructions
- Review `src/blocks/hero-section/` for complete example
- Contact: support@xgenious.com

---

**Happy Coding! 🚀**

---

**Created:** February 4, 2026
**Version:** 1.0.0
**Status:** Ready for Development
