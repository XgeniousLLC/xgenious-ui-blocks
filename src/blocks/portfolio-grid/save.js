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
                            style={{ '--card-bg': project.backgroundColor }}
                        >
                            <div className="portfolio-item-header">
                                <div className="portfolio-item-content">
                                    <h3 className="portfolio-title">{project.title}</h3>
                                    <p className="portfolio-description">{project.description}</p>
                                </div>

                                <span className="portfolio-link-icon">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_4959_8360)">
                                            <path d="M0.376548 11.8061L9.61234 2.57031H4.14271C3.80187 2.57031 3.47498 2.43491 3.23397 2.1939C2.99296 1.95289 2.85756 1.626 2.85756 1.28516C2.85756 0.944312 2.99296 0.617427 3.23397 0.376414C3.47498 0.1354 3.80187 0 4.14271 0L12.715 0C13.0558 0 13.3827 0.1354 13.6237 0.376414C13.8647 0.617427 14.0001 0.944312 14.0001 1.28516V9.85742C14.0001 10.1983 13.8647 10.5252 13.6237 10.7662C13.3827 11.0072 13.0558 11.1426 12.715 11.1426C12.3741 11.1426 12.0472 11.0072 11.8062 10.7662C11.5652 10.5252 11.4298 10.1983 11.4298 9.85742V4.3878L2.19403 13.6236C1.95293 13.8642 1.62618 13.9992 1.28557 13.999C0.944965 13.9989 0.618359 13.8635 0.377512 13.6226C0.136666 13.3818 0.00127955 13.0552 0.00109881 12.7146C0.000918075 12.374 0.135958 12.0472 0.376548 11.8061Z" fill="currentColor"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_4959_8360">
                                                <rect width="14" height="14" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
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
