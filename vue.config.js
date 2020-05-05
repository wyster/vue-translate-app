// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: path.resolve(__dirname, './src/entry-client.ts'),
      template: parseInt(process.env.VUE_APP_SSR)
        ? 'public/index.ssr.html'
        : 'public/index.html'
    }
  },
  pwa: {
    name: 'My App',
    themeColor: '#1d1d1d',
    msTileColor: '#ffffff'
  },
  chainWebpack: config => {
    config.plugin('dotenv').use(DotenvPlugin, [{ sample: './.env.dist' }]);
    config.resolve.alias.set('@libs', path.resolve(__dirname, 'lib'));
  },
  configureWebpack: config => {
    config.devtool = 'source-map';
  }
};
