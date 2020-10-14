const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");

// Webpack v4: `MiniCssExtractPlugin` replaces `ExtractTextPlugin` and is specific to CSS
// https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/less/index.less', './src/index.jsx'],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /src/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, '../babel.config.js')
                    },
                }
            },
            {
                test: /\.(css|s[ac]ss|less)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },

                    {
                        loader: "postcss-loader",
                        options: {
                            configFile: path.resolve(__dirname, '../postcss.config.js')
                        }
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:7].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:7].[ext]',
                            outputPath: 'images',
                        },
                    },
                    {
                        loader: 'image-webpack-loader', // minimize img
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        // bonus affichage terminal webpack
        new DashboardPlugin(),
        // supprime tous les fichiers du répertoire dist sans pour autant supprimer ce dossier,
        new CleanWebpackPlugin({
            // Simulate the removal of files
            //  dry: true,
            // Write Logs to Console
            // (Always enabled when dry is true)
            verbose: true,
        }),
        // copie le fichier src/index.html vers dist/index.html 
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //new MiniCssExtractPlugin()
    ],
    resolve: {
        alias: {
            Components: path.resolve(__dirname, '../src/components/'),
            Helpers: path.resolve(__dirname, '../src/helpers/'),
            Store: path.resolve(__dirname, '../src/store/'),
            Test: path.resolve(__dirname, '../src/test/'),
            Utils: path.resolve(__dirname, '../src/utils/'),
        },
        extensions: ['.js', '.jsx', '.json', '.less']
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true,
        port: 3030
    },
    mode: process.env.NODE_ENV,
    watchOptions: {
        ignored: [
            /node_modules/,
            '**/*.bundle.css',
            '**/*.bundle.js',
            '**/*.html',
            '**/*.xml'
        ]
    }
}
















/*const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
// Webpack v4: `MiniCssExtractPlugin` replaces `ExtractTextPlugin` and is specific to CSS
// https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProductionMode = process.env.NODE_ENV === 'production';
const extractCSS = new MiniCssExtractPlugin({
    filename: isProductionMode ? 'css/[name].[contenthash].css' : 'css/[name].css',
});

let config = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /src/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'babel.config.js')
                    },
                }
            },
            {
                test: /\.(css|s[ac]ss|less)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg)$/,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ],
            },
        ]
    },
    output: {
        //path: path.resolve(__dirname, 'dist'),
        filename: isProductionMode ? 'js/[name].bundle.[contenthash].js' : 'js/[name].bundle.js',
    },
    plugins: [
        // bonus affichage terminal webpack
        new DashboardPlugin(),
        // supprime tous les fichiers du répertoire dist sans pour autant supprimer ce dossier,
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist']
        }),
        // copie le fichier src/index.html vers dist/index.html
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        extractCSS
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true,
        port: 3030
    },
    devtool: isProductionMode ? '' : 'eval-source-map',
    mode: process.env.NODE_ENV,
    watchOptions: {*/
//         ignored: [
//             /node_modules/,
//             '**/*.bundle.css',
//             '**/*.bundle.js',
//             '**/*.html',
//             '**/*.xml'
//         ]
//     }
// }

/*if (isProductionMode) {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    config.optimization = {
        minimizer: [new UglifyJSPlugin()],
    };
}

module.exports = config;*/







