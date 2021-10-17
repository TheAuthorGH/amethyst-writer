<template>
  <div class="widget widget--navigator-widget">
    <ul>
      <li
        v-for="document in documents"
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

<script>
import { useDocuments } from '@src/plugins';

export default {
  setup() {
    const {
      currentDocumentUuid,
      documents,
      setCurrentDocumentUuid,
      createNewDocument
    } = useDocuments();

    const getDocumentButtonClasses = (document) => {
      return {
        'selected': document.uuid === currentDocumentUuid.value
      };
    };

    return {
      documents,
      getDocumentButtonClasses,
      setCurrentDocumentUuid,
      createNewDocument
    };
  }
};
</script>

<style lang="scss">
.widget--navigator-widget {
  color: var(--accent-light);
  padding: 0.8rem;
  background-color: var(--accent-darker);
  width: 100%;
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
