<template>
  <div class="configuration-editor">
    <button @click="router.back()">
      Exit
    </button>

    <textarea
      v-model="configurationJsonInput"
    />

    <div class="button-group">
      <button @click="submitConfigurationUpdates()">
        Save
      </button>

      <button @click="resetConfiguration()">
        Set to Defaults
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useConfiguration } from '@src/plugins';
import { Configuration } from '@src/plugins/configuration/types';
// TODO: Really do it like this?
import defaultConfiguration from '@src/plugins/configuration/default-config.json';

const router = useRouter();

const { configuration, updateConfiguration, saveConfiguration } = useConfiguration();

const configurationJsonInput = ref(JSON.stringify(configuration.value, undefined, '  '));

const submitConfigurationUpdates = () => {
  updateConfiguration(JSON.parse(configurationJsonInput.value));
  saveConfiguration();
};

const resetConfiguration = () => {
  updateConfiguration(defaultConfiguration as Configuration);
  saveConfiguration();
};
</script>
