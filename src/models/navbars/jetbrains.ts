import {
	ButtonNavElement,
	NavElement,
	NavElementOption,
	SelectNavElement,
	SeparatorNavElement,
} from '../nav-element';
import { App } from '../../app/app';

export const jetbrainsNavbar: NavElement[] = [
	new SelectNavElement({
		name: 'Styles',
		onclick: (option: NavElementOption) => App.selectStyleOption(option),
		options: [
			{ value: 'p', label: 'Normal', elementType: 'p' },
			{ value: 'h1', label: 'Title', elementType: 'h1' },
			{ value: 'h2', label: 'Subtitle', elementType: 'h2' },
			{ value: 'h3', label: 'Heading 1', elementType: 'h3' },
			{ value: 'h4', label: 'Heading 2', elementType: 'h4' },
			{ value: 'h5', label: 'Heading 3', elementType: 'h5' },
			{ value: 'h6', label: 'Heading 4', elementType: 'h6' },
		],
	}),
	new SeparatorNavElement(),
	new ButtonNavElement({
		name: 'Bold',
		onclick: () => App.bold(),
		svg: 'icons/jetbrains/bold.svg',
	}),
	new ButtonNavElement({
		name: 'Italic',
		onclick: () => App.italic(),
		svg: 'icons/jetbrains/italic.svg',
	}),
	new ButtonNavElement({
		name: 'Strikethrough',
		onclick: () => App.strikethrough(),
		svg: 'icons/jetbrains/strike_through.svg',
	}),
	new ButtonNavElement({
		name: 'Code',
		onclick: () => App.code(),
		svg: 'icons/jetbrains/code.svg',
	}),
	new ButtonNavElement({
		name: 'Create Link',
		onclick: () => App.insertLink(),
		svg: 'icons/jetbrains/link.svg',
	}),
	new SeparatorNavElement(),
	new ButtonNavElement({
		name: 'Unordered List',
		onclick: () => App.insertUnorderedList(),
		svg: 'icons/jetbrains/unordered_list.svg',
	}),
];
