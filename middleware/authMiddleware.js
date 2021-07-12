const jwt = require('jsonwebtoken')
const {user} = require('../models/userModel')
const mongoose = require('mongoose');

const requireAuth = async (req,res,next)=>{
    const token = req.cookies.jwt;
    console.log(token)
    if(token)
    {
        jwt.verify(token,'ayush secret key',async (err,decodedToken)=>{
            if(err)
            {
                res.redirect('/login')
            }
            else{
               let decodeduser = await user.findById(decodedToken.id);
               console.log('data got is' + decodeduser)
                req.user = decodeduser
                console.log('NOOOOOOOO err')
                next();
            }
          
        })

    }
    else{
        if(req.user)
        {
            
            next();
        }
        else{
            res.redirect('/login')
        }
        res.redirect('/login')
    }

}


module.exports={requireAuth}
