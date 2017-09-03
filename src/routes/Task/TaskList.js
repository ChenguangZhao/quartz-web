import React from 'react';
import {connect} from 'dva';
import {Layout, Breadcrumb, Button} from 'antd';
import ListComponent from '../../components/Task/TaskList';
import AddTaskModal from '../../components/Task/AddTaskModal';
import  './TaskList.css';

const {Content} = Layout;
function TaskList() {


  return (
    <div>
      <Breadcrumb style={{margin: '12px 16px'}}>
        <Breadcrumb.Item>任务管理</Breadcrumb.Item>
        <Breadcrumb.Item>任务列表</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{fontFamily: '微软雅黑', margin: '0 16px', padding: 24, background: '#fff', minHeight: 680}}>
        <AddTaskModal/>
        <ListComponent />
      </Content>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(TaskList);
