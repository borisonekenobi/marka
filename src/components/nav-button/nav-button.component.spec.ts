import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { InputSignal } from '@angular/core';

import { NavButtonComponent } from './nav-button.component';
import { ButtonNavElement } from '../../models/nav-element';

describe('NavButtonComponent', () => {
	let component: NavButtonComponent;
	let fixture: ComponentFixture<NavButtonComponent>;

	const testButton: ButtonNavElement = {
		name: 'Bold',
		svg: 'assets/bold.svg',
		onclick: vi.fn(),
	} as unknown as ButtonNavElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NavButtonComponent],
			providers: [provideAngularSvgIcon()],
		}).compileComponents();

		fixture = TestBed.createComponent(NavButtonComponent);
		component = fixture.componentInstance;

		component.component = (() => testButton) as unknown as InputSignal<ButtonNavElement>;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
