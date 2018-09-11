import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim'

const { Content, Sider } = Layout

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout >
            <Sider
            breakpoint="lg"
            collapsedWidth="0"
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text">nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">nav 3</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">nav 4</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '12px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 600 }}>
                        <QueueAnim>
                            <div key="demo1">依次进场</div>
                            <div key="demo2">依次进场</div>
                            <div key="demo3">依次进场</div>
                            <div key="demo4">依次进场</div>
                        </QueueAnim>
                    </div>
                </Content>
            </Layout>
        </Layout>
      </div>
    )
  }
}

export default App