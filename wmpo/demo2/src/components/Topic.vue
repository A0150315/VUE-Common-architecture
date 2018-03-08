<template>
  <div>
      <p>{{current+1}}、{{topics[current]?topics[current].title:''}}</p>
      <p>{{isMaster?'(请选择你心中的答案)':''}}</p>
      <ul>
          <li v-for="(item,index) of topics[current].options" :key="index">
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
    }
  },
  mounted() {
    console.log(this.topics[this.current]);
  }
};
</script>
