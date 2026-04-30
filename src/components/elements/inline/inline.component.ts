import { Component, Input } from '@angular/core';
import { InlineElement } from '../../../models/file-elements';
import { Text } from '../../../models/inline-file-elements';

@Component({
  selector: 'marka-inline',
  imports: [],
  templateUrl: './inline.component.html',
  styleUrl: './inline.component.css',
})
export class InlineComponent {
  @Input({ required: true })
  public inline!: InlineElement;

  protected readonly Text: typeof Text = Text;
}
