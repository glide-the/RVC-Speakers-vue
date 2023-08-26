const plugins = [
  '@vue/babel-plugin-transform-vue-jsx',
  '@babel/plugin-proposal-optional-chaining'
]
// 生产环境移除console
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}
//开发环境增加异步模块加载
if (process.env.NODE_ENV === 'development') {
  plugins.push('dynamic-import-node')
}
module.exports = {
  plugins: plugins,
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ]
}
