import { Component, Input } from '@angular/core';
import { Table } from '../../../models/block-elements';

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
