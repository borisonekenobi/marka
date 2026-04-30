import { Component, Input } from '@angular/core';
import { BlockWithNoInline, FileElementType } from '../../../models/file-elements';

@Component({
  selector: 'marka-code-block',
  imports: [],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.css',
})
export class CodeBlockComponent {
  @Input({ required: true })
  public codeBlock!: CodeBlock;
}

export class CodeBlock implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.CodeBlock;
  public code: string;
  public language?: string;

  public constructor(code: string, language?: string) {
    this.code = code;
    this.language = language;
  }
}
