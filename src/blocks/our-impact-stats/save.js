/**
 * Our Impact Stats Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		heading,
		stats,
		backgroundColor,
		cardBackgroundColor,
		headingColor,
		indexColor,
		numberColor,
		labelColor,
		columns,
		gap,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'xg-impact-stats',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	return (
		<div {...blockProps}>
			<div className="xg-container">
				{/* Heading */}
				<RichText.Content
					tagName="h2"
					className="impact-heading"
					value={heading}
					style={{ color: headingColor }}
				/>

				{/* Stats Grid */}
				<div
					className="stats-grid"
					style={{
						gridTemplateColumns: `repeat(${columns}, 1fr)`,
						gap: `${gap}px`,
					}}
				>
					{stats.map((stat, index) => (
						<div
							key={index}
							className="stat-card"
							style={{ backgroundColor: cardBackgroundColor }}
						>
							<span className="stat-index" style={{ color: indexColor }}>
								{stat.index}
							</span>

							<div className="stat-number" style={{ color: numberColor }}>
								{stat.number}
								<span className="stat-suffix">{stat.suffix}</span>
							</div>

							<div className="stat-label" style={{ color: labelColor }}>
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
