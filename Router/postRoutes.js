const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware')
const message = require('../models/messageModel')
const { user } = require('../models/userModel')
const conversation = require('../models/conversationModel')
const chat = require('../models/chatModel')

router.post('/createpost', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const user = req.body.userName
    const id = req.body.user
    console.log(user, 'is userName');

    try {
        const newMsg = await message.create({ title: title, description: description, user: user, id: id })
        res.json({ user: newMsg._id })
    }
    catch (err) {
        console.log(err);
        // console.log(errors)
        res.json({ errors: err })
    }
})


router.post('/getPost', async (req, res) => {
    const me = req.body;
    console.log(me);
    const result = await message.find();
    // const dataget = await result.json();
    console.log(result);
    return res.json({ result })
})


router.post('/postComment', async (req, res) => {
    console.log(req.body)
    const comment = JSON.stringify({ text: req.body.comment, postedBy: req.body.sendBy })
    const val = await message.findByIdAndUpdate(req.body.PostId, {
        $push: { comments: comment }
    }, {
        new: true
    })
    // .populate("comments.postedBy", "_id name")
    // .exec((err, res) => {
    //     if (err) return res.json({ error: 'Something went wrong' })
    //     else return res.json({ data: "Comment added successfully" })
    // })
    // console.log(va);
    return res.json('done')
})


router.post('/profileView', async (req, res) => {
    const profiledata = req.body;
    console.log(profiledata);
    const profileGet = await user.findOne({ username: profiledata.user }, { 'password': 0 });
    const postGet = await message.find({ user: profiledata.user })
    console.log(profileGet, 'and his posts are', postGet);
    return res.json({ profileGet, postGet })
    // return res.json('gg')
})


router.post('/likepost', async (req, res) => {
    const idPost = req.body.id;
    const likedBy = req.body.userName;
    const likePost = await message.findByIdAndUpdate(idPost, {
        $push: { like: likedBy }
    }, { new: true })
    console.log(likePost);
    return res.json('gg')
})




router.post('/userSearch', async (req, res) => {
    console.log('got here');
    const userForSearch = req.body.search;
    console.log(userForSearch);
    const searchUsers = await user.find({ username: { $regex: userForSearch } }).limit(4)
    console.log(searchUsers);
    return res.json([searchUsers])
})

router.post('/followUser', async (req, res) => {
    console.log('got here');
    const { followBy, followTo } = req.body;
    console.log(req.body);
    const checkforuser = await user.findOne({ username: followTo.user });
    const checkforuser2 = await user.findOne({ username: followBy });
    //creating a conversation also between any new following request------>
    const checkconversationexist = await conversation.findOne({ user2: followBy, user1: followTo.user })
    if (!checkconversationexist) {
        conversation.create({ usera: followBy, userb: followTo.user })
        console.log('conversation crearted successfully')
    }
    else {
        console.log('conversation already created')
    }
    //-------------------------------------------------------------------->
    if (!checkforuser.followUsers.includes(followBy)) {
        console.log('going to save to user as followers');

        checkforuser.followUsers.push(followBy);
        checkforuser2.followingUsers.push(followTo.user);
        const checking = await checkforuser.save()
        const checking2 = await checkforuser2.save()
        console.log('followed');
        return res.json({ success: 'followed' })
    }
    else {
        console.log('already follow')
        return res.json({ err: 'You already follow him' })
    }

})




router.post('/editprofile', async (req, res) => {
    console.log('got here');
    console.log(req.body);

    // const searchUsers = await user.find({username : {$regex : userForSearch}}).limit(4)
    // console.log(searchUsers);
    return res.json(req.body)
})


router.post('/savechat', async (req, res) => {
    console.log('got here');
    console.log(req.body);
    const searchConversation = await conversation.find( {$or:[{usera: req.body.sender, userb: req.body.to},{usera: req.body.to, userb: req.body.sender}]})
    if (searchConversation) {
        console.log(searchConversation)
        console.log('yes conversation exist', searchConversation[0]._id)
        const savemsgnow = await chat.create({ message: req.body.msg, sender: req.body.sender, receiver: req.body.to, conversationid: searchConversation[0]._id })
        return res.json({ msg: 'message saved successfully' })
    }
    else {
        return res.json({ msg: 'No conversation between user' })
    }

})


router.post('/getchat', async (req, res) => {
    console.log('got here');
    console.log(req.body);
    //from //to  //msg
    const getallconversation = await chat.find(
        {$or:[{sender: req.body.sender, receiver: req.body.receiver},{receiver: req.body.sender, sender: req.body.receiver}]}
    )
    if (getallconversation) {
        console.log('yes chatting does really exist', getallconversation, getallconversation.length)
        return res.json(getallconversation)

    }
    return res.json('Say Hi to your new friend... &#x270C;')
})


module.exports = router
