var WebpackDevServer = require('webpack-dev-server');
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
    // get server config
    var proxy = {};
    if (config.devServer && config.devServer.proxy) {
        proxy = config.devServer.proxy;
        if (!proxy['/api']) {
            proxy['/api'] = 'http://localhost:8081';
        }
    } else {
        proxy = {'/api': 'http://localhost:8081'};
    }
    var headers = {};
    if (config.devServer && config.devServer.headers) {
        headers = config.devServer.headers;
    }
    // run webpack
    var compiler = webpack(wpConfig);
    var server = new WebpackDevServer(compiler, {
        // webpack-dev-server options
        contentBase: wpConfig.context,
        // or: contentBase: "http://localhost/",

        hot: true,
        // Enable special support for Hot Module Replacement
        // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
        // Use "webpack/hot/dev-server" as additional module in your entry point
        // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

        // webpack-dev-middleware options
        quiet: false,
        noInfo: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
        headers: headers,
        stats: {
            chunks: false,
            colors: true,
        },
        // Set this as true if you want to access dev server from arbitrary url.
        // This is handy if you are using a html5 router.
        historyApiFallback: true,
        // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
        // Use "*" to proxy all paths to the specified server.
        // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
        // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
        proxy: proxy
    });
    server.listen(8080, 'localhost', function() {
        console.log('Webpack-Dev-Server: started on port 8080');
    });
};
