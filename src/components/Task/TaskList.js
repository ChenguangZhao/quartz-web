import React from 'react';
import  './TaskList.css';
import {Table, Tag, Icon, Modal} from 'antd'
import {connect} from 'dva';
import moment from 'moment';
import EditTaskModal from './EditTaskModal';

const format = 'YYYY-MM-DD HH:mm:ss';

function TaskList(props) {

  const {dispatch} = props;

  function handlePauseJob(job) {
    Modal.confirm({
      title: 'Confirm',
      content: 'pause this job?',
      okText: 'sure',
      cancelText: 'cancel',
      onOk: function () {
        dispatch({
          type: 'task/pauseJob',
          payload: job
        })
      }
    });
  };

  function handleResumeJob(job) {
    Modal.confirm({
      title: 'Confirm',
      content: 'resume this job?',
      okText: 'sure',
      cancelText: 'cancel',
      onOk: function () {
        dispatch({
          type: 'task/resumeJob',
          payload: job
        })
      }
    });
  }

  const {jobList} = props.task;

  const columns = [{
    title: 'job name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: 'cron expression',
    dataIndex: 'cronExpression',
    key: 'cronExpression',
  }, {
    title: 'prev time',
    dataIndex: 'prevFireTime',
    key: 'prevFireTime',
    render: (value, record) => {
      return moment(new Date(value)).format(format);
    }
  }, {
    title: 'next time',
    dataIndex: 'nextFireTime',
    key: 'nextFireTime',
    render: (value, record) => {
      return moment(new Date(value)).format(format);
    }
  }, {
    title: 'trigger state',
    dataIndex: 'triggerState',
    key: 'triggerState',
    render: (value, record) => {
      if (value === 'ACQUIRED' || value === 'WAITING')
        return <Tag color="#87d068">ACQUIRED</Tag>
      else if (value === 'PAUSED') {
        return <Tag color="#2db7f5">{value}</Tag>
      } else {
        return value;
      }
    }
  }, {
    title: 'option',
    dataIndex: 'option',
    key: 'option',
    render: (value, record) => {
      if (record.triggerState !== 'PAUSED') {
        return <p>
          <a onClick={() => {
            handlePauseJob(record);
          }}><Icon type="pause"/>暂停</a>
          &nbsp;&nbsp;
          <EditTaskModal job={record}/>

        </p>
      } else {
        return <p><a onClick={() => {
          handleResumeJob(record);
        }}><Icon type="play-circle-o"/>恢复</a>
          &nbsp;&nbsp;
          <EditTaskModal job={record}/>
        </p>
      }
    }
  }];

  return (
    <Table style={{marginTop: 10}}
           dataSource={jobList} columns={columns}/>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TaskList);
