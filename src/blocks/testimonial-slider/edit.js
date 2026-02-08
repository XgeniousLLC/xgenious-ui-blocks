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
        updatedTestimonials[index][key] = value;
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

                {/* Individual Testimonial Settings */}
                {testimonials.map((testimonial, index) => (
                    <PanelBody
                        key={index}
                        title={`${__('Testimonial', 'xgenious-ui-blocks')} ${index + 1}: ${testimonial.authorName || __('Untitled', 'xgenious-ui-blocks')}`}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__('Enable Video', 'xgenious-ui-blocks')}
                            checked={testimonial.hasVideo}
                            onChange={(value) => updateTestimonial(index, 'hasVideo', value)}
                            help={__('Show video thumbnail with play button', 'xgenious-ui-blocks')}
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

                        <div style={{ marginTop: '16px' }}>
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
            </InspectorControls>

            <div {...blockProps}>
                <div className={fullWidth ? '' : 'xg-container'}>
                    <div className="testimonial-slider-header">
                        {/* Heading */}
                        <RichText
                            tagName="h2"
                            className="testimonial-slider-heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                            style={{ color: headingColor }}
                        />

                        {/* Navigation (Static in Editor) */}
                        <div className="testimonial-nav">
                            <button className="nav-btn nav-prev">←</button>
                            <button className="nav-btn nav-next">→</button>
                        </div>
                    </div>

                    {/* Testimonials Grid */}
                    <div className={`testimonial-slider-wrapper slides-${slidesPerView}`}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="testimonial-slide"
                                style={{ backgroundColor: cardBackgroundColor }}
                            >
                                <div className="testimonial-content">
                                    {/* Quote Icon */}
                                    <div className="quote-icon" style={{ color: quoteIconColor }}>
                                        "
                                    </div>

                                    {/* Quote Text */}
                                    <TextareaControl
                                        className="testimonial-quote-input"
                                        value={testimonial.quote}
                                        onChange={(value) => updateTestimonial(index, 'quote', value)}
                                        placeholder={__('Enter testimonial...', 'xgenious-ui-blocks')}
                                        rows={4}
                                    />

                                    {/* Author Info */}
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

                                {/* Author Image/Video */}
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
                                            value={testimonial.authorImage.id}
                                            render={({ open }) => (
                                                <div className="media-wrapper">
                                                    {testimonial.authorImage.url ? (
                                                        <>
                                                            <img
                                                                src={testimonial.authorImage.url}
                                                                alt={testimonial.authorImage.alt}
                                                                className="author-image"
                                                            />
                                                            {testimonial.hasVideo && (
                                                                <div className="play-button-overlay">
                                                                    <span className="play-icon">▶</span>
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
