import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import Reducer from './Reducer'

// creating a redux store using createStore method ****** deprecated******
//import { createStore } from 'redux';
//const store = createStore(Reducer);

// creating a redux store using configureStore method from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
const store= configureStore({reducer: Reducer})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
