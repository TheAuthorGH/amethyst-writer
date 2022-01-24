import fs from 'fs/promises';
import { BrowserWindow } from 'electron';
import { dialog } from 'electron';

import { Document, renderNodesToHtml, getOrderedSections } from '@amethyst-writer/document/dist/index';

export async function exportDocumentToPdf(document: Document): Promise<void> {
  const file = await dialog.showSaveDialog({
    title: 'Export document to PDF',
    filters: [
      { name: 'PDFs', extensions: [ 'pdf' ]}
    ],
    defaultPath: `${document.title}.pdf`
  });

  if (file.canceled) {
    return;
  }

  const sectionsHtml = getOrderedSections(document.sections).reduce((html, section) => {
    const nodes = document.nodes.filter((node) => node.sectionUuid === section.uuid);

    return `${html} <div class="section-break"></div> ${renderNodesToHtml(nodes)}`;
  }, '');

  // TODO: All of this should come from a combination of a renderer function and the document's config
  const html = `
    <html lang="en">
      <head>
        <style>
          /* TODO: make imported font configurable and unique */
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

          body {
            background-color: rgb(249, 249, 249);
            color: rgb(16, 16, 16);
            font-family: 'EB Garamond', sans-serif;
            line-height: 32px;
          }

          .content {
            margin: auto;
            max-width: 500px;
          }

          h1 {
            text-align: center;
            font-size: 32px;
            margin-bottom: 20px;
            margin-top: 38px;
          }

          p {
            text-indent: 24px;
            margin-bottom: 6px;
            margin-top: 0;
          }

          em {
            font-style: italic;
          }

          .section-break {
            page-break-before: always;
          }
        </style>
        <title>${document.title}</title>
      </head>

      <body>
        <div class="content">
          ${sectionsHtml}
        </div>
      </body>
    </html>
  `;

  const window = new BrowserWindow({ show: false });
  window.loadURL(`data:text/html;charset=utf-8,${html}`);

  window.webContents.on('did-finish-load', async () => {
    const data = await window.webContents.printToPDF({
      landscape: false,
      printBackground: true
    });

    await fs.writeFile(file.filePath.toString(), data);
  });
}
