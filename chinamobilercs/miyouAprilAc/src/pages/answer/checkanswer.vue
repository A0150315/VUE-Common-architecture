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
  height: calc(100vh - 0.14rem);
}
.answertopic__topiccount {
  font-size: 1rem;
  font-weight: bold;
}
</style>
<script>
import mokedata from "../../test/mockData.js";

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
    const data = JSON.parse(sessionStorage.getItem("answerList"));
    this.topics = data;

    this.selectedIndexs = data.map(e => e.userIndex);
    this.answerList = data.map(e => e.answerIndex);
  }
};
</script>


