/**
 * Hero Section Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        description,
        backgroundImage,
        backgroundVideo,
        useVideo,
        overlayColor,
        overlayOpacity,
        textColor,
        titleColor,
        minHeight,
        contentAlignment,
        contentVerticalAlign,
        buttonText,
        buttonUrl,
        buttonStyle,
        showButton,
        animation,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `xgenious-hero-section align-${contentAlignment} valign-${contentVerticalAlign} ${animation !== 'none' ? 'animate-on-scroll' : ''}`,
        style: {
            minHeight: `${minHeight}px`,
            color: textColor,
        },
        'data-animation': animation,
    });

    const backgroundStyle = useVideo
        ? {}
        : {
              backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          };

    const overlayStyle = {
        background: overlayColor,
        opacity: overlayOpacity,
    };

    return (
        <div {...blockProps}>
            {/* Background */}
            <div className="hero-background" style={backgroundStyle}>
                {useVideo && backgroundVideo.url && (
                    <video autoPlay muted loop playsInline className="hero-video">
                        <source src={backgroundVideo.url} type="video/mp4" />
                    </video>
                )}
            </div>

            {/* Overlay */}
            <div className="hero-overlay" style={overlayStyle}></div>

            {/* Content */}
            <div className="hero-content">
                {subtitle && <RichText.Content tagName="p" className="hero-subtitle" value={subtitle} />}

                {title && (
                    <RichText.Content
                        tagName="h1"
                        className="hero-title"
                        value={title}
                        style={{ color: titleColor }}
                    />
                )}

                {description && <RichText.Content tagName="p" className="hero-description" value={description} />}

                {showButton && buttonText && (
                    <a href={buttonUrl} className={`xgenious-btn btn-${buttonStyle}`}>
                        {buttonText}
                    </a>
                )}
            </div>
        </div>
    );
}
