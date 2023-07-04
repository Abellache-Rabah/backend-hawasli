const mongoose = require("mongoose");
const MsgModel = mongoose.model(
  "msg",
  new mongoose.Schema({
    msg: {
      type: String,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
    },
    idUserTo: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  })
);
module.exports = { MsgModel };
