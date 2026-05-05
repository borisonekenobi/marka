import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('marka', {
	onFileOpened: (callback: (doc: string) => void) => {
		const handler = (_: Electron.IpcRendererEvent, doc: string) => callback(doc);

		ipcRenderer.on('file-opened', handler);

		return () => {
			ipcRenderer.removeListener('file-opened', handler);
		};
	},
});
