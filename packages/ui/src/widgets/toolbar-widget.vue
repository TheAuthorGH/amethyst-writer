<template>
  <div class="widget widget--toolbar">
    <!-- TODO: make this configurable -->
    <widget-container
      :widgets="[
        { type: 'documentMetaEdit', layout: { row: 0, greedyWidth: true } },
        { type: 'sectionManager', layout: { row: 1, greedyWidth: true } },
        { type: 'documentStats', layout: { row: 2, greedyWidth: true } },
        { type: 'documentExport', layout: { row: 3, greedyWidth: true } },
        { type: 'themeSelector', layout: { row: 4, greedyWidth: true } }
      ]"
      :rows="[ {}, {}, {}, {}, {} ]"
    />
  </div>
</template>

<script lang="ts" setup>
import WidgetContainer from './widget-container.vue';
</script>

<style lang="scss">
.widget--toolbar {
  color: var(--accent-light);
  background-color: var(--accent-darker);
  padding: 1.6rem;
  border-top: 2px var(--accent-dark) solid;
  box-shadow: var(--box-shadow);
  overflow-y: auto;

  .widget-container .row {
    border-bottom: var(--accent-light) 1px dotted;
    padding-bottom: 0.8rem;
    margin-bottom: 1.6rem;
  }
}
</style>
