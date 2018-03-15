<template>
    <div class="prank-index-wrapper">
        <header></header>
        <section>
            <div class="content-top">
                <div class="my-game">
                    <img src="../assets/img/我的战绩.png" alt="">
                </div>
                <div class="my-info">
                    <div>
                        <p><span class="number">{{this.prankSuccess}}</span><span>位</span></p>
                        <p>成功整蛊好友></p>
                    </div>
                    <div>
                        <p><span class="number">{{this.congratulation}}</span><span>位</span></p>
                        <p>成功识破整蛊></p>
                    </div>
                    <div>
                        <p><span class="number">{{this.coupon}}</span><span>G</span></p>
                        <p>我的奖品></p>
                    </div>
                </div>
            </div>
            <ul>
                <li>
                    <div class="prank-bg prank-friend-bg"></div>
                    <div class="prank-info">
                        <div @click="prankFriend()" class="prank-friend"></div>
                        <p>给好友出题，整蛊成功领取1G</p>
                    </div>
                </li>
                <li>
                    <div class="prank-bg prank-hall-bg"></div>
                    <div class="prank-info">
                        <div @click="prankHall()" class="prank-hall"></div>
                        <p>挑战整蛊，我最懂你</p>
                    </div>
                </li>
            </ul>
        </section>
        <div class="active-rule"></div>
        <bottomBg></bottomBg>
        <prank-alert v-if="alertStatus" @close="closeAlert()" @confirm="goToNext()" :showAlert='showAlert'></prank-alert>
    </div>
</template>

<script>
    import prankAlert from '../../../../components/prank-alert.vue'
    import CommonCenter from '../utils/common'
    import request from '../utils/service/index'
    import bottomBg from '../components/Bottom-bg.vue'

    export default {
        components: {
            prankAlert,
            bottomBg
        },
        data () {
            return {
                showAlert: {
                    tipImgUrl: '',
                    tipImgWidth: 0,
                    tipImgHeight: 0,
//                    contentTxt: 'lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    CloseIcon: true,
                    CloseBtn: false,
                    confirmBtn: true,
                    rules: ['lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'mmmmmmmmmmmmmmmmmnnnnnnn'],
                    confirmBtnTxt: '确定'
                },
                alertStatus: false,   //弹框的状态变量
                prankSuccess: 0,      //成功整蛊次数
                congratulation: 0,    //成功识破整蛊的次数
                coupon: 0,            //获取到的奖励的数量
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
                    if (res.code === 0) {
                        this.prankSuccess = res.tFooldayActivityEntity.prankSuccess;
                        this.congratulation = res.tFooldayActivityEntity.congratulation;
                        this.coupon = res.tFooldayActivityEntity.coupon;
                    }
                })
            },
            closeAlert() {
                this.alertStatus = false;
            },
            prankFriend() {
                /* 弹窗提示框显示 */
//                this.alertStatus = true;
                /* 跳转到题目列表页面 */
                this.$router.push('index/prankFriend')
            },
            prankHall() {
                /* 弹窗提示框显示 */
//              this.alertStatus = true;
                /* 跳转到整蛊大厅答题页面 */
                this.$router.push('index/answer')
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
        & header{
            width: 100%;
            height: 4.74rem;
            background: url("../assets/img/banner.png") no-repeat;
            background-size: 100% 100%;
        }
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
                    display: flex;
                    text-align: center;
                    & div{
                        flex-grow: 1;
                    }
                    & span{
                        font-size: 0.40rem;
                        color: #242424;
                    }
                    & .number{
                        font-size: 0.80rem;
                    }
                    & p{
                        font-size: 0.22rem;
                        color: #666;
                    }
                }
            }
            & ul{
                & li{
                    width: 100%;
                    height: 1.2rem;
                    border-radius: 0.34rem;
                    background-color: #fff;
                    display: flex;
                    margin-bottom: 0.32rem;
                    & .prank-bg{
                        width: 0.80rem;
                        height: 0.80rem;
                        margin: 0.20rem 0 0.20rem 0.5rem;
                    }
                    & .prank-friend-bg{
                        background: url("../assets/img/pic_zhengguhaoyou.png");
                        background-size: 100% 100%;
                    }
                    & .prank-hall-bg{
                        background: url("../assets/img/pic_zhwnggudating.png");
                        background-size: 100% 100%;
                    }
                    & .prank-info{
                        font-size: 0.26rem;
                        color: #3c3c3c;
                        margin-left: 0.36rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        & div{
                            width: 2.33rem;
                            height: 0.41rem;
                            margin-bottom: 0.16rem;
                        }
                        & .prank-friend{
                            background: url("../assets/img/word_zhengguhaoyou.png");
                            background-size: 100% 100%;
                        }
                        & .prank-hall{
                            background: url("../assets/img/word_zhanggudating.png");
                            background-size: 100% 100%;
                        }
                    }
                }
            }
        }
        & .active-rule{
            width: 1.8rem;
            height: 0.48rem;
            position: absolute;
            left: 50%;
            bottom: 0.7rem;
            transform: translateX(-50%);
            background: url("../assets/img/word_huodongguize.png");
            background-size: 100% 100%;
        }
    }
</style>