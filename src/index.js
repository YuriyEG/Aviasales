import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/AppAviasales';
import AppAviasales from '../src/AppAviasales';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import getAll from './store/actions';
import store from './store/store';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

       
          <AppAviasales store={store}/>
    </Provider>


  </React.StrictMode>
);


