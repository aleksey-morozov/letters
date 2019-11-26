'use strict';

const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main:   './src/js/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    devtool: "source-map",
    watchOptions: {
        aggregateTimeout: 100,
    },
};
