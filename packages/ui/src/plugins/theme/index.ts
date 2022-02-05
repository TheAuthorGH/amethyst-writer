import { App, Ref, ref, readonly, inject, watch } from 'vue';

import { themeSymbol } from '@src/plugins/injection-symbols';

import { Theme, ThemePlugin } from './types';
import { applyThemeStyles } from './apply-theme-styles';

export function installThemePlugin(app: App): void {
  const themeClass = ref('');
  const themes = ref<Theme[]>([]);

  const setThemeClass = (clazz: string): void => {
    themeClass.value = clazz;
  };

  const addTheme = (theme: Theme): void => {
    themes.value = [ ...themes.value, theme ];
  };

  watch(themes, applyThemeStyles);

  function getDefaultThemes(): Theme[] {
    const themesContext = require.context('@dist/themes', true, /\.json$/);
    return (themesContext.keys().map(themesContext)) as Theme[];
  }

  getDefaultThemes().forEach(addTheme);

  // TODO: improve default theme inclusion with configuration package
  setThemeClass('theme--amethyst');

  app.provide(themeSymbol, {
    themeClass: readonly(themeClass),
    themes: readonly(themes),
    setThemeClass,
    addTheme
  } as ThemePlugin);
}

export function useTheme(): ThemePlugin {
  return inject<ThemePlugin>(themeSymbol)!;
}

