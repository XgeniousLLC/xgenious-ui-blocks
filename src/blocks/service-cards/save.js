/**
 * Service Cards Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { sectionTitle, titleColor, columns, services, cardTitleColor, cardDescColor, cardBgColor } = attributes;

	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className="xg-service-cards">
				<div className="service-cards-container">
					{sectionTitle && (
						<RichText.Content
							tagName="h2"
							className="section-title"
							value={sectionTitle}
							style={{ color: titleColor }}
						/>
					)}

					<div className={`services-grid columns-${columns}`}>
						{services.map((service, index) => {
							const hasUrl = service.url && service.url.trim() !== '';
							const target = service.linkTarget === '_blank' ? '_blank' : '_self';
							const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

							const cardInner = (
								<>
									<div className={`service-card-image ${!service.image?.url ? 'has-placeholder' : ''}`}>
										{service.image?.url && (
											<img src={service.image.url} alt={service.image.alt || service.title} />
										)}
									</div>

									<div className="service-card-content">
										{service.title && (
											<RichText.Content
												tagName="h3"
												className="service-card-title"
												value={service.title}
												style={{ color: cardTitleColor }}
											/>
										)}
										{service.description && (
											<RichText.Content
												tagName="p"
												className="service-card-description"
												value={service.description}
												style={{ color: cardDescColor }}
											/>
										)}
									</div>
								</>
							);

							return hasUrl ? (
								<a
									key={index}
									href={service.url}
									target={target}
									rel={rel}
									className="service-card service-card--linked"
									style={{ backgroundColor: cardBgColor }}
								>
									{cardInner}
								</a>
							) : (
								<div key={index} className="service-card" style={{ backgroundColor: cardBgColor }}>
									{cardInner}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
