import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProductCard from './views/ProductCard.vue';
import Catalog from './views/Catalog.vue';
import ErrorPage from './views/404.vue';
import Login from './views/authentication/Login.vue';
import Dashboard from './views/Dashboard.vue';
import DashboardCatalog from './components/dashboard/productCatalog.vue';
import Create from './components/dashboard/CreateProduct.vue';
import Patch from './components/dashboard/PatchProduct.vue';
import CreateBanner from './components/dashboard/banners/Create.vue';
import BannersCatalog from './components/dashboard/banners/bannersCatalog.vue';
import PatchBanner from './components/dashboard/banners/Patch.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductCard },
  { path: '/catalog', component: Catalog },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/dashboard/catalog', component: DashboardCatalog, meta: { requiresAuth: true } },
  { path: '/dashboard/banners/', component: BannersCatalog, meta: { requiresAuth: true } },
  { path: '/dashboard/catalog/create', component: Create, meta: { requiresAuth: true } },
  { path: '/dashboard/catalog/edit/:id', component: Patch, meta: { requiresAuth: true } },
  { path: '/dashboard/banners/create', component: CreateBanner, meta: { requiresAuth: true } },
  { path: '/dashboard/banners/patch/:id', component: PatchBanner, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', component: ErrorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = sessionStorage.getItem('token');
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
