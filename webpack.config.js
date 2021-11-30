const path = require('path');
const root = process.cwd();

module.exports = () => {
  const config = {
    entry: {
      index: path.resolve(root, 'src', 'js', 'index.js')
    },
    output: {
      path: path.resolve(root, 'build'),
      filename: path.join('js', 'index.js'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  };
  return config;
};
