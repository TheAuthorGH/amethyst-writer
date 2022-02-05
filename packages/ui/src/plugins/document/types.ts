import { ComputedRef, Ref } from 'vue';

import { Document, DocumentSection } from '@amethyst-writer/document';

export interface DocumentPlugin {
  documentsByUuid: Ref<Record<string, Document>>,
  currentDocumentUuid: Ref<string>,

  currentDocument: ComputedRef<Document>,
  documents: ComputedRef<Document[]>,

  setCurrentDocumentUuid: (uuid: string) => void,
  updateCurrentDocument: (updates: Partial<Document>) => void,
  createNewDocument: () => void,
  loadDocumentsState: () => void,

  currentSectionUuid: Ref<string>,
  currentSection: ComputedRef<DocumentSection>,
  setCurrentSectionUuid: (uuid: string) => void,
  createNewSection: (title: string) => void,
}

