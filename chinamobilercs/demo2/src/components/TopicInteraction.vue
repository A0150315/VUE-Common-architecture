<template>
  <div class="topicinteraction">
        <div @click="goPreTopic">
            <p> -</p>
            <p>上一条</p>
        </div>
        <TopicButton :current=current :isFull=isFull />
        <div @click="goNextTopic">
            <p>- </p>
            <p>下一条</p>
        </div>
  </div>
</template>
<style lang="postcss" scoped>
.topicinteraction {
  margin: 0 0.24rem;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0.3rem;

  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  align-items: center;
}
</style>
<script>
import TopicButton from "./TopicButton.vue";

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
    }
  },
  components: {
    TopicButton
  }
};
</script>


