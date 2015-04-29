/* jshint node:true */
var express = require('express');

// configure server
var server = express();

module.exports = function(config) {
    var path = config.path;
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
    return server.listen(8080);
};
