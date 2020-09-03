import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import jwtDecode from "jwt-decode";

import { actionLogin } from "./actionCreator/index";
import "./signIn.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      backError: false,
      loginEye: "password",
    };
  }

  loginEye(type) {
    type === "text"
      ? this.setState({ loginEye: "text" })
      : this.setState({ loginEye: "password" });
  }

  way(obj, resolverName) {
    const stateObj = this.props.state[obj];
    for (var keys in stateObj) {
      for (var keyData in stateObj[keys]) {
        if (keyData === "data") {
          const allObj = stateObj[keys][keyData][resolverName];
          if (allObj) {
            var jwtDecodeUser = jwtDecode(allObj);
            localStorage.setItem("allObj", allObj);
            localStorage.setItem("idAutor", jwtDecodeUser.sub.id);
            localStorage.setItem("email", jwtDecodeUser.sub.email);
            localStorage.setItem("login", jwtDecodeUser.sub.login);
            localStorage.setItem("emailAutor", jwtDecodeUser.sub.email);
            localStorage.setItem("loginAutor", jwtDecodeUser.sub.login);
          } else {
            return (
              <div className="error">
                <p>Неверный логин или пароль, попробуйте заново.</p>
              </div>
            );
          }
        }
      }
    }
  }

  buttonEnter = (e) => {
    if (e.key === "Enter") {
      this.props.onLogin(this.state.login, this.state.password);
      this.setState({ backError: true });
    }
  };

  render() {
    return (
      <div className="login">
        <div className="login-form" onKeyPress={this.buttonEnter}>
          <div className="login-title">
            <h2>Войти в аккаунт</h2>
            <p>Пожалуйста, войдите в свой аккаунт</p>
          </div>

          <div className="login-icon icon">
            <UserOutlined />
            <input
              id="login"
              value={this.state.login}
              placeholder="Логин"
              type="text"
              onChange={(e) => {
                this.setState({ login: e.target.value });
                this.setState({ backError: false });
              }}
            />
          </div>

          <div className="password-icon icon">
            <LockOutlined />
            <input
              id="password"
              value={this.state.password}
              placeholder="Пароль"
              type={this.state.loginEye}
              onChange={(e) => {
                this.setState({ password: e.target.value });
                this.setState({ backError: false });
              }}
            />
            <div
              className="not-see"
              style={
                this.state.loginEye === "text"
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
              onClick={() => {
                this.loginEye("text");
              }}
            >
              <EyeInvisibleOutlined />
            </div>
            <div
              className="see"
              style={
                this.state.loginEye === "password"
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
              onClick={() => this.loginEye("password")}
            >
              <EyeOutlined />
            </div>
          </div>

          {this.state.backError ? this.way("login", "getLogin") : null}

          <button
            className="login-button"
            onClick={() => {
              this.props.onLogin(this.state.login, this.state.password);
              this.setState({ backError: true });
            }}
            disabled={!this.state.login || !this.state.password}
          >
            Войти
          </button>

          <div className="register-put-password">
            <Link to="/sign_up">Зарегистрироваться</Link>
            <Link to="/put_password">Забыли пароль?</Link>
          </div>
        </div>
      </div>
    );
  }
}

const Login = () => <ConnectedLoginForm />;

const ConnectedLoginForm = connect(
  (state) => {
    return { state };
  },
  { onLogin: actionLogin }
)(LoginForm);

export default Login;
