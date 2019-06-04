import { Layout, Menu, Badge, Icon, Dropdown, message } from "antd";
import Link from "umi/link";
import styles from "./index.css";
import withRouter from "umi/withRouter";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "dva";
import styled from "styled-components";
import React, { Component } from "react";

const { Header, Footer, Content } = Layout;
const TranCss = styled.div`
  .fade-appear,
  .fade-enter {
    opacity: 0;
  }
  .fade-appear-active,
  .fade-enter-active {
    transition: opacity 0.3s linear;
    opacity: 1;
  }

  .fade-exit {
    transition: opacity 0.2s linear;
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
  }

  .spread-appear,
  .spread-enter {
    opacity: 0.5;
    transform: scale(0) rotate(30deg);
  }

  .spread-appear-active,
  .spread-enter-active {
    opacity: 1;
    transform: scale(1) rotate(0);
    transition: transform 0.3s ease-in-out;
  }

  .spread-exit {
    transition: transform 0.2s ease-in-out;
    transform: scale(1.2) rotate(-30deg);
  }

  .spread-exit-active {
    transform: scale(0) rotate(0);
  }

  .page-content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
  }
`;

@connect(state => ({
  // 连接购物车状态
  count: state.cart.length,
  cart: state.cart
}))
export default class extends Component {
  // constructor(props){
  //   super(props)
  //   console.log(this.props.location.key)
  // }
  onClck() {
    message.info("退出成功");
  }
  render() {
    const selectedKeys = [this.props.location.pathname];
    const menu = (
      <Menu onClick={this.onClck}>
        {/* {this.props.cart.map((item, index) => (
          <Menu.Item key={index}>
            {item.name}×{item.count} <span>￥{item.count * item.price}</span>
          </Menu.Item>
        ))} */}
        <Menu.Item key="1">推出</Menu.Item>
      </Menu>
    );
    return (
      // 上中下布局
      <Layout>
        {/* 页头 */}
        <Header className={styles.header}>
          <img
            className={styles.logo}
            // src="https://img.kaikeba.com/logo-new.png"
          />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            style={{ lineHeight: "64px", float: "left" }}
          >
            {/* <Menu.Item key="/">
              <Link to="/">商品</Link>
            </Menu.Item> */}
            <Menu.Item key="/">
              <Link to="/">用户</Link>
            </Menu.Item>
            <Menu.Item key="/files">
              <Link to="/files">文件</Link>
            </Menu.Item>
            <Menu.Item key="/about">
              <Link to="/about">关于</Link>
            </Menu.Item>
          </Menu>
          {/* 购物车状态显示 */}

          {/* 购物车信息放在Dropdown以便展示 */}
          <Dropdown overlay={menu} placement="bottomRight">
            <div style={{ float: "right" }}>
              {/* <Icon type="shopping-cart" style={{ fontSize: 18 }} /> */}
              <span>陈绍鑫</span>
              <Icon type="down" />
              {/* <Badge count={5} offset={[-4, -18]} /> */}
            </div>
          </Dropdown>
        </Header>
        {/* 内容 */}
        <Content className={styles.box}>
          <TranCss>
            <TransitionGroup>
              <CSSTransition
                key={this.props.location.pathname}
                classNames='fade'
                timeout={300}
              >
                <div className={styles.box}>{this.props.children}</div>
              </CSSTransition>
            </TransitionGroup>
          </TranCss>

          {/* <div className={styles.box}>{this.props.children}</div> */}
        </Content>
        {/* 页脚 */}
        <Footer className={styles.footer}>页脚</Footer>
      </Layout>
    );
  }
}
