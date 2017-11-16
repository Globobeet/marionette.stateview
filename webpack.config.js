module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', { modules: false }],
                                'stage-2',
                            ],
                            plugins: [
                                'transform-runtime',
                            ],
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            rules: {
                                'one-var': 0,
                                'one-var-declaration-per-line': 0,
                                'no-unused-expressions': 0,
                                'arrow-body-style': 0,
                            },
                        },
                    },
                ],
            },
        ],
    },

    devtool: '#source-map',
};
