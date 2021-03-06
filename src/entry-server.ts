/* eslint-disable */
import { createApp } from './main';

interface Context {
  url: string;
  state: object;
}

export default (context: Context) => {
  return new Promise(async (resolve, reject) => {
    const { app, router, store } = await createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      Promise.all([
        // Async data
        ...matchedComponents.map((Component: any) => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            });
          }
        })
      ]).then(() => {
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        context.state = store.state;

        resolve(app);
      });
    }, reject);
  });
};
