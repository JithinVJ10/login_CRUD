const mongoose = require('mongoose');


var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },

    status : String
})

const Userdb = mongoose.model('userdata', schema);

module.exports = Userdb;