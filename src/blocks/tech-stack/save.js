/**
 * Tech Stack Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
        technologies,
        columns,
        backgroundColor,
        textColor,
        headingColor,
        itemBackgroundColor,
        itemBorderColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `xg-tech-stack columns-${columns}`,
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
                {/* Heading */}
                {heading && (
                    <RichText.Content
                        tagName="h2"
                        className="tech-stack-heading"
                        value={heading}
                        style={{ color: headingColor }}
                    />
                )}

                {/* Tech Grid */}
                <div className="tech-stack-grid">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className="tech-item"
                            style={{
                                backgroundColor: itemBackgroundColor,
                                borderColor: itemBorderColor,
                            }}
                        >
                            {tech.image.url && (
                                <div className="tech-image-wrapper">
                                    <img
                                        src={tech.image.url}
                                        alt={tech.image.alt || tech.name}
                                        className="tech-image"
                                    />
                                </div>
                            )}
                            <p className="tech-name">{tech.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
