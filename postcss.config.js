module.exports = {
    plugins: [
        require('saladcss-bem')({
            defaultNamespace: undefined,
            style: 'bem',
            separators: {
                'descendent': '__',
                'modifier': '--'
            },
            shortcuts: {
                'component': 'b',
                'descendent': 'e',
                'modifier': 'm'
            }
        }),
        require('postcss-cssnext'),
        require('cssnano'),
        require('./plugins/postcss-px2rem')
    ]
}