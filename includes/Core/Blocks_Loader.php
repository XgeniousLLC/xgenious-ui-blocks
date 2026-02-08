<?php
/**
 * Blocks loader.
 *
 * @package XgeniousUIBlocks\Core
 */

namespace XgeniousUIBlocks\Core;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Blocks loader class.
 */
class Blocks_Loader {

    /**
     * Instance.
     *
     * @var Blocks_Loader
     */
    private static $instance = null;

    /**
     * Available blocks.
     *
     * @var array
     */
    private $blocks = [];

    /**
     * Get instance.
     *
     * @return Blocks_Loader
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
        $this->register_blocks();
        add_action('init', [$this, 'register_block_types']);
    }

    /**
     * Register available blocks.
     */
    private function register_blocks() {
        $this->blocks = [
            'hero-section' => [
                'title' => __('Hero Section', 'xgenious-ui-blocks'),
                'description' => __('Full-width hero section with background image/video', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'cover-image',
                'keywords' => ['hero', 'banner', 'header'],
            ],
            'hero-banner' => [
                'title' => __('Hero Banner', 'xgenious-ui-blocks'),
                'description' => __('Modern hero banner with badge, heading, description and CTA buttons', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'megaphone',
                'keywords' => ['hero', 'banner', 'cta', 'header'],
            ],
            'hero-banner-gradient' => [
                'title' => __('Hero Banner Gradient', 'xgenious-ui-blocks'),
                'description' => __('Hero banner with background image support, perfect for gradient backgrounds', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'cover-image',
                'keywords' => ['hero', 'banner', 'gradient', 'background'],
            ],
            'breadcrumb-header' => [
                'title' => __('Breadcrumb Header', 'xgenious-ui-blocks'),
                'description' => __('Header section with title, description and image', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'layout',
                'keywords' => ['breadcrumb', 'header', 'banner', 'page header'],
            ],
            'image-content-box' => [
                'title' => __('Image and Content Box', 'xgenious-ui-blocks'),
                'description' => __('Image with content section including heading, description and button', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'align-pull-left',
                'keywords' => ['image', 'content', 'box', 'cta', 'call to action', 'banner'],
            ],
            'logo-showcase' => [
                'title' => __('Logo Showcase', 'xgenious-ui-blocks'),
                'description' => __('Display company logos to showcase clients, partners, or trusted brands', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'awards',
                'keywords' => ['logo', 'clients', 'partners', 'brands', 'trusted'],
            ],
            'logo-carousel' => [
                'title' => __('Logo Carousel', 'xgenious-ui-blocks'),
                'description' => __('Logo carousel with fade effects on edges, perfect for showcasing partners', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'images-alt2',
                'keywords' => ['logo', 'carousel', 'slider', 'partners', 'clients'],
            ],
            'logo-grid' => [
                'title' => __('Logo Grid', 'xgenious-ui-blocks'),
                'description' => __('Display partner logos in a grid with dividers', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'grid-view',
                'keywords' => ['logo', 'grid', 'partners', 'clients', 'brands', 'dividers'],
            ],
            'service-grid' => [
                'title' => __('Service Grid', 'xgenious-ui-blocks'),
                'description' => __('Display services or features in a grid with checkmarks, descriptions, and images', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'grid-view',
                'keywords' => ['service', 'feature', 'grid', 'showcase', 'product'],
            ],
            'counter-section' => [
                'title' => __('Counter Section', 'xgenious-ui-blocks'),
                'description' => __('Display statistics with counters, labels, and an optional image', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'chart-bar',
                'keywords' => ['counter', 'stats', 'statistics', 'numbers', 'achievements'],
            ],
            'portfolio-grid' => [
                'title' => __('Portfolio Grid', 'xgenious-ui-blocks'),
                'description' => __('Display portfolio projects in a grid with dark theme, images, and project details', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'portfolio',
                'keywords' => ['portfolio', 'projects', 'grid', 'showcase', 'work'],
            ],
            'photo-gallery' => [
                'title' => __('Photo Gallery', 'xgenious-ui-blocks'),
                'description' => __('Photo gallery with heading, description and grid layout', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'format-gallery',
                'keywords' => ['photo', 'gallery', 'images', 'grid', 'portfolio'],
            ],
            'our-impact-stats' => [
                'title' => __('Our Impact Stats', 'xgenious-ui-blocks'),
                'description' => __('Display impact statistics with numbers and labels in a grid layout', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'chart-bar',
                'keywords' => ['stats', 'statistics', 'impact', 'numbers', 'counter', 'achievements'],
            ],
            'our-achievements' => [
                'title' => __('Our Achievements', 'xgenious-ui-blocks'),
                'description' => __('Display achievements with icons and labels in a grid layout', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'awards',
                'keywords' => ['achievements', 'awards', 'badges', 'icons', 'accomplishments'],
            ],
            'workflow-steps' => [
                'title' => __('Workflow Steps', 'xgenious-ui-blocks'),
                'description' => __('Display workflow or process steps with features in a grid layout', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'list-view',
                'keywords' => ['workflow', 'process', 'steps', 'features', 'how it works'],
            ],
            'info-boxes' => [
                'title' => __('Info Boxes', 'xgenious-ui-blocks'),
                'description' => __('Display information boxes with icons, titles, and descriptions in a two-column layout', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'info',
                'keywords' => ['info', 'boxes', 'features', 'services', 'icon boxes'],
            ],
            'tech-stack' => [
                'title' => __('Tech Stack', 'xgenious-ui-blocks'),
                'description' => __('Display your technology stack with icons and labels in a grid layout', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'admin-settings',
                'keywords' => ['tech', 'stack', 'technology', 'tools', 'framework', 'grid'],
            ],
            'testimonial-slider' => [
                'title' => __('Testimonial Slider', 'xgenious-ui-blocks'),
                'description' => __('Display testimonials in a slider with optional video support', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'format-quote',
                'keywords' => ['testimonial', 'slider', 'carousel', 'review', 'feedback', 'video'],
            ],
            'feature-box' => [
                'title' => __('Feature Box', 'xgenious-ui-blocks'),
                'description' => __('Showcase features with icon, title and description', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'star-filled',
                'keywords' => ['feature', 'service', 'icon box'],
            ],
            'testimonial' => [
                'title' => __('Testimonial', 'xgenious-ui-blocks'),
                'description' => __('Display customer testimonials with ratings', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'format-quote',
                'keywords' => ['testimonial', 'review', 'quote'],
            ],
            'pricing-table' => [
                'title' => __('Pricing Table', 'xgenious-ui-blocks'),
                'description' => __('Beautiful pricing tables with features list', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'money-alt',
                'keywords' => ['pricing', 'plan', 'price'],
            ],
            'team-member' => [
                'title' => __('Team Member', 'xgenious-ui-blocks'),
                'description' => __('Display team members with social links', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'groups',
                'keywords' => ['team', 'member', 'staff'],
            ],
            'counter' => [
                'title' => __('Counter', 'xgenious-ui-blocks'),
                'description' => __('Animated counter with prefix/suffix', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'performance',
                'keywords' => ['counter', 'stats', 'number'],
            ],
            'call-to-action' => [
                'title' => __('Call to Action', 'xgenious-ui-blocks'),
                'description' => __('Eye-catching CTA section with buttons', 'xgenious-ui-blocks'),
                'category' => 'xgenious-ui',
                'icon' => 'megaphone',
                'keywords' => ['cta', 'action', 'button'],
            ],
            'accordion' => [
                'title' => __('Accordion', 'xgenious-ui-blocks'),
                'description' => __('Collapsible accordion/FAQ section', 'xgenious-ui-blocks'),
                'category' => 'xgenious-advanced',
                'icon' => 'list-view',
                'keywords' => ['accordion', 'faq', 'collapse'],
            ],
            'tabs' => [
                'title' => __('Tabs', 'xgenious-ui-blocks'),
                'description' => __('Tabbed content with multiple styles', 'xgenious-ui-blocks'),
                'category' => 'xgenious-advanced',
                'icon' => 'table-row-before',
                'keywords' => ['tabs', 'tabbed', 'content'],
            ],
            'progress-bar' => [
                'title' => __('Progress Bar', 'xgenious-ui-blocks'),
                'description' => __('Animated progress bars with labels', 'xgenious-ui-blocks'),
                'category' => 'xgenious-advanced',
                'icon' => 'minus',
                'keywords' => ['progress', 'bar', 'skill'],
            ],
        ];

        // Allow filtering of blocks
        $this->blocks = apply_filters('xgenious_ui_blocks_available_blocks', $this->blocks);
    }

    /**
     * Register block types.
     */
    public function register_block_types() {
        $settings = get_option('xgenious_ui_blocks_settings', []);
        $enabled_blocks = $settings['enabled_blocks'] ?? [];

        foreach ($this->blocks as $block_name => $block_config) {
            // Skip if block is disabled
            if (!empty($enabled_blocks) && !in_array($block_name, $enabled_blocks)) {
                continue;
            }

            $block_path = XGENIOUS_UI_BLOCKS_PATH . 'build/blocks/' . $block_name;

            // Register block if build file exists
            if (file_exists($block_path . '/block.json')) {
                register_block_type($block_path);
            }
        }
    }

    /**
     * Get all blocks.
     *
     * @return array
     */
    public function get_blocks() {
        return $this->blocks;
    }

    /**
     * Get block by name.
     *
     * @param string $name Block name.
     * @return array|null
     */
    public function get_block($name) {
        return $this->blocks[$name] ?? null;
    }
}
