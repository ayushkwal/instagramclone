const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../secret');
const {userb} =  require('../models/userModel');

//Serializing user
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
//Deserializing User
passport.deserializeUser(async(id,done)=>{
    const deserializingUser = await userb.findById(id);
    if(deserializingUser)
    {
        done(null,deserializingUser);
    }
    
})





passport.use(new GoogleStrategy({
    clientID: keys.google.clientId,
    clientSecret: keys.google.secretKey,
    callbackURL: "/auth/google/redirect"
  },async(accessToken, refreshToken, profile, done)=>{
      console.log(profile)
      const doesUserExist = await userb.findOne({'googleId':profile.id})
      if(doesUserExist)
      {
        console.log('user already exist')
        done(null,doesUserExist);
      }
      else
      {
        const user = await userb.create({'username':profile.displayName,'googleId':profile.id})
        if(user)
        {
        done(null,user);
        console.log('new user created')
        }
       }
  }
  
));



