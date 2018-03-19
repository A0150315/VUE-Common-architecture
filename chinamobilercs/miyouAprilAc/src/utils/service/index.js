import config from './config'; // 引入地址配置
import axios from "axios"; // 引入axios库

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
    mokeData({
        text
    }) { // 模拟请求
        console.log('请求的参数：', text);
        console.log('请求的地址：', config.moke);
        console.log('请求的方式：', 'GET');
        return axios.get(config.moke, {
            params: {
                text
            }
        })
    },
    //获取挑战信息的接口请求
    getStatisticsMessage() {
        return axios.get(config.statisticsMessage, {})
    },
    //获取挑战信息的接口请求
    getMyPrankList() {
        return axios.get(config.myPrankList, {})
    },
    //获取出题库
    getAllQuestion() {
        return axios.get(config.allQuestion)
    },
    //插入题目
    insertQuestion(_Array) {
        return axios.post(config.addQuestion, _Array)
    },
    //插入题目
    getQuestionList({
        userTemplateId
    }) {
        return axios.get(config.questionList, {
            params: userTemplateId

        })
    },
    //获取大厅题目
    getPublicQuestionList() {
        return axios.get(config.publicQuestionList)
    },
    //回答大厅题目
    answer(_Array) {
        console.log(_Array);

        return axios.post(config.answer, _Array)
    },
    //好友题目列表
    freindQuestionList({
        userTemplateId
    }) {
        return axios.get(config.freindQuestionList, {
            params: userTemplateId
        })
    },
    //好友答题
    freindChanllenge({
        userTemplateId,
        isPass
    }) {
        return axios.post(config.freindChanllenge, {
            userTemplateId,
            isPass
        })
    },
    //好友答案
    freindQuestionList({
        userTemplateId
    }) {
        return axios.get(config.freindQuestionList, {
            params: userTemplateId
        })
    },
    //挑战记录查询
    getRecordList({text}) {
        return axios.get(config.getRecordList,{
            params:text
        })
    },
    //卡券信息查询
    getCardList({text}) {
        return axios.get(config.getCardList,{
            params:text
        })
    }
    // 封装更多请求
}