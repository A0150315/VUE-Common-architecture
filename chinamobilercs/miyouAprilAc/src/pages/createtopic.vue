<template>
  <div class="answertopic">
      <Bottom_bg />
      <Topic  :isMaster=true 
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
              buttonText="发送给好友"
              :buttonFunC=goNextPage
      />
      <RefreshBottom :changeTopic="changeTopic"/>
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
    title: "制作题目"
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
    changeTopic() {
      this.$set(this.topics, this.current, mokedata[1]); //刷新题目
      const tempObject = { ...this.selectedIndexs };
      delete tempObject[this.current];
      this.selectedIndexs = tempObject;
    },
    goNextPage(callback) {
      this.$router.replace(`${this.$route.fullPath}/result`);
    }
  },
  beforeMount() {
    this.topics = mokedata;
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>


