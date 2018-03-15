// 该文件为vue-router的入口，请在此页面进行全局路由管理
import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import prankIndex from '../pages/prank-index.vue';
import createtopic from '../pages/createtopic.vue';
import checkanswer from '../pages/checkanswer.vue';
import answer from '../pages/answer.vue';
import result from '../pages/event/result.vue';
import prankFriend from '../pages/prank-friend.vue';
import record from '../pages/record.vue';
import myAward from '../pages/myAward.vue';
import activityRule from '../pages/activityRule.vue';

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/index'
    }, {
        path: '/index',
        component: prankIndex
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
    }, {
        path: '/index/prankFriend',
        component: prankFriend
    }, {
        path: '/index/record',
        component: record
    }, {
        path: '/index/myAward',
        component: myAward
    }
    , {
        path: '/index/activityRule',
        component: activityRule
    }]
})
router.beforeEach(async (to, from, next) => { // 全局路由守卫
    next()
})

export default router;