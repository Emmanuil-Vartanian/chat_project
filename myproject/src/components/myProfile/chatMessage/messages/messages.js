import React, { Component } from "react";

import date from "../../../../date/date";

import "./messages.css";

class Messages extends Component {
  render() {
    return (
      <div className="infoMessage">
        <div className="avatar">
          {this.props.autorAvatar !== "" && this.props.partnerAvatar !== "" ? (
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

        <div className="data">
          <span className="nameAndDate">
            {this.props.autorLogin || this.props.partnerLogin}
            <div className="dateMessage">
              {date(this.props.createdAt, "forMessages")}
            </div>
          </span>

          {/* <div className="message"> */}
            <div className="message">{this.props.message}</div>
            
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default Messages;
