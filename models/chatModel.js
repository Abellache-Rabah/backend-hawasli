const mongoose = require("mongoose");
const ChatModel = mongoose.model(
  "chat",
  new mongoose.Schema({
    idUser: {
      type: String,
      required: true,
    },
    idUser2: {
      type: String,
      required: true,
    },
    msgsIds: {
      type: [String],
    },
    createAt:{
        type: Date,
        default: Date.now
    }
  })
);
module.exports = { ChatModel };
