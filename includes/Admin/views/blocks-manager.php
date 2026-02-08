<?php
/**
 * Blocks manager page template.
 *
 * @package XgeniousUIBlocks\Admin
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap xgenious-ui-blocks-manager">
    <h1><?php esc_html_e('Blocks Manager', 'xgenious-ui-blocks'); ?></h1>
    <p class="description">
        <?php esc_html_e('Enable or disable individual blocks. Disabling unused blocks can improve editor performance.', 'xgenious-ui-blocks'); ?>
    </p>

    <div class="blocks-grid">
        <?php foreach ($all_blocks as $block_name => $block_config) : ?>
            <?php
            $is_enabled = empty($enabled_blocks) || in_array($block_name, $enabled_blocks);
            $block_class = $is_enabled ? 'block-card enabled' : 'block-card disabled';
            ?>
            <div class="<?php echo esc_attr($block_class); ?>" data-block="<?php echo esc_attr($block_name); ?>">
                <div class="block-header">
                    <span class="dashicons dashicons-<?php echo esc_attr($block_config['icon']); ?>"></span>
                    <h3><?php echo esc_html($block_config['title']); ?></h3>
                </div>
                <div class="block-body">
                    <p><?php echo esc_html($block_config['description']); ?></p>
                    <div class="block-meta">
                        <span class="category">
                            <?php
                            $category_label = $block_config['category'] === 'xgenious-ui'
                                ? __('UI', 'xgenious-ui-blocks')
                                : __('Advanced', 'xgenious-ui-blocks');
                            echo esc_html($category_label);
                            ?>
                        </span>
                        <div class="block-keywords">
                            <?php foreach ($block_config['keywords'] as $keyword) : ?>
                                <span class="keyword"><?php echo esc_html($keyword); ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
                <div class="block-footer">
                    <label class="switch">
                        <input
                            type="checkbox"
                            class="block-toggle"
                            data-block="<?php echo esc_attr($block_name); ?>"
                            <?php checked($is_enabled, true); ?>
                        >
                        <span class="slider"></span>
                    </label>
                    <span class="status-text">
                        <?php echo $is_enabled ? esc_html__('Enabled', 'xgenious-ui-blocks') : esc_html__('Disabled', 'xgenious-ui-blocks'); ?>
                    </span>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <div class="blocks-actions">
        <button type="button" class="button button-primary" id="save-blocks">
            <?php esc_html_e('Save Changes', 'xgenious-ui-blocks'); ?>
        </button>
        <button type="button" class="button button-secondary" id="enable-all-blocks">
            <?php esc_html_e('Enable All', 'xgenious-ui-blocks'); ?>
        </button>
        <button type="button" class="button button-secondary" id="disable-all-blocks">
            <?php esc_html_e('Disable All', 'xgenious-ui-blocks'); ?>
        </button>
        <span class="spinner"></span>
    </div>
</div>
