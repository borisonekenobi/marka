import { Component, Input } from '@angular/core';
import {
	ButtonNavElement,
	NavElement,
	SelectNavElement,
	SeparatorNavElement,
} from '../../models/nav-element';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { NavSelectComponent } from '../nav-select/nav-select.component';
import { NavSeparatorComponent } from '../nav-separator/nav-separator.component';

@Component({
	selector: 'navbar',
	standalone: true,
	imports: [NavButtonComponent, NavSelectComponent, NavSeparatorComponent],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent {
	@Input({ required: true })
	public components!: NavElement[];

	protected readonly SelectNavElement: typeof SelectNavElement = SelectNavElement;
	protected readonly ButtonNavElement: typeof ButtonNavElement = ButtonNavElement;
	protected readonly SeparatorNavElement: typeof SeparatorNavElement = SeparatorNavElement;
}
