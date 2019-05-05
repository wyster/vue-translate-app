module.exports = {
  lintOnSave: false,
  pwa: {
    name: 'My App',
    themeColor: '#1d1d1d',
    msTileColor: '#ffffff'
  },
  configureWebpack: {
    devtool: 'source-map',
    entry: {
      main: './src/entry-client.ts'
    }
  },
  pluginOptions: {
    ssr: {
      templatePath: './dist/index.ssr.html'
    }
  }
};
