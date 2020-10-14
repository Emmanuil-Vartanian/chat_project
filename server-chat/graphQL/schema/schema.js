const { buildSchema } = require("graphql")

var schema = buildSchema(`
  type Query {
    getLogin(login: String, password: String): String
    getOneUser(login: String): [User]
    getAllUsers: [User]
    getAllImages: [Image]
    getAllImagesOneUser(autorId: String): [Image]
    getAllMessages: [Message]
    getAllMessagesOneUser(autorId: String, partnerId: String): [Message]
    getAllChatGroup: [ChatGroup]
    getAllChatGroupOneUser(id: ID!): [ChatGroup]
  }
  type Mutation {
    createUser(email: String, login: String, password: String, avatar: String): User
    changeOnline(id: ID!, online: Boolean): User
    changeWriteMessage(id: ID!, writeMessage: Boolean): User
    changePassword(email: String, password: String): User
    changeAvatar(id: ID!, avatar: String): User
    createMessage(message: String, autorId: String, partnerId: String): Message
    changeMessage(id: ID!, message: String): Message
    deleteMessage(id: [ID!]): String
    changeLastMessage(id: ID!, lastMessage: String): ChatGroup
    createChatGroup(autorId: String, partnerId: String): ChatGroup
    deleteChatGroup(id: ID!): String
    createImage(image: String, autorId: String): Image
  }
  type User {
    id: Int
    createdAt: String
    updatedAt: String
    email: String
    login: String
    avatar: String
    online: Boolean
    writeMessage: Boolean
  }
  type Message {
    id: Int
    createdAt: String
    message: String
    messageChanged: Boolean
    autorId: User
    partnerId: User
  }
  type ChatGroup {
    id: Int
    createdAt: String
    updatedAt: String
    lastMessage: String
    autorId: User
    partnerId: User
  }
  type Image {
    id: Int
    createdAt: String
    image: String
    autorId: User
  }
`);

module.exports.schema = schema
