import path from 'path';
import { app, BrowserWindow } from 'electron';

async function createWindow(): Promise<void> {
  const window = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: true,
      webSecurity: true
    }
  });

  window.maximize();
  window.show();

  await window.loadFile(path.resolve(__dirname, './index.html'));
}

app.whenReady().then(createWindow);
