<template>
    <div class="answertopic" v-cloak="true" v-show="showStatus">
        <Bottom_bg/>
        <Topic :isMaster=true
               :isAnswering=true
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
                buttonText="提交"
                :buttonFunC=userTemplateId?goNextPage1:goNextPage
        />
    </div>
</template>
<style lang="postcss" scoped>
    .answertopic {
        font-size: 0.3rem;
        height: calc(100vh - 0.14rem);
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
            title: "全民愚人战，整蛊好友领12G"
        },
        data() {
            return {
                topics: [],
                current: 0,
                selectedIndexs: {},
                userTemplateId: 0,
                commitStatus: true, //用做多提交按钮的多次点击进行限制
                showStatus: false,  //用做数据完全显示的状态
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
                console.log(this.topics.length, this.selectedIndexsLength);
            },
            async goNextPage() {
                const answerList = this.topics.map((e, i) => {
                    const answer = e.optionList[this.selectedIndexs[i]];
                    return {
                        questionId: answer.questionId,
                        answer: answer.questionOptionId
                    };
                });
                const {code, data} = await Ajax.answer(answerList);
                if (code === 0) {
                    //   //插入成功执行的操作
                    this.$router.replace({
                        path: `${this.$route.fullPath}/result`,
                        query: {
                            isPass: data.isPass,
                            rightNum: data.rightNum,
                            isXiaomi: true,
                            userTemplateId: 0,
                            prankId: data.prankId
                        }
                    });
                    sessionStorage.setItem("answerList", JSON.stringify(data.questionList));
                }
            },
            /* 好友分享进来的接口处理调用 */
            async goNextPage1() {
                if (this.commitStatus) {
                    this.commitStatus = false;
                    const answerList = this.topics.map((e, i) => {
                        const answer = e.optionList[this.selectedIndexs[i]];
                        return answer.questionId + ':' + answer.questionOptionId;
                    });
                    const {prankId, isSuccess, rightCount} = await Ajax.freindChanllenge({
                        'userTemplateId': this.userTemplateId,
                        'isPass': answerList.join(',')
                    });
                    //   //插入成功执行的操作
                    var userTemplateId = this.userTemplateId
                    this.$router.push({
                        path: ':event/result',
                        query: {
                            isPass: isSuccess === '1'? true:false,
                            rightNum: rightCount,
                            isXiaomi: false,
                            userTemplateId: userTemplateId,
                            prankId: prankId
                        }
                    });
                }
            },
            async getTopic() {
                /* 查看答案存在两个入口，一个是大厅，一个是好友分享，故而拿到地址参数userTemplateId来进行判断 */
                var searchURL = window.location.hash;
                searchURL = window.location.hash.substring(1, searchURL.length);
                searchURL ? this.userTemplateId = searchURL.split("&")[0].split("=")[1] : ''

                if (this.userTemplateId) {
                    const {code, QuestionList, isSuccess, rightCount, prankId} = await Ajax.freindQuestionList(this.userTemplateId)
                    this.showStatus = true;
                    if (code === '1') {
                        //   //插入成功执行的操作
                        var userTemplateId = this.userTemplateId
                        this.$router.push({
                            path: `:event/result`,
                            query: {
                                isPass: !isSuccess,
                                rightNum: rightCount,
                                isXiaomi: false,
                                prankId: prankId,
                                userTemplateId: userTemplateId
                            }
                        });
                        return;
                    }
                    this.topics = QuestionList;
                } else {
                    const {data, code} = await Ajax.getPublicQuestionList();
                    /* 满三次后跳转到整蛊大厅 */
                    if (code === 303) {
                        this.$router.replace('prankHall');
                        return ;
                    }
                    this.showStatus = true;
                    this.topics = data;
                }
            }
        },
        beforeMount() {
            this.getTopic();
        },
    };
</script>