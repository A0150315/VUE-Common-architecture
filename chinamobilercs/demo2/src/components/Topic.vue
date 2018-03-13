<template>
  <div class="topic">
      <p class="topic__title">
        <span class="topic__title__count">
          {{current+1}}/{{topics.length}}
        </span>
        <span class="topic__title__text">
          {{topics[current]?topics[current].title:''}}
        </span>
      </p>
      <p v-if="isMaster" class="topic__tips">请选择你的指定答案</p>
      <ul class="topic__list">
          <li v-for="(item,index) of topics[current].options" 
              :key="index" class="topic__listitem" 
              :class="{'top__listitem--selected':index===selectedIndexs[current]}"
              @click="setSelectedIndex(index)" >
                <span class="topic__listitem__index">
                  {{index | num2elph}}
                </span>
                <span class="topic__listitem__text">
                  {{item}}
                </span>
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
  },
  filters: {
    num2elph(value) {
      return String.fromCharCode(String(value).charCodeAt() + 17);
    }
  }
};
</script>
<style lang="postcss" scoped>
.topic__title {
  box-sizing: border-box;
  padding: 1.6rem 0.7rem 0 0.8rem;
  margin: 0.14rem 0 0 0;
  width: 7.5rem;
  height: 2.7rem;
  background-image: url("../assets/bg_topic.png");
  background-size: 7.5rem 2.7rem;

  font-weight: 900;
  color: #fff;

  display: flex;
  justify-content: space-between;
}
.topic__title__count {
  width: 0.76rem;
  height: 0.48rem;
  background-image: url("../assets/bg_number.png");
  background-size: 0.76rem 0.48rem;

  font-size: 0.3rem;
  line-height: 0.48rem;
  text-align: center;
}
.topic__title__text {
  padding-left: 0.1rem;
  font-size: 0.4rem;
  -webkit-text-stroke: 2px #000000;
  line-height: 1.5;

  flex: 1;
}
.topic__tips {
  padding: 0.5rem 0 0.24rem;

  font-size: 0.24rem;
  color: #6b5000;

  text-align: center;
}
.topic__list {
  box-sizing: border-box;
  background-image: url("../assets/bg_anwser.png");
  width: 7.5rem;
  height: 4.12rem;
  background-size: 7.5rem 4.12rem;

  padding: 0.6rem 0.68rem 0 0.56rem;
}
.topic__listitem {
  height: 0.75rem;
  margin-bottom: 0.24rem;

  font-weight: bolder;

  display: flex;
  justify-content: space-between;
}
.topic__listitem__index {
  background-image: url("../assets/bg_abc.png");
  width: 0.74rem;
  height: 0.75rem;
  background-size: 0.74rem 0.75rem;

  display: block;

  line-height: 0.75rem;
  text-align: center;
  color: #fff;
  font-size: 0.46rem;
}
.topic__listitem__text {
  flex: 1;
  padding: 0.22rem 0 0 0.12rem;

  font-size: 0.34rem;
}
.top__listitem--selected {
  color: #f35416;
}
</style>
