<template>
	<div id="main" class="iconfont" ref='main'>
		<header>
			所有奖品请到  【我】-【卡券】  兑换
		</header>
		<div id="mainContent">
			<section v-for='(item,index) in cardList' v-if='showContent'>
				<div class="section__img">
					<div class="section__name">{{item.description == null ? null : item.description.slice(2)}}</div>
					<div class="section__num">{{item.description == null ? null : item.description.slice(0,2)}}</div>
					<div class="section__time">截止兑换时间：{{changeTime(item.validTime)}}</div>
				</div>
			</section>
			<div v-if='!showContent' id='promptMsg'>
				{{promptMsg}}
			</div>
		</div>
		<prank-alert v-if="showAlert" :title="btnTitle" :textContent="textContent" :btnContent="btnContent" @hasClick="goToNext()"></prank-alert>
	</div>
</template>
<script>
	import prankAlert from '../../../../components/prank-alert.vue'
	import ajax from "../utils/service"// 引入封装的axios
	import { MessageBox,Indicator } from 'mint-ui'
	export default {
		data() {
			return {
				showAlert: false,
				showContent: true,
				btnTitle: 'test',
				textContent: '请检查网络后重试',
				btnContent: 'goToNext',
				promptMsg: '没有奖品',
				cardList: ''
			}
		},
		computed: {
			dataList() {
				return this.$store.state.client.data
			}
		},
		methods: {

			//请求记录列表
			async getCardList() {
				var mokeData = await ajax.getCardList({
					text:{
				    }
				});
				return mokeData;
			},
			goToNext() {
				this.btnTitle = '修改';
			},
			//计算整蛊内容高度是否超过整屏
			computeHeight() {
				setTimeout(function(){
					var allheight = $("header").height() + $("#mainContent").height() + 24;
					if(allheight < document.body.clientHeight) {
						var mainHeight = document.body.clientHeight - $("header").height() - 44;
						console.log($("header").height())
						console.log(mainHeight)
						$("#mainContent").css("height", mainHeight + "px");
						$("body").css("overflow","hidden");
					}
					else{
						$("body").css("overflow","auto");
					}
				},1);
			},
			changeTime(time){
				time = time.replace(/\-/g, "/");
			    time = new Date(time);
				return time.getFullYear() + '年' + (time.getMonth()+1) + '月' + time.getDate() + '日';
			}
		},
		components: {
			prankAlert
		},
		beforeMount() {
		    this.$store.dispatch('actionsStep', [{
				name: '神内流量包',
				num: '1G',
				time: '2018年3月15日'
			}, {
					name: '神内流量包',
				num: '1G',
				time: '2018年3月15日'
			}
			, {
					name: '神内流量包',
				num: '1G',
				time: '2018年3月15日'
			}, {
					name: '神内流量包',
				num: '1G',
				time: '2018年3月15日'
			}])
		},
		mounted() {
			//	this.mokeAjax() // 调用方法
			Indicator.open();
			this.getCardList().then((res) =>{
				console.log(res);
				Indicator.close();
				if(res.code == 0){
					if( res.list == null || res.list.length == 0){
						this.showContent = false;
					}
					else{
						this.cardList = res.list;
						this.computeHeight();
					}
				}
				else{
					MessageBox.alert("",res.msg);
				}
			}).catch(() =>{
				MessageBox.alert("", "请求报错了");
			});
			//	this.setHeight = document.body.clientHeight - 28;
		}
	};
</script>
<style lang="less" scoped>
	#main {
		font-size: 0.32rem;
    color: #333333;
		margin: 12px;
		border-radius: 20px;
	}

	header {
		background: #ffffff;
    padding: 10px 0px;
    text-align: center;
    font-size: 0.32rem;
    color: #000000;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
	}

	#mainContent {
		position: relative;
		top: -1px;
		background: white;
    border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		section {
			margin: 0 .3rem;
			padding: 8px 0;
			.section__img{
				width: 100%;
        height: 2rem;
		    background: url("../assets/img/bg_award.png") no-repeat;
		    background-size: 101% 2rem;
		    border-radius: 10px;
			}
			.section__name{
				padding-top: 0.2rem;
				padding-left: 19px;
    		color: #ffffff;
			}
			.section__num{
				color: #ffffff;
				padding-left: 19px;
    		font-size: 0.63rem;
			}
			.section__time{
				  font-size: 0.16rem;
    			padding-top: 0.06rem;
    			padding-left: 19px;
    			color: #666666;
			}
		}
	}

	#promptMsg {
		position: absolute;
		left: 50%;
		top: 20%;
		transform: translate(-50%, -50%);
	}
</style>