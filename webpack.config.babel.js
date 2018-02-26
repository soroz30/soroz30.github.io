import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const env = process.env.NODE_ENV || 'development';

let plugins = [
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new ExtractTextPlugin('styles.css'),
                new HtmlWebpackPlugin({
                    template: './src/index.html'
                })
    ]

if (env === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        }),
        new OptimizeCssAssetsPlugin()
    );
}

const config = {
    entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'build.js'
    },
    devServer: {
        contentBase: './',
        hot: true
    },
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
                        { loader: 'sass-loader' }
                    ]
                }))
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                            progressive: true,
                            quality: 80
                            }
                        }
                    },
                    ],
                }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.sass', '.jpeg', '.jpg', '.gif', '.png'],
        alias: {
            stylesheets: path.resolve(__dirname, 'src/stylesheets')
        }
    }
}

module.exports = config;
