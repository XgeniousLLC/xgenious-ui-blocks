/**
 * Downloads Grid Block
 */

import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import './editor.scss';
import './style.scss';

registerBlockType(metadata.name, {
	...metadata,
	edit: Edit,
	// No save function needed - this is a dynamic block rendered server-side
	save: () => null,
});
