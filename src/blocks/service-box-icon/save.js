/**
 * Service Box with Icon Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		sectionTitle,
		services,
		columns,
		backgroundColor,
		boxBackgroundColor,
		titleColor,
		textColor,
		iconColor,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'xg-service-box-icon',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	return (
		<div {...blockProps}>
			<div className="service-box-container">
				{/* Section Title */}
				{sectionTitle && (
					<RichText.Content
						tagName="h2"
						className="section-title"
						value={sectionTitle}
					/>
				)}

				{/* Services Grid */}
				<div className={`services-grid columns-${columns}`}>
					{services.map((service, index) => {
						const hasUrl = service.url && service.url.trim() !== '';
						const target = service.linkTarget === '_blank' ? '_blank' : '_self';
						const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

						const icon =
							service.iconType === 'custom' && service.iconImage?.url ? (
								<img
									src={service.iconImage.url}
									alt={service.iconImage.alt || service.title}
									className="service-icon custom-icon"
								/>
							) : (
								<span
									className={`dashicons dashicons-${service.icon} service-icon`}
									style={{ color: iconColor }}
								></span>
							);

						return (
							<div
								key={index}
								className="service-box"
								style={{ backgroundColor: boxBackgroundColor }}
							>
								{/* Icon — linked if URL is set */}
								{hasUrl ? (
									<a
										href={service.url}
										target={target}
										rel={rel}
										className="service-icon-link"
										tabIndex="-1"
										aria-hidden="true"
									>
										{icon}
									</a>
								) : (
									icon
								)}

								{/* Title — linked if URL is set */}
								<h3 className="service-title" style={{ color: titleColor }}>
									{hasUrl ? (
										<a
											href={service.url}
											target={target}
											rel={rel}
											style={{ color: titleColor }}
										>
											{service.title}
										</a>
									) : (
										service.title
									)}
								</h3>

								<p className="service-description" style={{ color: textColor }}>
									{service.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
