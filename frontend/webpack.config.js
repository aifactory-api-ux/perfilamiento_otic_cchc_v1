const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "PerfilamientoOTIC.js"),
  output: {
    filename: "perfilamiento-otic.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "system"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  externals: ["react", "react-dom"]
};
