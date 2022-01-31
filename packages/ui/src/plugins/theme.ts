import { App, Ref, ref, readonly, inject, watch } from 'vue';

import { themeSymbol } from './injection-symbols';

// TODO: Maybe move this?
interface Theme {
  name: string;
  description: string;
  class: string;
  style: string;
}

// TODO: Where to put these?
interface ThemePlugin {
  themeClass: Ref<string>,
  themes: Ref<Theme[]>,
  setThemeClass: (clazz: string) => void,
  addTheme: (theme: Theme) => void
}

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

function applyThemeStyles(themes: Theme[]): void {
  document.querySelectorAll('.theme-style')
    .forEach((element) => element.remove());

  const styleElements = themes.map((theme) => {
    const element = document.createElement('style');
    element.innerText = theme.style;

    return element;
  });

  document.querySelector('head')!.append(...styleElements);
}

function getDefaultThemes(): Theme[] {
  const themesContext = require.context('@dist/themes', true, /\.json$/);
  return (themesContext.keys().map(themesContext)) as Theme[];
}
