import React from 'react';
import { HashRouter, NavLink, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Icon, Typography } from 'antd';
import Home from '../Img/home.jpg';
import Logo from '../Img/logo.png';
import '../Style/page.css';
import SneakerTable from './SneakerTable';
import Report from './Report';
import '../Style/page.css';

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
      <HashRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo"><img src={Logo} /></div>

            <Menu theme="dark" mode="inline">
              <Menu.Item key="1" className="customclass">
                <NavLink exact to="/" activeClassName="selected-item">
                  <Icon type="file" />
                  <span>首页</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2" className="customclass">
                <NavLink to="/sneakers" activeClassName="selected-item">
                  <Icon type="desktop" />
                  <span>录入</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3" className="customclass">
                <NavLink to="/report" activeClassName="selected-item">
                  <Icon type="pie-chart" />
                  <span>报告</span>
                </NavLink>
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
                <Switch>
                  <Route exact path="/sneakers" render={() => {
                    return (
                      <SneakerTable></SneakerTable>
                    )
                  }} />

                  <Route exact path="/report" render={() => {
                    return (
                      <Report></Report>
                    )
                  }} />

                  <Route exact path="/" render={() => {
                    return (
                      <div className="home-img">
                        <img src={Home} />
                        <h1>欢迎欢迎！热烈欢迎！</h1>
                      </div>
                    )
                  }} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2020 Created by Zengwei Xu</Footer>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default Page;