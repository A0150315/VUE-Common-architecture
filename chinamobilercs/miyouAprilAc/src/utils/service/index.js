import config from './config';// 引入地址配置
import axios from "axios";// 引入axios库

// 请求拦截器
axios.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});
//响应拦截器
axios.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});

export default {
    mokeData({text}) {// 模拟请求
        console.log('请求的参数：',text);
        console.log('请求的地址：',config.moke);
        console.log('请求的方式：','GET');
        return axios.get(config.moke,{
            params: {
                text
            }
        })
    },
    //获取挑战信息的接口请求
    getStatisticsMessage() {
        return axios.get(config.statisticsMessage,{})
    },
    //获取挑战信息的接口请求
    getMyPrankList() {
        return axios.get(config.myPrankList,{})
    }
    // 封装更多请求
}