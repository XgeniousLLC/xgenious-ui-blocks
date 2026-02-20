/**
 * Hero Banner Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    URLInput,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
    ColorPicker,
    Button,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        badge,
        badgeIcon,
        heading,
        description,
        primaryButtonText,
        primaryButtonUrl,
        secondaryButtonText,
        secondaryButtonUrl,
        showSecondaryButton,
        backgroundColor,
        textColor,
        primaryColor,
        contentAlignment,
        paddingTop,
        paddingBottom,
        enableDecorations,
        fullWidth,
        heroImage,
        showImage,
    } = attributes;

    const blockProps = useBlockProps({
        className: `xg-hero-banner xg-hero-banner-default align-${contentAlignment} ${fullWidth ? 'alignfull' : ''}`,
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <>
            <InspectorControls>
                {/* Content Settings */}
                <PanelBody title={__('Content Settings', 'xgenious-ui-blocks')} initialOpen={true}>
                    <TextControl
                        label={__('Badge Text', 'xgenious-ui-blocks')}
                        value={badge}
                        onChange={(value) => setAttributes({ badge: value })}
                    />
                    <TextControl
                        label={__('Badge Icon (Emoji)', 'xgenious-ui-blocks')}
                        value={badgeIcon}
                        onChange={(value) => setAttributes({ badgeIcon: value })}
                        help={__('Add an emoji like 🚀 or leave empty', 'xgenious-ui-blocks')}
                    />
                </PanelBody>

                {/* Image Settings */}
                <PanelBody title={__('Image Settings', 'xgenious-ui-blocks')}>
                    <ToggleControl
                        label={__('Show Hero Image', 'xgenious-ui-blocks')}
                        checked={showImage}
                        onChange={(value) => setAttributes({ showImage: value })}
                        help={__('Display image on the right side', 'xgenious-ui-blocks')}
                    />

                    {showImage && (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) =>
                                    setAttributes({
                                        heroImage: {
                                            id: media.id,
                                            url: media.url,
                                            alt: media.alt || '',
                                        },
                                    })
                                }
                                allowedTypes={['image']}
                                value={heroImage.id}
                                render={({ open }) => (
                                    <div>
                                        {heroImage.url ? (
                                            <>
                                                <img
                                                    src={heroImage.url}
                                                    alt={heroImage.alt}
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
                                                                heroImage: { id: null, url: '', alt: '' },
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
                    )}
                </PanelBody>

                {/* Button Settings */}
                <PanelBody title={__('Button Settings', 'xgenious-ui-blocks')}>
                    <TextControl
                        label={__('Primary Button Text', 'xgenious-ui-blocks')}
                        value={primaryButtonText}
                        onChange={(value) => setAttributes({ primaryButtonText: value })}
                    />
                    <p>{__('Primary Button URL', 'xgenious-ui-blocks')}</p>
                    <URLInput
                        value={primaryButtonUrl}
                        onChange={(value) => setAttributes({ primaryButtonUrl: value })}
                    />

                    <hr style={{ margin: '20px 0' }} />

                    <ToggleControl
                        label={__('Show Secondary Button', 'xgenious-ui-blocks')}
                        checked={showSecondaryButton}
                        onChange={(value) => setAttributes({ showSecondaryButton: value })}
                    />

                    {showSecondaryButton && (
                        <>
                            <TextControl
                                label={__('Secondary Button Text', 'xgenious-ui-blocks')}
                                value={secondaryButtonText}
                                onChange={(value) => setAttributes({ secondaryButtonText: value })}
                            />
                            <p>{__('Secondary Button URL', 'xgenious-ui-blocks')}</p>
                            <URLInput
                                value={secondaryButtonUrl}
                                onChange={(value) => setAttributes({ secondaryButtonUrl: value })}
                            />
                        </>
                    )}
                </PanelBody>

                {/* Style Settings */}
                <PanelBody title={__('Style Settings', 'xgenious-ui-blocks')}>
                    <SelectControl
                        label={__('Content Alignment', 'xgenious-ui-blocks')}
                        value={contentAlignment}
                        options={[
                            { label: __('Left', 'xgenious-ui-blocks'), value: 'left' },
                            { label: __('Center', 'xgenious-ui-blocks'), value: 'center' },
                        ]}
                        onChange={(value) => setAttributes({ contentAlignment: value })}
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

                    <ToggleControl
                        label={__('Enable Decorations', 'xgenious-ui-blocks')}
                        checked={enableDecorations}
                        onChange={(value) => setAttributes({ enableDecorations: value })}
                    />

                    <ToggleControl
                        label={__('Full Width Layout', 'xgenious-ui-blocks')}
                        checked={fullWidth}
                        onChange={(value) => setAttributes({ fullWidth: value })}
                        help={__('Make the section span the full width of the page', 'xgenious-ui-blocks')}
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

                    <p style={{ marginTop: '16px' }}>{__('Primary Color (Buttons)', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={primaryColor}
                        onChangeComplete={(value) => setAttributes({ primaryColor: value.hex })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {/* Decorations */}
                {enableDecorations && (
                    <div className="hero-decorations">
                        <div className="decoration decoration-1"></div>
                        <div className="decoration decoration-2"></div>
                        <div className="decoration decoration-3"></div>
                    </div>
                )}

                {/* Content Container */}
                <div className="xg-container">
                    <div className="xg-row xg-align-center">
                        <div className="xg-col-12 xg-col-lg-7">
                            <div className="hero-content">
                                {/* Badge */}
                                {badge && (
                                    <div className="xg-badge hero-badge">
                                        <span>{badge}</span>
                                        {badgeIcon && <span className="badge-icon">{badgeIcon}</span>}
                                    </div>
                                )}

                                {/* Heading */}
                                <RichText
                                    tagName="h1"
                                    className="hero-heading xg-heading xg-h1"
                                    value={heading}
                                    onChange={(value) => setAttributes({ heading: value })}
                                    placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                                />

                                {/* Description */}
                                <RichText
                                    tagName="p"
                                    className="hero-description xg-text xg-text-lg"
                                    value={description}
                                    onChange={(value) => setAttributes({ description: value })}
                                    placeholder={__('Enter description...', 'xgenious-ui-blocks')}
                                />

                                {/* Buttons */}
                                <div className="hero-buttons">
                                    <a
                                        href={primaryButtonUrl}
                                        className="xg-btn xg-btn-primary"
                                        style={{
                                            backgroundColor: primaryColor,
                                            borderColor: primaryColor
                                        }}
                                    >
                                        {primaryButtonText}
                                    </a>

                                    {showSecondaryButton && (
                                        <a
                                            href={secondaryButtonUrl}
                                            className="xg-btn xg-btn-ghost"
                                        >
                                            {secondaryButtonText}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Hero Image Column */}
                        {showImage && (
                            <div className="xg-col-12 xg-col-lg-6">
                                <div className="hero-image">
                                    {heroImage.url ? (
                                        <img
                                            src={heroImage.url}
                                            alt={heroImage.alt || __('Hero Image', 'xgenious-ui-blocks')}
                                        />
                                    ) : (
                                        <div className="hero-image-placeholder">
                                            <p>{__('Upload an image from the sidebar', 'xgenious-ui-blocks')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
