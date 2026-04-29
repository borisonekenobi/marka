import { Component } from '@angular/core';
import { FileElement, FileElementTypes } from '../../models/file-element';

@Component({
  selector: 'editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  public components: FileElement[] = [
    { type: FileElementTypes.Blockquote },
    { type: FileElementTypes.Image },
    { type: FileElementTypes.Blockquote },
    { type: FileElementTypes.Image },
    { type: FileElementTypes.Blockquote },
    { type: FileElementTypes.Image },
    { type: FileElementTypes.Blockquote },
    { type: FileElementTypes.Image },
    { type: FileElementTypes.Blockquote },
    { type: FileElementTypes.Image },
  ];
}
