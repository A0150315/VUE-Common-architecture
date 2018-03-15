// 程序的入口文件
import Vue from "vue";

import store from './src/store';// 引入vuex的入口
import router from './src/route';// 引入vue-router的入口

import './src/css/global.css';
import './src/assets/font/iconfont.css'

import MetaInfo from 'vue-meta-info';// 动态修改meta信息，详情谷歌或百度
Vue.use(MetaInfo)

const root = new Vue({
    data() {
        return {
            transitionName: 'slide-left',
        }
    },
    template: `
        <div style="height: 100%;">
            <transition :name="transitionName" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>`,
    router,
    store,
    watch: {
        '$route' (to, from) {// 路由切换动画动态修改
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
})
document.addEventListener('DOMContentLoaded', () => {
    root.$mount('#box')
})