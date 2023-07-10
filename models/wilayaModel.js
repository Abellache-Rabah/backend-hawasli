const mongoose = require("mongoose");
const {Schema} = require('mongoose');
const wilayaModel = mongoose.model(
  "wilaya",
  new Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ar_name: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
  })
);
const cityModel = mongoose.model(
  "commune",
  new Schema({
    id: {
      type: String,
      required: false,
    },
    post_code: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    wilaya_id: {
      type: String,
      required: false,
    },
    ar_name: {
      type: String,
      required: false,
    },
    longitude: {
      type: String,
      required: false,
    },
    latitude: {
      type: String,
      required: false,
    },
  })
);
module.exports = { cityModel,wilayaModel };
