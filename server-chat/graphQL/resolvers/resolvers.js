const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const { Op, or, and } = Sequelize;
const sha1 = require("sha1");

const { User } = require("../../sequelize/sequelize");
const { Message } = require("../../sequelize/sequelize");
const { ChatGroup } = require("../../sequelize/sequelize");
const { Image } = require("../../sequelize/sequelize");

const secret = `7.!BMB?Y+Bc2vZE-Hb5YuCT6QvE^FN,JWN6M?_VtFXeC5dLtB!`;

const authenticate = async ({ login, password }) => {
  const user = await User.findOne({ where: { login, password } });
  if (user) {
    const token = jwt.sign(
      { sub: { id: user.id, email: user.email, login: user.login } },
      secret
    );
    return token;
  }
};

const getLogin = async ({ login, password }) => {
  const passwordSha1 = sha1(password);
  const userFind = await User.findOne({
    where: { login, password: passwordSha1 },
  });
  return authenticate(userFind);
};

const getAllUsers = async () => await User.findAll();

const changeAvatar = async ({ id, avatar }) => {
  var userFind = await User.findByPk(id);
  if (userFind) {
    await User.update({ avatar }, { where: { id } });
    userFind.avatar = "The avatar has been change";
    return userFind;
  }
};

const getAllImages = async () => {
  const images = await Image.findAll();
  for (var allImages of images) {
    const autor = await User.findAll({ where: { id: allImages.autorId } });
    allImages.autorId = autor[0];
  }
  return images;
};

const getAllImagesOneUser = async ({ autorId }) => {
  const foundAllImages = await Image.findAll();

  for (var allUsers of foundAllImages) {
    const autor = await User.findAll({ where: { id: allUsers.autorId } });
    const autorOrPartner = autor[0].id === +autorId;

    if (autorOrPartner) {
      const autorImage = await Image.findAll({
        where: { autorId },
      });

      if (autorImage.length) {
        for (var value of autorImage) {
          const autor = await User.findAll({ where: { id: value.autorId } });
          value.autorId = autor[0];
        }
        return autorImage;
      }
    } else console.log("bye");
  }
};

const createImage = async ({ image, autorId }) => {
  return await Image.create({ image, autorId });
};

const getOneUser = async ({ login }) =>
  await User.findAll({ where: { login } });

const createUser = async ({ email, login, password, avatar }) => {
  const wasUserCreated = await User.findOne({ where: { email } });
  if (!wasUserCreated) {
    return await User.create({ email, login, password, avatar });
  } else console.error("error");
};

const getAllMessages = async () => {
  const foundAllMessages = await Message.findAll();
  for (var allMessages of foundAllMessages) {
    const autor = await User.findAll({ where: { id: allMessages.autorId } });
    const partner = await User.findAll({
      where: { id: allMessages.partnerId },
    });
    allMessages.autorId = autor[0];
    allMessages.partnerId = partner[0];
  }
  return foundAllMessages;
};

const getAllMessagesOneUser = async ({ autorId, partnerId }) => {
  const foundAllMessages = await Message.findAll();

  for (var allUsers of foundAllMessages) {
    const autor = await User.findAll({ where: { id: allUsers.autorId } });
    const partner = await User.findAll({ where: { id: allUsers.partnerId } });
    const autorOrPartner =
      autor[0].id === +autorId || partner[0].id === +partnerId;

    if (autorOrPartner) {
      const autorMessage = await Message.findAll({
        where: { autorId, partnerId },
      });
      const partnerMessage = await Message.findAll({
        where: { autorId: partnerId, partnerId: autorId },
      });

      if (autorMessage.length && partnerMessage.length) {
        const messageOneUser = [...autorMessage, ...partnerMessage];
        for (var value of messageOneUser) {
          messageOneUser.sort((a, b) => (a.id > b.id ? 1 : -1));
          const autor = await User.findAll({ where: { id: value.autorId } });
          const partner = await User.findAll({
            where: { id: value.partnerId },
          });
          value.autorId = autor[0];
          value.partnerId = partner[0];
        }
        return messageOneUser;
      } else if (autorMessage.length) {
        for (var value of autorMessage) {
          const autor = await User.findAll({ where: { id: value.autorId } });
          const partner = await User.findAll({
            where: { id: value.partnerId },
          });
          value.autorId = autor[0];
          value.partnerId = partner[0];
        }
        return autorMessage;
      } else {
        for (var value of partnerMessage) {
          const autor = await User.findAll({ where: { id: value.autorId } });
          const partner = await User.findAll({
            where: { id: value.partnerId },
          });
          value.autorId = autor[0];
          value.partnerId = partner[0];
        }
        return partnerMessage;
      }
    } else console.log("bye");
  }
};

const createMessage = async ({ message, autorId, partnerId }) => {
  if (message !== "") await Message.create({ message, autorId, partnerId });
  else ({ message: "Not message" });
};

const getAllChatGroup = async () => {
  const foundAllChatGroups = await ChatGroup.findAll();
  for (var allUsers of foundAllChatGroups) {
    const autor = await User.findAll({ where: { id: allUsers.autorId } });
    const partner = await User.findAll({ where: { id: allUsers.partnerId } });
    allUsers.autorId = autor[0];
    allUsers.partnerId = partner[0];
  }
  return foundAllChatGroups;
};

const getAllChatGroupOneUser = async ({ id }) => {
  const foundAllChatGroups = await ChatGroup.findAll();

  for (var allUsers of foundAllChatGroups) {
    const autor = await User.findAll({ where: { id: allUsers.autorId } });
    const partner = await User.findAll({ where: { id: allUsers.partnerId } });
    const autorOrPartner = autor[0].id === +id || partner[0].id === +id;

    if (autorOrPartner) {
      const autorChatGroup = await ChatGroup.findAll({
        where: { autorId: id },
      });
      const partnerChatGroup = await ChatGroup.findAll({
        where: { partnerId: id },
      });

      if (autorChatGroup.length && partnerChatGroup.length) {
        const chatGroupOneUser = [...autorChatGroup, ...partnerChatGroup];
        chatGroupOneUser.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
        for (var value of chatGroupOneUser) {
          const autor = await User.findAll({ where: { id: value.autorId } });
          const partner = await User.findAll({
            where: { id: value.partnerId },
          });
          value.autorId = autor[0];
          value.partnerId = partner[0];
        }
        return chatGroupOneUser;
      } else if (autorChatGroup.length) {
        // autorChatGroup.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
        for (var value of autorChatGroup) {
          const partner = await User.findAll({
            where: { id: value.partnerId },
          });
          value.autorId = autor[0];
          value.partnerId = partner[0];
        }
        return autorChatGroup;
      } else {
        for (var value of partnerChatGroup) {
          const autor = await User.findAll({ where: { id: value.autorId } });
          value.autorId = autor[0];
          value.partnerId = partner[0];
        }
        return partnerChatGroup;
      }
    } else console.log("bye");
  }
};

const createChatGroup = async ({ autorId, partnerId }) => {
  try {
    const oneUserId = await ChatGroup.findOne({
      where: or(
        { autorId: autorId, partnerId: partnerId },
        { autorId: partnerId, partnerId: autorId }
      ),
    });
    if (!oneUserId) {
      var newChatGroup = await ChatGroup.create({ autorId, partnerId });
      const autor = await User.findAll({ where: { id: newChatGroup.autorId } });
      const partner = await User.findAll({
        where: { id: newChatGroup.partnerId },
      });
      newChatGroup.autorId = autor[0];
      newChatGroup.partnerId = partner[0];
      return newChatGroup;
    }
  } catch (e) {
    return e;
  }
};

const changeLastMessage = async ({ id, lastMessage }) => {
  var chatGroupFind = await ChatGroup.findByPk(id);
  if (chatGroupFind) {
    await ChatGroup.update({ lastMessage }, { where: { id } });
    chatGroupFind.lastMessage = "The lastMessage has been change";
    return chatGroupFind;
  }
};

var root = {
  getLogin,
  getOneUser,
  getAllUsers,
  createUser,
  changeAvatar,
  getAllMessages,
  getAllMessagesOneUser,
  createMessage,
  getAllChatGroup,
  getAllChatGroupOneUser,
  createChatGroup,
  getAllImages,
  getAllImagesOneUser,
  createImage,
  changeLastMessage
};

module.exports.root = root;
