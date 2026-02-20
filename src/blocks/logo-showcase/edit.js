/**
 * Logo Showcase Block - Edit Component
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
    SelectControl,
    ToggleControl,
    Button,
    ColorPicker,
    TextControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        logos,
        backgroundColor,
        textColor,
        contentAlignment,
        logoSize,
        logoGap,
        paddingTop,
        paddingBottom,
        innerPaddingTop,
        innerPaddingBottom,
        showTopBorder,
        showBottomBorder,
        grayscale,
    } = attributes;

    const blockProps = useBlockProps({
        className: `xg-logo-showcase align-${contentAlignment}`,
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const addLogo = (media) => {
        const newLogo = {
            id: media.id,
            url: media.url,
            alt: media.alt || '',
            link: '',
        };
        setAttributes({ logos: [...logos, newLogo] });
    };

    const updateLogo = (index, key, value) => {
        const updatedLogos = [...logos];
        updatedLogos[index][key] = value;
        setAttributes({ logos: updatedLogos });
    };

    const removeLogo = (index) => {
        const updatedLogos = logos.filter((_, i) => i !== index);
        setAttributes({ logos: updatedLogos });
    };

    const logoSizeClass = {
        small: 'logo-size-sm',
        medium: 'logo-size-md',
        large: 'logo-size-lg',
    }[logoSize] || 'logo-size-md';

    return (
        <>
            <InspectorControls>
                {/* Content Settings */}
                <PanelBody title={__('Content Settings', 'xgenious-ui-blocks')} initialOpen={true}>
                    <SelectControl
                        label={__('Content Alignment', 'xgenious-ui-blocks')}
                        value={contentAlignment}
                        options={[
                            { label: __('Left', 'xgenious-ui-blocks'), value: 'left' },
                            { label: __('Center', 'xgenious-ui-blocks'), value: 'center' },
                        ]}
                        onChange={(value) => setAttributes({ contentAlignment: value })}
                    />
                </PanelBody>

                {/* Logo Settings */}
                <PanelBody title={__('Logo Settings', 'xgenious-ui-blocks')}>
                    <SelectControl
                        label={__('Logo Size', 'xgenious-ui-blocks')}
                        value={logoSize}
                        options={[
                            { label: __('Small', 'xgenious-ui-blocks'), value: 'small' },
                            { label: __('Medium', 'xgenious-ui-blocks'), value: 'medium' },
                            { label: __('Large', 'xgenious-ui-blocks'), value: 'large' },
                        ]}
                        onChange={(value) => setAttributes({ logoSize: value })}
                    />

                    <RangeControl
                        label={__('Logo Gap (px)', 'xgenious-ui-blocks')}
                        value={logoGap}
                        onChange={(value) => setAttributes({ logoGap: value })}
                        min={20}
                        max={100}
                        step={4}
                    />

                    <ToggleControl
                        label={__('Grayscale Effect', 'xgenious-ui-blocks')}
                        checked={grayscale}
                        onChange={(value) => setAttributes({ grayscale: value })}
                        help={__('Logos appear in grayscale and show color on hover', 'xgenious-ui-blocks')}
                    />
                </PanelBody>

                {/* Style Settings */}
                <PanelBody title={__('Style Settings', 'xgenious-ui-blocks')}>
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

                    <RangeControl
                        label={__('Inner Padding Top (px)', 'xgenious-ui-blocks')}
                        value={innerPaddingTop}
                        onChange={(value) => setAttributes({ innerPaddingTop: value })}
                        min={0}
                        max={200}
                        step={4}
                    />

                    <RangeControl
                        label={__('Inner Padding Bottom (px)', 'xgenious-ui-blocks')}
                        value={innerPaddingBottom}
                        onChange={(value) => setAttributes({ innerPaddingBottom: value })}
                        min={0}
                        max={200}
                        step={4}
                    />

                    <ToggleControl
                        label={__('Show Top Border', 'xgenious-ui-blocks')}
                        checked={showTopBorder}
                        onChange={(value) => setAttributes({ showTopBorder: value })}
                    />

                    <ToggleControl
                        label={__('Show Bottom Border', 'xgenious-ui-blocks')}
                        checked={showBottomBorder}
                        onChange={(value) => setAttributes({ showBottomBorder: value })}
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
                </PanelBody>

                {/* Manage Logos */}
                <PanelBody title={__('Manage Logos', 'xgenious-ui-blocks')}>
                    {logos.map((logo, index) => (
                        <div key={index} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
                            <p style={{ fontWeight: 600, marginBottom: '8px' }}>
                                {__('Logo', 'xgenious-ui-blocks')} #{index + 1}
                            </p>
                            {logo.url && (
                                <img
                                    src={logo.url}
                                    alt={logo.alt}
                                    style={{ maxWidth: '100px', marginBottom: '8px', display: 'block' }}
                                />
                            )}
                            <TextControl
                                label={__('Link URL', 'xgenious-ui-blocks')}
                                value={logo.link}
                                onChange={(value) => updateLogo(index, 'link', value)}
                                placeholder="https://example.com"
                            />
                            <Button
                                variant="secondary"
                                isDestructive
                                onClick={() => removeLogo(index)}
                                style={{ marginTop: '8px' }}
                            >
                                {__('Remove Logo', 'xgenious-ui-blocks')}
                            </Button>
                        </div>
                    ))}

                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={addLogo}
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <Button variant="primary" onClick={open}>
                                    {__('Add Logo', 'xgenious-ui-blocks')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={`xg-container ${showTopBorder ? 'has-top-border' : ''} ${showBottomBorder ? 'has-bottom-border' : ''}`}>
                    <div className="logo-showcase-inner" style={{ paddingTop: `${innerPaddingTop}px`, paddingBottom: `${innerPaddingBottom}px` }}>
                        <div className="xg-row">
                            {/* Heading - Left Side */}
                            <div className="logo-showcase-heading">
                                <RichText
                                    tagName="h2"
                                    className="showcase-title"
                                    value={heading}
                                    onChange={(value) => setAttributes({ heading: value })}
                                    placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                                />
                            </div>

                            {/* Logos - Right Side */}
                            <div
                                className={`logo-showcase-grid ${logoSizeClass} ${grayscale ? 'grayscale-effect' : ''}`}
                                style={{ gap: `${logoGap}px` }}
                            >
                                {logos.length > 0 ? (
                                    logos.map((logo, index) => (
                                        <div key={index} className="logo-item">
                                            <img src={logo.url} alt={logo.alt || `Logo ${index + 1}`} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="logo-placeholder">
                                        <p>{__('Add logos from the sidebar', 'xgenious-ui-blocks')} →</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
