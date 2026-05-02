import { Component, Input } from '@angular/core';
import { DefinitionList } from '@marka-editor/markdown';

@Component({
  selector: 'marka-definition-list',
  standalone: true,
  imports: [],
  templateUrl: './definition-list.component.html',
  styleUrl: './definition-list.component.css',
})
export class DefinitionListComponent {
  @Input({ required: true })
  public definitionList!: DefinitionList;
}
