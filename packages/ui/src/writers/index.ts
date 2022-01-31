import { Component } from 'vue';

import debug from './debug-writer.vue';
import plainText from './plain-text-writer.vue';

export const writers: Record<string, Component> = {
  debug,
  plainText
};
