/**
 * Testimonial Slider Block - Edit Component
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
    TextareaControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        testimonials,
        slidesPerView,
        backgroundColor,
        cardBackgroundColor,
        textColor,
        headingColor,
        quoteIconColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'xg-testimonial-slider',
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const addTestimonial = () => {
        const newTestimonial = {
            quote: 'Enter testimonial text here...',
            authorName: 'Author Name',
            authorPosition: 'Position',
            authorImage: { id: null, url: '', alt: '' },
            hasVideo: false,
            videoUrl: '',
        };
        setAttributes({ testimonials: [...testimonials, newTestimonial] });
    };

    const removeTestimonial = (index) => {
        const updatedTestimonials = testimonials.filter((_, i) => i !== index);
        setAttributes({ testimonials: updatedTestimonials });
    };

    const updateTestimonial = (index, key, value) => {
        const updatedTestimonials = [...testimonials];
        updatedTestimonials[index] = { ...updatedTestimonials[index], [key]: value };
        setAttributes({ testimonials: updatedTestimonials });
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
                        label={__('Slides Per View', 'xgenious-ui-blocks')}
                        value={slidesPerView}
                        onChange={(value) => setAttributes({ slidesPerView: value })}
                        min={1}
                        max={3}
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

                    <p style={{ marginTop: '16px' }}>{__('Card Background', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={cardBackgroundColor}
                        onChangeComplete={(value) => setAttributes({ cardBackgroundColor: value.hex })}
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

                    <p style={{ marginTop: '16px' }}>{__('Quote Icon Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={quoteIconColor}
                        onChangeComplete={(value) => setAttributes({ quoteIconColor: value.hex })}
                    />
                </PanelBody>

                <PanelBody title={__('Manage Testimonials', 'xgenious-ui-blocks')} initialOpen={false}>
                    {testimonials.map((testimonial, index) => (
                        <PanelBody
                            key={index}
                            title={`${__('Testimonial', 'xgenious-ui-blocks')} ${index + 1}: ${testimonial.authorName || __('Untitled', 'xgenious-ui-blocks')}`}
                            initialOpen={false}
                        >
                            <TextareaControl
                                label={__('Quote', 'xgenious-ui-blocks')}
                                value={testimonial.quote}
                                onChange={(value) => updateTestimonial(index, 'quote', value)}
                                rows={3}
                            />

                            <TextControl
                                label={__('Author Name', 'xgenious-ui-blocks')}
                                value={testimonial.authorName}
                                onChange={(value) => updateTestimonial(index, 'authorName', value)}
                            />

                            <TextControl
                                label={__('Position', 'xgenious-ui-blocks')}
                                value={testimonial.authorPosition}
                                onChange={(value) => updateTestimonial(index, 'authorPosition', value)}
                            />

                            <p style={{ fontWeight: 600, marginBottom: '8px' }}>{__('Author Image', 'xgenious-ui-blocks')}</p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) =>
                                        updateTestimonial(index, 'authorImage', {
                                            id: media.id,
                                            url: media.url,
                                            alt: media.alt || '',
                                        })
                                    }
                                    allowedTypes={['image']}
                                    value={testimonial.authorImage?.id}
                                    render={({ open }) => (
                                        <div style={{ marginBottom: '12px' }}>
                                            {testimonial.authorImage?.url ? (
                                                <div>
                                                    <img
                                                        src={testimonial.authorImage.url}
                                                        alt={testimonial.authorImage.alt}
                                                        style={{ width: '100%', marginBottom: '8px', borderRadius: '8px' }}
                                                    />
                                                    <Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
                                                        {__('Replace Image', 'xgenious-ui-blocks')}
                                                    </Button>
                                                    <Button
                                                        isDestructive
                                                        onClick={() =>
                                                            updateTestimonial(index, 'authorImage', {
                                                                id: null,
                                                                url: '',
                                                                alt: '',
                                                            })
                                                        }
                                                    >
                                                        {__('Remove', 'xgenious-ui-blocks')}
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button variant="primary" onClick={open}>
                                                    {__('Upload Image', 'xgenious-ui-blocks')}
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>

                            <ToggleControl
                                label={__('Enable Video', 'xgenious-ui-blocks')}
                                checked={testimonial.hasVideo}
                                onChange={(value) => updateTestimonial(index, 'hasVideo', value)}
                                help={__('Show play button overlay on image', 'xgenious-ui-blocks')}
                            />

                            {testimonial.hasVideo && (
                                <TextControl
                                    label={__('Video URL', 'xgenious-ui-blocks')}
                                    value={testimonial.videoUrl}
                                    onChange={(value) => updateTestimonial(index, 'videoUrl', value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    help={__('YouTube, Vimeo, or direct video URL', 'xgenious-ui-blocks')}
                                />
                            )}

                            <div style={{ marginTop: '12px' }}>
                                <Button
                                    isDestructive
                                    variant="secondary"
                                    onClick={() => removeTestimonial(index)}
                                >
                                    {__('Remove Testimonial', 'xgenious-ui-blocks')}
                                </Button>
                            </div>
                        </PanelBody>
                    ))}
                    <Button variant="primary" onClick={addTestimonial} style={{ marginTop: '12px' }}>
                        {__('Add Testimonial', 'xgenious-ui-blocks')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={fullWidth ? '' : 'xg-container'}>
                    <div className="testimonial-slider-header">
                        <RichText
                            tagName="h2"
                            className="testimonial-slider-heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                            style={{ color: headingColor }}
                        />

                        <div className="testimonial-nav">
                            <button className="nav-btn nav-prev">←</button>
                            <button className="nav-btn nav-next">→</button>
                        </div>
                    </div>

                    <div className={`testimonial-slider-wrapper slides-${slidesPerView}`}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="testimonial-slide"
                                style={{ backgroundColor: cardBackgroundColor }}
                            >
                              <div className="testimonial-slide-inner">
                                <div className="testimonial-content">
                                    <div className="quote-icon" style={{ color: quoteIconColor }}>
                                        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.75075 0H12L6.07808 14H0L2.75075 0ZM14.7508 0H24L18.0901 14H12L14.7508 0Z" fill="currentColor"/>
                                        </svg>
                                    </div>

                                    <TextareaControl
                                        className="testimonial-quote-input"
                                        value={testimonial.quote}
                                        onChange={(value) => updateTestimonial(index, 'quote', value)}
                                        placeholder={__('Enter testimonial...', 'xgenious-ui-blocks')}
                                        rows={4}
                                    />

                                    <div className="testimonial-author-info">
                                        <TextControl
                                            className="author-name-input"
                                            value={testimonial.authorName}
                                            onChange={(value) => updateTestimonial(index, 'authorName', value)}
                                            placeholder={__('Author name', 'xgenious-ui-blocks')}
                                        />
                                        <TextControl
                                            className="author-position-input"
                                            value={testimonial.authorPosition}
                                            onChange={(value) => updateTestimonial(index, 'authorPosition', value)}
                                            placeholder={__('Position', 'xgenious-ui-blocks')}
                                        />
                                    </div>
                                </div>

                                <div className="testimonial-media">
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) =>
                                                updateTestimonial(index, 'authorImage', {
                                                    id: media.id,
                                                    url: media.url,
                                                    alt: media.alt || '',
                                                })
                                            }
                                            allowedTypes={['image']}
                                            value={testimonial.authorImage?.id}
                                            render={({ open }) => (
                                                <div className="media-wrapper">
                                                    {testimonial.authorImage?.url ? (
                                                        <>
                                                            <img
                                                                src={testimonial.authorImage.url}
                                                                alt={testimonial.authorImage.alt}
                                                                className="author-image"
                                                            />
                                                            {testimonial.hasVideo && (
                                                                <div className="play-button-overlay">
                                                                    <span className="play-icon">
                                                                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M2.28547 0.308689C1.02329 -0.415315 0 0.177798 0 1.63238V12.3666C0 13.8226 1.02329 14.415 2.28547 13.6917L11.6677 8.31101C12.9303 7.58675 12.9303 6.41334 11.6677 5.68925L2.28547 0.308689Z" fill="currentColor"/>
                                                                    </svg>
                                                                </span>
                                                                </div>
                                                            )}
                                                            <div className="media-actions">
                                                                <Button variant="secondary" isSmall onClick={open}>
                                                                    {__('Change', 'xgenious-ui-blocks')}
                                                                </Button>
                                                                <Button
                                                                    isDestructive
                                                                    isSmall
                                                                    onClick={() =>
                                                                        updateTestimonial(index, 'authorImage', {
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
                                                        <button className="media-placeholder" onClick={open}>
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
                            </div>
                        ))}
                    </div>

                    <div className="add-testimonial-wrapper">
                        <Button variant="secondary" onClick={addTestimonial}>
                            + {__('Add Testimonial', 'xgenious-ui-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
