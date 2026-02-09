/**
 * Template Grid Block - Edit Component
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
	TextControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		sectionTitle,
		templates,
		columns,
		backgroundColor,
		titleColor,
		subtitleColor,
		cardBackgroundColor,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-template-grid',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	const addTemplate = () => {
		const newTemplate = {
			image: { id: null, url: '', alt: '' },
			title: 'New Template',
			subtitle: 'Template description here',
		};
		setAttributes({ templates: [...templates, newTemplate] });
	};

	const removeTemplate = (index) => {
		const updatedTemplates = templates.filter((_, i) => i !== index);
		setAttributes({ templates: updatedTemplates });
	};

	const updateTemplate = (index, key, value) => {
		const updatedTemplates = [...templates];
		updatedTemplates[index][key] = value;
		setAttributes({ templates: updatedTemplates });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<RangeControl
						label={__('Columns', 'xgenious-ui-blocks')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={4}
						step={1}
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

				<PanelBody title={__('Color Settings', 'xgenious-ui-blocks')}>
					<div style={{ marginBottom: '12px' }}>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Background Color', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={backgroundColor}
							onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
						/>
					</div>

					<div style={{ marginBottom: '12px' }}>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Card Background', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={cardBackgroundColor}
							onChangeComplete={(value) => setAttributes({ cardBackgroundColor: value.hex })}
						/>
					</div>

					<div style={{ marginBottom: '12px' }}>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Title Color', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={titleColor}
							onChangeComplete={(value) => setAttributes({ titleColor: value.hex })}
						/>
					</div>

					<div>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Subtitle Color', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={subtitleColor}
							onChangeComplete={(value) => setAttributes({ subtitleColor: value.hex })}
						/>
					</div>
				</PanelBody>

				{/* Individual Template Settings */}
				{templates.map((template, index) => (
					<PanelBody
						key={index}
						title={`${__('Template', 'xgenious-ui-blocks')} ${index + 1}: ${template.title}`}
						initialOpen={false}
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									updateTemplate(index, 'image', {
										id: media.id,
										url: media.url,
										alt: media.alt || '',
									})
								}
								allowedTypes={['image']}
								value={template.image?.id}
								render={({ open }) => (
									<div style={{ marginBottom: '12px' }}>
										<p><strong>{__('Template Image', 'xgenious-ui-blocks')}</strong></p>
										{template.image?.url ? (
											<div>
												<img
													src={template.image.url}
													alt={template.image.alt}
													style={{
														width: '100%',
														height: 'auto',
														marginBottom: '8px',
														borderRadius: '8px'
													}}
												/>
												<Button
													variant="secondary"
													onClick={open}
													style={{ marginRight: '8px' }}
												>
													{__('Replace Image', 'xgenious-ui-blocks')}
												</Button>
												<Button
													isDestructive
													onClick={() =>
														updateTemplate(index, 'image', {
															id: null,
															url: '',
															alt: '',
														})
													}
												>
													{__('Remove Image', 'xgenious-ui-blocks')}
												</Button>
											</div>
										) : (
											<Button variant="primary" onClick={open}>
												{__('Upload Image', 'xgenious-ui-blocks')}
											</Button>
										)}
									</div>
								)}
							/>
						</MediaUploadCheck>

						<TextControl
							label={__('Title', 'xgenious-ui-blocks')}
							value={template.title}
							onChange={(value) => updateTemplate(index, 'title', value)}
						/>

						<TextControl
							label={__('Subtitle', 'xgenious-ui-blocks')}
							value={template.subtitle}
							onChange={(value) => updateTemplate(index, 'subtitle', value)}
							help={__('Brief description of the template', 'xgenious-ui-blocks')}
						/>

						<div style={{ marginTop: '16px' }}>
							<Button
								isDestructive
								variant="secondary"
								onClick={() => removeTemplate(index)}
							>
								{__('Remove Template', 'xgenious-ui-blocks')}
							</Button>
						</div>
					</PanelBody>
				))}

				<PanelBody>
					<Button variant="primary" onClick={addTemplate}>
						{__('Add Template', 'xgenious-ui-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="template-grid-container">
					{/* Section Title */}
					<RichText
						tagName="h2"
						className="section-title"
						value={sectionTitle}
						onChange={(value) => setAttributes({ sectionTitle: value })}
						placeholder={__('Enter section title...', 'xgenious-ui-blocks')}
					/>

					{/* Templates Grid */}
					<div className={`templates-grid columns-${columns}`}>
						{templates.map((template, index) => (
							<div
								key={index}
								className="template-card"
								style={{ backgroundColor: cardBackgroundColor }}
							>
								<div className="template-image">
									{template.image?.url ? (
										<img
											src={template.image.url}
											alt={template.image.alt || template.title}
										/>
									) : (
										<div className="image-placeholder">
											<span className="dashicons dashicons-format-image"></span>
											<p>{__('No Image', 'xgenious-ui-blocks')}</p>
										</div>
									)}
								</div>

								<div className="template-content">
									<h3 className="template-title" style={{ color: titleColor }}>
										{template.title}
									</h3>
									<p className="template-subtitle" style={{ color: subtitleColor }}>
										{template.subtitle}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
