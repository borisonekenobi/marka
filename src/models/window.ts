export {};

declare global {
	interface Window {
		marka: {
			onFileOpened: (callback: (markdown: string) => Promise<void>) => () => void;
			onFileSave: (callback: (action: 'save' | 'save-as') => Promise<void>) => () => void;
			saveFile: (markdown: string) => Promise<void>;
			saveAsFile: (markdown: string) => Promise<void>;

			onThemeChanged: (callback: (theme: string) => void) => () => void;
			onFontChanged: (callback: (font: string) => void) => () => void;
		};
	}
}
