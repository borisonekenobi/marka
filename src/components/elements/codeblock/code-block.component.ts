import { Component, Input } from '@angular/core';
import { CodeBlock } from '@marka-editor/markdown';

@Component({
	selector: 'marka-code-block',
	standalone: true,
	imports: [],
	templateUrl: './code-block.component.html',
	styleUrl: './code-block.component.css',
})
export class CodeBlockComponent {
	@Input({ required: true })
	public codeBlock!: CodeBlock;
}
