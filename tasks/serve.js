var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configure server
var server = express();

module.exports = function(config) {
    var path = config.path;
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
    // server rest as default
    server.get('*', function(req, res) {
        res.sendFile('/index.html', {root: path});
    });

    // start nodemon
    var serverInstance = server.listen(8080);
    // apply server start override if present
    if (config.serverStart) {
        config.serverStart(serverInstance);
    }
    return serverInstance;
};
