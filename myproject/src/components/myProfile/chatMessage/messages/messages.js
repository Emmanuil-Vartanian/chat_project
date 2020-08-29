import React from "react";

import date from "../../../../date/date";

import "./messages.css";

const Messages = ({
  message,
  autorAvatar,
  partnerAvatar,
  autorLogin,
  partnerLogin,
  createdAt,
}) => {
  return (
    <div className="infoMessage">
      <div className="avatar">
        {autorAvatar !== "" && partnerAvatar !== "" ? (
          <img
            src={`/${autorAvatar || partnerAvatar}`}
            alt={`/${autorAvatar || partnerAvatar}`}
          />
        ) : autorAvatar !== "" ? (
          <img src={`/${autorAvatar}`} alt={`/${autorAvatar}`} />
        ) : (
          <div className="notImage">
            <p>{autorLogin.substr(0, 1) || partnerLogin.substr(0, 1)}</p>
          </div>
        )}
      </div>

      <div className="data">
        <span className="name">{autorLogin || partnerLogin}</span>

        <div className="messageAndDate">
          <div className="message">{message}</div>
          <div className="dateMessage">{date(createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
