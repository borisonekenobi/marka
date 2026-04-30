import { Component, Input } from '@angular/core';
import { BlockElement, BlockWithManyBlocks, FileElementType } from '../../../models/file-elements';

@Component({
  selector: 'marka-footnote-definition',
  imports: [],
  templateUrl: './footnote-definition.component.html',
  styleUrl: './footnote-definition.component.css',
})
export class FootnoteDefinitionComponent {
  @Input({ required: true })
  public footnoteDefinition!: FootnoteDefinition;
}

export class FootnoteDefinition implements BlockWithManyBlocks {
  public readonly type: FileElementType = FileElementType.FootnoteDefinition;
  public id: string;
  public blocks: BlockElement[];

  public constructor(id: string, blocks: BlockElement[]) {
    this.id = id;
    this.blocks = blocks;
  }
}
