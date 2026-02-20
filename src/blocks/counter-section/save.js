/**
 * Counter Section Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
        counters,
        image,
        showImage,
        backgroundColor,
        textColor,
        counterColor,
        paddingTop,
        paddingBottom,
        borderRadius,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'xg-counter-section',
        style: {
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <div {...blockProps}>
            <div className="xg-container" style={{ backgroundColor, color: textColor, borderRadius: `${borderRadius}px` }}>
                <div className="counter-section-wrapper">
                    {/* Left Column - Content */}
                    <div className="counter-section-content">
                        {/* Heading */}
                        {heading && (
                            <RichText.Content
                                tagName="h2"
                                className="counter-section-heading"
                                value={heading}
                            />
                        )}

                        {/* Counters List */}
                        <div className="counters-list">
                            {counters.map((counter, index) => (
                                <div key={index} className="counter-item">
                                    <div className="counter-content-row">
                                        {/* Number & Label */}
                                        <div className="counter-number-wrapper">
                                            <div
                                                className="counter-number"
                                                style={{ color: counterColor }}
                                            >
                                                {counter.number}
                                            </div>
                                            <div className="counter-label">{counter.label}</div>
                                        </div>

                                        {/* Description */}
                                        <div className="counter-description">
                                            {counter.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    {showImage && image.url && (
                        <div className="counter-section-image">
                            <img src={image.url} alt={image.alt || 'Counter section'} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
