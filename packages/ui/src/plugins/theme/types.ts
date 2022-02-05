import { Ref } from 'vue';

export interface ThemePlugin {
  themeClass: Ref<string>,
  themes: Ref<Theme[]>,
  setThemeClass: (clazz: string) => void,
  addTheme: (theme: Theme) => void
}

export interface Theme {
  name: string;
  description: string;
  class: string;
  style: string;
}

