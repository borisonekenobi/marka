import { Component, forwardRef, Input } from '@angular/core';
import { List } from '@marka-editor/markdown';
import { BlockComponent } from '../block/block.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'marka-list',
	standalone: true,
	imports: [forwardRef(() => BlockComponent), NgTemplateOutlet],
	templateUrl: './list.component.html',
	styleUrl: './list.component.css',
})
export class ListComponent {
	@Input({ required: true })
	public list!: List;
}
