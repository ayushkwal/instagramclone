const express = require('express')
const mongoose = require('mongoose')
const {isEmail} = require('validator')
const {ObjectId} = mongoose.Schema.Types;

// name,age,email,blood,address,pincode,demand,phone,area
const messageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please enter Title'],
        lowercase:true
    },
    description:{
        type:String,
        // required:[true,'please enter Description'],
    },
    user:{
        type:String,
        required:[true,'NO user exist']
    },
    photo:
    {
        type:String,
        lowercase:true

    },
    id:{
        type:ObjectId,
        ref:'user'
    }

})


const comment = mongoose.model('Comment',commentSchema);
module.exports = comment;