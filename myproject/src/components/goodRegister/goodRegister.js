import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./goodRegister.css";

import history from "../../history";

import { actionCreateImage, actionChangeAvatar } from "./actionCreator/index";

class GoodRegister1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      selectedFile: null,
      backErrorFile: false,
      formatBackErrorFile: false,
    };
  }

  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios.post("http://localhost:9999/upload", data, {}).then((res) => {
      console.log(res.statusText);
    });
  };

  render() {
    return (
      <div className="registered">
        {localStorage.getItem("registerIdForImage") ? (
          <div className="good-register">
            <h2>Вы успешно зарегистрировались.</h2>
            <p>Желаете загрузить аватарку?</p>
            <input
              type="file"
              name="file"
              id="file"
              value={this.state.image}
              onChange={(e) => {
                this.setState({
                  selectedFile: e.target.files[0],
                  loaded: 0,
                });
                this.setState({ image: e.target.value });
                this.setState({ backErrorFile: false });
                this.setState({ formatBackErrorFile: false });
              }}
            />
            <br />
            <div className="btns">
              <button
                onClick={() => {
                  if (this.state.image) {
                    const formatFile = /(?:\.([^.]+))?$/;
                    if (
                      formatFile.exec(this.state.image)[1] === "png" ||
                      formatFile.exec(this.state.image)[1] === "jpg"
                    ) {
                      history.push("/sign_in");
                      this.onClickHandler();
                      this.props.cretaeImage(
                        this.state.selectedFile.name,
                        localStorage.getItem("registerIdForImage")
                      );
                      this.props.changeAvatar(
                        localStorage.getItem("registerIdForImage"),
                        this.state.selectedFile.name
                      );
                      localStorage.registerIdForImage = "";
                    } else this.setState({ formatBackErrorFile: true });
                  } else this.setState({ backErrorFile: true });
                }}
              >
                Добавить аватарку
              </button>
              <button
                onClick={() => {
                  history.push("/sign_in");
                  localStorage.registerIdForImage = "";
                }}
              >
                Нет
              </button>
            </div>

            {this.state.backErrorFile ? (
              <div className="errorAvatar">
                <p>Файл не выбран</p>
              </div>
            ) : null}

            {this.state.formatBackErrorFile ? (
              <div className="errorAvatar">
                <p>Неверный формат фото</p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="error404">
            <h1>Ошибка 404</h1>
            <p>Требуется регистрация</p>
          </div>
        )}
      </div>
    );
  }
}

const GoodRegister = () => <ConnectedGoodRegisterForm />;

const ConnectedGoodRegisterForm = connect(
  (state) => {
    return { state };
  },
  { cretaeImage: actionCreateImage, changeAvatar: actionChangeAvatar }
)(GoodRegister1);

export default GoodRegister;
