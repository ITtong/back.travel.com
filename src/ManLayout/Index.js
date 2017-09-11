import React from 'react';

import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import './Index.css';

export default class ManLayout extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div id='components-layout-demo-custom-trigger' style={{ height:'100%' }} >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon style={{ float:'left' }} type="user" />
                <a style={{ color:'#fff', float:'left' }} href="#/ActiveList">活动列表</a>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon style={{ float:'left' }} type="video-camera" />
                <a style={{ color:'#fff', float:'left' }} href="#/LeaderList">领队列表</a>
              </Menu.Item>
            </Menu>
          </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="title" >燕客行后台管理系统</div>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, overflow:'auto' }}>{this.props.children}</Content>
        </Layout>
      </Layout>
    </div>
  );
  }
}
