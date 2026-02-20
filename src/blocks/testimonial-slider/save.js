/**
 * Testimonial Slider Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
        testimonials,
        slidesPerView,
        backgroundColor,
        cardBackgroundColor,
        textColor,
        headingColor,
        quoteIconColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'xg-testimonial-slider',
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
        'data-slides-per-view': slidesPerView,
    });

    const getEmbedUrl = (url) => {
        if (!url) return '';
        // YouTube
        const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
        // Vimeo
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
        return url;
    };

    return (
        <div {...blockProps}>
            <div className={fullWidth ? '' : 'xg-container'}>
                <div className="testimonial-slider-header">
                    {heading && (
                        <RichText.Content
                            tagName="h2"
                            className="testimonial-slider-heading"
                            value={heading}
                            style={{ color: headingColor }}
                        />
                    )}

                    <div className="testimonial-nav">
                        <button className="nav-btn nav-prev" aria-label="Previous">&larr;</button>
                        <button className="nav-btn nav-next" aria-label="Next">&rarr;</button>
                    </div>
                </div>

                <div className={`testimonial-slider-wrapper slides-${slidesPerView}`}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="testimonial-slide"
                            style={{ backgroundColor: cardBackgroundColor }}
                        >
                          <div className="testimonial-slide-inner">
                            <div className="testimonial-content">
                                <div className="quote-icon" style={{ color: quoteIconColor }}>
                                    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.75075 0H12L6.07808 14H0L2.75075 0ZM14.7508 0H24L18.0901 14H12L14.7508 0Z" fill="currentColor"/>
                                    </svg>
                                </div>

                                <p className="testimonial-quote">{testimonial.quote}</p>

                                <div className="testimonial-author-info">
                                    <p className="author-name">{testimonial.authorName}</p>
                                    <p className="author-position">{testimonial.authorPosition}</p>
                                </div>
                            </div>

                            {testimonial.authorImage?.url && (
                                <div className="testimonial-media">
                                    <img
                                        src={testimonial.authorImage.url}
                                        alt={testimonial.authorImage.alt || testimonial.authorName}
                                        className="author-image"
                                    />
                                    {testimonial.hasVideo && testimonial.videoUrl && (
                                        <button
                                            className="play-button-overlay"
                                            data-video-url={getEmbedUrl(testimonial.videoUrl)}
                                            aria-label={`Play ${testimonial.authorName}'s video`}
                                        >
                                            <span className="play-icon">
                                            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.28547 0.308689C1.02329 -0.415315 0 0.177798 0 1.63238V12.3666C0 13.8226 1.02329 14.415 2.28547 13.6917L11.6677 8.31101C12.9303 7.58675 12.9303 6.41334 11.6677 5.68925L2.28547 0.308689Z" fill="currentColor"/>
                                            </svg>
                                        </span>
                                        </button>
                                    )}
                                </div>
                            )}
                          </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Popup */}
            <div className="xg-video-popup" style={{ display: 'none' }}>
                <div className="xg-video-popup-overlay"></div>
                <div className="xg-video-popup-content">
                    <button className="xg-video-popup-close" aria-label="Close">&times;</button>
                    <div className="xg-video-popup-iframe-wrap">
                        <iframe
                            className="xg-video-popup-iframe"
                            src=""
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
