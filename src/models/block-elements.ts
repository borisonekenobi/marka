import {
  type BlockElement,
  type BlockWithManyBlocks,
  type BlockWithManyInline,
  type BlockWithNoInline,
  FileElementType,
  type InlineElement,
} from './file-elements';

export class Blockquote implements BlockWithManyBlocks {
  public readonly type: FileElementType = FileElementType.Blockquote;
  public blocks: BlockElement[];

  public constructor(blocks: BlockElement[]) {
    this.blocks = blocks;
  }
}

export class CodeBlock implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.CodeBlock;
  public code: string;
  public language: string | undefined;

  public constructor(code: string, language?: string) {
    this.code = code;
    this.language = language;
  }
}

export class DefinitionList implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.DefinitionList;
  public items: DefinitionItem[];

  public constructor(items: DefinitionItem[]) {
    this.items = items;
  }
}

export class DefinitionItem {
  public term: InlineElement[];
  public definitions: BlockElement[];

  public constructor(term: InlineElement[], definitions: BlockElement[]) {
    this.term = term;
    this.definitions = definitions;
  }
}

export class FootnoteDefinition implements BlockWithManyBlocks {
  public readonly type: FileElementType = FileElementType.FootnoteDefinition;
  public id: string;
  public blocks: BlockElement[];

  public constructor(id: string, blocks: BlockElement[]) {
    this.id = id;
    this.blocks = blocks;
  }
}

export class Heading implements BlockWithManyInline {
  public readonly type: FileElementType = FileElementType.Heading;
  public inlines: InlineElement[];
  public level: 1 | 2 | 3 | 4 | 5 | 6;

  public constructor(inlines: InlineElement[], level: 1 | 2 | 3 | 4 | 5 | 6) {
    this.inlines = inlines;
    this.level = level;
  }
}

export class HorizontalRule implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.HorizontalRule;
}

export class List implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.List;
  public ordered: boolean;
  public items: ListElement[];

  public constructor(ordered: boolean, items: ListElement[]) {
    this.ordered = ordered;
    this.items = items;
  }
}

export class ListElement {
  public blocks: BlockElement[];
  public checked?: boolean | undefined;

  public constructor(blocks: BlockElement[], checked?: boolean) {
    this.blocks = blocks;
    this.checked = checked;
  }
}

export class Paragraph implements BlockWithManyInline {
  public readonly type: FileElementType = FileElementType.Paragraph;
  public inlines: InlineElement[];

  public constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}

export class Table implements BlockWithNoInline {
  public readonly type: FileElementType = FileElementType.Table;
  public rows: TableRow[];

  constructor(rows: TableRow[]) {
    this.rows = rows;
  }
}

export class TableRow {
  public cells: TableCell[];

  constructor(cells: TableCell[]) {
    this.cells = cells;
  }
}

export class TableCell {
  public inlines: InlineElement[];

  constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}
