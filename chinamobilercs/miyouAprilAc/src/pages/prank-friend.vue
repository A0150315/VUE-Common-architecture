<template>
    <div class="prank-friend-wrapper">
        <ul>
            <li class="create-topic" @click="goTopic()">
                <p><span class="add-icon"></span>制作题目</p>
            </li>
            <li @click="goTopic(item.userTemplateId, item.title)" v-if="prankList.length" v-for="(item,index) in prankList" :key="index">
                <p class="topic-title">{{item.title}} <i class="iconfont icon-gengduo"></i></p>
            </li>
        </ul>
        <div @click="showPrankRule()" class="active-rule">
            <p>整蛊规则</p>
        </div>
        <prank-alert v-if="alertStatus" @close="closeAlert()" @confirm="closeAlert()" :showAlert='showAlert'></prank-alert>
        <bottomBg></bottomBg>
    </div>
</template>

<script>
import prankAlert from "../../../../components/prank-alert.vue";
import request from "../utils/service/index";
import bottomBg from "../components/Bottom-bg.vue";
import CommonCenter from "../utils/common";
import { Indicator } from 'mint-ui'
import ERROR_HTML from '../utils/service/config'

export default {
  components: {
    bottomBg,
    prankAlert
  },
  data() {
    return {
      prankList: [],
      showAlert: {
        tipImgUrl: "static/pic_zhengguguize.png",
        tipImgWidth: 2.87,
        tipImgHeight: 0.65,
        //                    contentTxt: 'lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        CloseIcon: true,
        CloseBtn: false,
        confirmBtn: false,
        rules: [
          "选择5道问题整蛊好友，如果好友答错3道及3道以上，则表示整蛊成功，每成功整蛊一个好友。获取1G奖励，最高获取5G奖励",
          "如果好友答对3道，则表示被好友识破，整蛊失败。好友可获得1G奖励。"
        ],
        confirmBtnTxt: "确定"
      },
      alertStatus: false, //弹框的状态变量
        preAgain: false  //防止按钮多次点击
    };
  },
  created() {
      Indicator.open()
    this._getMyPrankList();
  },
  mounted() {
      this.preAgain = false;
    CommonCenter.setTitle("整蛊好友");
  },
  methods: {
    /* 获取我自定义题目的列表 */
    _getMyPrankList() {
      request.getMyPrankList().then(res => {
          Indicator.close();
        if (res.code === 0) {
          this.prankList = res.data;
        } else {
            window.location.href = ERROR_HTML;
            return ;
        }
      });
    },
    /* 跳转到自定义题目库 */
    goTopic(id, title) {
        if (this.preAgain) return ;
        this.preAgain = true;
        sessionStorage.setItem('title', title);
      this.$router.push({
        path: `${this.$route.fullPath}/createtopic`,
        query: { userTemplateId: id }
      });
    },
    /* 关闭弹框 */
    closeAlert() {
      this.alertStatus = false;
    },
    /* 显示整蛊规则弹框 */
    showPrankRule() {
      this.alertStatus = true;
    }
  }
};
</script>

<style scoped lang="less">
.prank-friend-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 0.34rem;
  & ul {
      padding-top: 0.1rem;
    max-height: 11rem;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  & li {
    width: 7rem;
    height: 1.2rem;
    background-color: #fff;
    margin: 0 auto 0.26rem;
    border-radius: 0.34rem;
    color: #333;
    & p {
      height: 100%;
      line-height: 1.2rem;
    }
    & .topic-title {
      text-align: left;
      padding-left: 0.26rem;
      position: relative;
    }
    & .add-icon {
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
      background: url("../assets/img/bg_add.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 0.1rem;
      vertical-align: text-bottom;
    }
  }
  & .create-topic {
    text-align: center;
    font-size: 0.36rem;
    color: #f44a0a;
  }
  & .icon-gengduo {
    position: absolute;
    right: 0.14rem;
    top: 50%;
    transform: translateY(-50%);
    color: #333;
    font-weight: bold;
  }
  & .active-rule {
    width: 1.8rem;
    height: 0.48rem;
    position: absolute;
    left: 50%;
    bottom: 0.4rem;
    z-index: 1;
    transform: translateX(-50%);
    text-align: center;
  }
}
</style>