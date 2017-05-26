var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    "tests": './test/page/entry.js'
  },
  output: {
    path: path.resolve(__dirname, '../test/page/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('app/module')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('app/module')]
      }
    ]
  }
}
