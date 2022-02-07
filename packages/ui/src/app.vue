<template>
  <widget-container
    v-bind="configuration.rootWidgetContainer"
    :class="themeClass"
  />
</template>

<script lang="ts" setup>
import WidgetContainer from './widgets/widget-container.vue';

import { useConfiguration, useDocuments, useTheme } from '@src/plugins';

const { configuration } = useConfiguration();
const { loadDocumentsState } = useDocuments();
const { themeClass } = useTheme();

loadDocumentsState();
</script>

<style lang="scss">
#app > .widget-container {
  height: 100%;
}
</style>
