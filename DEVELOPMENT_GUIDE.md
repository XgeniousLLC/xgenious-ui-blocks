# Xgenious UI Blocks - Development Guide

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- WordPress 6.0+
- PHP 7.4+
- Composer (optional, for future PHP dependencies)

### Installation & Setup

```bash
# 1. Navigate to plugin directory
cd wp-content/plugins/xgenious-ui-blocks

# 2. Install npm dependencies
npm install

# 3. Start development mode (watches for changes)
npm start

# 4. Or build for production
npm run build
```

### Activating the Plugin

1. Go to WordPress Admin > Plugins
2. Find "Xgenious UI Blocks"
3. Click "Activate"
4. Access settings at **WordPress Admin > UI Blocks**

---

## Project Architecture

### Directory Structure

```
xgenious-ui-blocks/
│
├── assets/                          # Static assets
│   ├── css/
│   │   └── admin.css               # Admin panel styles
│   └── js/
│       └── admin.js                # Admin panel JavaScript
│
├── build/                           # Compiled files (auto-generated)
│   ├── blocks/                     # Individual block builds
│   │   ├── hero-section/
│   │   ├── feature-box/
│   │   └── ...
│   ├── editor.css                  # Editor styles
│   ├── editor.js                   # Editor scripts
│   ├── style.css                   # Frontend styles
│   └── frontend.js                 # Frontend scripts
│
├── includes/                        # PHP classes (PSR-4 autoloaded)
│   ├── Admin/
│   │   ├── Settings.php            # Admin settings handler
│   │   └── views/                  # Admin view templates
│   │       ├── settings.php
│   │       └── blocks-manager.php
│   ├── API/
│   │   └── Rest_API.php            # REST API endpoints
│   ├── Core/
│   │   ├── Assets_Manager.php      # Asset loading manager
│   │   └── Blocks_Loader.php       # Block registration
│   └── class-autoloader.php        # PSR-4 autoloader
│
├── src/                             # Source files (ES6+, SCSS)
│   ├── blocks/                     # Block components
│   │   ├── hero-section/           # Example: Full block implementation
│   │   │   ├── block.json          # Block metadata
│   │   │   ├── index.js            # Block registration
│   │   │   ├── edit.js             # Editor component
│   │   │   ├── save.js             # Save component
│   │   │   ├── editor.scss         # Editor styles
│   │   │   └── style.scss          # Frontend styles
│   │   ├── feature-box/            # TODO: Implement
│   │   ├── testimonial/            # TODO: Implement
│   │   ├── pricing-table/          # TODO: Implement
│   │   ├── team-member/            # TODO: Implement
│   │   ├── counter/                # TODO: Implement
│   │   ├── call-to-action/         # TODO: Implement
│   │   ├── accordion/              # TODO: Implement
│   │   ├── tabs/                   # TODO: Implement
│   │   └── progress-bar/           # TODO: Implement
│   ├── components/                 # Reusable React components (to be added)
│   ├── utils/                      # Utility functions (to be added)
│   ├── editor.js                   # Main editor entry
│   ├── editor.scss                 # Global editor styles
│   ├── frontend.js                 # Main frontend entry
│   └── style.scss                  # Global frontend styles
│
├── languages/                       # Translation files (to be generated)
├── .gitignore
├── package.json                     # npm dependencies
├── webpack.config.js                # Webpack build configuration
├── README.md                        # User documentation
├── DEVELOPMENT_GUIDE.md             # This file
└── xgenious-ui-blocks.php          # Main plugin file
```

---

## Creating a New Block

### Step 1: Create Block Directory

```bash
mkdir -p src/blocks/my-new-block
cd src/blocks/my-new-block
```

### Step 2: Create Required Files

#### 2.1 Block Metadata (`block.json`)

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "xgenious-ui-blocks/my-new-block",
    "title": "My New Block",
    "category": "xgenious-ui",
    "icon": "star-filled",
    "description": "Description of my new block",
    "keywords": ["keyword1", "keyword2"],
    "textdomain": "xgenious-ui-blocks",
    "supports": {
        "html": false,
        "align": ["wide", "full"],
        "spacing": {
            "margin": true,
            "padding": true
        }
    },
    "attributes": {
        "title": {
            "type": "string",
            "default": "Block Title"
        },
        "content": {
            "type": "string",
            "default": "Block content"
        }
    },
    "example": {
        "attributes": {
            "title": "Example Title"
        }
    }
}
```

#### 2.2 Block Registration (`index.js`)

```javascript
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './editor.scss';
import './style.scss';

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save,
});
```

#### 2.3 Edit Component (`edit.js`)

```javascript
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { title, content } = attributes;
    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings', 'xgenious-ui-blocks')}>
                    <TextControl
                        label={__('Title', 'xgenious-ui-blocks')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText
                    tagName="h2"
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    placeholder={__('Enter title...', 'xgenious-ui-blocks')}
                />
                <RichText
                    tagName="p"
                    value={content}
                    onChange={(value) => setAttributes({ content: value })}
                    placeholder={__('Enter content...', 'xgenious-ui-blocks')}
                />
            </div>
        </>
    );
}
```

#### 2.4 Save Component (`save.js`)

```javascript
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { title, content } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <RichText.Content tagName="h2" value={title} />
            <RichText.Content tagName="p" value={content} />
        </div>
    );
}
```

#### 2.5 Editor Styles (`editor.scss`)

```scss
.wp-block-xgenious-ui-blocks-my-new-block {
    padding: 20px;
    background: #f9f9f9;
    border: 2px dashed #ddd;
    border-radius: 8px;

    h2 {
        margin-bottom: 12px;
    }

    p {
        margin: 0;
    }
}
```

#### 2.6 Frontend Styles (`style.scss`)

```scss
.wp-block-xgenious-ui-blocks-my-new-block {
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 32px;
        margin-bottom: 16px;
        color: #2c3338;
    }

    p {
        font-size: 16px;
        line-height: 1.6;
        color: #666;
    }
}
```

### Step 3: Register Block in Webpack

Edit `webpack.config.js` and add your block to the entry points:

```javascript
entry: {
    // ... existing entries
    'blocks/my-new-block/index': path.resolve(__dirname, 'src/blocks/my-new-block/index.js'),
}
```

### Step 4: Register Block in PHP

Edit `includes/Core/Blocks_Loader.php` and add your block to the `$blocks` array:

```php
private function register_blocks() {
    $this->blocks = [
        // ... existing blocks
        'my-new-block' => [
            'title' => __('My New Block', 'xgenious-ui-blocks'),
            'description' => __('Description of my new block', 'xgenious-ui-blocks'),
            'category' => 'xgenious-ui',
            'icon' => 'star-filled',
            'keywords' => ['keyword1', 'keyword2'],
        ],
    ];
}
```

### Step 5: Register Block Import

Edit `src/editor.js` and import your block:

```javascript
import './blocks/my-new-block';
```

### Step 6: Build and Test

```bash
# Build the block
npm run build

# Or run in dev mode with hot reload
npm start
```

Then test in WordPress block editor!

---

## Block Development Best Practices

### 1. Use Block Attributes Correctly

```javascript
// ✅ Good - Use proper type definitions
"attributes": {
    "title": {
        "type": "string",
        "default": "Default Title"
    },
    "count": {
        "type": "number",
        "default": 0
    },
    "isEnabled": {
        "type": "boolean",
        "default": true
    },
    "items": {
        "type": "array",
        "default": []
    }
}

// ❌ Bad - Missing defaults
"attributes": {
    "title": {
        "type": "string"
    }
}
```

### 2. Use useBlockProps Hook

```javascript
// ✅ Good - Always use useBlockProps
export default function Edit({ attributes }) {
    const blockProps = useBlockProps({
        className: 'my-custom-class'
    });
    return <div {...blockProps}>Content</div>;
}

// ❌ Bad - Manual class names
export default function Edit({ attributes }) {
    return <div className="wp-block-my-block">Content</div>;
}
```

### 3. Proper Inspector Controls

```javascript
// ✅ Good - Organized with PanelBody
<InspectorControls>
    <PanelBody title="General Settings" initialOpen={true}>
        <TextControl ... />
        <ToggleControl ... />
    </PanelBody>
    <PanelBody title="Style Settings">
        <ColorPicker ... />
        <RangeControl ... />
    </PanelBody>
</InspectorControls>

// ❌ Bad - No organization
<InspectorControls>
    <TextControl ... />
    <ToggleControl ... />
    <ColorPicker ... />
</InspectorControls>
```

### 4. Accessibility

```javascript
// ✅ Good - Proper ARIA labels
<button
    aria-label={__('Close modal', 'xgenious-ui-blocks')}
    onClick={closeModal}
>
    <span aria-hidden="true">×</span>
</button>

// ❌ Bad - No accessibility
<button onClick={closeModal}>×</button>
```

### 5. Responsive Design

```scss
// ✅ Good - Mobile-first approach
.my-block {
    padding: 20px;

    @media (min-width: 768px) {
        padding: 40px;
    }

    @media (min-width: 1024px) {
        padding: 60px;
    }
}

// ❌ Bad - Desktop-first
.my-block {
    padding: 60px;

    @media (max-width: 768px) {
        padding: 20px;
    }
}
```

---

## Common Block Components

### RichText Component

```javascript
import { RichText } from '@wordpress/block-editor';

// In Edit component
<RichText
    tagName="h2"
    value={title}
    onChange={(value) => setAttributes({ title: value })}
    placeholder={__('Enter title...', 'xgenious-ui-blocks')}
/>

// In Save component
<RichText.Content tagName="h2" value={title} />
```

### Media Upload

```javascript
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

<MediaUploadCheck>
    <MediaUpload
        onSelect={(media) => setAttributes({
            imageId: media.id,
            imageUrl: media.url
        })}
        allowedTypes={['image']}
        value={imageId}
        render={({ open }) => (
            <Button onClick={open} isPrimary>
                {imageUrl ? 'Change Image' : 'Select Image'}
            </Button>
        )}
    />
</MediaUploadCheck>
```

### Color Picker

```javascript
import { ColorPicker } from '@wordpress/components';
import { PanelBody } from '@wordpress/components';

<PanelBody title="Colors">
    <p>{__('Background Color', 'xgenious-ui-blocks')}</p>
    <ColorPicker
        color={backgroundColor}
        onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
    />
</PanelBody>
```

### Range Control

```javascript
import { RangeControl } from '@wordpress/components';

<RangeControl
    label={__('Padding', 'xgenious-ui-blocks')}
    value={padding}
    onChange={(value) => setAttributes({ padding: value })}
    min={0}
    max={100}
    step={5}
/>
```

---

## PHP Development

### Adding New Admin Pages

Create a new class in `includes/Admin/`:

```php
<?php
namespace XgeniousUIBlocks\Admin;

class MyAdminPage {
    private static $instance = null;

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', [$this, 'add_menu_page']);
    }

    public function add_menu_page() {
        add_submenu_page(
            'xgenious-ui-blocks',
            __('My Page', 'xgenious-ui-blocks'),
            __('My Page', 'xgenious-ui-blocks'),
            'manage_options',
            'xgenious-my-page',
            [$this, 'render_page']
        );
    }

    public function render_page() {
        echo '<div class="wrap">';
        echo '<h1>' . __('My Admin Page', 'xgenious-ui-blocks') . '</h1>';
        echo '</div>';
    }
}
```

Then initialize in `xgenious-ui-blocks.php`:

```php
public function init() {
    // ... existing code
    \XgeniousUIBlocks\Admin\MyAdminPage::instance();
}
```

### Adding REST API Endpoints

Edit `includes/API/Rest_API.php`:

```php
public function register_routes() {
    // ... existing routes

    register_rest_route($this->namespace, '/my-endpoint', [
        'methods' => 'GET',
        'callback' => [$this, 'my_endpoint_callback'],
        'permission_callback' => [$this, 'check_permission'],
    ]);
}

public function my_endpoint_callback($request) {
    return rest_ensure_response([
        'success' => true,
        'data' => 'My data',
    ]);
}
```

---

## Debugging

### Enable WordPress Debug Mode

In `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', true);
```

### Browser Console Debugging

```javascript
// In your block's edit.js
console.log('Attributes:', attributes);
console.log('Block props:', blockProps);

// Use React DevTools Chrome extension for better debugging
```

### PHP Debugging

```php
// In your PHP files
error_log('Debug message: ' . print_r($variable, true));
```

### Check Build Errors

```bash
# Run build with verbose output
npm run build -- --display-error-details
```

---

## Testing

### Manual Testing Checklist

- [ ] Block appears in block inserter
- [ ] Block displays correctly in editor
- [ ] Block saves correctly
- [ ] Block displays correctly on frontend
- [ ] Inspector controls work as expected
- [ ] Block is responsive on mobile
- [ ] Block works with different themes
- [ ] Block is accessible (keyboard navigation, screen readers)
- [ ] Block performs well (no lag in editor)

### Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### WordPress Version Testing

Test with:
- WordPress 6.0+
- Classic Editor plugin (ensure no conflicts)
- Gutenberg plugin (latest)

---

## Deployment

### Pre-deployment Checklist

- [ ] Run `npm run build` for production
- [ ] Test in staging environment
- [ ] Check all blocks work correctly
- [ ] Verify no console errors
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Check loading performance
- [ ] Update version number in `xgenious-ui-blocks.php`
- [ ] Update CHANGELOG.md

### Building for Production

```bash
# Clean build directory
rm -rf build/

# Build for production (minified)
npm run build

# Create plugin ZIP file
npm run plugin-zip
```

This creates `xgenious-ui-blocks.zip` ready for distribution.

---

## Troubleshooting

### Block Not Appearing in Editor

1. Check browser console for JavaScript errors
2. Verify block is registered in `src/editor.js`
3. Verify block is added to `includes/Core/Blocks_Loader.php`
4. Rebuild: `npm run build`
5. Clear WordPress cache
6. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

### Styles Not Applying

1. Check if CSS files exist in `build/` directory
2. Verify SCSS has no syntax errors
3. Clear all caches (WordPress, browser, CDN)
4. Check for CSS conflicts with theme
5. Rebuild: `npm run build`

### Build Errors

```bash
# Clear everything and reinstall
rm -rf node_modules package-lock.json build/
npm install
npm run build
```

### PHP Errors

1. Check error logs at `/wp-content/debug.log`
2. Verify PHP version is 7.4+
3. Check for syntax errors
4. Verify class names match file names (PSR-4)

---

## Resources

### WordPress Block Development
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [@wordpress/scripts Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)

### React & JavaScript
- [React Documentation](https://react.dev/)
- [WordPress Components](https://developer.wordpress.org/block-editor/reference-guides/components/)
- [WordPress Block Editor Components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [WordPress DevTools](https://chrome.google.com/webstore/detail/wordpress-devtools/)

---

## Support

For questions or issues:
- Check the README.md file
- Review code examples in `src/blocks/hero-section/`
- Contact: support@xgenious.com

---

**Last Updated:** February 4, 2026
**Version:** 1.0.0
