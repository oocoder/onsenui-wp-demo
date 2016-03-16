var path = require('path');
var srcPath = path.resolve('src');
var outputPath = path.resolve('public');

module.exports = {
    context: srcPath,
    entry: 'main.js',
    devtool: 'sourcemap',
    output: {
        path: outputPath,
        filename: 'bundle.js'
    },
    resolve: {
        root: srcPath
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel?compact=false&presets[]=es2015-min' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.css$/, loader: "style-loader!css-loader?name=assets/[hash].[ext]" }, 
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
              loader: "url-loader?limit=10240&minetype=application/font-woff&name=assets/[hash].[ext]" },
            { test: /\.img$/, loader: "file?name=assets/[name].png" },
            { test: /\.(png|jpg)$/, loader: "file?name=assets/[hash].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=assets/[hash].[ext]" }
              
        ]
    }    
};
