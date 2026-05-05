export {};

declare global {
	interface Window {
		marka: {
			onFileOpened: (callback: (doc: string) => void) => () => void;
		};
	}
}
