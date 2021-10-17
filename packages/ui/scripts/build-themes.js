const path = require('path');
const fs = require('fs/promises');
const sass = require('sass');


if (require.main === module) {
  buildThemes();
}

async function buildThemes() {
  const themeDirectories = await getThemeDirectories();

  for (const directory of themeDirectories) {
    const theme = await buildThemeFromDirectory(directory);
    await writeThemeToOutputDirectory(theme);
  }
}

async function buildThemeFromDirectory(directory) {
  return {
    ...(await getThemeProperties(directory)),
    style: getThemeStyles(directory)
  };
}

async function getThemeProperties(directory) {
  const file = path.resolve(directory, 'properties.json');
  const content = (await fs.readFile(file)).toString();
  return JSON.parse(content);
}

function getThemeStyles(directory) {
  const file = path.resolve(directory, 'index.scss');

  return sass.renderSync({ file }).css.toString();
}

async function writeThemeToOutputDirectory(theme) {
  const outputDirectory = path.resolve(process.cwd(), 'dist/themes');
  const outputFile = path.resolve(outputDirectory, `${theme.class}.json`);

  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(theme));
}

async function getThemeDirectories() {
  const inputDirectory = path.resolve(process.cwd(), 'src/themes');
  return (await fs.readdir(inputDirectory))
    .map((directory) => path.resolve(inputDirectory, directory));
}
