import React from 'react';
import { Router, Route } from 'dva/router';
import ManLayout from './ManLayout/Index';
import ListView from './routes/ListView/Index';
import ActiveNewCreate from './routes/ActiveNewCreate/Index';
import LeaderList from './routes/LeaderList/Index';
import LeaderNewCreate from './routes/LeaderNewCreate/Index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={ManLayout} >
      	<Route path='ActiveList' component={ListView} />
        <Route path='ActiveNewCreate' component={ActiveNewCreate} />
        <Route path='LeaderList' component={LeaderList} />
        <Route path='LeaderNewCreate' component={LeaderNewCreate} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
