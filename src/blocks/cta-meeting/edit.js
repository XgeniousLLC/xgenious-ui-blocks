/**
 * CTA for Meeting Block - Edit Component
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
        subtitle,
        buttonText,
        buttonUrl,
        buttonOpenNewTab,
        backgroundImage,
        personImage,
        backgroundColor,
        headingColor,
        subtitleColor,
        buttonColor,
        buttonTextColor,
        borderColor,
        paddingTop,
        paddingBottom,
        sectionBackgroundColor,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'xg-cta-meeting',
        style: {
            backgroundColor: sectionBackgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
                    <ToggleControl
                        label={__('Full Width', 'xgenious-ui-blocks')}
                        checked={fullWidth}
                        onChange={(value) => setAttributes({ fullWidth: value })}
                    />

                    <RangeControl
                        label={__('Padding Top (px)', 'xgenious-ui-blocks')}
                        value={paddingTop}
                        onChange={(value) => setAttributes({ paddingTop: value })}
                        min={0}
                        max={200}
                        step={10}
                    />

                    <RangeControl
                        label={__('Padding Bottom (px)', 'xgenious-ui-blocks')}
                        value={paddingBottom}
                        onChange={(value) => setAttributes({ paddingBottom: value })}
                        min={0}
                        max={200}
                        step={10}
                    />
                </PanelBody>

                <PanelBody title={__('Button Settings', 'xgenious-ui-blocks')}>
                    <TextControl
                        label={__('Button URL', 'xgenious-ui-blocks')}
                        value={buttonUrl}
                        onChange={(value) => setAttributes({ buttonUrl: value })}
                        placeholder="https://"
                    />

                    <ToggleControl
                        label={__('Open in new tab', 'xgenious-ui-blocks')}
                        checked={buttonOpenNewTab}
                        onChange={(value) => setAttributes({ buttonOpenNewTab: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Images', 'xgenious-ui-blocks')}>
                    <p style={{ fontWeight: 600, marginBottom: '8px' }}>{__('Background Image', 'xgenious-ui-blocks')}</p>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) =>
                                setAttributes({
                                    backgroundImage: {
                                        id: media.id,
                                        url: media.url,
                                        alt: media.alt || '',
                                    },
                                })
                            }
                            allowedTypes={['image']}
                            value={backgroundImage?.id}
                            render={({ open }) => (
                                <div style={{ marginBottom: '16px' }}>
                                    {backgroundImage?.url ? (
                                        <div>
                                            <img
                                                src={backgroundImage.url}
                                                alt={backgroundImage.alt}
                                                style={{ width: '100%', marginBottom: '8px', borderRadius: '8px' }}
                                            />
                                            <Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
                                                {__('Replace', 'xgenious-ui-blocks')}
                                            </Button>
                                            <Button
                                                isDestructive
                                                onClick={() =>
                                                    setAttributes({
                                                        backgroundImage: { id: null, url: '', alt: '' },
                                                    })
                                                }
                                            >
                                                {__('Remove', 'xgenious-ui-blocks')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button variant="primary" onClick={open}>
                                            {__('Upload Background', 'xgenious-ui-blocks')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>

                    <p style={{ fontWeight: 600, marginBottom: '8px' }}>{__('Person Image', 'xgenious-ui-blocks')}</p>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) =>
                                setAttributes({
                                    personImage: {
                                        id: media.id,
                                        url: media.url,
                                        alt: media.alt || '',
                                    },
                                })
                            }
                            allowedTypes={['image']}
                            value={personImage?.id}
                            render={({ open }) => (
                                <div style={{ marginBottom: '16px' }}>
                                    {personImage?.url ? (
                                        <div>
                                            <img
                                                src={personImage.url}
                                                alt={personImage.alt}
                                                style={{ width: '100%', marginBottom: '8px', borderRadius: '8px' }}
                                            />
                                            <Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
                                                {__('Replace', 'xgenious-ui-blocks')}
                                            </Button>
                                            <Button
                                                isDestructive
                                                onClick={() =>
                                                    setAttributes({
                                                        personImage: { id: null, url: '', alt: '' },
                                                    })
                                                }
                                            >
                                                {__('Remove', 'xgenious-ui-blocks')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button variant="primary" onClick={open}>
                                            {__('Upload Person Image', 'xgenious-ui-blocks')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                </PanelBody>

                <PanelBody title={__('Color Settings', 'xgenious-ui-blocks')} initialOpen={false}>
                    <p>{__('Section Background', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={sectionBackgroundColor}
                        onChangeComplete={(value) => setAttributes({ sectionBackgroundColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Card Background', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={backgroundColor}
                        onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Heading Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={headingColor}
                        onChangeComplete={(value) => setAttributes({ headingColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Subtitle Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={subtitleColor}
                        onChangeComplete={(value) => setAttributes({ subtitleColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Button Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={buttonColor}
                        onChangeComplete={(value) => setAttributes({ buttonColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Button Text Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={buttonTextColor}
                        onChangeComplete={(value) => setAttributes({ buttonTextColor: value.hex })}
                    />

                    <p style={{ marginTop: '16px' }}>{__('Person Image Border Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={borderColor}
                        onChangeComplete={(value) => setAttributes({ borderColor: value.hex })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={fullWidth ? '' : 'xg-container'}>
                    <div
                        className="cta-meeting-card"
                        style={{
                            backgroundColor,
                            backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : 'none',
                        }}
                    >
                        <div className="cta-meeting-content">
                            <RichText
                                tagName="h2"
                                className="cta-meeting-heading"
                                value={heading}
                                onChange={(value) => setAttributes({ heading: value })}
                                placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                                style={{ color: headingColor }}
                            />

                            <RichText
                                tagName="p"
                                className="cta-meeting-subtitle"
                                value={subtitle}
                                onChange={(value) => setAttributes({ subtitle: value })}
                                placeholder={__('Enter subtitle...', 'xgenious-ui-blocks')}
                                style={{ color: subtitleColor }}
                            />

                            <div className="cta-meeting-button-wrapper">
                                <RichText
                                    tagName="span"
                                    className="cta-meeting-button"
                                    value={buttonText}
                                    onChange={(value) => setAttributes({ buttonText: value })}
                                    placeholder={__('Button text', 'xgenious-ui-blocks')}
                                    style={{
                                        backgroundColor: buttonColor,
                                        color: buttonTextColor,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="cta-meeting-person">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) =>
                                        setAttributes({
                                            personImage: {
                                                id: media.id,
                                                url: media.url,
                                                alt: media.alt || '',
                                            },
                                        })
                                    }
                                    allowedTypes={['image']}
                                    value={personImage?.id}
                                    render={({ open }) => (
                                        <div
                                            className="person-image-wrapper"
                                            style={{ borderColor }}
                                        >
                                            {personImage?.url ? (
                                                <>
                                                    <img
                                                        src={personImage.url}
                                                        alt={personImage.alt}
                                                        className="person-image"
                                                    />
                                                    <div className="person-image-actions">
                                                        <Button variant="secondary" isSmall onClick={open}>
                                                            {__('Change', 'xgenious-ui-blocks')}
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <button className="person-placeholder" onClick={open}>
                                                    <span className="dashicon dashicons-admin-users"></span>
                                                    <p>{__('Upload', 'xgenious-ui-blocks')}</p>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
