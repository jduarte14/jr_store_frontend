import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductCard from './views/ProductCard.vue';
import Catalog from './views/Catalog.vue';
import ErrorPage from './views/404.vue';
import Login from './views/authentication/Login.vue';
import Dashboard from './views/Dashboard.vue';
import DasboardCatalog from './components/dashboard/productCatalog.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductCard },
  { path: '/catalog', component: Catalog },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  {path:'/dashboard/catalog', component: DasboardCatalog, meta: { requiresAuth: true }},
  { path: '/:pathMatch(.*)*', component: ErrorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next(); 
  }
});



export default router;
