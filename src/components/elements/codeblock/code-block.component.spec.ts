import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBlockComponent } from './code-block.component';

describe('CodeblockComponent', () => {
	let component: CodeBlockComponent;
	let fixture: ComponentFixture<CodeBlockComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CodeBlockComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CodeBlockComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
