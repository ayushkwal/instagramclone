// module.exports = {
//     google:{
//         clientId:'1047120560617-fkq52nnho8v4jvp80kr8tmvo6ub52up8.apps.googleusercontent.com',
//         secretKey:'EIy4ARwZGIl1swYcE4odrERv'
//     },
//     secret:{
//         secretKey: 'ayush secret key'
//     },
//     user:{
//         email:'ayush.kwal@gmail.com',
//         password:'airtel123@'
//     },
//     mongo:{
//         uri:'mongodb+srv://ayush:ayush1002@cluster0.jawu5.mongodb.net/instagramclone?retryWrites=true&w=majority'
//     }
// }

if(process.env.NODE_ENV==='production')
{
    module.exports = require('./prod')
}
else{
    module.exports = require('./dev')
}