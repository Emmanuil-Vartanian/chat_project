import React, { Component } from "react";

import date from "../../../../date/date";

import "./messages.css";

class Messages extends Component {
  render() {
    return (
      <>
        {this.props.autorLogin !== localStorage.getItem("loginPartner") ? (
          <div className="containerMessageAutor">
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
                    <span>{this.props.message}</span>
                    <div className="dateMessage">
                      {date(this.props.createdAt, "forMessages")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="containerMessagePartner">
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
                <span>{this.props.message}</span>
                <div className="dateMessage">
                  {date(this.props.createdAt, "forMessages")}
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
