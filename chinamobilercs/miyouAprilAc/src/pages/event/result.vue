<template>
  <div class="result">
    <div>
      <img src="../../assets/img/pic_succeed.png" alt="pic_succeed.png" class="result__topicon" v-if="isCorrect">
      <img src="../../assets/img/pic_fail.png" alt="pic_fail.png" class="result__topicon" v-else>
    </div>
    <p>{{isCorrect?'回答正确3道题，挑战成功':'只回答正确2道题'}}</p>
    <p>{{isCorrect?'还是你最懂他':'你被整蛊了哦'}}</p>
    <div class="result__buttons">
      <span class="result__buttons__blue" v-if="isCorrect">
          领取1G流量
      </span>
      <router-link :to="isXiaomi?'/index/answer':'/index/createtopic'" tag="span" class="result__buttons__orange">
          {{isXiaomi?'继续挑战':'我也要整蛊TA'}}
      </router-link>
    </div>
    <router-link class="result__checkanswer"  tag="span" to="/index/checkanswer">
      查看{{isXiaomi?'小密':'TA'}}的指定答案
    </router-link>
  </div>
</template>
<style lang="postcss" scoped>
.result {
  width: 6.7rem;
  height: 4rem;
  border: 0.03rem solid #000;
  border-radius: 0.34rem;
  margin: 2.78rem auto 0;

  background-color: #fff;

  text-align: center;
  font-size: 0.39rem;
  font-weight: bolder;
}
.result__topicon {
  width: 2.28rem;
  height: 1.6rem;
  padding: 0.2rem 0 0.36rem;
}
.result__buttons {
  margin-top: 0.5rem;

  color: #fff;
  font-size: 0.34rem;
  font-weight: bolder;
  & span {
    width: 2.86rem;
    height: 0.73rem;

    background-size: 2.86rem 0.73rem;

    display: inline-block;
    line-height: 0.73rem;
  }
}
.result__buttons__blue {
  background-image: url("../../assets/img/btn_挑战结果2.png");
}
.result__buttons__orange {
  background-image: url("../../assets/img/btn_挑战结果1.png");
}
.result__checkanswer {
  position: relative;
  top: 0.42rem;

  font-size: 0.32rem;
  font-weight: bolder;
  border-bottom: 1px solid;
}
</style>
<script>
export default {
  props: {
    isCorrect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isXiaomi: false
    };
  }
};
</script>

