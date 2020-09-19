import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Root from './client/Root';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from '@modules/user';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer
  , composeWithDevTools(applyMiddleware(sagaMiddleware)));

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if(!user) return;

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  }
  catch(e) {
    console.log(e);
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
      <Root />
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();
