<?php
/**
 * Debug Call to Action Block Registration
 *
 * Visit: http://localhost/wp-content/plugins/xgenious-ui-blocks/debug-call-to-action.php
 */

// Load WordPress
require_once('../../../../../wp-load.php');

// Check if user is admin
if (!current_user_can('manage_options')) {
    die('Access denied. You must be an administrator.');
}

echo '<style>body{font-family:sans-serif;padding:20px;} .success{color:green;} .error{color:red;} .info{color:blue;} pre{background:#f5f5f5;padding:15px;border-radius:5px;}</style>';
echo '<h1>Call to Action Block - Debug Report</h1>';

// 1. Check if block is in the blocks array
echo '<h2>1. Block Definition Check</h2>';
$blocks_loader = \XgeniousUIBlocks\Core\Blocks_Loader::instance();
$all_blocks = $blocks_loader->get_blocks();

if (isset($all_blocks['call-to-action'])) {
    echo '<p class="success">✅ Block is defined in Blocks_Loader</p>';
    echo '<pre>';
    print_r($all_blocks['call-to-action']);
    echo '</pre>';
} else {
    echo '<p class="error">❌ Block NOT found in Blocks_Loader</p>';
    echo '<p>Available blocks: ' . implode(', ', array_keys($all_blocks)) . '</p>';
}

// 2. Check build files
echo '<h2>2. Build Files Check</h2>';
$block_path = XGENIOUS_UI_BLOCKS_PATH . 'build/blocks/call-to-action';

$required_files = [
    'block.json' => $block_path . '/block.json',
    'index.js' => $block_path . '/index.js',
    'index.css' => $block_path . '/index.css',
    'index.asset.php' => $block_path . '/index.asset.php',
];

foreach ($required_files as $name => $file) {
    if (file_exists($file)) {
        echo '<p class="success">✅ ' . $name . ' exists</p>';
        if ($name === 'block.json') {
            $json = json_decode(file_get_contents($file), true);
            echo '<pre>';
            print_r($json);
            echo '</pre>';
        }
    } else {
        echo '<p class="error">❌ ' . $name . ' MISSING</p>';
    }
}

// 3. Check plugin settings
echo '<h2>3. Plugin Settings Check</h2>';
$settings = get_option('xgenious_ui_blocks_settings', []);
echo '<pre>';
print_r($settings);
echo '</pre>';

if (empty($settings['enabled_blocks'])) {
    echo '<p class="success">✅ enabled_blocks is empty - all blocks should be enabled</p>';
} else {
    if (in_array('call-to-action', $settings['enabled_blocks'])) {
        echo '<p class="success">✅ call-to-action is in enabled_blocks list</p>';
    } else {
        echo '<p class="error">❌ call-to-action is NOT in enabled_blocks list</p>';
        echo '<p class="info">Fixing this now...</p>';
        $settings['enabled_blocks'][] = 'call-to-action';
        update_option('xgenious_ui_blocks_settings', $settings);
        echo '<p class="success">✅ Added call-to-action to enabled_blocks</p>';
    }
}

// 4. Check WordPress registered blocks
echo '<h2>4. WordPress Registered Blocks</h2>';
$registered_blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();

$xgenious_blocks = array_filter(array_keys($registered_blocks), function($block_name) {
    return strpos($block_name, 'xgenious-ui') === 0;
});

echo '<p>Found ' . count($xgenious_blocks) . ' Xgenious UI blocks:</p>';
echo '<ul>';
foreach ($xgenious_blocks as $block_name) {
    $is_cta = $block_name === 'xgenious-ui/call-to-action';
    $class = $is_cta ? 'success' : 'info';
    echo '<li class="' . $class . '">' . $block_name;
    if ($is_cta) {
        echo ' <strong>(THIS IS OUR BLOCK!)</strong>';
    }
    echo '</li>';
}
echo '</ul>';

if (in_array('xgenious-ui/call-to-action', $xgenious_blocks)) {
    echo '<p class="success">✅ Call to Action block IS registered in WordPress!</p>';

    // Show block details
    $cta_block = $registered_blocks['xgenious-ui/call-to-action'];
    echo '<h3>Block Details:</h3>';
    echo '<pre>';
    echo 'Title: ' . ($cta_block->title ?? 'N/A') . "\n";
    echo 'Category: ' . ($cta_block->category ?? 'N/A') . "\n";
    echo 'Editor Script: ' . ($cta_block->editor_script ?? 'N/A') . "\n";
    echo 'Style: ' . ($cta_block->style ?? 'N/A') . "\n";
    echo '</pre>';
} else {
    echo '<p class="error">❌ Call to Action block is NOT registered in WordPress</p>';
    echo '<p class="info">Attempting to register it now...</p>';

    try {
        register_block_type($block_path);
        echo '<p class="success">✅ Block registered successfully!</p>';
    } catch (Exception $e) {
        echo '<p class="error">❌ Error registering block: ' . $e->getMessage() . '</p>';
    }
}

// 5. Check JavaScript registration
echo '<h2>5. JavaScript Registration Check</h2>';
echo '<p>The block JavaScript is loaded via the editor.js bundle.</p>';
echo '<p>Check browser console for any JavaScript errors.</p>';

// 6. Force cache clear
echo '<h2>6. Clear Cache</h2>';
wp_cache_flush();
echo '<p class="success">✅ WordPress cache cleared</p>';

// Final instructions
echo '<hr>';
echo '<h2>Next Steps:</h2>';
echo '<ol>';
echo '<li>Go to <a href="' . admin_url('plugins.php') . '">Plugins</a> and deactivate/reactivate the plugin</li>';
echo '<li>Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)</li>';
echo '<li>Go to edit a page</li>';
echo '<li>Search for "call to action" in the block inserter</li>';
echo '<li>Check browser console (F12) for any JavaScript errors</li>';
echo '</ol>';

echo '<p><a href="' . admin_url('plugins.php') . '" style="background:#0073aa;color:white;padding:10px 20px;text-decoration:none;border-radius:3px;display:inline-block;margin-top:20px;">Go to Plugins Page</a></p>';
