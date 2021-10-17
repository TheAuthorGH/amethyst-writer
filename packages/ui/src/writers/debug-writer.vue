<template>
  <textarea
    class="writer writer--debug-writer"
    v-model="textInput"
  />
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    nodes: { type: Array, required: true }
  },
  setup(props, { emit }) {
    const textInput = ref('');

    watch(props.nodes, () => textInput.value = JSON.stringify(props.nodes, null, '  '));

    watch(textInput, () => {
      let nodes;

      try {
        nodes = JSON.parse(textInput.value);
      } catch {
        return;
      }

      emit('nodes-updated', nodes);
    });

    return {
      textInput
    };
  }
};
</script>

<style lang="scss">
.writer--debug-writer {
  height: 100%;
}
</style>
