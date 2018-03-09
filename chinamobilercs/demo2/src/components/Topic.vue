<template>
  <div class="topic">
      <p class="topic__title">{{current+1}}、{{topics[current]?topics[current].title:''}}</p>
      <p v-if="isMaster">(请选择你心中的答案)</p>
      <ul>
          <li v-for="(item,index) of topics[current].options" 
              :key="index" class="topic__listitem" 
              :class="{'top__listitem--selected':index===selectedIndexs[current]}"
              @click="setSelectedIndex(index)" >
                {{item}}
          </li>
      </ul>
  </div>
  
</template>
<script>
export default {
  props: {
    topics: {
      type: Array,
      defalut: []
    },
    current: {
      type: [String, Number],
      defalut: 0
    },
    isMaster: {
      type: Boolean,
      defalut: false
    },
    setSelectedIndex: {
      type: Function,
      defalut: () => console.log("请设置setSelectedIndex的函数")
    },
    selectedIndexs: {
      type: Object
    }
  }
};
</script>
<style lang="postcss" scoped>
.topic {
  background-color: #fff;
  border-bottom: 0.0075rem dashed #333;
}
.topic__title {
  padding-bottom: 0.6rem;
}
.topic__listitem {
  margin: 0.2rem;
  padding: 0.26rem 0.16rem;
  border-radius: 0.2rem;

  font-weight: bold;
  background-color: #f2f2f2;
}
.top__listitem--selected {
  background-color: #fad852;
}
</style>
