// const http = require('http');
const express = require('express')
const app = express();
const controller = require('./Controllers/authControllers');
const mongoose = require('mongoose');
const authRoutes = require('./Router/authRoutes');
const donateRoutes = require('./Router/authDonate')
const CookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware')
const CookieSession = require('cookie-session')
const passport = require('passport')
//Passport
const authGoogle = require('./Router/authGoogle')
const cors = require('cors')

//Setting View Engine as EJS
app.set('view engine','ejs');


//All static files will be saved in public folder
app.use(express.static('public'));
app.use(cors());
//For handling Json Data
app.use(express.json())
app.use(CookieParser())
app.use(CookieSession({
  maxAge:24*60*60*1000,
  keys:['ayushkhan']
}))

app.use(passport.initialize());
app.use(passport.session())

// Mongoose Connection for Company DB
const dbURI = 'mongodb+srv://ayush:ayush1002@cluster0.jawu5.mongodb.net/instagramclone?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(()=>console.log('connected to db'))
.catch(err=>console.log(err))





//All requests
app.get('/',(req,res)=>res.send('this is homepage'))
app.get('/index',(req,res)=>res.render('index'))
app.get('/donor',requireAuth,(req,res)=>res.render('donor'))
app.get('/acceptor',requireAuth,(req,res)=>res.render('acceptor'))
// app.post('/donateregister',(req,res)=>{
//   console.log('gggg')
//   res.send('got it')
// })
//For Authenticating Requests
app.use(authRoutes)
app.use(donateRoutes)
app.use('/auth',authGoogle);
// app.use('/profile',profileGoogle);






//Server Listening
const hostname = '127.0.0.1';
const port = 3000;
    app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  })

