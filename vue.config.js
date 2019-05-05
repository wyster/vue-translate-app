// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

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
  }
};
