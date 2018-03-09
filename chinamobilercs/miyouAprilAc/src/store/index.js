// 该文件为vue-router的入口，请在此目录下进行全局动态数据管理
import Vue from "vue";

import Vuex from 'vuex';
Vue.use(Vuex);

import client from './modules/client.js'// 引入数据


export default new Vuex.Store({
	modules: {
		client
	}
})