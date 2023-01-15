
// webpack.config.js
module.exports = {
    entry: {
        App: './output/App_Assignment1_P7337992.js',
    },
    output: {
        // default output to ./dist folder
        filename: '[name].js', // Retain original file name
    },
    mode: 'development',
    watch: true,
    // add rules to enable import css based on :https://blog.jakoblind.no/css-modules-webpack/ 
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }

};