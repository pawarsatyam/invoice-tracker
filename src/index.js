import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './index.css'
import App from './App';
import * as serviceWorker from './serviceWorker';


export const history = createHistory();


//  app and admin routes
ReactDOM.render(
  <div>
    
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  
  </div>,
  document.getElementById('root')
);


serviceWorker.unregister();

