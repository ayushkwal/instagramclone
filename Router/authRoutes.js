const express= require('express');
const authController = require('../Controllers/authControllers')
const router = express.Router();

router.get('/login',authController.login_get)
router.post('/login',authController.login_post)
router.get('/signup',authController.signup_get)
router.post('/signup',authController.signup_post)


//For sake of Forgotting Password
router.get('/forgot',(req,res)=>res.render('forgot'))

router.post('/forgot',authController.forgot_post)
router.get('/reset/:token',(req,res)=>res.render('reset',{token:req.params.token}))
router.post('/reset',authController.reset_post)


module.exports = router
