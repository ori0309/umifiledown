import React, { Component } from "react";
import styles from "./login.css";

import { Login } from "ant-design-pro";
import { connect } from "dva";

const { UserName, Password, Submit } = Login;

@connect()
export default class extends Component {
  onSubmit = (err, values) => {
    console.log("用户输入：", values);
    if (!err) {
      // 校验通过，提交登录
      this.props.dispatch({ type: newFunction(), payload: values });
    }
  };
  render() {
    return (
      <div className={styles.loginForm}>
        {/* logo */}
        {/* <img
          className={styles.logo}
          src="https://img.kaikeba.com/logo-new.png"
        /> */}
        <div className={styles.title}>登录</div>
        {/* 登录表单 */}
        <Login onSubmit={this.onSubmit}>
          <UserName
            name="username"
            placeholder="请输入用户名"
            rules={[{ required: true, message: "请输入用户名" }]}
          />
          <Password
            name="password"
            placeholder="请输入密码"
            rules={[{ required: true, message: "请输入密码" }]}
          />
          <Submit>登录</Submit>
        </Login>
        <div className={styles.fromMake}>By人工智能实验室</div>
      </div>
    );
  }
}
function newFunction() {
  return "user/login";
}

