import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { NavSelectComponent } from './nav-select.component';
import { SelectNavElement } from '../../models/nav-element';

describe('NavSelectComponent', () => {
	let component: NavSelectComponent;
	let fixture: ComponentFixture<NavSelectComponent>;

	const testNavSelect: SelectNavElement = {
		options: [
			{ label: 'Paragraph', value: 'p', elementType: 'p' },
			{ label: 'Heading 1', value: 'h1', elementType: 'h1' },
		],
		onclick: vi.fn(),
	} as unknown as SelectNavElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NavSelectComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NavSelectComponent);
		component = fixture.componentInstance;

		component.component = testNavSelect;
		component.title = 'Format';

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
