import { Component, Input } from '@angular/core';
import { HorizontalRule } from '@marka-editor/markdown';

@Component({
  selector: 'marka-horizontal-rule',
  standalone: true,
  imports: [],
  templateUrl: './horizontal-rule.component.html',
  styleUrl: './horizontal-rule.component.css',
})
export class HorizontalRuleComponent {
  @Input({ required: true })
  public horizontalRule!: HorizontalRule;
}
