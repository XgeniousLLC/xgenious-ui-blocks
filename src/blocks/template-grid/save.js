/**
 * Template Grid Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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
		titleAlignment,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'xg-template-grid',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	return (
		<div {...blockProps}>
			<div className="template-grid-container">
				{/* Section Title */}
				{sectionTitle && (
					<RichText.Content
						tagName="h2"
						className="section-title"
						value={sectionTitle}
						style={{ textAlign: titleAlignment }}
					/>
				)}

				{/* Templates Grid */}
				<div className={`templates-grid columns-${columns}`}>
					{templates.map((template, index) => {
						const hasUrl = template.url && template.url.trim() !== '';
						const target = template.linkTarget === '_blank' ? '_blank' : '_self';
						const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

						const cardInner = (
							<>
								{template.image?.url && (
									<div className="template-image">
										<img
											src={template.image.url}
											alt={template.image.alt || template.title}
										/>
									</div>
								)}

								<div className="template-content">
									<h3 className="template-title" style={{ color: titleColor }}>
										{template.title}
									</h3>
									<p className="template-subtitle" style={{ color: subtitleColor }}>
										{template.subtitle}
									</p>
								</div>
							</>
						);

						return hasUrl ? (
							<a
								key={index}
								href={template.url}
								target={target}
								rel={rel}
								className="template-card template-card--linked"
								style={{ backgroundColor: cardBackgroundColor }}
							>
								{cardInner}
							</a>
						) : (
							<div
								key={index}
								className="template-card"
								style={{ backgroundColor: cardBackgroundColor }}
							>
								{cardInner}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
