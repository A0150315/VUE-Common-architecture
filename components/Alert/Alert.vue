<template>
    <span v-show="stateInfo.title" class="alert-block">
        <div class="alert-mask" @click="close"/>
        <div class="alert-container">
            <p class="alert-title">{{stateInfo.title}}</p>
            <p class="alert-main">{{stateInfo.main}}</p>
            <ul class="alert-btns">
                <li 
                    class="alert-btn" 
                    v-for="(item,index) in stateInfo.btn" 
                    :key="index"
                    @click="item.callback?item.callback():close()"
                    :class="{'alert-btn_highLight':item.highLight}">
                    {{item.name}}
                </li>
            </ul>
        </div>
    </span>
</template>
<script lang="ts">
interface alertInfoInterface {
  title: string;
  main: string;
  btn: Array<{
    name: string;
    callback: Function;
    highLight?: Boolean;
  }>;
}

import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Action } from "vuex-class";

@Component
export default class Alert extends Vue {
  // store
  @State("alertInfo") stateInfo: alertInfoInterface;
  @Action("clearAlert") clearAlertAction: () => void;

  // methods
  close() {
    this.clearAlertAction();
  }
}
</script>
<style>
.alert-block {
  display: inline-block;
  color: #2a2a2a;
  letter-spacing: 0;
}
.alert-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.alert-container {
  transform: translate(-50%, -50%);
  word-wrap: break-word;
  background: rgba(0, 0, 0, 0.7);
  width: 5.4rem;
  padding-top: 0.42rem;
  letter-spacing: 0;
  font-size: 0.28rem;
  position: fixed;
  top: 50%;
  left: 50%;
  background: #ffffff;
  border-radius: 0.14rem;
  box-sizing: border-box;
  overflow: hidden;
}
.alert-title {
  text-align: center;
  font-size: 0.36rem;
  color: #2a2a2a;
  text-align: center;
  line-height: 1.167;
  padding-bottom: 0.18rem;
}
.alert-main {
  font-size: 0.3rem;
  color: #a1a1a1;
  line-height: 1.4;
  padding: 0 0.3rem 0.3rem;

  font-weight: lighter;
}
.alert-btns {
  display: flex;
  border-top: 0.01rem solid #ddd;
  height: 1rem;
  text-align: center;
  justify-content: center;
  align-items: center;

  font-size: 0.36rem;
  color: #2a2a2a;
  line-height: 1.1111;

  user-select: none;
}
.alert-btn {
  flex: 1;
  height: 100%;
  line-height: 1rem;
}
.alert-btn:not(:last-of-type) {
  border-right: 0.01rem solid #ddd;
}
.alert-btn_highLight {
  color: #0a56c7;
}
</style>
