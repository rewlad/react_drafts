
// use `npm outdated`

var HtmlWebpackPlugin = require('html-webpack-plugin')

function config(name) {
    return {
        entry: "./src/"+name+".js",
        output: {
            path: "build",
            filename: name + ".js"
        },
        module: { rules: [
            {
                test: /.*\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            }
        ]},
        plugins: [new HtmlWebpackPlugin({
            filename: name + ".html",
            title: name,
            hash: true,
            favicon: "./src/favicon.png"
        })],
        devtool: "source-map"
    }
}

module.exports = [
    config("test")
]
