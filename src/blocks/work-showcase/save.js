/**
 * Work Showcase Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

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
							const cardContent = (
								<div
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
										{project.image?.url && (
											<img
												src={project.image.url}
												alt={project.image.alt || project.title}
											/>
										)}
									</div>

									{/* 3. Gradient overlay — on top of image */}
									<div
										className="project-overlay"
										style={{
											background: `linear-gradient(to top, ${project.gradientColor} 0%, transparent 100%)`,
										}}
									></div>

									{/* Content absolutely positioned over overlay */}
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
										<div className="project-arrow">
											<ArrowIcon />
										</div>
									</div>
								</div>
							);

							return project.link ? (
								<a
									key={index}
									href={project.link}
									className="project-card-link"
								>
									{cardContent}
								</a>
							) : (
								<div key={index} className="project-card-wrap">
									{cardContent}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
