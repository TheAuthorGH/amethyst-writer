<template>
  <div class="widget widget--open-configuration">
    <button @click="openConfiguration">
      C
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const openConfiguration = () => {
  router.push({ name: 'configurationEditor' });
};
</script>

<style lang="scss">
.widget--open-configuration {
  color: var(--accent-light);
  padding: 0.8rem;
  background-color: var(--accent-darker);
  box-shadow: var(--box-shadow);
}
</style>
