module.exports = {
    module: {
        rules: [
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', { 'modules': false }],
                        'stage-2'
                    ],
                    plugins: ['transform-runtime'],
                    cacheDirectory: true
                },
            },
            {
                loader: 'eslint-loader',
            },
        ],
    },

    devtool: '#source-map',
};
