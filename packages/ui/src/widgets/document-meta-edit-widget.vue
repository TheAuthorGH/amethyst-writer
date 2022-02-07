<template>
  <div class="widget widget--document-meta-edit">
    <h3>Document</h3>

    <div>
      <input
        :value="currentDocument.title"
        @input="updateTitle($event.target.value)"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDocuments } from '@src/plugins';

const { currentDocument, updateCurrentDocument } = useDocuments();

const updateTitle = (title: string) => {
  updateCurrentDocument({ title });
};
</script>
