<template>
  <div class="widget widget--document-stats">
    <h3>Words</h3>
    <span class="document-stat">{{ wordCount }}</span>

    <h3>Paragraphs</h3>
    <span class="document-stat">{{ paragraphCount }}</span>
  </div>
</template>

<script>
import { computed } from 'vue';
import { getDocumentWordCount, getDocumentNodeTypeCount } from '@amethyst-writer/document/dist/index';

import { useDocuments } from '@src/plugins';

export default {
  setup() {
    const { currentDocument } = useDocuments();
    const wordCount = computed(() => getDocumentWordCount(currentDocument.value));
    const paragraphCount = computed(() => getDocumentNodeTypeCount(currentDocument.value, 'paragraph-start'));

    return {
      wordCount,
      paragraphCount
    };
  }
};
</script>

<style lang="scss">
.widget--document-stats {
  display: flex;
  flex-direction: column;

  .document-stat {
    text-align: right;
  }
}
</style>
