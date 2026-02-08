/**
 * Info Boxes Block - Edit Component
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
    SelectControl,
} from '@wordpress/components';
import { Dashicon } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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

    const blockProps = useBlockProps({
        className: 'xg-info-boxes',
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    // Available Dashicons
    const iconOptions = [
        { label: 'Clock', value: 'clock' },
        { label: 'Groups', value: 'groups' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'Star', value: 'star-filled' },
        { label: 'Chart', value: 'chart-bar' },
        { label: 'Admin Tools', value: 'admin-tools' },
        { label: 'Lightbulb', value: 'lightbulb' },
        { label: 'Awards', value: 'awards' },
        { label: 'Shield', value: 'shield' },
        { label: 'Performance', value: 'performance' },
    ];

    const addBox = () => {
        const newBox = {
            icon: 'clock',
            iconBackgroundColor: '#FFE5E5',
            iconColor: '#FF6B6B',
            title: 'New Box',
            description: 'Enter description here.',
        };
        setAttributes({ boxes: [...boxes, newBox] });
    };

    const removeBox = (index) => {
        const updatedBoxes = boxes.filter((_, i) => i !== index);
        setAttributes({ boxes: updatedBoxes });
    };

    const updateBox = (index, key, value) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index][key] = value;
        setAttributes({ boxes: updatedBoxes });
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

                    <p style={{ marginTop: '16px' }}>{__('Box Background', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={boxBackgroundColor}
                        onChangeComplete={(value) => setAttributes({ boxBackgroundColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Text Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={textColor}
                        onChangeComplete={(value) => setAttributes({ textColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Heading Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={headingColor}
                        onChangeComplete={(value) => setAttributes({ headingColor: value.hex })}
                    />
                </PanelBody>

                {/* Individual Box Settings */}
                {boxes.map((box, index) => (
                    <PanelBody
                        key={index}
                        title={`${__('Box', 'xgenious-ui-blocks')} ${index + 1}: ${box.title || __('Untitled', 'xgenious-ui-blocks')}`}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__('Icon', 'xgenious-ui-blocks')}
                            value={box.icon}
                            options={iconOptions}
                            onChange={(value) => updateBox(index, 'icon', value)}
                        />

                        <p>{__('Icon Background Color', 'xgenious-ui-blocks')}</p>
                        <ColorPicker
                            color={box.iconBackgroundColor}
                            onChangeComplete={(value) =>
                                updateBox(index, 'iconBackgroundColor', value.hex)
                            }
                        />

                        <p style={{ marginTop: '16px' }}>{__('Icon Color', 'xgenious-ui-blocks')}</p>
                        <ColorPicker
                            color={box.iconColor}
                            onChangeComplete={(value) =>
                                updateBox(index, 'iconColor', value.hex)
                            }
                        />

                        <div style={{ marginTop: '16px' }}>
                            <Button
                                isDestructive
                                variant="secondary"
                                onClick={() => removeBox(index)}
                            >
                                {__('Remove Box', 'xgenious-ui-blocks')}
                            </Button>
                        </div>
                    </PanelBody>
                ))}
            </InspectorControls>

            <div {...blockProps}>
                <div className={fullWidth ? '' : 'xg-container'}>
                    <div className="info-boxes-wrapper">
                        {/* Left Column - Heading */}
                        <div className="info-boxes-heading">
                            <RichText
                                tagName="h2"
                                className="heading-line1"
                                value={headingLine1}
                                onChange={(value) => setAttributes({ headingLine1: value })}
                                placeholder={__('Line 1...', 'xgenious-ui-blocks')}
                                style={{ color: headingColor }}
                            />
                            <RichText
                                tagName="h2"
                                className="heading-line2"
                                value={headingLine2}
                                onChange={(value) => setAttributes({ headingLine2: value })}
                                placeholder={__('Line 2...', 'xgenious-ui-blocks')}
                                style={{ color: headingColor }}
                            />
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
                                            <Dashicon
                                                icon={box.icon}
                                                style={{ color: box.iconColor }}
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div className="info-box-text">
                                            <TextControl
                                                className="box-title-input"
                                                value={box.title}
                                                onChange={(value) => updateBox(index, 'title', value)}
                                                placeholder={__('Title', 'xgenious-ui-blocks')}
                                            />

                                            <TextControl
                                                className="box-description-input"
                                                value={box.description}
                                                onChange={(value) => updateBox(index, 'description', value)}
                                                placeholder={__('Description', 'xgenious-ui-blocks')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="add-box-wrapper">
                                <Button variant="secondary" onClick={addBox}>
                                    + {__('Add Box', 'xgenious-ui-blocks')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
