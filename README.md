# Xgenious UI Blocks

Modern, professional Gutenberg blocks for WordPress with advanced styling and functionality.

## Features

- 🎨 **10 Premium Blocks** - Hero Section, Feature Box, Testimonial, Pricing Table, Team Member, Counter, Call to Action, Accordion, Tabs, Progress Bar
- ⚡ **Performance Optimized** - Lightweight, modular loading, conditional assets
- 🎭 **Highly Customizable** - Extensive styling options, custom colors, typography
- 📱 **Fully Responsive** - Mobile-first design, looks perfect on all devices
- ♿ **Accessible** - WCAG 2.1 compliant, keyboard navigation, screen reader support
- 🌐 **Translation Ready** - Multi-language support with .pot file
- 🔧 **Developer Friendly** - Clean code, hooks, filters, extensible architecture

## Installation

### Automatic Installation

1. Download the plugin ZIP file
2. Go to WordPress Admin > Plugins > Add New
3. Click "Upload Plugin" and select the ZIP file
4. Click "Install Now" and then "Activate"

### Manual Installation

1. Upload `xgenious-ui-blocks` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- WordPress 6.0+
- PHP 7.4+

### Installation

```bash
# Navigate to plugin directory
cd wp-content/plugins/xgenious-ui-blocks

# Install dependencies
npm install

# Start development (watch mode)
npm start

# Build for production
npm run build
```

## Project Structure

```
xgenious-ui-blocks/
├── assets/                      # Static assets
│   ├── css/
│   │   └── admin.css           # Admin styles
│   └── js/
│       └── admin.js            # Admin scripts
├── build/                       # Compiled files (generated)
│   ├── blocks/                 # Individual block builds
│   ├── editor.css              # Editor styles
│   ├── editor.js               # Editor scripts
│   ├── style.css               # Frontend styles
│   └── frontend.js             # Frontend scripts
├── includes/                    # PHP classes
│   ├── Admin/
│   │   ├── Settings.php        # Admin settings
│   │   └── views/              # Admin templates
│   ├── API/
│   │   └── Rest_API.php        # REST API endpoints
│   ├── Core/
│   │   ├── Assets_Manager.php  # Asset loading
│   │   └── Blocks_Loader.php   # Block registration
│   └── class-autoloader.php    # PSR-4 autoloader
├── src/                         # Source files
│   ├── blocks/                 # Block components
│   │   ├── hero-section/
│   │   │   ├── index.js        # Block registration
│   │   │   ├── edit.js         # Editor component
│   │   │   ├── save.js         # Save component
│   │   │   ├── block.json      # Block metadata
│   │   │   ├── editor.scss     # Editor styles
│   │   │   └── style.scss      # Frontend styles
│   │   ├── feature-box/
│   │   ├── testimonial/
│   │   ├── pricing-table/
│   │   ├── team-member/
│   │   ├── counter/
│   │   ├── call-to-action/
│   │   ├── accordion/
│   │   ├── tabs/
│   │   └── progress-bar/
│   ├── components/             # Reusable React components
│   ├── utils/                  # Utility functions
│   ├── editor.js               # Main editor entry
│   ├── editor.scss             # Global editor styles
│   ├── frontend.js             # Main frontend entry
│   └── style.scss              # Global frontend styles
├── languages/                   # Translation files
├── .gitignore
├── package.json
├── webpack.config.js
├── README.md
└── xgenious-ui-blocks.php      # Main plugin file
```

## Available Blocks

### UI Blocks (Category: xgenious-ui)

1. **Hero Section** - Full-width hero with background image/video, overlay, call-to-action
2. **Feature Box** - Icon box with title, description, hover effects
3. **Testimonial** - Customer testimonial with avatar, rating, quote
4. **Pricing Table** - Pricing plans with features, ribbons, buttons
5. **Team Member** - Team card with photo, bio, social links
6. **Counter** - Animated counter with prefix/suffix, icon
7. **Call to Action** - CTA section with heading, text, buttons

### Advanced Blocks (Category: xgenious-advanced)

8. **Accordion** - Collapsible FAQ/content with icons, animations
9. **Tabs** - Tabbed content with horizontal/vertical layouts
10. **Progress Bar** - Skill bars with animation, labels, percentages

## Block Development Guide

### Creating a New Block

```bash
# Create block directory
mkdir -p src/blocks/my-block

# Create required files
touch src/blocks/my-block/index.js
touch src/blocks/my-block/edit.js
touch src/blocks/my-block/save.js
touch src/blocks/my-block/block.json
touch src/blocks/my-block/editor.scss
touch src/blocks/my-block/style.scss
```

### Block Structure (block.json)

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "xgenious-ui-blocks/my-block",
  "title": "My Block",
  "category": "xgenious-ui",
  "icon": "star-filled",
  "description": "Description of my block",
  "keywords": ["keyword1", "keyword2"],
  "textdomain": "xgenious-ui-blocks",
  "attributes": {
    "title": {
      "type": "string",
      "default": "Block Title"
    }
  },
  "supports": {
    "html": false,
    "align": ["wide", "full"],
    "spacing": {
      "margin": true,
      "padding": true
    }
  },
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css"
}
```

### Block Registration (index.js)

```javascript
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './editor.scss';
import './style.scss';

registerBlockType(metadata.name, {
    edit: Edit,
    save,
});
```

### Edit Component (edit.js)

```javascript
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { title } = attributes;
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
            </div>
        </>
    );
}
```

### Save Component (save.js)

```javascript
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { title } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <RichText.Content tagName="h2" value={title} />
        </div>
    );
}
```

## Admin Settings

Access admin settings at **WordPress Admin > UI Blocks > Settings**

### Settings Options

- **Google Fonts** - Enable/disable Google Fonts loading (Inter & Poppins)
- **Font Awesome** - Enable/disable Font Awesome icon library
- **Animation Library** - Enable/disable Animate.css for animations

### Blocks Manager

Access blocks manager at **WordPress Admin > UI Blocks > Blocks Manager**

- Enable/disable individual blocks
- Improve editor performance by disabling unused blocks
- View block categories, descriptions, keywords

## REST API Endpoints

### Get All Blocks

```
GET /wp-json/xgenious-ui-blocks/v1/blocks
```

### Get Settings

```
GET /wp-json/xgenious-ui-blocks/v1/settings
```

### Update Settings

```
POST /wp-json/xgenious-ui-blocks/v1/settings
Content-Type: application/json

{
  "google_fonts": true,
  "font_awesome": true,
  "animation_library": true,
  "enabled_blocks": ["hero-section", "feature-box"]
}
```

## Hooks & Filters

### Filters

#### `xgenious_ui_blocks_available_blocks`

Modify available blocks list.

```php
add_filter('xgenious_ui_blocks_available_blocks', function($blocks) {
    // Add custom block
    $blocks['my-custom-block'] = [
        'title' => 'My Custom Block',
        'description' => 'Custom block description',
        'category' => 'xgenious-ui',
        'icon' => 'star-filled',
        'keywords' => ['custom', 'block'],
    ];
    return $blocks;
});
```

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Performance Tips

1. **Disable Unused Blocks** - Use Blocks Manager to disable blocks you don't use
2. **Conditional Assets** - Libraries only load when blocks are used
3. **Optimize Images** - Use WebP format for block images
4. **Minify CSS/JS** - Run `npm run build` for production

## Troubleshooting

### Blocks Not Showing in Editor

1. Clear browser cache and WordPress cache
2. Regenerate build files: `npm run build`
3. Check if blocks are enabled in Blocks Manager
4. Verify WordPress version 6.0+

### Styles Not Applying

1. Clear all caches (browser, WordPress, CDN)
2. Check if CSS files exist in `/build/` directory
3. Verify file permissions
4. Check for CSS conflicts with theme

### Build Errors

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear webpack cache
rm -rf build
npm run build
```

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Changelog

### Version 1.0.0 (2026-02-04)

- Initial release
- 10 premium blocks
- Admin settings panel
- Blocks manager
- REST API endpoints
- Performance optimizations
- Accessibility improvements

## License

GPL-2.0+ - GNU General Public License v2 or later

## Support

For support, please contact:
- Email: support@xgenious.com
- Website: https://xgenious.com
- Documentation: https://docs.xgenious.com/ui-blocks

## Credits

Developed by **Xgenious** - https://xgenious.com
