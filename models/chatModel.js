const express = require('express')
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;

// name,age,email,blood,address,pincode,demand,phone,area
const chatSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    sender:{
        type:String,
    },
    receiver:
    {
        type:String,

    },
    conversationid:{
        type:String,
        
    },
    created_at:{
        type:Date,
        default:Date.now()

    }

})


const chat = mongoose.model('chat',chatSchema);
module.exports = chat;