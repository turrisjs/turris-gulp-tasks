var ESDoc = require('esdoc');
var defaultPublisher = require('esdoc/out/src/Publisher/publish');

module.exports = function(config) {
    var configFile = require(config.esdocConfig);
    return ESDoc.generate(configFile, defaultPublisher);
};
