/**
 * Service Box with Icon Block - Edit Component
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
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		sectionTitle,
		services,
		columns,
		backgroundColor,
		boxBackgroundColor,
		titleColor,
		textColor,
		iconColor,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-service-box-icon',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	// Available Dashicons
	const iconOptions = [
		{ label: 'Customizer', value: 'admin-customizer' },
		{ label: 'Users', value: 'admin-users' },
		{ label: 'Cart', value: 'cart' },
		{ label: 'Smartphone', value: 'smartphone' },
		{ label: 'Plugins', value: 'admin-plugins' },
		{ label: 'Tools', value: 'admin-tools' },
		{ label: 'Settings', value: 'admin-settings' },
		{ label: 'Dashboard', value: 'dashboard' },
		{ label: 'Chart', value: 'chart-bar' },
		{ label: 'Cloud', value: 'cloud' },
		{ label: 'Code', value: 'editor-code' },
		{ label: 'Performance', value: 'performance' },
		{ label: 'Shield', value: 'shield' },
		{ label: 'Star', value: 'star-filled' },
		{ label: 'Lightbulb', value: 'lightbulb' },
	];

	const addService = () => {
		const newService = {
			iconType: 'dashicon',
			icon: 'admin-customizer',
			iconImage: { id: null, url: '', alt: '' },
			title: 'New Service',
			description: 'Service description here.',
		};
		setAttributes({ services: [...services, newService] });
	};

	const removeService = (index) => {
		const updatedServices = services.filter((_, i) => i !== index);
		setAttributes({ services: updatedServices });
	};

	const updateService = (index, key, value) => {
		const updatedServices = [...services];
		updatedServices[index][key] = value;
		setAttributes({ services: updatedServices });
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
							{__('Box Background', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={boxBackgroundColor}
							onChangeComplete={(value) => setAttributes({ boxBackgroundColor: value.hex })}
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

					<div style={{ marginBottom: '12px' }}>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Text Color', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={textColor}
							onChangeComplete={(value) => setAttributes({ textColor: value.hex })}
						/>
					</div>

					<div>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Icon Color', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={iconColor}
							onChangeComplete={(value) => setAttributes({ iconColor: value.hex })}
						/>
					</div>
				</PanelBody>

				{/* Individual Service Settings */}
				{services.map((service, index) => (
					<PanelBody
						key={index}
						title={`${__('Service', 'xgenious-ui-blocks')} ${index + 1}: ${service.title}`}
						initialOpen={false}
					>
						<ToggleControl
							label={__('Use Custom Icon', 'xgenious-ui-blocks')}
							checked={service.iconType === 'custom'}
							onChange={(value) =>
								updateService(index, 'iconType', value ? 'custom' : 'dashicon')
							}
							help={__('Upload custom image/SVG or use dashicon', 'xgenious-ui-blocks')}
						/>

						{service.iconType === 'dashicon' ? (
							<SelectControl
								label={__('Icon', 'xgenious-ui-blocks')}
								value={service.icon}
								options={iconOptions}
								onChange={(value) => updateService(index, 'icon', value)}
							/>
						) : (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) =>
										updateService(index, 'iconImage', {
											id: media.id,
											url: media.url,
											alt: media.alt || '',
										})
									}
									allowedTypes={['image']}
									value={service.iconImage?.id}
									render={({ open }) => (
										<div style={{ marginBottom: '12px' }}>
											<p><strong>{__('Custom Icon', 'xgenious-ui-blocks')}</strong></p>
											{service.iconImage?.url ? (
												<div>
													<img
														src={service.iconImage.url}
														alt={service.iconImage.alt}
														style={{
															width: '60px',
															height: '60px',
															objectFit: 'contain',
															marginBottom: '8px',
															display: 'block'
														}}
													/>
													<Button
														variant="secondary"
														onClick={open}
														style={{ marginRight: '8px' }}
													>
														{__('Replace Icon', 'xgenious-ui-blocks')}
													</Button>
													<Button
														isDestructive
														onClick={() =>
															updateService(index, 'iconImage', {
																id: null,
																url: '',
																alt: '',
															})
														}
													>
														{__('Remove Icon', 'xgenious-ui-blocks')}
													</Button>
												</div>
											) : (
												<Button variant="primary" onClick={open}>
													{__('Upload Icon', 'xgenious-ui-blocks')}
												</Button>
											)}
										</div>
									)}
								/>
							</MediaUploadCheck>
						)}

						<TextControl
							label={__('Title', 'xgenious-ui-blocks')}
							value={service.title}
							onChange={(value) => updateService(index, 'title', value)}
						/>

						<TextControl
							label={__('Description', 'xgenious-ui-blocks')}
							value={service.description}
							onChange={(value) => updateService(index, 'description', value)}
							help={__('Short description of the service', 'xgenious-ui-blocks')}
						/>

						<div style={{ marginTop: '16px' }}>
							<Button
								isDestructive
								variant="secondary"
								onClick={() => removeService(index)}
							>
								{__('Remove Service', 'xgenious-ui-blocks')}
							</Button>
						</div>
					</PanelBody>
				))}

				<PanelBody>
					<Button variant="primary" onClick={addService}>
						{__('Add Service', 'xgenious-ui-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="service-box-container">
					{/* Section Title */}
					<RichText
						tagName="h2"
						className="section-title"
						value={sectionTitle}
						onChange={(value) => setAttributes({ sectionTitle: value })}
						placeholder={__('Enter section title...', 'xgenious-ui-blocks')}
					/>

					{/* Services Grid */}
					<div className={`services-grid columns-${columns}`}>
						{services.map((service, index) => (
							<div
								key={index}
								className="service-box"
								style={{ backgroundColor: boxBackgroundColor }}
							>
								{service.iconType === 'custom' && service.iconImage?.url ? (
									<img
										src={service.iconImage.url}
										alt={service.iconImage.alt || service.title}
										className="service-icon custom-icon"
									/>
								) : (
									<span
										className={`dashicons dashicons-${service.icon} service-icon`}
										style={{ color: iconColor }}
									></span>
								)}

								<h3 className="service-title" style={{ color: titleColor }}>
									{service.title}
								</h3>

								<p className="service-description" style={{ color: textColor }}>
									{service.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
