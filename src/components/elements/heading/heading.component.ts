import { Component, Input } from '@angular/core';
import { BlockWithManyInline, FileElementType, InlineElement } from '../../../models/file-elements';
import { InlineComponent } from '../inline/inline.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'marka-heading',
  imports: [InlineComponent, NgTemplateOutlet],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css',
})
export class HeadingComponent {
  @Input({ required: true })
  public heading!: Heading;
}

export class Heading implements BlockWithManyInline {
  public readonly type: FileElementType = FileElementType.Heading;
  public inlines: InlineElement[];
  public level: 1 | 2 | 3 | 4 | 5 | 6;

  public constructor(inlines: InlineElement[], level: 1 | 2 | 3 | 4 | 5 | 6) {
    this.inlines = inlines;
    this.level = level;
  }
}
