import { createRoot } from 'react-dom/client';
import App from 'components/App';
import { unstableSetRender, setDefaultConfig } from 'antd-mobile'; // Support since version ^5.40.0
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import enUS from 'antd-mobile/es/locales/en-US';

import { store, persistor } from 'app/store';

// The default setting of antd-mobile is 'zh-CN'
setDefaultConfig({
  locale: enUS
});

// antd-mobile v5 compatibility. Add type declaration for _reactRoot
declare global {
  interface Element {
    _reactRoot?: ReturnType<typeof createRoot>;
  }

  interface DocumentFragment {
    _reactRoot?: ReturnType<typeof createRoot>;
  }
}

// antd-mobile v5 compatibility with React 19
unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

const container = document.getElementById('root') as HTMLDivElement;

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
} else {
  throw new Error('Root container with id "root" not found');
}
