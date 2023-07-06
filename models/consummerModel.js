const { path } = require("express/lib/application");
const mongoose = require("mongoose");
const ConsummerModel = mongoose.model(
  "consummer",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: false,
    },
    clientId: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: false,
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
      required: false,
    },
    wilaya: {
      type: String,
      required: false,
    },
    baladia: {
      type: String,
      required: false,
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
