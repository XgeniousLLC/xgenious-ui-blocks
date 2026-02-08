/**
 * Portfolio Grid Block - Edit Component
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
    ToggleControl,
    Button,
    ColorPicker,
    TextControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        buttonText,
        buttonUrl,
        showButton,
        projects,
        columns,
        backgroundColor,
        textColor,
        buttonColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: `xg-portfolio-grid columns-${columns}`,
        style: {
            backgroundColor,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const addProject = () => {
        const newProject = {
            title: 'New Project',
            description: 'Project description here',
            image: { id: null, url: '', alt: '' },
            link: '#',
            backgroundColor: '#A8B5FF',
        };
        setAttributes({ projects: [...projects, newProject] });
    };

    const removeProject = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setAttributes({ projects: updatedProjects });
    };

    const updateProject = (index, key, value) => {
        const updatedProjects = [...projects];
        updatedProjects[index][key] = value;
        setAttributes({ projects: updatedProjects });
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
                        min={1}
                        max={4}
                        step={1}
                    />

                    <ToggleControl
                        label={__('Show Button', 'xgenious-ui-blocks')}
                        checked={showButton}
                        onChange={(value) => setAttributes({ showButton: value })}
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

                <PanelBody title={__('Button Settings', 'xgenious-ui-blocks')}>
                    <TextControl
                        label={__('Button Text', 'xgenious-ui-blocks')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                    />
                    <p>{__('Button URL', 'xgenious-ui-blocks')}</p>
                    <URLInput
                        value={buttonUrl}
                        onChange={(value) => setAttributes({ buttonUrl: value })}
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

                    <p style={{ marginTop: '16px' }}>{__('Button Color', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={buttonColor}
                        onChangeComplete={(value) => setAttributes({ buttonColor: value.hex })}
                    />
                </PanelBody>

                <PanelBody title={__('Manage Projects', 'xgenious-ui-blocks')} initialOpen={false}>
                    {projects.map((project, index) => (
                        <PanelBody
                            key={index}
                            title={`${__('Project', 'xgenious-ui-blocks')} ${index + 1}`}
                            initialOpen={false}
                        >
                            <TextControl
                                label={__('Project Title', 'xgenious-ui-blocks')}
                                value={project.title}
                                onChange={(value) => updateProject(index, 'title', value)}
                            />
                            <TextControl
                                label={__('Project Description', 'xgenious-ui-blocks')}
                                value={project.description}
                                onChange={(value) => updateProject(index, 'description', value)}
                            />
                            <TextControl
                                label={__('Link URL', 'xgenious-ui-blocks')}
                                value={project.link}
                                onChange={(value) => updateProject(index, 'link', value)}
                                placeholder="https://"
                            />
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) =>
                                        updateProject(index, 'image', {
                                            id: media.id,
                                            url: media.url,
                                            alt: media.alt || '',
                                        })
                                    }
                                    allowedTypes={['image']}
                                    value={project.image.id}
                                    render={({ open }) => (
                                        <div style={{ marginBottom: '12px' }}>
                                            {project.image.url ? (
                                                <div>
                                                    <img
                                                        src={project.image.url}
                                                        alt={project.image.alt}
                                                        style={{ width: '100%', marginBottom: '8px' }}
                                                    />
                                                    <Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
                                                        {__('Replace Image', 'xgenious-ui-blocks')}
                                                    </Button>
                                                    <Button
                                                        isDestructive
                                                        onClick={() =>
                                                            updateProject(index, 'image', {
                                                                id: null,
                                                                url: '',
                                                                alt: '',
                                                            })
                                                        }
                                                    >
                                                        {__('Remove Image', 'xgenious-ui-blocks')}
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button variant="primary" onClick={open}>
                                                    {__('Select Image', 'xgenious-ui-blocks')}
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                            <p>{__('Card Background Color', 'xgenious-ui-blocks')}</p>
                            <ColorPicker
                                color={project.backgroundColor}
                                onChangeComplete={(value) =>
                                    updateProject(index, 'backgroundColor', value.hex)
                                }
                            />
                            <Button
                                variant="secondary"
                                isDestructive
                                onClick={() => removeProject(index)}
                                style={{ marginTop: '12px' }}
                            >
                                {__('Remove Project', 'xgenious-ui-blocks')}
                            </Button>
                        </PanelBody>
                    ))}
                    <Button variant="primary" onClick={addProject} style={{ marginTop: '12px' }}>
                        {__('Add Project', 'xgenious-ui-blocks')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={fullWidth ? '' : 'xg-container'}>
                    {/* Header */}
                    <div className="portfolio-header">
                        <RichText
                            tagName="h2"
                            className="portfolio-heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
                        />

                        {showButton && (
                            <div className="portfolio-button">
                                <a
                                    href={buttonUrl}
                                    className="xg-btn xg-btn-primary"
                                    style={{ backgroundColor: buttonColor, borderColor: buttonColor }}
                                >
                                    {buttonText}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Projects Grid */}
                    <div className="portfolio-grid">
                        {projects.map((project, index) => (
                            <div key={index} className="portfolio-item" style={{ backgroundColor: project.backgroundColor }}>
                                <div className="portfolio-item-controls">
                                    <Button isDestructive isSmall onClick={() => removeProject(index)}>
                                        ✕
                                    </Button>
                                </div>

                                <div className="portfolio-item-header">
                                    <div className="portfolio-item-content">
                                        <h3 className="portfolio-title">{project.title}</h3>
                                        <p className="portfolio-description">{project.description}</p>
                                    </div>

                                    <Button
                                        className="portfolio-link-icon"
                                        onClick={() => {}}
                                    >
                                        ↗
                                    </Button>
                                </div>

                                <div className="portfolio-item-image">
                                    {project.image.url ? (
                                        <img src={project.image.url} alt={project.image.alt} />
                                    ) : (
                                        <div className="image-placeholder">
                                            <span className="dashicon dashicons-format-image"></span>
                                            <p>{__('No Image Selected', 'xgenious-ui-blocks')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="add-project-wrapper">
                        <Button variant="primary" onClick={addProject}>
                            + {__('Add Project', 'xgenious-ui-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
