<template>
	<div id="main" class="iconfont" ref='main'>
		<header>
			所有奖品请到  【我】-【卡券】  兑换
		</header>
		<div id="mainContent">
			<section v-for='(item,index) in cardList' v-if='showContent'>
				<div class="section__img">
					<div class="section__name">省内流量包</div>
					<div class="section__num">1G</div>
					<div class="section__time">截止兑换时间：2018年5月4日</div>
				</div>
			</section>
			<div v-if='!showContent' id='promptMsg'>
				{{promptMsg}}
			</div>
		</div>
		<prank-alert v-if="alertStatus" @close="closeAlert()" @confirm="closeAlert()" :showAlert='showAlert'></prank-alert>
	</div>
</template>
<script>
	import prankAlert from '../../../../components/prank-alert.vue'
	import ajax from "../utils/service"// 引入封装的axios
	import { MessageBox,Indicator } from 'mint-ui'
	export default {
		data() {
			return {
				showAlert: {},
                alertStatus: false,   //弹框的状态变量
				showContent: true,
				promptMsg: '没有奖品',
				cardList: ''
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
			closeAlert() {
                this.alertStatus = false;
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
					this.showAlert = {
                        tipImgUrl: '',
	                    tipImgWidth: 2.87,
	                    tipImgHeight: 0.65,
	                    CloseIcon: true,
	                    CloseBtn: false,
                        contentTxt: res.msg,
                        confirmBtn: true,
                        rules: [],
                        confirmBtnTxt: '好的'
                    }
                    this.alertStatus = true;
				}
			}).catch(() =>{
				Indicator.close();
				this.showAlert = {
                        tipImgUrl: '',
	                    tipImgWidth: 2.87,
	                    tipImgHeight: 0.65,
	                    CloseIcon: true,
	                    CloseBtn: false,
                        contentTxt: '请求报错了',
                        confirmBtn: true,
                        rules: [],
                        confirmBtnTxt: '好的'
                    }
                this.alertStatus = true;
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
    			padding-top: .08rem;
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