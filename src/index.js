import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';

import { createStore } from 'redux';
import allReducers from './reducers/index';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { Provider } from 'react-redux';


const store = createStore(
  allReducers,
  devToolsEnhancer()
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

