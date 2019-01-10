const path = require('path');

module.exports = {
  entry: './src/lib/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    libraryTarget: 'umd',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: [path.join(__dirname, 'src/demo'), path.join(__dirname, 'dist')],
    watchContentBase: true,
    port: 9000
  }
};
