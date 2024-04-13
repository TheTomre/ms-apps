import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

const root = document.getElementById('root');
createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);