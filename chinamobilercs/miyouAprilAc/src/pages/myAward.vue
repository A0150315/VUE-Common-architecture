<template>
  <div>
      <div>
        1g流量包
      </div>
  </div>
</template>
<script>
import start from "../../../../components/start.vue";
export default {
  computed:{
    data(){
      return this.$store.state.client.data
    }
  },
  components: {
    start
  },
  methods:{
  	//请求奖品信息
  	getAward(){
  		
  	}
  },
  mounted(){
    this.$store.dispatch('actionsStep',{text:'VUEX以及POSTCSS测试文本'})
  }
};
</script>
<style lang="postcss" scoped>
  div{
    font-size:.32rem;
  }
</style>

