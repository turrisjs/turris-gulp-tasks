var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');

module.exports = function(config) {
    return gulp
        .src(config.testEntryPoint)
        .pipe(mocha({
            compilers: 'jsx?:babel/register',
        }));
};
