const { path } = require("express/lib/application");
const mongoose = require("mongoose");
const ConsummerModel = mongoose.model(
  "consummer",
  new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    wilaya: {
      type: String,
      required: true,
    },
    baladia: {
      type: String,
      required: true,
    },
    picture: {
      required: false,
      type: String,
    },
    comments: {
      type: [String],
      required: false,
    },
  })
);
module.exports = { ConsummerModel };
