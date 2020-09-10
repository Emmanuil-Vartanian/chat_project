import React, { Component } from "react";

import date from "../../../../date/date";

import "./oneUserMessages.css";

class oneUserMessages extends Component {
  render() {
    return (
      <>
        {this.props.autorLogin !== localStorage.getItem("loginPartner") ? (
          <div className="containerMessageAutor">
            <div className="infoMessageAutor">
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

export default oneUserMessages;
