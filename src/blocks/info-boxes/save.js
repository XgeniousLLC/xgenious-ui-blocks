/**
 * Info Boxes Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
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

    const renderIcon = (box) => {
        if (box.iconType === 'svg' && box.iconSvg) {
            return (
                <span
                    className="info-box-svg-icon"
                    style={{ color: box.iconColor }}
                    dangerouslySetInnerHTML={{ __html: box.iconSvg }}
                />
            );
        }
        return (
            <span
                className={`dashicons dashicons-${box.icon || 'clock'}`}
                style={{ color: box.iconColor }}
            ></span>
        );
    };

    return (
        <div {...blockProps}>
            <div className="info-boxes-container">
                <div className="info-boxes-wrapper">
                    {/* Left Column - Heading */}
                    <div className="info-boxes-heading">
                        {heading && (
                            <RichText.Content
                                tagName="h2"
                                value={heading}
                                style={{ color: headingColor }}
                            />
                        )}
                    </div>

                    {/* Right Column - Boxes */}
                    <div className="info-boxes-list" style={{ backgroundColor: boxBackgroundColor }}>
                        {boxes.map((box, index) => (
                            <div
                                key={index}
                                className="info-box"
                            >
                                <div className="info-box-content">
                                    <div
                                        className="info-box-icon"
                                        style={{ backgroundColor: box.iconBackgroundColor }}
                                    >
                                        {renderIcon(box)}
                                    </div>

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
