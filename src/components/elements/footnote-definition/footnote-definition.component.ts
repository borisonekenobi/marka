import { Component, Input } from '@angular/core';
import { FootnoteDefinition } from '@marka-editor/markdown';

@Component({
  selector: 'marka-footnote-definition',
  standalone: true,
  imports: [],
  templateUrl: './footnote-definition.component.html',
  styleUrl: './footnote-definition.component.css',
})
export class FootnoteDefinitionComponent {
  @Input({ required: true })
  public footnoteDefinition!: FootnoteDefinition;
}
