// 该文件为 VUEX 以及 px2rem postcss插件演示
<template>
  <div>
      <start></start>
      <div>
        {{data.text}}
      </div>
  </div>
</template>
<script>
import start from "../components/start.vue";
export default {
  computed:{
    data(){
      return this.$store.state.client.data
    }
  },
  components: {
    start
  },
  mounted(){
    this.$store.dispatch('actionsStep',{text:'VUEX以及POSTCSS测试文本'})
  }
};
</script>
<style lang="postcss" scoped>
  div{
    font-size:rem(32px);
  }
</style>

