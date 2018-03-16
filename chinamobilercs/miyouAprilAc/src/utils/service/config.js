const host = `192.168.185.250:20102`;
export default {
    moke: 'https://free-api.heweather.com/s6/weather/forecast?parameters', // 测试接口
    statisticsMessage: `http://${host}/fool/tfooldayactivity/statisticsMessage?token=TS`, //挑战信息接口
    myPrankList: `http://${host}/fool/usertemplate/my?token=TS`, //个人题库列表接口
    allQuestion: `http://${host}/fool/question/all?token=TS`, //全部题库接口
    addQuestion: `http://${host}/fool/usertemplate/add?token=TS`, //插入个人题库接口
    questionList: `http://${host}/fool/usertemplate/list?token=TS`, //用户模板问题查询
    publicQuestionList: `http://${host}/fool/question/randomqustnset?token=TS`, //获取大厅题目
    answer: `http://${host}/fool/useranswer/answerrandomqustnset?token=TS`, //回答大厅题目
    freindQuestionList: `http://${host}/fool/prank/queList?token=TS`, //好友题目列表
    freindChanllenge: `http://${host}/fool/prank/challenge?token=TS`, //好友答题
    freindQuestionList: `http://${host}/fool/tuserquestion/resultContrast?token=TS`, //好友答案
}