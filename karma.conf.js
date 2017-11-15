const path = require('path');
const webpackConfig = require('./webpack.config.test');

const entry = './test/index.js';
const coverageThreshold = 95;

module.exports = config => config.set({
    basePath: '',
    singleRun: true,
    frameworks: ['mocha'],
    reporters: ['spec', 'threshold'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout : 120000,
    browserNoActivityTimeout : 120000,

    files: [entry],
    exclude: [],
    preprocessors: {
        [entry]: ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
        noInfo: true,
        stats: 'errors-only',
    },

    coverageReporter: {
        dir : 'coverage/',
        reporters: [
            { type: 'lcov', subdir: '.' },
            { type: 'text-summary' },
        ],
    },

    thresholdReporter: {
        statements: coverageThreshold,
        branches: coverageThreshold,
        functions: coverageThreshold,
        lines: coverageThreshold,
    },

    plugins: [
        'karma-sourcemap-loader',
        'karma-phantomjs-launcher',
        'karma-mocha',
        'karma-spec-reporter',
        'karma-coverage',
        'karma-threshold-reporter',
        'karma-webpack',
    ],
});
