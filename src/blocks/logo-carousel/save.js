/**
 * Logo Carousel Block - Save Component
 */

import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		logos,
		backgroundColor,
		logoHeight,
		logoGap,
		paddingTop,
		paddingBottom,
		grayscale,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'xg-logo-carousel',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	return (
		<div {...blockProps}>
			<div className="xg-container">
				<div className="logo-carousel-wrapper">
					<div
						className={`logo-carousel-track ${grayscale ? 'grayscale-effect' : ''}`}
						style={{ gap: `${logoGap}px` }}
					>
						{logos.map((logo, index) =>
							logo.url ? (
								<div key={index} className="logo-item">
									{logo.link ? (
										<a href={logo.link} target="_blank" rel="noopener noreferrer">
											<img
												src={logo.url}
												alt={logo.alt || `Logo ${index + 1}`}
												style={{ height: `${logoHeight}px` }}
											/>
										</a>
									) : (
										<img
											src={logo.url}
											alt={logo.alt || `Logo ${index + 1}`}
											style={{ height: `${logoHeight}px` }}
										/>
									)}
								</div>
							) : null
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
