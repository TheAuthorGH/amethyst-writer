import { DefineComponent } from 'vue';

import plainText from './plain-text-writer.vue';

export const writers: Record<string, DefineComponent> = {
  plainText,
};
