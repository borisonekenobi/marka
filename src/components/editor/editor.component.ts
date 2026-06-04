import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	NgZone,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { normalize, serialize } from '@marka-editor/markdown';
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
	private typingPauseTimeoutId?: number;
	private readonly typingPauseDelayMs: number = 750;

	private unsubscribeFileOpened?: () => void;
	private unsubscribeFileSave?: () => void;
	private unsubscribeFileClose?: () => void;

	public constructor(
		private readonly zone: NgZone,
		private readonly cdr: ChangeDetectorRef,
	) {}

	public ngOnInit(): void {
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

	public ngOnDestroy(): void {
		this.clearTypingPauseTimer();
		this.unsubscribeFileOpened?.();
		this.unsubscribeFileSave?.();
		this.unsubscribeFileClose?.();
	}

	public handleEditorInput(): void {
		this.edited = true;
		this.cdr.markForCheck();
		this.scheduleTypingPauseAction();
	}

	private async renderFile(markdown: VFile): Promise<void> {
		await this.zone.run(async (): Promise<void> => {
			this.clearTypingPauseTimer();
			this.editor.innerHTML = markdown.value as string;
			this.edited = false;
			this.cdr.markForCheck();
		});
	}

	private async saveFile(action: 'save' | 'save-as'): Promise<void> {
		const markdown: VFile = await serialize(this.editor.innerHTML);

		let saved: boolean =
			action === 'save'
				? await window.marka.saveFile(markdown)
				: await window.marka.saveAsFile(markdown);

		if (saved) this.edited = false;
	}

	private async closeFile(): Promise<boolean> {
		if (this.edited) {
			const markdown: VFile = await serialize(this.editor.innerHTML);
			const confirmed: boolean = await window.marka.confirmClose(markdown);
			if (!confirmed) return false;
		}

		this.clearTypingPauseTimer();
		this.editor.innerHTML = '';
		this.edited = false;
		this.cdr.markForCheck();
		return true;
	}

	private scheduleTypingPauseAction(): void {
		this.clearTypingPauseTimer();
		this.typingPauseTimeoutId = window.setTimeout((): void => {
			this.typingPauseTimeoutId = undefined;
			void this.zone.run((): void => {
				void this.onTypingPaused();
			});
		}, this.typingPauseDelayMs);
	}

	private clearTypingPauseTimer(): void {
		if (this.typingPauseTimeoutId === undefined) return;

		window.clearTimeout(this.typingPauseTimeoutId);
		this.typingPauseTimeoutId = undefined;
	}

	private async onTypingPaused(): Promise<void> {
		const caretPosition = this.getCaretCharacterOffsetWithin();

		const vfile: VFile = await normalize(this.editor.innerHTML);
		this.editor.innerHTML = vfile.toString();

		// Restore the caret position after re-rendering
		this.setCaretPosition(caretPosition);
	}

	private getCaretCharacterOffsetWithin(): number {
		let caretOffset = 0;
		const doc = this.editor.ownerDocument || document;
		const win = doc.defaultView || window;

		if (typeof win.getSelection !== 'undefined') {
			const selection = win.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const preCaretRange = range.cloneRange();

				// Select all text from the start of the editable element up to the cursor
				preCaretRange.selectNodeContents(this.editor);
				preCaretRange.setEnd(range.endContainer, range.endOffset);

				// The length of this text represents the cursor position
				caretOffset = preCaretRange.toString().length;
			}
		}
		return caretOffset;
	}

	private setCaretPosition(position: number): void {
		const selection = window.getSelection();
		if (!selection) return;

		const doc = this.editor.ownerDocument || document;
		const walker = doc.createTreeWalker(this.editor, NodeFilter.SHOW_TEXT);
		let remainingOffset = Math.max(0, position);
		let textNode = walker.nextNode() as Text | null;
		let lastTextNode: Text | null = null;

		while (textNode) {
			lastTextNode = textNode;
			const textLength = textNode.data.length;

			if (remainingOffset <= textLength) {
				const range = doc.createRange();
				range.setStart(textNode, remainingOffset);
				range.collapse(true);
				selection.removeAllRanges();
				selection.addRange(range);
				return;
			}

			remainingOffset -= textLength;
			textNode = walker.nextNode() as Text | null;
		}

		const range = doc.createRange();
		if (lastTextNode) {
			range.setStart(lastTextNode, lastTextNode.data.length);
		} else {
			range.selectNodeContents(this.editor);
			range.collapse(false);
		}
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}
