import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal'
export default function Home() {


    const history = useHistory()
    const [userId, setUserId] = useState('')
    const [data, setData] = useState([])
    const [comment, setComment] = useState('')
    const [likeModal, setLikeModal] = useState(false)
    const [likersArray, setLikersArray] = useState([])
    const [postcomment,setPostcomment] = useState(false);

    const isLoggedIn = localStorage.getItem("userId");
    if (!isLoggedIn) {
        history.push('/login')
    }
    else {
        // setUserId(isLoggedIn)
    }

    useEffect(async () => {
        const res = await fetch('http://localhost:3000/getPost', ({
            method: "post",
            body: JSON.stringify({ userId }),
            headers: {
                'content-type': "application/json"
            }
        }))
        const returnData = await res.json();
        console.log(returnData);
        setData(returnData.result);
        console.log(data);
        setPostcomment(false)
    },[postcomment])



    const submitComment = async(id) => {
        console.log('got it',);
        const val = comment
        console.log('id of post  is', id, 'and value is ', val);
        const userData = localStorage.getItem("userName");
        await fetch('http://localhost:3000/postComment', ({
            method: 'post',
            body: JSON.stringify({ PostId: id, comment: val, sendBy: userData }),
            headers: {
                'content-type': 'application/json'
            }
        }))
        setPostcomment(true)
        setComment('')
    }

    const likePost = (id) => {
        document.getElementById('likeheart').src = "https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png"
        console.log(id);
        const userName = localStorage.getItem("userName");
        fetch('http://localhost:3000/likepost', ({
            method: 'post',
            body: JSON.stringify({ userName, id }),
            headers: {
                'content-type': 'application/json'
            }
        }))

    }


    return (

        <div>
            <div className="home">
                <div id="posts" className="posts">

                    {data.map(item => {
                        return (

                            <div className="post">
                                <div className="postcaptions">
                                    <h1><Link to={'/profile?user=' + item.user}>{item.user}</Link></h1>
                                    <p>{item.title}</p>
                                    <h6>{item._id}</h6>

                                </div>
                                <div className="postimage">
                                    <img src="/dp.jpg" alt="" ></img>
                                </div>
                                {/* all likes  */}
                                <div id="likenum" onClick={() => { setLikersArray(item.like); setLikeModal(true) }} style={{ cursor: 'pointer', color: 'gray', fontSize: '17px', display: 'inline' }}>{item.like.length} Likes</div>
                                <div className="likeshare">
                                    {
                                        item.like.includes(localStorage.getItem("userName")) ?
                                            <button disabled style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', cursor: 'pointer' }}><img src="https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png" /></button>
                                            :
                                            <button id="likebtn" onClick={() => { likePost(item._id) }} style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', cursor: 'pointer' }}><img id="likeheart" src="https://img.icons8.com/ios/50/000000/like.png" /></button>
                                    }

                                    <img src="icons8-igtv.svg" alt="" />
                                    <img src="icons8-igtv.svg" alt="" />
                                    <img src="icons8-igtv.svg" alt="" />

                                </div>

                                <Modal
                                    isOpen={likeModal}
                                    style={{ width: '400px', fontSize: 32 }}
                                    id="mymodal"
                                >
                                    <button id="closemodal" onClick={() => { setLikeModal(false) }}><img src="https://img.icons8.com/material-sharp/96/4a90e2/railroad-crossing-sign--v1.png" /></button>
                                    <h1>Liked By</h1>
                                    <hr />
                                    <ul id="likersul">
                                        {likersArray.map(likers => {
                                            return <li id="likersli" ><Link to={'/profile?user=' + likers}>{likers}</Link></li>
                                        })}

                                    </ul>
                                </Modal>






                                <div className="postcomments">
                                    {
                                        item.comments.length > 0 ?

                                            item.comments.map(comment =>

                                                <div className="comment">
                                                    <h2><strong>{JSON.parse(comment).postedBy}:</strong> {JSON.parse(comment).text}</h2>
                                                </div>
                                            )
                                            :
                                            <h1></h1>
                                    }
                                </div>
                                <div className="addcomment">
                                    <svg aria-label="Emoji" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path></svg>

                                    <input type="text" id="incomment" onChange={e => setComment(e.target.value)} placeholder="Add Comment" />
                                    <button id="commentbtn" onClick={() => submitComment(item._id)} >Post</button>

                                </div>

                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
