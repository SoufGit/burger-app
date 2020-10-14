
const common = require('./webpack.common');
const merge = require('webpack-merge');
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ],
    devtool: 'cheap-module-eval-source-map',
    mode: 'development', //process.env.NODE_ENV,
});

module.exports = devConfig;