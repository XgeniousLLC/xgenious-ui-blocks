<?php
/**
 * Expertise Contact Block - Server-side rendering
 *
 * @package XgeniousUIBlocks
 *
 * @var array    $attributes Block attributes
 * @var string   $content    Block content
 * @var WP_Block $block      Block instance
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$heading              = isset( $attributes['heading'] ) ? $attributes['heading'] : '';
$description          = isset( $attributes['description'] ) ? $attributes['description'] : '';
$feature_items        = isset( $attributes['featureItems'] ) ? $attributes['featureItems'] : [];
$form_title           = isset( $attributes['formTitle'] ) ? $attributes['formTitle'] : '';
$form_shortcode       = isset( $attributes['formShortcode'] ) ? trim( $attributes['formShortcode'] ) : '';
$show_button          = isset( $attributes['showButton'] ) ? (bool) $attributes['showButton'] : true;
$show_calendly        = isset( $attributes['showCalendly'] ) ? (bool) $attributes['showCalendly'] : true;
$button_text          = isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : '';
$button_url           = isset( $attributes['buttonUrl'] ) ? $attributes['buttonUrl'] : '#';
$button_new_tab       = isset( $attributes['buttonOpenNewTab'] ) ? $attributes['buttonOpenNewTab'] : false;
$calendly_text        = isset( $attributes['calendlyText'] ) ? $attributes['calendlyText'] : '';
$calendly_url         = isset( $attributes['calendlyUrl'] ) ? $attributes['calendlyUrl'] : '#';
$section_bg           = isset( $attributes['sectionBackgroundColor'] ) ? $attributes['sectionBackgroundColor'] : '#1a1a1a';
$card_bg              = isset( $attributes['cardBackgroundColor'] ) ? $attributes['cardBackgroundColor'] : '#1e1d33';
$heading_color        = isset( $attributes['headingColor'] ) ? $attributes['headingColor'] : '#ffffff';
$description_color    = isset( $attributes['descriptionColor'] ) ? $attributes['descriptionColor'] : '#cccccc';
$feature_text_color   = isset( $attributes['featureTextColor'] ) ? $attributes['featureTextColor'] : '#ffffff';
$feature_icon_color   = isset( $attributes['featureIconColor'] ) ? $attributes['featureIconColor'] : '#6c63ff';
$form_title_color     = isset( $attributes['formTitleColor'] ) ? $attributes['formTitleColor'] : '#ffffff';
$button_color         = isset( $attributes['buttonColor'] ) ? $attributes['buttonColor'] : '#6c63ff';
$button_text_color    = isset( $attributes['buttonTextColor'] ) ? $attributes['buttonTextColor'] : '#ffffff';
$calendly_color       = isset( $attributes['calendlyColor'] ) ? $attributes['calendlyColor'] : '#ffffff';
$padding_top          = isset( $attributes['paddingTop'] ) ? intval( $attributes['paddingTop'] ) : 100;
$padding_bottom       = isset( $attributes['paddingBottom'] ) ? intval( $attributes['paddingBottom'] ) : 100;
$full_width           = isset( $attributes['fullWidth'] ) ? $attributes['fullWidth'] : false;

$wrapper_class = 'xg-expertise-contact' . ( $full_width ? ' xg-full-width' : '' );

$section_style = sprintf(
	'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;',
	esc_attr( $section_bg ),
	$padding_top,
	$padding_bottom
);
?>

<div class="<?php echo esc_attr( $wrapper_class ); ?>" style="<?php echo $section_style; ?>">
	<div class="xg-expertise-contact-container">
		<div class="expertise-contact-inner">

			<div class="expertise-contact-left">
				<?php if ( $heading ) : ?>
					<h2 class="expertise-contact-heading" style="color:<?php echo esc_attr( $heading_color ); ?>;">
						<?php echo wp_kses_post( $heading ); ?>
					</h2>
				<?php endif; ?>

				<?php if ( $description ) : ?>
					<p class="expertise-contact-description" style="color:<?php echo esc_attr( $description_color ); ?>;">
						<?php echo wp_kses_post( $description ); ?>
					</p>
				<?php endif; ?>

				<?php if ( ! empty( $feature_items ) ) : ?>
					<ul class="expertise-feature-list">
						<?php foreach ( $feature_items as $item ) :
							$text = isset( $item['text'] ) ? $item['text'] : '';
							if ( ! $text ) continue;
						?>
							<li class="expertise-feature-item">
								<span class="feature-icon" style="color:<?php echo esc_attr( $feature_icon_color ); ?>;">
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="11" cy="11" r="11" fill="currentColor"/>
										<path d="M6.5 11.5l3 3 6-6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</span>
								<span class="feature-text" style="color:<?php echo esc_attr( $feature_text_color ); ?>;"><?php echo esc_html( $text ); ?></span>
							</li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
			</div>

			<div class="expertise-contact-right">
				<div class="expertise-contact-card" style="background-color:<?php echo esc_attr( $card_bg ); ?>;">
					<?php if ( $form_title ) : ?>
						<p class="expertise-form-title" style="color:<?php echo esc_attr( $form_title_color ); ?>;">
							<?php echo esc_html( $form_title ); ?>
						</p>
					<?php endif; ?>

					<?php if ( $form_shortcode ) : ?>
						<div class="expertise-shortcode-output">
							<?php echo do_shortcode( $form_shortcode ); ?>
						</div>
					<?php endif; ?>

					<div class="expertise-card-footer">
						<?php if ( $show_button && $button_text ) : ?>
							<a
								href="<?php echo esc_url( $button_url ); ?>"
								class="expertise-cta-button"
								style="background-color:<?php echo esc_attr( $button_color ); ?>;color:<?php echo esc_attr( $button_text_color ); ?>;"
								<?php echo $button_new_tab ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
							>
								<?php echo esc_html( $button_text ); ?>
							</a>
						<?php endif; ?>

						<?php if ( $show_calendly && $calendly_text ) : ?>
							<a
								href="<?php echo esc_url( $calendly_url ); ?>"
								class="expertise-calendly-link"
								style="color:<?php echo esc_attr( $calendly_color ); ?>;"
								target="_blank"
								rel="noopener noreferrer"
							>
								<?php echo esc_html( $calendly_text ); ?>
							</a>
						<?php endif; ?>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
