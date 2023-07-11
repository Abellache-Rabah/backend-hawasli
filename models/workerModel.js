const mongoose = require("mongoose");
const workerSchema = new mongoose.Schema({
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
    type: Number,
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
  baladia: {
    type: String,
    required: true,
  },
  picture: {
    required: false,
    type: String,
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
    from: {
      type: String,
      required: false,
    },
    to: {
      type: String,
      required: false,
    },
  },
  photos: {
    name: {
      type: [String],
      required: false,
    },
    url: {
      type: [String],
      required: false,
    },
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: false,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: false,
    },
  },
});

workerSchema.index({ location: "2dsphere" });
const WorkerModel = mongoose.model("worker", workerSchema);
module.exports = { WorkerModel };
