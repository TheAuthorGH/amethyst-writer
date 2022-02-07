<template>
  <div class="widget widget--document-stats">
    <h3>Words</h3>
    <span class="document-stat">{{ wordCount }}</span>

    <h3>Paragraphs</h3>
    <span class="document-stat">{{ paragraphCount }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { getDocumentWordCount, getDocumentNodeTypeCount } from '@amethyst-writer/document/dist';

import { useDocuments } from '@src/plugins';

const { currentDocument } = useDocuments();
const wordCount = computed(() => getDocumentWordCount(currentDocument.value));
const paragraphCount = computed(() => getDocumentNodeTypeCount(currentDocument.value, 'paragraph-start'));
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
