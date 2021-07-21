const jwt = require('jsonwebtoken')
const {user} = require('../models/userModel')
const mongoose = require('mongoose');

const requireAuth = async (req,res,next)=>{
    console.log('checking auth');
    const token = req.cookies.jwt;
    const {authorization} = req.headers
    console.log(authorization,'is token',JSON.stringify(req.headers))
    if(token)
    {
        jwt.verify(token,'ayush secret key',async (err,decodedToken)=>{
            if(err)
            {
                res.json({loginError:'You need to login'})
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
            res.json({loginError:'You need to login'})
        }
        // res.redirect('/login')
    }

}


module.exports={requireAuth}
