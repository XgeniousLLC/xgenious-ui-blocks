/**
 * Workflow Steps Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    Button,
    ColorPicker,
    TextControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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

    const blockProps = useBlockProps({
        className: `xg-workflow-steps columns-${columns}`,
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const addStep = () => {
        const newStep = {
            stepLabel: `STEP - 0${steps.length + 1}`,
            title: 'New Step',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
        };
        setAttributes({ steps: [...steps, newStep] });
    };

    const removeStep = (index) => {
        const updatedSteps = steps.filter((_, i) => i !== index);
        setAttributes({ steps: updatedSteps });
    };

    const updateStep = (index, key, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index][key] = value;
        setAttributes({ steps: updatedSteps });
    };

    const addFeature = (stepIndex) => {
        const updatedSteps = [...steps];
        updatedSteps[stepIndex].features.push('New Feature');
        setAttributes({ steps: updatedSteps });
    };

    const removeFeature = (stepIndex, featureIndex) => {
        const updatedSteps = [...steps];
        updatedSteps[stepIndex].features = updatedSteps[stepIndex].features.filter(
            (_, i) => i !== featureIndex
        );
        setAttributes({ steps: updatedSteps });
    };

    const updateFeature = (stepIndex, featureIndex, value) => {
        const updatedSteps = [...steps];
        updatedSteps[stepIndex].features[featureIndex] = value;
        setAttributes({ steps: updatedSteps });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
                    <ToggleControl
                        label={__('Full Width', 'xgenious-ui-blocks')}
                        checked={fullWidth}
                        onChange={(value) => setAttributes({ fullWidth: value })}
                        help={__('Remove container and make the block full width', 'xgenious-ui-blocks')}
                    />

                    <RangeControl
                        label={__('Columns', 'xgenious-ui-blocks')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={4}
                        step={1}
                    />

                    <RangeControl
                        label={__('Padding Top (px)', 'xgenious-ui-blocks')}
                        value={paddingTop}
                        onChange={(value) => setAttributes({ paddingTop: value })}
                        min={40}
                        max={200}
                        step={10}
                    />

                    <RangeControl
                        label={__('Padding Bottom (px)', 'xgenious-ui-blocks')}
                        value={paddingBottom}
                        onChange={(value) => setAttributes({ paddingBottom: value })}
                        min={40}
                        max={200}
                        step={10}
                    />
                </PanelBody>

                <PanelBody title={__('Color Settings', 'xgenious-ui-blocks')}>
                    <p>{__('Background Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={backgroundColor}
                        onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Card Background', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={cardBackgroundColor}
                        onChangeComplete={(value) => setAttributes({ cardBackgroundColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Text Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={textColor}
                        onChangeComplete={(value) => setAttributes({ textColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Step Label Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={stepLabelColor}
                        onChangeComplete={(value) => setAttributes({ stepLabelColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Checkmark Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={checkmarkColor}
                        onChangeComplete={(value) => setAttributes({ checkmarkColor: value.hex })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={fullWidth ? '' : 'xg-container'}>
                    {/* Heading */}
                    <RichText
                        tagName="h2"
                        className="workflow-heading"
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                        placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                    />

                    {/* Steps Grid */}
                    <div className="workflow-steps-grid">
                        {steps.map((step, stepIndex) => (
                            <div
                                key={stepIndex}
                                className="workflow-step"
                                style={{ backgroundColor: cardBackgroundColor }}
                            >
                                <div className="step-controls">
                                    <Button isDestructive isSmall onClick={() => removeStep(stepIndex)}>
                                        ✕
                                    </Button>
                                </div>

                                <TextControl
                                    className="step-label-input"
                                    value={step.stepLabel}
                                    onChange={(value) => updateStep(stepIndex, 'stepLabel', value)}
                                    placeholder={__('STEP - 01', 'xgenious-ui-blocks')}
                                    style={{ color: stepLabelColor }}
                                />

                                <TextControl
                                    className="step-title-input"
                                    value={step.title}
                                    onChange={(value) => updateStep(stepIndex, 'title', value)}
                                    placeholder={__('Step Title', 'xgenious-ui-blocks')}
                                />

                                {/* Features List */}
                                <div className="step-features">
                                    {step.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="feature-item">
                                            <span
                                                className="feature-icon"
                                                style={{ backgroundColor: checkmarkColor }}
                                            >
                                                ✓
                                            </span>
                                            <TextControl
                                                value={feature}
                                                onChange={(value) =>
                                                    updateFeature(stepIndex, featureIndex, value)
                                                }
                                                placeholder={__('Feature...', 'xgenious-ui-blocks')}
                                            />
                                            <Button
                                                isDestructive
                                                isSmall
                                                onClick={() => removeFeature(stepIndex, featureIndex)}
                                            >
                                                ✕
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        variant="secondary"
                                        isSmall
                                        onClick={() => addFeature(stepIndex)}
                                    >
                                        + {__('Add Feature', 'xgenious-ui-blocks')}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="add-step-wrapper">
                        <Button variant="primary" onClick={addStep}>
                            + {__('Add Step', 'xgenious-ui-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
