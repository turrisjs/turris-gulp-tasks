var path = require('path');
var _ = require('lodash');

var applyDefaults = function(cfg) {
    // extend config
    return _.merge(cfg, {
        resolveLoader: {
            root: path.join(__dirname, '..', 'node_modules'),
        },
        resolve: {
            packageMains: ['style', 'main'],
            extensions: ['', '.js', '.jsx'],
            modulesDirectories: ['node_modules'],
        },
        node: {
            fs: 'empty',
        },
        eslint: {
            configFile: path.join(__dirname, '..', 'rules', 'eslintrc'),
        },
        module: {
            preLoaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader'
                },
            ],
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css'],
                },
                {
                    test: /\.json$/,
                    loader: 'json',
                },
                {
                    test: /\.less$/,
                    loaders: ['style', 'css', 'less'],
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                },
                {
                    test: /\.woff\d?(\?.+)?$/,
                    loader: 'url?limit=10000&minetype=application/font-woff',
                },
                {
                    test: /\.ttf(\?.+)?$/,
                    loader: 'url?limit=10000&minetype=application/octet-stream',
                },
                {
                    test: /\.eot(\?.+)?$/,
                    loader: 'file',
                },
                {
                    test: /\.svg(\?.+)?$/,
                    loader: 'url?limit=10000&minetype=image/svg+xml',
                },
                {
                    test: /\.png$/,
                    loader: 'url-loader?limit=10000&mimetype=image/png',
                },
            ],
        },
    }, function(a, b) {
        if (_.isArray(a)) {
            return a.concat(b);
        }
    });
};

module.exports = applyDefaults;
