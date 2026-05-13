import { ButtonNavElement, NavElement, SeparatorNavElement } from '../nav-element';
import { App } from '../../app/app';

export const githubNavbar: NavElement[] = [
	new ButtonNavElement({
		name: 'Heading',
		onclick: () => App.selectStyleOption({ value: 'h3', label: 'Heading', elementType: 'h3' }),
		svg: 'icons/github/heading.svg',
	}),
	new ButtonNavElement({
		name: 'Bold',
		onclick: () => App.bold(),
		svg: 'icons/github/bold.svg',
	}),
	new ButtonNavElement({
		name: 'Italic',
		onclick: () => App.italic(),
		svg: 'icons/github/italic.svg',
	}),
	new ButtonNavElement({
		name: 'Quote',
		onclick: () => App.quote(),
		svg: 'icons/github/quote.svg',
	}),
	new ButtonNavElement({
		name: 'Code',
		onclick: () => App.code(),
		svg: 'icons/github/code.svg',
	}),
	new ButtonNavElement({
		name: 'Link',
		onclick: () => App.insertLink(),
		svg: 'icons/github/link.svg',
	}),
	new SeparatorNavElement(),
	new ButtonNavElement({
		name: 'Unordered list',
		onclick: () => App.insertUnorderedList(),
		svg: 'icons/github/unordered_list.svg',
	}),
	new ButtonNavElement({
		name: 'Numbered list',
		onclick: () => App.insertOrderedList(),
		svg: 'icons/github/ordered_list.svg',
	}),
	new ButtonNavElement({
		name: 'Task list',
		onclick: () => App.insertTasklist(),
		svg: 'icons/github/task_list.svg',
	}),
];
