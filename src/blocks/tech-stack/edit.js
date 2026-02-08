/**
 * Tech Stack Block - Edit Component
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

    const blockProps = useBlockProps({
        className: `xg-tech-stack columns-${columns}`,
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const addTechnology = () => {
        const newTech = {
            name: 'Technology',
            image: { id: null, url: '', alt: '' },
        };
        setAttributes({ technologies: [...technologies, newTech] });
    };

    const removeTechnology = (index) => {
        const updatedTechs = technologies.filter((_, i) => i !== index);
        setAttributes({ technologies: updatedTechs });
    };

    const updateTechnology = (index, key, value) => {
        const updatedTechs = [...technologies];
        updatedTechs[index][key] = value;
        setAttributes({ technologies: updatedTechs });
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
                        min={3}
                        max={10}
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

                    <p style={{ marginTop: '16px' }}>{__('Item Background', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={itemBackgroundColor}
                        onChangeComplete={(value) => setAttributes({ itemBackgroundColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Item Border', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={itemBorderColor}
                        onChangeComplete={(value) => setAttributes({ itemBorderColor: value.hex })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={fullWidth ? '' : 'xg-container'}>
                    {/* Heading */}
                    <RichText
                        tagName="h2"
                        className="tech-stack-heading"
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                        placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                        style={{ color: headingColor }}
                    />

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
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) =>
                                            updateTechnology(index, 'image', {
                                                id: media.id,
                                                url: media.url,
                                                alt: media.alt || '',
                                            })
                                        }
                                        allowedTypes={['image']}
                                        value={tech.image.id}
                                        render={({ open }) => (
                                            <div className="tech-image-wrapper">
                                                {tech.image.url ? (
                                                    <>
                                                        <img
                                                            src={tech.image.url}
                                                            alt={tech.image.alt}
                                                            className="tech-image"
                                                        />
                                                        <div className="tech-image-actions">
                                                            <Button
                                                                variant="secondary"
                                                                isSmall
                                                                onClick={open}
                                                            >
                                                                {__('Change', 'xgenious-ui-blocks')}
                                                            </Button>
                                                            <Button
                                                                isDestructive
                                                                isSmall
                                                                onClick={() =>
                                                                    updateTechnology(index, 'image', {
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
                                                    <button
                                                        className="tech-image-placeholder"
                                                        onClick={open}
                                                    >
                                                        <span className="dashicon dashicons-format-image"></span>
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>

                                <TextControl
                                    className="tech-name-input"
                                    value={tech.name}
                                    onChange={(value) => updateTechnology(index, 'name', value)}
                                    placeholder={__('Tech name', 'xgenious-ui-blocks')}
                                />

                                <Button
                                    isDestructive
                                    isSmall
                                    className="remove-tech-btn"
                                    onClick={() => removeTechnology(index)}
                                >
                                    ✕
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="add-tech-wrapper">
                        <Button variant="secondary" onClick={addTechnology}>
                            + {__('Add Technology', 'xgenious-ui-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
