
const common = require('./webpack.common');
const merge = require('webpack-merge');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Webpack v4: `MiniCssExtractPlugin` replaces `ExtractTextPlugin` and is specific to CSS
// https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.env.REACT_WEBPACK_ENV = 'prod';
const prodConfig = merge(common, {
    output: {
        //path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.[hash].min.js',
        publicPath: '/dist/'
    },
    plugins: [
        // supprime tous les fichiers du répertoire dist sans pour autant supprimer ce dossier
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].min.css',
        }),
        // analyses the webpack statistics and gives a great visualization
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "../dist/webpack-bundle-analyzer.html",
            openAnalyzer: false,
            defaultSizes: 'gzip'
        })
    ],
    devtool: '',
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                //parallel: true,
                sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
});

module.exports = prodConfig;