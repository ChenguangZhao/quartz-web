import * as taskService from '../services/task';
import {message} from 'antd';

export default {
  namespace: 'task',
  state: {
    jobList: []
  },
  reducers: {
    initSuccess(state, action) {
      return {...state, ...action.payload};
    }
  },
  effects: {
    * addJob({payload: values}, {call, put}) {
      const result = yield call(taskService.addJob, values);
      if (result.code === 0) {
        message.success("success");
        yield put({type: 'initList'});
      } else {
        message.error(result.message)
      }
    },
    * initList({}, {call, put}) {
      const result = yield call(taskService.queryJob);
      if (result.code === 0) {
        yield put({
          type: 'initSuccess',
          payload: {
            jobList: result.data,
          },
        });
      } else {
        message.error(result.message)
      }
    },
    *pauseJob({payload: values}, {call, put}) {
      const result = yield call(taskService.pauseJob, values);
      if (result.code === 0) {
        message.success("success");
        yield put({type: 'initList'});
      } else {
        message.error(result.message)
      }
    },
    *resumeJob({payload: values}, {call, put}) {
      const result = yield call(taskService.resumeJob, values);
      if (result.code === 0) {
        message.success("success");
        yield put({type: 'initList'});
      } else {
        message.error(result.message)
      }
    },
    *rescheduleJob({payload: values}, {call, put}) {
      const result = yield call(taskService.rescheduleJob, values);
      if (result.code === 0) {
        message.success("success");
        yield put({type: 'initList'});
      } else {
        message.error(result.message)
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname.indexOf('/task/taskList') > -1 || location.pathname.indexOf('/task/') > -1) {
          dispatch({
            type: 'initList'
          });
        }
      });
    }
  },
};
