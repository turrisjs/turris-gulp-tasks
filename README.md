# [Turris.js](https://github.com/turrisjs) common gulp tasks

Provides basic gulp tasks for all your ES6 React applications and component needs.  

### Included things

- `build` - compiles optimized (minified, deduped) commonjs version of your component with [Webpack](http://webpack.github.io/). Uses `config.webpackConfig.production` as configuration.
- `debug` - compiles debug version of your component with Webpack, watches for changes and re-compiles when needed (until interrupted). Uses `config.webpackConfig.debug` as configuration.
- `server` - uses [express.js](http://expressjs.com/) to statically serve folder specified in `config.path` at `localhost:8080`. Serves `index.html` for all non-existent requests to allow client-side routing. Allows access to express.js and express app via `config.serverOverrides(app, express)` function.
- `test` - runs [mocha](http://mochajs.org/) tests starting from file specified at `config.testEntryPoint`.
- `cover` - runs [istanbul](https://gotwarlost.github.io/istanbul/) to generate test coverage from file specified at `config.testEntryPoint`.

### Installation

Package can be installed using NPM:  
`npm install turris-gulp-tasks`

### Usage

Install, create a `gulpfile.js` in your project folder with the following code:
```js
var gulp = require('turris-gulp-tasks')([
    'serve',
    'build',
    'debug',
    'test',
    'cover',
], require('./buildConfig.js'));
// load your custom tasks here
require('./gulp/my-task.js')(gulp);

gulp.task('default', ['debug', 'serve']);
gulp.task('test', ['test', 'cover']);
```

Build config file should example can be found below:
```js
var path = require('path');

module.exports = {
    path: path.resolve(__dirname),
    rootPath: path.resolve(__dirname),
    webpackConfig: {
        debug: require('./webpack.config.js'),
        production: require('./webpack.config.prod.js'),
    },
    serverOverrides: function(app, express) {
        app.use(express.static(path.join(__dirname, 'dist')));
    },
    serverStart: function(server) {
        injectMyCode(server); // add things on top of server, e.g. websockets server
    },
};
```

### License

[MIT](http://opensource.org/licenses/MIT)
