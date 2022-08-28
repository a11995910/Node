import dataV from '@jiaminghi/data-view'
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.config.productionTip = false

Vue.use(dataV);
Vue.use(vueAxios,axios);
Vue.use(ViewUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
