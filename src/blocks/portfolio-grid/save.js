/**
 * Portfolio Grid Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
        buttonText,
        buttonUrl,
        showButton,
        projects,
        columns,
        backgroundColor,
        textColor,
        buttonColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `xg-portfolio-grid columns-${columns}`,
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <div {...blockProps}>
            <div className="portfolio-grid-container">
                {/* Header */}
                <div className="portfolio-header">
                    {heading && (
                        <RichText.Content
                            tagName="h2"
                            className="portfolio-heading"
                            value={heading}
                        />
                    )}

                    {showButton && buttonText && (
                        <div className="portfolio-button">
                            <a
                                href={buttonUrl}
                                className="xg-btn xg-btn-primary"
                                style={{ backgroundColor: buttonColor, borderColor: buttonColor }}
                            >
                                {buttonText}
                            </a>
                        </div>
                    )}
                </div>

                {/* Projects Grid */}
                <div className="portfolio-grid">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.link}
                            className="portfolio-item"
                            style={{ backgroundColor: project.backgroundColor }}
                        >
                            <div className="portfolio-item-header">
                                <div className="portfolio-item-content">
                                    <h3 className="portfolio-title">{project.title}</h3>
                                    <p className="portfolio-description">{project.description}</p>
                                </div>

                                <span className="portfolio-link-icon">↗</span>
                            </div>

                            {project.image.url && (
                                <div className="portfolio-item-image">
                                    <img src={project.image.url} alt={project.image.alt || project.title} />
                                </div>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
