const express = require('express');
const {user} = require('../models/userModel');
// const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')
const secret = require('../secret')



//Handling All Errors Regarding Saving Data
const handleErrors = (err)=>{
    let errors = { email: '', password: '' };
    console.log('handling errors:::::::::::::::::::::::::::::::::')
    console.log(err.message,err.code)
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }
    if(err.message.includes('plasmaUser validation failed'))
    {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors
}

//CreatIng a Token
const createToken =(id)=>{
    return jwt.sign({id},secret.secret.secretKey,{expiresIn:3*24*60*60})
}



module.exports.login_get = (req,res)=>{
    res.render('login');
}


module.exports.signup_get = (req,res)=>{
    res.render('signup');
}


module.exports.login_post = async(req,res)=>{
    const {email,password}=req.body;
    console.log(email)
    
        const checkUser = await user.findOne({email})
        if(checkUser)
        {
            console.log('checking user')
            console.log(checkUser)
            if(checkUser.password===password)
            {
                const token = createToken(checkUser._id);
                res.cookie('jwt',token,{maxAge:3*24*60*60*1000,httpOnly:true})
               res.json({user:checkUser._id})
            }
            else{
                res.json({email:'',password:'Wrong Password'})
            }
        }
        else{
            console.log('sorry,we found in db')
            res.json({email:'Email Does not exist',password:''})
        }
    
    
    res.json('done')
}


//Handling Post Request for Signup
module.exports.signup_post = async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const newUser = await user.create({username,email,password})
        const token = createToken(newUser._id);
        res.cookie('jwt',token,{maxAge:3*24*60*60*1000,httpOnly:true})
        console.log(newUser)
        res.json({user:newUser._id})
    }
    catch(err){
        console.log(err);
        const errors = handleErrors(err);
        console.log(errors)
        res.json({errors:errors})


    }
    
}



//Handling forgot password 

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:secret.user.email,
        pass:secret.user.password
    }
})




module.exports.forgot_post = (req,res)=>{
    console.log('done here1')
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err);
        }
        const token = buffer.toString("hex");
        console.log(req.body.email)
        user.findOne({email:req.body.email}).then(userFind=>{
            if(!userFind)
            {
                return res.json({error:'user doesnot exist'});
            }
            else{
                console.log('done here2')
                userFind.resetToken = token
                userFind.expiresIn = Date.now() + (24*60*60*1000*3)
                userFind.save().then((result)=>{
                    console.log(userFind.email);
                    transporter.sendMail({
                        
                        to:userFind.email,
                        from:"ayush.kwal@gmail.com",
                        subject:"password reset",
                        html:`<p>Password Reset Link</p><a href="http://localhost:3000/reset/${token}">Reset</a>`
                    },function(err,data){
                        if(data)
                        {
                            console.log('data sent')
                        }
                    })
                    console.log('done here5')
                    return res.json({message:'check your email'})
                    
                }).catch(err=>{
                    console.log(err)
                })
               


            }
        }).catch(()=>{
            return res.json({error:'user doesnot exist'});
        })
    })

}

module.exports.reset_post = (req,res)=>{
   console.log(req.body)
   const {password,token} = req.body;
   user.findOne({resetToken:token,expiresIn:{$gt:Date.now()}   })
   .then(foundUser=>{
       console.log('found ')
       foundUser.password = password;
       foundUser.expiresIn = undefined;
       foundUser.resetToken = undefined;
       
       foundUser.save().then(((saved)=>{
          return  res.json({message:'Password Updated Successfully.'})

       }))
    
   })
   .catch(()=>{
       return res.json({error:'Session Expired.'})
   })

    
}

//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