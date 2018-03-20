<template>
  <div id='main' class="iconfont">
  	  <div>
        1、活动时间：2018年3月28日-2018年4月8日
      </div>
      <div>
        2、本活动对象仅限于密友圈用户，但不包括已办理不限量套餐、4G随心王、万花筒套餐、任我用套餐、非家庭网用户、和多号副号、万能副卡移动用户
      </div>
      <div>
      	3、活动期间需要先选择5道题，发给好友进行整蛊，成功整蛊好友才可获得奖励。如果好友答错3道及3道以上，则表示整蛊成功，如果好友答对3道，则表示被好友识破，整蛊失败；每成功整蛊1人，可获得1G流量奖励；最高只能获得5G流量奖励，重复整蛊同一好友只能获得一次奖励
      </div>
      <div>
      	4、识破其他人的整蛊同样可获得奖励，每识破1位好友，可获得1G流量奖励，最高只能获得5G奖励
      </div>
      <div>
      	5、参与整蛊大厅识破小密的整蛊挑战，每天有3次挑战机会，每次挑战需要答对3道题才算挑战成功，每成功挑战5次可获得1G奖励，最高可获得2G奖励
      </div>
      <div>
      	6、活动期间每个用户最高只能获得12G流量奖励
      </div>
      <div>
      	7、奖品领取和使用说明：<br />
      	（1）流量卡券为中国移动省内通用流量，到账后可在密友圈APP-我-卡券-未使用查看；<br />
      	（2）非移动号码及已办理不限量套餐、4G随心王、万花筒套餐、任我用套餐、和多号副号、万能副卡移动用户，可以领取流量卡券赠送好友但不能兑换充值到自己手机；<br />
      	（3）活动奖励获得的流量卡券，将在24小时内派发，需在5月4日前完成兑换，过期失效；<br />
      	（4）1G流量使用时效1小时，从充值到手机起生效，到期自动失效；<br />
      	（5）流量卡券只能在密友圈APP内自己兑换或通过密友圈群赠送给家庭网其他成员；<br />
      	（6）若获得2G奖励，则会派发2张1G流量卡券，获得3G奖励，则会派发3张1G流量卡券，以此类推；<br />
      </div>
      <div>
      	8、参与用户的手机号码需状态正常，且是中国移动手机用户，活动期间不出现销号、欠费情况；如出现获奖用户无法联系、手机号换号、注销等情况导致奖品发放失败，则视为用户主动放弃资格
      </div>
      <div>
        9、针对利用非正常途径（包括但不限于技术手段）完成任务的用户，密友圈有权在不事先通知的前提下，撤回用户所获得的特权
      </div>
  </div>
</template>
<script>

export default {
  computed:{
    data(){
    }
  },
  methods:{
  	computeHeight() {
					//		 if($("header").height() + $("#mainContent").height())
					var allheight = $("#main").height()  + 30 + 24;
					if(allheight <= document.body.clientHeight) {
						var mainHeight = document.body.clientHeight - 54;
						$("#main").css("height", mainHeight + "px");
						$("body").css("overflow","hidden");
					}
					else{
						$("body").css("overflow","auto");
					}
			}
  },
  components: {
  },
  mounted(){
    this.computeHeight();
  }
};
</script>
<style lang="less" scoped>
  #main{
		font-size: .2rem;
    color: #333;
    margin: 12px;
    padding: 15px;
    background: #ffffff;
    line-height: 0.4rem;
    border-radius: 10px;
  }
</style>

