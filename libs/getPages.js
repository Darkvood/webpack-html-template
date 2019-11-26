const glob = require("glob");
const resolve = require("path").resolve;
const HtmlWebpackPlugin = require("html-webpack-plugin");

function getPages() {
  let pages = glob.sync(resolve(__dirname, "../src/pages/*.html"));

  pages = pages.map(page => {
    const filename = page.match(/pages\/(.*)\.html/)[1];

    return new HtmlWebpackPlugin({
      filename: filename + ".html",
      template: resolve(__dirname, "../src/layout/index.html"),
      alwaysWriteToDisk: true,
      hash: true
    });
  });

  return pages;
}

module.exports = getPages;
