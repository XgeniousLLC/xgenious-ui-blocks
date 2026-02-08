/**
 * Info Boxes Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        headingLine1,
        headingLine2,
        boxes,
        backgroundColor,
        boxBackgroundColor,
        textColor,
        headingColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'xg-info-boxes',
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <div {...blockProps}>
            <div className={fullWidth ? '' : 'xg-container'}>
                <div className="info-boxes-wrapper">
                    {/* Left Column - Heading */}
                    <div className="info-boxes-heading">
                        {headingLine1 && (
                            <RichText.Content
                                tagName="h2"
                                className="heading-line1"
                                value={headingLine1}
                                style={{ color: headingColor }}
                            />
                        )}
                        {headingLine2 && (
                            <RichText.Content
                                tagName="h2"
                                className="heading-line2"
                                value={headingLine2}
                                style={{ color: headingColor }}
                            />
                        )}
                    </div>

                    {/* Right Column - Boxes */}
                    <div className="info-boxes-list">
                        {boxes.map((box, index) => (
                            <div
                                key={index}
                                className="info-box"
                                style={{ backgroundColor: boxBackgroundColor }}
                            >
                                <div className="info-box-content">
                                    {/* Icon */}
                                    <div
                                        className="info-box-icon"
                                        style={{ backgroundColor: box.iconBackgroundColor }}
                                    >
                                        <span
                                            className={`dashicons dashicons-${box.icon}`}
                                            style={{ color: box.iconColor }}
                                        ></span>
                                    </div>

                                    {/* Text Content */}
                                    <div className="info-box-text">
                                        <h3 className="box-title">{box.title}</h3>
                                        <p className="box-description">{box.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
