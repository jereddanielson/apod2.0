const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(
    common,
    {
        mode: 'development',
        devtool: 'inline-source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
        devServer: {
            contentBase: './dist',
            hot: true,
        },
    }
);
