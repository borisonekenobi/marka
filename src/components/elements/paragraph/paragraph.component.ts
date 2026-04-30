import { Component, Input } from '@angular/core';
import { BlockWithManyInline, FileElementType, InlineElement } from '../../../models/file-elements';
import { InlineComponent } from '../inline/inline.component';

@Component({
  selector: 'marka-paragraph',
  imports: [InlineComponent],
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.css',
})
export class ParagraphComponent {
  @Input({ required: true })
  public paragraph!: Paragraph;
}

export class Paragraph implements BlockWithManyInline {
  public readonly type: FileElementType = FileElementType.Paragraph;
  public inlines: InlineElement[];

  public constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}
