import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import autoprefixer from 'autoprefixer';
import CompressionPlugin from 'compression-webpack-plugin';

const env = process.env.NODE_ENV || 'development';

let plugins = [
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new ExtractTextPlugin({
                    filename: 'styles.css',
                    allChunks: true
                }),
                new HtmlWebpackPlugin({
                    template: './src/index.html'
                })
              ]

if (env === 'PRODUCTION') {
    plugins.push(
        new UglifyJsPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new CompressionPlugin({
            asset: "build.gz.js",
            algorithm: "gzip",
            test: /\.js/,
            threshold: 1024,
            minRatio: 0.8
        })
    );
}

const config = {
    entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'build.js'
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.sass$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                              plugins: () => autoprefixer({
                                browsers: ['last 3 versions', '> 1%']
                              })
                            }
                        },
                        'sass-loader'
                ]
                }))
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/'
                        }
                    },
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

export default config;