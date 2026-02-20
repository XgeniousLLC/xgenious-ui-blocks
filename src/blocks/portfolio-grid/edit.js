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
                <div className="portfolio-grid-container">
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
                            <div key={index} className="portfolio-item" style={{ '--card-bg': project.backgroundColor }}>
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
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_4959_8360)">
                                                <path d="M0.376548 11.8061L9.61234 2.57031H4.14271C3.80187 2.57031 3.47498 2.43491 3.23397 2.1939C2.99296 1.95289 2.85756 1.626 2.85756 1.28516C2.85756 0.944312 2.99296 0.617427 3.23397 0.376414C3.47498 0.1354 3.80187 0 4.14271 0L12.715 0C13.0558 0 13.3827 0.1354 13.6237 0.376414C13.8647 0.617427 14.0001 0.944312 14.0001 1.28516V9.85742C14.0001 10.1983 13.8647 10.5252 13.6237 10.7662C13.3827 11.0072 13.0558 11.1426 12.715 11.1426C12.3741 11.1426 12.0472 11.0072 11.8062 10.7662C11.5652 10.5252 11.4298 10.1983 11.4298 9.85742V4.3878L2.19403 13.6236C1.95293 13.8642 1.62618 13.9992 1.28557 13.999C0.944965 13.9989 0.618359 13.8635 0.377512 13.6226C0.136666 13.3818 0.00127955 13.0552 0.00109881 12.7146C0.000918075 12.374 0.135958 12.0472 0.376548 11.8061Z" fill="currentColor"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_4959_8360">
                                                    <rect width="14" height="14" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </Button>
                                </div>

                                <div className="portfolio-item-image">
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
                                                <>
                                                    {project.image.url ? (
                                                        <div className="portfolio-image-wrap">
                                                            <img src={project.image.url} alt={project.image.alt} onClick={open} style={{ cursor: 'pointer' }} />
                                                            <Button
                                                                className="portfolio-image-remove"
                                                                isDestructive
                                                                isSmall
                                                                onClick={() =>
                                                                    updateProject(index, 'image', {
                                                                        id: null,
                                                                        url: '',
                                                                        alt: '',
                                                                    })
                                                                }
                                                            >
                                                                ✕
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button className="portfolio-image-upload" variant="secondary" onClick={open}>
                                                            + {__('Upload Image', 'xgenious-ui-blocks')}
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </MediaUploadCheck>
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
