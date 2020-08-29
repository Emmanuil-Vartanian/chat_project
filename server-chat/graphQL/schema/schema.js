const { buildSchema } = require("graphql");

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
    changeAvatar(id: ID!, avatar: String): User
    createMessage(message: String, autorId: String, partnerId: String): Message
    changeLastMessage(id: ID!, lastMessage: String): ChatGroup
    createChatGroup(autorId: String, partnerId: String): ChatGroup
    createImage(image: String, autorId: String): Image
  }
  type User {
    id: Int
    createdAt: String
    email: String
    login: String
    avatar: String
  }
  type Message {
    id: Int
    createdAt: String
    message: String
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

module.exports.schema = schema;
