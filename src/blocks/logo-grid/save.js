/**
 * Logo Grid Block - Save Component
 */

import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { logos, columns, logoHeight, showDividers, dividerColor, grayscaleEffect } = attributes;

	const blockProps = useBlockProps.save({
		className: `logo-grid-showcase ${grayscaleEffect ? 'grayscale-effect' : ''}`
	});

	return (
		<div {...blockProps}>
			<div className="xg-container">
				<div
					className="logo-grid"
					style={{
						'--logo-columns': columns,
						'--logo-height': `${logoHeight}px`,
						'--divider-color': showDividers ? dividerColor : 'transparent'
					}}
				>
					{logos.map((logo, index) => (
						<div key={index} className="logo-grid-item">
							{logo.url && (
								logo.link ? (
									<a href={logo.link} target="_blank" rel="noopener noreferrer">
										<img src={logo.url} alt={logo.alt} />
									</a>
								) : (
									<img src={logo.url} alt={logo.alt} />
								)
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
