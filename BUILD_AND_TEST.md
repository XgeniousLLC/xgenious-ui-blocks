# Quick Build & Test Guide

## 🚀 Build the Plugin

```bash
# Navigate to plugin directory
cd /Users/sharifur/Desktop/Sharifur/localhost/xgenious/wp-content/plugins/xgenious-ui-blocks

# Install dependencies (if not already done)
npm install

# Build for production
npm run build

# OR start development mode (watch for changes)
npm start
```

## ✅ Verify Build Success

After building, you should see:

```
build/
├── blocks/
│   ├── hero-section/
│   │   ├── index.js
│   │   ├── style.css
│   │   └── editor.css
│   └── hero-banner/
│       ├── index.js
│       ├── style.css
│       └── editor.css
├── editor.js
├── editor.css
├── style.css
└── frontend.js
```

## 🎯 Test the Hero Banner Block

### 1. Activate Plugin
1. Go to **WordPress Admin > Plugins**
2. Find **"Xgenious UI Blocks"**
3. Click **"Activate"**

### 2. Add the Block
1. Create a new **Page** or **Post**
2. Click the **"+"** button
3. Search for **"Hero Banner"**
4. Click to add the block

### 3. Customize the Block
- Click on badge, heading, description to edit
- Use sidebar (right panel) to:
  - Change colors
  - Adjust spacing
  - Configure buttons
  - Toggle decorations

### 4. Preview
1. Click **"Preview"** to see on frontend
2. Test responsive design (resize browser)
3. Verify buttons work correctly

## 🎨 What You Should See

### In Editor:
- Dashed border around block
- "Hero Banner Block" label at top left
- Editable text fields
- Decorative shapes in background
- Inspector controls in sidebar

### On Frontend:
- Clean, professional hero section
- Smooth hover effects on buttons
- Responsive layout
- Decorative background shapes

## 📱 Test Responsive Design

1. **Desktop (1024px+):** Full layout, large heading
2. **Tablet (768-1023px):** Adjusted spacing
3. **Mobile (<768px):** Stacked buttons, smaller heading

## 🔧 Troubleshooting

### Problem: Block doesn't appear
**Solution:**
```bash
npm run build
# Clear WordPress cache
# Hard refresh browser (Cmd+Shift+R)
```

### Problem: Styles not applying
**Solution:**
```bash
# Check build output
ls -la build/blocks/hero-banner/

# Should show:
# - index.js
# - style.css  
# - editor.css

# If missing, rebuild
npm run build
```

### Problem: Build errors
**Solution:**
```bash
# Clean and rebuild
rm -rf node_modules build/
npm install
npm run build
```

## ✨ Quick Feature Test Checklist

- [ ] Block appears in inserter
- [ ] Badge text is editable
- [ ] Heading is editable
- [ ] Description is editable
- [ ] Primary button shows
- [ ] Secondary button toggles on/off
- [ ] Background color changes
- [ ] Text color changes
- [ ] Button color changes
- [ ] Alignment changes (left/center)
- [ ] Padding adjusts
- [ ] Decorations toggle on/off
- [ ] Responsive on mobile
- [ ] Buttons are clickable on frontend
- [ ] No console errors

## 📊 Framework Usage

The block uses the global framework (`framework.scss`):

```html
<div class="xg-container">         <!-- Container system -->
    <div class="xg-row">           <!-- Grid system -->
        <div class="xg-col-12 xg-col-lg-7">  <!-- Responsive columns -->
            <div class="xg-badge">          <!-- Badge component -->
            <h1 class="xg-heading xg-h1">   <!-- Typography -->
            <a class="xg-btn xg-btn-primary"> <!-- Button system -->
```

See `FRAMEWORK_GUIDE.md` for complete framework reference.

## 🎓 Next Steps

1. ✅ **Test the block** - Verify everything works
2. 📖 **Read docs:**
   - `FRAMEWORK_GUIDE.md` - CSS framework reference
   - `HERO_BANNER_BLOCK.md` - Block-specific guide
   - `DEVELOPMENT_GUIDE.md` - Development reference
3. 🎨 **Customize:**
   - Change default colors
   - Adjust spacing
   - Add custom styling
4. 🚀 **Build more blocks:**
   - Use Hero Banner as template
   - Leverage framework classes
   - Follow same pattern

## 📞 Support

- Framework guide: `FRAMEWORK_GUIDE.md`
- Block guide: `HERO_BANNER_BLOCK.md`
- Development guide: `DEVELOPMENT_GUIDE.md`

---

**Happy Building! 🎉**
