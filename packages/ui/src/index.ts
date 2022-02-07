import { createApp } from 'vue';

import './styles/index.scss';
import { installPlugins } from './plugins';

import App from './app.vue';

createApp(App)
  .use(installPlugins)
  .mount('#app');
