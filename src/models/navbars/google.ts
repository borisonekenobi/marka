import {
	ButtonNavElement,
	NavElement,
	NavElementOption,
	SelectNavElement,
	SeparatorNavElement,
} from '../nav-element';
import { App } from '../../app/app';

export const googleNavbar: NavElement[] = [
	new ButtonNavElement({
		name: 'Undo (Ctrl+Z)',
		onclick: () => App.undo(),
		svg: 'icons/google/undo.svg',
	}),
	new ButtonNavElement({
		name: 'Redo (Ctrl+Y)',
		onclick: () => App.redo(),
		svg: 'icons/google/redo.svg',
	}),
	// new ButtonNavElement({
	//   name: 'Paint format',
	//   func: () => App.paintFormat(),
	//   path: 'icons/google/format_paint.svg',
	// }),
	new SeparatorNavElement(),
	new SelectNavElement({
		name: 'Styles',
		onclick: (option: NavElementOption) => App.selectStyleOption(option),
		options: [
			{ value: 'p', label: 'Normal text', elementType: 'p' },
			{ value: 'h1', label: 'Heading 1', elementType: 'h1' },
			{ value: 'h2', label: 'Heading 2', elementType: 'h2' },
			{ value: 'h3', label: 'Heading 3', elementType: 'h3' },
			{ value: 'h4', label: 'Heading 4', elementType: 'h4' },
			{ value: 'h5', label: 'Heading 5', elementType: 'h5' },
			{ value: 'h6', label: 'Heading 6', elementType: 'h6' },
		],
	}),
	new SeparatorNavElement(),
	new ButtonNavElement({
		name: 'Bold (Ctrl+B)',
		onclick: () => App.bold(),
		svg: 'icons/google/bold.svg',
	}),
	new ButtonNavElement({
		name: 'Italic (Ctrl+I)',
		onclick: () => App.italic(),
		svg: 'icons/google/italic.svg',
	}),
	new SeparatorNavElement(),
	new ButtonNavElement({
		name: 'Insert link (Ctrl+K)',
		onclick: () => App.insertLink(),
		svg: 'icons/google/link.svg',
	}),
	new ButtonNavElement({
		name: 'Insert image',
		onclick: () => App.insertImage(),
		svg: 'icons/google/image.svg',
	}),
	new SeparatorNavElement(),
	new ButtonNavElement({
		name: 'Checklist',
		onclick: () => App.insertTasklist(),
		svg: 'icons/google/tasklist.svg',
	}),
	new ButtonNavElement({
		name: 'Bulleted list',
		onclick: () => App.insertUnorderedList(),
		svg: 'icons/google/unordered_list.svg',
	}),
	new ButtonNavElement({
		name: 'Numbered list',
		onclick: () => App.insertOrderedList(),
		svg: 'icons/google/ordered_list.svg',
	}),
];
