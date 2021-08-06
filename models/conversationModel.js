const express = require('express')
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;

const conversationSchema = new mongoose.Schema({
    usera:{
        type:String,
        lowercase:true
    },
    userb:{
        type:String,
        lowercase:true
    }
})
const conversation = mongoose.model('conversation',conversationSchema);
module.exports = conversation;