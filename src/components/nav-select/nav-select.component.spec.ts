import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSelectComponent } from './nav-select.component';

describe('NavSelectComponent', () => {
	let component: NavSelectComponent;
	let fixture: ComponentFixture<NavSelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NavSelectComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NavSelectComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
