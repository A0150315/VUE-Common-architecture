<template>
    <div class="prank-friend-wrapper">
        <ul>
            <li class="create-topic" @click="goTopic()">
                <p>制作题目</p>
            </li>
            <li @click="goTopic(item.userTemplateId)" v-if="prankList.length" v-for="item in prankList">
                <h2>{{item.title}}</h2>
            </li>
        </ul>
        <bottomBg></bottomBg>
    </div>
</template>

<script>
    import request from '../utils/service/index'
    import bottomBg from '../components/Bottom-bg.vue'

    export default {
        components: {
            bottomBg
        },
        data() {
            return {
                prankList:[]
            }
        },
        created() {
            this._getMyPrankList()
        },
        methods: {
            /* 获取我自定义题目的列表 */
            _getMyPrankList() {
                request.getMyPrankList().then((res) => {
                    console.log(res)
                    if (res.code === 0) {
                        this.prankList = res.data;
                    }
                })
            },
            /* 跳转到自定义题目库 */
            goTopic(id) {
                this.$router.push('createtopic')
            }
        }
    }
</script>

<style scoped lang="less">
    .prank-friend-wrapper{
        width: 100%;
        height: 100%;
        position: relative;
        font-size: 0.26rem;
        & li{
            width: 7rem;
            height: 1.8rem;
            background-color: #fff;
            margin: 0 auto 0.36rem;
            border-radius: 0.1rem;
        }
        & .create-topic{
            text-align: center;
        }
    }
</style>