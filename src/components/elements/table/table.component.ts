import { Component, Input } from '@angular/core';
import { Table } from '@marka-editor/markdown';

@Component({
  selector: 'marka-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input({ required: true })
  public table!: Table;
}
