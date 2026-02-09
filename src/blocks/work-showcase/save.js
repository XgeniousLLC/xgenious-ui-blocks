/**
 * Work Showcase Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className="xg-work-showcase" style={{ backgroundColor: bgColor }}>
				<div className="work-showcase-container">
					<div className="showcase-header">
						{sectionTitle && (
							<RichText.Content
								tagName="h2"
								className="showcase-title"
								value={sectionTitle}
								style={{ color: titleColor }}
							/>
						)}
						{showButton && buttonText && (
							<a
								href={buttonUrl || '#'}
								className="showcase-button"
								style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
							>
								<RichText.Content tagName="span" value={buttonText} />
							</a>
						)}
					</div>

					<div className="projects-grid">
						{projects.map((project, index) => {
							const ProjectWrapper = project.link ? 'a' : 'div';
							const wrapperProps = project.link
								? { href: project.link, className: 'project-card-link' }
								: {};

							return (
								<ProjectWrapper key={index} {...wrapperProps}>
									<div
										className="project-card"
										style={{
											background: `linear-gradient(135deg, ${project.gradientColor} 0%, ${project.gradientColor}80 100%)`,
										}}
									>
										{project.image.url && (
											<div className="project-image">
												<img src={project.image.url} alt={project.image.alt || project.title} />
											</div>
										)}

										<div className="project-info">
											<div className="project-content">
												{project.title && (
													<RichText.Content
														tagName="h3"
														className="project-title"
														value={project.title}
														style={{ color: cardTitleColor }}
													/>
												)}
												{project.subtitle && (
													<RichText.Content
														tagName="p"
														className="project-subtitle"
														value={project.subtitle}
														style={{ color: cardSubtitleColor }}
													/>
												)}
											</div>
											<div
												className="project-arrow"
												style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
											>
												→
											</div>
										</div>
									</div>
								</ProjectWrapper>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
