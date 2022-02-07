<template>
  <div class="widget widget--document-export">
    <h3>Export</h3>

    <button @click="exportToPdf()">
      + PDF
    </button>

    <button @click="exportToJson()">
      + JSON
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useDocuments } from '@src/plugins';

const { currentDocument } = useDocuments();

const exportToPdf = async () => {
  // TODO: How to do it without this hack?
  const document = JSON.parse(JSON.stringify(currentDocument.value));
  window._amethyst.exportDocument(document, 'pdf');
};

const exportToJson = async () => {
  // TODO: How to do it without this hack?
  const document = JSON.parse(JSON.stringify(currentDocument.value));
  window._amethyst.exportDocument(document, 'json');
};
</script>
