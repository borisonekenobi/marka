import { Component, Input } from '@angular/core';
import { BlockElement } from '../../../models/file-elements';
import { Blockquote, BlockquoteComponent } from '../blockquote/blockquote.component';
import { CodeBlock, CodeBlockComponent } from '../codeblock/code-block.component';
import {
  DefinitionList,
  DefinitionListComponent,
} from '../definition-list/definition-list.component';
import {
  FootnoteDefinition,
  FootnoteDefinitionComponent,
} from '../footnote-definition/footnote-definition.component';
import { Heading, HeadingComponent } from '../heading/heading.component';
import {
  HorizontalRule,
  HorizontalRuleComponent,
} from '../horizontal-rule/horizontal-rule.component';
import { List, ListComponent } from '../list/list.component';
import { Paragraph, ParagraphComponent } from '../paragraph/paragraph.component';
import { Table, TableComponent } from '../table/table.component';

@Component({
  selector: 'marka-block',
  imports: [
    BlockquoteComponent,
    CodeBlockComponent,
    DefinitionListComponent,
    FootnoteDefinitionComponent,
    HeadingComponent,
    HorizontalRuleComponent,
    ListComponent,
    ParagraphComponent,
    TableComponent,
  ],
  templateUrl: './block.component.html',
  styleUrl: './block.component.css',
})
export class BlockComponent {
  @Input({ required: true })
  public block!: BlockElement;

  protected readonly Blockquote: typeof Blockquote = Blockquote;
  protected readonly CodeBlock: typeof CodeBlock = CodeBlock;
  protected readonly DefinitionList: typeof DefinitionList = DefinitionList;
  protected readonly FootnoteDefinition: typeof FootnoteDefinition = FootnoteDefinition;
  protected readonly Heading: typeof Heading = Heading;
  protected readonly HorizontalRule: typeof HorizontalRule = HorizontalRule;
  protected readonly List: typeof List = List;
  protected readonly Paragraph: typeof Paragraph = Paragraph;
  protected readonly Table: typeof Table = Table;
}
