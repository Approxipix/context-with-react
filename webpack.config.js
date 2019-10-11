const path = require('path');

module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    output: {
        path:__dirname+ '/dist/',
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        inline: false,
        contentBase: "./dist",
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};
