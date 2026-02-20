/**
 * Logo Showcase Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
        logos,
        backgroundColor,
        textColor,
        contentAlignment,
        logoSize,
        logoGap,
        paddingTop,
        paddingBottom,
        innerPaddingTop,
        innerPaddingBottom,
        showTopBorder,
        showBottomBorder,
        grayscale,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `xg-logo-showcase align-${contentAlignment}`,
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const logoSizeClass = {
        small: 'logo-size-sm',
        medium: 'logo-size-md',
        large: 'logo-size-lg',
    }[logoSize] || 'logo-size-md';

    return (
        <div {...blockProps}>
            <div className={`xg-container ${showTopBorder ? 'has-top-border' : ''} ${showBottomBorder ? 'has-bottom-border' : ''}`}>
                <div className="logo-showcase-inner" style={{ paddingTop: `${innerPaddingTop}px`, paddingBottom: `${innerPaddingBottom}px` }}>
                    <div className="xg-row">
                        {/* Heading - Left Side */}
                        <div className="logo-showcase-heading">
                            {heading && (
                                <RichText.Content
                                    tagName="h2"
                                    className="showcase-title"
                                    value={heading}
                                />
                            )}
                        </div>

                        {/* Logos - Right Side */}
                        <div
                            className={`logo-showcase-grid ${logoSizeClass} ${grayscale ? 'grayscale-effect' : ''}`}
                            style={{ gap: `${logoGap}px` }}
                        >
                            {logos.map((logo, index) => (
                                <div key={index} className="logo-item">
                                    {logo.link ? (
                                        <a
                                            href={logo.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img src={logo.url} alt={logo.alt || `Logo ${index + 1}`} />
                                        </a>
                                    ) : (
                                        <img src={logo.url} alt={logo.alt || `Logo ${index + 1}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
