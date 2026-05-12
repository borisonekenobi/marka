import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('marka', {
	onFileOpened,
	onFileSave,
	onFileClose,
	confirmClose: (markdown: string): Promise<boolean> => ipcRenderer.invoke('confirm', markdown),
	saveFile: (markdown: string): Promise<boolean> => ipcRenderer.invoke('save-file', markdown),
	saveAsFile: (markdown: string): Promise<boolean> =>
		ipcRenderer.invoke('save-as-file', markdown),
	onThemeChanged,
	onFontChanged,
});

function onFileOpened(callback: (markdown: string) => Promise<void>): () => void {
	const handler = (_: Electron.IpcRendererEvent, markdown: string): Promise<void> =>
		callback(markdown);

	ipcRenderer.on('file-opened', handler);

	return (): void => {
		ipcRenderer.removeListener('file-opened', handler);
	};
}

function onFileSave(callback: (action: 'save' | 'save-as') => Promise<void>): () => void {
	const handler = (_: Electron.IpcRendererEvent, action: 'save' | 'save-as'): Promise<void> =>
		callback(action);

	ipcRenderer.on('file-save', handler);

	return (): void => {
		ipcRenderer.removeListener('file-save', handler);
	};
}

function onFileClose(callback: () => Promise<boolean>): () => void {
	const handler = async (_: Electron.IpcRendererEvent, replyChannel?: string): Promise<void> => {
		try {
			const result = await callback();
			if (replyChannel) {
				ipcRenderer.send(replyChannel, result);
			}
		} catch (err) {
			console.error(err);
			if (replyChannel) {
				ipcRenderer.send(replyChannel, false);
			}
		}
	};

	ipcRenderer.on('file-close', handler);

	return (): void => {
		ipcRenderer.removeListener('file-close', handler);
	};
}

function onThemeChanged(callback: (theme: string) => void): () => void {
	const handler = (_: Electron.IpcRendererEvent, theme: string): void => callback(theme);

	ipcRenderer.on('theme-changed', handler);

	return (): void => {
		ipcRenderer.removeListener('theme-changed', handler);
	};
}

function onFontChanged(callback: (font: string) => void): () => void {
	const handler = (_: Electron.IpcRendererEvent, font: string): void => callback(font);

	ipcRenderer.on('font-changed', handler);

	return (): void => {
		ipcRenderer.removeListener('font-changed', handler);
	};
}
