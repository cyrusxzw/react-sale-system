import React from 'react';
import { Layout, Menu, Icon, Typography } from 'antd';
import Logo from '../Img/logo.png';
import '../Style/page.css';
import SneakerTable from './SneakerTable';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }

    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse() {
    this.setState(
      {
        collapsed: !this.state.collapsed,
      }
    );
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo"><img src={Logo}/></div>
          
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>统计</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>报告</span>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>其他</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', height: 'auto', padding: '33px' }}>
            <Title level={2} style={{ marginBottom: '0' }}>
              球鞋记账系统
            </Title>
          </Header>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <SneakerTable></SneakerTable>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2020 Created by Zengwei Xu</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Page;