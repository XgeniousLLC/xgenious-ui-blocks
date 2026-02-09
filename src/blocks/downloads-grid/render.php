<?php
/**
 * Downloads Grid Block - Server-side rendering
 * Compatible with Easy Digital Downloads
 *
 * @package XgeniousUIBlocks
 *
 * @var array $attributes Block attributes
 * @var string $content Block content
 * @var WP_Block $block Block instance
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
	exit;
}

// Get block attributes with defaults
$posts_per_page = isset($attributes['postsPerPage']) ? intval($attributes['postsPerPage']) : 6;
$columns = isset($attributes['columns']) ? intval($attributes['columns']) : 2;
$show_filters = isset($attributes['showFilters']) ? $attributes['showFilters'] : true;
$show_pagination = isset($attributes['showPagination']) ? $attributes['showPagination'] : true;
$filter_bg_color = isset($attributes['filterBgColor']) ? $attributes['filterBgColor'] : '#ea7c69';
$filter_text_color = isset($attributes['filterTextColor']) ? $attributes['filterTextColor'] : '#ffffff';
$card_bg_color = isset($attributes['cardBgColor']) ? $attributes['cardBgColor'] : '#ffffff';
$title_color = isset($attributes['titleColor']) ? $attributes['titleColor'] : '#000000';
$pagination_active_color = isset($attributes['paginationActiveColor']) ? $attributes['paginationActiveColor'] : '#000000';
$pagination_color = isset($attributes['paginationColor']) ? $attributes['paginationColor'] : '#999999';
$show_price = isset($attributes['showPrice']) ? $attributes['showPrice'] : true;
$show_purchase_button = isset($attributes['showPurchaseButton']) ? $attributes['showPurchaseButton'] : false;
$price_color = isset($attributes['priceColor']) ? $attributes['priceColor'] : '#ea7c69';

// Check if Easy Digital Downloads is active
$edd_active = function_exists('edd_get_download_price');

// Check if download post type exists
if (!post_type_exists('download')) {
	?>
	<div class="xg-downloads-grid">
		<div class="downloads-empty" style="padding: 60px 20px; text-align: center; background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px;">
			<p style="margin: 0; color: #856404; font-size: 16px;">
				<strong>⚠️ Easy Digital Downloads Required</strong><br>
				The "download" post type is not registered. Please install and activate Easy Digital Downloads plugin.
			</p>
		</div>
	</div>
	<?php
	return;
}

// Get current page for pagination
$paged = 1;
if (get_query_var('paged')) {
	$paged = get_query_var('paged');
}

// Get category filter from URL if exists
$category_filter = '';
if (isset($_GET['download_category']) && !empty($_GET['download_category'])) {
	$category_filter = sanitize_text_field($_GET['download_category']);
}

// Build query arguments
$args = array(
	'post_type' => 'download',
	'posts_per_page' => $posts_per_page,
	'paged' => $paged,
	'post_status' => 'publish',
	'orderby' => 'date',
	'order' => 'DESC'
);

// Add category filter if set
if (!empty($category_filter) && taxonomy_exists('download_category')) {
	$args['tax_query'] = array(
		array(
			'taxonomy' => 'download_category',
			'field' => 'slug',
			'terms' => $category_filter
		)
	);
}

// Query downloads
$downloads_query = new WP_Query($args);

// Get all download categories for filters
$categories = array();
if (taxonomy_exists('download_category')) {
	$categories = get_terms(array(
		'taxonomy' => 'download_category',
		'hide_empty' => true
	));

	if (is_wp_error($categories)) {
		$categories = array();
	}
}

// Generate unique block ID
$block_id = 'downloads-grid-' . wp_rand(1000, 9999);

// Get current URL for filter links
$current_url = home_url('/');
if (isset($_SERVER['REQUEST_URI']) && !empty($_SERVER['REQUEST_URI'])) {
	$current_url = home_url($_SERVER['REQUEST_URI']);
}
$current_url = remove_query_arg('download_category', $current_url);
$current_url = remove_query_arg('paged', $current_url);

?>

<div id="<?php echo esc_attr($block_id); ?>" class="xg-downloads-grid">

	<?php if ($show_filters && !empty($categories) && !is_wp_error($categories)) : ?>
		<div class="downloads-filters">
			<button
				class="filter-button <?php echo empty($category_filter) ? 'active' : ''; ?>"
				data-category=""
				onclick="location.href='<?php echo esc_url($current_url); ?>'"
				style="<?php echo empty($category_filter) ? 'background-color: ' . esc_attr($filter_bg_color) . '; color: ' . esc_attr($filter_text_color) . ';' : ''; ?>"
			>
				All Product
			</button>
			<?php foreach ($categories as $category) : ?>
				<button
					class="filter-button <?php echo ($category_filter === $category->slug) ? 'active' : ''; ?>"
					data-category="<?php echo esc_attr($category->slug); ?>"
					onclick="location.href='<?php echo esc_url(add_query_arg('download_category', $category->slug, $current_url)); ?>'"
					style="<?php echo ($category_filter === $category->slug) ? 'background-color: ' . esc_attr($filter_bg_color) . '; color: ' . esc_attr($filter_text_color) . ';' : ''; ?>"
				>
					<?php echo esc_html($category->name); ?>
				</button>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>

	<?php if ($downloads_query->have_posts()) : ?>
		<div class="downloads-grid columns-<?php echo esc_attr($columns); ?>">
			<?php while ($downloads_query->have_posts()) : $downloads_query->the_post(); ?>
				<div class="download-card" style="background-color: <?php echo esc_attr($card_bg_color); ?>;">
					<a href="<?php the_permalink(); ?>" class="download-card-link">
						<?php if (has_post_thumbnail()) : ?>
							<div class="download-card-image">
								<?php the_post_thumbnail('large'); ?>
							</div>
						<?php else : ?>
							<div class="download-card-image placeholder">
								<span class="dashicons dashicons-download"></span>
							</div>
						<?php endif; ?>

						<div class="download-card-content">
							<h3 class="download-card-title" style="color: <?php echo esc_attr($title_color); ?>;">
								<?php the_title(); ?>
							</h3>

							<?php if ($edd_active && $show_price) : ?>
								<div class="download-card-price" style="color: <?php echo esc_attr($price_color); ?>;">
									<?php
									if (edd_has_variable_prices(get_the_ID())) {
										echo esc_html__('From: ', 'xgenious-ui-blocks') . edd_price(get_the_ID(), false);
									} else {
										echo edd_price(get_the_ID(), false);
									}
									?>
								</div>
							<?php endif; ?>
						</div>
					</a>

					<?php if ($edd_active && $show_purchase_button) : ?>
						<div class="download-card-footer">
							<?php echo edd_get_purchase_link(array('download_id' => get_the_ID())); ?>
						</div>
					<?php endif; ?>
				</div>
			<?php endwhile; ?>
		</div>

		<?php if ($show_pagination && $downloads_query->max_num_pages > 1) : ?>
			<div class="downloads-pagination">
				<?php
				$total_pages = $downloads_query->max_num_pages;
				$range = 2;
				$start_page = max(1, $paged - $range);
				$end_page = min($total_pages, $paged + $range);

				for ($i = $start_page; $i <= $end_page; $i++) :
					$page_url = ($i == 1) ? $current_url : add_query_arg('paged', $i, $current_url);
					if (!empty($category_filter)) {
						$page_url = add_query_arg('download_category', $category_filter, $page_url);
					}
					$is_active = ($i == $paged);
				?>
					<a
						href="<?php echo esc_url($page_url); ?>"
						class="page-number <?php echo $is_active ? 'active' : ''; ?>"
						style="<?php echo $is_active ? 'background-color: ' . esc_attr($pagination_active_color) . '; color: #ffffff;' : 'color: ' . esc_attr($pagination_color) . ';'; ?>"
					>
						<?php echo str_pad($i, 2, '0', STR_PAD_LEFT); ?>
					</a>
				<?php endfor; ?>
			</div>
		<?php endif; ?>

		<?php wp_reset_postdata(); ?>

	<?php else : ?>
		<div class="downloads-empty" style="padding: 60px 20px; text-align: center; background: #f0f0f0; border: 2px dashed #ccc; border-radius: 12px;">
			<span class="dashicons dashicons-download" style="font-size: 64px; width: 64px; height: 64px; color: #999; margin-bottom: 16px;"></span>
			<p style="margin: 0; color: #666; font-size: 16px;">
				<strong>No downloads found.</strong><br>
				<?php if ($edd_active) : ?>
					Go to <strong>Downloads → Add New</strong> to create your first download.
				<?php else : ?>
					Please install Easy Digital Downloads and add some downloads.
				<?php endif; ?>
			</p>
		</div>
	<?php endif; ?>

	<style>
		#<?php echo esc_attr($block_id); ?> .filter-button.active {
			background-color: <?php echo esc_attr($filter_bg_color); ?> !important;
			color: <?php echo esc_attr($filter_text_color); ?> !important;
		}
		#<?php echo esc_attr($block_id); ?> .download-card {
			background-color: <?php echo esc_attr($card_bg_color); ?>;
		}
		#<?php echo esc_attr($block_id); ?> .download-card-title {
			color: <?php echo esc_attr($title_color); ?>;
		}
		#<?php echo esc_attr($block_id); ?> .download-card-price {
			color: <?php echo esc_attr($price_color); ?> !important;
		}
		#<?php echo esc_attr($block_id); ?> .page-number.active {
			background-color: <?php echo esc_attr($pagination_active_color); ?> !important;
			color: #ffffff !important;
		}
		#<?php echo esc_attr($block_id); ?> .page-number:not(.active) {
			color: <?php echo esc_attr($pagination_color); ?>;
		}
	</style>
</div>
