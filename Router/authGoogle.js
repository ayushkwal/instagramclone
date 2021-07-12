const express= require('express');
const authController = require('../Controllers/authControllers')
const router = express.Router();
const passport = require('passport');
const passport_google = require('../passport/passport-google');



router.get('/login',(req,res)=>{
    res.end('login')
})


router.get('/logout',(req,res)=>{
    res.send('logout')

})

//  
// auth with google 
router.get('/google',passport.authenticate('google', { scope: ['profile'] }));


// callback redirection with google
router.get('/google/redirect' ,passport.authenticate('google'),(req, res) => {
    //passport returns a user in req
    // res.send(req.user);
    console.log('got here now redirecting')
    res.redirect('/donor')
})


module.exports = router

