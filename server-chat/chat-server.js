const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const { Server } = require("http");
const app = express();
const http = Server(app);
const io = require("socket.io").listen(http);
const multer = require("multer");

// const { sequelize } = require("./sequelize/index");
const { schema } = require("./graphQL/schema/schema");
const { root } = require("./graphQL/resolvers/resolvers");

const { User } = require("./sequelize/sequelize");
const { Message } = require("./sequelize/sequelize");
const { ChatGroup } = require("./sequelize/sequelize");
const { Image } = require("./sequelize/sequelize");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.get("/users", async (req, res) => res.send(await User.findAll()));
app.get("/messages", async (req, res) => res.send(await Message.findAll()));
app.get("/image", async (req, res) => res.send(await Image.findAll()));
app.get("/image/:image", async (req, res) =>
  res.send(await Image.findOne({ where: { image: req.params.image } }))
);

io.sockets.on("connection", (socket) => {
  console.log("Ok react");

  socket.on("send mess", (data) => {
    io.sockets.emit("add mess", { msg: data });
  });

  socket.on("create chat", (data) => {
    io.sockets.emit("add chat", { chat: data });
  });
});

// sequelize.sync()

http.listen(9999, () => console.log("OK, 9999 port"));
