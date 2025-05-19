import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Dashboard from './views/Dashboard.vue';
import RevenueAnalysis from './views/RevenueAnalysis.vue';
import InventoryManagement from './views/InventoryManagement.vue';
import AddProduct from './views/AddProduct.vue';
import './style.css'
// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/revenue-analysis', component: RevenueAnalysis },
    { path: '/inventory', component: InventoryManagement },
    { path: '/add-product', component: AddProduct },
  ]
});

// Create and mount the app
const app = createApp(App);
app.use(router);
app.mount('#app');