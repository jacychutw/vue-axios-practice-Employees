import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import vuex from 'vuex'
import store from './store'


Vue.config.productionTip = false

new Vue({
  vuetify,
  vuex,
  store,
  render: h => h(App)
}).$mount('#app')
