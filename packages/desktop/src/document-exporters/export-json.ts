import fs from 'fs/promises';
import { dialog } from 'electron';

import { Document } from '@amethyst-writer/document/dist';

export async function exportDocumentToJson(document: Document) {
  const file = await dialog.showSaveDialog({
    title: 'Export document to JSON',
    filters: [
      { name: 'JSON', extensions: [ 'json' ] }
    ],
    defaultPath: `${document.title}.json`
  });

  if (file.canceled || !file.filePath) {
    return;
  }

  await fs.writeFile(file.filePath.toString(), JSON.stringify(document));
}
