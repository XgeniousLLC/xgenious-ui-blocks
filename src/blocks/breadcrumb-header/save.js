/**
 * Breadcrumb Header Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		heading,
		description,
		image,
		backgroundColor,
		headingColor,
		descriptionColor,
		paddingTop,
		paddingBottom,
		imagePosition,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'xg-breadcrumb-header',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	return (
		<div {...blockProps}>
			<div className="xg-container">
				<div className={`breadcrumb-header-wrapper image-${imagePosition}`}>
					{/* Content Section */}
					<div className="breadcrumb-content">
						<RichText.Content
							tagName="h1"
							className="breadcrumb-heading"
							value={heading}
							style={{ color: headingColor }}
						/>

						<RichText.Content
							tagName="p"
							className="breadcrumb-description"
							value={description}
							style={{ color: descriptionColor }}
						/>
					</div>

					{/* Image Section */}
					{image.url && (
						<div className="breadcrumb-image">
							<img src={image.url} alt={image.alt || heading} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
