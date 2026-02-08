<?php
/**
 * Admin settings.
 *
 * @package XgeniousUIBlocks\Admin
 */

namespace XgeniousUIBlocks\Admin;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Settings class.
 */
class Settings {

    /**
     * Instance.
     *
     * @var Settings
     */
    private static $instance = null;

    /**
     * Get instance.
     *
     * @return Settings
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
        add_action('admin_menu', [$this, 'add_menu_page']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
        add_action('wp_ajax_xgenious_ui_blocks_save_settings', [$this, 'save_settings']);
    }

    /**
     * Add menu page.
     */
    public function add_menu_page() {
        add_menu_page(
            __('Xgenious UI Blocks', 'xgenious-ui-blocks'),
            __('UI Blocks', 'xgenious-ui-blocks'),
            'manage_options',
            'xgenious-ui-blocks',
            [$this, 'render_settings_page'],
            'dashicons-layout',
            30
        );

        add_submenu_page(
            'xgenious-ui-blocks',
            __('Settings', 'xgenious-ui-blocks'),
            __('Settings', 'xgenious-ui-blocks'),
            'manage_options',
            'xgenious-ui-blocks',
            [$this, 'render_settings_page']
        );

        add_submenu_page(
            'xgenious-ui-blocks',
            __('Blocks Manager', 'xgenious-ui-blocks'),
            __('Blocks Manager', 'xgenious-ui-blocks'),
            'manage_options',
            'xgenious-ui-blocks-manager',
            [$this, 'render_blocks_manager']
        );
    }

    /**
     * Enqueue admin assets.
     *
     * @param string $hook Current admin page hook.
     */
    public function enqueue_admin_assets($hook) {
        if (strpos($hook, 'xgenious-ui-blocks') === false) {
            return;
        }

        wp_enqueue_style(
            'xgenious-ui-blocks-admin',
            XGENIOUS_UI_BLOCKS_URL . 'assets/css/admin.css',
            [],
            XGENIOUS_UI_BLOCKS_VERSION
        );

        wp_enqueue_script(
            'xgenious-ui-blocks-admin',
            XGENIOUS_UI_BLOCKS_URL . 'assets/js/admin.js',
            ['jquery', 'wp-element', 'wp-components'],
            XGENIOUS_UI_BLOCKS_VERSION,
            true
        );

        wp_localize_script(
            'xgenious-ui-blocks-admin',
            'xgeniousUIBlocksAdmin',
            [
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('xgenious_ui_blocks_admin_nonce'),
                'settings' => get_option('xgenious_ui_blocks_settings', []),
            ]
        );
    }

    /**
     * Render settings page.
     */
    public function render_settings_page() {
        $settings = get_option('xgenious_ui_blocks_settings', []);
        include XGENIOUS_UI_BLOCKS_PATH . 'includes/Admin/views/settings.php';
    }

    /**
     * Render blocks manager page.
     */
    public function render_blocks_manager() {
        $blocks_loader = \XgeniousUIBlocks\Core\Blocks_Loader::instance();
        $all_blocks = $blocks_loader->get_blocks();
        $settings = get_option('xgenious_ui_blocks_settings', []);
        $enabled_blocks = $settings['enabled_blocks'] ?? [];

        include XGENIOUS_UI_BLOCKS_PATH . 'includes/Admin/views/blocks-manager.php';
    }

    /**
     * Save settings via AJAX.
     */
    public function save_settings() {
        check_ajax_referer('xgenious_ui_blocks_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => __('Permission denied', 'xgenious-ui-blocks')]);
        }

        $settings = [
            'google_fonts' => isset($_POST['google_fonts']) ? (bool) $_POST['google_fonts'] : false,
            'font_awesome' => isset($_POST['font_awesome']) ? (bool) $_POST['font_awesome'] : false,
            'animation_library' => isset($_POST['animation_library']) ? (bool) $_POST['animation_library'] : false,
            'enabled_blocks' => isset($_POST['enabled_blocks']) ? (array) $_POST['enabled_blocks'] : [],
        ];

        update_option('xgenious_ui_blocks_settings', $settings);

        wp_send_json_success([
            'message' => __('Settings saved successfully', 'xgenious-ui-blocks'),
            'settings' => $settings,
        ]);
    }
}
