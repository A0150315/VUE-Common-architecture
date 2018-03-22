const host = `192.168.185.250:20102`;
export default {
    moke: 'https://free-api.heweather.com/s6/weather/forecast?parameters', // 测试接口
    statisticsMessage: `/fool/tfooldayactivity/statisticsMessage`, //挑战信息接口
    myPrankList: `/fool/usertemplate/my`, //个人题库列表接口
    allQuestion: `/fool/question/all`, //全部题库接口
    addQuestion: `/fool/usertemplate/add`, //插入个人题库接口
    questionList: `/fool/usertemplate/list`, //用户模板问题查询
    publicQuestionList: `/fool/question/randomqustnset`, //获取大厅题目
    answer: `/fool/useranswer/answerrandomqustnset`, //回答大厅题目
    freindQuestionList: `/fool/prank/queList`, //好友题目列表
    freindChanllenge: `/fool/prank/challenge`, //好友答题
    freindQuestionAnswer: `/fool/tuserquestion/resultContrast`, //好友答案
    getCardList: `/fool/prize/cards`,//请求卡券列表
    getRecordList: `/fool/prank/queryListByPhone`,//请求整蛊记录列表
    getCardStatus: `/fool/prize/draw`,//领取卡卷接口
    prankPush: `/fool/prank/push`,//好友的回调接口
    indexToken: `/fool/enter/index`,//首页的token验证
    answerToken: `/fool/enter/answer/index`,//答题的token验证
}