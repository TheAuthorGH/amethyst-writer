import { App } from 'vue';

import { installDocumentPlugin, useDocuments } from './document';
import { installThemePlugin, useTheme } from './theme';

export function installPlugins(app: App) {
  app.use(installDocumentPlugin);
  app.use(installThemePlugin);
}

export {
  useDocuments,
  useTheme
};
