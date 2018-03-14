<template>
  <div class="answertopic">
      <Bottom_bg />
      <Topic  :isMaster=false 
              :topics=topics 
              :current=current 
              :selectedIndexs=selectedIndexs
              :answerList=answerList
      />
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
  height:calc(100vh - .14rem);
}
.answertopic__topiccount {
  font-size: 1rem;
  font-weight: bold;
}
</style>
<script>
import mokedata from "../test/mockData.js";

import Topic from "../components/Topic.vue";
import TopicInteraction from "../components/TopicInteraction.vue";
import Bottom_bg from "../components/Bottom-bg.vue";
import RefreshBottom from "../components/RefreshBottom.vue";
export default {
  metaInfo: {
    title: "全民愚人战，整蛊好友领12G"
  },
  data() {
    return {
      topics: [],
      current: 0,
      selectedIndexs: {},
      answerList: {}
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
    }
  },
  beforeMount() {
    this.topics = mokedata;
    this.selectedIndexs = {
      // 选中题目
      "0": 2,
      "1": 1,
      "2": 0
    };
    this.answerList = {
      //正确答案
      "0": 1,
      "1": 1,
      "2": 1
    };
  }
};
</script>


