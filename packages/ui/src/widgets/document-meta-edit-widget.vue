<template>
  <div class="widget widget--document-meta-edit">
    <h3>Document</h3>

    <div>
      <input
        :value="currentDocument.title"
        @input="updateTitle($event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import { useDocuments } from '@src/plugins';

export default {
  setup() {
    const { currentDocument, updateCurrentDocument } = useDocuments();

    const updateTitle = (title) => {
      updateCurrentDocument({ title });
    };

    return {
      currentDocument,
      updateTitle
    };
  }
};
</script>
