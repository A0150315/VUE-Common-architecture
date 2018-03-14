<template>
  <div class="topicinteraction">
        <div @click="goPreTopic" class="topicinteraction__item" :class='{"topicinteraction__item--hidden":current===0}'>
            <img src="../assets/img/icon_above.png" alt="above" class="topicinteraction__buttons topicinteraction__buttons__above">
            <span>上一题</span>
        </div>
        <div @click="goNextTopic" class="topicinteraction__item" v-show="!(current+1===topicsLength)">
            <span>下一题</span>
            <img src="../assets/img/icon_next.png" alt="next" class="topicinteraction__buttons topicinteraction__buttons__next">
        </div>
        <TopicButton v-if="isFull && isMaster" :buttonFunC=buttonFunC :buttonText=buttonText />
  </div>
</template>
<style lang="postcss" scoped>
.topicinteraction {
  margin: 0 0.4rem;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 1rem;

  display: flex;
  justify-content: space-between;

  font-size: 0.32rem;
  font-weight: bolder;
}
.topicinteraction__buttons {
  width: 0.5rem;
  height: 0.44rem;
}
.topicinteraction__item {
  display: flex;
  align-items: center;
}
.topicinteraction__buttons__next {
  margin-left: 0.08rem;
}
.topicinteraction__buttons__above {
  margin-right: 0.08rem;
}
.topicinteraction__item--hidden {
  visibility: hidden;
}
</style>
<script>
import TopicButton from "../components/TopicButton.vue";
export default {
  props: {
    current: {
      type: [Number, String],
      default: -1
    },
    isFull: {
      type: Boolean,
      default: false
    },
    goNextTopic: {
      type: Function
    },
    goPreTopic: {
      type: Function
    },
    topicsLength: {
      type: [Number, String],
      default: 0
    },
    isMaster: {
      type: Boolean,
      default: true
    },
    buttonText: {
      type: String,
      default: ""
    },
    buttonFunC: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    TopicButton
  }
};
</script>


