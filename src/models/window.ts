export {};

declare global {
	interface Window {
		marka: {
			onFileOpened: (callback: (doc: string) => void) => () => void;
			onThemeChanged: (callback: (theme: string) => void) => () => void;
			onFontChanged: (callback: (font: string) => void) => () => void;
		};
	}
}
