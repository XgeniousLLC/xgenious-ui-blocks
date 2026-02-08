/**
 * Our Achievements Block - Edit Component
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
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		sectionTitle,
		achievements,
		backgroundColor,
		titleColor,
		cardBackgroundColor,
		labelColor,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-achievements',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	const addAchievement = () => {
		const newAchievements = [
			...achievements,
			{
				icon: {
					id: null,
					url: '',
					alt: '',
				},
				label: 'New Achievement',
			},
		];
		setAttributes({ achievements: newAchievements });
	};

	const updateAchievement = (index, field, value) => {
		const newAchievements = [...achievements];
		newAchievements[index][field] = value;
		setAttributes({ achievements: newAchievements });
	};

	const removeAchievement = (index) => {
		const newAchievements = achievements.filter((_, i) => i !== index);
		setAttributes({ achievements: newAchievements });
	};

	return (
		<>
			<InspectorControls>
				{/* Layout Settings */}
				<PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
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

				{/* Color Settings */}
				<PanelBody title={__('Color Settings', 'xgenious-ui-blocks')} initialOpen={false}>
					<p>{__('Background Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={backgroundColor}
						onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Title Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={titleColor}
						onChangeComplete={(value) => setAttributes({ titleColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Card Background Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={cardBackgroundColor}
						onChangeComplete={(value) => setAttributes({ cardBackgroundColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Label Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={labelColor}
						onChangeComplete={(value) => setAttributes({ labelColor: value.hex })}
					/>
				</PanelBody>

				{/* Manage Achievements */}
				<PanelBody title={__('Manage Achievements', 'xgenious-ui-blocks')} initialOpen={false}>
					{achievements.map((achievement, index) => (
						<PanelBody
							key={index}
							title={`${__('Achievement', 'xgenious-ui-blocks')} ${index + 1}`}
							initialOpen={false}
						>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) =>
										updateAchievement(index, 'icon', {
											id: media.id,
											url: media.url,
											alt: media.alt || '',
										})
									}
									allowedTypes={['image']}
									value={achievement.icon.id}
									render={({ open }) => (
										<div style={{ marginBottom: '12px' }}>
											{achievement.icon.url ? (
												<div>
													<img
														src={achievement.icon.url}
														alt={achievement.icon.alt}
														style={{ width: '100px', marginBottom: '8px' }}
													/>
													<Button variant="secondary" onClick={open} style={{ marginRight: '8px' }}>
														{__('Replace Icon', 'xgenious-ui-blocks')}
													</Button>
													<Button
														isDestructive
														onClick={() =>
															updateAchievement(index, 'icon', {
																id: null,
																url: '',
																alt: '',
															})
														}
													>
														{__('Remove Icon', 'xgenious-ui-blocks')}
													</Button>
												</div>
											) : (
												<Button variant="primary" onClick={open}>
													{__('Select Icon', 'xgenious-ui-blocks')}
												</Button>
											)}
										</div>
									)}
								/>
							</MediaUploadCheck>
							<TextControl
								label={__('Label', 'xgenious-ui-blocks')}
								value={achievement.label}
								onChange={(value) => updateAchievement(index, 'label', value)}
								placeholder="Achievement Label"
							/>
							<Button
								variant="secondary"
								isDestructive
								onClick={() => removeAchievement(index)}
								style={{ marginTop: '12px' }}
							>
								{__('Remove Achievement', 'xgenious-ui-blocks')}
							</Button>
						</PanelBody>
					))}
					<Button variant="primary" onClick={addAchievement} style={{ marginTop: '12px' }}>
						{__('Add Achievement', 'xgenious-ui-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="xg-container">
					{/* Section Title */}
					<RichText
						tagName="h2"
						className="achievements-title"
						value={sectionTitle}
						onChange={(value) => setAttributes({ sectionTitle: value })}
						placeholder={__('Enter section title...', 'xgenious-ui-blocks')}
						style={{ color: titleColor }}
					/>

					{/* Achievements Grid */}
					<div className="achievements-grid">
						{achievements.map((achievement, index) => (
							<div
								key={index}
								className="achievement-card"
								style={{ backgroundColor: cardBackgroundColor }}
							>
								{achievement.icon.url ? (
									<div className="achievement-icon">
										<img src={achievement.icon.url} alt={achievement.icon.alt} />
									</div>
								) : (
									<div className="achievement-icon-placeholder">
										<span className="dashicon dashicons-awards"></span>
									</div>
								)}

								<div className="achievement-label" style={{ color: labelColor }}>
									{achievement.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
