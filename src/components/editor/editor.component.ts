import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	NgZone,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { tmpParse, tmpSerialize } from '@marka-editor/markdown';

@Component({
	selector: 'marka-editor',
	standalone: true,
	imports: [],
	templateUrl: './editor.component.html',
	styleUrl: './editor.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {
	protected edited: boolean = false;

	private editor!: HTMLElement;

	private unsubscribeFileOpened?: () => void;
	private unsubscribeFileSave?: () => void;
	private unsubscribeFileClose?: () => void;

	constructor(
		private readonly zone: NgZone,
		private readonly cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.editor = document.getElementById('editor')!;
		this.unsubscribeFileOpened = window.marka.onFileOpened(
			(markdown: string): Promise<void> => this.renderFile(markdown),
		);
		this.unsubscribeFileSave = window.marka.onFileSave(
			(action: 'save' | 'save-as'): Promise<void> => this.saveFile(action),
		);
		this.unsubscribeFileClose = window.marka.onFileClose((): Promise<void> => this.closeFile());
	}

	async renderFile(markdown: string): Promise<void> {
		await this.zone.run(async (): Promise<void> => {
			this.editor.innerHTML = await tmpParse(markdown);
			this.edited = false;
			this.cdr.markForCheck();
		});
	}

	async saveFile(action: 'save' | 'save-as'): Promise<void> {
		const markdown: string = await tmpSerialize(this.editor.innerHTML);

		let saved: boolean =
			action === 'save'
				? await window.marka.saveFile(markdown)
				: await window.marka.saveAsFile(markdown);

		if (saved) this.edited = false;
	}

	async closeFile(): Promise<void> {
		if (this.edited) {
			const markdown: string = await tmpSerialize(this.editor.innerHTML);
			const confirmed: boolean = await window.marka.confirmClose(markdown);
			if (!confirmed) return;
		}

		this.editor.innerHTML = '';
		this.edited = false;
		this.cdr.markForCheck();
	}

	ngOnDestroy(): void {
		this.unsubscribeFileOpened?.();
		this.unsubscribeFileSave?.();
		this.unsubscribeFileClose?.();
	}
}
