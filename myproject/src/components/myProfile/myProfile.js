import React, { Component } from "react";
import { TeamOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import "./myProfile.css";

import openChat from "../../imagesForSite/openChat.png";

import {
  actionAllChatsGroupOneUser,
  actionCreateChatGroup,
  actionOneUser,
} from "./actionCreator/index";
import {
  actionAllMessageOneUser,
  actionAllMessage,
} from "./chatMessage/actionCreator/index";
import { actionLogin } from "../signIn/actionCreator/index";

import ChatGroup from "./chatGroups/chatGroups";
import ChatMessage from "./chatMessage/chatMessage";

import history from "../../history";

const socket = io.connect("http://localhost:9999");

class MyProfile1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      foundUser: false,
      messageBlockPadding: false,
      activeTab: 0,
    };

    socket.on("add chat", () => {
      const idAutor = localStorage.getItem("idAutor");
      this.props.allChatsGroupOneUser(idAutor);
    });
  }

  clickEventHandler = (id) => {
    this.setState({
      activeTab: id,
    });
  };

  way(obj, resolverName, a) {
    const stateObj = this.props.state[obj];
    for (var keys in stateObj) {
      for (var keyData in stateObj[keys]) {
        if (keyData === "data") {
          const allObj = stateObj[keys][keyData][resolverName];
          if (allObj) return allObj.map(a);
        }
      }
    }
  }

  way2(obj, resolverName) {
    const stateObj = this.props.state[obj];
    console.log(this.props.state);
    for (var keys in stateObj) {
      for (var keyData in stateObj[keys]) {
        if (keyData === "data") {
          const allObj = stateObj[keys][keyData][resolverName];
          console.log(allObj);
          if (allObj) return allObj;
        }
      }
    }
  }

  a = () => {
    const idAutor = localStorage.getItem("idAutor");
    this.props.allChatsGroupOneUser(idAutor);
  };

  componentDidMount() {
    this.a();
    this.props.allMessage();
  }

  render() {
    return (
      <div className="container">
        {localStorage.getItem("allObj") ? (
          <div className="my-profile">
            <div className="chat-sidebar">
              <div className="create-chat">
                <div>
                  <div>
                    <TeamOutlined />
                    <span className="span">Список чатов</span>
                  </div>

                  <nav className="nav-left main-nav hamburger-menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                      <span></span>
                    </label>
                    <ul className="menu-box menu__box">
                      <li>
                        <Link className="link menu__item" to="#">
                          Настройки
                        </Link>
                      </li>
                      <li
                        onClick={() => {
                          localStorage.allObj = "";
                          this.props.onLogin("", "");
                          history.push("/");
                        }}
                      >
                        <Link className="link menu__item" to="">
                          Выйти
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="search-input">
                  <input
                    value={this.state.text}
                    onChange={(e) => this.setState({ text: e.target.value })}
                    placeholder="Введите ник"
                  />
                  <SearchOutlined
                    className="search"
                    onClick={() => {
                      const idAutor = localStorage.getItem("idAutor");
                      this.state.text === ""
                        ? this.props.allChatsGroupOneUser(idAutor) &&
                          this.setState({ foundUser: false })
                        : this.props.oneUser(this.state.text) &&
                          this.setState({ foundUser: true });
                    }}
                  />
                </div>
              </div>

              <div className="chat-groups">
                {this.state.foundUser
                  ? this.way("oneUser", "getOneUser", (el) => (
                      <div
                        key={el.id}
                        onClick={() => {
                          history.push(`/my_profile/${el.id}`);

                          localStorage.setItem("loginPartner", el.login);
                          localStorage.setItem(
                            "idAutor",
                            +localStorage.getItem("idAutor")
                          );
                          localStorage.setItem("idPartner", el.id);
                          localStorage.setItem(
                            "autorMessId",
                            +localStorage.getItem("idAutor")
                          );
                          localStorage.setItem("partnerMessId", el.id);

                          this.props.createChatGroup(
                            String(+localStorage.getItem("idAutor")),
                            String(el.id)
                          );

                          this.props.allMessageOneUser(
                            String(+localStorage.getItem("idAutor")),
                            String(el.id)
                          );

                          socket.emit("create chat", "");

                          const idAutor = localStorage.getItem("idAutor");
                          this.props.allChatsGroupOneUser(idAutor);

                          this.setState({ foundUser: false });
                          this.setState({ text: "" });
                          this.setState({ messageBlockPadding: true });
                          this.clickEventHandler(el.id);
                        }}
                      >
                        <ChatGroup
                          id={el.id}
                          login={el.login}
                          avatar={el.avatar}
                          addedName={
                            this.state.activeTab === el.id ? "active" : "groups"
                          }
                        />
                      </div>
                    ))
                  : this.way(
                      "allChatsGroupOneUser",
                      "getAllChatGroupOneUser",
                      (el) => (
                        <div
                          id="btnChat"
                          key={el.id}
                          onClick={() => {
                            history.push(`/my_profile/${el.id}`);
                            localStorage.setItem("idChatGroup", el.id);
                            localStorage.setItem(
                              "loginPartner",
                              +localStorage.getItem("idAutor") !== el.autorId.id
                                ? el.autorId.login
                                : el.partnerId.login
                            );
                            localStorage.setItem(
                              "idAutor",
                              +localStorage.getItem("idAutor") === el.autorId.id
                                ? el.autorId.id
                                : el.partnerId.id
                            );
                            localStorage.setItem(
                              "idPartner",
                              +localStorage.getItem("idAutor") !== el.autorId.id
                                ? el.autorId.id
                                : el.partnerId.id
                            );
                            localStorage.setItem("autorMessId", el.autorId.id);
                            localStorage.setItem(
                              "partnerMessId",
                              el.partnerId.id
                            );

                            this.props.allMessageOneUser(
                              String(el.autorId.id),
                              String(el.partnerId.id)
                            );
                            this.setState({ messageBlockPadding: true });
                            this.clickEventHandler(el.id);
                          }}
                        >
                          <ChatGroup
                            id={el.id}
                            avatar={
                              +localStorage.getItem("idAutor") !== el.autorId.id
                                ? el.autorId.avatar
                                : el.partnerId.avatar
                            }
                            login={
                              +localStorage.getItem("idAutor") !== el.autorId.id
                                ? el.autorId.login
                                : el.partnerId.login
                            }
                            lastMessage={el.lastMessage}
                            updatedAt={el.updatedAt}
                            addedName={
                              this.state.activeTab === el.id
                                ? "active"
                                : "groups"
                            }
                          />
                        </div>
                      )
                    )}
              </div>
            </div>

            <div className="chat-messages">
              {this.state.messageBlockPadding ? (
                <ChatMessage />
              ) : (
                <div className="openChat">
                  <div>
                    <img src={openChat} alt={openChat} width="200px" />
                    <p>Откройте чат</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="error401">
            <h1>Ошибка 401</h1>
            <p>Требуется авторизация</p>
          </div>
        )}
      </div>
    );
  }
}

const MyProfile = () => <ConnectedMyProfile />;

const ConnectedMyProfile = connect(
  (state) => {
    return { state };
  },
  {
    allChatsGroupOneUser: actionAllChatsGroupOneUser,
    createChatGroup: actionCreateChatGroup,
    oneUser: actionOneUser,
    allMessageOneUser: actionAllMessageOneUser,
    allMessage: actionAllMessage,
    onLogin: actionLogin,
  }
)(MyProfile1);

export default MyProfile;
