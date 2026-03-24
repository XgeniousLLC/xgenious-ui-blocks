/**
 * Team Members Block - Edit Component
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
    Button,
    ColorPicker,
    TextControl,
    SelectControl,
    ToggleControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle,
        members,
        columns,
        titleAlign,
        sectionBg,
        sectionTitleColor,
        nameColor,
        roleColor,
        paddingTop,
        paddingBottom,
        fullWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: `xg-team-members${fullWidth ? ' xg-full-width' : ''}`,
        style: {
            backgroundColor: sectionBg,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const addMember = () => {
        const newId = Date.now();
        setAttributes({
            members: [
                ...members,
                { id: newId, name: 'Team Member', role: 'Role', image: { id: null, url: '', alt: '' } },
            ],
        });
    };

    const removeMember = (index) => {
        const updated = members.filter((_, i) => i !== index);
        setAttributes({ members: updated });
    };

    const updateMember = (index, key, value) => {
        const updated = members.map((member, i) =>
            i === index ? { ...member, [key]: value } : member
        );
        setAttributes({ members: updated });
    };

    const updateMemberImage = (index, media) => {
        const updated = members.map((member, i) =>
            i === index
                ? { ...member, image: { id: media.id, url: media.url, alt: media.alt || '' } }
                : member
        );
        setAttributes({ members: updated });
    };

    const removeMemberImage = (index) => {
        const updated = members.map((member, i) =>
            i === index
                ? { ...member, image: { id: null, url: '', alt: '' } }
                : member
        );
        setAttributes({ members: updated });
    };

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
                        label={__('Columns', 'xgenious-ui-blocks')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={2}
                        max={6}
                        step={1}
                    />
                    <SelectControl
                        label={__('Title Alignment', 'xgenious-ui-blocks')}
                        value={titleAlign}
                        options={[
                            { label: 'Left', value: 'left' },
                            { label: 'Center', value: 'center' },
                            { label: 'Right', value: 'right' },
                        ]}
                        onChange={(value) => setAttributes({ titleAlign: value })}
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

                <PanelBody title={__('Color Settings', 'xgenious-ui-blocks')} initialOpen={false}>
                    <p>{__('Section Background', 'xgenious-ui-blocks')}</p>
                    <ColorPicker
                        color={sectionBg}
                        onChangeComplete={(value) => setAttributes({ sectionBg: value.hex })}
                    />
                    <p style={{ marginTop: '16px' }}>{__('Title Color', 'xgenious-ui-blocks')}</p>
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
                </PanelBody>

                <PanelBody title={__('Team Members', 'xgenious-ui-blocks')} initialOpen={false}>
                    {members.map((member, index) => (
                        <div
                            key={member.id}
                            style={{
                                borderBottom: '1px solid #eee',
                                paddingBottom: '16px',
                                marginBottom: '16px',
                            }}
                        >
                            <p style={{ fontWeight: 600, marginBottom: '8px' }}>
                                {__('Member', 'xgenious-ui-blocks')} {index + 1}
                            </p>
                            <TextControl
                                label={__('Name', 'xgenious-ui-blocks')}
                                value={member.name}
                                onChange={(val) => updateMember(index, 'name', val)}
                            />
                            <TextControl
                                label={__('Role', 'xgenious-ui-blocks')}
                                value={member.role}
                                onChange={(val) => updateMember(index, 'role', val)}
                            />
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => updateMemberImage(index, media)}
                                    allowedTypes={['image']}
                                    value={member.image?.id}
                                    render={({ open }) => (
                                        <div style={{ marginBottom: '8px' }}>
                                            {member.image?.url ? (
                                                <>
                                                    <img
                                                        src={member.image.url}
                                                        alt={member.image.alt}
                                                        style={{ width: '100%', marginBottom: '6px', borderRadius: '4px' }}
                                                    />
                                                    <Button variant="secondary" isSmall onClick={open} style={{ marginRight: '6px' }}>
                                                        {__('Replace', 'xgenious-ui-blocks')}
                                                    </Button>
                                                    <Button isDestructive isSmall onClick={() => removeMemberImage(index)}>
                                                        {__('Remove', 'xgenious-ui-blocks')}
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button variant="secondary" isSmall onClick={open}>
                                                    {__('Upload Photo', 'xgenious-ui-blocks')}
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                            {members.length > 1 && (
                                <Button isDestructive isSmall onClick={() => removeMember(index)}>
                                    {__('Remove Member', 'xgenious-ui-blocks')}
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button variant="primary" onClick={addMember} style={{ width: '100%', justifyContent: 'center' }}>
                        {__('+ Add Member', 'xgenious-ui-blocks')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="xg-container">
                    <RichText
                        tagName="h2"
                        className="xg-tm-section-title"
                        value={sectionTitle}
                        onChange={(value) => setAttributes({ sectionTitle: value })}
                        placeholder={__('Section Title...', 'xgenious-ui-blocks')}
                        style={{ color: sectionTitleColor, textAlign: titleAlign }}
                    />

                    <div
                        className="xg-tm-grid"
                        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                    >
                        {members.map((member, index) => (
                            <div key={member.id} className="xg-tm-card">
                                <div className="xg-tm-photo-wrap">
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) => updateMemberImage(index, media)}
                                            allowedTypes={['image']}
                                            value={member.image?.id}
                                            render={({ open }) => (
                                                <div
                                                    className={`xg-tm-photo ${!member.image?.url ? 'xg-tm-photo--empty' : ''}`}
                                                    onClick={open}
                                                    title={__('Click to upload photo', 'xgenious-ui-blocks')}
                                                >
                                                    {member.image?.url ? (
                                                        <img
                                                            src={member.image.url}
                                                            alt={member.image.alt || member.name}
                                                        />
                                                    ) : (
                                                        <div className="xg-tm-photo-placeholder">
                                                            <span className="dashicons dashicons-admin-users"></span>
                                                            <span>{__('Upload', 'xgenious-ui-blocks')}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </div>

                                <div className="xg-tm-info">
                                    <RichText
                                        tagName="h4"
                                        className="xg-tm-name"
                                        value={member.name}
                                        onChange={(val) => updateMember(index, 'name', val)}
                                        placeholder={__('Name...', 'xgenious-ui-blocks')}
                                        style={{ color: nameColor }}
                                    />
                                    <RichText
                                        tagName="p"
                                        className="xg-tm-role"
                                        value={member.role}
                                        onChange={(val) => updateMember(index, 'role', val)}
                                        placeholder={__('Role...', 'xgenious-ui-blocks')}
                                        style={{ color: roleColor }}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Add Member Card */}
                        <div className="xg-tm-card xg-tm-card--add" onClick={addMember}>
                            <div className="xg-tm-add-btn">
                                <span className="dashicons dashicons-plus-alt2"></span>
                                <span>{__('Add Member', 'xgenious-ui-blocks')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
