import * as path from 'path';
import * as fs from 'fs/promises';
import sass from 'sass';

import { Theme } from '../src/plugins/theme';

if (require.main === module) {
  buildThemes();
}

async function buildThemes(): Promise<void> {
  const themeDirectories = await getThemeDirectories();

  for (const directory of themeDirectories) {
    const theme = await buildThemeFromDirectory(directory);
    await writeThemeToOutputDirectory(theme);
  }
}

async function buildThemeFromDirectory(directory: string): Promise<Theme> {
  return {
    ...(await getThemeProperties(directory)),
    style: getThemeStyles(directory)
  };
}

async function getThemeProperties(directory: string): Promise<Theme> {
  const file = path.resolve(directory, 'properties.json');
  const content = (await fs.readFile(file)).toString();
  return JSON.parse(content);
}

function getThemeStyles(directory: string) {
  const file = path.resolve(directory, 'index.scss');

  return sass.renderSync({ file }).css.toString();
}

async function writeThemeToOutputDirectory(theme: Theme): Promise<void> {
  const outputDirectory = path.resolve(process.cwd(), 'dist/themes');
  const outputFile = path.resolve(outputDirectory, `${theme.class}.json`);

  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(theme));
}

async function getThemeDirectories(): Promise<string[]> {
  const inputDirectory = path.resolve(process.cwd(), 'src/themes');
  return (await fs.readdir(inputDirectory))
    .map((directory) => path.resolve(inputDirectory, directory));
}
