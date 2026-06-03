import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NavElement, NavElementOption } from '../models/nav-element';
import { EditorComponent } from '../components/editor/editor.component';
import { ThemeService } from '../services/theme.service';
import { DocumentCommand } from '../models/document-command';
import { googleNavbar } from '../models/navbars/google';
import { githubNavbar } from '../models/navbars/github';
import { jetbrainsNavbar } from '../models/navbars/jetbrains';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [NavbarComponent, EditorComponent],
	templateUrl: './app.html',
	styleUrl: './app.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {
	private static editor: HTMLDivElement;
	protected navbar: NavElement[] = [];
	private unsubscribeTheme?: () => void;
	private unsubscribeFont?: () => void;

	constructor(
		private readonly themeService: ThemeService,
		private readonly cdr: ChangeDetectorRef,
	) {}

	public static undo(): void {
		App.executeCommand('undo');
	}

	public static redo(): void {
		App.executeCommand('redo');
	}

	public static selectStyleOption(option: NavElementOption): void {
		App.executeCommand('formatBlock', option.elementType);
	}

	public static bold(): void {
		App.executeCommand('bold');
	}

	public static italic(): void {
		App.executeCommand('italic');
	}

	public static strikethrough(): void {
		App.executeCommand('strikeThrough');
	}

	public static quote(): void {
		App.selectStyleOption({ value: 'blockquote', label: 'Quote', elementType: 'blockquote' });
	}

	public static async insertLink(): Promise<void> {
		const link = await window.marka.chooseLink();
		if (link) App.executeCommand('createLink', link);
	}

	public static async insertImage(): Promise<void> {
		const img = await window.marka.chooseImg();
		if (img) App.executeCommand('insertImage', img);
	}

	public static insertTasklist(): void {
		App.executeCommand('insertUnorderedList');
		// TODO: also create checkbox
	}

	public static insertUnorderedList(): void {
		App.executeCommand('insertUnorderedList');
	}

	public static insertOrderedList(): void {
		App.executeCommand('insertOrderedList');
	}

	public static code(): void {
		App.selectStyleOption({ value: 'pre', label: 'Code', elementType: 'pre' });
	}

	public static horizontalRule(): void {
		App.executeCommand('insertHorizontalRule');
	}

	private static executeCommand(commandId: DocumentCommand, value?: string): void {
		App.editor.focus();
		document.execCommand(commandId, false, value);
	}

	ngOnInit(): void {
		App.editor = document.getElementById('editor') as HTMLDivElement;
		App.editor.focus();

		this.themeService.initTheme();
		this.setNavbar(this.themeService.getTheme());
		this.themeService.initFont();

		this.unsubscribeTheme = window.marka.onThemeChanged((theme: string): void => {
			this.themeService.setTheme(theme);
			this.setNavbar(theme);
		});
		this.unsubscribeFont = window.marka.onFontChanged((font: string): void =>
			this.themeService.setFont(font),
		);
	}

	ngOnDestroy(): void {
		this.unsubscribeTheme?.();
		this.unsubscribeFont?.();
	}

	private setNavbar(theme: string): void {
		if (theme.includes('google')) this.navbar = googleNavbar;
		else if (theme.includes('github')) this.navbar = githubNavbar;
		else if (theme.includes('jetbrains')) this.navbar = jetbrainsNavbar;
		else this.navbar = googleNavbar;

		this.cdr.markForCheck();
	}
}
