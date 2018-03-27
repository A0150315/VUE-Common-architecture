<template>
  <div class="result">
    <div>
      <img src="../../../assets/img/pic_succeed.png" alt="pic_succeed.png" class="result__topicon" v-if="isCorrect">
      <img src="../../../assets/img/pic_fail.png" alt="pic_fail.png" class="result__topicon" v-else>
    </div>
    <p>{{isCorrect?`回答正确${rightNum}道题，挑战成功`:`只回答正确${rightNum}道题`}}</p>
    <p>{{isCorrect?'还是你最懂他':'你被整蛊了哦'}}</p>
    <div class="result__buttons">
      <span @click="_getCardStatus()" class="result__buttons__blue" v-if="isCorrect && !isXiaomi">
          领取1G流量
      </span>
      <span @click="_getCardStatus()" class="result__buttons__blue" v-if="isDrawable">
          领取1G流量
      </span>
      <router-link :to="isXiaomi?'/index/answer':'/index/prankFriend/createtopic'" tag="span" class="result__buttons__orange" replace>
          {{isXiaomi?'继续挑战':'我也要整蛊TA'}}
      </router-link>
    </div>
    <router-link class="result__checkanswer"  tag="span" :to="isXiaomi?'/index/prankFriend/checkanswer?isXiaomi=true':'/index/prankFriend/checkanswer?userTemplateId=' + userTemplateId">
      查看{{isXiaomi?'小密':'TA'}}的指定答案
    </router-link>
    <prank-alert v-if="alertStatus" @close="closeAlert()":showAlert='showAlert'></prank-alert>
  </div>
</template>
<style lang="postcss" scoped>
.result {
  width: 6.7rem;
  height: 4rem;
  border: 0.03rem solid #000;
  border-radius: 0.34rem;
  margin: 2.78rem auto 0;

  background-color: #fff;

  text-align: center;
  font-size: 0.39rem;
  font-weight: bolder;
}
.result__topicon {
  width: 2.28rem;
  height: 1.6rem;
  padding: 0.2rem 0 0.36rem;
}
.result__buttons {
  margin-top: 0.5rem;

  color: #fff;
  font-size: 0.34rem;
  font-weight: bolder;
  & span {
    width: 2.86rem;
    height: 0.73rem;

    background-size: 2.86rem 0.73rem;

    display: inline-block;
    line-height: 0.73rem;
  }
}
.result__buttons__blue {
  background-image: url("../../../assets/img/btn_挑战结果2.png");
}
.result__buttons__orange {
  background-image: url("../../../assets/img/btn_挑战结果1.png");
}
.result__checkanswer {
  position: relative;
  top: 0.42rem;

  font-size: 0.32rem;
  font-weight: bolder;
  border-bottom: 1px solid;
}
</style>
<script>
    import Ajax from "../../../utils/service";
    import prankAlert from '../../../../../../components/prank-alert.vue'
    import { Indicator } from 'mint-ui'

export default {
        components: {
            prankAlert
        },
  data() {
    return {
      isXiaomi: false,
      isCorrect: false,
      rightNum: 0,
        userTemplateId: 0,
        showAlert: {},
        alertStatus: false,
        isDrawable :false,
    };
  },
  mounted() {
    const { isPass, isXiaomi, rightNum, userTemplateId, prankId, isDrawable } = this.$route.query;
    this.isXiaomi = (isXiaomi === 'true' || isXiaomi === true) ? true: false;
    this.isCorrect = (isPass === 'true' || isPass === true) ? true: false;
    this.rightNum = rightNum;
      this.userTemplateId = userTemplateId;
      this.prankId = prankId;
      this.isDrawable = (isDrawable === 'true' || isDrawable === true) ? true: false;
  },
    methods: {
      /* 领取卡卷的接口 */
        _getCardStatus() {
            this.showAlert = {
                    tipImgUrl: '',
                    tipImgWidth: 0,
                    tipImgHeight: 0,
                    contentTxt: '1G流量包领取成功,24小时之内放到您的“我-卡卷中”',
                    CloseIcon: true,
                    CloseBtn: false,
                    confirmBtn: false,
                    rules: [],
                    confirmBtnTxt: ''
                };
            this.alertStatus = true;
//            Ajax.getCardStatus({'prankId':this.prankId}).then((res) => {
//                Indicator.close();
//                this.showAlert = {
//                    tipImgUrl: '',
//                    tipImgWidth: 0,
//                    tipImgHeight: 0,
//                    contentTxt: '',
//                    CloseIcon: true,
//                    CloseBtn: false,
//                    confirmBtn: false,
//                    rules: [],
//                    confirmBtnTxt: ''
//                };
//                if (res.code === 0) {
//                    this.showAlert.contentTxt = '1G流量包领取成功,24小时之内放到您的“我-卡卷中”'
//                } else {
//                    this.showAlert.contentTxt = res.msg
//                }
//                this.alertStatus = true;
//            })
        },
        closeAlert () {
            this.alertStatus = false;
        }
    }
};
</script>

