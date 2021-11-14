var path = require("path");
 
module.exports = {
  entry: "./src/createKeyframes.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch:true,
  target:['web', 'es6'],
  mode:'development'
};