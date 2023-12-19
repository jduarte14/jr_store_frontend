import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductCard from './views/ProductCard.vue';
import Catalog from './views/Catalog.vue';
import ErrorPage from './views/404.vue';

const routes: Array<{ path: string; component: any }> = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductCard },
  { path: '/catalog', component: Catalog },
  { path: '/:pathMatch(.*)*', component: ErrorPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
