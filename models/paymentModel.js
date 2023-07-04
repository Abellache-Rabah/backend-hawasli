const mongoose = require("mongoose");
const Payment = mongoose.model(
  "payment",
  new mongoose.Schema({                
    idWorker : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "worker"
    },
    paymentType : {
        type: String
    },
    price : {
        type: Number
    },
    card : {
        type: String
    },
    ccp : {
        type: String
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
  })); //


  module.exports = {Payment};