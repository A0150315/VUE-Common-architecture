<template>
  <div id="main" :style="{height:setHeight+'px'}" ref='main'>
  		<header class="clearfix">
  		  <div :class="{selected:isSelect == 1}" @click="changeItem(1)">发起的整蛊</div>
  		  <div :class="{selected:isSelect == 0}" @click="changeItem(0)">识破的整蛊</div>
  		</header>
      <div id="mainContent">
         <section v-for='(item,index) in dataList' v-if='showContent'>
         	 <span>{{item.name}}</span>
         	 <img class="right" src='../assets/img/trickFail.png' v-if="item.msg == '整蛊失败'" />
         	 <img class="right" src='../assets/img/trickSuccess.png' v-if="item.msg == '整蛊成功'" />
         	 <img class="right" src='../assets/img/waitTrick.png' v-if="item.msg == '待整蛊'" style="width: .92rem;"/>
         	 <img class="right" src='../assets/img/breakFail.png' v-if="item.msg == '识破失败'" />
         	 <img class="right" src='../assets/img/breakSuccess.png' v-if="item.msg == '识破成功'" />
         </section>
         <div v-if='!showContent' id='promptMsg'>
         	 {{promptMsg}}
         </div>
      </div>
      <footer>
      	<div id="footerMsg">温馨提醒</div>
      	<div id="footerContent">每成功整蛊一个好友可获得1G奖励，活动期间最高获得5G奖励</div>
      </footer>
      <prank-alert v-if="showAlert"
                :title="btnTitle"
                :textContent="textContent"
                :btnContent="btnContent"
                @hasClick="goToNext()"
        ></prank-alert>
  </div>
</template>
<script>
import prankAlert from '../../../../components/prank-alert.vue'
import ajax from "../utils/service";// 引入封装的axios
export default {
	data(){
		return{
			showAlert: false,
			showContent: true,
			btnTitle: 'test',
      textContent: '请检查网络后重试',
      btnContent: 'goToNext',
			isSelect: 1,
			promptMsg: '您还没有整蛊过好友呢',
			setHeight: '100'
		}
	},
  computed:{
    dataList(){
      return this.$store.state.client.data
    }
  },
  methods:{
  	//改变标签栏的事件
  	changeItem(index){
  		if(index == 0){
  			this.isSelect = 0;
  			this.promptMsg = '您还没有挑战过整蛊呢';
  		}
  		else{
  			this.isSelect = 1;
  			this.promptMsg = '您还没有整蛊过好友呢';
  		}
  	},
  	//请求记录列表
  	getRecordList(){
  		
  	},
  	async mokeAjax() {// ES7 调用 service 发送请求
      const mokeData = await ajax.mokeData({
        text: "axios测试数据"
      });
      console.log('请求返回的数据：',mokeData);
    },
  	goToNext(){
			this.btnTitle = '修改';	
  	}
  },
  components: {
    prankAlert
  },
  mounted(){
    this.$store.dispatch('actionsStep',[{name:'测试的',msg:'整蛊成功'},{name:'测试的',msg:'待整蛊'},{name:'lls',msg:'整蛊失败'},{name:'lls',msg:'识破成功'},{name:'lls',msg:'识破失败'},{name:'lls',msg:'识破失败'},{name:'lls',msg:'识破失败'},{img:'../assets/button_yellow.png',name:'lls',msg:'识破失败'},{img:'../assets/button_yellow.png',name:'lls',msg:'蛊惑失败'},{img:'../assets/button_yellow.png',name:'lls',msg:'识破失败'},{img:'../assets/button_yellow.png',name:'lls',msg:'识破失败'},{img:'../assets/button_yellow.png',name:'lls',msg:'识破失败'}])
  	this.mokeAjax() // 调用方法
  	this.$nextTick(function () {
		  console.log(this.$refs.main.style.height + 'test');
		})
  	console.log(this.$refs.main)
  	var test = this.$refs.main;
  	setTimeout(function(){
		 console.log(test.offsetHeight + 'test');
  	},1);
//	this.setHeight = document.body.clientHeight - 28;
  }
};
</script>
<style lang="less" scoped>
  #main{
    font-size: 15px;
    margin: 12px;
  }
  header
  {
	  div{
	  	float: left;
	  	width: 50%;
	  	text-align: center;
	  	padding-top: 10px;
	  	padding-bottom: 10px;
	  	background: #eaeaea;
	  	border-top-left-radius: 10px;
      border-top-right-radius: 10px;
	  }
	  .selected{
	  	background: white;
	  }
  }
  #mainContent{
  	position: relative;
		top: -1px;
		background: white;  
	  section{
	    margin: 0 0.2rem;
	    padding: 16px 0px;
	  	border-bottom: 1px solid #e4e3e3;
	  	span{
	  	  margin-left: 10px;
	  	}
	  	img{
	  		width: 1.2rem;
	  	}
	  	.right{
		  	float: right;
		  	color: #eac56e;
		  }
	  }
  }
  footer{
  	text-align: center;
    padding: 10px 30px;
  	#footerMsg {
	    color: #ea6565;
	  }
	  div#footerContent {
		    font-size: 0.2rem;
		    color: gray;
        margin-top: 3px;
		}
  }
  #promptMsg {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%,-50%);
  }
</style>

