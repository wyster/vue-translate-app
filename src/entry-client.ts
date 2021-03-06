/* eslint-disable */
import { loadAsyncComponents } from '@akryum/vue-cli-plugin-ssr/client';
import './registerServiceWorker';

import { createApp } from './main';

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}

createApp({
  async beforeApp({ router }) {
    await loadAsyncComponents({ router });
  },

  afterApp({ app, store }) {
    if (window.__INITIAL_STATE__) {
      store.replaceState(window.__INITIAL_STATE__);
    }
    app.$mount('#app');
  }
});
