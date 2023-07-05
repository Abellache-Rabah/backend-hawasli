const mongoose = require("mongoose");
const WorkerModel = mongoose.model(
  "worker",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    sex: {
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
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
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
    baladia : {
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
      required: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    workTime: {
      type: String,
      required: false,
    },
    photos: {
      type: [String],
      required: false,
    },
  })
);

module.exports = { WorkerModel };
