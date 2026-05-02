import { Component, Input } from '@angular/core';
import { List } from '@marka-editor/markdown';

@Component({
  selector: 'marka-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Input({ required: true })
  public list!: List;
}
