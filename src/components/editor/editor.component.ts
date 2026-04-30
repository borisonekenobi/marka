import { Component } from '@angular/core';
import { BlockElement } from '../../models/file-elements';
import { BlockComponent } from '../elements/block/block.component';
import { Paragraph } from '../elements/paragraph/paragraph.component';
import { Text } from '../../models/inline-file-elements';
import { Heading } from '../elements/heading/heading.component';

@Component({
  selector: 'editor',
  imports: [BlockComponent, BlockComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  public doc: BlockElement[] = [
    new Heading([new Text('Heading 1')], 1),
    new Heading([new Text('Heading 2')], 2),
    new Heading([new Text('Heading 3')], 3),
    new Heading([new Text('Heading 4')], 4),
    new Heading([new Text('Heading 5')], 5),
    new Heading([new Text('Heading 6')], 6),
    new Paragraph([new Text('Normal Text')]),
  ];
}
