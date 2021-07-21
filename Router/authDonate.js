const express= require('express');
const donateController = require('../Controllers/donateControllers')
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/messageModel');
const {requireAuth} = require('../middleware/authMiddleware')




//when user donates then this request will handle
router.post('/donateregister',requireAuth,async (req,res)=>{
    console.log('donarte');
    console.log(req.body);
    console.log(req.user)
    const{name,age,email,blood,address,pincode,demand,phone,area} = req.body;
    const newuser = await  User.create({name,age,email,blood,address,pincode,demand,phone,area,id:req.user,actualid:req.user.email});
    if(newuser)
    {
        console.log('saved')
        res.json({message:'Information Shared Successfully!'})
    }
    else{
        console.log(error=>console.log(error))
    }
    
})


//when acceptor is demanding for data
router.post('/acceptor',async (req,res)=>{
    console.log('donarte');
   const data = await User.find({});
   res.json({user:data});
    
})


module.exports = router