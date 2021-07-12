const express = require('express')
const mongoose = require('mongoose')
const {isEmail} = require('validator')
const {ObjectId} = mongoose.Schema.Types;

// name,age,email,blood,address,pincode,demand,phone,area
const donateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter name'],
        lowercase:true
    },
    age:{
        type:Number,
        required:[true,'please enter age'],
    },
    email:
    {
        type:String,
        unique:[true,'you have already responded'],
        required:[true,'please enter email address'],
        validate:[isEmail,'please enter valid email address'],
        lowercase:true

    },
    blood:{
        type:String,
        required:[true,'please enter blood'],
    },
    address:{
        type:String,
        required:[true,'please enter address'],
    },
    pincode:{
        type:String,
        required:[true,'please enter pincode'],
    },
    demand:{
        type:String,
        required:[true,'please enter demand'],
    },
    phone:{
        type:String,
        required:[true,'please enter phone'],
    },
    area:{
        type:String,
        required:[true,'please enter area'],
    },
    id:{
        type:ObjectId,
        ref:'plasmaUser'
    },
    actualid:{
        type:String,
    }

})


const user = mongoose.model('plasmaUserDonators',donateSchema);

module.exports = user;