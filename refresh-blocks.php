<?php
/**
 * Refresh Blocks - Force WordPress to re-register all blocks
 *
 * Visit this file in your browser to refresh block registration:
 * http://localhost/wp-content/plugins/xgenious-ui-blocks/refresh-blocks.php
 */

// Load WordPress
require_once('../../../../../wp-load.php');

// Check if user is admin
if (!current_user_can('manage_options')) {
    die('Access denied. You must be an administrator.');
}

echo '<h1>Xgenious UI Blocks - Refresh Registration</h1>';

// Get current settings
$settings = get_option('xgenious_ui_blocks_settings', []);
echo '<h2>Current Settings:</h2>';
echo '<pre>';
print_r($settings);
echo '</pre>';

// Reset enabled_blocks to empty array (enable all blocks)
$settings['enabled_blocks'] = [];
update_option('xgenious_ui_blocks_settings', $settings);

echo '<h2>✅ Settings Updated - All blocks enabled</h2>';

// List all available blocks
$blocks_loader = \XgeniousUIBlocks\Core\Blocks_Loader::instance();
$all_blocks = $blocks_loader->get_blocks();

echo '<h2>Available Blocks (' . count($all_blocks) . '):</h2>';
echo '<ul style="list-style: none; padding: 0;">';
foreach ($all_blocks as $block_name => $block_config) {
    $block_path = XGENIOUS_UI_BLOCKS_PATH . 'build/blocks/' . $block_name;
    $exists = file_exists($block_path . '/block.json');
    $status = $exists ? '✅' : '❌';

    echo '<li style="padding: 8px; margin: 4px 0; background: ' . ($exists ? '#d4edda' : '#f8d7da') . '; border-radius: 4px;">';
    echo $status . ' <strong>' . $block_name . '</strong> - ' . $block_config['title'];
    if (!$exists) {
        echo ' <em style="color: red;">(build files missing)</em>';
    }
    echo '</li>';
}
echo '</ul>';

// Clear WordPress object cache
wp_cache_flush();
echo '<h2>✅ WordPress cache flushed</h2>';

echo '<hr>';
echo '<p style="background: #d1ecf1; padding: 15px; border-radius: 5px;"><strong>Next Steps:</strong></p>';
echo '<ol>';
echo '<li>Go to WordPress Admin → Plugins</li>';
echo '<li>Deactivate "Xgenious UI Blocks"</li>';
echo '<li>Activate "Xgenious UI Blocks" again</li>';
echo '<li>Refresh your page editor</li>';
echo '<li>Look for "Call to Action" block in the Xgenious UI category</li>';
echo '</ol>';

echo '<hr>';
echo '<p><a href="' . admin_url('plugins.php') . '" style="background: #0073aa; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px;">Go to Plugins Page</a></p>';
