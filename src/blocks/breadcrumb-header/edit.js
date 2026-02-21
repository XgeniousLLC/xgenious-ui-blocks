/**
 * Breadcrumb Header Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
	ColorPicker,
	SelectControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		heading,
		description,
		image,
		backgroundColor,
		headingColor,
		descriptionColor,
		paddingTop,
		paddingBottom,
		imagePosition,
		contentVerticalAlign,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-breadcrumb-header',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	return (
		<>
			<InspectorControls>
				{/* Layout Settings */}
				<PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<SelectControl
						label={__('Image Position', 'xgenious-ui-blocks')}
						value={imagePosition}
						options={[
							{ label: __('Right', 'xgenious-ui-blocks'), value: 'right' },
							{ label: __('Left', 'xgenious-ui-blocks'), value: 'left' },
						]}
						onChange={(value) => setAttributes({ imagePosition: value })}
					/>

					<SelectControl
						label={__('Content Vertical Alignment', 'xgenious-ui-blocks')}
						value={contentVerticalAlign}
						options={[
							{ label: __('Top', 'xgenious-ui-blocks'), value: 'start' },
							{ label: __('Middle', 'xgenious-ui-blocks'), value: 'center' },
							{ label: __('Bottom', 'xgenious-ui-blocks'), value: 'end' },
						]}
						onChange={(value) => setAttributes({ contentVerticalAlign: value })}
					/>

					<RangeControl
						label={__('Padding Top (px)', 'xgenious-ui-blocks')}
						value={paddingTop}
						onChange={(value) => setAttributes({ paddingTop: value })}
						min={40}
						max={200}
						step={10}
					/>

					<RangeControl
						label={__('Padding Bottom (px)', 'xgenious-ui-blocks')}
						value={paddingBottom}
						onChange={(value) => setAttributes({ paddingBottom: value })}
						min={40}
						max={200}
						step={10}
					/>
				</PanelBody>

				{/* Color Settings */}
				<PanelBody title={__('Color Settings', 'xgenious-ui-blocks')} initialOpen={false}>
					<p>{__('Background Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={backgroundColor}
						onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Heading Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={headingColor}
						onChangeComplete={(value) => setAttributes({ headingColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Description Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={descriptionColor}
						onChangeComplete={(value) => setAttributes({ descriptionColor: value.hex })}
					/>
				</PanelBody>

				{/* Image Settings */}
				<PanelBody title={__('Image Settings', 'xgenious-ui-blocks')} initialOpen={false}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({
									image: {
										id: media.id,
										url: media.url,
										alt: media.alt || '',
									},
								})
							}
							allowedTypes={['image']}
							value={image.id}
							render={({ open }) => (
								<div>
									{image.url ? (
										<div>
											<img
												src={image.url}
												alt={image.alt}
												style={{ width: '100%', marginBottom: '8px' }}
											/>
											<Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
												{__('Replace Image', 'xgenious-ui-blocks')}
											</Button>
											<Button
												isDestructive
												onClick={() =>
													setAttributes({
														image: { id: null, url: '', alt: '' },
													})
												}
											>
												{__('Remove Image', 'xgenious-ui-blocks')}
											</Button>
										</div>
									) : (
										<Button variant="primary" onClick={open}>
											{__('Select Image', 'xgenious-ui-blocks')}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="xg-container">
					<div className={`breadcrumb-header-wrapper image-${imagePosition} content-${contentVerticalAlign}`}>
						{/* Content Section */}
						<div className="breadcrumb-content">
							<RichText
								tagName="h1"
								className="breadcrumb-heading"
								value={heading}
								onChange={(value) => setAttributes({ heading: value })}
								placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
								style={{ color: headingColor }}
							/>

							<RichText
								tagName="p"
								className="breadcrumb-description"
								value={description}
								onChange={(value) => setAttributes({ description: value })}
								placeholder={__('Enter description...', 'xgenious-ui-blocks')}
								style={{ color: descriptionColor }}
							/>
						</div>

						{/* Image Section */}
						<div className="breadcrumb-image">
							{image.url ? (
								<img src={image.url} alt={image.alt} />
							) : (
								<div className="image-placeholder">
									<span className="dashicon dashicons-format-image"></span>
									<p>{__('Select Image', 'xgenious-ui-blocks')}</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
