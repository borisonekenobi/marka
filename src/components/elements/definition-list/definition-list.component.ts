import { Component, Input } from '@angular/core';
import {
  BlockElement,
  BlockWithNoInline,
  FileElementType,
  InlineElement,
} from '../../../models/file-elements';

@Component({
  selector: 'marka-definition-list',
  imports: [],
  templateUrl: './definition-list.component.html',
  styleUrl: './definition-list.component.css',
})
export class DefinitionListComponent {
  @Input({ required: true })
  public definitionList!: DefinitionList;
}

export class DefinitionList implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.DefinitionList;
  public items: DefinitionItem[];

  public constructor(items: DefinitionItem[]) {
    this.items = items;
  }
}

export class DefinitionItem {
  public term: InlineElement[];
  public definitions: BlockElement[];

  public constructor(term: InlineElement[], definitions: BlockElement[]) {
    this.term = term;
    this.definitions = definitions;
  }
}
