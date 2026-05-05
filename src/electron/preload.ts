import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('marka', {
	onFileOpened: (callback: (doc: string) => void) => {
		const handler = (_: Electron.IpcRendererEvent, doc: string) => callback(doc);

		ipcRenderer.on('file-opened', handler);

		return () => {
			ipcRenderer.removeListener('file-opened', handler);
		};
	},
	onThemeChanged: (callback: (theme: string) => void) => {
		const handler = (_: Electron.IpcRendererEvent, theme: string) => callback(theme);

		ipcRenderer.on('theme-changed', handler);

		return () => {
			ipcRenderer.removeListener('theme-changed', handler);
		};
	},
	onFontChanged: (callback: (font: string) => void) => {
		const handler = (_: Electron.IpcRendererEvent, font: string) => callback(font);

		ipcRenderer.on('font-changed', handler);

		return () => {
			ipcRenderer.removeListener('font-changed', handler);
		};
	},
});
