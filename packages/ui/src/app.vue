<template>
  <!-- TODO: Allow widget configuration -->
  <widget-container
    :widgets="[
      { type: 'documentNavigator', layout: { row: 0, fullWidth: true } },
      { type: 'toolbar', layout: { row: 1, greedyHeight: true } },
      { type: 'writer', layout: { row: 1, greedyWidth: true } },
      { type: 'preview', layout: { row: 1, greedyWidth: true } }
    ]"
    :rows="[ {}, { greedyHeight: true } ]"
    :class="themeClass"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDocuments, useTheme } from '@src/plugins';

export default defineComponent({
  setup() {
    const { loadDocumentsState } = useDocuments();
    const { themeClass } = useTheme();

    loadDocumentsState();

    return {
      themeClass
    };
  }
});
</script>

<style lang="scss">
#app > .widget-container {
  height: 100%;
}
</style>
