const Sequelize = require("sequelize");
const sha1 = require("sha1");

const sequelize = new Sequelize("chat", "root", "Emmanuil2228125%", {
  timezone: "+03:00",
  host: "localhost",
  dialect: "mysql",
});

class User extends Sequelize.Model {
  get messages() {
    return (async () => {
      let autorForMessage = await this.getAutor();
      let partnerForMessage = await this.getPartner();
      return [...autorForMessage, ...partnerForMessage];
    })();
  }
  get chat_groups() {
    return (async () => {
      let autorForChatGroup = await this.getAutor();
      let partnerForChatGroup = await this.getPartner();
      return [...autorForChatGroup, ...partnerForChatGroup];
    })();
  }
  get image() {
    return (async () => {
      let autorImage = await this.getAutor();
      return [...autorImage];
    })();
  }
}

User.init(
  {
    email: Sequelize.STRING,
    login: Sequelize.STRING,
    password: {
      type: Sequelize.STRING,
      set(value) {
        this.setDataValue("password", sha1(value));
      },
    },
    avatar: Sequelize.STRING,
    online: { type: Sequelize.BOOLEAN, defaultValue: false },
    writeMessage: { type: Sequelize.BOOLEAN, defaultValue: false },
  },
  { sequelize, modelName: "user" }
);

class Message extends Sequelize.Model {}

Message.init(
  {
    message: Sequelize.STRING,
    messageChanged: { type: Sequelize.BOOLEAN, defaultValue: false },
  },
  { sequelize, modelName: "message" }
);

class ChatGroup extends Sequelize.Model {}

ChatGroup.init(
  { lastMessage: Sequelize.STRING },
  { sequelize, modelName: "chat_group" }
);

class Image extends Sequelize.Model {}

Image.init({ image: Sequelize.STRING }, { sequelize, modelName: "image" });

User.hasMany(Message, { as: "autorForMessage", foreignKey: "autorId" });
User.hasMany(Message, { as: "partnerForMessage", foreignKey: "partnerId" });

Message.belongsTo(User, { as: "autor", sourceKey: "autorId" });
Message.belongsTo(User, { as: "partner", sourceKey: "partnerId" });

User.hasMany(ChatGroup, { as: "autorForChatGroup", foreignKey: "autorId" });
User.hasMany(ChatGroup, { as: "partnerForChatGroup", foreignKey: "partnerId" });

ChatGroup.belongsTo(User, { as: "autor", sourceKey: "autorId" });
ChatGroup.belongsTo(User, { as: "partner", sourceKey: "partnerId" });

User.hasMany(Image, { as: "autorImage", foreignKey: "autorId" });

Image.belongsTo(User, { as: "autor", sourceKey: "autorId" });

sequelize.sync();

module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Message = Message;
module.exports.ChatGroup = ChatGroup;
module.exports.Image = Image;
