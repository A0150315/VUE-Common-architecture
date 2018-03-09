<template>
  <div class="answertopic">
      <TopicCount class="answertopic__topiccount" :sum=topics.length :current=current />
      <Topic  :isMaster=true 
              :topics=topics 
              :current=current 
              :selectedIndexs=selectedIndexs
              :setSelectedIndex=setSelectedIndex />
      已发送给
      <TopicInteraction 
              :current=current
              :isFull="topics.length===selectedIndexsLength"
              :goPreTopic=goPreTopic
              :goNextTopic=goNextTopic
      />
  </div>
</template>
<style lang="postcss" scoped>
.answertopic {
  margin: 0.24rem;

  font-size: 0.3rem;
}
.answertopic__topiccount {
  font-size: 1rem;
  font-weight: bold;
}
</style>
<script>
import mokedata from "../test/mockData.js";

import TopicCount from "../components/TopicCount.vue";
import Topic from "../components/Topic.vue";
import TopicInteraction from "../components/TopicInteraction.vue";
export default {
  data() {
    return {
      topics: [
        {
          title: "如果可以选择的话，我希望我的性别是（）",
          options: ["a、男生", "b、女生", "c、外星人"]
        }
      ],
      current: 0,
      selectedIndexs: {}
    };
  },
  components: {
    TopicCount,
    Topic,
    TopicInteraction
  },
  computed:{
    selectedIndexsLength(){
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
      if (this.current < this.topics.length-1) this.current++;
      console.log(this.topics.length,this.selectedIndexsLength);
    }
  },
  beforeMount() {
    this.topics = mokedata;
  }
};
</script>


