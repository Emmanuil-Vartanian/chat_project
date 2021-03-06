import React, { Component } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { actionRegister, actionCreateImage } from "./actionCreator/index";
import "./signUp.css";

// import history from "../../history";

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
      backErrorPassword: false,
      backErrorPasswordValidate: false,
      backErrorEmail: false,
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

  validateAndRegister() {
    const patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    this.state.registerPassword === this.state.confirmPassword
      ? this.state.registerPassword.match(patternPassword)
        ? this.validateEmailPattern(this.state.registerEmail)
          ? this.props.register(
              this.state.registerEmail,
              this.state.registerPassword,
              this.state.login
            )
          : this.setState({ backErrorEmail: true })
        : this.setState({ backErrorPasswordValidate: true })
      : this.setState({ backErrorPassword: true });
  }

  buttonEnter = (e) => {
    if (e.key === "Enter") this.validateAndRegister();
  };

  validateEmailPattern(email) {
    var pattern = /^[a-z0-9._-]+@[a-z]+\.[a-z]{2,4}$/;
    return pattern.test(email);
  }

  render() {
    return (
      <div className="register">
        {/* {localStorage.allObj !== "" ? ( */}
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
                onChange={(e) => {
                  this.setState({ registerEmail: e.target.value });
                  this.setState({ backErrorEmail: false });
                  const repeatEmail = document.querySelector(".repeat-email");
                  repeatEmail.style.display = "none";
                }}
              />
            </div>

            {this.state.backErrorEmail ? (
              <div className="pattern-email">
                <p></p>
                <div>
                  <p>Неверный формат почты</p>
                </div>
              </div>
            ) : null}

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
                  title="Должен содержать не менее одной цифры, одной прописной и строчной буквы и не менее 6 или более символов"
                  onChange={(e) => {
                    this.setState({ registerPassword: e.target.value });
                    this.setState({ backErrorPassword: false });
                    this.setState({ backErrorPasswordValidate: false });
                  }}
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
                  name="confirmPassword"
                  title="Должен содержать не менее одной цифры, одной прописной и строчной буквы и не менее 6 или более символов"
                  onChange={(e) => {
                    this.setState({ confirmPassword: e.target.value });
                    this.setState({ backErrorPassword: false });
                    this.setState({ backErrorPasswordValidate: false });
                  }}
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

            {this.state.backErrorPassword ? (
              <div className="pattern-password">
                <p></p>
                <div>
                  <p>Пароли не совпадают</p>
                </div>
              </div>
            ) : null}

            {this.state.backErrorPasswordValidate ? (
              <div className="pattern-password">
                <p></p>
                <div>
                  <p>Неверный формат пароля</p>
                </div>
              </div>
            ) : null}

            <div className="block-input-btn">
              <p></p>
              <button
                onClick={() => this.validateAndRegister()}
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
        {/* ) : (
          history.push("/my_profile")
        )} */}
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
