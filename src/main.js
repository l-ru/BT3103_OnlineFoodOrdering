/* jshint esversion: 6 */
import Vue from 'vue';
import App from './App.vue';
import Routes from './routes.js'; // Register routes

import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Register globally
import QuantityCounter from './components/QuantityCounter.vue';
Vue.component('qtyCounterBtn', QuantityCounter);

Vue.config.productionTip = false;

// Step 3 - Register Routes
const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history',
});

new Vue({
  render: h => h(App),
  router: myRouter,
}).$mount('#app');
