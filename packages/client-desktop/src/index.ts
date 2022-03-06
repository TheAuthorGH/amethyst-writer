import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';

import { handleExportDocument } from './export-document';

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

  ipcMain.on('exportDocument', handleExportDocument);
}

app.whenReady().then(createWindow);
