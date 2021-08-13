import React, { useEffect, useState,useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-modal'
import { UserContext } from '../App';
export default function Home() {


    const history = useHistory()
    const [userId, setUserId] = useState('')
    const [data, setData] = useState([])
    const [comment, setComment] = useState('')
    const [likeModal, setLikeModal] = useState(false)
    const [likersArray, setLikersArray] = useState([])
    const [postcomment,setPostcomment] = useState(false);
    const userme = localStorage.getItem("userName")
    const{state,dispatch} = useContext(UserContext)


    // if(!state)
    // {
    //   history.push('/login');
    // }
    //   else {
    //       // setUserId(isLoggedIn)
    //   }
    //to check whether user is logged in or not you have to check him using cookies not by own (like local storage).
 const checkUserAuthenticated = async ()=>{
    try{
        const res = await fetch('/checkuser',{
            method:'get',
            headers:{
                Accept:"application/json",
                "Content-type":"application/json"
            },
            credentials:"include"
        })
        const data=await res.json()
        console.log(data)
        if(data.loginError)
        {
            history.push('/login')
        }else{
            dispatch({type:"USER",payload:{userId:data._id,userName:data.username}})
        }
    }catch(err){
        console.log(err)
        history.push('/login');
    }
 }
    useEffect(()=>{
        checkUserAuthenticated();
    },[])

    useEffect(async () => {
        const res = await fetch('/getPost', ({
            method: "post",
            body: JSON.stringify({ userId }),
            headers: {
                'content-type': "application/json"
            }
        }))
        const returnData = await res.json();
        console.log(returnData);
        setData(returnData.result);
        console.log(data,'is printing post data');
        setPostcomment(false)
    },[postcomment])



    const submitComment = async(id) => {
        console.log('got it',);
        const val = comment
        console.log('id of post  is', id, 'and value is ', val);
        const userData = localStorage.getItem("userName");
        await fetch('/postComment', ({
            method: 'post',
            body: JSON.stringify({ PostId: id, comment: val, sendBy: userData }),
            headers: {
                'content-type': 'application/json'
            }
        }))
        setPostcomment(true)
        setComment('')
    }

        //for liking post
    const likePost = (id) => {
        console.log(id);
        const userName = localStorage.getItem("userName");
      fetch('/likepost', ({
            method: 'post',
            body: JSON.stringify({ userName, id }),
            headers: {
                'content-type': 'application/json'
            }
        })).then(()=>{
            console.log('liked success');
          const verynewdata =    data.map((item)=>{
                if(item._id==id)
                {
                    item.like.push(userName);
                    console.log('updated')
                    return item;
                }
                else{
                    return item;
                }
            })
            console.log('updated:',data)
            setData(verynewdata);
        })
    }
    //unlike post
    const unlikePost = (id) => {
        console.log(id);
        const userName = localStorage.getItem("userName");
      fetch('/unlikepost', ({
            method: 'post',
            body: JSON.stringify({ userName, id }),
            headers: {
                'content-type': 'application/json'
            }
        })).then(()=>{
            console.log('unliked success');
          const verynewdata2 =    data.map((item)=>{
                if(item._id==id)
                {
                   if(item.like.includes(userName))
                   {
                       item.like = item.like.filter(a=>a!=userName)
                   }
                    console.log('updated')
                    return item;
                }
                else{
                    return item;
                }
            })
            console.log('updated:',data)
            setData(verynewdata2);
        })
    }
    //save post
        const savepostforme = async(item)=>{
            console.log('checking for saving')
            console.log(item,userme)
            await fetch('/savepostforme',{
                method:'post',
                body: JSON.stringify({item,userme}),
                headers:{
                    'Content-type':'application/json'
                }
            }).then((res)=>{
               return res.json()
    
            }).then((data)=>console.log(data))
    
    
        }
   

    return (

        <div>
            <div className="home">
                <div id="posts" className="posts">

                    {data.map(item => {
                        return (

                            <div className="post">
                                <div className="postcaptions">
                                    <h1 id="postuserheading"><img id="profileimgatpost" src={item.profile} width="50px" height="50px"></img><Link to={'/profile?user=' + item.user}><span style={{color:'gray',fontFamily:500,height:20,fontSize:20}}>{item.user}</span></Link></h1>
                                    <hr></hr>
                                    <p style={{fontSize:22,color:'gray',fontWeight:400,padding:"10px 10px"}}>{item.title}</p>
                                    <h6 style={{fontSize:19,color:'gray',fontWeight:100,padding:"10px 10px"}}>{item.description}</h6>

                                </div>
                                <div className="postimage">
                                    <img src={item.image} alt="" ></img>
                                </div>
                                {/* all likes  */}
                                <div id="likenum" className={"likenum"+item._id} onClick={() => { setLikersArray(item.like); setLikeModal(true) }} style={{ cursor: 'pointer', color: 'gray', fontSize: '17px', display: 'inline' }}>{item.like.length} Likes</div>
                                <div className="likeshare">
                                    {
                                        item.like.includes(localStorage.getItem("userName")) ?
                                        <button id="likebtn" onClick={() => { unlikePost(item._id) }} style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', cursor: 'pointer' }}><img src="https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png" /></button>
                                        // <button disabled style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', cursor: 'pointer' }}><img src="https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png" /></button>
                                            :
                                            <button id="likebtn" onClick={() => { likePost(item._id) }} style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', cursor: 'pointer' }}><img id="likeheart" src="https://img.icons8.com/ios/50/000000/like.png" /></button>
                                    }

<svg onClick={()=>{document.querySelector(".incomment"+item._id).focus()}} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
  <line x1="12" y1="12" x2="12" y2="12.01" />
  <line x1="8" y1="12" x2="8" y2="12.01" />
  <line x1="16" y1="12" x2="16" y2="12.01" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="10" y1="14" x2="21" y2="3" />
  <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
</svg>
                                    <img onClick={()=>{savepostforme(item)}} src="https://img.icons8.com/ios-filled/27/000000/bookmark-ribbon.png"/>
                                    
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

                                    <input type="text" id="incomment" className={"incomment"+item._id} onChange={e => setComment(e.target.value)} placeholder="Add Comment" />
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

