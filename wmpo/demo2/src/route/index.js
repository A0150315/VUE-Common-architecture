// 该文件为vue-router的入口，请在此页面进行全局路由管理
import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import start from '../pages/start.vue';
import answertopic from '../pages/answertopic.vue';

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect:'/index'
    },{
        path: '/index',
        component: start
    },{
        path: '/index/answertopic',
        component: answertopic
    }]
})
router.beforeEach(async (to, from, next) => {// 全局路由守卫
    next()
})

export default router;