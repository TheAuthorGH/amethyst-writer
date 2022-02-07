import { App } from 'vue';

import { installConfigurationPlugin, useConfiguration } from './configuration';
import { installDocumentPlugin, useDocuments } from './document';
import { installThemePlugin, useTheme } from './theme';

export function installPlugins(app: App) {
  app.use(installConfigurationPlugin);
  app.use(installDocumentPlugin);
  app.use(installThemePlugin);
}

export {
  useConfiguration,
  useDocuments,
  useTheme
};
