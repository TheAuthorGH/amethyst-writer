import { App, ref, inject } from 'vue';

import { configurationSymbol } from '@src/plugins/injection-symbols';

import { ConfigurationPlugin, Configuration } from './types';
import defaultConfiguration from './default-config.json';

export * from './types';

export function installConfigurationPlugin(app: App) {
  const configuration = ref(defaultConfiguration as Configuration);

  const updateConfiguration = (updates: Partial<Configuration>) => {
    configuration.value = {
      ...configuration.value,
      ...updates
    };
  };

  const saveConfiguration = () => {
    // TODO: Instead, send a message and have multiple strategies.
    localStorage.setItem('configuration', JSON.stringify(configuration.value));
  };

  const loadConfiguration = () => {
    configuration.value = JSON.parse(localStorage.getItem('configuration') || JSON.stringify(defaultConfiguration));
  };

  loadConfiguration();

  const plugin: ConfigurationPlugin = {
    configuration,
    updateConfiguration,
    saveConfiguration,
    loadConfiguration
  };

  app.provide(configurationSymbol, plugin);
}

export function useConfiguration(): ConfigurationPlugin {
  return inject<ConfigurationPlugin>(configurationSymbol)!;
}
