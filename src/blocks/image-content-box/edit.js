/**
 * Image and Content Box Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
	ColorPicker,
	SelectControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		image,
		heading,
		description,
		buttonText,
		buttonUrl,
		showArrowButton,
		imagePosition,
		backgroundColor,
		headingColor,
		descriptionColor,
		buttonColor,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-image-content-box',
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
							{ label: __('Left', 'xgenious-ui-blocks'), value: 'left' },
							{ label: __('Right', 'xgenious-ui-blocks'), value: 'right' },
						]}
						onChange={(value) => setAttributes({ imagePosition: value })}
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

				{/* Button Settings */}
				<PanelBody title={__('Button Settings', 'xgenious-ui-blocks')} initialOpen={false}>
					<TextControl
						label={__('Button Text', 'xgenious-ui-blocks')}
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
					/>
					<p>{__('Button URL', 'xgenious-ui-blocks')}</p>
					<URLInput
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
					/>
					<ToggleControl
						label={__('Show Arrow Button', 'xgenious-ui-blocks')}
						checked={showArrowButton}
						onChange={(value) => setAttributes({ showArrowButton: value })}
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

					<p style={{ marginTop: '16px' }}>{__('Button Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={buttonColor}
						onChangeComplete={(value) => setAttributes({ buttonColor: value.hex })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="xg-container">
					<div className={`content-box-wrapper image-${imagePosition}`}>
						{/* Image Section */}
						<div className="content-box-image">
							{image.url ? (
								<img src={image.url} alt={image.alt} />
							) : (
								<div className="image-placeholder">
									<span className="dashicon dashicons-format-image"></span>
									<p>{__('Select Image', 'xgenious-ui-blocks')}</p>
								</div>
							)}
						</div>

						{/* Content Section */}
						<div className="content-box-content">
							<RichText
								tagName="h2"
								className="content-box-heading"
								value={heading}
								onChange={(value) => setAttributes({ heading: value })}
								placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
								style={{ color: headingColor }}
							/>

							<RichText
								tagName="p"
								className="content-box-description"
								value={description}
								onChange={(value) => setAttributes({ description: value })}
								placeholder={__('Enter description...', 'xgenious-ui-blocks')}
								style={{ color: descriptionColor }}
							/>

							<div className="content-box-buttons">
								<a
									href={buttonUrl}
									className="content-box-button"
									style={{ backgroundColor: buttonColor }}
								>
									{buttonText}
								</a>
								{showArrowButton && (
									<a
										href={buttonUrl}
										className="content-box-arrow"
										style={{ backgroundColor: buttonColor }}
									>
										→
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
