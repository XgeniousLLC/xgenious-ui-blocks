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

    return (
        <div {...blockProps}>
            <div className={fullWidth ? '' : 'xg-container'}>
                <div className="testimonial-slider-header">
                    {/* Heading */}
                    {heading && (
                        <RichText.Content
                            tagName="h2"
                            className="testimonial-slider-heading"
                            value={heading}
                            style={{ color: headingColor }}
                        />
                    )}

                    {/* Navigation */}
                    <div className="testimonial-nav">
                        <button className="nav-btn nav-prev" aria-label="Previous">←</button>
                        <button className="nav-btn nav-next" aria-label="Next">→</button>
                    </div>
                </div>

                {/* Testimonials Slider */}
                <div className={`testimonial-slider-wrapper slides-${slidesPerView}`}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="testimonial-slide"
                            style={{ backgroundColor: cardBackgroundColor }}
                        >
                            <div className="testimonial-content">
                                {/* Quote Icon */}
                                <div className="quote-icon" style={{ color: quoteIconColor }}>
                                    "
                                </div>

                                {/* Quote Text */}
                                <p className="testimonial-quote">{testimonial.quote}</p>

                                {/* Author Info */}
                                <div className="testimonial-author-info">
                                    <p className="author-name">{testimonial.authorName}</p>
                                    <p className="author-position">{testimonial.authorPosition}</p>
                                </div>
                            </div>

                            {/* Author Image/Video */}
                            {testimonial.authorImage.url && (
                                <div className="testimonial-media">
                                    {testimonial.hasVideo && testimonial.videoUrl ? (
                                        <a
                                            href={testimonial.videoUrl}
                                            className="video-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Watch ${testimonial.authorName}'s testimonial video`}
                                        >
                                            <img
                                                src={testimonial.authorImage.url}
                                                alt={testimonial.authorImage.alt || testimonial.authorName}
                                                className="author-image"
                                            />
                                            <div className="play-button-overlay">
                                                <span className="play-icon">▶</span>
                                            </div>
                                        </a>
                                    ) : (
                                        <img
                                            src={testimonial.authorImage.url}
                                            alt={testimonial.authorImage.alt || testimonial.authorName}
                                            className="author-image"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
