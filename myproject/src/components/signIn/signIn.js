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

const loginEye = () => {
  const password = document.getElementById("password");
  const notSee = document.querySelector(".not-see");
  const see = document.querySelector(".see");

  if (password.type === "password") {
    password.type = "text";
    see.style.display = "inline-block";
    notSee.style.display = "none";
  } else {
    password.type = "password";
    notSee.style.display = "inline-block";
    see.style.display = "none";
  }
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { login: "", password: "", backError: false };
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
              type="password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
                this.setState({ backError: false });
              }}
            />
            <div className="not-see" onClick={loginEye}>
              <EyeInvisibleOutlined />
            </div>
            <div className="see" onClick={loginEye}>
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
            <Link to="/sign_up">Зарегестрироваться</Link>
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
