import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionListComponent } from './definition-list.component';

describe('DefinitionListComponent', () => {
	let component: DefinitionListComponent;
	let fixture: ComponentFixture<DefinitionListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DefinitionListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DefinitionListComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
