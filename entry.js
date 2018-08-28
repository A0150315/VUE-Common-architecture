import Vue from "vue";

import MetaInfo from 'vue-meta-info';
Vue.use(MetaInfo)

// import store from './store';
import router from './route'

const root = new Vue({
  template: `
      <div>
          <transition mode="out-in">
              <router-view></router-view>
          </transition>
      </div>`,
  router
//   store
})

document.addEventListener('DOMContentLoaded', function () {
  root.$mount('#box')
})