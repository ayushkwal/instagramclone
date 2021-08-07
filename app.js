// const http = require('http');
const express = require('express')
const app = express();
const controller = require('./Controllers/authControllers');
const mongoose = require('mongoose');
const authRoutes = require('./Router/authRoutes');
const CookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware')
const CookieSession = require('cookie-session')
const Secret = require('./config/secret')
const passport = require('passport')
//Passport
const authGoogle = require('./Router/authGoogle')
const postRoutes = require('./Router/postRoutes')
const cors = require('cors')
const io = require('socket.io')(8000, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
})

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
const dbURI = Secret.mongo.uri
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(()=>console.log('connected to db'))
.catch(err=>console.log(err))



//All requests
// app.get('/',(req,res)=>res.send('this is homepage'))
// app.get('/index',(req,res)=>res.render('index'))


app.use(authRoutes)
app.use(postRoutes);
app.use('/auth',authGoogle);



//socket connections
const users = {}
io.on('connection',socket=>{
  socket.on('new-user-joined',name=>{
    users[name] = socket.id;
    // users[socket.id] = name;
    console.log(name,'joined the chat')
  })

    socket.on("private", function(data) {       
      console.log(data,'jjj')
      io.to(users[data.to]).emit("privateget", {msg:data.msg,by:data.by,to:data.to});
  });



})




//Server Listening
const port = process.env.PORT||3000;
    app.listen(port,  () => {
    console.log(`Server running at http://:${port}/`);
  })