/**
 * Hero Section Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    URLInput,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
    Button,
    ColorPicker,
    TextControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        description,
        backgroundImage,
        backgroundVideo,
        useVideo,
        overlayColor,
        overlayOpacity,
        textColor,
        titleColor,
        minHeight,
        contentAlignment,
        contentVerticalAlign,
        buttonText,
        buttonUrl,
        buttonStyle,
        showButton,
        animation,
    } = attributes;

    const blockProps = useBlockProps({
        className: `xgenious-hero-section align-${contentAlignment} valign-${contentVerticalAlign}`,
        style: {
            minHeight: `${minHeight}px`,
            color: textColor,
        },
    });

    const backgroundStyle = useVideo
        ? {}
        : {
              backgroundImage: backgroundImage.url ? `url(${backgroundImage.url})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          };

    const overlayStyle = {
        background: overlayColor,
        opacity: overlayOpacity,
    };

    return (
        <>
            <InspectorControls>
                {/* Background Settings */}
                <PanelBody title={__('Background Settings', 'xgenious-ui-blocks')} initialOpen={true}>
                    <ToggleControl
                        label={__('Use Video Background', 'xgenious-ui-blocks')}
                        checked={useVideo}
                        onChange={(value) => setAttributes({ useVideo: value })}
                    />

                    {useVideo ? (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) =>
                                    setAttributes({
                                        backgroundVideo: {
                                            id: media.id,
                                            url: media.url,
                                        },
                                    })
                                }
                                allowedTypes={['video']}
                                value={backgroundVideo.id}
                                render={({ open }) => (
                                    <div className="xgenious-ui-media-control">
                                        {backgroundVideo.url ? (
                                            <>
                                                <video src={backgroundVideo.url} style={{ width: '100%' }} />
                                                <Button isDestructive onClick={() => setAttributes({ backgroundVideo: {} })}>
                                                    {__('Remove Video', 'xgenious-ui-blocks')}
                                                </Button>
                                            </>
                                        ) : (
                                            <Button isPrimary onClick={open}>
                                                {__('Select Video', 'xgenious-ui-blocks')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    ) : (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) =>
                                    setAttributes({
                                        backgroundImage: {
                                            id: media.id,
                                            url: media.url,
                                            alt: media.alt,
                                        },
                                    })
                                }
                                allowedTypes={['image']}
                                value={backgroundImage.id}
                                render={({ open }) => (
                                    <div className="xgenious-ui-media-control">
                                        {backgroundImage.url ? (
                                            <>
                                                <img src={backgroundImage.url} alt="" style={{ width: '100%' }} />
                                                <Button isDestructive onClick={() => setAttributes({ backgroundImage: {} })}>
                                                    {__('Remove Image', 'xgenious-ui-blocks')}
                                                </Button>
                                            </>
                                        ) : (
                                            <Button isPrimary onClick={open}>
                                                {__('Select Image', 'xgenious-ui-blocks')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    )}
                </PanelBody>

                {/* Overlay Settings */}
                <PanelBody title={__('Overlay Settings', 'xgenious-ui-blocks')}>
                    <p>{__('Overlay Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker color={overlayColor} onChangeComplete={(value) => setAttributes({ overlayColor: value.hex })} />

                    <RangeControl
                        label={__('Overlay Opacity', 'xgenious-ui-blocks')}
                        value={overlayOpacity}
                        onChange={(value) => setAttributes({ overlayOpacity: value })}
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </PanelBody>

                {/* Content Settings */}
                <PanelBody title={__('Content Settings', 'xgenious-ui-blocks')}>
                    <RangeControl
                        label={__('Min Height (px)', 'xgenious-ui-blocks')}
                        value={minHeight}
                        onChange={(value) => setAttributes({ minHeight: value })}
                        min={300}
                        max={1000}
                        step={10}
                    />

                    <SelectControl
                        label={__('Horizontal Alignment', 'xgenious-ui-blocks')}
                        value={contentAlignment}
                        options={[
                            { label: __('Left', 'xgenious-ui-blocks'), value: 'left' },
                            { label: __('Center', 'xgenious-ui-blocks'), value: 'center' },
                            { label: __('Right', 'xgenious-ui-blocks'), value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ contentAlignment: value })}
                    />

                    <SelectControl
                        label={__('Vertical Alignment', 'xgenious-ui-blocks')}
                        value={contentVerticalAlign}
                        options={[
                            { label: __('Top', 'xgenious-ui-blocks'), value: 'top' },
                            { label: __('Center', 'xgenious-ui-blocks'), value: 'center' },
                            { label: __('Bottom', 'xgenious-ui-blocks'), value: 'bottom' },
                        ]}
                        onChange={(value) => setAttributes({ contentVerticalAlign: value })}
                    />

                    <p>{__('Text Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker color={textColor} onChangeComplete={(value) => setAttributes({ textColor: value.hex })} />

                    <p>{__('Title Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker color={titleColor} onChangeComplete={(value) => setAttributes({ titleColor: value.hex })} />
                </PanelBody>

                {/* Button Settings */}
                <PanelBody title={__('Button Settings', 'xgenious-ui-blocks')}>
                    <ToggleControl
                        label={__('Show Button', 'xgenious-ui-blocks')}
                        checked={showButton}
                        onChange={(value) => setAttributes({ showButton: value })}
                    />

                    {showButton && (
                        <>
                            <TextControl
                                label={__('Button Text', 'xgenious-ui-blocks')}
                                value={buttonText}
                                onChange={(value) => setAttributes({ buttonText: value })}
                            />

                            <SelectControl
                                label={__('Button Style', 'xgenious-ui-blocks')}
                                value={buttonStyle}
                                options={[
                                    { label: __('Primary', 'xgenious-ui-blocks'), value: 'primary' },
                                    { label: __('Secondary', 'xgenious-ui-blocks'), value: 'secondary' },
                                ]}
                                onChange={(value) => setAttributes({ buttonStyle: value })}
                            />

                            <p>{__('Button URL', 'xgenious-ui-blocks')}</p>
                            <URLInput value={buttonUrl} onChange={(value) => setAttributes({ buttonUrl: value })} />
                        </>
                    )}
                </PanelBody>

                {/* Animation Settings */}
                <PanelBody title={__('Animation Settings', 'xgenious-ui-blocks')}>
                    <SelectControl
                        label={__('Animation', 'xgenious-ui-blocks')}
                        value={animation}
                        options={[
                            { label: __('None', 'xgenious-ui-blocks'), value: 'none' },
                            { label: __('Fade In', 'xgenious-ui-blocks'), value: 'fadeIn' },
                            { label: __('Slide Up', 'xgenious-ui-blocks'), value: 'fadeInUp' },
                            { label: __('Zoom In', 'xgenious-ui-blocks'), value: 'zoomIn' },
                        ]}
                        onChange={(value) => setAttributes({ animation: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {/* Background */}
                <div className="hero-background" style={backgroundStyle}>
                    {useVideo && backgroundVideo.url && (
                        <video autoPlay muted loop playsInline className="hero-video">
                            <source src={backgroundVideo.url} type="video/mp4" />
                        </video>
                    )}
                </div>

                {/* Overlay */}
                <div className="hero-overlay" style={overlayStyle}></div>

                {/* Content */}
                <div className="hero-content">
                    <RichText
                        tagName="p"
                        className="hero-subtitle"
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                        placeholder={__('Enter subtitle...', 'xgenious-ui-blocks')}
                    />

                    <RichText
                        tagName="h1"
                        className="hero-title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Enter title...', 'xgenious-ui-blocks')}
                        style={{ color: titleColor }}
                    />

                    <RichText
                        tagName="p"
                        className="hero-description"
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        placeholder={__('Enter description...', 'xgenious-ui-blocks')}
                    />

                    {showButton && (
                        <a href={buttonUrl} className={`xgenious-btn btn-${buttonStyle}`}>
                            {buttonText}
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}
