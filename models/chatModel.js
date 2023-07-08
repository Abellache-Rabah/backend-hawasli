const mongoose = require("mongoose");
const ChatModel = mongoose.model(
  "chat",
  new mongoose.Schema({
    idUser: {
      type:  mongoose.Schema.Types.ObjectId,
      required: true,
    },
    idUser2: {
      type:  mongoose.Schema.Types.ObjectId,
      required: true,
    },
    msgsIds: {
      type: [String],
      ref:"msg"
    },
    createAt:{
        type: Date,
        default: Date.now
    }
  })
);
module.exports = { ChatModel };
