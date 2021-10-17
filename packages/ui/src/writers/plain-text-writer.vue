<template>
  <div class="writer writer--plain-text">
    <textarea
      :value="textInput"
      placeholder="Once upon a time..."
      @input="onInput($event.target.value)"
    />
  </div>
</template>

<script>
import { ref, watch, computed, toRefs } from 'vue';
import { parseNodesFromPlainText, renderNodesToPlainText } from '@amethyst-writer/document/dist/index';

export default {
  props: {
    document: { type: Object, required: true },
    sectionUuid: { type: String, required: true }
  },
  emits: [ 'nodes-updated' ],
  setup(props, { emit }) {
    const { document, sectionUuid } = toRefs(props);
    const textInput = ref('');

    // TODO: Is this needlessly complicated?
    const documentUuid = computed(() => document.value.uuid);

    const updateTextInput = () => {
      const nodes = document.value.nodes.filter((node) => node.sectionUuid === sectionUuid.value);
      textInput.value = renderNodesToPlainText(nodes);
    };

    watch([ documentUuid, sectionUuid ], () => {
      updateTextInput();
    });

    updateTextInput();

    const onInput = (value) => {
      textInput.value = value;

      // TODO: Maybe some of this could be moved to the document injectable.
      emit(
        'nodes-updated',
        parseNodesFromPlainText(textInput.value).map((node) => ({
          ...node,
          sectionUuid: sectionUuid.value
        }))
      );
    };

    return {
      textInput,
      onInput
    };
  }
};
</script>

<style lang="scss">
.writer--plain-text {
  height: 100%;
  display: flex;

  textarea {
    font-size: 1.8rem;
    height: auto;
    max-width: 58rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    resize: none;
    // TODO: Some of these should be general styles.
    font-family: monospace;
  }
}
</style>
