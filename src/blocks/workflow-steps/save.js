/**
 * Workflow Steps Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
        steps,
        columns,
        backgroundColor,
        cardBackgroundColor,
        textColor,
        stepLabelColor,
        checkmarkColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `xg-workflow-steps columns-${columns}`,
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
                        className="workflow-heading"
                        value={heading}
                    />
                )}

                {/* Steps Grid */}
                <div className="workflow-steps-grid">
                    {steps.map((step, stepIndex) => (
                        <div
                            key={stepIndex}
                            className="workflow-step"
                            style={{ backgroundColor: cardBackgroundColor }}
                        >
                            <div className="step-label" style={{ color: stepLabelColor }}>
                                {step.stepLabel}
                            </div>

                            <h3 className="step-title">{step.title}</h3>

                            <ul className="step-features">
                                {step.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="feature-item">
                                        <span
                                            className="feature-icon"
                                            style={{ backgroundColor: checkmarkColor }}
                                        >
                                            ✓
                                        </span>
                                        <span className="feature-text">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
