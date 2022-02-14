import { createApp } from 'vue';

import './styles/index.scss';
import { router } from './router';
import { installPlugins } from './plugins';

import App from './app.vue';

createApp(App)
  .use(router)
  .use(installPlugins)
  .mount('#app');
