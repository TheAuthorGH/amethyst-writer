import { ref, readonly, inject, watch } from 'vue';

import { themeSymbol } from './injection-symbols';

export function installThemePlugin(app) {
  const themeClass = ref('');
  const themes = ref([]);

  const setThemeClass = (clazz) => {
    themeClass.value = clazz;
  };

  const addTheme = (theme) => {
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
  });

}

export function useTheme() {
  return inject(themeSymbol);
}

function applyThemeStyles(themes) {
  document.querySelectorAll('.theme-style')
    .forEach((element) => element.remove());

  const styleElements = themes.map((theme) => {
    const element = document.createElement('style');
    element.innerText = theme.style;

    return element;
  });

  document.querySelector('head')
    .append(...styleElements);
}

function getDefaultThemes() {
  const themesContext = require.context('@dist/themes', true, /\.json$/);
  return themesContext.keys().map(themesContext);
}
