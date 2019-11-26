const resolve = require("path").resolve;
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const getPages = require("./libs/getPages");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: resolve(__dirname, "src/index.js"),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.js"
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ["css-loader"]
      }
    ]
  },
  devServer: {
    contentBase: resolve(__dirname, "dist"),
    watchContentBase: true,
    compress: true,
    port: 8080
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...getPages(),
    new HtmlWebpackHarddiskPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, "src/assets"),
        to: resolve(__dirname, "dist/assets"),
        ignore: []
      }
    ])
  ]
};
