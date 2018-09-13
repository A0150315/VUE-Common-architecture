import Vue from "vue";

import MetaInfo from "vue-meta-info";
Vue.use(MetaInfo);

// 注入灵魂 组件中通过this.$http[name]()调用
import http from "./middleware/proxy";
new http(Vue.prototype);

import store from "./store";
import router from "./route";

import "./style/normalize.css";
import "./style/global.css";

import Toast from "./components/Toast/Toast.vue";
import Alert from "./components/Alert/Alert.vue";

import filterConfigs from "./middleware/filters";
filterConfigs.forEach(e => {
  Vue.filter(e.filterName, e.func);
});

const root = new Vue({
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  template: `
      <div style="height:100%">
        <span class="loading-bar" :class="[loadding?'loading-bar_loading':'loading-bar_loaded']" />
        <transition :name="transitionName" mode="out-in">
            <router-view></router-view>
        </transition>
        <Toast/>
        <Alert/>
      </div>`,
  router,
  store,
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  },
  components: {
    Toast,
    Alert
  },
  computed: {
    loadding() {
      return store.state.loading;
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  root.$mount("#box");
});
