/**
 * Our Achievements Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		sectionTitle,
		achievements,
		backgroundColor,
		titleColor,
		cardBackgroundColor,
		labelColor,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'xg-achievements',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	return (
		<div {...blockProps}>
			<div className="xg-container">
				{/* Section Title */}
				<RichText.Content
					tagName="h2"
					className="achievements-title"
					value={sectionTitle}
					style={{ color: titleColor }}
				/>

				{/* Achievements Grid */}
				<div className="achievements-grid">
					{achievements.map((achievement, index) =>
						achievement.icon.url ? (
							<div
								key={index}
								className="achievement-card"
								style={{ backgroundColor: cardBackgroundColor }}
							>
								<div className="achievement-icon">
									<img src={achievement.icon.url} alt={achievement.icon.alt || achievement.label} />
								</div>

								<div className="achievement-label" style={{ color: labelColor }}>
									{achievement.label}
								</div>
							</div>
						) : null
					)}
				</div>
			</div>
		</div>
	);
}
