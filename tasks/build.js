var gutil = require('gulp-util');
var webpack = require('webpack');
var definePlugin = require('../util/definePlugin');

module.exports = function(config, callback) {
    var wpConfig = config.webpackConfig.production;
    // use production optimizations
    var optimizations = [
        definePlugin,
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
               warnings: false,
            },
        }),
    ];
    if (wpConfig.plugins) {
        wpConfig.plugins = wpConfig.plugins.concat(optimizations);
    } else {
        wpConfig.plugins = optimizations;
    }
    // remove linting
    delete wpConfig.module.preLoaders;
    // run webpack
    webpack(wpConfig, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        // only log when errors
        gutil.log('[webpack]: ', stats.toString({
            chunks: false,
            modules: false,
            colors: true,
        }));
        callback();
    });
};
