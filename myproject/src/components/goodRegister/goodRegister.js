import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./goodRegister.css";

import history from "../../history";

import { actionCreateImage, actionChangeAvatar } from "./actionCreator/index";

class GoodRegister1 extends Component {
  constructor(props) {
    super(props);
    this.state = { image: "", selectedFile: null };
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

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
        <div className="good-register">
          <h2>Вы успешно зарегестрировались.</h2>
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
              this.setState({
                image: e.target.value,
              });
            }}
          />
          <br />
          <button
            onClick={() => {
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
            }}
          >
            Добавить аватарку
          </button>
          <button onClick={() => history.push("/sign_in")}>Нет</button>
        </div>
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
