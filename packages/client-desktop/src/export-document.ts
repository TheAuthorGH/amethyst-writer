import { Document } from '@amethyst-writer/document/dist';
import { IpcMainEvent } from 'electron';
import { exportDocumentToJson, exportDocumentToPdf } from './document-exporters';

type ExportDocumentPayload = {
  strategy: string;
  document: Document;
};

export function handleExportDocument(event: IpcMainEvent, payload: ExportDocumentPayload) {
  const methods: Record<string, (document: Document) => Promise<void>> = {
    pdf: exportDocumentToPdf,
    json: exportDocumentToJson
  };

  methods[payload.strategy](payload.document);
}


