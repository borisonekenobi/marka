export enum NavElementTypes {
  Select,
  Button,
  Separator,
}

export interface NavElement {
  type: NavElementTypes;
}

export interface ClickableNavElement extends NavElement {
  name: string;
  onclick: CallableFunction;
}

export class ButtonNavElement implements ClickableNavElement {
  name: string;
  type: NavElementTypes = NavElementTypes.Button;
  onclick: CallableFunction;
  path: string;

  constructor(init: { name: string; onclick: CallableFunction; path: string }) {
    this.name = init.name;
    this.type = NavElementTypes.Button;
    this.onclick = init.onclick;
    this.path = init.path;
  }
}

export class SelectNavElement implements ClickableNavElement {
  name: string;
  type: NavElementTypes = NavElementTypes.Select;
  onclick: CallableFunction;
  options: NavElementOption[];

  constructor(init: { name: string; onclick: CallableFunction; options: NavElementOption[] }) {
    this.name = init.name;
    this.type = NavElementTypes.Select;
    this.onclick = init.onclick;
    this.options = init.options;
  }
}

export class SeparatorNavElement implements NavElement {
  type: NavElementTypes = NavElementTypes.Separator;
}

export interface NavElementOption {
  value: string;
  label: string;
  elementType: string;
}
