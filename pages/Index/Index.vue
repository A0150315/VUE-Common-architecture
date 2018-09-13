<template>
  <div>
      <p>{{testString}}</p>
      <button @click="changeString">change</button>
      <button @click="showAlert">showAlert</button>
      <button @click="activeAutoToast('testing')">autoToast</button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class Index extends Vue {
  //data
  testString: string = "1";

  // store
  @Action("toast") activeToast: (text: string) => void;
  @Action("autoToast") activeAutoToast: (text: string) => void;
  @Action("closeToast") closeToastAction: () => void;
  @Action("alert") alert: (Obj: Object) => void;

  // methods
  changeString() {
    this.testString = "2";
  }
  showAlert() {
    this.alert({
      title: "标题",
      main: "详情",
      btn: [
        {
          name: "取消"
        },
        {
          name: "确定",
          callback: () => {
            console.log("确定");
          },
          highLight: true
        }
      ]
    });
  }

  async beforeMount(this: any) {
    // ajax
    this.$http.test();
  }
}
</script>
<style scoped></style>
