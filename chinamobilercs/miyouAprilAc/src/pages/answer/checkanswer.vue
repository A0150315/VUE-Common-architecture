<template>
    <div class="answertopic">
        <Bottom_bg/>
        <Topic :isMaster=false
               :topics=topics
               :current=current
               :selectedIndexs=selectedIndexs
               :answerList=answerList
        />
        <p v-if="answer.length" class="answertopic__right"><span>【答案解析】 </span>{{answer[current]}}</p>
        <TopicInteraction
                :isMaster=false
                :current=current
                :topicsLength=topics.length
                :goPreTopic=goPreTopic
                :goNextTopic=goNextTopic
        />
    </div>
</template>
<style lang="postcss" scoped>
    .answertopic {
        font-size: 0.3rem;
        height: calc(100vh - 0.14rem);
    }
    .answertopic__right{
        padding-left: 0.34rem;
        font-size: 0.32rem;
        color: #000;
    }
    .answertopic__right span{
         font-weight: bolder;
     }
    .answertopic__topiccount {
        font-size: 1rem;
        font-weight: bold;
    }
</style>
<script>
    import Ajax from "../../utils/service";

    import Topic from "../../components/Topic.vue";
    import TopicInteraction from "../../components/TopicInteraction.vue";
    import Bottom_bg from "../../components/Bottom-bg.vue";
    import RefreshBottom from "../../components/RefreshBottom.vue";
    export default {
        metaInfo: {
            title: "全民愚人战，整蛊好友领12G"
        },
        data() {
            return {
                topics: [],
                current: 0,
                selectedIndexs: {},
                answerList: [],
                answer: []
            };
        },
        components: {
            Topic,
            TopicInteraction,
            Bottom_bg,
            RefreshBottom
        },
        methods: {
            goPreTopic() {
                if (this.current > 0) this.current--;
            },
            goNextTopic() {
                if (this.current < this.topics.length - 1) this.current++;
                console.log(this.topics.length, this.selectedIndexsLength);
            },
            /* 查看答案存在两个入口，一个是大厅，一个是好友分享，故而拿到参数isxiaomi来进行判断 */
            getQuestionAnswer() {
                var userTemplateId = 0;
                var searchURL = window.location.hash;
                searchURL = window.location.hash.substring(1, searchURL.length);
                searchURL ? userTemplateId = searchURL.split("&")[0].split("=")[1] : ''
                console.log(userTemplateId)
                Ajax.freindQuestionAnswer({userTemplateId}).then((res) => {
                    this.topics = res.list
                    this.selectedIndexs = res.list.map(e => e.userIndex);
                    this.answerList = res.list.map(e => e.answerIndex);
                })
            }
        },
        beforeMount() {
            const isXiaomi = window.location.href.indexOf('isXiaomi=true');
            var QuestionList = this.$route.query.QuestionList || '';
//            alert('QuestionList:'+QuestionList)
            /* 判断是否是自己点击进来查看答案 */
            if (QuestionList) {
                this.topics = QuestionList
                this.selectedIndexs = QuestionList.map(e => e.answerIndex);
                this.answerList = QuestionList.map(e => e.answerIndex);
                return ;
            }
            if (isXiaomi < 0) {
                this.getQuestionAnswer();
            } else {

                const data = JSON.parse(sessionStorage.getItem("answerList"));
                this.topics = data;

                this.answer = data.map(e => e.explanation);
                this.selectedIndexs = data.map(e => e.userIndex);
                this.answerList = data.map(e => e.answerIndex);
            }
        }
    };
</script>


