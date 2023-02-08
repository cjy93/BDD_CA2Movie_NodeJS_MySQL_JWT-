
// webpack.config.js

const { ProvidePlugin } = require('webpack'); // Remember to import
module.exports = {
    entry: {
        App_ca2: './output/App_Assignment2_P7337992.js'
    },
    output: {
        // default output to ./dist folder
        filename: '[name].js', // Retain original file name
    },
    devServer: {
        static: {
            directory: __dirname,
        },
        compress: true,
        port: 5501
        // no publicPath
        // port on server is 5501
    },
    mode: 'development',
    watch: true,
    // add rules to enable import css based on :https://blog.jakoblind.no/css-modules-webpack/ 
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/,
    //             loader: [
    //                 'style-loader',
    //                 'css-loader'
    //             ],
    //             options: {
    //                 import: true,
    //             }
    //         }
    //     ]
    // },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    // Add plugins
    plugins: [
        new ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom/client'
        }),
    ],

};