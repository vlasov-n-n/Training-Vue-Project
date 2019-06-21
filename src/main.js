import Vue from 'vue'
import * as firebase from 'firebase/app';

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store';
import { productConst, userConst } from './store/constants';
import BuyDialog from './components/Common/BuyDialog';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'development';
// After you create app
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
// then had to add in ./store.js as well.
Vue.config.devtools = process.env.NODE_ENV === 'development';

Vue.component('app-buy-dialog', BuyDialog);

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      //Set your firebase config
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Get auth user
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch(userConst.autoLoginUser, user)
      }
    });
    // Get all products
    this.$store.dispatch(productConst.fetchProducts);
  }
}).$mount('#app');
