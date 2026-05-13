import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private readonly themes: string[] = [
		'theme-default-light',
		'theme-default-dark',
		'theme-google-docs-light',
		// 'theme-google-docs-dark',
		// 'theme-ms-word-light',
		// 'theme-ms-word-dark',
		'theme-github-light',
		'theme-github-dark',
		'theme-jetbrains-light',
		'theme-jetbrains-dark',
	];
	private readonly fonts: string[] = ['sans-serif', 'serif', 'monospace'];

	public getTheme(): string {
		return localStorage.getItem('theme') || this.themes[0];
	}

	public setTheme(theme: string): void {
		if (!this.themes.includes(theme)) {
			return;
		}

		const body = document.body;

		this.themes.forEach((t) => body.classList.remove(t));
		body.classList.add(theme);

		localStorage.setItem('theme', theme);
	}

	public initTheme(): void {
		this.setTheme(this.getTheme());
	}

	public setFont(font: string): void {
		if (!this.fonts.includes(font)) {
			return;
		}

		const body = document.body;

		this.fonts.forEach((f) => body.classList.remove(f));
		body.classList.add(font);

		localStorage.setItem('font', font);
	}

	public initFont(): void {
		const saved = localStorage.getItem('font') || this.fonts[0];
		this.setFont(saved);
	}
}
