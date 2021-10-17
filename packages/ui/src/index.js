import { createApp } from 'vue';

import './styles/index.scss';
import App from './app.vue';
import WidgetContainer from './widgets/widget-container.vue';
import { installPlugins } from './plugins';

createApp(App)
  .use(installPlugins)
  .component('widget-container', WidgetContainer)
  .mount('#app');
