/**
 * Photo Gallery Block - Edit Component
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
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		heading,
		description,
		images,
		columns,
		gap,
		backgroundColor,
		headingColor,
		descriptionColor,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-photo-gallery',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	const addImage = (media) => {
		const newImages = [
			...images,
			{
				id: media.id,
				url: media.url,
				alt: media.alt || '',
			},
		];
		setAttributes({ images: newImages });
	};

	const updateImage = (index, media) => {
		const newImages = [...images];
		newImages[index] = {
			id: media.id,
			url: media.url,
			alt: media.alt || '',
		};
		setAttributes({ images: newImages });
	};

	const removeImage = (index) => {
		const newImages = images.filter((_, i) => i !== index);
		setAttributes({ images: newImages });
	};

	return (
		<>
			<InspectorControls>
				{/* Layout Settings */}
				<PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<RangeControl
						label={__('Columns', 'xgenious-ui-blocks')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={6}
						step={1}
					/>

					<RangeControl
						label={__('Gap (px)', 'xgenious-ui-blocks')}
						value={gap}
						onChange={(value) => setAttributes({ gap: value })}
						min={0}
						max={60}
						step={5}
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

				{/* Manage Images */}
				<PanelBody title={__('Manage Images', 'xgenious-ui-blocks')} initialOpen={false}>
					{images.map((image, index) => (
						<PanelBody
							key={index}
							title={`${__('Image', 'xgenious-ui-blocks')} ${index + 1}`}
							initialOpen={false}
						>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => updateImage(index, media)}
									allowedTypes={['image']}
									value={image.id}
									render={({ open }) => (
										<div style={{ marginBottom: '12px' }}>
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
														onClick={() => removeImage(index)}
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
					))}
					<MediaUploadCheck>
						<MediaUpload
							onSelect={addImage}
							allowedTypes={['image']}
							multiple={false}
							render={({ open }) => (
								<Button variant="primary" onClick={open} style={{ marginTop: '12px' }}>
									{__('Add Image', 'xgenious-ui-blocks')}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="xg-container">
					{/* Header Section */}
					<div className="gallery-header">
						<div className="gallery-heading-wrapper">
							<RichText
								tagName="h2"
								className="gallery-heading"
								value={heading}
								onChange={(value) => setAttributes({ heading: value })}
								placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
								style={{ color: headingColor }}
							/>
						</div>

						<div className="gallery-description-wrapper">
							<RichText
								tagName="p"
								className="gallery-description"
								value={description}
								onChange={(value) => setAttributes({ description: value })}
								placeholder={__('Enter description...', 'xgenious-ui-blocks')}
								style={{ color: descriptionColor }}
							/>
						</div>
					</div>

					{/* Gallery Grid */}
					<div
						className="gallery-grid"
						style={{
							gridTemplateColumns: `repeat(${columns}, 1fr)`,
							gap: `${gap}px`,
						}}
					>
						{images.map((image, index) => (
							<div key={index} className="gallery-item">
								<div className="gallery-item-controls">
									<Button isDestructive isSmall onClick={() => removeImage(index)}>
										✕
									</Button>
								</div>
								<img src={image.url} alt={image.alt} />
							</div>
						))}

						{images.length === 0 && (
							<div className="gallery-placeholder">
								<p>{__('Add images from the sidebar settings', 'xgenious-ui-blocks')}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
