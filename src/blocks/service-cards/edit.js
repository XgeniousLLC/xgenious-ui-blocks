/**
 * Service Cards Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
	ColorPicker,
	__experimentalText as Text,
	__experimentalVStack as VStack,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { sectionTitle, titleColor, columns, services, cardTitleColor, cardDescColor, cardBgColor } = attributes;

	const blockProps = useBlockProps();

	const addService = () => {
		const newServices = [
			...services,
			{
				image: { url: '', id: 0, alt: '' },
				title: 'New Service',
				description: 'Service description goes here...',
			},
		];
		setAttributes({ services: newServices });
	};

	const updateService = (index, field, value) => {
		const newServices = [...services];
		newServices[index][field] = value;
		setAttributes({ services: newServices });
	};

	const removeService = (index) => {
		const newServices = services.filter((_, i) => i !== index);
		setAttributes({ services: newServices });
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<RangeControl
						label={__('Columns', 'xgenious-ui-blocks')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={4}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'xgenious-ui-blocks')} initialOpen={false}>
					<VStack spacing={3}>
						<Text variant="label">{__('Section Title Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker color={titleColor} onChange={(value) => setAttributes({ titleColor: value })} />
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Card Title Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker color={cardTitleColor} onChange={(value) => setAttributes({ cardTitleColor: value })} />
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Card Description Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker color={cardDescColor} onChange={(value) => setAttributes({ cardDescColor: value })} />
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Card Background Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker color={cardBgColor} onChange={(value) => setAttributes({ cardBgColor: value })} />
					</VStack>
				</PanelBody>

				<PanelBody title={__('Services', 'xgenious-ui-blocks')} initialOpen={false}>
					{services.map((service, index) => (
						<div key={index} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
							<Text variant="label">
								{__('Service', 'xgenious-ui-blocks')} #{index + 1}
							</Text>
							<Button isDestructive onClick={() => removeService(index)} style={{ marginTop: '8px' }}>
								{__('Remove Service', 'xgenious-ui-blocks')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addService}>
						{__('Add Service', 'xgenious-ui-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div className="xg-service-cards">
				<div className="service-cards-container">
					<RichText
						tagName="h2"
						className="section-title"
						value={sectionTitle}
						onChange={(value) => setAttributes({ sectionTitle: value })}
						placeholder={__('Enter section title...', 'xgenious-ui-blocks')}
						style={{ color: titleColor }}
					/>

					<div className={`services-grid columns-${columns}`}>
						{services.map((service, index) => (
							<div key={index} className="service-card" style={{ backgroundColor: cardBgColor }}>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) =>
											updateService(index, 'image', {
												url: media.url,
												id: media.id,
												alt: media.alt,
											})
										}
										allowedTypes={['image']}
										value={service.image.id}
										render={({ open }) => (
											<div className="service-card-image" onClick={open}>
												{service.image.url ? (
													<img src={service.image.url} alt={service.image.alt || service.title} />
												) : (
													<div className="image-placeholder">
														<span className="dashicons dashicons-format-image"></span>
														<p>{__('Click to upload image', 'xgenious-ui-blocks')}</p>
													</div>
												)}
											</div>
										)}
									/>
								</MediaUploadCheck>

								<div className="service-card-content">
									<RichText
										tagName="h3"
										className="service-card-title"
										value={service.title}
										onChange={(value) => updateService(index, 'title', value)}
										placeholder={__('Service title...', 'xgenious-ui-blocks')}
										style={{ color: cardTitleColor }}
									/>
									<RichText
										tagName="p"
										className="service-card-description"
										value={service.description}
										onChange={(value) => updateService(index, 'description', value)}
										placeholder={__('Service description...', 'xgenious-ui-blocks')}
										style={{ color: cardDescColor }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
