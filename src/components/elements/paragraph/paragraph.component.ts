import { Component, Input } from '@angular/core';
import { InlineComponent } from '../inline/inline.component';
import { Paragraph } from '@marka-editor/markdown';

@Component({
  selector: 'marka-paragraph',
  standalone: true,
  imports: [InlineComponent],
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.css',
})
export class ParagraphComponent {
  @Input({ required: true })
  public paragraph!: Paragraph;
}
