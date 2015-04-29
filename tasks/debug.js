var gutil = require('gulp-util');
var webpack = require('webpack');
var definePlugin = require('../util/definePlugin');

module.exports = function(config) {
    var wpConfig = config.webpackConfig.debug;
    // use production optimizations
    var optimizations = [
        definePlugin,
    ];
    if (wpConfig.plugins) {
        wpConfig.plugins = wpConfig.plugins.concat(optimizations);
    } else {
        wpConfig.plugins = optimizations;
    }
    // run webpack
    var compiler = webpack(wpConfig);
    compiler.watch(200, function(err, stats) {
        if (err) {
            gutil.log('[webpack-error]', err.toString());
            return;
        }
        // log result
        gutil.log('[webpack]', stats.toString({
            chunks: false,
            colors: true,
        }));
    });
};
