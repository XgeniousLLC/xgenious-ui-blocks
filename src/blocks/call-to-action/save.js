/**
 * Call to Action Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		heading,
		description,
		buttonText,
		buttonUrl,
		buttonNewTab,
		backgroundImage,
		personImage,
		backgroundColor,
		overlayColor,
		overlayOpacity,
		headingColor,
		descriptionColor,
		buttonColor,
		buttonTextColor,
		paddingTop,
		paddingBottom,
		borderRadius,
		fullWidth,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'xg-cta-section',
		style: {
			backgroundColor,
			backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
			borderRadius: `${borderRadius}px`,
			position: 'relative',
			overflow: 'hidden',
		},
	});

	const overlayStyle = {
		backgroundColor: overlayColor,
		opacity: overlayOpacity / 100,
	};

	return (
		<div {...blockProps}>
			{/* Background Overlay */}
			{backgroundImage.url && <div className="cta-overlay" style={overlayStyle}></div>}

			{/* Content */}
			<div className={fullWidth ? 'cta-content-full' : 'xg-container'}>
				<div className="cta-content">
					<div className="cta-text">
						{heading && (
							<RichText.Content
								tagName="h2"
								className="cta-heading"
								value={heading}
								style={{ color: headingColor }}
							/>
						)}

						{description && (
							<RichText.Content
								tagName="p"
								className="cta-description"
								value={description}
								style={{ color: descriptionColor }}
							/>
						)}

						{buttonText && (
							<div className="cta-button-wrapper">
								<a
									href={buttonUrl}
									className="cta-button"
									target={buttonNewTab ? '_blank' : '_self'}
									rel={buttonNewTab ? 'noopener noreferrer' : undefined}
									style={{
										backgroundColor: buttonColor,
										color: buttonTextColor,
									}}
								>
									{buttonText}
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="button-arrow"
									>
										<path
											d="M7.5 15L12.5 10L7.5 5"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</a>
							</div>
						)}
					</div>

					{/* Person Image */}
					{personImage.url && (
						<div className="cta-person">
							<img src={personImage.url} alt={personImage.alt || 'Person'} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
