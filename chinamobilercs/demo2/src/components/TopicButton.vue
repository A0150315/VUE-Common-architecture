<template>
  <div class="topbutton" @click="buttonFunC">{{buttonText}}</div>
</template>
<style lang="postcss" scoped>
.topbutton {
  width: 3.79rem;
  height: 0.86rem;

  line-height: 0.86rem;
  text-align: center;
  color: #fff;
  font-size: 0.42rem;

  position: fixed;
  left: 50%;
  bottom: 1.8rem;

  background-image: url("../assets/btn_datiyemian.png");
  background-size: 3.79rem 0.86rem;

  transform: translateX(-50%);
}
</style>
<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: ""
    },
    buttonFunC: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

