import { contextBridge, ipcRenderer } from 'electron';
import { Document } from '@marka-editor/markdown';

contextBridge.exposeInMainWorld('marka', {
  openFile: (): Promise<Document | null> => ipcRenderer.invoke('open-file'),
  saveFile: (doc: Document): Promise<void> => ipcRenderer.invoke('save-file', doc),

  onFileOpened: (callback: (doc: any) => void) => {
    ipcRenderer.on('file-opened', (_: Electron.IpcRendererEvent, doc: any) => callback(doc));
    return () => ipcRenderer.removeAllListeners('file-opened');
  },
});
