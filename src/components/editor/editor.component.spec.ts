import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
	let component: EditorComponent;
	let fixture: ComponentFixture<EditorComponent>;

	beforeEach(async () => {
		vi.useFakeTimers();

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

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should debounce the typing pause action', () => {
		const pauseSpy = vi.spyOn(
			component as unknown as { onTypingPaused: () => Promise<void> },
			'onTypingPaused',
		);

		component.handleEditorInput();
		component.handleEditorInput();

		expect(pauseSpy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(749);
		expect(pauseSpy).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		expect(pauseSpy).toHaveBeenCalledTimes(1);
	});
});
