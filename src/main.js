import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

// import wl from "wl-tree-transfer";
// import "wl-tree-transfer/lib/wl-tree-transfer.css"
// Vue.use(wl);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')