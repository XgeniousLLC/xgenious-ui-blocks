/**
 * Logo Grid Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, RangeControl, ToggleControl, TextControl, ColorPicker } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { logos, columns, logoHeight, showDividers, dividerColor, grayscaleEffect } = attributes;

	const updateLogo = (index, field, value) => {
		const newLogos = [...logos];
		newLogos[index] = { ...newLogos[index], [field]: value };
		setAttributes({ logos: newLogos });
	};

	const addLogo = () => {
		setAttributes({
			logos: [...logos, { id: null, url: '', alt: `Partner Logo ${logos.length + 1}`, link: '' }]
		});
	};

	const removeLogo = (index) => {
		const newLogos = logos.filter((_, i) => i !== index);
		setAttributes({ logos: newLogos });
	};

	const blockProps = useBlockProps({
		className: `logo-grid-showcase ${grayscaleEffect ? 'grayscale-effect' : ''}`
	});

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<RangeControl
						label={__('Columns', 'xgenious-ui-blocks')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={2}
						max={8}
					/>
					<RangeControl
						label={__('Logo Height (px)', 'xgenious-ui-blocks')}
						value={logoHeight}
						onChange={(value) => setAttributes({ logoHeight: value })}
						min={20}
						max={100}
					/>
				</PanelBody>

				<PanelBody title={__('Divider Settings', 'xgenious-ui-blocks')} initialOpen={false}>
					<ToggleControl
						label={__('Show Dividers', 'xgenious-ui-blocks')}
						checked={showDividers}
						onChange={(value) => setAttributes({ showDividers: value })}
					/>
					{showDividers && (
						<div style={{ marginTop: '16px' }}>
							<p style={{ marginBottom: '8px' }}>{__('Divider Color', 'xgenious-ui-blocks')}</p>
							<ColorPicker
								color={dividerColor}
								onChangeComplete={(value) => setAttributes({ dividerColor: value.hex })}
							/>
						</div>
					)}
				</PanelBody>

				<PanelBody title={__('Style Settings', 'xgenious-ui-blocks')} initialOpen={false}>
					<ToggleControl
						label={__('Grayscale Effect', 'xgenious-ui-blocks')}
						help={__('Logos appear grayscale until hover', 'xgenious-ui-blocks')}
						checked={grayscaleEffect}
						onChange={(value) => setAttributes({ grayscaleEffect: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Logo Management', 'xgenious-ui-blocks')} initialOpen={false}>
					{logos.map((logo, index) => (
						<div key={index} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
							<h4>{__(`Logo ${index + 1}`, 'xgenious-ui-blocks')}</h4>

							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => {
										updateLogo(index, 'id', media.id);
										updateLogo(index, 'url', media.url);
										updateLogo(index, 'alt', media.alt || `Logo ${index + 1}`);
									}}
									allowedTypes={['image']}
									value={logo.id}
									render={({ open }) => (
										<div style={{ marginBottom: '10px' }}>
											{logo.url ? (
												<div>
													<img src={logo.url} alt={logo.alt} style={{ maxWidth: '100%', height: 'auto', marginBottom: '8px' }} />
													<Button onClick={open} variant="secondary" style={{ marginRight: '8px' }}>
														{__('Change Image', 'xgenious-ui-blocks')}
													</Button>
													<Button
														onClick={() => {
															updateLogo(index, 'id', null);
															updateLogo(index, 'url', '');
														}}
														variant="secondary"
														isDestructive
													>
														{__('Remove Image', 'xgenious-ui-blocks')}
													</Button>
												</div>
											) : (
												<Button onClick={open} variant="primary">
													{__('Upload Logo', 'xgenious-ui-blocks')}
												</Button>
											)}
										</div>
									)}
								/>
							</MediaUploadCheck>

							<TextControl
								label={__('Alt Text', 'xgenious-ui-blocks')}
								value={logo.alt}
								onChange={(value) => updateLogo(index, 'alt', value)}
								style={{ marginBottom: '10px' }}
							/>

							<TextControl
								label={__('Link URL (optional)', 'xgenious-ui-blocks')}
								value={logo.link}
								onChange={(value) => updateLogo(index, 'link', value)}
								placeholder="https://example.com"
								style={{ marginBottom: '10px' }}
							/>

							<Button
								onClick={() => removeLogo(index)}
								variant="secondary"
								isDestructive
							>
								{__('Remove Logo', 'xgenious-ui-blocks')}
							</Button>
						</div>
					))}

					<Button onClick={addLogo} variant="primary">
						{__('Add Logo', 'xgenious-ui-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div className="xg-container">
				<div
					className="logo-grid"
					style={{
						'--logo-columns': columns,
						'--logo-height': `${logoHeight}px`,
						'--divider-color': showDividers ? dividerColor : 'transparent'
					}}
				>
					{logos.map((logo, index) => (
						<div key={index} className="logo-grid-item">
							{logo.url ? (
								<img src={logo.url} alt={logo.alt} />
							) : (
								<div className="logo-placeholder">
									{__('Logo', 'xgenious-ui-blocks')} {index + 1}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
