<?php
/**
 * Plugin Name: Xgenious UI Blocks
 * Plugin URI: https://xgenious.com
 * Description: Modern Gutenberg blocks for Xgenious UI components with advanced styling and functionality
 * Version: 1.4.0
 * Author: Xgenious
 * Author URI: https://xgenious.com
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: xgenious-ui-blocks
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 7.4
 *
 * @package XgeniousUIBlocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants.
define('XGENIOUS_UI_BLOCKS_VERSION', '1.4.0');
define('XGENIOUS_UI_BLOCKS_FILE', __FILE__);
define('XGENIOUS_UI_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('XGENIOUS_UI_BLOCKS_URL', plugin_dir_url(__FILE__));
define('XGENIOUS_UI_BLOCKS_BASENAME', plugin_basename(__FILE__));

// Autoloader.
require_once XGENIOUS_UI_BLOCKS_PATH . 'includes/class-autoloader.php';

/**
 * Main plugin class.
 */
final class Xgenious_UI_Blocks {

    /**
     * Plugin instance.
     *
     * @var Xgenious_UI_Blocks
     */
    private static $instance = null;

    /**
     * Get plugin instance.
     *
     * @return Xgenious_UI_Blocks
     */
    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor.
     */
    private function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize hooks.
     */
    private function init_hooks() {
        add_action('plugins_loaded', [$this, 'load_textdomain']);
        add_action('init', [$this, 'init']);

        // Register activation/deactivation hooks
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);
    }

    /**
     * Initialize plugin.
     */
    public function init() {
        // Initialize core components
        \XgeniousUIBlocks\Core\Blocks_Loader::instance();
        \XgeniousUIBlocks\Core\Assets_Manager::instance();
        \XgeniousUIBlocks\Admin\Settings::instance();
        \XgeniousUIBlocks\API\Rest_API::instance();

        // Block categories
        add_filter('block_categories_all', [$this, 'register_block_categories'], 10, 2);
    }

    /**
     * Load plugin textdomain.
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            'xgenious-ui-blocks',
            false,
            dirname(XGENIOUS_UI_BLOCKS_BASENAME) . '/languages'
        );
    }

    /**
     * Register custom block categories.
     *
     * @param array $categories Block categories.
     * @param mixed $context Block editor context.
     * @return array Modified categories.
     */
    public function register_block_categories($categories, $context) {
        return array_merge(
            [
                [
                    'slug'  => 'xgenious-ui',
                    'title' => __('Xgenious UI', 'xgenious-ui-blocks'),
                    'icon'  => 'layout',
                ],
                [
                    'slug'  => 'xgenious-advanced',
                    'title' => __('Xgenious Advanced', 'xgenious-ui-blocks'),
                    'icon'  => 'admin-generic',
                ],
            ],
            $categories
        );
    }

    /**
     * Plugin activation.
     */
    public function activate() {
        // Set default options
        $default_options = [
            'version' => XGENIOUS_UI_BLOCKS_VERSION,
            'enabled_blocks' => [],
            'google_fonts' => true,
            'font_awesome' => true,
            'animation_library' => true,
        ];

        if (!get_option('xgenious_ui_blocks_settings')) {
            add_option('xgenious_ui_blocks_settings', $default_options);
        }

        // Flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Plugin deactivation.
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
}

/**
 * Initialize plugin.
 */
function xgenious_ui_blocks() {
    return Xgenious_UI_Blocks::instance();
}

// Kick off the plugin.
xgenious_ui_blocks();
