/**
 * Logo Carousel Block - Edit Component
 */

import { useBlockProps, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, Button, ColorPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
	const {
		logos,
		backgroundColor,
		logoHeight,
		logoGap,
		paddingTop,
		paddingBottom,
		fadeWidth,
		grayscale,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-logo-carousel',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	const addLogo = () => {
		const newLogos = [
			...logos,
			{
				id: null,
				url: '',
				alt: `Logo ${logos.length + 1}`,
				link: '',
			},
		];
		setAttributes({ logos: newLogos });
	};

	const updateLogo = (index, field, value) => {
		const newLogos = [...logos];
		newLogos[index][field] = value;
		setAttributes({ logos: newLogos });
	};

	const removeLogo = (index) => {
		const newLogos = logos.filter((_, i) => i !== index);
		setAttributes({ logos: newLogos });
	};

	return (
		<>
			<InspectorControls>
				{/* Logo Settings */}
				<PanelBody title={__('Logo Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<RangeControl
						label={__('Logo Height (px)', 'xgenious-ui-blocks')}
						value={logoHeight}
						onChange={(value) => setAttributes({ logoHeight: value })}
						min={20}
						max={100}
						step={5}
					/>
					<RangeControl
						label={__('Logo Gap (px)', 'xgenious-ui-blocks')}
						value={logoGap}
						onChange={(value) => setAttributes({ logoGap: value })}
						min={20}
						max={120}
						step={10}
					/>
					<ToggleControl
						label={__('Grayscale Effect', 'xgenious-ui-blocks')}
						checked={grayscale}
						onChange={(value) => setAttributes({ grayscale: value })}
					/>
				</PanelBody>

				{/* Fade Effect */}
				<PanelBody title={__('Fade Effect', 'xgenious-ui-blocks')} initialOpen={false}>
					<RangeControl
						label={__('Fade Width (px)', 'xgenious-ui-blocks')}
						value={fadeWidth}
						onChange={(value) => setAttributes({ fadeWidth: value })}
						min={60}
						max={200}
						step={10}
					/>
				</PanelBody>

				{/* Colors */}
				<PanelBody title={__('Colors', 'xgenious-ui-blocks')} initialOpen={false}>
					<p>{__('Background Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={backgroundColor}
						onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
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
				</PanelBody>

				{/* Manage Logos */}
				<PanelBody title={__('Manage Logos', 'xgenious-ui-blocks')} initialOpen={false}>
					{logos.map((logo, index) => (
						<PanelBody
							key={index}
							title={`${__('Logo', 'xgenious-ui-blocks')} ${index + 1}`}
							initialOpen={false}
						>
							<MediaUpload
								onSelect={(media) => updateLogo(index, 'url', media.url)}
								allowedTypes={['image']}
								value={logo.id}
								render={({ open }) => (
									<div style={{ marginBottom: '12px' }}>
										{logo.url ? (
											<div>
												<img
													src={logo.url}
													alt={logo.alt}
													style={{ width: '100%', marginBottom: '8px' }}
												/>
												<Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
													{__('Replace', 'xgenious-ui-blocks')}
												</Button>
											</div>
										) : (
											<Button variant="primary" onClick={open}>
												{__('Select Logo', 'xgenious-ui-blocks')}
											</Button>
										)}
									</div>
								)}
							/>
							<Button
								variant="secondary"
								isDestructive
								onClick={() => removeLogo(index)}
							>
								{__('Remove Logo', 'xgenious-ui-blocks')}
							</Button>
						</PanelBody>
					))}
					<Button variant="primary" onClick={addLogo}>
						{__('Add Logo', 'xgenious-ui-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="xg-container">
					<div className="logo-carousel-wrapper">
						<div
							className={`logo-carousel-track ${grayscale ? 'grayscale-effect' : ''}`}
							style={{ gap: `${logoGap}px` }}
						>
							{logos.length > 0 ? (
								logos.map((logo, index) => (
									<div key={index} className="logo-item">
										{logo.url ? (
											<img
												src={logo.url}
												alt={logo.alt}
												style={{ height: `${logoHeight}px` }}
											/>
										) : (
											<div
												className="logo-placeholder"
												style={{ height: `${logoHeight}px`, width: '120px' }}
											>
												{__('Logo', 'xgenious-ui-blocks')} {index + 1}
											</div>
										)}
									</div>
								))
							) : (
								<p style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
									{__('Add logos from the sidebar settings', 'xgenious-ui-blocks')}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
