/**
 * Counter Section Block - Edit Component
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
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        counters,
        image,
        showImage,
        backgroundColor,
        textColor,
        counterColor,
        paddingTop,
        paddingBottom,
        borderRadius,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'xg-counter-section',
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            borderRadius: `${borderRadius}px`,
        },
    });

    // Add new counter
    const addCounter = () => {
        const newCounter = {
            number: '0',
            label: 'Counter Label',
            description: 'Counter description text here.',
        };
        setAttributes({ counters: [...counters, newCounter] });
    };

    // Remove counter
    const removeCounter = (index) => {
        const updatedCounters = counters.filter((_, i) => i !== index);
        setAttributes({ counters: updatedCounters });
    };

    // Update counter property
    const updateCounter = (index, key, value) => {
        const updatedCounters = [...counters];
        updatedCounters[index][key] = value;
        setAttributes({ counters: updatedCounters });
    };

    return (
        <>
            <InspectorControls>
                {/* Layout Settings */}
                <PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show Image', 'xgenious-ui-blocks')}
                        checked={showImage}
                        onChange={(value) => setAttributes({ showImage: value })}
                    />

                    <RangeControl
                        label={__('Border Radius (px)', 'xgenious-ui-blocks')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                        step={2}
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

                {/* Color Settings */}
                <PanelBody title={__('Color Settings', 'xgenious-ui-blocks')}>
                    <p>{__('Background Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={backgroundColor}
                        onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Text Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={textColor}
                        onChangeComplete={(value) => setAttributes({ textColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Counter Number Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={counterColor}
                        onChangeComplete={(value) => setAttributes({ counterColor: value.hex })}
                    />
                </PanelBody>

                {/* Image Settings */}
                {showImage && (
                    <PanelBody title={__('Image Settings', 'xgenious-ui-blocks')}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) =>
                                    setAttributes({
                                        image: {
                                            id: media.id,
                                            url: media.url,
                                            alt: media.alt || '',
                                        },
                                    })
                                }
                                allowedTypes={['image']}
                                value={image.id}
                                render={({ open }) => (
                                    <div>
                                        {image.url ? (
                                            <>
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                                                />
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <Button variant="secondary" onClick={open}>
                                                        {__('Replace Image', 'xgenious-ui-blocks')}
                                                    </Button>
                                                    <Button
                                                        variant="tertiary"
                                                        isDestructive
                                                        onClick={() =>
                                                            setAttributes({
                                                                image: { id: null, url: '', alt: '' },
                                                            })
                                                        }
                                                    >
                                                        {__('Remove', 'xgenious-ui-blocks')}
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <Button variant="secondary" onClick={open}>
                                                {__('Upload Image', 'xgenious-ui-blocks')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                )}
            </InspectorControls>

            <div {...blockProps}>
                <div className="xg-container">
                    <div className="counter-section-wrapper">
                        {/* Left Column - Content */}
                        <div className="counter-section-content">
                            {/* Heading */}
                            <RichText
                                tagName="h2"
                                className="counter-section-heading"
                                value={heading}
                                onChange={(value) => setAttributes({ heading: value })}
                                placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                            />

                            {/* Counters List */}
                            <div className="counters-list">
                                {counters.map((counter, index) => (
                                    <div key={index} className="counter-item">
                                        {/* Remove Button */}
                                        <div className="counter-controls">
                                            <Button
                                                isDestructive
                                                isSmall
                                                onClick={() => removeCounter(index)}
                                            >
                                                ✕
                                            </Button>
                                        </div>

                                        <div className="counter-content-row">
                                            {/* Number */}
                                            <div className="counter-number-wrapper">
                                                <TextControl
                                                    className="counter-number-input"
                                                    value={counter.number}
                                                    onChange={(value) =>
                                                        updateCounter(index, 'number', value)
                                                    }
                                                    placeholder="25+"
                                                    style={{ color: counterColor }}
                                                />
                                                <TextControl
                                                    className="counter-label-input"
                                                    value={counter.label}
                                                    onChange={(value) =>
                                                        updateCounter(index, 'label', value)
                                                    }
                                                    placeholder="Label"
                                                />
                                            </div>

                                            {/* Description */}
                                            <div className="counter-description-wrapper">
                                                <TextControl
                                                    value={counter.description}
                                                    onChange={(value) =>
                                                        updateCounter(index, 'description', value)
                                                    }
                                                    placeholder="Description text..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Counter Button */}
                            <Button
                                variant="secondary"
                                onClick={addCounter}
                                style={{ marginTop: '20px' }}
                            >
                                + {__('Add Counter', 'xgenious-ui-blocks')}
                            </Button>
                        </div>

                        {/* Right Column - Image */}
                        {showImage && (
                            <div className="counter-section-image">
                                {image.url ? (
                                    <img src={image.url} alt={image.alt} />
                                ) : (
                                    <div className="image-placeholder">
                                        <p>{__('Upload image from sidebar', 'xgenious-ui-blocks')} →</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
