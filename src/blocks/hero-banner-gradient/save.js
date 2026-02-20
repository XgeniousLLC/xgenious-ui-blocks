/**
 * Hero Banner Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        badge,
        badgeIcon,
        heading,
        description,
        primaryButtonText,
        primaryButtonUrl,
        secondaryButtonText,
        secondaryButtonUrl,
        showSecondaryButton,
        backgroundImage,
        backgroundColor,
        textColor,
        primaryColor,
        contentAlignment,
        paddingTop,
        paddingBottom,
        enableDecorations,
        fullWidth,
        heroImage,
        showImage,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `xg-hero-banner xg-hero-gradient-wrap align-${contentAlignment} ${fullWidth ? 'alignfull' : ''}`,
        style: {
            backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <div {...blockProps}>
            {/* Decorations */}
            {enableDecorations && (
                <div className="hero-decorations">
                    <div className="decoration decoration-1"></div>
                    <div className="decoration decoration-2"></div>
                    <div className="decoration decoration-3"></div>
                </div>
            )}

            {/* Content Container */}
            <div className="xg-container">
                <div className="xg-row xg-align-center">
                    <div className="xg-col-12">
                        <div className="hero-content">
                            {/* Badge */}
                            {badge && (
                                <div className="hero-badge-wrap">
                                    <div className="xg-badge hero-badge">
                                        <span>{badge}</span>
                                        {badgeIcon && <span className="badge-icon">{badgeIcon}</span>}
                                    </div>
                                </div>
                            )}

                            {/* Heading */}
                            {heading && (
                                <RichText.Content
                                    tagName="h1"
                                    className="hero-heading xg-heading xg-h1"
                                    value={heading}
                                />
                            )}

                            {/* Description */}
                            {description && (
                                <RichText.Content
                                    tagName="p"
                                    className="hero-description xg-text xg-text-lg"
                                    value={description}
                                />
                            )}

                            {/* Buttons */}
                            <div className="hero-buttons">
                                {primaryButtonText && (
                                    <a
                                        href={primaryButtonUrl}
                                        className="xg-btn xg-btn-primary"
                                        style={{
                                            backgroundColor: primaryColor,
                                            borderColor: primaryColor
                                        }}
                                    >
                                        {primaryButtonText}
                                    </a>
                                )}

                                {showSecondaryButton && secondaryButtonText && (
                                    <a
                                        href={secondaryButtonUrl}
                                        className="xg-btn xg-btn-ghost"
                                    >
                                        {secondaryButtonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hero Image Column */}
                    {showImage && heroImage.url && (
                        <div className="xg-col-12 xg-col-lg-6">
                            <div className="hero-image">
                                <img
                                    src={heroImage.url}
                                    alt={heroImage.alt || 'Hero Image'}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
