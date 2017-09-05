import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ManLayout from './ManLayout/Index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={ManLayout} />
    </Router>
  );
}

export default RouterConfig;
