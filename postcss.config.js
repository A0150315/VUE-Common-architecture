module.exports = {
    plugins: [
        require('postcss-cssnext'),
        require('cssnano')({
            reduceIdents: false
        })
    ]
}