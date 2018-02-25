import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
    entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.sass$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }))
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Portfolio',
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ]
}

module.exports = config;