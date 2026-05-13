import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NavElementOption } from '../models/nav-element';
import { EditorComponent } from '../components/editor/editor.component';
import { ThemeService } from '../services/theme.service';
import { DocumentCommand } from '../models/document-command';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [NavbarComponent, EditorComponent],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
	private static editor: HTMLDivElement;

	private unsubscribeTheme?: () => void;
	private unsubscribeFont?: () => void;

	constructor(private readonly themeService: ThemeService) {}

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

	public static async insertLink(): Promise<void> {
		const link = await window.marka.chooseLink();
		if (link) App.executeCommand('createLink', link);
	}

	public static async insertImage(): Promise<void> {
		const img = await window.marka.chooseImg();
		if (img) App.executeCommand('insertImage', img);
	}

	public static insertChecklist(): void {
		App.executeCommand('insertUnorderedList');
		// TODO: also create checkbox
	}

	public static insertBulletedList(): void {
		App.executeCommand('insertUnorderedList');
	}

	public static insertNumberedList(): void {
		App.executeCommand('insertOrderedList');
	}

	private static executeCommand(commandId: DocumentCommand, value?: string): void {
		App.editor.focus();
		document.execCommand(commandId, false, value);
	}

	ngOnInit(): void {
		App.editor = document.getElementById('editor')! as HTMLDivElement;
		App.editor.focus();

		this.themeService.initTheme();
		this.themeService.initFont();

		this.unsubscribeTheme = window.marka.onThemeChanged((theme: string): void =>
			this.themeService.setTheme(theme),
		);
		this.unsubscribeFont = window.marka.onFontChanged((font: string): void =>
			this.themeService.setFont(font),
		);
	}

	ngOnDestroy(): void {
		this.unsubscribeTheme?.();
		this.unsubscribeFont?.();
	}
}
