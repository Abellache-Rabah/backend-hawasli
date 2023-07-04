const mongoose = require("mongoose");
const TokenModel = mongoose.model(
  "token",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    token: {
      type: String,
      required: true,
    },
  })
);

module.exports = { TokenModel };
