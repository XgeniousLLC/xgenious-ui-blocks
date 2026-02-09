# Easy Digital Downloads Integration

## Downloads Grid Block - EDD Compatible

The Downloads Grid block is now fully integrated with **Easy Digital Downloads** plugin!

### Features

✅ **Automatic Detection** - Block detects if Easy Digital Downloads is active
✅ **Price Display** - Shows product prices with support for variable pricing
✅ **Purchase Buttons** - Optional Add to Cart buttons
✅ **Category Filtering** - Uses EDD's `download_category` taxonomy
✅ **Responsive Grid** - Beautiful product showcase layout
✅ **Pagination** - Navigate through large product catalogs

### Requirements

- **Easy Digital Downloads** plugin installed and activated
- Downloads created with featured images
- Categories assigned to downloads (optional, for filtering)

### Block Settings

#### Layout Settings
- **Posts Per Page**: 1-24 downloads
- **Columns**: 1-4 column grid
- **Show Filters**: Toggle category filter tabs
- **Show Pagination**: Toggle page numbers

#### Easy Digital Downloads Settings
- **Show Price**: Display product price (supports variable pricing)
- **Show Purchase Button**: Display Add to Cart button
- **Price Color**: Customize price text color

#### Color Customization
- Filter button colors (active state)
- Card background and title colors
- Pagination colors
- Price color

### Usage

1. **Install Easy Digital Downloads**
   ```
   Plugins → Add New → Search "Easy Digital Downloads"
   ```

2. **Create Downloads**
   - Add new downloads (products)
   - Set featured images
   - Assign prices
   - Add to categories

3. **Add Block**
   - Search "Downloads Grid" in Gutenberg editor
   - Configure settings in sidebar
   - Publish!

### What Gets Displayed

**Without EDD Active:**
- Block shows a notice to install EDD
- Basic preview available

**With EDD Active:**
- Product featured image
- Product title
- Product price (if enabled)
- Add to Cart button (if enabled)
- Category filtering
- Pagination

### Price Display

The block intelligently handles different price types:

**Simple Pricing:**
```
$19.99
```

**Variable Pricing:**
```
From: $9.99
```

### Styling

The block includes beautiful default styles:

- **Cards**: White background with subtle shadows
- **Filters**: Pill-shaped buttons (coral #ea7c69 active state)
- **Prices**: Large, bold price display
- **Buttons**: Full-width, rounded purchase buttons
- **Hover Effects**: Card elevation and image zoom

### Customization

All colors are customizable via block settings:

```scss
// Default Colors
Filter Active: #ea7c69
Card Background: #ffffff
Title Color: #000000
Price Color: #ea7c69
Pagination Active: #000000
```

### EDD Functions Used

- `edd_get_download_price()` - Get product price
- `edd_has_variable_prices()` - Check for variable pricing
- `edd_price()` - Display formatted price
- `edd_get_purchase_link()` - Generate purchase button

### URL Parameters

The block uses clean URL parameters for filtering:

```
?download_category=wordpress-plugins
?paged=2
```

These are SEO-friendly and maintain state across pagination.

### Responsive Design

- **Desktop**: Up to 4 columns
- **Tablet**: 2-3 columns
- **Mobile**: Single column
- Filters wrap on small screens
- Pagination scales down

### Browser Support

- Chrome/Edge ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

### Troubleshooting

**No downloads showing:**
- Ensure EDD is active
- Create some downloads
- Set featured images
- Check download status (published)

**Prices not showing:**
- Enable "Show Price" in block settings
- Ensure downloads have prices set
- Check EDD price settings

**Purchase button not working:**
- Enable "Show Purchase Button" in settings
- Verify EDD cart is working
- Check EDD settings

### Example Setup

1. Install Easy Digital Downloads
2. Create 6+ downloads with images and prices
3. Create categories: "WordPress Plugins", "Themes", "Bundles"
4. Assign downloads to categories
5. Add "Downloads Grid" block to a page
6. Configure: 6 per page, 2 columns, show filters, show price
7. Publish!

### Performance

- **Server-Side Rendered**: Better SEO and performance
- **Caching Compatible**: Works with WordPress caching plugins
- **Optimized Queries**: Uses WP_Query efficiently
- **Pagination**: Reduces initial load time

### Integration Notes

- Block checks for EDD using `function_exists('edd_get_download_price')`
- Falls back gracefully if EDD is not active
- All EDD features are optional (can disable price/buttons)
- Works with any EDD theme
- Compatible with EDD extensions

---

**Last Updated**: February 8, 2026
**Plugin Version**: 1.1.0
**EDD Compatibility**: 3.x+
