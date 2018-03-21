<template>
	<div id="main" ref='main'>
		<header class="clearfix iconfont">
			<div :class="{selected:isSelect == 1}" @click="changeItem(1)">发起的整蛊</div>
			<div :class="{selected:isSelect == 0}" @click="changeItem(0)">识破的整蛊</div>
		</header>
		<div id="mainContent" class="iconfont" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<section v-for='(item,index) in recordList' v-if='showContent && isSelect == 1'>
				<span>{{item.challengeUsername}}</span>
				<img class="right" src='../assets/img/trickFail.png' v-if="item.isPass == '0'" />
				<img class="right" src='../assets/img/trickSuccess.png' v-if="item.isPass == '1'" />
				<img class="right" src='../assets/img/waitTrick.png' v-if="item.isPass == null" style="width: 1rem;"/>
			</section>
			<section v-for='(item,index) in recordList' v-if='showContent && isSelect == 0'>
				<span>{{item.prankUsername}}</span>
				<img class="right" src='../assets/img/breakFail.png' v-if="item.isPass == '0'" />
				<img class="right" src='../assets/img/breakSuccess.png' v-if="item.isPass == '1'" />
			</section>
			<div id="showtip" v-if="showTip">没有更多数据了..</div>
			<div v-if='!showContent' id='promptMsg'>
				{{promptMsg}}
			</div>
		</div>
		<footer>
			<div id="footerMsg">温馨提醒</div>
			<div id="footerContent">每成功整蛊一个好友可获得1G奖励，活动期间最高获得5G奖励</div>
		</footer>
		<prank-alert v-if="alertStatus" @close="closeAlert()" @confirm="closeAlert()" :showAlert='showAlert'></prank-alert>
	</div>
</template>
<script>
	import prankAlert from '../../../../components/prank-alert.vue'
	import ajax from "../utils/service"// 引入封装的axios
	import { InfiniteScroll,MessageBox, Indicator } from 'mint-ui'
	export default {
		data() {
			return {
				showAlert: {},
                alertStatus: false,   //弹框的状态变量
                showContent: true,
				isSelect: 1,
				promptMsg: '您还没有整蛊过好友呢',
				recordList: [],
				pageNum: 1,
				mark: '0', //"0"查询挑战者信息，"1"查询整蛊者信息
				showTip: false
			}
		},
		computed: {
		},
		methods: {
			closeAlert() {
                this.alertStatus = false;
            },
			//改变标签栏的事件
			changeItem(index) {
				if(index == 0) {
					this.pageNum = 1;
					this.isSelect = 0;
					this.showTip = false;
					this.promptMsg = '您还没有挑战过整蛊呢';
					this.mark = '1';
					this.recordList = [];
					this.getList();
				} else {
					this.pageNum = 1;
					this.isSelect = 1;
					this.showTip = false;
					this.promptMsg = '您还没有整蛊过好友呢';
					this.mark = '0';
					this.recordList = [];
					this.getList();
				}
			},
			getList(){
				Indicator.open();
				this.getRecordList().then((res) =>{
						console.log(res);
						Indicator.close();
						if(res.code == 0){
							if(res.list == null || res.list.length == 0){
								if(this.pageNum == 1){
									this.showContent = false;
								}
								else{
									this.showTip = true;
								    this.loading = true;
								}
							}
							else{
								this.recordList = this.recordList.concat(res.list);
								this.showContent = true;
								this.loading = false;
								this.pageNum++;
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
			},
			//请求记录列表
			async getRecordList() {
				var mokeData = await ajax.getRecordList({
					text:{mark: this.mark,
						pageNum: this.pageNum
				    }
				});
				return mokeData;
			},
			//计算整蛊内容高度是否超过整屏
			computeHeight() {
					//		 if($("header").height() + $("#mainContent").height())
				var mainHeight = document.body.clientHeight - $("header").height() - $("footer").height() - 44;
				$("#mainContent").css("height", mainHeight + "px");
				$("body").css("overflow","hidden");
			},
			 loadMore() {
            // 防止多次加载
	            if (this.loading) {
	                return false;
	            }
	            this.loading = true;
	            this.getList();

	        }
		},
		components: {
			prankAlert
		},
		beforeMount() {
		},
		mounted() {
			//	this.mokeAjax() // 调用方法
			this.computeHeight();
//			this.getList();
		}
	};
</script>
<style lang="less" scoped>
	#main {
		font-size: 0.32rem;
    	color: #333333;
		margin: 12px;
	}

	header {
		div {
			float: left;
			width: 50%;
			text-align: center;
			padding-top: 10px;
			padding-bottom: 10px;
			background: #eaeaea;
			color: #5c5c5c;
			border-top-left-radius: 17px;
			border-top-right-radius: 17px;
		}
		.selected {
			background: white;
			color: #333333;
		}
	}

	#mainContent {
		position: relative;
		top: -1px;
		background: white;
		overflow: auto;
		section {
			margin: 0 0.2rem;
			padding: 16px 0px;
			border-bottom: 1px solid #e4e3e3;
			span {
				margin-left: 10px;
			}
			img {
				width: 1.2rem;
			}
			.right {
				float: right;
				color: #eac56e;
			}
		}
	}

	div#showtip {
	    padding: 4px;
	    text-align: center;
	    color: #5c5c5c;
	    font-size: 0.3rem;
	}

	footer {
		text-align: center;
		padding: 10px 30px;
		background: white;
		position: relative;
		top: -2px;
		border-bottom-left-radius: 17px;
		border-bottom-right-radius: 17px;
		#footerMsg {
			color: #f35416;
    		font-size: 0.2rem;
		}
		div#footerContent {
			font-size: 0.16rem;
    		color: #5c5c5c;
			margin-top: 3px;
		}
	}

	#promptMsg {
		position: absolute;
		left: 50%;
		top: 20%;
		transform: translate(-50%, -50%);
	}
</style>