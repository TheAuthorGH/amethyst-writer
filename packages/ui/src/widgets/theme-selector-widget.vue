<template>
  <div class="widget widget--theme-selector">
    <h3>Theme</h3>

    <select
      :value="themeClass"
      @change="setThemeClass($event.target.value)"
    >
      <option
        v-for="theme in themes"
        :key="theme.class"
        :value="theme.class"
      >
        {{ theme.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useTheme } from '@src/plugins';

export default defineComponent({
  setup() {
    const { themeClass, themes, setThemeClass } = useTheme();

    return {
      themeClass,
      themes,
      setThemeClass
    };
  }
});
</script>
