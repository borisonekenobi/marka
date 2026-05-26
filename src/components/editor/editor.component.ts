import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	NgZone,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { serialize } from '@marka-editor/markdown';
import type { VFile } from 'vfile';

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

	private editor!: HTMLDivElement;

	private unsubscribeFileOpened?: () => void;
	private unsubscribeFileSave?: () => void;
	private unsubscribeFileClose?: () => void;

	constructor(
		private readonly zone: NgZone,
		private readonly cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.editor = document.getElementById('editor') as HTMLDivElement;
		this.unsubscribeFileOpened = window.marka.onFileOpened(
			(markdown: VFile): Promise<void> => this.renderFile(markdown),
		);
		this.unsubscribeFileSave = window.marka.onFileSave(
			(action: 'save' | 'save-as'): Promise<void> => this.saveFile(action),
		);
		this.unsubscribeFileClose = window.marka.onFileClose(
			(): Promise<boolean> => this.closeFile(),
		);
	}

	async renderFile(markdown: VFile): Promise<void> {
		await this.zone.run(async (): Promise<void> => {
			this.editor.innerHTML = markdown.value as string;
			this.edited = false;
			this.cdr.markForCheck();
		});
	}

	async saveFile(action: 'save' | 'save-as'): Promise<void> {
		const markdown: VFile = await serialize(this.editor.innerHTML);

		let saved: boolean =
			action === 'save'
				? await window.marka.saveFile(markdown)
				: await window.marka.saveAsFile(markdown);

		if (saved) this.edited = false;
	}

	async closeFile(): Promise<boolean> {
		if (this.edited) {
			const markdown: VFile = await serialize(this.editor.innerHTML);
			const confirmed: boolean = await window.marka.confirmClose(markdown);
			if (!confirmed) return false;
		}

		this.editor.innerHTML = '';
		this.edited = false;
		this.cdr.markForCheck();
		return true;
	}

	ngOnDestroy(): void {
		this.unsubscribeFileOpened?.();
		this.unsubscribeFileSave?.();
		this.unsubscribeFileClose?.();
	}
}
