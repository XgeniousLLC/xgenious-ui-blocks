/**
 * Expertise Contact Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    Button,
    ColorPicker,
    TextControl,
    TextareaControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        description,
        featureItems,
        formTitle,
        formShortcode,
        showButton,
        showCalendly,
        buttonText,
        buttonUrl,
        buttonOpenNewTab,
        calendlyText,
        calendlyUrl,
        sectionBackgroundColor,
        cardBackgroundColor,
        headingColor,
        descriptionColor,
        featureTextColor,
        featureIconColor,
        formTitleColor,
        buttonColor,
        buttonTextColor,
        calendlyColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: `xg-expertise-contact${fullWidth ? ' xg-full-width' : ''}`,
        style: {
            backgroundColor: sectionBackgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const updateFeatureItem = (index, value) => {
        const updated = featureItems.map((item, i) =>
            i === index ? { ...item, text: value } : item
        );
        setAttributes({ featureItems: updated });
    };

    const addFeatureItem = () => {
        setAttributes({ featureItems: [...featureItems, { text: '' }] });
    };

    const removeFeatureItem = (index) => {
        setAttributes({ featureItems: featureItems.filter((_, i) => i !== index) });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout', 'xgenious-ui-blocks')} initialOpen={true}>
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

                <PanelBody title={__('Feature Items', 'xgenious-ui-blocks')} initialOpen={false}>
                    {featureItems.map((item, index) => (
                        <div key={index} style={{ marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <TextControl
                                value={item.text}
                                onChange={(value) => updateFeatureItem(index, value)}
                                placeholder={__('Feature text...', 'xgenious-ui-blocks')}
                                style={{ flex: 1 }}
                            />
                            <Button
                                isDestructive
                                isSmall
                                onClick={() => removeFeatureItem(index)}
                                style={{ marginTop: '4px' }}
                            >
                                ✕
                            </Button>
                        </div>
                    ))}
                    <Button variant="secondary" onClick={addFeatureItem} style={{ marginTop: '8px' }}>
                        {__('+ Add Item', 'xgenious-ui-blocks')}
                    </Button>
                </PanelBody>

                <PanelBody title={__('Form Settings', 'xgenious-ui-blocks')} initialOpen={false}>
                    <TextareaControl
                        label={__('Form Shortcode', 'xgenious-ui-blocks')}
                        value={formShortcode}
                        onChange={(value) => setAttributes({ formShortcode: value })}
                        placeholder="[contact-form-7 id=&quot;123&quot;]"
                        help={__('Enter a shortcode to render the form', 'xgenious-ui-blocks')}
                        rows={3}
                    />
                </PanelBody>

                <PanelBody title={__('Button & Calendly', 'xgenious-ui-blocks')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Button', 'xgenious-ui-blocks')}
                        checked={showButton}
                        onChange={(value) => setAttributes({ showButton: value })}
                    />
                    {showButton && (
                        <>
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
                        </>
                    )}
                    <ToggleControl
                        label={__('Show Calendly Link', 'xgenious-ui-blocks')}
                        checked={showCalendly}
                        onChange={(value) => setAttributes({ showCalendly: value })}
                    />
                    <TextControl
                        label={__('Calendly URL', 'xgenious-ui-blocks')}
                        value={calendlyUrl}
                        onChange={(value) => setAttributes({ calendlyUrl: value })}
                        placeholder="https://calendly.com/..."
                    />
                </PanelBody>

                <PanelBody title={__('Colors', 'xgenious-ui-blocks')} initialOpen={false}>
                    <p style={{ fontWeight: 600 }}>{__('Section Background', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={sectionBackgroundColor}
                        onChangeComplete={(value) => setAttributes({ sectionBackgroundColor: value.hex })}
                    />
                    <p style={{ fontWeight: 600, marginTop: '16px' }}>{__('Card Background', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={cardBackgroundColor}
                        onChangeComplete={(value) => setAttributes({ cardBackgroundColor: value.hex })}
                    />
                    <p style={{ fontWeight: 600, marginTop: '16px' }}>{__('Heading Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={headingColor}
                        onChangeComplete={(value) => setAttributes({ headingColor: value.hex })}
                    />
                    <p style={{ fontWeight: 600, marginTop: '16px' }}>{__('Description Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={descriptionColor}
                        onChangeComplete={(value) => setAttributes({ descriptionColor: value.hex })}
                    />
                    <p style={{ fontWeight: 600, marginTop: '16px' }}>{__('Feature Text Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={featureTextColor}
                        onChangeComplete={(value) => setAttributes({ featureTextColor: value.hex })}
                    />
                    <p style={{ fontWeight: 600, marginTop: '16px' }}>{__('Feature Icon Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={featureIconColor}
                        onChangeComplete={(value) => setAttributes({ featureIconColor: value.hex })}
                    />
                    <p style={{ fontWeight: 600, marginTop: '16px' }}>{__('Form Title Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={formTitleColor}
                        onChangeComplete={(value) => setAttributes({ formTitleColor: value.hex })}
                    />
                    <p style={{ fontWeight: 600, marginTop: '16px' }}>{__('Button Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={buttonColor}
                        onChangeComplete={(value) => setAttributes({ buttonColor: value.hex })}
                    />
                    <p style={{ fontWeight: 600, marginTop: '16px' }}>{__('Button Text Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={buttonTextColor}
                        onChangeComplete={(value) => setAttributes({ buttonTextColor: value.hex })}
                    />
                    <p style={{ fontWeight: 600, marginTop: '16px' }}>{__('Calendly Text Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={calendlyColor}
                        onChangeComplete={(value) => setAttributes({ calendlyColor: value.hex })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="xg-expertise-contact-container">
                    <div className="expertise-contact-inner">

                        {/* Left Column */}
                        <div className="expertise-contact-left">
                            <RichText
                                tagName="h2"
                                className="expertise-contact-heading"
                                value={heading}
                                onChange={(value) => setAttributes({ heading: value })}
                                placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                                style={{ color: headingColor }}
                            />
                            <RichText
                                tagName="p"
                                className="expertise-contact-description"
                                value={description}
                                onChange={(value) => setAttributes({ description: value })}
                                placeholder={__('Enter description...', 'xgenious-ui-blocks')}
                                style={{ color: descriptionColor }}
                            />
                            <ul className="expertise-feature-list">
                                {featureItems.map((item, index) => (
                                    <li key={index} className="expertise-feature-item">
                                        <span className="feature-icon" style={{ color: featureIconColor }}>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="11" cy="11" r="11" fill="currentColor"/>
                                                <path d="M6.5 11.5l3 3 6-6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </span>
                                        <span className="feature-text" style={{ color: featureTextColor }}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column */}
                        <div className="expertise-contact-right">
                            <div className="expertise-contact-card" style={{ backgroundColor: cardBackgroundColor }}>
                                <RichText
                                    tagName="p"
                                    className="expertise-form-title"
                                    value={formTitle}
                                    onChange={(value) => setAttributes({ formTitle: value })}
                                    placeholder={__('Form title...', 'xgenious-ui-blocks')}
                                    style={{ color: formTitleColor }}
                                />
                                <div className="expertise-shortcode-preview">
                                    {formShortcode ? (
                                        <p className="shortcode-display">{formShortcode}</p>
                                    ) : (
                                        <p className="shortcode-placeholder">
                                            {__('Enter a form shortcode in the sidebar settings', 'xgenious-ui-blocks')}
                                        </p>
                                    )}
                                </div>
                                <div className="expertise-card-footer">
                                    {showButton && (
                                        <RichText
                                            tagName="span"
                                            className="expertise-cta-button"
                                            value={buttonText}
                                            onChange={(value) => setAttributes({ buttonText: value })}
                                            placeholder={__('Button text', 'xgenious-ui-blocks')}
                                            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
                                        />
                                    )}
                                    {showCalendly && (
                                        <RichText
                                            tagName="span"
                                            className="expertise-calendly-link"
                                            value={calendlyText}
                                            onChange={(value) => setAttributes({ calendlyText: value })}
                                            placeholder={__('Calendly text', 'xgenious-ui-blocks')}
                                            style={{ color: calendlyColor }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
