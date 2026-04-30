import { Component, Input } from '@angular/core';
import { BlockWithNoInline, FileElementType } from '../../../models/file-elements';

@Component({
  selector: 'marka-horizontal-rule',
  imports: [],
  templateUrl: './horizontal-rule.component.html',
  styleUrl: './horizontal-rule.component.css',
})
export class HorizontalRuleComponent {
  @Input({ required: true })
  public horizontalRule!: HorizontalRule;
}

export class HorizontalRule implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.HorizontalRule;
}
