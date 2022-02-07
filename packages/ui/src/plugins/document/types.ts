import { Ref } from 'vue';

import { Document, DocumentSection } from '@amethyst-writer/document/dist';

export interface DocumentPlugin {
  documentsByUuid: Ref<Record<string, Document>>,
  currentDocumentUuid: Ref<string>,

  currentDocument: Ref<Document>,
  documents: Ref<Document[]>,

  setCurrentDocumentUuid: (uuid: string) => void,
  updateCurrentDocument: (updates: Partial<Document>) => void,
  createNewDocument: () => void,
  loadDocumentsState: () => void,

  currentSectionUuid: Ref<string>,
  currentSection: Ref<DocumentSection>,
  setCurrentSectionUuid: (uuid: string) => void,
  createNewSection: (title: string) => void,
}

