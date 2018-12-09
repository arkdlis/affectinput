const pkg = require('./package.json');

let libraryName = pkg.name;

module.exports = {
  entry: './src/app.js',
  output: {
      path: `${__dirname}/dist/js`,
      filename: 'bundle.js',
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: "typeof self !== 'undefined' ? self : this"
  },
  watch: true,
  mode: "development", //ta opcja zostanie pominięta jeżeli użyjemy npm run build
  devtool: "source-map",
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
              }
          }
      ]
  }
}