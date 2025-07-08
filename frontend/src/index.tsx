import { createRoot } from 'react-dom/client';
import App from 'components/App';
import { unstableSetRender, setDefaultConfig } from 'antd-mobile'; // Support since version ^5.40.0
import { store } from './app/store';
import { Provider } from 'react-redux';
import enUS from 'antd-mobile/es/locales/en-US';

// The default one is 'zh-CN'
setDefaultConfig({
  locale: enUS
});

// Add type declaration for _reactRoot
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
      <App />
    </Provider>
  );
} else {
  throw new Error('Root container with id "root" not found');
}
