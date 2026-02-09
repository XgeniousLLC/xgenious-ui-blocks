/**
 * Downloads Grid Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	ColorPicker,
	__experimentalText as Text,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit({ attributes, setAttributes }) {
	const {
		postsPerPage,
		columns,
		showFilters,
		showPagination,
		showPrice,
		showPurchaseButton,
		filterBgColor,
		filterTextColor,
		cardBgColor,
		titleColor,
		priceColor,
		paginationActiveColor,
		paginationColor,
	} = attributes;

	const blockProps = useBlockProps();

	// Check if 'download' post type exists
	const postTypeExists = useSelect((select) => {
		const postType = select('core').getPostType('download');
		return !!postType;
	}, []);

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<RangeControl
						label={__('Posts Per Page', 'xgenious-ui-blocks')}
						value={postsPerPage}
						onChange={(value) => setAttributes({ postsPerPage: value })}
						min={1}
						max={24}
					/>
					<RangeControl
						label={__('Columns', 'xgenious-ui-blocks')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={4}
					/>
					<ToggleControl
						label={__('Show Filters', 'xgenious-ui-blocks')}
						checked={showFilters}
						onChange={(value) => setAttributes({ showFilters: value })}
					/>
					<ToggleControl
						label={__('Show Pagination', 'xgenious-ui-blocks')}
						checked={showPagination}
						onChange={(value) => setAttributes({ showPagination: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Easy Digital Downloads', 'xgenious-ui-blocks')} initialOpen={false}>
					<ToggleControl
						label={__('Show Price', 'xgenious-ui-blocks')}
						checked={showPrice}
						onChange={(value) => setAttributes({ showPrice: value })}
						help={__('Display product price from Easy Digital Downloads', 'xgenious-ui-blocks')}
					/>
					<ToggleControl
						label={__('Show Purchase Button', 'xgenious-ui-blocks')}
						checked={showPurchaseButton}
						onChange={(value) => setAttributes({ showPurchaseButton: value })}
						help={__('Display Add to Cart button', 'xgenious-ui-blocks')}
					/>
					<VStack spacing={3}>
						<Text variant="label">{__('Price Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker
							color={priceColor}
							onChange={(value) => setAttributes({ priceColor: value })}
						/>
					</VStack>
				</PanelBody>

				<PanelBody title={__('Filter Colors', 'xgenious-ui-blocks')} initialOpen={false}>
					<VStack spacing={3}>
						<Text variant="label">{__('Active Background Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker
							color={filterBgColor}
							onChange={(value) => setAttributes({ filterBgColor: value })}
						/>
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Active Text Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker
							color={filterTextColor}
							onChange={(value) => setAttributes({ filterTextColor: value })}
						/>
					</VStack>
				</PanelBody>

				<PanelBody title={__('Card Colors', 'xgenious-ui-blocks')} initialOpen={false}>
					<VStack spacing={3}>
						<Text variant="label">{__('Card Background', 'xgenious-ui-blocks')}</Text>
						<ColorPicker
							color={cardBgColor}
							onChange={(value) => setAttributes({ cardBgColor: value })}
						/>
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Title Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker
							color={titleColor}
							onChange={(value) => setAttributes({ titleColor: value })}
						/>
					</VStack>
				</PanelBody>

				<PanelBody title={__('Pagination Colors', 'xgenious-ui-blocks')} initialOpen={false}>
					<VStack spacing={3}>
						<Text variant="label">{__('Active Page Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker
							color={paginationActiveColor}
							onChange={(value) => setAttributes({ paginationActiveColor: value })}
						/>
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Inactive Page Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker
							color={paginationColor}
							onChange={(value) => setAttributes({ paginationColor: value })}
						/>
					</VStack>
				</PanelBody>
			</InspectorControls>

			{!postTypeExists ? (
				<div className="downloads-grid-notice">
					<p>
						{__(
							'⚠️ Custom post type "download" not found. Please make sure Easy Digital Downloads is installed.',
							'xgenious-ui-blocks'
						)}
					</p>
					<p style={{ fontSize: '14px', color: '#666' }}>
						{__(
							'This block works with Easy Digital Downloads plugin. Install and activate it to use this block.',
							'xgenious-ui-blocks'
						)}
					</p>
				</div>
			) : null}

			<div className="downloads-grid-preview">
				<ServerSideRender
					block="xgenious-ui-blocks/downloads-grid"
					attributes={attributes}
					EmptyResponsePlaceholder={() => (
						<div className="downloads-empty-placeholder">
							<span className="dashicons dashicons-download"></span>
							<p>{__('No downloads found. Add some downloads to see them here.', 'xgenious-ui-blocks')}</p>
						</div>
					)}
					ErrorResponsePlaceholder={() => (
						<div className="downloads-error-placeholder">
							<span className="dashicons dashicons-warning"></span>
							<p>{__('Error loading downloads. Please check your settings.', 'xgenious-ui-blocks')}</p>
						</div>
					)}
					LoadingResponsePlaceholder={() => (
						<div className="downloads-loading-placeholder">
							<span className="dashicons dashicons-update spin"></span>
							<p>{__('Loading downloads...', 'xgenious-ui-blocks')}</p>
						</div>
					)}
				/>
			</div>
		</div>
	);
}
