/**
 * Founder Vision Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        sectionTitle,
        founderName,
        founderRole,
        bio1,
        bio2,
        bio3,
        buttonText,
        buttonUrl,
        buttonOpenNewTab,
        founderImage,
        backgroundImage,
        backgroundOverlay,
        overlayColor,
        sectionBg,
        sectionTitleColor,
        nameColor,
        roleColor,
        textColor,
        highlightColor,
        buttonColor,
        buttonTextColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `xg-founder-vision${fullWidth ? ' xg-fv-fullwidth' : ''}`,
        style: {
            backgroundColor: sectionBg,
            backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            '--xg-fv-highlight': highlightColor,
        },
    });

    return (
        <div {...blockProps}>
            {backgroundImage?.url && backgroundOverlay > 0 && (
                <div
                    className="xg-fv-overlay"
                    style={{
                        backgroundColor: overlayColor,
                        opacity: backgroundOverlay / 100,
                    }}
                />
            )}
            <div className="xg-container xg-fv-inner">
                <RichText.Content
                    tagName="h2"
                    className="xg-fv-section-title"
                    value={sectionTitle}
                    style={{ color: sectionTitleColor }}
                />

                <div className="xg-fv-layout">
                    <div className="xg-fv-image-col">
                        {founderImage?.url && (
                            <div className="xg-fv-image-wrap">
                                <img
                                    src={founderImage.url}
                                    alt={founderImage.alt || ''}
                                    className="xg-fv-image"
                                />
                            </div>
                        )}
                    </div>

                    <div className="xg-fv-content-col">
                        <RichText.Content
                            tagName="h3"
                            className="xg-fv-name"
                            value={founderName}
                            style={{ color: nameColor }}
                        />

                        <RichText.Content
                            tagName="p"
                            className="xg-fv-role"
                            value={founderRole}
                            style={{ color: roleColor }}
                        />

                        {bio1 && (
                            <RichText.Content
                                tagName="p"
                                className="xg-fv-bio"
                                value={bio1}
                                style={{ color: textColor }}
                            />
                        )}

                        {bio2 && (
                            <RichText.Content
                                tagName="p"
                                className="xg-fv-bio"
                                value={bio2}
                                style={{ color: textColor }}
                            />
                        )}

                        {bio3 && (
                            <RichText.Content
                                tagName="p"
                                className="xg-fv-bio"
                                value={bio3}
                                style={{ color: textColor }}
                            />
                        )}

                        <div className="xg-fv-button-wrap">
                            <a
                                href={buttonUrl || '#'}
                                className="xg-fv-btn-link"
                                style={{ backgroundColor: buttonColor, color: buttonTextColor }}
                                {...(buttonOpenNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                <span className="xg-fv-btn-text">{buttonText}</span>
                                <span className="xg-fv-btn-arrow">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.333 8h9.334M8.667 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
