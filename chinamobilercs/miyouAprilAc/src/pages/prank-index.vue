<template>
    <div class="container">
        <div class="percent-top">
            <div class="percent-info">
                <div class="pencent-head"></div>
                <p>lx</p>
                <p>111111111111</p>
            </div>
            <div class="my-prize">我的奖品</div>
            <div class="friend-info">
                <div class="friend-lf">
                    <p>2wei</p>
                    <p>一成功整蛊的好友</p>
                </div>
                <div class="friend-rg">
                    <p>2wei</p>
                    <p>一成功整蛊的好友</p>
                </div>
            </div>
        </div>
        <ul>
            <li>
                <div class="prank-image"></div>
                <div class="prank-text">
                    <p>整蛊好友</p>
                    <p>整蛊好友</p>
                </div>
                <div class="icon"></div>
            </li>
            <li>
                <div class="prank-image"></div>
                <div class="prank-text">
                    <p>整蛊好友</p>
                    <p>整蛊好友</p>
                </div>
                <div class="icon"></div>
            </li>
        </ul>
        <div class="active-router">
            <p>活动规则</p>
        </div>
        <prank-alert v-if="showAlert"
                :title="btnTitle"
                :textContent="textContent"
                :btnContent="btnContent"
                @hasClick="goToNext()"
        ></prank-alert>
    </div>
</template>

<script>
    import prankAlert from '../../../../components/prank-alert.vue'
    export default {
        components: {
            prankAlert
        },
        data () {
            return {
                showAlert: true,
                btnTitle: 'test',
                textContent: 'testsssssssssssssssssssssssssssssssssssssssssssss',
                btnContent: 'goToNext'
            }
        },
        methods: {
            goToNext() {
                this.showAlert = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .container{
        padding: 10px;
        font-size: 12px;
        width: 100%;
        min-height: 667px;
        height: 100%;
        box-sizing: border-box;
        .percent-top{
            width: 100%;
            height: 250px;
            border: 1px solid #ddd;
            border-radius: 5px;
            text-align: center;
            position: relative;
            padding: 10px;
            box-sizing: border-box;
            .pencent-head{
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: 1px solid #ddd;
                position: relative;
                left: 50%;
                margin-left: -40px;
            }
            .my-prize{
                position: absolute;
                right: 12px;
                top: 12px;
            }
            .friend-info{
                width: 100%;
                height: 100px;
                position: relative;
                bottom: 0;
                display: flex;
                padding-top: 60px;
                box-sizing: border-box;
                div{
                    width: 50%;
                    height: 100%;
                    text-align: center;
                }
            }
        }
        ul{
            width: 100%;
            li{
                width: 100%;
                height: 100px;
                display: flex;
                padding: 10px;
                box-sizing: border-box;
                .prank-image{
                    width: 80px;
                    height: 80px;
                    border: 1px solid #ddd;
                    margin-right: 20px;
                }
                .prank-text{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            }
        }
    }
    .active-router{
        width: 80%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }
</style>