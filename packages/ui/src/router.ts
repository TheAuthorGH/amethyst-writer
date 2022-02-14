import { RouteRecordRaw, createRouter, createMemoryHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'workspace',
    component: () => import('./workspace.vue')
  },
  {
    path: '/configuration-editor',
    name: 'configurationEditor',
    component: () => import('./configuration-editor.vue')
  }
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes
});
