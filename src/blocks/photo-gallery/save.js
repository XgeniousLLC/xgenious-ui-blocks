/**
 * Photo Gallery Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		heading,
		description,
		images,
		columns,
		gap,
		backgroundColor,
		headingColor,
		descriptionColor,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'xg-photo-gallery',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	return (
		<div {...blockProps}>
			<div className="xg-container">
				{/* Header Section */}
				<div className="gallery-header">
					<div className="gallery-heading-wrapper">
						<RichText.Content
							tagName="h2"
							className="gallery-heading"
							value={heading}
							style={{ color: headingColor }}
						/>
					</div>

					<div className="gallery-description-wrapper">
						<RichText.Content
							tagName="p"
							className="gallery-description"
							value={description}
							style={{ color: descriptionColor }}
						/>
					</div>
				</div>

				{/* Gallery Grid */}
				{images.length > 0 && (
					<div
						className="gallery-grid"
						style={{
							gridTemplateColumns: `repeat(${columns}, 1fr)`,
							gap: `${gap}px`,
						}}
					>
						{images.map((image, index) => (
							<div key={index} className="gallery-item">
								<img src={image.url} alt={image.alt || `Gallery image ${index + 1}`} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
