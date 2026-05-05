import { Component, Input } from '@angular/core';
import { Table } from '@marka-editor/markdown';
import { InlineComponent } from '../inline/inline.component';

@Component({
	selector: 'marka-table',
	standalone: true,
	imports: [InlineComponent],
	templateUrl: './table.component.html',
	styleUrl: './table.component.css',
})
export class TableComponent {
	@Input({ required: true })
	public table!: Table;
}
