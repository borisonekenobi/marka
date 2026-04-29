export enum FileElementTypes {
  Paragraph,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Bold,
  Italic,
  Blockquote,
  OrderedList,
  UnorderedList,
  Code,
  HorizontalRule,
  Link,
  Image,
  Table,
  CodeBlock,
  Footnote,
  HeadingId,
  DefinitionList,
  Strikethrough,
  TaskList,
  Emoji,
  Highlight,
  Subscript,
  Superscript,
  HTML,
}

export interface FileElement {
  type: FileElementTypes;
}
