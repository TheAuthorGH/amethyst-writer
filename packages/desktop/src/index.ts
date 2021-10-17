import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';

import { exportDocumentToPdf } from './document-exporters';

async function createWindow(): Promise<void> {
  const window = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: true,
      webSecurity: true,
      preload: path.resolve(__dirname, 'preload.js')
    }
  });

  window.maximize();
  window.show();

  await window.loadFile(path.resolve(__dirname, './index.html'));
}

app.whenReady().then(createWindow);

// TODO: Move this.
ipcMain.on('exportDocument', (event, payload) => {
  const methods = {
    pdf: exportDocumentToPdf
  };

  methods[payload.strategy](payload.document);
});
