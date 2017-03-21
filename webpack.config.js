const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'eval',
    entry: './ui/index.js',
    output: {
        publicPath: '/static/',
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
            {
                // สำหรับไฟล์นามสกุล css ให้ใช้ Loader สองตัวคือ css-loader และ style-loader
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // ใช้ Loader สามตัวสำหรับ scss
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            sourceMap: true,
                            module: true,
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                            sourceMap: true
                        }
                    },
                    'postcss-loader' // เพิ่ม postcss
                ]
            }
        ]
    },
    // postcss: function () {
    //     return [autoprefixer]; // สั่งให้ autoprefix ให้เรา
    // }
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } })
    ],
    devServer: {
      historyApiFallback: true
    }
};