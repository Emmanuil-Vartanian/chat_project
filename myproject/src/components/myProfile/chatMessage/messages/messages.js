import React, { Component } from "react";
// import io from "socket.io-client;

import date from "../../../../date/date";

import "./messages.css";

// const socket = io.connect("http://localhost:9999");

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageSelected: false,
      messageSelectedId: [],
      newMessage: this.props.message,
    };
  }

  componentDidMount() {
    this.setState({ newMessage: this.props.message });
  }

  render() {
    return (
      <>
        {this.props.autorLogin !== localStorage.getItem("loginPartner") ? (
          <div
            className="containerMessageAutor"
            id={
              !this.state.messageSelected
                ? "messageSelected"
                : "onMessageSelected"
            }
            onClick={(e) => {
              this.setState({ messageSelected: !this.state.messageSelected });
              this.setState({ messageSelectedId: this.props.id });
              setTimeout(() => {
                this.props.updateDate({
                  idMessage: this.props.id,
                  messageForChanges: this.props.message,
                });
              }, 0);
            }}
          >
            <div className="infoMessageAutor">
              <div className="avatarMessage">
                {this.props.autorAvatar !== "" &&
                this.props.partnerAvatar !== "" ? (
                  <img
                    src={`/${
                      this.props.autorAvatar || this.props.partnerAvatar
                    }`}
                    alt={`/${
                      this.props.autorAvatar || this.props.partnerAvatar
                    }`}
                  />
                ) : this.props.autorAvatar !== "" ? (
                  <img
                    src={`/${this.props.autorAvatar}`}
                    alt={`/${this.props.autorAvatar}`}
                  />
                ) : (
                  <div className="notImage">
                    <p>
                      {this.props.autorLogin.substr(0, 1) ||
                        this.props.partnerLogin.substr(0, 1)}
                    </p>
                  </div>
                )}
              </div>

              <div className="dataContainer">
                <div className="dataMessage">
                  <span className="nameAndDateAutor">
                    {this.props.autorLogin || this.props.partnerLogin}
                  </span>

                  <div className="messageAutor">
                    <span>{this.state.newMessage}</span>
                    {/* <span>{this.props.message}</span> */}
                    <div className="dateMessage">
                      {date(this.props.createdAt, "forMessages")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="containerMessagePartner"
            id={
              !this.state.messageSelected
                ? "messageSelected"
                : "onMessageSelected"
            }
            onClick={(e) => {
              this.setState({ messageSelected: !this.state.messageSelected });
              this.setState({ messageSelectedId: this.props.id });
              setTimeout(() => {
                this.props.updateDate({
                  idMessage: this.props.id,
                  messageForChanges: this.props.message,
                });
              }, 0);
            }}
          >
            <div className="avatar">
              {this.props.autorAvatar !== "" &&
              this.props.partnerAvatar !== "" ? (
                <img
                  src={`/${this.props.autorAvatar || this.props.partnerAvatar}`}
                  alt={`/${this.props.autorAvatar || this.props.partnerAvatar}`}
                />
              ) : this.props.autorAvatar !== "" ? (
                <img
                  src={`/${this.props.autorAvatar}`}
                  alt={`/${this.props.autorAvatar}`}
                />
              ) : (
                <div className="notImage">
                  <p>
                    {this.props.autorLogin.substr(0, 1) ||
                      this.props.partnerLogin.substr(0, 1)}
                  </p>
                </div>
              )}
            </div>

            <div className="dataContainer">
              <span className="nameAndDate">
                {this.props.autorLogin || this.props.partnerLogin}
              </span>

              <div className="message">
                <span>{this.state.newMessage}</span>
                {/* <span>{this.props.message}</span> */}
                <div className="dateMessage">
                  {date(this.props.createdAt, "forMessages")}
                </div>
              </div>
            </div>
          </div>
        )}

        {this.props.deleteAllMessageOneUser(this.props.id)}
      </>
    );
  }
}

export default Messages;
