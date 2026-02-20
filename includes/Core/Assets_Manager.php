<?php
/**
 * Assets manager.
 *
 * @package XgeniousUIBlocks\Core
 */

namespace XgeniousUIBlocks\Core;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Assets manager class.
 */
class Assets_Manager {

    /**
     * Instance.
     *
     * @var Assets_Manager
     */
    private static $instance = null;

    /**
     * Get instance.
     *
     * @return Assets_Manager
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
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
        add_filter('upload_mimes', [$this, 'allow_svg_uploads']);
        add_filter('wp_check_filetype_and_ext', [$this, 'fix_svg_mime_type'], 10, 5);
    }

    /**
     * Allow SVG uploads.
     */
    public function allow_svg_uploads($mimes) {
        $mimes['svg'] = 'image/svg+xml';
        $mimes['svgz'] = 'image/svg+xml';
        return $mimes;
    }

    /**
     * Fix SVG mime type detection.
     */
    public function fix_svg_mime_type($data, $file, $filename, $mimes, $real_mime = '') {
        if (!empty($data['ext']) && !empty($data['type'])) {
            return $data;
        }

        $filetype = wp_check_filetype($filename, $mimes);

        if ($filetype['ext'] === 'svg') {
            $data['ext'] = 'svg';
            $data['type'] = 'image/svg+xml';
        }

        return $data;
    }

    /**
     * Enqueue editor assets.
     */
    public function enqueue_editor_assets() {
        $settings = get_option('xgenious_ui_blocks_settings', []);

        // Editor JavaScript
        $asset_file = XGENIOUS_UI_BLOCKS_PATH . 'build/editor.asset.php';
        $asset_data = file_exists($asset_file) ? include $asset_file : ['dependencies' => [], 'version' => XGENIOUS_UI_BLOCKS_VERSION];

        wp_enqueue_script(
            'xgenious-ui-blocks-editor-script',
            XGENIOUS_UI_BLOCKS_URL . 'build/editor.js',
            $asset_data['dependencies'],
            $asset_data['version'],
            true
        );

        // Editor styles
        wp_enqueue_style(
            'xgenious-ui-blocks-editor',
            XGENIOUS_UI_BLOCKS_URL . 'build/editor.css',
            ['wp-edit-blocks'],
            XGENIOUS_UI_BLOCKS_VERSION
        );

        // Google Fonts
        if ($settings['google_fonts'] ?? true) {
            wp_enqueue_style(
                'xgenious-ui-blocks-fonts',
                'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap',
                [],
                null
            );
        }

        // Font Awesome
        if ($settings['font_awesome'] ?? true) {
            wp_enqueue_style(
                'font-awesome',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
                [],
                '6.4.0'
            );
        }

        // Inject plugin asset URLs as CSS custom properties
        $portfolio_default_bg = XGENIOUS_UI_BLOCKS_URL . 'assets/images/portfolio-default-bg.png';
        wp_add_inline_style(
            'xgenious-ui-blocks-editor',
            ':root { --xg-portfolio-default-bg: url(' . esc_url($portfolio_default_bg) . '); }'
        );

        // Localize script data
        wp_localize_script(
            'xgenious-ui-blocks-editor-script',
            'xgeniousUIBlocks',
            [
                'pluginUrl' => XGENIOUS_UI_BLOCKS_URL,
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('xgenious_ui_blocks_nonce'),
                'settings' => $settings,
            ]
        );
    }

    /**
     * Enqueue frontend assets.
     */
    public function enqueue_frontend_assets() {
        $settings = get_option('xgenious_ui_blocks_settings', []);

        // Frontend styles
        wp_enqueue_style(
            'xgenious-ui-blocks-frontend',
            XGENIOUS_UI_BLOCKS_URL . 'build/style-editor.css',
            [],
            XGENIOUS_UI_BLOCKS_VERSION
        );

        // Inject plugin asset URLs as CSS custom properties
        $portfolio_default_bg = XGENIOUS_UI_BLOCKS_URL . 'assets/images/portfolio-default-bg.png';
        wp_add_inline_style(
            'xgenious-ui-blocks-frontend',
            ':root { --xg-portfolio-default-bg: url(' . esc_url($portfolio_default_bg) . '); }'
        );

        // Frontend scripts
        wp_enqueue_script(
            'xgenious-ui-blocks-frontend',
            XGENIOUS_UI_BLOCKS_URL . 'build/frontend.js',
            ['jquery'],
            XGENIOUS_UI_BLOCKS_VERSION,
            true
        );

        // Google Fonts
        if ($settings['google_fonts'] ?? true) {
            wp_enqueue_style(
                'xgenious-ui-blocks-fonts',
                'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap',
                [],
                null
            );
        }

        // Font Awesome
        if ($settings['font_awesome'] ?? true) {
            wp_enqueue_style(
                'font-awesome',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
                [],
                '6.4.0'
            );
        }

        // Slick Slider
        wp_enqueue_style(
            'slick-slider',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
            [],
            '1.8.1'
        );

        wp_enqueue_style(
            'slick-slider-theme',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
            ['slick-slider'],
            '1.8.1'
        );

        wp_enqueue_script(
            'slick-slider',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
            ['jquery'],
            '1.8.1',
            true
        );

        // Animation library
        if ($settings['animation_library'] ?? true) {
            wp_enqueue_style(
                'animate-css',
                'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
                [],
                '4.1.1'
            );
        }

        // Localize frontend data
        wp_localize_script(
            'xgenious-ui-blocks-frontend',
            'xgeniousUIBlocks',
            [
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('xgenious_ui_blocks_nonce'),
            ]
        );
    }
}
