import { Component, forwardRef, Input } from '@angular/core';
import { BlockComponent } from '../block/block.component';
import { Blockquote } from '@marka-editor/markdown';

@Component({
	standalone: true,
	selector: 'marka-blockquote',
	imports: [forwardRef((): typeof BlockComponent => BlockComponent)],
	templateUrl: './blockquote.component.html',
	styleUrl: './blockquote.component.css',
})
export class BlockquoteComponent {
	@Input({ required: true })
	public blockquote!: Blockquote;
}
