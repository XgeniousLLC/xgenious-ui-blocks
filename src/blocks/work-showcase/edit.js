/**
 * Work Showcase Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	Button,
	ColorPicker,
	TextControl,
	__experimentalText as Text,
	__experimentalVStack as VStack,
} from '@wordpress/components';

/* Inline SVG arrow icon */
const ArrowIcon = () => (
	<svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clipPath="url(#clip0_work_arrow)">
			<path
				d="M0.376548 11.8061L9.61234 2.57031H4.14271C3.80187 2.57031 3.47498 2.43491 3.23397 2.1939C2.99296 1.95289 2.85756 1.626 2.85756 1.28516C2.85756 0.944312 2.99296 0.617427 3.23397 0.376414C3.47498 0.1354 3.80187 0 4.14271 0L12.715 0C13.0558 0 13.3827 0.1354 13.6237 0.376414C13.8647 0.617427 14.0001 0.944312 14.0001 1.28516V9.85742C14.0001 10.1983 13.8647 10.5252 13.6237 10.7662C13.3827 11.0072 13.0558 11.1426 12.715 11.1426C12.3741 11.1426 12.0472 11.0072 11.8062 10.7662C11.5652 10.5252 11.4298 10.1983 11.4298 9.85742V4.3878L2.19403 13.6236C1.95293 13.8642 1.62618 13.9992 1.28557 13.999C0.944965 13.9989 0.618359 13.8635 0.377512 13.6226C0.136666 13.3818 0.00127955 13.0552 0.00109881 12.7146C0.000918075 12.374 0.135958 12.0472 0.376548 11.8061Z"
				fill="currentColor"
			/>
		</g>
		<defs>
			<clipPath id="clip0_work_arrow">
				<rect width="14" height="14" fill="white" />
			</clipPath>
		</defs>
	</svg>
);

export default function Edit({ attributes, setAttributes }) {
	const {
		sectionTitle,
		buttonText,
		buttonUrl,
		showButton,
		projects,
		bgColor,
		titleColor,
		buttonBgColor,
		buttonTextColor,
		cardTitleColor,
		cardSubtitleColor,
	} = attributes;

	const blockProps = useBlockProps();

	const addProject = () => {
		setAttributes({
			projects: [
				...projects,
				{
					image: { url: '', id: 0, alt: '' },
					title: 'New Project',
					subtitle: 'Project description',
					link: '',
					gradientColor: '#7B9FF8',
				},
			],
		});
	};

	const updateProject = (index, field, value) => {
		const updated = [...projects];
		updated[index] = { ...updated[index], [field]: value };
		setAttributes({ projects: updated });
	};

	const removeProject = (index) => {
		setAttributes({ projects: projects.filter((_, i) => i !== index) });
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Button Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<ToggleControl
						label={__('Show Button', 'xgenious-ui-blocks')}
						checked={showButton}
						onChange={(value) => setAttributes({ showButton: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'xgenious-ui-blocks')} initialOpen={false}>
					<VStack spacing={3}>
						<Text variant="label">{__('Background Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker color={bgColor} onChange={(value) => setAttributes({ bgColor: value })} />
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Title Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker color={titleColor} onChange={(value) => setAttributes({ titleColor: value })} />
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Button Background', 'xgenious-ui-blocks')}</Text>
						<ColorPicker color={buttonBgColor} onChange={(value) => setAttributes({ buttonBgColor: value })} />
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Button Text Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker color={buttonTextColor} onChange={(value) => setAttributes({ buttonTextColor: value })} />
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Card Title Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker color={cardTitleColor} onChange={(value) => setAttributes({ cardTitleColor: value })} />
					</VStack>
					<VStack spacing={3}>
						<Text variant="label">{__('Card Subtitle Color', 'xgenious-ui-blocks')}</Text>
						<ColorPicker
							color={cardSubtitleColor}
							onChange={(value) => setAttributes({ cardSubtitleColor: value })}
						/>
					</VStack>
				</PanelBody>

				{/* Per-project panels */}
				{projects.map((project, index) => (
					<PanelBody
						key={index}
						title={`${__('Project', 'xgenious-ui-blocks')} #${index + 1}${project.title ? `: ${project.title}` : ''}`}
						initialOpen={false}
					>
						{/* Image */}
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									updateProject(index, 'image', { url: media.url, id: media.id, alt: media.alt || '' })
								}
								allowedTypes={['image']}
								value={project.image?.id}
								render={({ open }) => (
									<div style={{ marginBottom: '12px' }}>
										<p style={{ marginBottom: '6px', fontWeight: '500' }}>
											{__('Image', 'xgenious-ui-blocks')}
										</p>
										{project.image?.url ? (
											<>
												<img
													src={project.image.url}
													alt={project.image.alt}
													style={{
														width: '100%',
														height: '80px',
														objectFit: 'cover',
														borderRadius: '6px',
														marginBottom: '8px',
														display: 'block',
													}}
												/>
												<Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
													{__('Replace Image', 'xgenious-ui-blocks')}
												</Button>
												<Button
													isDestructive
													onClick={() =>
														updateProject(index, 'image', { url: '', id: 0, alt: '' })
													}
												>
													{__('Remove', 'xgenious-ui-blocks')}
												</Button>
											</>
										) : (
											<Button variant="primary" onClick={open}>
												{__('Upload Image', 'xgenious-ui-blocks')}
											</Button>
										)}
									</div>
								)}
							/>
						</MediaUploadCheck>

						{/* Title */}
						<TextControl
							label={__('Title', 'xgenious-ui-blocks')}
							value={project.title}
							onChange={(value) => updateProject(index, 'title', value)}
						/>

						{/* Subtitle */}
						<TextControl
							label={__('Subtitle', 'xgenious-ui-blocks')}
							value={project.subtitle}
							onChange={(value) => updateProject(index, 'subtitle', value)}
						/>

						{/* Link */}
						<TextControl
							label={__('Link URL', 'xgenious-ui-blocks')}
							value={project.link}
							onChange={(value) => updateProject(index, 'link', value)}
							placeholder="https://"
							type="url"
						/>

						{/* Background / overlay color */}
						<div style={{ marginTop: '8px' }}>
							<p style={{ marginBottom: '6px', fontWeight: '500' }}>
								{__('Card Background Color', 'xgenious-ui-blocks')}
							</p>
							<p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
								{__('Used as the solid card background and gradient overlay color', 'xgenious-ui-blocks')}
							</p>
							<ColorPicker
								color={project.gradientColor}
								onChange={(value) => updateProject(index, 'gradientColor', value)}
							/>
						</div>

						<Button
							isDestructive
							variant="secondary"
							onClick={() => removeProject(index)}
							style={{ marginTop: '8px' }}
						>
							{__('Remove Project', 'xgenious-ui-blocks')}
						</Button>
					</PanelBody>
				))}

				<PanelBody>
					<Button variant="primary" onClick={addProject}>
						{__('Add Project', 'xgenious-ui-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div className="xg-work-showcase" style={{ backgroundColor: bgColor }}>
				<div className="work-showcase-container">
					<div className="showcase-header">
						<RichText
							tagName="h2"
							className="showcase-title"
							value={sectionTitle}
							onChange={(value) => setAttributes({ sectionTitle: value })}
							placeholder={__('Enter section title...', 'xgenious-ui-blocks')}
							style={{ color: titleColor }}
						/>
						{showButton && (
							<div className="showcase-button-wrapper">
								<RichText
									tagName="span"
									className="showcase-button"
									value={buttonText}
									onChange={(value) => setAttributes({ buttonText: value })}
									placeholder={__('Button text...', 'xgenious-ui-blocks')}
									style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
								/>
								<URLInput
									value={buttonUrl}
									onChange={(value) => setAttributes({ buttonUrl: value })}
								/>
							</div>
						)}
					</div>

					<div className="projects-grid">
						{projects.map((project, index) => (
							<div
								key={index}
								className="project-card"
								style={{ backgroundColor: project.gradientColor }}
							>
								{/* 1. Solid color overlay — behind image */}
								<div
									className="project-color-overlay"
									style={{ backgroundColor: project.gradientColor }}
								></div>

								{/* 2. Background image — on top of solid overlay */}
								<div className="project-image">
									{project.image?.url ? (
										<img src={project.image.url} alt={project.image.alt || project.title} />
									) : (
										<div className="image-placeholder">
											<span className="dashicons dashicons-format-image"></span>
											<p>{__('Upload image in sidebar', 'xgenious-ui-blocks')}</p>
										</div>
									)}
								</div>

								{/* 3. Gradient overlay — on top of image */}
								<div
									className="project-overlay"
									style={{
										background: `linear-gradient(to top, ${project.gradientColor} 0%, transparent 100%)`,
									}}
								></div>

								{/* Content over overlay */}
								<div className="project-info">
									<div className="project-content">
										<RichText
											tagName="h3"
											className="project-title"
											value={project.title}
											onChange={(value) => updateProject(index, 'title', value)}
											placeholder={__('Project title...', 'xgenious-ui-blocks')}
											style={{ color: cardTitleColor }}
										/>
										<RichText
											tagName="p"
											className="project-subtitle"
											value={project.subtitle}
											onChange={(value) => updateProject(index, 'subtitle', value)}
											placeholder={__('Project subtitle...', 'xgenious-ui-blocks')}
											style={{ color: cardSubtitleColor }}
										/>
									</div>
									<div className="project-arrow">
										<ArrowIcon />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
