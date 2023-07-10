const { jwtverify } = require("../../middlewares/jwt");
const chat = require("../../controllers/chatController");
const ChatRouter = require("express").Router();

ChatRouter.route("/")
            .get(jwtverify, chat.getMsg)
            .post(chat.sendMsg);
ChatRouter.route("/chat")
            .get(jwtverify, chat.getChat);

module.exports = { ChatRouter };
