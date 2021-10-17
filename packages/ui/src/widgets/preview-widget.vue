<template>
  <div class="widget widget--preview">
    <div class="preview-content">
      <div v-html="previewHtml" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import { useDocuments } from '@src/plugins';
import { renderNodesToHtml } from '@amethyst-writer/document/dist/index';

export default {
  setup() {
    const { currentDocument, currentSectionUuid  } = useDocuments();

    const previewHtml = computed(() => renderNodesToHtml(
      currentDocument.value.nodes.filter((node) => node.sectionUuid === currentSectionUuid.value)
    ));

    return {
      previewHtml
    };
  }
};
</script>

<style lang="scss">
.widget--preview {
  display: flex;
  padding: 2.4rem;
  // TODO: Pick better colors and use vars.
  background-color: #efe9d9;
  color: #433024;

  // TODO: This, especially, should be customizeable
  .preview-content {
    font-size: 2.2rem;
    font-family: 'EB Garamond', serif;
    font-weight: 500;
    max-width: 38rem;
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    overflow-y: auto;
    line-height: 3.2rem;

    h1 {
      text-align: center;
      font-size: 3.2rem;
      margin-bottom: 2rem;
      margin-top: 3.8rem;
    }

    h2 {
      text-align: left;
      font-size: 2.8rem;
      margin-bottom: 1.8rem;
      margin-top: 2.4rem;
    }

    p {
      text-indent: 2.4rem;
      margin-bottom: 0.6rem;
    }

    em {
      font-style: italic;
    }

    strong {
      font-weight: bold;
    }

    details {
      padding-top: 0.8rem;
      font-family: sans-serif;
      font-size: 1.4rem;
      // TODO: Use variable
      color: #777777;
      line-height: 1.4rem;
      text-align: right;
    }

    summary {
      cursor: pointer;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
