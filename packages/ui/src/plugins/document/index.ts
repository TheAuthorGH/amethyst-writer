import { App, ref, computed, readonly, inject } from 'vue';

import { Document, DocumentSection, createDocument, createSection } from '@amethyst-writer/document/dist';

import { documentSymbol } from '@src/plugins/injection-symbols';
import { DocumentPlugin } from './types';

export function installDocumentPlugin(app: App) {
  const documentsByUuid = ref<Record<string, Document>>({});
  // TODO: Really have this empty string at the start?
  const currentDocumentUuid = ref('');

  const documents = computed<Document[]>(() => Object.values(documentsByUuid.value));
  const currentDocument = computed<Document>(() => documentsByUuid.value[currentDocumentUuid.value]);

  const setCurrentDocumentUuid = (uuid: string) => {
    currentDocumentUuid.value = uuid;
    setCurrentSectionUuid(currentDocument.value.sections[0].uuid);
  };

  const updateCurrentDocument = (updates: Partial<Document>) => {
    documentsByUuid.value = {
      ...documentsByUuid.value,
      [currentDocumentUuid.value]: { ...currentDocument.value, ...updates }
    };

    // TODO: Don't ALWAYS save. Ask the user first. Also, implement partial document saving.
    saveDocumentsState();
  };

  const createNewDocument = () => {
    const newDocument = createDocument();

    documentsByUuid.value = {
      ...documentsByUuid.value,
      [newDocument.uuid]: newDocument
    };

    setCurrentDocumentUuid(newDocument.uuid);
  };

  // TODO: Clean this up
  // TODO: This is not saving the selected section.
  const saveDocumentsState = () => {
    localStorage.setItem('documentsByUuid', JSON.stringify(documentsByUuid.value));
    localStorage.setItem('currentDocumentUuid', String(currentDocumentUuid.value));
  };

  const loadDocumentsState = () => {
    documentsByUuid.value = JSON.parse(localStorage.getItem('documentsByUuid') || '{}');
    currentDocumentUuid.value = localStorage.getItem('currentDocumentUuid') || '';
    // TODO: Bad. Remember sections too.

    if (Object.keys(documentsByUuid.value).length === 0) {
      createNewDocument();
    } else {
      setCurrentSectionUuid(currentDocument.value.sections[0].uuid);
    }
  };

  // TODO: Everything below this point could be separated.
  const currentSectionUuid = ref<string>('');

  const currentSection = computed<DocumentSection>(() => currentDocument.value.sections.find((section) => section.uuid === currentSectionUuid.value)!);

  const setCurrentSectionUuid = (uuid: string) => {
    currentSectionUuid.value = uuid;
  };

  const createNewSection = (title: string) => {
    const newSection = {
      ...createSection(title),
      // TODO: Seriously reconsider if simply using array indexes would suffice,
      //  because nodes don't have any order property, which would simply be chaotic.

      order: currentDocument.value.sections.reduce(
        (highest, section) => (section.order > highest ? section.order : highest),
        0
      ) + 1
    };

    updateCurrentDocument({
      sections: [ ...currentDocument.value.sections, newSection ]
    });

    setCurrentSectionUuid(newSection.uuid);
  };

  const plugin: DocumentPlugin = {
    // TODO: Make this readonly
    documentsByUuid: documentsByUuid,
    currentDocumentUuid: readonly(currentDocumentUuid),

    currentDocument,
    documents,

    setCurrentDocumentUuid,
    updateCurrentDocument,
    createNewDocument,
    loadDocumentsState,

    currentSectionUuid: readonly(currentSectionUuid),
    currentSection,
    setCurrentSectionUuid,
    createNewSection,
  };

  app.provide(documentSymbol, plugin);
}

// TODO: Do we really still need these functions? Where to put them?
export function useDocuments(): DocumentPlugin {
  return inject<DocumentPlugin>(documentSymbol)!;
}

