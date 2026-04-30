import { Component, forwardRef, Input } from '@angular/core';
import { BlockElement, BlockWithManyBlocks, FileElementType } from '../../../models/file-elements';
import { BlockComponent } from '../block/block.component';

@Component({
  selector: 'marka-blockquote',
  imports: [forwardRef((): typeof BlockComponent => BlockComponent)],
  templateUrl: './blockquote.component.html',
  styleUrl: './blockquote.component.css',
})
export class BlockquoteComponent {
  @Input({ required: true })
  public blockquote!: Blockquote;
}

export class Blockquote implements BlockWithManyBlocks {
  public readonly type: FileElementType = FileElementType.Blockquote;
  public blocks: BlockElement[];

  public constructor(blocks: BlockElement[]) {
    this.blocks = blocks;
  }
}
