import {
  FileElementType,
  type InlineElement,
  type InlineWithManyInline,
  type InlineWithNoInline,
} from './file-elements';

export class Bold implements InlineWithManyInline {
  public readonly type: FileElementType = FileElementType.Bold;
  public inlines: InlineElement[];

  public constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}

export class Italic implements InlineWithManyInline {
  public readonly type: FileElementType = FileElementType.Italic;
  public inlines: InlineElement[];

  public constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}

export class Strikethrough implements InlineWithManyInline {
  public readonly type: FileElementType = FileElementType.Strikethrough;
  public inlines: InlineElement[];

  public constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}

export class Highlight implements InlineWithManyInline {
  public readonly type: FileElementType = FileElementType.Highlight;
  public inlines: InlineElement[];

  public constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}

export class Subscript implements InlineWithManyInline {
  public readonly type: FileElementType = FileElementType.Subscript;
  public inlines: InlineElement[];

  public constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}

export class Superscript implements InlineWithManyInline {
  public readonly type: FileElementType = FileElementType.Superscript;
  public inlines: InlineElement[];

  public constructor(inlines: InlineElement[]) {
    this.inlines = inlines;
  }
}

export class Link implements InlineWithManyInline {
  public readonly type: FileElementType = FileElementType.Link;
  public inlines: InlineElement[];
  public href: string;

  public constructor(inlines: InlineElement[], href: string) {
    this.inlines = inlines;
    this.href = href;
  }
}

export class Text implements InlineWithNoInline {
  public readonly type: FileElementType = FileElementType.Text;
  public value: string;

  public constructor(value: string) {
    this.value = value;
  }
}

export class InlineCode implements InlineWithNoInline {
  public readonly type: FileElementType = FileElementType.Code;
  public code: string;

  public constructor(code: string) {
    this.code = code;
  }
}

export class Image implements InlineWithNoInline {
  public readonly type: FileElementType = FileElementType.Image;
  public alt: string;
  public src: string;
  public title: string;

  public constructor(alt: string, src: string, title: string) {
    this.alt = alt;
    this.src = src;
    this.title = title;
  }
}

export class Emoji implements InlineWithNoInline {
  public readonly type: FileElementType = FileElementType.Emoji;
  public name: string;

  public constructor(name: string) {
    this.name = name;
  }
}

export class FootnoteReference implements InlineWithNoInline {
  public readonly type: FileElementType = FileElementType.FootnoteReference;
  public id: string;

  public constructor(id: string) {
    this.id = id;
  }
}

export class HeadingId implements InlineWithNoInline {
  public readonly type: FileElementType = FileElementType.HeadingId;
  public id: string;

  public constructor(id: string) {
    this.id = id;
  }
}
