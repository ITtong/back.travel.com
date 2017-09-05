import React from 'react';
import { Router, Route } from 'dva/router';
import ManLayout from './ManLayout/Index';
import ListView from './routes/ListView/Index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={ManLayout} >
      	<Route path='Index' component={ListView} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
