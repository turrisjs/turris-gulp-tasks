var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configure server
var server = express();

module.exports = function(config) {
    // parse request bodies (req.body)
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: true}));
    // support _method (PUT in forms etc)
    server.use(methodOverride());
    // apply overrides if any are present
    if (config.serverOverrides) {
        config.serverOverrides(server, express);
    }

    // start nodemon
    var serverInstance = server.listen(8081);
    // apply server start override if present
    if (config.serverStart) {
        config.serverStart(serverInstance);
    }
    return serverInstance;
};
