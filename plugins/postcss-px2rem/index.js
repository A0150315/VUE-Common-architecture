const postcss = require('postcss')

module.exports = postcss.plugin('postcss-plugin-name', opts => {
    //一个ast节点基本有如下信息：
    // nodes: css规则的节点信息集合
    // decl: 每条css规则的节点信息
    // prop: 样式名，如width
    // value: 样式值， 如10px
    // type: 类型
    // source: 包括start和end的位置信息，start和end里都有line和column表示行和列
    // selector: type为rule时的选择器
    // name: type为atRule时@紧接rule名，譬如@import 'xxx.css'中的import
    // params: type为atRule时@紧接rule名后的值，譬如@import 'xxx.css'中的xxx.css
    // text: type为comment时的注释内容

    // 遍历
    // walk: 遍历所有节点信息，无论是atRule、rule、comment的父类型，还是rule、 decl的子类型
    // walkAtRules：遍历所有的atRule
    // walkComments
    // walkDecls
    // walkRules
    //rem(100px)->1rem
    opts = opts || {};
    let ratio = 100;
    ratio = opts.width ? opts.width / 750 : ratio;
    return function (root, result) {
        root.walkDecls(decl => { //rem(?px)
            if (/rem\(.*?px\)/g.test(decl.value)) {
                decl.value = decl.value.replace(/rem\(.*?px\)/g, e => {
                    return Number(e.slice(4, -3)) / ratio + 'rem'
                })
            }
            // decl.value.replace(/vw\(.*?px\)/g, e => { return `${e}|||` })//匹配vw(?px) /vw\(.*?px\)/g
            // string.match(/(?<=vw\()(.*?)(?=px\))/g, e => { return `${e}|||` })//匹配? /(?<=vw\()(.*?)(?=px\))/g
            // 处理逻辑
        })
    };
});