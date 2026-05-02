import { Component, Input } from '@angular/core';
import {
  BlockElement,
  Blockquote,
  CodeBlock,
  DefinitionList,
  FootnoteDefinition,
  Heading,
  HorizontalRule,
  List,
  Paragraph,
  Table,
} from '@marka-editor/markdown';
import { BlockquoteComponent } from '../blockquote/blockquote.component';
import { CodeBlockComponent } from '../codeblock/code-block.component';
import { DefinitionListComponent } from '../definition-list/definition-list.component';
import { FootnoteDefinitionComponent } from '../footnote-definition/footnote-definition.component';
import { HeadingComponent } from '../heading/heading.component';
import { HorizontalRuleComponent } from '../horizontal-rule/horizontal-rule.component';
import { ListComponent } from '../list/list.component';
import { ParagraphComponent } from '../paragraph/paragraph.component';
import { TableComponent } from '../table/table.component';

@Component({
  standalone: true,
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
