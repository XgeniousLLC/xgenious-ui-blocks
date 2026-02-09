/**
 * FAQ Accordion Block - Edit Component
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
	TextareaControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		sectionTitle,
		faqs,
		backgroundColor,
		faqBackgroundColor,
		titleColor,
		questionColor,
		answerColor,
		paddingTop,
		paddingBottom,
		enableSchema,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'xg-faq-accordion',
		style: {
			backgroundColor,
			paddingTop: `${paddingTop}px`,
			paddingBottom: `${paddingBottom}px`,
		},
	});

	const addFaq = () => {
		const newFaq = {
			question: 'New Question?',
			answer: '',
			isOpen: false,
		};
		setAttributes({ faqs: [...faqs, newFaq] });
	};

	const removeFaq = (index) => {
		const updatedFaqs = faqs.filter((_, i) => i !== index);
		setAttributes({ faqs: updatedFaqs });
	};

	const updateFaq = (index, key, value) => {
		const updatedFaqs = [...faqs];
		updatedFaqs[index][key] = value;
		setAttributes({ faqs: updatedFaqs });
	};

	const toggleFaq = (index) => {
		const updatedFaqs = faqs.map((faq, i) => ({
			...faq,
			isOpen: i === index ? !faq.isOpen : faq.isOpen,
		}));
		setAttributes({ faqs: updatedFaqs });
	};

	return (
		<>
			<InspectorControls>
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

				<PanelBody title={__('SEO Settings', 'xgenious-ui-blocks')}>
					<ToggleControl
						label={__('Enable Schema Markup', 'xgenious-ui-blocks')}
						checked={enableSchema}
						onChange={(value) => setAttributes({ enableSchema: value })}
						help={__('Add Schema.org FAQPage markup for better SEO', 'xgenious-ui-blocks')}
					/>
				</PanelBody>

				<PanelBody title={__('Color Settings', 'xgenious-ui-blocks')}>
					<div style={{ marginBottom: '12px' }}>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Background Color', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={backgroundColor}
							onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
						/>
					</div>

					<div style={{ marginBottom: '12px' }}>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('FAQ Background', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={faqBackgroundColor}
							onChangeComplete={(value) => setAttributes({ faqBackgroundColor: value.hex })}
						/>
					</div>

					<div style={{ marginBottom: '12px' }}>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Title Color', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={titleColor}
							onChangeComplete={(value) => setAttributes({ titleColor: value.hex })}
						/>
					</div>

					<div style={{ marginBottom: '12px' }}>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Question Color', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={questionColor}
							onChangeComplete={(value) => setAttributes({ questionColor: value.hex })}
						/>
					</div>

					<div>
						<p style={{ marginBottom: '8px', fontWeight: '500' }}>
							{__('Answer Color', 'xgenious-ui-blocks')}
						</p>
						<ColorPicker
							color={answerColor}
							onChangeComplete={(value) => setAttributes({ answerColor: value.hex })}
						/>
					</div>
				</PanelBody>

				{/* Individual FAQ Settings */}
				{faqs.map((faq, index) => (
					<PanelBody
						key={index}
						title={`${__('FAQ', 'xgenious-ui-blocks')} ${index + 1}: ${faq.question.substring(0, 30)}...`}
						initialOpen={false}
					>
						<TextControl
							label={__('Question', 'xgenious-ui-blocks')}
							value={faq.question}
							onChange={(value) => updateFaq(index, 'question', value)}
						/>

						<TextareaControl
							label={__('Answer', 'xgenious-ui-blocks')}
							value={faq.answer}
							onChange={(value) => updateFaq(index, 'answer', value)}
							rows={5}
						/>

						<div style={{ marginTop: '16px' }}>
							<Button
								isDestructive
								variant="secondary"
								onClick={() => removeFaq(index)}
							>
								{__('Remove FAQ', 'xgenious-ui-blocks')}
							</Button>
						</div>
					</PanelBody>
				))}

				<PanelBody>
					<Button variant="primary" onClick={addFaq}>
						{__('Add FAQ', 'xgenious-ui-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="faq-accordion-container">
					<div className="faq-layout">
						{/* Section Title */}
						<div className="faq-title-section">
							<RichText
								tagName="h2"
								className="section-title"
								value={sectionTitle}
								onChange={(value) => setAttributes({ sectionTitle: value })}
								placeholder={__('Enter section title...', 'xgenious-ui-blocks')}
								style={{ color: titleColor }}
							/>
						</div>

						{/* FAQs List */}
						<div className="faq-list">
							{faqs.map((faq, index) => (
								<div
									key={index}
									className={`faq-item ${faq.isOpen ? 'is-open' : ''}`}
									style={{ backgroundColor: faqBackgroundColor }}
								>
									<button
										className="faq-question"
										onClick={() => toggleFaq(index)}
										style={{ color: questionColor }}
									>
										<span>{faq.question}</span>
										<span className="faq-icon">↑</span>
									</button>

									{faq.isOpen && faq.answer && (
										<div className="faq-answer" style={{ color: answerColor }}>
											<p>{faq.answer}</p>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
