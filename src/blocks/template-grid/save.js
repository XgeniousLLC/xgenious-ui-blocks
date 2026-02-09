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
					/>
				)}

				{/* Templates Grid */}
				<div className={`templates-grid columns-${columns}`}>
					{templates.map((template, index) => (
						<div
							key={index}
							className="template-card"
							style={{ backgroundColor: cardBackgroundColor }}
						>
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
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
