<template>
  <div class="topbutton" :class="{'topbutton--unactive':!isFull}">提交</div>
</template>
<style lang="postcss" scoped>
.topbutton {
  width: 50vw;
  height: 7vh;
  border-radius: 0.1rem;

  line-height: 7vh;
  text-align: center;
  background-color: #6b6b6b;
  color: #fff;
}
.topbutton--unactive {
  opacity: 0.4 !important;
}
</style>
<script>
export default {
  props: {
    current: {
      type: [Number, String],
      default: -1
    },
    isFull: {
      type: Boolean,
      default: false
    }
  }
};
</script>

