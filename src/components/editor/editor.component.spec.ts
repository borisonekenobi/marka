import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
	let component: EditorComponent;
	let fixture: ComponentFixture<EditorComponent>;

	beforeEach(async () => {
		// Create the editor element expected by ngOnInit()
		const editor = document.createElement('div');
		editor.id = 'editor';
		document.body.appendChild(editor);

		// Mock the window.marka API used by the component
		window.marka = {
			onFileOpened: vi.fn(() => vi.fn()),
			onFileSave: vi.fn(() => vi.fn()),
			onFileClose: vi.fn(() => vi.fn()),
			confirmClose: vi.fn().mockResolvedValue(true),
			saveFile: vi.fn().mockResolvedValue(true),
			saveAsFile: vi.fn().mockResolvedValue(true),
			onThemeChanged: vi.fn(),
			onFontChanged: vi.fn(),
			chooseLink: vi.fn(),
			chooseImg: vi.fn(),
		};

		await TestBed.configureTestingModule({
			imports: [EditorComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EditorComponent);
		component = fixture.componentInstance;

		fixture.detectChanges(); // runs ngOnInit()

		// cleanup added DOM node
		fixture.componentRef.onDestroy(() => {
			editor.remove();
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
