<template>
    <div class="alert-wrapper-box">
        <div class="alert-wrapper">
            <div v-if="showAlert.tipImgUrl" :style="showAlert.styleImg" class="alert-tip">
                <img :src="showAlert.tipImgUrl">
            </div>
            <div v-if="showAlert.contentTxt" class="alert-content">{{showAlert.contentTxt}}</div>
            <div v-if="showAlert.rules.length" class="alert-rules"></div>
            <div v-if="showAlert.CloseBtn || showAlert.confirmBtn" class="alert-btn">
                <button @click="close()" v-if="showAlert.CloseBtn" class="alert-close">取消</button>
                <button @click="confirm()" v-if="showAlert.confirmBtn" :class="{'alert-confirm':true,'only-alert-confirm':!showAlert.CloseBtn}">确定</button>
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
                  return   {
                      alertStatus: false,      /*弹框显示的状态*/
                      tipImgUrl: '',           /*弹框头部提示图片路径*/
                      tipImgWidth: 0,         /*弹框头部提示图片宽度*/
                      tipImgHeight: 0,        /*弹框头部提示图片高度*/
                      contentTxt: '',          /*弹框显示内容的文本*/
                      CloseIcon: true,        /*是否有右上角关闭按钮*/
                      CloseBtn: true,          /*是否有右上角关闭按钮*/
                      confirmBtn: true,        /*是否有右上角关闭按钮*/
                      rules: [],               /*规则信息的内容*/
                  }
                }
            }
        },
        data () {
            return {
                styleImg:{
                    width: this.tipImgWidth + 'rem',
                    height: this.tipImgHeight + 'rem',
                }
            }
        },
        methods: {
            close () {
                this.$emit('close')
            },
            confirm () {
                this.$emit('confirm');
            }
        }
    }
</script>

<style scoped lang="less">
    .alert-wrapper-box{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.2);
        position: absolute;
        left: 0;
        top: 0;
        & .alert-wrapper{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background-color: yellow;
            border: 1px solid #ddd;
            border-radius: 10px;
            width: 300px;
            max-height: 200px;
            padding: 20px 10px;
            word-break: break-all;
            font-size: 0.46rem;
            & .alert-tip{
                margin: 0 auto;
                & .img{
                    width: 100%;
                    height: 100%;
                    display: block;
                  }
            }
            & .alert-content{
                text-align: center;
            }
            & .alert-rules{
                text-align: left;
            }
            & .alert-btn{
                text-align: center;
                & button{
                    border: none;
                }
                & .alert-close{
                    width: 2.07rem;
                    height: 0.57rem;
                    background: url("../chinamobilercs/miyouAprilAc/src/assets/img/btn_pop_smaller2.png");
                    background-size: 100% 100%;
                }
                & .alert-confirm{
                    width: 2.07rem;
                    height: 0.57rem;
                    background: url("../chinamobilercs/miyouAprilAc/src/assets/img/btn_pop_smaller1.png");
                    background-size: 100% 100%;
                }
                & .only-alert-confirm{
                    width: 2.47rem;
                    height: 0.66rem;
                    background: url("../chinamobilercs/miyouAprilAc/src/assets/img/btn_pop_bigger1.png");
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>