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
  .fade-enter {
    opacity: 0;
    z-index: 1;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
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
        <Header
          className={styles.header}
          style={{ position: "fixed", width: "100%" }}
        >
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
              <Link to="/">文件</Link>
            </Menu.Item>
            <Menu.Item key="/count">
              <Link to="/count">统计</Link>
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
          {/* <TranCss>
            <TransitionGroup>
              <CSSTransition
                key={this.props.location.pathname}
                classNames='fade'
                timeout={300}
              >
                <div className={styles.box}>{this.props.children}</div>
              </CSSTransition>
            </TransitionGroup>
          </TranCss> */}
          <div>{this.props.children}</div>
        </Content>
        {/* 页脚 */}
        {/* <Footer className={styles.footer}>页脚</Footer> */}
      </Layout>
    );
  }
}
