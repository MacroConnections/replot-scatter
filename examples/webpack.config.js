module.exports = function () {
  return {
    entry: {
      example: "./example.jsx",
      circle_size: "./example_circle_size.jsx",
      filter: "./example_filter.jsx",
    },
    output: {
      path: __dirname + "/static",
      filename: "[name]bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: "babel-loader",
          query: {
            "presets": ["es2015", "react"]
          }
        }
      ]
    }
  }
};
