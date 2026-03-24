/**
 * Team Members Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
        className: `xg-team-members${fullWidth ? ' xg-full-width' : ''}`,
        style: {
            backgroundColor: sectionBg,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <div {...blockProps}>
            <div className="xg-container">
                <RichText.Content
                    tagName="h2"
                    className="xg-tm-section-title"
                    value={sectionTitle}
                    style={{ color: sectionTitleColor, textAlign: titleAlign }}
                />

                <div
                    className="xg-tm-grid"
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                    {members.map((member) => (
                        <div key={member.id} className="xg-tm-card">
                            <div className="xg-tm-photo-wrap">
                                <div className="xg-tm-photo">
                                    {member.image?.url ? (
                                        <img
                                            src={member.image.url}
                                            alt={member.image.alt || member.name}
                                        />
                                    ) : (
                                        <div className="xg-tm-photo-placeholder">
                                            <span className="dashicons dashicons-admin-users"></span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="xg-tm-info">
                                <RichText.Content
                                    tagName="h4"
                                    className="xg-tm-name"
                                    value={member.name}
                                    style={{ color: nameColor }}
                                />
                                <RichText.Content
                                    tagName="p"
                                    className="xg-tm-role"
                                    value={member.role}
                                    style={{ color: roleColor }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
