/**
 * Image and Content Box Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		image,
		heading,
		description,
		buttonText,
		buttonUrl,
		showArrowButton,
		imagePosition,
		backgroundColor,
		headingColor,
		descriptionColor,
		buttonColor,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'xg-image-content-box',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	return (
		<div {...blockProps}>
			<div className="xg-container">
				<div className={`content-box-wrapper image-${imagePosition}`}>
					{/* Image Section */}
					{image.url && (
						<div className="content-box-image">
							<img src={image.url} alt={image.alt || heading} />
						</div>
					)}

					{/* Content Section */}
					<div className="content-box-content">
						<RichText.Content
							tagName="h2"
							className="content-box-heading"
							value={heading}
							style={{ color: headingColor }}
						/>

						<RichText.Content
							tagName="p"
							className="content-box-description"
							value={description}
							style={{ color: descriptionColor }}
						/>

						<div className="content-box-buttons">
							<a
								href={buttonUrl}
								className="content-box-button"
								style={{ backgroundColor: buttonColor }}
							>
								{buttonText}
							</a>
							{showArrowButton && (
								<a
									href={buttonUrl}
									className="content-box-arrow"
									style={{ backgroundColor: buttonColor }}
								>
									→
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
