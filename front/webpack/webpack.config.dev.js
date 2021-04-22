const common = require('./webpack.common');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
// Webpack v4: `MiniCssExtractPlugin` replaces `ExtractTextPlugin` and is specific to CSS
// https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
process.env.REACT_WEBPACK_ENV = 'dev';
let devConfig = merge(common, {
    output: {
        //path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({isDebugModeEnabled: true}),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ],
    devtool: 'eval-cheap-module-source-map',
    mode: 'development', //process.env.NODE_ENV,
});

module.exports = devConfig;