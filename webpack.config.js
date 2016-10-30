var webpack = require('webpack');
var path = require('path');

var params = {
    libName: 'TaskTimer',
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};
params.libFile = params.libName.toLowerCase() + '.js';
params.libMinFile = params.libName.toLowerCase() + '.min.js';

// Webpack configuration
// http://webpack.github.io/docs/configuration.html
var options = {
    cache: false,
    entry: path.join(params.src, 'tasktimer.js'),
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: 'source-map',
    // devtool: 'eval',
    target: 'web',
    output: {
        path: params.dist,
        filename: params.libFile,
        library: params.libName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        publicPath: '/dist'
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                    // , plugins: [
                    //     ['babel-plugin-transform-builtin-extend', {
                    //         globals: ['Error', 'Array']
                    //     }]
                    // ]
                },
                exclude: /(node_modules)/
            }
        ]
    },
    resolve: {
        root: params.src,
        extensions: ['', '.js']
    },
    // Whether to show progress. Defaults to `true`.
    progress: false,
    // Configure the console output.
    stats: {
        colors: true,
        modules: false,
        reasons: true
    },
    // Whether to report error to grunt if webpack find errors. Use
    // this if webpack errors are tolerable and grunt should
    // continue.
    failOnError: true,
    // Use webpacks watcher. Requires the grunt process
    // to be kept alive.
    watch: false,
    // Whether to finish the grunt task. Use this in combination
    // with the watch option.
    keepalive: false,
    // Whether to embed the webpack-dev-server runtime into the
    // bundle. Defaults to `false`.
    inline: false
};

module.exports = {
    options: options,
    watch: {
        watch: true,
        keepalive: true
    },
    full: {},
    min: {
        output: {
            filename: params.libMinFile
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            })
        ]
    }
};
