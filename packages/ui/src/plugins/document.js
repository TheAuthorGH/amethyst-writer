import { ref, computed, readonly, inject } from 'vue';

import { createDocument, createSection } from '@amethyst-writer/document';
import { documentSymbol, sectionSymbol } from './injection-symbols';

export function installDocumentPlugin(app) {
  const documentsByUuid = ref({});
  const currentDocumentUuid = ref(null);

  const documents = computed(() => Object.values(documentsByUuid.value));
  const currentDocument = computed(() => documentsByUuid.value[currentDocumentUuid.value]);

  const setCurrentDocumentUuid = (uuid) => {
    currentDocumentUuid.value = uuid;
    setCurrentSectionUuid(currentDocument.value.sections[0].uuid);
  };

  const updateCurrentDocument = (updates) => {
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
    currentDocumentUuid.value = localStorage.getItem('currentDocumentUuid') || null;
    // TODO: Bad. Remember sections too.

    if (Object.keys(documentsByUuid.value).length === 0) {
      createNewDocument();
    } else {
      setCurrentSectionUuid(currentDocument.value.sections[0].uuid);
    }
  };

  // TODO: Everything below this point could be separated.
  const currentSectionUuid = ref(null);

  const currentSection = computed(() => {
    return currentDocument.value.sections.find((section) => section.uuid === currentSectionUuid.value)
  });

  const setCurrentSectionUuid = (uuid) => {
    currentSectionUuid.value = uuid;
  };

  const createNewSection = (title) => {
    const newSection = {
      ...createSection(title),
      // TODO: Seriously reconsider if simply using array indexes would suffice,
      //  because nodes don't have any order property, which would simply be chaotic.
      order: currentDocument.value.sections.reduce(
        (highest, section) => section.order > highest ? section.order : highest,
        0
      ) + 1
    };

    updateCurrentDocument({
      sections: [ ...currentDocument.value.sections, newSection ]
    });

    setCurrentSectionUuid(newSection.uuid);
  };

  app.provide(documentSymbol, {
    documentsByUuid: readonly(documentsByUuid),
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
  });
}

// TODO: Do we really still need these functions? Where to put them?
export function useDocuments() {
  return inject(documentSymbol);
}

