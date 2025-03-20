const path = require('path');
//import path from 'path';

module.exports = {
    entry: {
        'main': './index.ts',
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: './bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node-modules/,
            use: 'ts-loader',
        }]
    },
    resolve: {
        extensions: ['.ts']
    }
}
