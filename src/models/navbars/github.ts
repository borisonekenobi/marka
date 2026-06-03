import { ButtonNavElement, NavElement, SeparatorNavElement } from '../nav-element';
import { App } from '../../app/app';

export const githubNavbar: NavElement[] = [
	new ButtonNavElement({
		name: 'Insert h1',
		onclick: () =>
			App.selectStyleOption({ value: 'h1', label: 'Heading 1', elementType: 'h1' }),
		svg: 'icons/github/heading.svg',
	}),
	new ButtonNavElement({
		name: 'Insert h2',
		onclick: () =>
			App.selectStyleOption({ value: 'h2', label: 'Heading 2', elementType: 'h2' }),
		svg: 'icons/github/heading.svg',
	}),
	new ButtonNavElement({
		name: 'Insert h3',
		onclick: () =>
			App.selectStyleOption({ value: 'h3', label: 'Heading 3', elementType: 'h3' }),
		svg: 'icons/github/heading.svg',
	}),
	new SeparatorNavElement(),
	new ButtonNavElement({
		name: 'Add link',
		onclick: () => App.insertLink(),
		svg: 'icons/github/link.svg',
	}),
	new ButtonNavElement({
		name: 'Add image',
		onclick: () => App.insertImage(),
		svg: 'icons/github/image.svg',
	}),
	new SeparatorNavElement(),
	new ButtonNavElement({
		name: 'Add bold text',
		onclick: () => App.bold(),
		svg: 'icons/github/bold.svg',
	}),
	new ButtonNavElement({
		name: 'Add italic text',
		onclick: () => App.italic(),
		svg: 'icons/github/italic.svg',
	}),
	new ButtonNavElement({
		name: 'Insert code',
		onclick: () => App.code(),
		svg: 'icons/github/code.svg',
	}),
	new SeparatorNavElement(),
	new ButtonNavElement({
		name: 'Add unordered list',
		onclick: () => App.insertUnorderedList(),
		svg: 'icons/github/unordered_list.svg',
	}),
	new ButtonNavElement({
		name: 'Add ordered list',
		onclick: () => App.insertOrderedList(),
		svg: 'icons/github/ordered_list.svg',
	}),
	new ButtonNavElement({
		name: 'Add task list',
		onclick: () => App.insertTasklist(),
		svg: 'icons/github/task_list.svg',
	}),
	new ButtonNavElement({
		name: 'Insert blockquote',
		onclick: () => App.quote(),
		svg: 'icons/github/quote.svg',
	}),
	new ButtonNavElement({
		name: 'Insert horizontal rule',
		onclick: () => App.horizontalRule(),
		svg: 'icons/github/horizontal_rule.svg',
	}),
];
