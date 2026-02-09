# Downloads Grid Block

A dynamic WordPress Gutenberg block that displays posts from the custom post type `download` with category filtering and pagination.

## Features

- **Dynamic Content**: Fetches posts from `download` custom post type
- **Category Filtering**: Filter tabs based on `download_category` taxonomy
- **Pagination**: Navigate through multiple pages of downloads
- **Responsive Grid**: 1-4 column layout options
- **Customizable Colors**: Full control over filter, card, and pagination colors
- **Server-Side Rendered**: Better performance and SEO

## Custom Post Type Setup

This block requires a custom post type named `download` and a taxonomy named `download_category`. If you're using a plugin to create custom post types, use these settings:

### Using Code (functions.php or custom plugin):

```php
<?php
/**
 * Register Download Custom Post Type
 */
function register_download_post_type() {
    $labels = array(
        'name'                  => _x('Downloads', 'Post Type General Name', 'text-domain'),
        'singular_name'         => _x('Download', 'Post Type Singular Name', 'text-domain'),
        'menu_name'             => __('Downloads', 'text-domain'),
        'add_new_item'          => __('Add New Download', 'text-domain'),
        'edit_item'             => __('Edit Download', 'text-domain'),
        'view_item'             => __('View Download', 'text-domain'),
        'all_items'             => __('All Downloads', 'text-domain'),
    );

    $args = array(
        'label'                 => __('Download', 'text-domain'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'thumbnail', 'excerpt'),
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_icon'             => 'dashicons-download',
        'show_in_rest'          => true,
        'has_archive'           => true,
        'rewrite'               => array('slug' => 'downloads'),
    );

    register_post_type('download', $args);
}
add_action('init', 'register_download_post_type');

/**
 * Register Download Category Taxonomy
 */
function register_download_category_taxonomy() {
    $labels = array(
        'name'              => _x('Categories', 'taxonomy general name', 'text-domain'),
        'singular_name'     => _x('Category', 'taxonomy singular name', 'text-domain'),
        'search_items'      => __('Search Categories', 'text-domain'),
        'all_items'         => __('All Categories', 'text-domain'),
        'edit_item'         => __('Edit Category', 'text-domain'),
        'update_item'       => __('Update Category', 'text-domain'),
        'add_new_item'      => __('Add New Category', 'text-domain'),
    );

    $args = array(
        'labels'            => $labels,
        'hierarchical'      => true,
        'public'            => true,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'download-category'),
    );

    register_taxonomy('download_category', array('download'), $args);
}
add_action('init', 'register_download_category_taxonomy');
```

### Using Custom Post Type UI Plugin:

1. **Install Plugin**: Install "Custom Post Type UI" plugin
2. **Add Post Type**:
   - Post Type Slug: `download`
   - Plural Label: `Downloads`
   - Singular Label: `Download`
   - Has Archive: `true`
   - Show in REST API: `true`
   - Supports: Title, Editor, Featured Image, Excerpt

3. **Add Taxonomy**:
   - Taxonomy Slug: `download_category`
   - Plural Label: `Categories`
   - Singular Label: `Category`
   - Attach to Post Type: `download`
   - Hierarchical: `Yes`
   - Show in REST API: `Yes`

## Block Settings

### Layout Settings
- **Posts Per Page**: Number of downloads to display per page (1-24)
- **Columns**: Grid columns (1-4)
- **Show Filters**: Toggle category filter tabs
- **Show Pagination**: Toggle pagination controls

### Filter Colors
- **Active Background Color**: Background color for active filter button
- **Active Text Color**: Text color for active filter button

### Card Colors
- **Card Background**: Background color for download cards
- **Title Color**: Color for download titles

### Pagination Colors
- **Active Page Color**: Background color for active page number
- **Inactive Page Color**: Text color for inactive page numbers

## Usage

1. **Add Block**: In Gutenberg editor, search for "Downloads Grid"
2. **Configure Settings**: Adjust layout, colors, and display options in the sidebar
3. **Add Downloads**: Create download posts with featured images
4. **Assign Categories**: Tag downloads with categories for filtering
5. **Publish**: The block will automatically display your downloads

## Design Features

### Filter Tabs
- Pill-shaped buttons with rounded corners
- "All Product" shows all downloads
- Category tabs filter by taxonomy
- Active state with custom colors
- Hover effects with elevation

### Download Cards
- Featured image with 4:3 aspect ratio
- Zoom effect on image hover
- Card title below image
- Card elevation on hover
- Responsive grid layout

### Pagination
- Circular page numbers
- Active state highlighting
- Shows 5 pages at a time
- Smooth transitions
- Maintains filter state across pages

## URL Parameters

The block uses URL query parameters for filtering and pagination:

- `?download_category=category-slug` - Filter by category
- `?paged=2` - Page number

These are managed automatically by the filter and pagination buttons.

## Responsive Behavior

- **Desktop (1400px+)**: Up to 4 columns
- **Tablet (1024px-1400px)**: 2-3 columns
- **Mobile (<768px)**: Single column
- Filter tabs wrap on smaller screens
- Pagination scales down on mobile

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Troubleshooting

### "Custom post type 'download' not found"
- Make sure you've registered the `download` post type
- Verify the post type slug is exactly `download` (lowercase)
- Flush permalinks: Settings → Permalinks → Save Changes

### No downloads showing
- Create some download posts
- Ensure posts are published
- Check if featured images are set
- Verify taxonomy is registered

### Filters not working
- Ensure `download_category` taxonomy exists
- Assign categories to downloads
- Flush permalinks

### Pagination not showing
- Add more downloads than `Posts Per Page` setting
- Enable "Show Pagination" in block settings

## Example Categories

You might create categories like:
- All Product (default)
- Regular Item
- Bundle Pack
- Premium Items
- Free Downloads

## Notes

- This is a **dynamic block** - content is rendered server-side
- Category filtering uses URL parameters (SEO-friendly)
- Pagination preserves filter state
- All colors are customizable via block settings
- Works with any WordPress theme

## Code Files

- `src/blocks/downloads-grid/block.json` - Block configuration
- `src/blocks/downloads-grid/render.php` - Server-side rendering
- `src/blocks/downloads-grid/edit.js` - Editor component
- `src/blocks/downloads-grid/style.scss` - Frontend styles
- `src/blocks/downloads-grid/editor.scss` - Editor styles
