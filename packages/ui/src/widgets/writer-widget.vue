<template>
  <div class="widget widget--writer">
    <!-- TODO: Do writers really need to be fully decoupled from the rest of the flow? -->
    <component
      :is="writerComponent"
      v-bind="{
        document: currentDocument,
        sectionUuid: currentSectionUuid
      }"
      @nodes-updated="updateNodes($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { DocumentNode } from '@amethyst-writer/document/dist';

import { useDocuments } from '@src/plugins';
import { writers } from '@src/writers';

const { currentDocument, updateCurrentDocument, currentSectionUuid } = useDocuments();

// TODO: Make this configurable
const writerComponent = computed(() => writers['plainText']);

const updateNodes = (nodes: DocumentNode[]) => {
  updateCurrentDocument({
    nodes: [
      ...currentDocument.value.nodes.filter((node) => node.sectionUuid !== currentSectionUuid.value),
      ...nodes
    ]
  });
};
</script>

<style lang="scss">
.widget--writer {
  padding: 2.4rem;
}
</style>
