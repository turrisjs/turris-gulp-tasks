var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// We need to add a configuration to our proxy server,
// as we are now proxying outside localhost
var proxy = httpProxy.createProxyServer({
    changeOrigin: true
});

// configure server
var server = express();

module.exports = function(config) {
    console.log(config);
    var path = config.path;
    var proxies = config.webpackConfig.debug.proxies;
    var port = 8080;
    // parse request bodies (req.body)
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: true}));
    // support _method (PUT in forms etc)
    server.use(methodOverride());
    // prepare
    server.use(express.static(path));
    // apply overrides if any are present
    if (config.serverOverrides) {
        config.serverOverrides(server, express);
    }
    // configure proxies if any are present
    for (var i = 0, len = proxies ? proxies.length : 0; i < len; i++) {
        var url = proxies[i].target;
        server.all(proxies[i].path, function (req, res) {
            console.log('proxying', req.url);
            proxy.web(req, res, {
                target: url
            });
        });
    }
    // server rest as default
    server.get('*', function(req, res) {
        res.sendFile('/index.html', {root: path});
    });

    proxy.on('error', function(e) {
        console.log('Could not connect to proxy, please try again...');
    });

    // start nodemon
    var serverInstance = server.listen(port, function () {
        console.log('Server running on port ' + port);
    });
    // apply server start override if present
    if (config.serverStart) {
        config.serverStart(serverInstance);
    }
    return serverInstance;
};
