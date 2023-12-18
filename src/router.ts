import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductCard from './views/ProductCard.vue';

const routes: Array<{ path: string; component: any }> = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductCard },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
