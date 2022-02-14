<template>
  <widget-container
    v-bind="configuration.rootWidgetContainer"
  />
</template>

<script lang="ts" setup>
import WidgetContainer from './widgets/widget-container.vue';

import { useConfiguration } from './plugins';

const { configuration } = useConfiguration();
</script>
