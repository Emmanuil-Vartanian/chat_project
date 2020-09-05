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
          <span className="name">
            {this.props.autorLogin || this.props.partnerLogin}
          </span>

          <div className="messageAndDate">
            <div className="message">{this.props.message}</div>
            <div className="dateMessage">{date(this.props.createdAt)}</div>
          </div>
        </div>
      </div>
    );
  }
}

// const Messages = ({
//   message,
//   autorAvatar,
//   partnerAvatar,
//   autorLogin,
//   partnerLogin,
//   createdAt,
// }) => {
//   return (
//     <div className="infoMessage">
//       <div className="avatar">
//         {autorAvatar !== "" && partnerAvatar !== "" ? (
//           <img
//             src={`/${autorAvatar || partnerAvatar}`}
//             alt={`/${autorAvatar || partnerAvatar}`}
//           />
//         ) : autorAvatar !== "" ? (
//           <img src={`/${autorAvatar}`} alt={`/${autorAvatar}`} />
//         ) : (
//           <div className="notImage">
//             <p>{autorLogin.substr(0, 1) || partnerLogin.substr(0, 1)}</p>
//           </div>
//         )}
//       </div>

//       <div className="data">
//         <span className="name">{autorLogin || partnerLogin}</span>

//         <div className="messageAndDate">
//           <div className="message">{message}</div>
//           <div className="dateMessage">{date(createdAt)}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Messages;
