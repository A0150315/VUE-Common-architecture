// es7 async await 发送ajax请求演示页
<template>
  <div>
      已发送ajax请求，打开控制台查看返回信息
  </div>
</template>
<script>
import ajax from "../utils/service";// 引入封装的axios
export default {
  methods: {
    async mokeAjax() {// ES7 调用 service 发送请求
      const mokeData = await ajax.mokeData({
        text: "axios测试数据"
      });
      console.log('请求返回的数据：',mokeData);
    }
  },
  mounted() {
    this.mokeAjax() // 调用方法
  }
};
</script>

