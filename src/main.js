import "core-js/modules/es.promise";
import "core-js/modules/es.array.iterator";
import Vue from 'vue'
import router from '@/router/index'
import App from '@/pages/app'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}