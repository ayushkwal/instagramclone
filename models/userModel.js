const express = require('express')
const mongoose = require('mongoose')
const {isEmail} = require('validator')


const userSchema = new mongoose.Schema({
    username:
    {
        type:String,
        unique:[true,'Username already exists']
    },
    email:
    {
        type:String,
        unique:[true,'email already registered'],
        required:[true,'please enter email address'],
        validate:[isEmail,'please enter valid email address'],
        lowercase:true

    },
    password:{
        type:String,
        required:true,
        minLength:[6,'Please Enter minimum 6 characters']
    },
    followers:{
        type:Number,
        default:0
    },
    following:{
        type:Number,
        default:0
    },
    followUsers:[{
        type:String,
        unique:true
    }],
    followingUsers:[{
        type:String,
        unique:true
    }],

    resetToken:String,
    expiresIn:Date

})

const userSchema2 = new mongoose.Schema({
    username:String,
    googleId:String

})

const user = mongoose.model('instadatanew',userSchema);
const userb =  mongoose.model('instawithgooglesignin',userSchema2);

module.exports = {user,userb};