<template>
    <div class="container">
        <div class="alert-container">
            <h2 v-if="title">{{title}}</h2>
            <p>{{textContent}}</p>
            <input @click="hadClick()" class="btn" type="button" :value="btnContent">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            textContent: {
                type: String,
                default: ''
            },
            btnContent: {
                type: String,
                default: ''
            }
        },
        methods: {
            hadClick () {
                this.$emit('hasClick')
            }
        }
    }
</script>

<style scoped lang="less">
    .container{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.2);
        position: absolute;
        left: 0;
        top: 0;
        .alert-container{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            width: 200px;
            max-height: 200px;
            padding: 20px 10px;
            word-break: break-all;
            h2{
                text-align: center;
            }
            .btn{
                width: 160px;
                border: 1px solid #e2e2e2;
                border-radius: 4px;
                text-align: center;
                color: #fff;
                font-weight: bold;
                position: absolute;
                bottom: 10px;
                left: 30px;
            }
        }
    }
</style>