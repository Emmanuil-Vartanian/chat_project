import React, { Component } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import {
  validateEmail,
  borderEmailDischarge,
  borderPasswordDischarge,
  validatePassword,
  signUpValidate,
} from "./signUpValidate/signUpValidate";
import { actionRegister, actionCreateImage } from "./actionCreator/index";
import "./signUp.css";

class Register1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerEmail: "",
      registerPassword: "",
      confirmPassword: "",
      login: "",
      registerEye: "password",
      registerConfirmEye: "password",
    };
  }

  registerEye(type) {
    type === "text"
      ? this.setState({ registerEye: "text" })
      : this.setState({ registerEye: "password" });
  }

  registerConfirmEye(type) {
    type === "text"
      ? this.setState({ registerConfirmEye: "text" })
      : this.setState({ registerConfirmEye: "password" });
  }

  buttonEnter = (e) => {
    if (e.key === "Enter")
      signUpValidate(
        this.state.registerEmail,
        this.state.registerPassword,
        this.state.confirmPassword,
        this.state.login,
        this.props
      );
  };

  render() {
    return (
      <div className="register">
        <div className="register-form" onKeyPress={this.buttonEnter}>
          <div className="login-title">
            <h2>Создать свой аккаунт</h2>
            <p>Пожалуйста, создайте свой аккаунт</p>
          </div>

          <div className="block-input">
            <span>E-mail:</span>
            <input
              value={this.state.registerEmail}
              type="email"
              id="registerEmail"
              name="email"
              pattern={validateEmail(this.state.registerEmail)}
              onClick={() => borderEmailDischarge()}
              onChange={(e) => this.setState({ registerEmail: e.target.value })}
            />
          </div>

          <div className="pattern-email">
            <p></p>
            <div>
              <p>Неверный формат почты</p>
            </div>
          </div>

          <div className="repeat-email">
            <p></p>
            <div>
              <p>Аккаунт с такой почтой уже зарегестрирован</p>
            </div>
          </div>

          <div className="block-input">
            <span>Логин:</span>
            <input
              value={this.state.login}
              type="text"
              id="loginCreate"
              name="login"
              onChange={(e) => this.setState({ login: e.target.value })}
            />
          </div>

          <div className="block-input">
            <span>Пароль:</span>
            <div className="password-block">
              <input
                value={this.state.registerPassword}
                type={this.state.registerEye}
                id="registerPassword"
                name="password"
                onChange={(e) =>
                  this.setState({ registerPassword: e.target.value })
                }
              />
              <div
                className="not-see"
                style={
                  this.state.registerEye === "text"
                    ? { display: "none" }
                    : { display: "inline-block" }
                }
                onClick={() => this.registerEye("text")}
              >
                <EyeInvisibleOutlined />
              </div>
              <div
                className="see"
                style={
                  this.state.registerEye === "password"
                    ? { display: "none" }
                    : { display: "inline-block" }
                }
                onClick={() => this.registerEye("password")}
              >
                <EyeOutlined />
              </div>
            </div>
          </div>

          <div className="block-input">
            <span>Повторите пароль:</span>
            <div className="confirmPassword-block">
              <input
                value={this.state.confirmPassword}
                type={this.state.registerConfirmEye}
                id="confirmPassword"
                onClick={() => borderPasswordDischarge()}
                pattern={validatePassword(
                  this.state.registerPassword,
                  this.state.confirmPassword
                )}
                name="confirmPassword"
                onChange={(e) =>
                  this.setState({ confirmPassword: e.target.value })
                }
              />
              <div
                className="not-see-confirm"
                style={
                  this.state.registerConfirmEye === "text"
                    ? { display: "none" }
                    : { display: "inline-block" }
                }
                onClick={() => this.registerConfirmEye("text")}
              >
                <EyeInvisibleOutlined />
              </div>
              <div
                className="see-confirm"
                style={
                  this.state.registerConfirmEye === "password"
                    ? { display: "none" }
                    : { display: "inline-block" }
                }
                onClick={() => this.registerConfirmEye("password")}
              >
                <EyeOutlined />
              </div>
            </div>
          </div>

          <div className="pattern-password">
            <p></p>
            <div>
              <p>Пароли не совпадают</p>
            </div>
          </div>

          <div className="block-input-btn">
            <p></p>
            <button
              onClick={() => {
                signUpValidate(
                  this.state.registerEmail,
                  this.state.registerPassword,
                  this.state.confirmPassword,
                  this.state.login,
                  this.props
                );
              }}
              disabled={
                !this.state.registerEmail ||
                !this.state.registerPassword ||
                !this.state.confirmPassword ||
                !this.state.login
              }
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const Register = () => <ConnectedRegisterForm />;

const ConnectedRegisterForm = connect(
  (state) => {
    return { state };
  },
  { register: actionRegister, cretaeImage: actionCreateImage }
)(Register1);
export default Register;
