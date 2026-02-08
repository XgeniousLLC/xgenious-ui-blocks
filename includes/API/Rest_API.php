<?php
/**
 * REST API endpoints.
 *
 * @package XgeniousUIBlocks\API
 */

namespace XgeniousUIBlocks\API;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * REST API class.
 */
class Rest_API {

    /**
     * Instance.
     *
     * @var Rest_API
     */
    private static $instance = null;

    /**
     * Namespace.
     *
     * @var string
     */
    private $namespace = 'xgenious-ui-blocks/v1';

    /**
     * Get instance.
     *
     * @return Rest_API
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
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    /**
     * Register REST API routes.
     */
    public function register_routes() {
        // Get blocks
        register_rest_route($this->namespace, '/blocks', [
            'methods' => 'GET',
            'callback' => [$this, 'get_blocks'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Get settings
        register_rest_route($this->namespace, '/settings', [
            'methods' => 'GET',
            'callback' => [$this, 'get_settings'],
            'permission_callback' => [$this, 'check_permission'],
        ]);

        // Update settings
        register_rest_route($this->namespace, '/settings', [
            'methods' => 'POST',
            'callback' => [$this, 'update_settings'],
            'permission_callback' => [$this, 'check_admin_permission'],
        ]);
    }

    /**
     * Get all blocks.
     *
     * @param \WP_REST_Request $request Request object.
     * @return \WP_REST_Response
     */
    public function get_blocks($request) {
        $blocks_loader = \XgeniousUIBlocks\Core\Blocks_Loader::instance();
        $blocks = $blocks_loader->get_blocks();

        return rest_ensure_response([
            'success' => true,
            'data' => $blocks,
        ]);
    }

    /**
     * Get settings.
     *
     * @param \WP_REST_Request $request Request object.
     * @return \WP_REST_Response
     */
    public function get_settings($request) {
        $settings = get_option('xgenious_ui_blocks_settings', []);

        return rest_ensure_response([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Update settings.
     *
     * @param \WP_REST_Request $request Request object.
     * @return \WP_REST_Response
     */
    public function update_settings($request) {
        $params = $request->get_json_params();

        $settings = [
            'google_fonts' => isset($params['google_fonts']) ? (bool) $params['google_fonts'] : false,
            'font_awesome' => isset($params['font_awesome']) ? (bool) $params['font_awesome'] : false,
            'animation_library' => isset($params['animation_library']) ? (bool) $params['animation_library'] : false,
            'enabled_blocks' => isset($params['enabled_blocks']) ? (array) $params['enabled_blocks'] : [],
        ];

        update_option('xgenious_ui_blocks_settings', $settings);

        return rest_ensure_response([
            'success' => true,
            'message' => __('Settings updated successfully', 'xgenious-ui-blocks'),
            'data' => $settings,
        ]);
    }

    /**
     * Check permission callback.
     *
     * @return bool
     */
    public function check_permission() {
        return current_user_can('edit_posts');
    }

    /**
     * Check admin permission callback.
     *
     * @return bool
     */
    public function check_admin_permission() {
        return current_user_can('manage_options');
    }
}
