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

app.model({ namespace: 'cart', ...(require('/Users/chenshaoxin/Documents/quan/笔记/13课 项目实践2（2019.2.23）/umi-test/src/models/cart.js').default) });
app.model({ namespace: 'user', ...(require('/Users/chenshaoxin/Documents/quan/笔记/13课 项目实践2（2019.2.23）/umi-test/src/models/user.js').default) });
