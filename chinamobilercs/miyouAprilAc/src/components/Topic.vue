<template>
  <div class="topic" v-if="topics[current]">
      <p class="topic__title">
        <span class="topic__title__count">
          {{current+1}}/{{topics.length}}
        </span>
        <span class="topic__title__text">
          {{topics[current]?topics[current].title:''}}
        </span>
      </p>
      <p v-if="isAnswering" class="topic__tips--blank"></p>
      <p v-else-if="isMaster" class="topic__tips">请选择你的指定答案</p>
      <ul class="topic__list" v-if="isMaster">
          <li v-for="(item,index) of topics[current].optionList" 
              :key="index" class="topic__listitem" 
              :class="{'top__listitem--selected':index===selectedIndexs[current]}"
              @click="isAdd?setSelectedIndex(index):''" >
                <span class="topic__listitem__index">
                  {{index | num2elph}}
                </span>
                <span class="topic__listitem__text">
                  {{item.content}}
                </span>
          </li>
      </ul>
      <ul class="topic__list topic__list--notMaster" v-else>
          <li v-for="(item,index) of topics[current].optionList" 
              :key="index" class="topic__listitem" 
              :class="[(index===selectedIndexs[current] && isMaster)
                          ?'top__listitem--selected'
                          :index===selectedIndexs[current]
                            ?selectedIndexs[current]===answerList[current]
                              ?'topic__listitem--correct'
                              :'topic__listitem--error'
                            :''
                      ,(index===answerList[current] && isShowAnswer)?'topic__listitem--correct':'']"
          >
                <span class="topic__listitem__index">
                  {{(index===selectedIndexs[current]?null:index) | num2elph}}
                </span>
                <span class="topic__listitem__text">
                  {{item.content}}
                </span>
          </li>
      </ul>
      <p v-if="false" class="topic__tips topic__tips--bottom">回答正确3道或者3道以上，算挑战成功</p>
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
    isAnswering: {
      type: Boolean,
      defalut: false
    },
    setSelectedIndex: {
      type: Function,
      defalut: () => console.log("请设置setSelectedIndex的函数")
    },
    selectedIndexs: {
      type: [Object,Array],
      defalut: {}
    },
    answerList: {
      type: Array,
      defalut: []
    },
      isAdd: {
          type: Boolean,
          defalut: true
      },
      isShowAnswer: {
          type: Boolean,
          defalut: false
      }
  },
  filters: {
    num2elph: value => {
      if (value === null) {
        return "";
      }
      return String.fromCharCode(String(value).charCodeAt() + 17);
    }
  }
};
</script>
<style lang="postcss" scoped>
    .topic{
        margin-bottom: 0.3rem;
    }
.topic__title {
  box-sizing: border-box;
  padding: 1.6rem 0.7rem 0 0.8rem;
  width: 7.5rem;
  min-height: 2.7rem;
  background-image: url("../assets/img/bg_topic.png");
  background-size: 7.5rem 2.7rem;

  position: relative;
  top:0.14rem;

  font-weight: 900;
  color: #fff;

  display: flex;
  justify-content: space-between;
}
.topic__title__count {
  width: 0.76rem;
  height: 0.48rem;
  background-image: url("../assets/img/bg_number.png");
  background-size: 0.76rem 0.48rem;

  font-size: 0.3rem;
  line-height: 0.48rem;
  text-align: center;
}
.topic__title__text {
  padding-left: 0.1rem;
  font-size: 0.4rem;
  // -webkit-text-stroke: 2px #000000;
  line-height: 1.5;

  color: #000;
  flex: 1;
}
.topic__tips {
  padding: 0.5rem 0 0.24rem;

  font-size: 0.24rem;
  color: #6b5000;

  text-align: center;
}
.topic__tips--blank {
  height: 0.66rem;
}
.topic__tips--bottom {
  padding-top: 0.3rem;
  font-weight: bolder;
}
.topic__list {
  box-sizing: border-box;
  background-image: url("../assets/img/bg_anwser.png");
  width: 7.5rem;
  height: 4.12rem;
  background-size: 7.5rem 4.12rem;
  display: flex;
    flex-direction: column;
    justify-content: center;
  padding: 0 0.68rem 0 0.56rem;
}
.topic__list--notMaster {
  margin-top: 0.66rem;
}
.topic__listitem {
  height: 0.75rem;
  margin-bottom: 0.24rem;

  font-weight: bolder;

  display: flex;
  justify-content: space-between;
}
.topic__listitem--correct {
  color: #00bffe;
  & .topic__listitem__index {
    background-image: url("../assets/img/icon_right.png");
  }
}
.topic__listitem--error {
  color: #b003f0;
  & .topic__listitem__index {
    background-image: url("../assets/img/icon_wrong.png");
  }
}
.topic__listitem__index {
  background-image: url("../assets/img/bg_abc.png");
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
