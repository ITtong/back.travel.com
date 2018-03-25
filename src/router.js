import React from 'react';
import { Router, Route } from 'dva/router';
import ManLayout from './ManLayout/Index';
import ActiveList from './routes/ActiveList/Index';
import ActiveNewCreate from './routes/ActiveNewCreate/Index';
import LeaderList from './routes/LeaderList/Index';
import LeaderNewCreate from './routes/LeaderNewCreate/Index';
import ApplicantList from './routes/ApplicantList/Index';
import ShoppingMsgList from './routes/ShoppingMsgList/Index'; //李碧玉

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={ManLayout} >
      	<Route path='ActiveList' component={ActiveList} />
        <Route path='ActiveNewCreate' component={ActiveNewCreate} />
        <Route path='LeaderList' component={LeaderList} />
        <Route path='LeaderNewCreate' component={LeaderNewCreate} />
        <Route path='ApplicantList' component={ApplicantList} />
        <Route path='ShoppingMsgList' component={ShoppingMsgList} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
