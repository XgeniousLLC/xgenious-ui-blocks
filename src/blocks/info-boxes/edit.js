/**
 * Info Boxes Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    Button,
    ColorPicker,
    TextControl,
    SelectControl,
    ButtonGroup,
} from '@wordpress/components';
import { Dashicon } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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
            iconType: 'dashicon',
            icon: 'clock',
            iconSvg: '',
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
        updatedBoxes[index] = { ...updatedBoxes[index], [key]: value };
        setAttributes({ boxes: updatedBoxes });
    };

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
            <Dashicon
                icon={box.icon || 'clock'}
                style={{ color: box.iconColor }}
            />
        );
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

                <PanelBody title={__('Manage Boxes', 'xgenious-ui-blocks')} initialOpen={false}>
                    {boxes.map((box, index) => (
                        <PanelBody
                            key={index}
                            title={`${__('Box', 'xgenious-ui-blocks')} ${index + 1}: ${box.title || __('Untitled', 'xgenious-ui-blocks')}`}
                            initialOpen={false}
                        >
                            <TextControl
                                label={__('Title', 'xgenious-ui-blocks')}
                                value={box.title}
                                onChange={(value) => updateBox(index, 'title', value)}
                            />

                            <TextControl
                                label={__('Description', 'xgenious-ui-blocks')}
                                value={box.description}
                                onChange={(value) => updateBox(index, 'description', value)}
                            />

                            <p style={{ marginBottom: '8px', fontWeight: 600 }}>{__('Icon Type', 'xgenious-ui-blocks')}</p>
                            <ButtonGroup style={{ marginBottom: '16px' }}>
                                <Button
                                    variant={(!box.iconType || box.iconType === 'dashicon') ? 'primary' : 'secondary'}
                                    onClick={() => updateBox(index, 'iconType', 'dashicon')}
                                >
                                    {__('Dashicon', 'xgenious-ui-blocks')}
                                </Button>
                                <Button
                                    variant={box.iconType === 'svg' ? 'primary' : 'secondary'}
                                    onClick={() => updateBox(index, 'iconType', 'svg')}
                                >
                                    {__('SVG Upload', 'xgenious-ui-blocks')}
                                </Button>
                            </ButtonGroup>

                            {(!box.iconType || box.iconType === 'dashicon') && (
                                <SelectControl
                                    label={__('Icon', 'xgenious-ui-blocks')}
                                    value={box.icon}
                                    options={iconOptions}
                                    onChange={(value) => updateBox(index, 'icon', value)}
                                />
                            )}

                            {box.iconType === 'svg' && (
                                <div style={{ marginBottom: '12px' }}>
                                    {box.iconSvg ? (
                                        <div>
                                            <div
                                                style={{
                                                    width: '64px',
                                                    height: '64px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: box.iconBackgroundColor,
                                                    borderRadius: '20px',
                                                    marginBottom: '8px',
                                                    color: box.iconColor,
                                                }}
                                                dangerouslySetInnerHTML={{ __html: box.iconSvg }}
                                            />
                                            <Button
                                                isDestructive
                                                variant="secondary"
                                                onClick={() => updateBox(index, 'iconSvg', '')}
                                            >
                                                {__('Remove SVG', 'xgenious-ui-blocks')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        if (media.url) {
                                                            fetch(media.url)
                                                                .then((res) => res.text())
                                                                .then((svgContent) => {
                                                                    updateBox(index, 'iconSvg', svgContent);
                                                                });
                                                        }
                                                    }}
                                                    allowedTypes={['image/svg+xml', 'image']}
                                                    render={({ open }) => (
                                                        <Button variant="primary" onClick={open} style={{ marginBottom: '8px' }}>
                                                            {__('Upload SVG', 'xgenious-ui-blocks')}
                                                        </Button>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                            <p style={{ margin: '8px 0', fontSize: '12px', color: '#757575' }}>
                                                {__('Or paste SVG code below:', 'xgenious-ui-blocks')}
                                            </p>
                                            <textarea
                                                rows={4}
                                                style={{ width: '100%', fontFamily: 'monospace', fontSize: '11px' }}
                                                placeholder={__('Paste SVG code here...', 'xgenious-ui-blocks')}
                                                onChange={(e) => {
                                                    const val = e.target.value.trim();
                                                    if (val.startsWith('<svg')) {
                                                        updateBox(index, 'iconSvg', val);
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

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
                    <Button variant="primary" onClick={addBox} style={{ marginTop: '12px' }}>
                        {__('Add Box', 'xgenious-ui-blocks')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="info-boxes-container">
                    <div className="info-boxes-wrapper">
                        {/* Left Column - Heading */}
                        <div className="info-boxes-heading">
                            <RichText
                                tagName="h2"
                                value={heading}
                                onChange={(value) => setAttributes({ heading: value })}
                                placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                                style={{ color: headingColor }}
                            />
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
