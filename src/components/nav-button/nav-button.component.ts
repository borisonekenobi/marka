import { Component, input, InputSignal } from '@angular/core';
import { ButtonNavElement } from '../../models/nav-element';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
	selector: 'nav-button',
	standalone: true,
	imports: [SvgIconComponent],
	templateUrl: './nav-button.component.html',
	styleUrl: './nav-button.component.css',
})
export class NavButtonComponent {
	public component: InputSignal<ButtonNavElement> = input.required<ButtonNavElement>();
}
