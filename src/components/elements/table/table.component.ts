import { Component, Input } from '@angular/core';
import { BlockWithNoInline, FileElementType, InlineElement } from '../../../models/file-elements';

@Component({
  selector: 'marka-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input({ required: true })
  public table!: Table;
}

export class Table implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.Table;
  public rows: TableRow[];

  constructor(rows: TableRow[]) {
    this.rows = rows;
  }
}

export class TableRow {
  public cells: TableCell[];

  constructor(cells: TableCell[]) {
    this.cells = cells;
  }
}

export class TableCell {
  public inlines: InlineElement[];

  constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}
