<template>
  <div class="answertopic">
      <Bottom_bg />
      <Topic  :isMaster=true
              :isAnswering=true 
              :topics=topics 
              :current=current 
              :selectedIndexs=selectedIndexs
              :setSelectedIndex=setSelectedIndex />
      <TopicInteraction 
              :current=current
              :isFull="topics.length===selectedIndexsLength"
              :topicsLength=topics.length
              :goPreTopic=goPreTopic
              :goNextTopic=goNextTopic
              buttonText="提交"
              :buttonFunC=goNextPage
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
      selectedIndexs: {}
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
    goNextPage() {
      this.$router.replace(`${this.$route.fullPath}/result`);
    }
  },
  beforeMount() {
    this.topics = mokedata;
  }
};
</script>