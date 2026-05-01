import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('marka', {
  openFile: () => ipcRenderer.invoke('open-file'),
  saveFile: (doc: any) => ipcRenderer.invoke('save-file', doc),

  onFileOpened: (callback: (doc: any) => void) => {
    ipcRenderer.on('file-opened', (_: Electron.IpcRendererEvent, doc: any) => callback(doc));
    return () => ipcRenderer.removeAllListeners('file-opened');
  },
});
