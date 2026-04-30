export enum FileElementType {
  Paragraph,
  Heading,
  Bold,
  Italic,
  Blockquote,
  List,
  Code,
  HorizontalRule,
  Link,
  Image,
  Table,
  CodeBlock,
  FootnoteDefinition,
  FootnoteReference,
  HeadingId,
  DefinitionList,
  Strikethrough,
  Emoji,
  Highlight,
  Subscript,
  Superscript,
  HTML,
  Text,
}

export interface FileElement {
  type: FileElementType;
}

export interface BlockElement extends FileElement {}
export interface BlockWithManyBlocks extends BlockElement {
  blocks: BlockElement[];
}
export interface BlockWithNoInline extends BlockElement {}
export interface BlockWithOneInline extends BlockElement {
  inline: InlineElement;
}
export interface BlockWithManyInline extends BlockElement {
  inlines: InlineElement[];
}

export interface InlineElement extends FileElement {}
export interface InlineWithNoInline extends InlineElement {}
export interface InlineWithOneInline extends InlineElement {
  inline: InlineElement;
}
export interface InlineWithManyInline extends InlineElement {
  inlines: InlineElement[];
}
