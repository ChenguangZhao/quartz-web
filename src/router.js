import React from 'react';
import {Router, Route} from 'dva/router';
import MainLayout from './routes/MainLayout';
import TaskList from './routes/Task/TaskList';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <Route path="/task/" component={TaskList}/>
        <Route path="/task/taskList" component={TaskList}/>
      </Route>
    </Router>
  );
}

export default RouterConfig;
