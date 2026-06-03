import {
	Component,
	ElementRef,
	HostListener,
	input,
	InputSignal,
	OnInit,
	signal,
	WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavElementOption, SelectNavElement } from '../../models/nav-element';

@Component({
	selector: 'nav-select',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './nav-select.component.html',
	styleUrl: './nav-select.component.css',
})
export class NavSelectComponent implements OnInit {
	public component: InputSignal<SelectNavElement> = input.required<SelectNavElement>();
	public title: InputSignal<string> = input<string>('');

	protected isOpen!: WritableSignal<boolean>;
	protected selectedOption!: WritableSignal<NavElementOption>;

	public constructor(private elementRef: ElementRef) {}

	public ngOnInit(): void {
		this.isOpen = signal(false);
		this.selectedOption = signal(this.component().options[0]);
	}

	@HostListener('document:click', ['$event'])
	protected onDocumentClick(event: MouseEvent): void {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.isOpen.set(false);
		}
	}

	protected toggleDropdown(): void {
		this.isOpen.update((v: boolean): boolean => !v);
	}

	protected selectOption(option: NavElementOption): void {
		this.selectedOption.set(option);
		this.isOpen.set(false);
		this.component().onclick(option);
	}
}
