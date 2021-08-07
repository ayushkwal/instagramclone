import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client";

import { format, render, cancel, register } from 'timeago.js';
export default function EditProfile(req, res) {
  const socket = io("http://localhost:8000");

  const [msg, setMsg] = useState('')
  const [send, setSend] = useState(false);
  const [sendto, setSendto] = useState('');
  const [sending, setSending] = useState(false)
  const [allmessages, setAllmessages] = useState([])
  const [newmessage, setNewmessage] = useState([])
  const [msgloading, setmsgloading] = useState(false)
  const userme = localStorage.getItem("userName")




  //first getting all chats
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
    setAllmessages(chats)
    console.log('messages we get are:', allmessages)
  }, [sendto])

  useEffect(()=>{
    setNewmessage([])
  },[sendto])


  useEffect(() => {
    console.log('calledd')
    socket.on("connect", () => {
      socket.send("Hello!");
      socket.emit('new-user-joined', localStorage.getItem("userName"))
    });
    console.log('hey')
  }, [])

  useEffect(() => {
    if (sending&&msg!='') {
      const sendmsg = async (e) => {
        console.log(msg, 'is data');
        setNewmessage([...newmessage,{msg,status:'sent-message'}])

        socket.emit("private", { msg: msg, to: sendto, by: localStorage.getItem("userName") })
        setMsg('')

      }
      sendmsg()
    }

    setSending(false)
  }, [sending])

  useEffect((e) => {
    socket.on("privateget", async (data) => {
      console.log(data.msg, data.by, data.to, 'we get', sendto);

      console.log(allmessages, 'gggggggg')
      setNewmessage([...newmessage,{msg:data.msg,status:'receive-message',by:data.by}])


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
  }, [allmessages])

  useEffect(() => {
    console.log(sendto, 'is setted')
  }, [sendto])

  return (
    <div id="directbox">
      <div id="mainbox">
        <div id="friendbox">
          <h1 style={{fontFamily:'cursive',fontWeight:'lighter'}}>@{userme}</h1>
          <hr></hr>
          <ul id="directul">
            <li id="directli" onClick={() => setSendto('luigi')}>@luigi</li>
            <li id="directli" onClick={() => setSendto('mario')}>@mario</li>
            <li id="directli" onClick={() => setSendto('toad')}>@toad</li>
            <li id="directli">@menmychoice</li>
            <li id="directli">@menmychoice</li>
            <li id="directli">@menmychoice</li>
            <li id="directli">@menmychoice</li>
            <li id="directli">@menmychoice</li>
            <li id="directli">@menmychoice</li>
            <li id="directli">@myfame</li>
            <li id="directli">@meindia</li>
            <li id="directli">@roy</li>
          </ul>
        </div>
        <div id="chatbox">
          {sendto == '' ?
            <>
              <div id="nochat" style={{ }}>
                <h1 style={{fontFamily:'cursive',fontWeight:'lighter'}}>Start Conversation</h1>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="400" height="400" viewBox="0 0 24 24" stroke-width="0.1" stroke="#0077b5" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
</svg>
              </div>
            </>
            :
            <>
              <h1 style={{fontFamily:'cursive',fontWeight:'lighter'}}>@{sendto}</h1>
              <hr></hr>
              { }
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
                   <div id={item.status} > { item.msg }</div>
                  )
                })}


              </div>
              <div id="post-message">
                <div id="sendcontainer">
                  <input id="chatinput" onChange={(e) => setMsg(e.target.value)} type="text"></input>
                  <button id="chatbtn" onClick={() => setSending(true)}>Send</button>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}











