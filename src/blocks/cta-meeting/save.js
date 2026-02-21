/**
 * CTA for Meeting Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
        subtitle,
        buttonText,
        buttonUrl,
        buttonOpenNewTab,
        backgroundImage,
        personImage,
        backgroundColor,
        headingColor,
        subtitleColor,
        buttonColor,
        buttonTextColor,
        borderColor,
        paddingTop,
        paddingBottom,
        sectionBackgroundColor,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'xg-cta-meeting',
        style: {
            backgroundColor: sectionBackgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <div {...blockProps}>
            <div className={fullWidth ? '' : 'xg-container'}>
                <div
                    className="cta-meeting-card"
                    style={{
                        backgroundColor,
                        backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : 'none',
                    }}
                >
                    <div className="cta-meeting-content">
                        {heading && (
                            <RichText.Content
                                tagName="h2"
                                className="cta-meeting-heading"
                                value={heading}
                                style={{ color: headingColor }}
                            />
                        )}

                        {subtitle && (
                            <RichText.Content
                                tagName="p"
                                className="cta-meeting-subtitle"
                                value={subtitle}
                                style={{ color: subtitleColor }}
                            />
                        )}

                        <div className="cta-meeting-button-wrapper">
                            <a
                                href={buttonUrl || '#'}
                                className="cta-meeting-button"
                                style={{
                                    backgroundColor: buttonColor,
                                    color: buttonTextColor,
                                }}
                                {...(buttonOpenNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                <span className="cta-btn-text">{buttonText}</span>
                                <span className="cta-btn-arrow">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.333 8h9.334M8.667 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>

                    {personImage?.url && (
                        <div className="cta-meeting-person">
                            <div
                                className="person-image-wrapper"
                                style={{ borderColor }}
                            >
                                <img
                                    src={personImage.url}
                                    alt={personImage.alt || ''}
                                    className="person-image"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
