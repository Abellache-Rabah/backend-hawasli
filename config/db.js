const { path } = require('express/lib/application');
const mongoose = require('mongoose');


const User = mongoose.model("user", new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    age : {
        type: int,
        required: true
    },
    wilaya : {
        type: String,
        required: true
    },
    baladia : {
        type: String,
        required: true
    },
    picture : {
        required: false,
        type: path
    },
    comments : {
        type: [String],
        required: false
    }
}))



module.exports = {User}