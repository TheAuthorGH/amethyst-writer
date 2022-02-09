<template>
  <div class="widget widget--navigator-widget">
    <ul>
      <li
        v-for="document in documents"
        :key="document.uuid"
      >
        <button
          :class="getDocumentButtonClasses(document)"
          @click="setCurrentDocumentUuid(document.uuid)"
        >
          {{ document.title }}
        </button>
      </li>

      <li>
        <button @click="createNewDocument()">
          +
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { Document } from '@amethyst-writer/document/dist';

import { useDocuments } from '@src/plugins';

const {
  currentDocumentUuid,
  documents,
  setCurrentDocumentUuid,
  createNewDocument
} = useDocuments();

const getDocumentButtonClasses = (document: Document) => ({
  'selected': document.uuid === currentDocumentUuid.value
});
</script>

<style lang="scss">
.widget--navigator-widget {
  color: var(--accent-light);
  padding: 0.8rem;
  background-color: var(--accent-darker);
  box-shadow: var(--box-shadow);

  ul {
    display: flex;
  }

  button {
    margin-left: 0.8rem;
    margin-right: 0.8rem;
  }
}
</style>
