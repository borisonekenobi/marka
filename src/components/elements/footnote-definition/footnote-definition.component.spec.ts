import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootnoteDefinitionComponent } from './footnote-definition.component';

describe('FootnoteDefinitionComponent', () => {
	let component: FootnoteDefinitionComponent;
	let fixture: ComponentFixture<FootnoteDefinitionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FootnoteDefinitionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FootnoteDefinitionComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
