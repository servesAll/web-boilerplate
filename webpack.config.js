const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var apiHost;

const setupApi = function(){
    switch(process.env.NODE_ENV) {
        case 'prod':
            apiHost = "'https://api.servesall.com/'";
            break;
        case 'dev':
            apiHost = "'http://sa-dev-api.eu-west-1.elasticbeanstalk.com/'";
            break;
        default:
            apiHost = "'http://localhost:3000/'";
    }
};

setupApi();

const VENDOR_LIBS = [
    'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk'
];

const config = {
    entry: {
        bundle: './src/app.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx'],
    },
    devServer:{
        historyApiFallback: true,
        contentBase: 'build'
    },
    node: {
        net: 'mock',
        dns: 'mock',
        fs: 'empty'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js|.jsx?$/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader:  'url-loader',
                        options: { limit: 40000 }
                    },
                    {
                        loader:  'image-webpack-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
            _API_: apiHost,
        })
    ]
};

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'dev') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    );
}

module.exports = config;
