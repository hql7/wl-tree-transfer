import wlTreeTransfer from "./index.vue";

wlTreeTransfer.install = function(Vue) {
  Vue.component(wlTreeTransfer.name, wlTreeTransfer);
};

export default wlTreeTransfer;