// 该文件为router-link、bem命名规范、saladcss-bem postcss插件演示
<template>
    <footer class="footer" @touchstart="pressdown" @touchend="pressup">
        <router-link :to="{path}" class="footer__button"  :class="[isPressing?'footer__button--hover':'']">{{text}}</router-link>
    </footer>
</template>
<script>
export default {
  data() {
    return {
      text: "请开始你们的表演",
      path: "/index/other",
      isPressing: false
    };
  },
  methods: {
    pressdown() {
      this.isPressing = true;
    },
    pressup() {
      this.isPressing = false;
    }
  }
};
</script>

<style scoped lang="postcss">
@b footer {
  display: flex;
  width: 100%;
  height: 19.2vw;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px -5px 49px rgba(158, 158, 158, 0.3);
  @e button {
    font-size: rem(34px);
    color: #ffffff;
    width: 92%;
    height: 11.201vw;
    line-height: 11.201vw;
    text-align: center;
    background: rgba(64, 188, 174, 1);
    background: linear-gradient(
      to right,
      rgba(64, 188, 174, 1) 0%,
      rgba(49, 170, 175, 1) 100%
    );
    border-radius: 6.401vw;
    @m hover {
      background: rgba(55, 160, 147, 1);
      background: linear-gradient(
        to right,
        rgba(55, 160, 147, 1) 0%,
        rgba(42, 144, 147, 1) 100%
      );
    }
  }
}
</style>