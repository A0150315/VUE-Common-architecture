<template>
    <span v-show="isShow" class="toast-block">
        <div class="toast-mask"/>
        <div class="toast-container">
            {{stateInfo.toastContext}}
        </div>
    </span>
</template>
<script lang="ts">
interface toastInfoInterface {
  toastContext: string;
  autoClose: Boolean;
}

import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Action } from "vuex-class";

@Component
export default class Toast extends Vue {
  // data
  isShow: Boolean = false;
  timer: number = -1;
  duration: number = 2000;

  // store
  @State("toastInfo") stateInfo: toastInfoInterface;
  @Action("closeToast") closeToastAction: () => void;

  // methods
  closeToast() {
    this.closeToastAction();
  }

  @Watch("stateInfo")
  toastToggle(
    newQuestion: toastInfoInterface,
    oldQuestion: toastInfoInterface
  ) {
    if (!newQuestion.toastContext && !newQuestion.autoClose) {
      clearTimeout(this.timer);
      this.isShow = false;
      return false;
    }
    if (newQuestion.autoClose) {
      clearTimeout(this.timer);
      this.isShow = true;
      this.timer = +setTimeout(() => {
        this.isShow = false;
      }, this.duration);
    } else {
      this.isShow = true;
    }
  }
}
</script>
<style>
.toast-block {
  display: inline-block;
  color: #fff;
  z-index: 100;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  width: 100%;
  height: 100%;
}
.toast-container {
  transform: translate(-50%, -50%);
  word-break: keep-all;
  word-wrap: break-word;
  background: rgba(0, 0, 0, 0.7);
  max-width: 53.3%;
  padding: 0.12rem 0.32rem 0.16rem;
  letter-spacing: 0;
  font-size: 0.28rem;
  position: fixed;
  top: 50%;
  left: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
  border-radius: 0.12rem;
  box-sizing: border-box;
}
</style>
