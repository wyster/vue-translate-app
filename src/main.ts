import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import Router from 'vue-router';

Vue.config.productionTip = false;

interface BeforeApp {
  router: Router;
  store: any;
}

interface AfterApp {
  router: Router;
  store: any;
  app: Vue;
}

export async function createApp({
  beforeApp = ({  }: BeforeApp) => {},
  afterApp = ({  }: AfterApp) => {}
} = {}) {
  const router = createRouter();
  const store = createStore();

  await beforeApp({
    router,
    store
  });

  const app = new Vue({
    store,
    router,

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    render: h => h(App)
  });

  const result = {
    app,
    router,
    store
  };

  await afterApp(result);

  return result;
}
