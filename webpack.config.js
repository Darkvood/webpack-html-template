const resolve = require("path").resolve;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const getPages = require("./libs/getPages");

const mode = process.env.NODE_ENV;

module.exports = {
  mode,
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
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
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
    new MiniCssExtractPlugin({
      filename: "assets/styles/main.css"
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, "src/static"),
        to: resolve(__dirname, "dist/static")
      },
      {
        from: resolve(__dirname, "src/layout/favicon.ico"),
        to: resolve(__dirname, "dist/favicon.ico")
      }
    ])
  ]
};
