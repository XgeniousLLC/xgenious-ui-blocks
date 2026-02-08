<?php
/**
 * Settings page template.
 *
 * @package XgeniousUIBlocks\Admin
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap xgenious-ui-blocks-settings">
    <h1><?php esc_html_e('Xgenious UI Blocks Settings', 'xgenious-ui-blocks'); ?></h1>

    <div class="xgenious-ui-blocks-container">
        <div class="xgenious-ui-blocks-main-content">
            <form method="post" id="xgenious-ui-blocks-settings-form">
                <?php wp_nonce_field('xgenious_ui_blocks_settings', 'xgenious_ui_blocks_nonce'); ?>

                <div class="settings-section">
                    <h2><?php esc_html_e('General Settings', 'xgenious-ui-blocks'); ?></h2>

                    <table class="form-table">
                        <tr>
                            <th scope="row">
                                <label for="google_fonts">
                                    <?php esc_html_e('Google Fonts', 'xgenious-ui-blocks'); ?>
                                </label>
                            </th>
                            <td>
                                <label class="switch">
                                    <input
                                        type="checkbox"
                                        name="google_fonts"
                                        id="google_fonts"
                                        value="1"
                                        <?php checked($settings['google_fonts'] ?? true, true); ?>
                                    >
                                    <span class="slider"></span>
                                </label>
                                <p class="description">
                                    <?php esc_html_e('Load Google Fonts (Inter & Poppins) for blocks', 'xgenious-ui-blocks'); ?>
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label for="font_awesome">
                                    <?php esc_html_e('Font Awesome', 'xgenious-ui-blocks'); ?>
                                </label>
                            </th>
                            <td>
                                <label class="switch">
                                    <input
                                        type="checkbox"
                                        name="font_awesome"
                                        id="font_awesome"
                                        value="1"
                                        <?php checked($settings['font_awesome'] ?? true, true); ?>
                                    >
                                    <span class="slider"></span>
                                </label>
                                <p class="description">
                                    <?php esc_html_e('Load Font Awesome icons library', 'xgenious-ui-blocks'); ?>
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label for="animation_library">
                                    <?php esc_html_e('Animation Library', 'xgenious-ui-blocks'); ?>
                                </label>
                            </th>
                            <td>
                                <label class="switch">
                                    <input
                                        type="checkbox"
                                        name="animation_library"
                                        id="animation_library"
                                        value="1"
                                        <?php checked($settings['animation_library'] ?? true, true); ?>
                                    >
                                    <span class="slider"></span>
                                </label>
                                <p class="description">
                                    <?php esc_html_e('Load Animate.css for block animations', 'xgenious-ui-blocks'); ?>
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="settings-section">
                    <h2><?php esc_html_e('Performance', 'xgenious-ui-blocks'); ?></h2>
                    <p class="description">
                        <?php esc_html_e('Disable unused libraries to improve site performance', 'xgenious-ui-blocks'); ?>
                    </p>
                </div>

                <p class="submit">
                    <button type="submit" class="button button-primary" id="save-settings">
                        <?php esc_html_e('Save Settings', 'xgenious-ui-blocks'); ?>
                    </button>
                    <span class="spinner"></span>
                </p>
            </form>
        </div>

        <div class="xgenious-ui-blocks-sidebar">
            <div class="sidebar-box">
                <h3><?php esc_html_e('Plugin Info', 'xgenious-ui-blocks'); ?></h3>
                <p>
                    <strong><?php esc_html_e('Version:', 'xgenious-ui-blocks'); ?></strong>
                    <?php echo esc_html(XGENIOUS_UI_BLOCKS_VERSION); ?>
                </p>
                <p>
                    <strong><?php esc_html_e('Total Blocks:', 'xgenious-ui-blocks'); ?></strong>
                    <?php
                    $blocks_loader = \XgeniousUIBlocks\Core\Blocks_Loader::instance();
                    echo count($blocks_loader->get_blocks());
                    ?>
                </p>
            </div>

            <div class="sidebar-box">
                <h3><?php esc_html_e('Documentation', 'xgenious-ui-blocks'); ?></h3>
                <p><?php esc_html_e('Learn how to use Xgenious UI Blocks effectively', 'xgenious-ui-blocks'); ?></p>
                <a href="#" class="button button-secondary" target="_blank">
                    <?php esc_html_e('View Docs', 'xgenious-ui-blocks'); ?>
                </a>
            </div>

            <div class="sidebar-box">
                <h3><?php esc_html_e('Support', 'xgenious-ui-blocks'); ?></h3>
                <p><?php esc_html_e('Need help? Contact our support team', 'xgenious-ui-blocks'); ?></p>
                <a href="#" class="button button-secondary" target="_blank">
                    <?php esc_html_e('Get Support', 'xgenious-ui-blocks'); ?>
                </a>
            </div>
        </div>
    </div>
</div>
