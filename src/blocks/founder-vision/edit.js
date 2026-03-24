/**
 * Founder Vision Block - Edit Component
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
        sectionTitle,
        founderName,
        founderRole,
        bio1,
        bio2,
        bio3,
        buttonText,
        buttonUrl,
        buttonOpenNewTab,
        founderImage,
        backgroundImage,
        backgroundOverlay,
        overlayColor,
        sectionBg,
        sectionTitleColor,
        nameColor,
        roleColor,
        textColor,
        highlightColor,
        buttonColor,
        buttonTextColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: `xg-founder-vision${fullWidth ? ' xg-fv-fullwidth' : ''}`,
        style: {
            backgroundColor: sectionBg,
            backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            '--xg-fv-highlight': highlightColor,
        },
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
                    <ToggleControl
                        label={__('Full Width Section', 'xgenious-ui-blocks')}
                        help={__('Section stretches full width; content stays in container.', 'xgenious-ui-blocks')}
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

                <PanelBody title={__('Background Image', 'xgenious-ui-blocks')}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) =>
                                setAttributes({
                                    backgroundImage: { id: media.id, url: media.url, alt: media.alt || '' },
                                })
                            }
                            allowedTypes={['image']}
                            value={backgroundImage?.id}
                            render={({ open }) => (
                                <div style={{ marginBottom: '12px' }}>
                                    {backgroundImage?.url ? (
                                        <div>
                                            <img
                                                src={backgroundImage.url}
                                                alt={backgroundImage.alt}
                                                style={{ width: '100%', marginBottom: '8px', borderRadius: '6px' }}
                                            />
                                            <Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
                                                {__('Replace', 'xgenious-ui-blocks')}
                                            </Button>
                                            <Button
                                                isDestructive
                                                onClick={() => setAttributes({ backgroundImage: { id: null, url: '', alt: '' } })}
                                            >
                                                {__('Remove', 'xgenious-ui-blocks')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button variant="primary" onClick={open}>
                                            {__('Upload Background Image', 'xgenious-ui-blocks')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    {backgroundImage?.url && (
                        <>
                            <p style={{ marginBottom: '4px' }}>{__('Overlay Color', 'xgenious-ui-blocks')}</p>
                            <ColorPicker
                                color={overlayColor}
                                onChangeComplete={(value) => setAttributes({ overlayColor: value.hex })}
                            />
                            <RangeControl
                                label={__('Overlay Opacity (%)', 'xgenious-ui-blocks')}
                                value={backgroundOverlay}
                                onChange={(value) => setAttributes({ backgroundOverlay: value })}
                                min={0}
                                max={100}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Founder Image', 'xgenious-ui-blocks')}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) =>
                                setAttributes({
                                    founderImage: {
                                        id: media.id,
                                        url: media.url,
                                        alt: media.alt || '',
                                    },
                                })
                            }
                            allowedTypes={['image']}
                            value={founderImage?.id}
                            render={({ open }) => (
                                <div>
                                    {founderImage?.url ? (
                                        <div>
                                            <img
                                                src={founderImage.url}
                                                alt={founderImage.alt}
                                                style={{ width: '100%', marginBottom: '8px', borderRadius: '8px' }}
                                            />
                                            <Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
                                                {__('Replace', 'xgenious-ui-blocks')}
                                            </Button>
                                            <Button
                                                isDestructive
                                                onClick={() =>
                                                    setAttributes({
                                                        founderImage: { id: null, url: '', alt: '' },
                                                    })
                                                }
                                            >
                                                {__('Remove', 'xgenious-ui-blocks')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button variant="primary" onClick={open}>
                                            {__('Upload Founder Image', 'xgenious-ui-blocks')}
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
                        color={sectionBg}
                        onChangeComplete={(value) => setAttributes({ sectionBg: value.hex })}
                    />
                    <p style={{ marginTop: '16px' }}>{__('Section Title Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={sectionTitleColor}
                        onChangeComplete={(value) => setAttributes({ sectionTitleColor: value.hex })}
                    />
                    <p style={{ marginTop: '16px' }}>{__('Name Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={nameColor}
                        onChangeComplete={(value) => setAttributes({ nameColor: value.hex })}
                    />
                    <p style={{ marginTop: '16px' }}>{__('Role Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={roleColor}
                        onChangeComplete={(value) => setAttributes({ roleColor: value.hex })}
                    />
                    <p style={{ marginTop: '16px' }}>{__('Text Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={textColor}
                        onChangeComplete={(value) => setAttributes({ textColor: value.hex })}
                    />
                    <p style={{ marginTop: '16px' }}>{__('Highlight Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={highlightColor}
                        onChangeComplete={(value) => setAttributes({ highlightColor: value.hex })}
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
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {backgroundImage?.url && backgroundOverlay > 0 && (
                    <div
                        className="xg-fv-overlay"
                        style={{
                            backgroundColor: overlayColor,
                            opacity: backgroundOverlay / 100,
                        }}
                    />
                )}
                <div className="xg-container xg-fv-inner">
                    {/* Section Title */}
                    <RichText
                        tagName="h2"
                        className="xg-fv-section-title"
                        value={sectionTitle}
                        onChange={(value) => setAttributes({ sectionTitle: value })}
                        placeholder={__('Section Title...', 'xgenious-ui-blocks')}
                        style={{ color: sectionTitleColor }}
                    />

                    {/* Two Column Layout */}
                    <div className="xg-fv-layout">
                        {/* Left: Image */}
                        <div className="xg-fv-image-col">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) =>
                                        setAttributes({
                                            founderImage: {
                                                id: media.id,
                                                url: media.url,
                                                alt: media.alt || '',
                                            },
                                        })
                                    }
                                    allowedTypes={['image']}
                                    value={founderImage?.id}
                                    render={({ open }) => (
                                        <div className="xg-fv-image-wrap" onClick={open}>
                                            {founderImage?.url ? (
                                                <img
                                                    src={founderImage.url}
                                                    alt={founderImage.alt}
                                                    className="xg-fv-image"
                                                />
                                            ) : (
                                                <div className="xg-fv-image-placeholder">
                                                    <span className="dashicons dashicons-admin-users"></span>
                                                    <p>{__('Click to upload founder image', 'xgenious-ui-blocks')}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>

                        {/* Right: Content */}
                        <div className="xg-fv-content-col">
                            <RichText
                                tagName="h3"
                                className="xg-fv-name"
                                value={founderName}
                                onChange={(value) => setAttributes({ founderName: value })}
                                placeholder={__('Founder Name...', 'xgenious-ui-blocks')}
                                style={{ color: nameColor }}
                            />

                            <RichText
                                tagName="p"
                                className="xg-fv-role"
                                value={founderRole}
                                onChange={(value) => setAttributes({ founderRole: value })}
                                placeholder={__('Role & Company...', 'xgenious-ui-blocks')}
                                style={{ color: roleColor }}
                            />

                            <RichText
                                tagName="p"
                                className="xg-fv-bio"
                                value={bio1}
                                onChange={(value) => setAttributes({ bio1: value })}
                                placeholder={__('Bio paragraph 1...', 'xgenious-ui-blocks')}
                                style={{ color: textColor }}
                            />

                            <RichText
                                tagName="p"
                                className="xg-fv-bio"
                                value={bio2}
                                onChange={(value) => setAttributes({ bio2: value })}
                                placeholder={__('Bio paragraph 2...', 'xgenious-ui-blocks')}
                                style={{ color: textColor }}
                            />

                            <RichText
                                tagName="p"
                                className="xg-fv-bio"
                                value={bio3}
                                onChange={(value) => setAttributes({ bio3: value })}
                                placeholder={__('Bio paragraph 3...', 'xgenious-ui-blocks')}
                                style={{ color: textColor }}
                            />

                            <div className="xg-fv-button-wrap">
                                <RichText
                                    tagName="span"
                                    className="xg-fv-btn"
                                    value={buttonText}
                                    onChange={(value) => setAttributes({ buttonText: value })}
                                    placeholder={__('Button text...', 'xgenious-ui-blocks')}
                                    style={{
                                        backgroundColor: buttonColor,
                                        color: buttonTextColor,
                                    }}
                                />
                                <span
                                    className="xg-fv-btn-arrow"
                                    style={{ backgroundColor: buttonColor, color: buttonTextColor }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.333 8h9.334M8.667 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
