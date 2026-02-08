/**
 * Service Grid Block - Edit Component
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
    Button,
    ColorPicker,
    TextControl,
    IconButton,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        mainHeading,
        items,
        columns,
        backgroundColor,
        boxBackgroundColor,
        textColor,
        accentColor,
        paddingTop,
        paddingBottom,
    } = attributes;

    const blockProps = useBlockProps({
        className: `xg-service-grid columns-${columns}`,
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    // Add new service item
    const addItem = () => {
        const newItem = {
            title: 'New Service',
            features: ['Feature 1', 'Feature 2'],
            image: { id: null, url: '', alt: '' },
        };
        setAttributes({ items: [...items, newItem] });
    };

    // Remove service item
    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setAttributes({ items: updatedItems });
    };

    // Update item property
    const updateItem = (index, key, value) => {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        setAttributes({ items: updatedItems });
    };

    // Add feature to item
    const addFeature = (itemIndex) => {
        const updatedItems = [...items];
        updatedItems[itemIndex].features.push('New Feature');
        setAttributes({ items: updatedItems });
    };

    // Remove feature from item
    const removeFeature = (itemIndex, featureIndex) => {
        const updatedItems = [...items];
        updatedItems[itemIndex].features = updatedItems[itemIndex].features.filter(
            (_, i) => i !== featureIndex
        );
        setAttributes({ items: updatedItems });
    };

    // Update feature text
    const updateFeature = (itemIndex, featureIndex, value) => {
        const updatedItems = [...items];
        updatedItems[itemIndex].features[featureIndex] = value;
        setAttributes({ items: updatedItems });
    };

    return (
        <>
            <InspectorControls>
                {/* Layout Settings */}
                <PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
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

                {/* Color Settings */}
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

                    <p style={{ marginTop: '16px' }}>{__('Accent Color (Checkmarks)', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={accentColor}
                        onChangeComplete={(value) => setAttributes({ accentColor: value.hex })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="xg-container">
                    {/* Main Heading */}
                    <div className="service-grid-header">
                        <RichText
                            tagName="h2"
                            className="service-grid-title"
                            value={mainHeading}
                            onChange={(value) => setAttributes({ mainHeading: value })}
                            placeholder={__('Enter main heading...', 'xgenious-ui-blocks')}
                        />
                    </div>

                    {/* Service Grid */}
                    <div className="service-grid-items">
                        {items.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                className="service-item"
                                style={{ backgroundColor: boxBackgroundColor }}
                            >
                                {/* Item Controls */}
                                <div className="item-controls">
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeItem(itemIndex)}
                                    >
                                        {__('Remove', 'xgenious-ui-blocks')}
                                    </Button>
                                </div>

                                {/* Item Title */}
                                <RichText
                                    tagName="h3"
                                    className="service-item-title"
                                    value={item.title}
                                    onChange={(value) => updateItem(itemIndex, 'title', value)}
                                    placeholder={__('Service Title', 'xgenious-ui-blocks')}
                                />

                                {/* Features List */}
                                <ul className="service-features">
                                    {item.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="feature-item">
                                            <span
                                                className="feature-icon"
                                                style={{ backgroundColor: accentColor }}
                                            >
                                                ✓
                                            </span>
                                            <div className="feature-content">
                                                <TextControl
                                                    value={feature}
                                                    onChange={(value) =>
                                                        updateFeature(itemIndex, featureIndex, value)
                                                    }
                                                    placeholder={__('Feature text', 'xgenious-ui-blocks')}
                                                />
                                                <Button
                                                    isDestructive
                                                    isSmall
                                                    onClick={() => removeFeature(itemIndex, featureIndex)}
                                                >
                                                    ✕
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Add Feature Button */}
                                <Button
                                    variant="secondary"
                                    isSmall
                                    onClick={() => addFeature(itemIndex)}
                                    style={{ marginTop: '10px' }}
                                >
                                    + {__('Add Feature', 'xgenious-ui-blocks')}
                                </Button>

                                {/* Image Upload */}
                                <div className="service-item-image">
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) =>
                                                updateItem(itemIndex, 'image', {
                                                    id: media.id,
                                                    url: media.url,
                                                    alt: media.alt || '',
                                                })
                                            }
                                            allowedTypes={['image']}
                                            value={item.image.id}
                                            render={({ open }) => (
                                                <div className="image-upload-area">
                                                    {item.image.url ? (
                                                        <>
                                                            <img src={item.image.url} alt={item.image.alt} />
                                                            <div className="image-actions">
                                                                <Button variant="secondary" onClick={open}>
                                                                    {__('Replace', 'xgenious-ui-blocks')}
                                                                </Button>
                                                                <Button
                                                                    isDestructive
                                                                    onClick={() =>
                                                                        updateItem(itemIndex, 'image', {
                                                                            id: null,
                                                                            url: '',
                                                                            alt: '',
                                                                        })
                                                                    }
                                                                >
                                                                    {__('Remove', 'xgenious-ui-blocks')}
                                                                </Button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <button className="image-placeholder" onClick={open}>
                                                            <span className="dashicon dashicons-format-image"></span>
                                                            <p>{__('Upload Image', 'xgenious-ui-blocks')}</p>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Item Button */}
                    <div className="add-item-wrapper">
                        <Button variant="primary" onClick={addItem}>
                            + {__('Add Service Item', 'xgenious-ui-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
