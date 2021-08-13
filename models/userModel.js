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
    }],
    followingUsers:[{
        type:String,
    }],
    savedPosts:[{
        type:Object,
    }],
    fullName:{
        type:String,
        default:'John Doe'
    },
    bio:{
        type:String,
        default:`Hey there, I'm using Instagram!`
    },
    dob:{
        type:String,
        default:'1-1-1'
    },
    Location:{
        type:String,
    },
    Website:{
        type:String
    },
    profile:{
        type:String,
        default:'https://instagram.fadb6-5.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fadb6-5.fna.fbcdn.net&_nc_ohc=ZLFK6RFNcgAAX_VluyV&edm=AIhG1boBAAAA&ccb=7-4&oh=27b14e7acb8dda9a0eabea608b65ffc2&oe=611DBE8F&_nc_sid=5c7e6a&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4'
    },

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