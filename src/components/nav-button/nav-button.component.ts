import { Component, Input } from '@angular/core';
import { ButtonNavElement } from '../../models/nav-element';

@Component({
  selector: 'nav-button',
  imports: [],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.css',
})
export class NavButtonComponent {
  @Input({ required: true })
  public component!: ButtonNavElement;
}
