/**
 * Service Grid Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        mainHeading,
        items,
        columns,
        backgroundColor,
        boxBackgroundColor,
        textColor,
        accentColor,
        paddingTop,
        paddingBottom,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `xg-service-grid columns-${columns}`,
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <div {...blockProps}>
            <div className="xg-container">
                {/* Main Heading */}
                <div className="service-grid-header">
                    {mainHeading && (
                        <RichText.Content
                            tagName="h2"
                            className="service-grid-title"
                            value={mainHeading}
                        />
                    )}
                </div>

                {/* Service Grid */}
                <div className="service-grid-items">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="service-item"
                            style={{ backgroundColor: boxBackgroundColor }}
                        >
                            {/* Item Title */}
                            {item.title && (
                                <RichText.Content
                                    tagName="h3"
                                    className="service-item-title"
                                    value={item.title}
                                />
                            )}

                            {/* Features List */}
                            <ul className="service-features">
                                {item.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="feature-item">
                                        <span
                                            className="feature-icon"
                                            style={{ backgroundColor: accentColor }}
                                        >
                                            ✓
                                        </span>
                                        <span className="feature-text">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Image */}
                            {item.image.url && (
                                <div className="service-item-image">
                                    <img src={item.image.url} alt={item.image.alt || item.title} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
