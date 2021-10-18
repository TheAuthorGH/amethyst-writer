<template>
  <div class="widget widget--document-export">
    <h3>Export</h3>

    <button @click="exportToPdf()">
      + PDF
    </button>
  </div>
</template>

<script>
import { useDocuments } from '@src/plugins';

export default {
  setup() {
    const { currentDocument } = useDocuments();

    const exportToPdf = async () => {
      // TODO: How to do it without this hack?
      const document = JSON.parse(JSON.stringify(currentDocument.value));
      window._amethyst.exportDocument(document, 'pdf');
    };

    return {
      exportToPdf
    };
  }
};
</script>
