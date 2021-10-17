<template>
  <div class="widget widget--theme-selector">
    <h3>Theme</h3>

    <select
      :value="themeClass"
      @change="setThemeClass($event.target.value)"
    >
      <option
        v-for="theme in themes"
        :value="theme.class"
      >
        {{ theme.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { useTheme } from '@src/plugins';

export default {
  setup() {
    const { themeClass, themes, setThemeClass } = useTheme();

    return {
      themeClass,
      themes,
      setThemeClass
    };
  }
};
</script>
