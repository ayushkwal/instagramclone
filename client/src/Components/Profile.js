import React, { useState, useEffect,useContext  } from 'react'
import { Link,useHistory } from 'react-router-dom'
import Modal from 'react-modal'
import { UserContext } from '../App';

export default function Profile(req, res) {

    const history = useHistory()
    console.log(req.query, req.params, req.url)
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log(urlSearchParams);
    const params = Object.fromEntries(urlSearchParams.entries());
    const userName = localStorage.getItem("userName");
    console.log(params);
    console.log(JSON.stringify(params))

    const [data, setData] = useState([])
    const [postdata, setPostdata] = useState([])
    const [followModal, setFollowModal] = useState(false)
    const [toShowInModal, setToShowInModal] = useState([])                                                  //last used here
    const [whattoshow, setWhattoshow] = useState('post')
    const{state,dispatch} = useContext(UserContext)


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
        const res = await fetch('/profileView', ({
            method: "post",
            body: JSON.stringify(params),
            headers: {
                'content-type': 'application/json'
            }
        }))
        const returnData = await res.json()
        console.log(returnData);
        setPostdata(returnData.postGet)
        setData(returnData.profileGet)
        setToShowInModal(returnData.profileGet.followingUsers)
        setToShowInModal(returnData.profileGet.followUsers)

        console.log(postdata, 'is postdata', data, 'is always data');
    }, [])

    const followNow = async () => {
        console.log('clicked');
        const followhim = await fetch('/followUser', ({
            method: "post",
            body: JSON.stringify({ followBy: userName, followTo: params }),
            headers: {
                'content-type': 'application/json'
            }
        }))
        const followInfo = await followhim.json()
        console.log(followInfo);
    }

    return (
        <div>
            <Modal
                isOpen={followModal}
                style={{ width: '400px', fontSize: 32 }}
                id="mymodal"
            >
                <button id="closemodal" onClick={() => { setFollowModal(false) }}><img src="https://img.icons8.com/material-sharp/96/4a90e2/railroad-crossing-sign--v1.png" /></button>
                <h1 style={{ textAlign: 'center' }}>In connection with...</h1>
                <hr />
                <ul id="likersul">
                    <li>Users: {toShowInModal.length}</li>
                    {toShowInModal.map(followuser => {
                        return <li id="likersli" ><Link to={'/profile?user=' + followuser}>@{followuser}</Link></li>
                    })}

                </ul>
            </Modal>

            <div className="pro1">
                <div className="dp">
                    <img src={data.profile}  ></img>
                </div>
                <div className="detail">
                    <h2>@{data?.username}</h2>
                    <h4 style={{textAlign:'center',fontSize:20}}>{data.fullName}</h4>
                    <div className="followdetails" style={{ flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <h4>Posts: {postdata?.length}  </h4>
                            <h4 style={{ cursor: 'pointer' }} onClick={() => { setToShowInModal(data.followUsers); setFollowModal(true) }}>Followers: {data.followUsers ? data.followUsers.length : 0}  </h4>
                            <h4 style={{ cursor: 'pointer' }} onClick={() => { setToShowInModal(data.followingUsers); setFollowModal(true); }}>Following: {data.followingUsers ? data.followingUsers.length : 0}  </h4>
                        </div>
                        <h4>{data.email}</h4>
                    </div>
                    <div className="about">
                        {data.bio}
                    </div>
                    <div className="followdiv">

                        <button id={toShowInModal.includes(userName) ? "followedbtn" : "followbtn"} onClick={() => { followNow() }}>Follow</button>

                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="postandsave">
                <h3>Posts</h3>
                <svg onClick={() => { setWhattoshow('post') }} aria-label="Posts" fill="#262626" height="32" viewBox="0 0 48 48" width="32"><path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path></svg>
                <h3>Save</h3>
                <svg onClick={() => { setWhattoshow('save') }} aria-label="Saved" fill="#262626" height="32" viewBox="0 0 48 48" width="32"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
            </div>
            {whattoshow == 'post'
                ?
                <div className="savedata">
                    {
                        postdata.length > 0 ?
                            postdata.map(
                                (item) => {
                                    return (
                                        <div id="mypost">
                                            <img style={{ maxWidth: 350, maxHeight: 350 }} src={item.image} alt=""  ></img>
                                            <h4>{item.title}</h4>
                                            <h3>Description:{item.description}</h3>
                                        </div>
                                    )
                                })
                            :
                            <>
                                <div id="savesectionatnopost">
                                    <p>Start capturing and sharing your moments.
                                        Get the app to share your first photo or video.
                                        <div className="badge">
                                            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="android App" />
                                            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="ios app" />
                                        </div></p>
                                    <img src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg" width="200" height="200"></img>

                                </div>
                            </>
                    }
                </div>
                :
                <div className="saveotherusersdata">
                    {
                        data.savedPosts?.length > 0 ?
                            data.savedPosts?.map(
                                (item) => {
                                    return (
                                        <div id="mypost">
                                            <img style={{ maxWidth: 350, maxHeight: 350 }} src={item.image} alt="" ></img>
                                            <h4>{item.title}</h4>
                                            <h3>Description:{item.description}</h3>
                                        </div>
                                    )
                                })
                            :
                            <h1>No saved posts Posts...</h1>
                    }
                </div>
            }


        </div>
    )
}
