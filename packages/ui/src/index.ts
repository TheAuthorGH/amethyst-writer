import { createApp } from 'vue';

import './styles/index.scss';
import { installPlugins } from './plugins';

import App from './app.vue';
import WidgetContainer from './widgets/widget-container.vue';

createApp(App)
  .use(installPlugins)
  .component('widget-container', WidgetContainer)
  .mount('#app');
