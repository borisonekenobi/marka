export {};

declare global {
	interface Window {
		marka: {
			onFileOpened: (callback: (markdown: string) => Promise<void>) => () => void;
			onFileSave: (callback: (action: 'save' | 'save-as') => Promise<void>) => () => void;
			onFileClose: (callback: () => Promise<void>) => () => void;

			confirmClose: (markdown: string) => Promise<boolean>;
			saveFile: (markdown: string) => Promise<boolean>;
			saveAsFile: (markdown: string) => Promise<boolean>;

			onThemeChanged: (callback: (theme: string) => void) => () => void;
			onFontChanged: (callback: (font: string) => void) => () => void;
		};
	}
}
