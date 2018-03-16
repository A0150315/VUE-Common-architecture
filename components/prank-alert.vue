<template>
    <div class="alert-wrapper-box">
        <div class="alert-wrapper">
            <div v-if="showAlert.CloseIcon" class="alert-close-icon" @click="close()"></div>
            <div v-if="showAlert.tipImgUrl" :style="styleImg" class="alert-tip">
                <img :src="showAlert.tipImgUrl">
            </div>
            <div v-if="showAlert.contentTxt" class="alert-content">{{showAlert.contentTxt}}</div>
            <div v-if="showAlert.rules.length" class="alert-rules">
                <p v-for="(item, index) in showAlert.rules">
                    <span :style="{background: 'url(static/'+(index + 1)+'.png) no-repeat',backgroundSize:'100% 100%'}"></span>
                    {{item}}
                </p>
            </div>
            <div v-if="showAlert.CloseBtn || showAlert.confirmBtn" class="alert-btn">
                <button @click="close()" v-if="showAlert.CloseBtn" class="alert-close">取消</button>
                <button @click="confirm()" v-if="showAlert.confirmBtn"
                        :class="{'alert-confirm':true,'only-alert-confirm':!showAlert.CloseBtn}">{{showAlert.confirmBtnTxt}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            showAlert: {
                type: Object,
                default: function () {
                    return {
                        //                    alertStatus: false,      /*弹框显示的状态*/
                        tipImgUrl: "" /*弹框头部提示图片路径*/,
                        tipImgWidth: 0 /*弹框头部提示图片宽度*/,
                        tipImgHeight: 0 /*弹框头部提示图片高度*/,
                        contentTxt: "" /*弹框显示内容的文本*/,
                        CloseIcon: true /*是否有右上角关闭按钮*/,
                        CloseBtn: true /*是否有右上角关闭按钮*/,
                        confirmBtn: true /*是否有右上角关闭按钮*/,
                        rules: [] /*规则信息的内容*/,
                        confirmBtnTxt: '确定' /*确定按钮的文本信息*/
                    };
                }
            }
        },
        data() {
            return {
                styleImg: {
                    width: this.showAlert.tipImgWidth + "rem",
                    height: this.showAlert.tipImgHeight + "rem"
                }
            };
        },
        methods: {
            close() {
                this.$emit("close");
            },
            confirm() {
                this.$emit("confirm");
            }
        }
    };
</script>

<style scoped lang="less">
    .alert-wrapper-box {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        left: 0;
        top: 0;
        & .alert-wrapper {
            position: absolute;
            left: 50%;
            top: 50%;
            background-color: #f7c42f;
            border: 1px solid #ddd;
            border-radius: 0.34rem;
            width: 5.7rem;
            padding: 0.36rem 0.24rem;
            word-break: break-all;
            font-size: 0.46rem;
            transform: translate(-50%, -50%);
            & .alert-close-icon {
                width: 0.68rem;
                height: 0.68rem;
                background: url("../chinamobilercs/miyouAprilAc/src/assets/img/icon-close.png");
                background-size: 100% 100%;
                position: absolute;
                right: -0.34rem;
                top: -0.34rem;
            }
            & .alert-tip {
                margin: 0 auto;
                & img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            & .alert-content {
                text-align: center;
            }
            & .alert-rules {
                text-align: left;
                font-size: 0.32rem;
                color: #000;
                & span{
                    display: inline-block;
                    width: 0.35rem;
                    height: 0.35rem;
                    position: absolute;
                    left: 0.15rem;
                    top: 0;
                }
                & p{
                    margin-bottom: 0.2rem;
                    padding-left: 0.6rem;
                    position: relative;
                }
            }
            & .alert-btn {
                margin-top: 0.3rem;
                text-align: center;
                & button {
                    border: none;
                }
                & .alert-close {
                    width: 2.07rem;
                    height: 0.57rem;
                    background: url("../chinamobilercs/miyouAprilAc/src/assets/img/btn_pop_smaller2.png");
                    background-size: 100% 100%;
                }
                & .alert-confirm {
                    width: 2.07rem;
                    height: 0.57rem;
                    background: url("../chinamobilercs/miyouAprilAc/src/assets/img/btn_pop_smaller1.png");
                    background-size: 100% 100%;
                }
                & .only-alert-confirm {
                    width: 2.47rem;
                    height: 0.66rem;
                    background: url("../chinamobilercs/miyouAprilAc/src/assets/img/btn_pop_bigger1.png");
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>