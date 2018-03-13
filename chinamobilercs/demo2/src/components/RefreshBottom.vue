<template>
  <div class="refreshbottom" @click="changeTopic">
      换一道题
      <img src="../assets/icon_chang.png" alt="icon_chang" class="refreshbottom__img">
    </div>
</template>
<style lang="postcss" scoped>
.refreshbottom {
  display: flex;
  align-items: center;

  padding: 0.1rem 0.2rem;

  position: fixed;
  right: 1rem;
  top: 0;

  font-size: 0.26rem;
  font-weight: bold;
  background-color: #fff;
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

