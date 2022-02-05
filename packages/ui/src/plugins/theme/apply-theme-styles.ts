import { Theme } from './types';

export function applyThemeStyles(themes: Theme[]): void {
  document.querySelectorAll('.theme-style')
    .forEach((element) => element.remove());

  const styleElements = themes.map((theme) => {
    const element = document.createElement('style');
    element.innerText = theme.style;

    return element;
  });

  document.querySelector('head')!.append(...styleElements);
}

