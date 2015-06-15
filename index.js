var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var applyDefaults = require('./util/webpack.defaults');

// get all tasks
var tasksPath = path.join(__dirname, 'tasks');
var allTasks = fs.readdirSync(tasksPath).map(function(file) { return file.replace('.js', ''); });

module.exports = function(config) {
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
    allTasks.forEach(function(name) {
        var task = require('./tasks/' + name).bind(this, config);
        if (task.deps) {
            gulp.task(name, task.deps, task.work);
        } else {
            gulp.task(name, task);
        }
    });

    return gulp;
};
