import React, { Component } from "react";
import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";

import date from "../../../../date/date";

import "./messages.css";

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
                  autorLogin: this.props.autorLogin,
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

                  <div className="messageAutorAndDate">
                    <div className="messageAutor">
                      {reactStringReplace(
                        this.state.newMessage,
                        /:(.+?):/g,
                        (match, i) => (
                          <Emoji
                            key={i + this.props.id}
                            emoji={match}
                            set="apple"
                            size={20}
                          />
                        )
                      )}
                    </div>
                    <div className="dateMessage">
                      {this.props.messageChanged ? (
                        <p>
                          {date(this.props.createdAt, "forMessages")} изменено
                        </p>
                      ) : (
                        <p>{date(this.props.createdAt, "forMessages")}</p>
                      )}
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

              <div className="messagePartnerAndDate">
                <div className="messagePartner">
                  {reactStringReplace(
                    this.state.newMessage,
                    /:(.+?):/g,
                    (match, i) => (
                      <Emoji
                        key={i + this.props.id}
                        emoji={match}
                        set="apple"
                        size={20}
                      />
                    )
                  )}
                </div>
                <div className="dateMessage">
                  {this.props.messageChanged ? (
                    <p>изменено {date(this.props.createdAt, "forMessages")}</p>
                  ) : (
                    <p>{date(this.props.createdAt, "forMessages")}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Messages;
