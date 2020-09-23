import React, { Component } from "react";
import { connect } from "react-redux";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { actionPutPassword } from "./actionCreator/index";
import "./putPassword.css";

class PutPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
      backErrorPassword: false,
      newPasswordEye: "password",
      confirmNewPasswordEye: "password",
      backErrorMailNotFound: false,
    };
  }

  newPasswordEye(type) {
    type === "text"
      ? this.setState({ newPasswordEye: "text" })
      : this.setState({ newPasswordEye: "password" });
  }

  confirmNewPasswordEye(type) {
    type === "text"
      ? this.setState({ confirmNewPasswordEye: "text" })
      : this.setState({ confirmNewPasswordEye: "password" });
  }

  way(obj, resolverName) {
    const stateObj = this.props.state[obj];
    for (var keys in stateObj) {
      for (var keyData in stateObj[keys]) {
        if (keyData === "data") {
          const allObj = stateObj[keys][keyData][resolverName];
          if (!allObj.login) {
            return (
              <div className="error">
                <p>{allObj.email}</p>
              </div>
            );
          }
        }
      }
    }
  }

  buttonEnter = (e) => {
    if (e.key === "Enter") {
      this.state.confirmNewPassword === this.state.newPassword
        ? this.props.putPassword(this.state.email, this.state.newPassword)
        : this.setState({ backErrorPassword: true })
    }
  };

  render() {
    return (
      <div className="put-password">
        <div className="form-put" onKeyPress={this.buttonEnter}>
          <div className="put-title">
            <h2>Забыли пароль?</h2>
            <p>Пожалуйста, введите ваш E-mail и новый пароль</p>
          </div>

          <div className="email-icon icon">
            <UserOutlined />
            <input
              id="email"
              value={this.state.email}
              placeholder="E-mail"
              type="text"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          {this.way("putPassword", "changePassword")}

          <div className="password-icon icon">
            <LockOutlined />
            <input
              id="newPassword"
              value={this.state.newPassword}
              placeholder="Новый пароль"
              type={this.state.newPasswordEye}
              onChange={(e) => {
                this.setState({ newPassword: e.target.value });
                this.setState({ backErrorPassword: false });
              }}
            />
            <div
              className="not-see"
              style={
                this.state.newPasswordEye === "text"
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
              onClick={() => this.setState({ newPasswordEye: "text" })}
            >
              <EyeInvisibleOutlined />
            </div>
            <div
              className="see"
              style={
                this.state.newPasswordEye === "password"
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
              onClick={() => this.setState({ newPasswordEye: "password" })}
            >
              <EyeOutlined />
            </div>
          </div>

          <div className="password-icon icon">
            <LockOutlined />
            <input
              id="confirmNewPassword"
              value={this.state.confirmNewPassword}
              placeholder="Повторите пароль"
              type={this.state.confirmNewPasswordEye}
              onChange={(e) => {
                this.setState({ confirmNewPassword: e.target.value });
                this.setState({ backErrorPassword: false });
              }}
            />
            <div
              className="not-see-confirm"
              style={
                this.state.confirmNewPasswordEye === "text"
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
              onClick={() => this.setState({ confirmNewPasswordEye: "text" })}
            >
              <EyeInvisibleOutlined />
            </div>
            <div
              className="see-confirm"
              style={
                this.state.confirmNewPasswordEye === "password"
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
              onClick={() =>
                this.setState({ confirmNewPasswordEye: "password" })
              }
            >
              <EyeOutlined />
            </div>
          </div>

          {this.state.backErrorPassword ? (
            <div className="error">
              <p>Пароли не совпадают</p>
            </div>
          ) : null}

          <button
            className="login-button"
            onClick={() =>
              this.state.confirmNewPassword === this.state.newPassword
                ? this.props.putPassword(
                    this.state.email,
                    this.state.newPassword
                  )
                : this.setState({ backErrorPassword: true })
            }
            disabled={
              !this.state.email ||
              !this.state.newPassword ||
              !this.state.confirmNewPassword
            }
          >
            Изменить
          </button>
        </div>
      </div>
    );
  }
}

const PutPassword = () => <ConnectedPutPasswordForm />;

const ConnectedPutPasswordForm = connect(
  (state) => {
    return { state };
  },
  {
    putPassword: actionPutPassword,
  }
)(PutPasswordForm);

export default PutPassword;
