import { Ref } from 'vue';

export interface ConfigurationPlugin {
  configuration: Ref<Configuration>;
  updateConfiguration: (updates: Partial<Configuration>) => void;
  saveConfiguration: () => void;
  loadConfiguration: () => void;
}

// TODO: move these to general configuration package
export interface Configuration {
  rootWidgetContainer: WidgetContainerConfiguration;
}

export interface WidgetContainerConfiguration {
  widgets: WidgetConfiguration[];
  rows: WidgetRowConfiguration[];
}

export interface WidgetConfiguration {
  // TODO: use enum?
  type: string;
  layout: {
    row: number;
    greedyWidth?: boolean;
    fullWidth?: boolean;
  };
  props: object;
}

export interface WidgetRowConfiguration {
  greedyHeight?: boolean;
}
