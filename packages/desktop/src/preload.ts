import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('_amethyst', {
  exportDocument: (document: Document, strategy: string) => {
    ipcRenderer.send('exportDocument', { document, strategy });
  }
});
