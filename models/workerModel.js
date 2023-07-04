const mongoose = require("mongoose");
const WorkerModel = mongoose.model(
  "worker",
  new mongoose.Schema({
    firstname: {
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
    provider: {
      type: String,
      required: true,
    },
    clientId: {
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
    latitude: {
      type: String,
      required: false,
    },
    longitude: {
      type: String,
      required: false,
    },
    cratedAt: {
      type: Date,
      default: Date.now,
    },
    work: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    workTime: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: false,
    },
  })
);

module.exports = { WorkerModel };
