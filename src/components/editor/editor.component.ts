import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	NgZone,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Document, parse } from '@marka-editor/markdown';
import { BlockComponent } from '../elements/block/block.component';

@Component({
	selector: 'marka-editor',
	standalone: true,
	imports: [BlockComponent],
	templateUrl: './editor.component.html',
	styleUrl: './editor.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {
	public doc?: Document;
	private unsubscribe?: () => void;

	constructor(
		private readonly zone: NgZone,
		private readonly cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.unsubscribe = window.marka.onFileOpened((doc: string) => {
			this.zone.run(() => {
				this.doc = parse(doc);
				this.cdr.markForCheck();
			});
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe?.();
	}
}
