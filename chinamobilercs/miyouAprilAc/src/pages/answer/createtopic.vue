<template>
    <div class="answertopic">
        <Bottom_bg/>
        <Topic :isMaster=true
               :topics=topics
               :current=current
               :selectedIndexs=selectedIndexs
               :setSelectedIndex=setSelectedIndex
               :isAdd="userTemplateId ? false : true"
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
    import CommonCenter from "../../utils/common";
    import Topic from "../../components/Topic.vue";
    import TopicInteraction from "../../components/TopicInteraction.vue";
    import Bottom_bg from "../../components/Bottom-bg.vue";
    import RefreshBottom from "../../components/RefreshBottom.vue";
    import {Indicator} from 'mint-ui'
    import ERROR_HTML from '../../utils/service/config'

    export default {
        data() {
            return {
                topics: [],
                allTopics: [],
                current: 0,
                selectedIndexs: {},
                topicsIndexs: [],
                userTemplateId: "",
                preAgain: false,
                randomNumberRecord: [], //防止换到重复的题目
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
                if (this.topicsIndexs[this.current] === randomNumber) return;
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
                    if (this.topicsIndexs[i] === num || this.randomNumberRecord[num]) {
                        num = this.randomNumber();
                        break;
                    }
                }
                this.$set(this.randomNumberRecord, num, num);
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
                if (!this.userTemplateId) {
                    Indicator.open();
                    const {code, data} = await Ajax.insertQuestion(answerList);
                    Indicator.close();
                    if (code === 0) {
                        this.userTemplateId = data.userTemplateId;
//                        alert('inert questions')
                    } else {
                        window.location.href = ERROR_HTML;
                        return ;
                    }
                } else {
//                    alert('had questions')
                    Indicator.close();
                    if (this.userTemplateId.userTemplateId)
                        this.userTemplateId = this.userTemplateId.userTemplateId
                }
                window.forwardSuccess = this.forwardSuccess;
                window.vm = this;
                //插入成功执行的操作
                var _parms = {
                    "title": "你真的懂我吗，做几道题就知道了",
                    "summary": "答对3题就送1G流量",
                    "url": "http://" + window.location.host + "/foolday/index.html#/index/answer?userTemplateId=" + this.userTemplateId,
                    "imageUrl": "http://117.136.240.58:8080/fastdfs/group1/M00/00/56/CgFYaFqxvX6ARJipAAAq3L9TyD4978.png",
                    "phone": "13802885145",
                    "authorName": "yuanlin"
                };
                if (window.local_method) {
                    // Call Android interface
                    Indicator.close();
                    window.local_method.passForwardDetail(JSON.stringify(_parms));
                } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.passForwardDetail) {
                    // Call iOS interface
//                    alert("IOS")
                    Indicator.close();
                    window.webkit.messageHandlers.passForwardDetail.postMessage(_parms);
                } else {
                    // No Android or iOS interface found
                    Indicator.close();
                    window.location.href = ERROR_HTML;
                    return ;
                }
            },
            /* 客户端点击确定后的回调接口函数 */
            forwardSuccess (res) {
//                alert(JSON.stringify(res))
                Indicator.close();
                /* 客户端iOS传的是字符串 */
                if (typeof(res) === String) {
                    res = JSON.parse(res)
                }
                var challengeUserMobile = res.forwardNum || res.groupId;
                var challengeUsername = res.forwardName || res.groupName;
                if (res.groupName && res.groupId) {
                    var type = 2;
                } else {
                    var type = 1;
                }
//                alert("xingmin--" + res.forwardNum)
                /* 将客户端的信息发送给后台后，跳转到个人定义题目列表页面 */
//                alert(window.vm.userTemplateId)
                Ajax.prankPush({
                    challengeUserMobile: challengeUserMobile,
                    challengeUsername: challengeUsername,
                    userTemplateId: window.vm.userTemplateId,
                    type: type
                }).then((res) => {
//                    alert(res.code);
                    if (res.code === 0) {
                        window.vm.$router.back();
                    } else {
                        window.location.href = ERROR_HTML;
                        return ;
                    }
                })
            },
            async getNewList() {
                CommonCenter.setTitle("制作题目");
                const {data} = await Ajax.getAllQuestion();
                Indicator.close();
                this.allTopics = data;
                for (let i = 0; i < 5; i++) {
                    const randomNumber = this.randomNumber();
                    this.topicsIndexs.push(randomNumber);
                    this.topics.push(data[randomNumber]);
                }
            },
            async olderList({query}) {
                CommonCenter.setTitle(sessionStorage.getItem('title'));
                this.userTemplateId = query;
                const {data} = await Ajax.getQuestionList({userTemplateId: query});
                Indicator.close();
                this.topics = data;
                this.selectedIndexs = Object(data.map(e => e.answerIndex));
            }
        }
        ,
        mounted()
        {
            Indicator.open();
            if (this.$route.query.userTemplateId) {
                this.olderList({
                    query: this.$route.query
                });
            } else {
                this.getNewList();
            }
        }
    }
    ;
</script>


