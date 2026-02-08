<?php
/**
 * Force Register Call to Action Block
 *
 * Add this to your wp-config.php or a mu-plugin to force registration:
 * require_once(WP_CONTENT_DIR . '/plugins/xgenious-ui-blocks/force-register-cta.php');
 */

add_action('init', function() {
    $block_path = WP_CONTENT_DIR . '/plugins/xgenious-ui-blocks/build/blocks/call-to-action';

    if (file_exists($block_path . '/block.json')) {
        register_block_type($block_path);

        // Log for debugging
        error_log('Force registered call-to-action block from: ' . $block_path);
    } else {
        error_log('ERROR: Call to Action block.json not found at: ' . $block_path);
    }
}, 5); // Priority 5 to run before the main plugin
