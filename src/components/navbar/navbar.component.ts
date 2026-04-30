import { Component } from '@angular/core';
import {
  ButtonNavElement,
  NavElement,
  SelectNavElement,
  SeparatorNavElement,
} from '../../models/nav-element';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { NavSelectComponent } from '../nav-select/nav-select.component';
import { NavSeparatorComponent } from '../nav-separator/nav-separator.component';
import { App } from '../../app/app';

@Component({
  selector: 'navbar',
  imports: [NavButtonComponent, NavSelectComponent, NavSeparatorComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  protected readonly SelectNavElement: typeof SelectNavElement = SelectNavElement;
  protected readonly ButtonNavElement: typeof ButtonNavElement = ButtonNavElement;
  protected readonly SeparatorNavElement: typeof SeparatorNavElement = SeparatorNavElement;
  protected readonly components: NavElement[] = [
    new ButtonNavElement({
      name: 'Undo (Ctrl+Z)',
      onclick: App.undo,
      path: 'M288-192v-72h288q50 0 85-35t35-85q0-50-35-85t-85-35H330l93 93-51 51-180-180 180-180 51 51-93 93h246q80 0 136 56t56 136q0 80-56 136t-136 56H288Z',
    }),
    new ButtonNavElement({
      name: 'Redo (Ctrl+Y)',
      onclick: App.redo,
      path: 'M384-192q-80 0-136-56t-56-136q0-80 56-136t136-56h246l-93-93 51-51 180 180-180 180-51-51 93-93H384q-50 0-85 35t-35 85q0 50 35 85t85 35h288v72H384Z',
    }),
    // new ButtonNavElement({
    //   name: 'Paint format',
    //   func: App.paintFormat,
    //   path: 'M456-96q-29.7 0-50.85-21.15Q384-138.3 384-168v-167H264q-29.7 0-50.85-21.15Q192-377.3 192-407v-265q0-61 42-102.5T336-816h432v409q0 29.7-21.5 50.85Q725-335 696-335H576v167q0 29.7-21.5 50.85Q533-96 504-96h-48ZM264-552h432v-192h-48v144h-72v-144h-48v73h-72v-73H336q-29.7 0-50.85 20.5Q264-703 264-672v120Zm0 145h432v-73H264v73Zm0 0v-73 73Z',
    // }),
    new SeparatorNavElement(),
    new SelectNavElement({
      name: 'Styles',
      onclick: App.selectStyleOption,
      options: [
        { value: 'p', label: 'Normal text', elementType: 'p' },
        { value: 'h1', label: 'Heading 1', elementType: 'h1' },
        { value: 'h2', label: 'Heading 2', elementType: 'h2' },
        { value: 'h3', label: 'Heading 3', elementType: 'h3' },
        { value: 'h4', label: 'Heading 4', elementType: 'h4' },
        { value: 'h5', label: 'Heading 5', elementType: 'h5' },
        { value: 'h6', label: 'Heading 6', elementType: 'h6' },
      ],
    }),
    new SeparatorNavElement(),
    new ButtonNavElement({
      name: 'Bold (Ctrl+B)',
      onclick: App.bold,
      path: 'M266-192v-576h227.95q67.05 0 123.55 41.32Q674-685.35 674-612q0 51-22.5 79.5T609-490.96Q635-479 665-448t30 91q0 91-67.03 128t-125.81 37H266Zm127-118h104.68Q546-310 556-334.5t10-35.5q0-11-10.5-35.5T494-430H393v120Zm0-232h93q33 0 48.5-17.5T550-597q0-24-17.11-39t-44.28-15H393v109Z',
    }),
    new ButtonNavElement({
      name: 'Italic (Ctrl+I)',
      onclick: App.italic,
      path: 'M216-192v-96h160l124-384H336v-96h408v96H596L472-288h152v96H216Z',
    }),
    new SeparatorNavElement(),
    new ButtonNavElement({
      name: 'Insert link (Ctrl+K)',
      onclick: App.insertLink,
      path: 'M432-288H288q-79.68 0-135.84-56.23Q96-400.45 96-480.23 96-560 152.16-616q56.16-56 135.84-56h144v72H288q-50 0-85 35t-35 85q0 50 35 85t85 35h144v72Zm-96-156v-72h288v72H336Zm192 156v-72h144q50 0 85-35t35-85q0-50-35-85t-85-35H528v-72h144q79.68 0 135.84 56.23 56.16 56.22 56.16 136Q864-400 807.84-344 751.68-288 672-288H528Z',
    }),
    new ButtonNavElement({
      name: 'Insert image',
      onclick: App.insertImage,
      path: 'M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm48-72h432L552-480 444-336l-72-96-108 144Zm-48 72v-528 528Z',
    }),
    new SeparatorNavElement(),
    new ButtonNavElement({
      name: 'Checklist',
      onclick: App.insertChecklist,
      path: 'M232-216 96-352l51-51 84 85 170-170 52 51-221 221Zm0-312L96-664l51-51 85 85 169-170 52 51-221 221Zm296 240v-72h336v72H528Zm0-312v-72h336v72H528Z',
    }),
    new ButtonNavElement({
      name: 'Bulleted list',
      onclick: App.insertBulletedList,
      path: 'M360-240v-72h456v72H360Zm0-204v-72h456v72H360Zm0-204v-72h456v72H360ZM215.79-204Q186-204 165-225.21t-21-51Q144-306 165.21-327t51-21Q246-348 267-326.79t21 51Q288-246 266.79-225t-51 21Zm0-204Q186-408 165-429.21t-21-51Q144-510 165.21-531t51-21Q246-552 267-530.79t21 51Q288-450 266.79-429t-51 21ZM165-633.21q-21-21.21-21-51T165.21-735q21.21-21 51-21T267-734.79q21 21.21 21 51T266.79-633q-21.21 21-51 21T165-633.21Z',
    }),
    new ButtonNavElement({
      name: 'Numbered list',
      onclick: App.insertNumberedList,
      path: 'M144-144v-48h96v-24h-48v-48h48v-24h-96v-48h120q10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v48q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9 10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v48q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9H144Zm0-240v-96q0-10.2 6.9-17.1 6.9-6.9 17.1-6.9h72v-24h-96v-48h120q10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v72q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9h-72v24h96v48H144Zm48-240v-144h-48v-48h96v192h-48Zm168 384v-72h456v72H360Zm0-204v-72h456v72H360Zm0-204v-72h456v72H360Z',
    }),
    new ButtonNavElement({
      name: 'Decrease Indent (Shift+Tab)',
      onclick: App.decreaseIndent,
      path: 'M144-144v-72h672v72H144Zm288-150v-72h384v72H432Zm0-150v-72h384v72H432Zm0-150v-72h384v72H432ZM144-744v-72h672v72H144Zm144 408L144-480l144-144v288Z',
    }),
    new ButtonNavElement({
      name: 'Increase Indent (Tab)',
      onclick: App.increaseIndent,
      path: 'M144-144v-72h672v72H144Zm288-150v-72h384v72H432Zm0-150v-72h384v72H432Zm0-150v-72h384v72H432ZM144-744v-72h672v72H144Zm0 408v-288l144 144-144 144Z',
    }),
  ];
}
