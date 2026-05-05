import { Component, OnInit } from '@angular/core';
import { BlockElement } from '@marka-editor/markdown';
import { BlockComponent } from '../elements/block/block.component';

@Component({
	selector: 'marka-editor',
	standalone: true,
	imports: [BlockComponent],
	templateUrl: './editor.component.html',
	styleUrl: './editor.component.css',
})
export class EditorComponent implements OnInit {
	public doc: BlockElement[] = [];

	async ngOnInit(): Promise<void> {
		console.log(await window.marka.openFile());
	}
}
