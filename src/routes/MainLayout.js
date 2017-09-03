import React from 'react';
import {connect} from 'dva';
import './MainLayout.css';
import {Layout, Menu, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';

const {Header, Content, Footer} = Layout;


function MainLayout(props) {

  const {children} = props;


  return (
    <Layout className="layout">
      <Header>
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{lineHeight: '64px'}}
        >
          <Menu.Item key="1">任务管理</Menu.Item>
        </Menu>
      </Header>
      {children}

      <Footer style={{textAlign: 'center'}}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  );
}


export default connect()(MainLayout);
