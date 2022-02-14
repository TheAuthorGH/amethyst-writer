<template>
  <div
    class="app-root"
    :class="themeClass"
  >
    <router-view />
  </div>
</template>

<script lang="ts" setup>

import { useDocuments, useTheme } from '@src/plugins';

const { loadDocumentsState } = useDocuments();
const { themeClass } = useTheme();

loadDocumentsState();
</script>

<style lang="scss">
.app-root {
  height: 100%;
}

.app-root > .widget-container {
  height: 100%;
}
</style>
