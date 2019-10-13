const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        merchant: './src/merchant.ts',
        customer: './src/customer.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist/'
    }
};
