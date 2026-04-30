export interface NavElement {}

export interface ClickableNavElement extends NavElement {
  name: string;
  onclick: CallableFunction;
}

export class ButtonNavElement implements ClickableNavElement {
  name: string;
  onclick: CallableFunction;
  path: string;

  constructor(init: { name: string; onclick: CallableFunction; path: string }) {
    this.name = init.name;
    this.onclick = init.onclick;
    this.path = init.path;
  }
}

export class SelectNavElement implements ClickableNavElement {
  name: string;
  onclick: CallableFunction;
  options: NavElementOption[];

  constructor(init: { name: string; onclick: CallableFunction; options: NavElementOption[] }) {
    this.name = init.name;
    this.onclick = init.onclick;
    this.options = init.options;
  }
}

export class SeparatorNavElement implements NavElement {}

export interface NavElementOption {
  value: string;
  label: string;
  elementType: string;
}
