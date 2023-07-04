const mongoose = require("mongoose");
const Comment = mongoose.model(
  "comment",
  new mongoose.Schema({
    idConsummer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "consummer"
    },
    idWorker : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "worker"
    },
    content : {
        type: String
        
    },
    rating : {
        type: Number
    },
    createdAt  : {
        type: Date,
        default: Date.now
    }
  }));

  module.exports = { Comment };
