const VueLoaderPlugin = require("vue-loader/lib/plugin");
const merge = require("webpack-merge");
const path = require("path");


const commonConfig = {
    output : {
        path: path.resolve(__dirname + "/dist/")
    },
    module : {
        rules: [
            {
                test : /\.vue$/,
                loader : 'vue-loader'
            },
            {
                test : /\.js$/,
                loader: "babel-loader",
                exclude : /node_moduldes/
            }, 
            {
                test: /\.css$/,
                use : [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = [
    merge(commonConfig, {
        entry: path.resolve(__dirname + "/src/Spotlight.vue"),
        output : {
            filename : 'vue-spotlight.js',
            libraryTarget : 'umd',
            library : 'vue-spotlight',
            umdNamedDefine : true
        }
    }),
    merge(commonConfig, {
        entry: path.resolve(__dirname + "/src/plugin.js"),
        output : {
            filename : 'vue-spotlight.min.js',
            library: 'Spotlight',
            libraryTarget : "window"
        }
    })
]
