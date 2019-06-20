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
      apiKey: 'AIzaSyDobZ4FKKSXQrBWFsRJ5qS3SduyOXrCBQE',
      authDomain: 'onlinestore-1aq1.firebaseapp.com',
      databaseURL: 'https://onlinestore-1aq1.firebaseio.com',
      projectId: 'onlinestore-1aq1',
      storageBucket: 'onlinestore-1aq1.appspot.com',
      messagingSenderId: '69391411930',
      appId: '1:69391411930:web:a227752151f5eda9'
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
