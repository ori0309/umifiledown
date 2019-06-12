import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'cart', ...(require('/Users/chenshaoxin/Documents/umi/umifiledown/src/models/cart.js').default) });
app.model({ namespace: 'user', ...(require('/Users/chenshaoxin/Documents/umi/umifiledown/src/models/user.js').default) });
