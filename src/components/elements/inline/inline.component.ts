import { Component, Input } from '@angular/core';
import {
  Bold,
  Emoji,
  FootnoteReference,
  HeadingId,
  Highlight,
  Image,
  InlineCode,
  type InlineElement,
  Italic,
  Link,
  Strikethrough,
  Subscript,
  Superscript,
  Text,
} from '@marka-editor/markdown';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'marka-inline',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './inline.component.html',
  styleUrl: './inline.component.css',
})
export class InlineComponent {
  @Input({ required: true })
  public inline!: InlineElement;

  protected readonly Bold: typeof Bold = Bold;
  protected readonly Emoji: typeof Emoji = Emoji;
  protected readonly FootnoteReference: typeof FootnoteReference = FootnoteReference;
  protected readonly HeadingId: typeof HeadingId = HeadingId;
  protected readonly Highlight: typeof Highlight = Highlight;
  protected readonly Image: typeof Image = Image;
  protected readonly InlineCode: typeof InlineCode = InlineCode;
  protected readonly Italic: typeof Italic = Italic;
  protected readonly Link: typeof Link = Link;
  protected readonly Strikethrough: typeof Strikethrough = Strikethrough;
  protected readonly Subscript: typeof Subscript = Subscript;
  protected readonly Superscript: typeof Superscript = Superscript;
  protected readonly Text: typeof Text = Text;
}
