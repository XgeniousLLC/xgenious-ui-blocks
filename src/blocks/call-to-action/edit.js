/**
 * Call to Action Block - Edit Component
 */

import { useBlockProps, InspectorControls, RichText, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl, Button, ColorPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
	const {
		heading,
		description,
		buttonText,
		buttonUrl,
		buttonNewTab,
		backgroundImage,
		personImage,
		backgroundColor,
		overlayColor,
		overlayOpacity,
		headingColor,
		descriptionColor,
		buttonColor,
		buttonTextColor,
		paddingTop,
		paddingBottom,
		borderRadius,
		fullWidth,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-cta-section',
		style: {
			backgroundColor,
			backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
			borderRadius: `${borderRadius}px`,
			position: 'relative',
			overflow: 'hidden',
		},
	});

	const overlayStyle = {
		backgroundColor: overlayColor,
		opacity: overlayOpacity / 100,
	};

	return (
		<>
			<InspectorControls>
				{/* Content Settings */}
				<PanelBody title={__('Content Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<TextControl
						label={__('Button URL', 'xgenious-ui-blocks')}
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
					/>
					<ToggleControl
						label={__('Open in New Tab', 'xgenious-ui-blocks')}
						checked={buttonNewTab}
						onChange={(value) => setAttributes({ buttonNewTab: value })}
					/>
				</PanelBody>

				{/* Background Image */}
				<PanelBody title={__('Background Image', 'xgenious-ui-blocks')} initialOpen={false}>
					<MediaUpload
						onSelect={(media) =>
							setAttributes({
								backgroundImage: {
									id: media.id,
									url: media.url,
									alt: media.alt || '',
								},
							})
						}
						allowedTypes={['image']}
						value={backgroundImage.id}
						render={({ open }) => (
							<div>
								{backgroundImage.url ? (
									<div>
										<img
											src={backgroundImage.url}
											alt={backgroundImage.alt}
											style={{ width: '100%', marginBottom: '12px' }}
										/>
										<Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
											{__('Replace Image', 'xgenious-ui-blocks')}
										</Button>
										<Button
											variant="secondary"
											isDestructive
											onClick={() =>
												setAttributes({
													backgroundImage: { id: null, url: '', alt: '' },
												})
											}
										>
											{__('Remove', 'xgenious-ui-blocks')}
										</Button>
									</div>
								) : (
									<Button variant="primary" onClick={open}>
										{__('Select Background Image', 'xgenious-ui-blocks')}
									</Button>
								)}
							</div>
						)}
					/>

					{backgroundImage.url && (
						<>
							<hr style={{ margin: '24px 0' }} />
							<p>{__('Background Overlay', 'xgenious-ui-blocks')}</p>
							<ColorPicker
								color={overlayColor}
								onChangeComplete={(value) => {
									const rgba = `rgba(${value.rgb.r}, ${value.rgb.g}, ${value.rgb.b}, ${value.rgb.a})`;
									setAttributes({ overlayColor: rgba });
								}}
								enableAlpha
							/>
							<RangeControl
								label={__('Overlay Opacity', 'xgenious-ui-blocks')}
								value={overlayOpacity}
								onChange={(value) => setAttributes({ overlayOpacity: value })}
								min={0}
								max={100}
								step={5}
							/>
						</>
					)}
				</PanelBody>

				{/* Person Image */}
				<PanelBody title={__('Person Image', 'xgenious-ui-blocks')} initialOpen={false}>
					<MediaUpload
						onSelect={(media) =>
							setAttributes({
								personImage: {
									id: media.id,
									url: media.url,
									alt: media.alt || '',
								},
							})
						}
						allowedTypes={['image']}
						value={personImage.id}
						render={({ open }) => (
							<div>
								{personImage.url ? (
									<div>
										<img
											src={personImage.url}
											alt={personImage.alt}
											style={{ width: '100%', marginBottom: '12px', borderRadius: '50%' }}
										/>
										<Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
											{__('Replace Image', 'xgenious-ui-blocks')}
										</Button>
										<Button
											variant="secondary"
											isDestructive
											onClick={() =>
												setAttributes({
													personImage: { id: null, url: '', alt: '' },
												})
											}
										>
											{__('Remove', 'xgenious-ui-blocks')}
										</Button>
									</div>
								) : (
									<Button variant="primary" onClick={open}>
										{__('Select Person Image', 'xgenious-ui-blocks')}
									</Button>
								)}
							</div>
						)}
					/>
				</PanelBody>

				{/* Colors */}
				<PanelBody title={__('Colors', 'xgenious-ui-blocks')} initialOpen={false}>
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

					<p style={{ marginTop: '16px' }}>{__('Button Background Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={buttonColor}
						onChangeComplete={(value) => setAttributes({ buttonColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Button Text Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={buttonTextColor}
						onChangeComplete={(value) => setAttributes({ buttonTextColor: value.hex })}
					/>
				</PanelBody>

				{/* Spacing */}
				<PanelBody title={__('Spacing', 'xgenious-ui-blocks')} initialOpen={false}>
					<RangeControl
						label={__('Padding Top (px)', 'xgenious-ui-blocks')}
						value={paddingTop}
						onChange={(value) => setAttributes({ paddingTop: value })}
						min={0}
						max={200}
						step={10}
					/>
					<RangeControl
						label={__('Padding Bottom (px)', 'xgenious-ui-blocks')}
						value={paddingBottom}
						onChange={(value) => setAttributes({ paddingBottom: value })}
						min={0}
						max={200}
						step={10}
					/>
					<RangeControl
						label={__('Border Radius (px)', 'xgenious-ui-blocks')}
						value={borderRadius}
						onChange={(value) => setAttributes({ borderRadius: value })}
						min={0}
						max={50}
						step={2}
					/>
				</PanelBody>

				{/* Layout */}
				<PanelBody title={__('Layout', 'xgenious-ui-blocks')} initialOpen={false}>
					<ToggleControl
						label={__('Full Width', 'xgenious-ui-blocks')}
						checked={fullWidth}
						onChange={(value) => setAttributes({ fullWidth: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{/* Background Overlay */}
				{backgroundImage.url && <div className="cta-overlay" style={overlayStyle}></div>}

				{/* Content */}
				<div className={fullWidth ? 'cta-content-full' : 'xg-container'}>
					<div className="cta-content">
						<div className="cta-text">
							<RichText
								tagName="h2"
								className="cta-heading"
								value={heading}
								onChange={(value) => setAttributes({ heading: value })}
								placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
								style={{ color: headingColor }}
							/>

							<RichText
								tagName="p"
								className="cta-description"
								value={description}
								onChange={(value) => setAttributes({ description: value })}
								placeholder={__('Enter description...', 'xgenious-ui-blocks')}
								style={{ color: descriptionColor }}
							/>

							<div className="cta-button-wrapper">
								<RichText
									tagName="span"
									className="cta-button"
									value={buttonText}
									onChange={(value) => setAttributes({ buttonText: value })}
									placeholder={__('Button Text', 'xgenious-ui-blocks')}
									style={{
										backgroundColor: buttonColor,
										color: buttonTextColor,
									}}
								/>
							</div>
						</div>

						{/* Person Image */}
						{personImage.url && (
							<div className="cta-person">
								<img src={personImage.url} alt={personImage.alt} />
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
