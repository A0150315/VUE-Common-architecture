<template>
    <div class="prank-friend-wrapper">
        <ul>
            <li class="create-topic" @click="goTopic()">
                <p><span class="add-icon"></span>制作题目</p>
            </li>
            <li @click="goTopic(item.userTemplateId)" v-if="prankList.length" v-for="(item,index) in prankList" :key="index">
                <p class="topic-title">{{item.title}} <i class="iconfont icon-gengduo"></i></p>
            </li>
        </ul>
        <bottomBg></bottomBg>
    </div>
</template>

<script>
import request from "../utils/service/index";
import bottomBg from "../components/Bottom-bg.vue";
import CommonCenter from "../utils/common";

export default {
  components: {
    bottomBg
  },
  data() {
    return {
      prankList: []
    };
  },
  created() {
    this._getMyPrankList();
  },
  mounted() {
    CommonCenter.setTitle("整蛊好友");
  },
  methods: {
    /* 获取我自定义题目的列表 */
    _getMyPrankList() {
      request.getMyPrankList().then(res => {
        console.log(res);
        if (res.code === 0) {
          this.prankList = res.data;
        }
      });
    },
    /* 跳转到自定义题目库 */
    goTopic(id) {
      this.$router.push({
        path: `${this.$route.fullPath}/createtopic`,
        query: { userTemplateId: id }
      });
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
}
</style>