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
		const newProjects = [
			...projects,
			{
				image: { url: '', id: 0, alt: '' },
				title: 'New Project',
				subtitle: 'Project description',
				link: '',
				gradientColor: '#7B9FF8',
			},
		];
		setAttributes({ projects: newProjects });
	};

	const updateProject = (index, field, value) => {
		const newProjects = [...projects];
		newProjects[index][field] = value;
		setAttributes({ projects: newProjects });
	};

	const removeProject = (index) => {
		const newProjects = projects.filter((_, i) => i !== index);
		setAttributes({ projects: newProjects });
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

				<PanelBody title={__('Projects', 'xgenious-ui-blocks')} initialOpen={false}>
					{projects.map((project, index) => (
						<div
							key={index}
							style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}
						>
							<Text variant="label">
								{__('Project', 'xgenious-ui-blocks')} #{index + 1}
							</Text>
							<TextControl
								label={__('Gradient Color', 'xgenious-ui-blocks')}
								value={project.gradientColor}
								onChange={(value) => updateProject(index, 'gradientColor', value)}
								help={__('Hex color for card gradient background', 'xgenious-ui-blocks')}
							/>
							<Button isDestructive onClick={() => removeProject(index)} style={{ marginTop: '8px' }}>
								{__('Remove Project', 'xgenious-ui-blocks')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addProject}>
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
								style={{
									background: `linear-gradient(135deg, ${project.gradientColor} 0%, ${project.gradientColor}80 100%)`,
								}}
							>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) =>
											updateProject(index, 'image', {
												url: media.url,
												id: media.id,
												alt: media.alt,
											})
										}
										allowedTypes={['image']}
										value={project.image.id}
										render={({ open }) => (
											<div className="project-image" onClick={open}>
												{project.image.url ? (
													<img src={project.image.url} alt={project.image.alt || project.title} />
												) : (
													<div className="image-placeholder">
														<span className="dashicons dashicons-format-image"></span>
														<p>{__('Click to upload', 'xgenious-ui-blocks')}</p>
													</div>
												)}
											</div>
										)}
									/>
								</MediaUploadCheck>

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
									<div
										className="project-arrow"
										style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
									>
										→
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
