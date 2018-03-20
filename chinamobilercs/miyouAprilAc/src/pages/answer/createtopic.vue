<template>
    <div class="answertopic">
        <Bottom_bg/>
        <Topic :isMaster=true
               :topics=topics
               :current=current
               :selectedIndexs=selectedIndexs
               :setSelectedIndex=setSelectedIndex
        />
        <TopicInteraction
                :current=current
                :isFull="topics.length===selectedIndexsLength"
                :topicsLength=topics.length
                :goPreTopic=goPreTopic
                :goNextTopic=goNextTopic
                buttonText="发送给好友"
                :buttonFunC=insertQuestion
        />
        <RefreshBottom :changeTopic="changeTopic" v-if="!userTemplateId"/>
    </div>
</template>
<style lang="postcss" scoped>
    .answertopic {
        font-size: 0.3rem;
        height: 100vh;
    }

    .answertopic__topiccount {
        font-size: 1rem;
        font-weight: bold;
    }
</style>
<script>
    import mokedata from "../../test/mockData.js";
    import Ajax from "../../utils/service";

    import Topic from "../../components/Topic.vue";
    import TopicInteraction from "../../components/TopicInteraction.vue";
    import Bottom_bg from "../../components/Bottom-bg.vue";
    import RefreshBottom from "../../components/RefreshBottom.vue";
    export default {
        metaInfo: {
            title: "制作题目"
        },
        data() {
            return {
                topics: [],
                allTopics: [],
                current: 0,
                selectedIndexs: {},
                topicsIndexs: [],
                userTemplateId: ""
            };
        },
        components: {
            Topic,
            TopicInteraction,
            Bottom_bg,
            RefreshBottom
        },
        computed: {
            selectedIndexsLength() {
                return Object.keys(this.selectedIndexs).length;
            }
        },
        methods: {
            setSelectedIndex(index) {
                this.$set(this.selectedIndexs, this.current, index);
            },
            goPreTopic() {
                if (this.current > 0) this.current--;
            },
            goNextTopic() {
                if (this.current < this.topics.length - 1) this.current++;
            },
            changeTopic() {
                const randomNumber = this.randomNumber();
                this.$set(this.topics, this.current, this.allTopics[randomNumber]); //刷新题目
                this.$set(this.topicsIndexs, this.current, randomNumber); //刷新题目
                const tempObject = {...this.selectedIndexs};
                delete tempObject[this.current];
                this.selectedIndexs = tempObject;
            },
            randomNumber() {
                const length = this.allTopics.length - 1;
                let num = parseInt(Math.random() * (length + 1));
                for (let i = 0; i < length; i++) {
                    if (this.topicsIndexs[i] === num) {
                        num = this.randomNumber();
                        break;
                    }
                }
                return num;
            },
            async insertQuestion(callback) {
                const answerList = this.topics.map((e, i) => {
                    const answer = e.optionList[this.selectedIndexs[i]];
                    return {
                        questionId: answer.questionId,
                        answer: answer.questionOptionId
                    };
                });

                const {code, data} = await Ajax.insertQuestion(answerList);
                this.userTemplateId = data.userTemplateId;
                if (code === 0) {
                    window.forwardSuccess = this.forwardSuccess;
                    window.vm = this;
                    //插入成功执行的操作
                    var _parms = {
                        "title": "你真的懂我吗，做几道题就知道了",
                        "summary": "答对3题就送1G流量",
                        "url": "http://feixin.10086.cn/miyou/index.html?userTemplateId=" + data.userTemplateId,
                        "imageUrl": "https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/f9dcd100baa1cd11cc79bbd8b212c8fcc2ce2d7f.jpg",
                        "phone": "13802885145",
                        "authorName": "yuanlin"
                    };
                    if (window.local_method) {
                        alert("安卓")
                        // Call Android interface
                        window.local_method.passForwardDetail(JSON.stringify(_parms));
                    } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.passForwardDetail) {
                        // Call iOS interface
                        alert("IOS")
                        window.webkit.messageHandlers.passForwardDetail.postMessage(_parms);
                    } else {
                        // No Android or iOS interface found
                        alert("No native APIs found.");
                    }
                }
            },
            /* 客户端点击确定后的回调接口函数 */
            forwardSuccess (res) {
                var challengeUserMobile = res.forwardPhoto;
                var challengeUsername = res.forwardName;
                /* 将客户端的信息发送给后台后，跳转到个人定义题目列表页面 */
                Ajax.prankPush({
                    challengeUserMobile: challengeUserMobile,
                    challengeUsername: challengeUsername,
                    userTemplateId: vm.userTemplateId
                }).then((res) => {
                    if (res.code === 0) {
                        vm.$router.push('prankFriend')
                    }
                })
            },
            async getNewList() {
                const {data} = await Ajax.getAllQuestion();
                this.allTopics = data;
                for (let i = 0; i < 5; i++) {
                    const randomNumber = this.randomNumber();
                    this.topicsIndexs.push(randomNumber);
                    this.topics.push(data[randomNumber]);
                }
            },
            async olderList({query}) {
                this.userTemplateId = query;
                const {data} = await Ajax.getQuestionList({userTemplateId: query});
                this.topics = data;
                this.selectedIndexs = Object(data.map(e => e.answerIndex));
            }
        },
        mounted()
        {
            if (this.$route.query.userTemplateId) {
                this.olderList({
                    query: this.$route.query
                });
            } else {
                this.getNewList();
            }
        },
        beforeRouteLeave(to, from, next)
        {
            next();
        }
    }
    ;
</script>


