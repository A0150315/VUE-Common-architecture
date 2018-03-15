<template>
  <div class="refreshbottom" @click="changeTopic">
      换一道题
      <img src="../assets/img/icon_chang.png" alt="icon_chang" class="refreshbottom__img">
    </div>
</template>
<style lang="postcss" scoped>
.refreshbottom {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.38rem;
  height: 0.49rem;
  box-sizing: border-box;
  padding: 0.1rem 0.2rem;

  position: fixed;
  right: 0.4rem;
  top: 0;

  font-size: 0.26rem;
  font-weight: bold;
  background-image: url("../assets/img/bg_chang.png");
  background-size: 2.38rem 0.49rem;
}
.refreshbottom__img {
  width: 0.29rem;
  height: 0.29rem;
  margin-left: 0.12rem;
}
</style>
<script>
export default {
  props: {
    changeTopic: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

