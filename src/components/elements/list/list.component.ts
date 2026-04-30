import { Component, Input } from '@angular/core';
import { BlockElement, BlockWithNoInline, FileElementType } from '../../../models/file-elements';

@Component({
  selector: 'marka-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Input({ required: true })
  public list!: List;
}

export class List implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.List;
  public ordered: boolean;
  public items: ListElement[];

  public constructor(ordered: boolean, items: ListElement[]) {
    this.ordered = ordered;
    this.items = items;
  }
}

export class ListElement {
  public blocks: BlockElement[];
  public checked?: boolean;

  public constructor(blocks: BlockElement[], checked?: boolean) {
    this.blocks = blocks;
    this.checked = checked;
  }
}
