import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';

Vue.config.productionTip = false;

export async function createApp({
  beforeApp = ({}) => {},
  afterApp = ({}) => {}
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
