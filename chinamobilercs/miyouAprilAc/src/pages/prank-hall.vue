<template>
    <div class="prank-index-wrapper">
        <section>
            <div class="content-top">
                <div class="my-game">
                    <img src="../assets/img/我的战绩.png" alt="">
                </div>
                <div class="my-info">
                    <p>累计已挑战 <span>{{challenge}}</span> 位，成功 <span>{{congratulation}}</span> 位</p>
                </div>
            </div>
            <ul>
                <li @click="goAnswer()">
                    <div class="prank-challenge"></div>
                    <p>发起挑战<i class="iconfont icon-gengduo"></i></p>
                </li>
            </ul>
        </section>
        <div @click="showPrankRule()" class="active-rule">
            <p>整蛊大厅规则</p>
        </div>
        <bottomBg></bottomBg>
        <prank-alert v-if="alertStatus" @close="closeAlert()" @confirm="closeAlert()" :showAlert='showAlert'></prank-alert>
    </div>
</template>

<script>
    import prankAlert from '../../../../components/prank-alert.vue'
    import bottomBg from '../components/Bottom-bg.vue'
    import CommonCenter from '../utils/common'
    import request from '../utils/service/index'

    export default {
        components: {
            bottomBg,
            prankAlert
        },
        data () {
            return {
                showAlert: {},
                alertStatus: false,   //弹框的状态变量
                challenge: 0,
                congratulation: 0
            }
        },
        created() {
            this._getStatisticsMessage();
        },
        mounted() {
            CommonCenter.setTitle('全民愚人战，整蛊好友领12G')
        },
        methods: {
            /*获取挑战信息接口数据*/
            _getStatisticsMessage() {
                request.getStatisticsMessage().then((res) => {
                    console.log(res)
                    if (res.code === 0) {
                        this.challenge = res.tFooldayActivityEntity.challenge;
                        this.congratulation = res.tFooldayActivityEntity.congratulation;
                        this.chance = res.tFooldayActivityEntity.chance
                    }
                })
            },
            closeAlert() {
                this.alertStatus = false;
            },
            /* 跳转到整蛊答题页面 */
            goAnswer() {
                if (this.chance < 3) {
                    this.$router.push('answer')
                } else {
                    this.showAlert = {
                        tipImgUrl: '',
                        tipImgWidth: 0,
                        tipImgHeight: 0,
                        contentTxt: '您今天已经挑战了3次了哦，请明天再来吧',
                        CloseIcon: true,
                        CloseBtn: false,
                        confirmBtn: true,
                        rules: [],
                        confirmBtnTxt: '好的'
                    }
                    this.alertStatus = true;
                }
            },
            showPrankRule() {
                this.showAlert = {
                    tipImgUrl: 'static/pic_tiaozhanguize.png',
                    tipImgWidth: 2.87,
                    tipImgHeight: 0.65,
                    CloseIcon: true,
                    CloseBtn: false,
                    confirmBtn: false,
                    rules: ['每次挑战有5道题，需要答对3道题才算挑战成功，每天有3次挑战机会', '每成功挑战5次可获得1G奖励，最高获得2G奖励'],
                }
                this.alertStatus = true;
            }
        }
    }
</script>

<style scoped lang="less">
    .prank-index-wrapper{
        width: 100%;
        height: 100%;
        background-color: #f7c42f;
        position: relative;
        font-size: 0.34rem;
        & section{
            width: 100%;
            padding: 0.22rem 0.25rem 0;
            box-sizing: border-box;
            & .content-top{
                width: 100%;
                height: 2.68rem;
                border-radius: 0.34rem;
                background-color: #fff;
                padding: 0.26rem 0;
                box-sizing: border-box;
                margin-bottom: 0.32rem;
                & .my-game{
                    margin: 0 auto;
                    width: 3.40rem;
                    height: 0.8rem;
                    & img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
                & .my-info{
                    width: 100%;
                    display: flex;
                    margin-top: 0.36rem;
                    text-align: center;
                    font-size: 0.4rem;
                    & p{
                        width: 100%;
                        color: #000;
                    }
                    & span{
                        font-weight: bold;
                        font-size: 0.8rem;
                        color: #f44a0a;
                    }
                }
            }
            & ul{
                margin-bottom: 0.7rem;
                & li{
                    width: 100%;
                    height: 1.2rem;
                    border-radius: 0.34rem;
                    background-color: #fff;
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.32rem;
                    & .prank-challenge{
                        width: 0.9rem;
                        height: 0.9rem;
                        margin: 0 0.2rem 0 0.4rem;
                        background: url("../assets/img/faqitiaozhan.png") no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
        & .active-rule{
            width: 2.2rem;
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