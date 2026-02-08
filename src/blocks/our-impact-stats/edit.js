/**
 * Our Impact Stats Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
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
		heading,
		stats,
		backgroundColor,
		cardBackgroundColor,
		headingColor,
		indexColor,
		numberColor,
		labelColor,
		columns,
		gap,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-impact-stats',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	const addStat = () => {
		const newIndex = String(stats.length + 1).padStart(2, '0') + '/';
		const newStats = [
			...stats,
			{
				index: newIndex,
				number: '0',
				suffix: '+',
				label: 'New Stat',
			},
		];
		setAttributes({ stats: newStats });
	};

	const updateStat = (index, field, value) => {
		const newStats = [...stats];
		newStats[index][field] = value;
		setAttributes({ stats: newStats });
	};

	const removeStat = (index) => {
		const newStats = stats.filter((_, i) => i !== index);
		setAttributes({ stats: newStats });
	};

	return (
		<>
			<InspectorControls>
				{/* Layout Settings */}
				<PanelBody title={__('Layout Settings', 'xgenious-ui-blocks')} initialOpen={true}>
					<RangeControl
						label={__('Columns', 'xgenious-ui-blocks')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={4}
						step={1}
					/>

					<RangeControl
						label={__('Gap (px)', 'xgenious-ui-blocks')}
						value={gap}
						onChange={(value) => setAttributes({ gap: value })}
						min={0}
						max={60}
						step={5}
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

				{/* Color Settings */}
				<PanelBody title={__('Color Settings', 'xgenious-ui-blocks')} initialOpen={false}>
					<p>{__('Background Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={backgroundColor}
						onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Card Background Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={cardBackgroundColor}
						onChangeComplete={(value) => setAttributes({ cardBackgroundColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Heading Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={headingColor}
						onChangeComplete={(value) => setAttributes({ headingColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Index Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={indexColor}
						onChangeComplete={(value) => setAttributes({ indexColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Number Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={numberColor}
						onChangeComplete={(value) => setAttributes({ numberColor: value.hex })}
					/>

					<p style={{ marginTop: '16px' }}>{__('Label Color', 'xgenious-ui-blocks')}</p>
					<ColorPicker
						color={labelColor}
						onChangeComplete={(value) => setAttributes({ labelColor: value.hex })}
					/>
				</PanelBody>

				{/* Manage Stats */}
				<PanelBody title={__('Manage Stats', 'xgenious-ui-blocks')} initialOpen={false}>
					{stats.map((stat, index) => (
						<PanelBody
							key={index}
							title={`${__('Stat', 'xgenious-ui-blocks')} ${index + 1}`}
							initialOpen={false}
						>
							<TextControl
								label={__('Index', 'xgenious-ui-blocks')}
								value={stat.index}
								onChange={(value) => updateStat(index, 'index', value)}
								placeholder="01/"
							/>
							<TextControl
								label={__('Number', 'xgenious-ui-blocks')}
								value={stat.number}
								onChange={(value) => updateStat(index, 'number', value)}
								placeholder="7000"
							/>
							<TextControl
								label={__('Suffix', 'xgenious-ui-blocks')}
								value={stat.suffix}
								onChange={(value) => updateStat(index, 'suffix', value)}
								placeholder="+"
							/>
							<TextControl
								label={__('Label', 'xgenious-ui-blocks')}
								value={stat.label}
								onChange={(value) => updateStat(index, 'label', value)}
								placeholder="Customer Happy"
							/>
							<Button
								variant="secondary"
								isDestructive
								onClick={() => removeStat(index)}
								style={{ marginTop: '12px' }}
							>
								{__('Remove Stat', 'xgenious-ui-blocks')}
							</Button>
						</PanelBody>
					))}
					<Button variant="primary" onClick={addStat} style={{ marginTop: '12px' }}>
						{__('Add Stat', 'xgenious-ui-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="xg-container">
					{/* Heading */}
					<RichText
						tagName="h2"
						className="impact-heading"
						value={heading}
						onChange={(value) => setAttributes({ heading: value })}
						placeholder={__('Enter heading...', 'xgenious-ui-blocks')}
						style={{ color: headingColor }}
					/>

					{/* Stats Grid */}
					<div
						className="stats-grid"
						style={{
							gridTemplateColumns: `repeat(${columns}, 1fr)`,
							gap: `${gap}px`,
						}}
					>
						{stats.map((stat, index) => (
							<div
								key={index}
								className="stat-card"
								style={{ backgroundColor: cardBackgroundColor }}
							>
								<span className="stat-index" style={{ color: indexColor }}>
									{stat.index}
								</span>

								<div className="stat-number" style={{ color: numberColor }}>
									{stat.number}
									<span className="stat-suffix">{stat.suffix}</span>
								</div>

								<div className="stat-label" style={{ color: labelColor }}>
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
