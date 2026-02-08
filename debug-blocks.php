<?php
/**
 * Debug script to check registered blocks
 *
 * Access via: http://localhost/xgenious/wp-content/plugins/xgenious-ui-blocks/debug-blocks.php
 */

// Load WordPress
require_once('../../../wp-load.php');

if (!current_user_can('manage_options')) {
    die('Access denied');
}

echo "<h1>Xgenious UI Blocks - Debug Info</h1>";

// Check plugin status
echo "<h2>Plugin Status</h2>";
echo "Plugin Active: " . (is_plugin_active('xgenious-ui-blocks/xgenious-ui-blocks.php') ? 'YES' : 'NO') . "<br>";

// Check settings
echo "<h2>Plugin Settings</h2>";
$settings = get_option('xgenious_ui_blocks_settings', []);
echo "<pre>";
print_r($settings);
echo "</pre>";

// Check registered blocks
echo "<h2>Registered WordPress Blocks</h2>";
$registry = WP_Block_Type_Registry::get_instance();
$all_blocks = $registry->get_all_registered();

echo "<h3>Xgenious Blocks Found:</h3>";
$xgenious_blocks = array_filter($all_blocks, function($key) {
    return strpos($key, 'xgenious-ui-blocks/') === 0;
}, ARRAY_FILTER_USE_KEY);

if (empty($xgenious_blocks)) {
    echo "<strong style='color:red;'>NO XGENIOUS BLOCKS REGISTERED!</strong><br><br>";
} else {
    echo "<ul>";
    foreach ($xgenious_blocks as $block_name => $block) {
        echo "<li><strong>$block_name</strong> - " . ($block->title ?? 'No title') . "</li>";
    }
    echo "</ul>";
}

// Check if hero-banner specifically exists
echo "<h3>Hero Banner Block Check:</h3>";
if (isset($all_blocks['xgenious-ui-blocks/hero-banner'])) {
    echo "<strong style='color:green;'>✓ Hero Banner block IS registered!</strong><br>";
    $hero_block = $all_blocks['xgenious-ui-blocks/hero-banner'];
    echo "<pre>";
    print_r([
        'name' => $hero_block->name,
        'title' => $hero_block->title,
        'category' => $hero_block->category,
        'icon' => $hero_block->icon,
    ]);
    echo "</pre>";
} else {
    echo "<strong style='color:red;'>✗ Hero Banner block NOT registered!</strong><br>";
}

// Check build files
echo "<h2>Build Files Check</h2>";
$hero_banner_path = plugin_dir_path(__FILE__) . 'build/blocks/hero-banner/';
echo "Path: $hero_banner_path<br>";
echo "block.json exists: " . (file_exists($hero_banner_path . 'block.json') ? 'YES' : 'NO') . "<br>";
echo "index.js exists: " . (file_exists($hero_banner_path . 'index.js') ? 'YES' : 'NO') . "<br>";
echo "index.css exists: " . (file_exists($hero_banner_path . 'index.css') ? 'YES' : 'NO') . "<br>";

// Check block categories
echo "<h2>Block Categories</h2>";
$categories = get_block_categories(get_post());
echo "<ul>";
foreach ($categories as $category) {
    $highlight = (strpos($category['slug'], 'xgenious') !== false) ? ' style="background:yellow;"' : '';
    echo "<li$highlight><strong>{$category['slug']}</strong> - {$category['title']}</li>";
}
echo "</ul>";
