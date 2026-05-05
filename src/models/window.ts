export {};

declare global {
	interface Window {
		marka: {
			openFile: () => Promise<string | null>;
			saveFile: (doc: any) => Promise<boolean>;
			onFileOpened: (callback: (doc: any) => void) => () => void;
		};
	}
}
