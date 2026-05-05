import { Component, forwardRef, Input } from '@angular/core';
import { DefinitionList } from '@marka-editor/markdown';
import { InlineComponent } from '../inline/inline.component';
import { BlockComponent } from '../block/block.component';

@Component({
	selector: 'marka-definition-list',
	standalone: true,
	imports: [InlineComponent, forwardRef(() => BlockComponent)],
	templateUrl: './definition-list.component.html',
	styleUrl: './definition-list.component.css',
})
export class DefinitionListComponent {
	@Input({ required: true })
	public definitionList!: DefinitionList;
}
