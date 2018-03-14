// 该文件为vue-router的入口，请在此页面进行全局路由管理
import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import start from '../pages/start.vue';
import createtopic from '../pages/createtopic.vue';
import checkanswer from '../pages/checkanswer.vue';
import answer from '../pages/answer.vue';
import result from '../pages/event/result.vue';

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/index/'
    }, {
        path: '/index/',
        component: start
    }, {
        path: '/index/createtopic/',
        component: createtopic
    }, {
        path: '/index/checkanswer/',
        component: checkanswer
    }, {
        path: '/index/answer/',
        component: answer
    }, {
        path: '/index/:event/result/',
        component: result
    }]
})
router.beforeEach(async (to, from, next) => { // 全局路由守卫
    next()
})

export default router;