<template>
  <div>
      <TopicCount :sum=topics.length :current=current />
      <Topic :isMaster=true :topics=topics :current=current />
  </div>
</template>
<style lang="postcss" scoped>

</style>
<script>
import TopicCount from "../components/TopicCount.vue";
import Topic from "../components/Topic.vue";
export default {
  data() {
    return {
      topics: [
        {
          title: "如果可以选择的话，我希望我的性别是（）",
          options: ["a、男生", "b、女生", "c、外星人"]
        }
      ],
      current: 0
    };
  },
  components: {
    TopicCount,
    Topic
  }
};
</script>


