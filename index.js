var gulp = require('gulp');
var applyDefaults = require('./util/webpack.defaults');

module.exports = function(tasks, config) {
    // default config to object
    config = config || {};
    // extend config
    if (config.webpackConfig) {
        if (config.webpackConfig.debug) {
            config.webpackConfig.debug = applyDefaults(config.webpackConfig.debug);
        }
        if (config.webpackConfig.production) {
            config.webpackConfig.production = applyDefaults(config.webpackConfig.production);
        }
    }
    // process tasks
    tasks.forEach(function(name) {
        var task = require('./tasks/' + name).bind(this, config);
        if (task.deps) {
            gulp.task(name, task.deps, task.work);
        } else {
            gulp.task(name, task);
        }
    });

    return gulp;
};
