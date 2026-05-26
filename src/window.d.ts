import type { VFile } from 'vfile';

export {};

declare global {
	interface Window {
		marka: {
			onFileOpened: (callback: (markdown: VFile) => Promise<void>) => () => void;
			onFileSave: (callback: (action: 'save' | 'save-as') => Promise<void>) => () => void;
			onFileClose: (callback: () => Promise<boolean>) => () => void;

			confirmClose: (markdown: VFile) => Promise<boolean>;
			saveFile: (markdown: VFile) => Promise<boolean>;
			saveAsFile: (markdown: VFile) => Promise<boolean>;

			onThemeChanged: (callback: (theme: string) => void) => () => void;
			onFontChanged: (callback: (font: string) => void) => () => void;

			chooseLink: () => Promise<string | undefined>;
			chooseImg: () => Promise<string | undefined>;
		};
	}
}
