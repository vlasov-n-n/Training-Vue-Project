import Vue from 'vue'
import './plugins/vuetify'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

Vue.config.devtools = process.env.NODE_ENV === 'development';

// After you create app
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;

// then had to add in ./store.js as well.
Vue.config.devtools = process.env.NODE_ENV === 'development';

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
