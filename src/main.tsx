import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Додано
import { store } from './store/store';  // Додано
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);