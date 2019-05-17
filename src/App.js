import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import history from './routers/AppRouter';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/default.css';

const historyMiddleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// import '../public/assets/css/reset.css';

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(historyMiddleware, thunk))
);

export default () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
