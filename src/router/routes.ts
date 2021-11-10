import { RouteRecordRaw } from 'vue-router';
import autoRoutes from 'vue-auto-routing';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: autoRoutes,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/Error404.vue'),
  },
];

export default routes;
