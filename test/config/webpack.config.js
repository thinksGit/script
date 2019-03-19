const path = require('path');
const entryAndPlug = require('./entry.js');
let entry = entryAndPlug.entrys();
let plugs = entryAndPlug.plugins();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let dist = "../public";
module.exports = {
    entry: entry,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, dist)
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: plugs,
};