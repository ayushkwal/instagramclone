
import React, { useState, useEffect,useContext } from 'react'
import {useHistory} from 'react-router-dom';
import { io } from "socket.io-client";
import { UserContext } from '../App';
import { format, render, cancel, register } from 'timeago.js';
export default function EditProfile(req, res) {

  // for development 
  // const socket = io("http://localhost:8000");

  //for production  
  const socket = io("/")

  const history = useHistory();
  const [msg, setMsg] = useState('');
  const [sendto, setSendto] = useState('');
  const [send, setSend] = useState(false);
  const [sending, setSending] = useState(false);
  const [msgloading, setmsgloading] = useState(false);
  const [allmessages, setAllmessages] = useState([]);
  const [newmessage, setNewmessage] = useState([]);
  const [friendlist, setFriendlist] = useState([]);
  const [chattoggle,setChattoggle] = useState('users')
  const userme = localStorage.getItem("userName");
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
 
 
  console.log('width is', window.innerWidth)

  //first getting all followers and followings
  useEffect(async () => {

    const frnds = await fetch('/friendslist', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ userme })
    })
    const friendsjson = await frnds.json();

    console.log(friendsjson)
    console.log('friends we get are:', friendsjson)
    setFriendlist(friendsjson)
    
  }, [])






  //Now getting all previous chats
  useEffect(async () => {
    const getmsg = await fetch('/getchat', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ sender: sendto, receiver: userme })
    })
    const chats = await getmsg.json();

    console.log(chats)
    setNewmessage([])
    setAllmessages(chats)
    document.getElementById("chatinput")?.focus();
    console.log('messages we get are:', allmessages)
  }, [sendto])


  useEffect(() => {
    console.log('calledd')
    socket.on("connect", () => {
      socket.send("Hello!");
      socket.emit('new-user-joined', localStorage.getItem("userName"))
    });
    console.log('hey')
  }, [])


  useEffect(() => {


    socket.on("privateget", async (data) => {
      console.log(data.msg, data.by, data.to, 'we get', sendto);

      console.log(allmessages, 'gggggggg');
      // setNewmessage([...newmessage,{msg:data.msg,status:'receive-message',by:data.by}])
      setNewmessage(messages => [...messages, { msg: data.msg, status: 'receive-message', by: data.by }]);


      //now saving to db that message also
      console.log('now saving to db');
      const msgSave = await fetch('/savechat', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          msg: data.msg,
          sender: data.by,
          to: data.to
        })
      })
      const msgGet = await msgSave.json();
      console.log(msgGet, 'is return value')

    });


  }, [])






  const sendmessage = (event) => {
    event.preventDefault();
    console.log('sendmessage called-->');
    if (msg != '') {
      setNewmessage(messages => [...messages, { msg, status: 'sent-message' }]);
      socket.emit("private", { msg: msg, to: sendto, by: localStorage.getItem("userName") })
      // document.getElementById("chatinput")?.innerText = ''
      document.getElementById("chatinput")?.focus();
    }
  }

  return (
    <div id="directbox">
      <div id="mainbox">
        <div id="friendbox">
          <h2 style={{ fontSize: '20px' }}>@{userme}</h2>
          <hr></hr>
          <ul id="directul">
            {
              friendlist.map((item) => {
                return (
                  <li id="directli" onClick={() => setSendto(item)}>@{item}</li>
                )
              })
            }

          </ul>
        </div>
        <div id="chatbox">
          {sendto == '' ?
            <>
              <div id="nochat" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="100" height="100" viewBox="0 0 24 24" stroke-width="1" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                  <line x1="8" y1="9" x2="16" y2="9" />
                  <line x1="8" y1="13" x2="14" y2="13" />
                </svg>
                <p style={{ color: 'gray' }}>Your Messages</p>
                <p style={{ color: 'gray' }}>Send Private message to your friends.</p>
              </div>
            </>
            :
            <>
              <h1 style={{ fontFamily: 'cursive', fontWeight: 'lighter' }}>@{sendto}</h1>
              <hr></hr>
              { }
              <div id="sendingcontainer">
                <div id="mememe">
                  {allmessages.map((item) => {
                    return (
                      userme == item.sender ?

                        <div id="sent-message">{item.message}<p>{format(item.created_at)}</p></div>
                        :

                        <div id="receive-message">{item.message}<p>{format(item.created_at)}</p></div>


                    )
                  })}


                  {newmessage.map((item) => {
                    return (
                      <div id={item.status} > {item.msg}</div>
                    )
                  })}


                </div>

                <div id="post-message">
                  <div id="sendcontainer">
                    <input id="chatinput" onChange={(e) => setMsg(e.target.value)} type="text"></input>
                    <button id="chatbtn" onClick={sendmessage}>Send</button>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}











