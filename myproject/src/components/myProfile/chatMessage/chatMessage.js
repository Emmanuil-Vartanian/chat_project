import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import { Picker } from "emoji-mart";

import {
  SmileOutlined,
  CloseOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import "./chatMessage.css";
import "emoji-mart/css/emoji-mart.css";

import date from "../../../date/date";

import Messages from "./messages/messages";
import { actionAllChatsGroupOneUser } from "../actionCreator/index";
import {
  actionAllMessageOneUser,
  actionCreateMessage,
  actionAllMessage,
  actionChangeLastMessage,
  actionChangeMessage,
  actionDeleteMessage,
  actionWriteMessage,
  actionDeleteChatGroup,
} from "./actionCreator/index";
import dialogueIsEmpty from "../../../imagesForSite/dialogueIsEmpty.png";

const socket = io.connect("http://localhost:9999");

class ChatMessageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessage: "",
      windowEmoji: false,
      messageWriteNow: false,
      messageSelected: [],
      messageSelectedResult: [],
      messageSelectedMessage: "",
      messageSettings: true,
      messageSelectedForDeleteMessage: [],
      messageSelectedForChangesMessage: false,
      timeout: 0
    };

    socket.on("add mess", ({ falseFalse, sumAutorAndPartnerId }) => {
      if (
        sumAutorAndPartnerId ===
        +localStorage.getItem("idAutorForWriteMessage") +
          +localStorage.getItem("idPartnerForWriteMessage")
      ) {
        this.props.allMessageOneUser(
          localStorage.getItem("autorMessId"),
          localStorage.getItem("partnerMessId")
        );
        const idAutor = localStorage.getItem("idAutor");
        this.props.allChatsGroupOneUser(idAutor);
      }

      if (falseFalse === false) this.props.updateDate(false);
    });
  }

  updateDate = ({ idMessage, messageForChanges }) => {
    var messageSelectedResult = [];
    this.setState({ messageSelectedMessage: messageForChanges });

    this.setState({
      messageSelected: [...this.state.messageSelected, idMessage],
    });

    this.state.messageSelected.sort((a, b) => a - b);

    for (var i = 0; i < this.state.messageSelected.length; i++) {
      this.state.messageSelected[i] !== this.state.messageSelected[i - 1] &&
        this.state.messageSelected[i + 1] !== this.state.messageSelected[i] &&
        messageSelectedResult.push(this.state.messageSelected[i]);
    }

    this.setState({ messageSelectedResult: messageSelectedResult });

    if (!this.state.messageSelectedResult.length) {
      this.setState({ messageSettings: true });
      this.setState({ messageSelected: [] });
    } else this.setState({ messageSettings: false });
  };

  validateForSendMessage = () => {
    if (!this.state.messageSelectedForChangesMessage) {
      socket.emit("send mess", {
        sumAutorAndPartnerId:
          +localStorage.getItem("idPartnerForMessage") +
          +localStorage.getItem("idAutorForMessage"),
      });
      this.props.createMessage(
        this.state.sendMessage,
        localStorage.getItem("idAutorForMessage"),
        localStorage.getItem("idPartnerForMessage") ||
          localStorage.getItem("partnerMessId")
      );
      this.props.changeLastMessage(
        localStorage.getItem("idChatGroup"),
        this.state.sendMessage
      );
      setTimeout(() => {
        const idAutor = localStorage.getItem("idAutor");
        this.props.allChatsGroupOneUser(idAutor);
      }, 0);
      this.setState({ sendMessage: "" });
      socket.emit("writeMessage", false);
    } else {
      socket.emit("send mess", {
        sumAutorAndPartnerId:
          +localStorage.getItem("idPartnerForMessage") +
          +localStorage.getItem("idAutorForMessage"),
      });
      this.props.changeMessage(
        this.state.messageSelectedResult[0],
        this.state.sendMessage
      );
      this.props.writeMessage(localStorage.getItem("idAutor"), false);
      this.setState({ messageSelectedForChangesMessage: false });
      this.setState({ sendMessage: "" });
      this.setState({ messageSelected: [] });
      this.setState({ messageSelectedResult: [] });
      socket.emit("writeMessage", false);
    }
  };

  buttonEnter = (e) => {
    if (e.key === "Enter") this.validateForSendMessage();
  };

  way(obj, resolverName, a) {
    const stateObj = this.props.state[obj];
    for (var keys in stateObj) {
      for (var keyData in stateObj[keys]) {
        if (keyData === "data") {
          const allObj = stateObj[keys][keyData][resolverName];
          if (allObj === null || allObj.length === 0) {
            return (
              <div className="dialogueIsEmpty">
                <div>
                  <img
                    src={dialogueIsEmpty}
                    alt={dialogueIsEmpty}
                    width="200px"
                  />
                  <p>Диалог пуст</p>
                </div>
              </div>
            );
          }
          return allObj.map(a);
        } else if (stateObj[keys] === "PENDING") {
          return (
            <div className="dialogueIsEmpty">
              <div>
                <img
                  src="https://www.arthor.ru/wp-content/themes/woodmart/images/tour/ajax-loader.gif"
                  alt="loading"
                  width="150px"
                />
                <p>Собираем все сообщения</p>
              </div>
            </div>
          );
        }
      }
    }
  }

  scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  componentDidMount() {
    this.scrollToBottom();
    socket.on("add online", (data) => {
      const idAutor = localStorage.getItem("idAutor");
      this.props.allChatsGroupOneUser(idAutor);
    });

    socket.on(
      "add writeMessage",
      ({ writeMessage, sumAutorAndPartnerId, eraseMessageInputField }) => {
        if (
          writeMessage &&
          writeMessage !== localStorage.getItem("idAutor") &&
          sumAutorAndPartnerId ===
            +localStorage.getItem("idAutorForWriteMessage") +
              +localStorage.getItem("idPartnerForWriteMessage")
        )
          this.setState({ messageWriteNow: true });
        else this.setState({ messageWriteNow: false });

        if (eraseMessageInputField) this.setState({ sendMessage: "" });
      }
    );
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  partnerNotWriteMessage(){
    if(this.state.timeout) clearTimeout(this.state.timeout);
    this.state.timeout = setTimeout(() => {
      socket.emit("writeMessage", false);
    }, 3000);
  }

  render() {
    return (
      <>
        <div className="loginPartner">
          {localStorage.getItem("loginPartner")}
          {localStorage.getItem("onlinePartner") === "false" ? (
            " был(а) в сети " +
            date(localStorage.getItem("updatedAtPartner"), "forChatGroups")
          ) : (
            <span style={{ color: "#03c603" }}> онлайн</span>
          )}

          <nav>
            <input id="settingChatGroup__toggle" type="checkbox" />
            <label
              className="settingChatGroup__btn"
              htmlFor="settingChatGroup__toggle"
            >
              <EllipsisOutlined />
            </label>
            <ul className="settingChatGroup__box">
              <li
                className="settingChatGroup__item"
                onClick={() => {
                  this.props.deleteChatGroup(localStorage.idChatGroup);
                  socket.emit("send mess", {
                    falseFalse: false,
                    sumAutorAndPartnerId:
                      +localStorage.getItem("idPartnerForMessage") +
                      +localStorage.getItem("idAutorForMessage"),
                  });
                }}
              >
                Удалить чат
              </li>
            </ul>
          </nav>
        </div>

        <div className="chatMessages">
          <div
            className="messagesBlock"
            ref={(el) => (this.messagesContainer = el)}
          >
            {this.way("allMessageOneUser", "getAllMessagesOneUser", (el) => {
              localStorage.setItem(
                "idAutorForWriteMessage",
                +localStorage.getItem("idAutor") === el.autorId.id
                  ? el.autorId.id
                  : el.partnerId.id
              );
              localStorage.setItem(
                "idPartnerForWriteMessage",
                +localStorage.getItem("idAutor") !== el.autorId.id
                  ? el.autorId.id
                  : el.partnerId.id
              );
              return (
                <Messages
                  key={el.id}
                  createdAt={el.createdAt}
                  id={el.id}
                  message={el.message}
                  autorLogin={el.autorId.login}
                  partnerLogin={el.partnerId.login}
                  autorAvatar={el.autorId.avatar}
                  partnerAvatar={el.partnerId.avatar}
                  updateDate={this.updateDate}
                  writeMessage={
                    +localStorage.getItem("idAutor") !== el.autorId.id
                      ? el.autorId.writeMessage
                      : el.partnerId.writeMessage
                  }
                />
              );
            })}
          </div>

          {this.state.messageWriteNow ? (
            <div className="partnerWriteMessage">
              Пишет {localStorage.getItem("loginPartner")}
              <div className="partnerWriteMessageCircles">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : null}

          {this.state.messageSettings ? (
            <>
              {this.state.messageSelectedForChangesMessage ? (
                <div className="editMessage">
                  <div>
                    <p>Редактировать сообщение</p>
                    <p>{this.state.messageSelectedMessage}</p>
                  </div>

                  <div className="iconClose">
                    <CloseOutlined
                      onClick={() => {
                        this.setState({ messageSettings: true });
                        socket.emit("send mess", "");
                        this.setState({
                          messageSelectedForChangesMessage: false,
                        });
                        this.setState({ sendMessage: "" });
                        this.setState({ messageSelected: [] });
                        this.setState({ messageSelectedResult: [] });
                      }}
                    />
                  </div>
                </div>
              ) : null}

              <div className="sendMessage" onKeyPress={this.buttonEnter}>
                {this.state.windowEmoji && (
                  <div className="emojiOn">
                    <Picker set="apple" />
                  </div>
                )}

                <SmileOutlined
                  className="smiles"
                  onClick={() =>
                    this.setState({ windowEmoji: !this.state.windowEmoji })
                  }
                />
                <input
                  type="text"
                  value={this.state.sendMessage}
                  onKeyDown={() => {
                    socket.emit("writeMessage", {
                      idAutor: localStorage.getItem("idAutor"),
                      sumAutorAndPartnerId:
                        +localStorage.getItem("idPartnerForMessage") +
                        +localStorage.getItem("idAutorForMessage"),
                    });
                  }}
                  onChange={(e) => {
                    this.setState({ sendMessage: e.target.value });
                    this.partnerNotWriteMessage()
                  }}
                />
                <button onClick={() => this.validateForSendMessage()}>
                  отправить
                </button>
              </div>
            </>
          ) : (
            <div className="messageSettings">
              <div
                className="settings"
                onClick={() => {
                  setTimeout(() => {
                    this.props.deleteMessage(this.state.messageSelectedResult);
                    socket.emit("send mess", "");
                    this.setState({ messageSelected: [] });
                    this.setState({ messageSettings: true });
                  }, 0);
                }}
              >
                удалить
              </div>
              {this.state.messageSelectedResult.length <= 1 ? (
                <div
                  className="settings"
                  onClick={() => {
                    this.setState({ messageSelectedForChangesMessage: true });
                    this.setState({ messageSettings: true });
                    this.setState({
                      sendMessage: this.state.messageSelectedMessage,
                    });
                  }}
                >
                  изменить
                </div>
              ) : null}
              <div
                className="settings"
                onClick={() => {
                  this.setState({ messageSelected: [] });
                  this.setState({ messageSettings: true });
                  this.setState({ messageSelectedResult: [] });
                  socket.emit("send mess", "");
                }}
              >
                отмена
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const ChatMessage = ({ updateDate }) => (
  <ConnectedChatMessage updateDate={updateDate} />
);

const ConnectedChatMessage = connect(
  (state) => {
    return { state };
  },
  {
    createMessage: actionCreateMessage,
    allMessageOneUser: actionAllMessageOneUser,
    allMessage: actionAllMessage,
    changeLastMessage: actionChangeLastMessage,
    allChatsGroupOneUser: actionAllChatsGroupOneUser,
    changeMessage: actionChangeMessage,
    deleteMessage: actionDeleteMessage,
    writeMessage: actionWriteMessage,
    deleteChatGroup: actionDeleteChatGroup,
  }
)(ChatMessageInfo);

export default ChatMessage;
