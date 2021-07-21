
// import React, { useState, useEffect } from 'react'
// import {Link} from 'react-router-dom'
// import Modal from 'react-modal'

// export default function Profile(req, res) {

//     console.log(req.query, req.params, req.url)
//     //Get params of URL eg: localhost:3000//profile?name=ayush&sirname=khandelwal  ->  output:: {name:ayush , sirname:khandelwal}
//     const urlSearchParams = new URLSearchParams(window.location.search);
//     console.log(urlSearchParams);
//     const params = Object.fromEntries(urlSearchParams.entries());
//     const userName = localStorage.getItem("userName");
//     console.log(params);
//     console.log(JSON.stringify(params))

//     const [data, setData] = useState([])
//     const [postdata, setPostdata] = useState([])
//     const [followModal, setFollowModal] = useState(false)
//     const [toShowInModal,setToShowInModal] = useState([])                                                  //last used here

//     useEffect(async () => {
//         const res = await fetch('http://localhost:3000/profileView', ({
//             method: "post",
//             body: JSON.stringify(params),
//             headers: {
//                 'content-type': 'application/json'
//             }
//         }))
//         const returnData = await res.json()
//         console.log(returnData);
//         setPostdata(returnData.postGet)
//         setData(returnData.profileGet)

//         console.log(postdata, 'is postdata',data,'is always data');
//     }, [])


//     const followNow = async () => {
//         console.log('clicked');
//         const followhim = await fetch('http://localhost:3000/followUser', ({
//             method: "post",
//             body: JSON.stringify({ followBy: userName, followTo: params }),
//             headers: {
//                 'content-type': 'application/json'
//             }
//         }))
//         const followInfo = await followhim.json()
//         console.log(followInfo);
//     }

//     return (
//         <div>
//             <h1>Edit Profile..</h1>


//             <Modal
//                 isOpen={followModal}
//                 style={{ width: '400px', fontSize: 32 }}
//                 id="mymodal"
//             >
//                 <button id="closemodal" onClick={() => { setFollowModal(false) }}><img src="https://img.icons8.com/material-sharp/96/4a90e2/railroad-crossing-sign--v1.png" /></button>
//                 <h1 style={{textAlign:'center'}}>In connection with...</h1>
//                 <hr />
//                 <ul id="likersul">
//                     <li>All Followers: {toShowInModal.length}</li>
//                     {toShowInModal.map(followuser => {
//                         return <li id="likersli" ><Link to={'/profile?user=' + followuser}>@{followuser}</Link></li>
//                     })}

//                 </ul>
//             </Modal>










//             <div className="pro1">
//                 <div className="dp">
//                     <img src="default.png" alt="" ></img>
//                 </div>
//                 <div className="detail">
//                     <h2>@{data.username}</h2>
//                     <div className="followdetails">
//                         <h4>Posts: {postdata.length}  </h4>
//                         <h4 style={{cursor:'pointer'}} onClick={() => {setToShowInModal(data.followUsers); setFollowModal(true) }}>Followers: {data.followUsers ? data.followUsers.length : 0}  </h4>
//                         <h4 style={{cursor:'pointer'}} onClick={() => {setToShowInModal(data.followingUsers); setFollowModal(true); }}>Following: {data.following}  </h4>
//                     </div>
//                     <div className="about">
//                         This is my Instagram Account
//                     </div>
//                     <div className="followdiv">
//                         <button id="followbtn" onClick={() => { followNow() }}>Follow</button>
//                     </div>
//                 </div>
//             </div>
//             <hr></hr>
//             <div className="postandsave">
//                 <h3>Posts</h3>
//                 <svg aria-label="Posts" fill="#262626" height="32" viewBox="0 0 48 48" width="32"><path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path></svg>
//                 <h3>Save</h3>
//                 <svg aria-label="Saved" fill="#8e8e8e" height="32" viewBox="0 0 48 48" width="32"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
//             </div>
//             <div className="savedata">
//                 {
//                     postdata.length > 0 ?
//                         postdata.map(
//                             (item) => {
//                                 return (
//                                     <div id="mypost">
//                                         <img src="/dp.jpg" alt="" ></img>
//                                         <h4>{item.title}</h4>
//                                         <h3>Description:{item.description}</h3>
//                                     </div>
//                                 )
//                             })
//                         :
//                         <h1>No Posts...</h1>
//                 }
//             </div>
//         </div>
//     )
// }
import React, { useState, useEffect } from 'react'
export default function EditProfile(req, res) {



    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [submit, setSubmit] = useState(false)
    const [result, setResult] = useState('')


    useEffect(async () => {
        if(oldPassword!=password)
        {
            setResult('Password does not match')
            return;
        }
        if(submit==true)
        {
        const res = await fetch('http://localhost:3000/editprofile', ({
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({name,bio,dob,email,phone,oldPassword,password,userId:localStorage.getItem("userId")})
        })
            )
            const data = await res.json()
        }
}, [submit])


return (
    <div>
        <h1 style={{ textAlign: 'center' }}>Edit Profile</h1>
        <div id="editprofile">

            <form>

                <h4>Name</h4>
                <input type="text" placeholder="e.g. John Doe" onChange={(e) => setName(e.target.value)} />
                <p>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>

                <h4>Bio</h4>
                <input type="text" placeholder="e.g. Enjoying my life" onChange={(e) => setBio(e.target.value)} />
                <p>Help people discover your nature by your Bio. You can also call it as status or your summary.</p>
                <h4>Born On</h4>
                <input type="date"  placeholder="e.g. John Doe" onChange={(e) => setDob(e.target.value)} />
                <h4>Email</h4>
                <input type="email" placeholder="e.g. Doe@google.com" onChange={(e) => setEmail(e.target.value)} />
                <h4>Phone Number</h4>
                <input type="number" placeholder="e.g. 9784978384" onChange={(e) => setPhone(e.target.value)} />
                <h4>Change Password</h4>
                <input type="password" placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
                <p>In order to change your password, you need to enter your old password so as to make <strong>Instagram</strong> sure that you are owner</p>
                <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="form-btn" onClick={() => setSubmit(true)}>Submit</button>
                <div id="status" style={{ color: 'red' }}>{result}</div>
            </form>
        </div>
    </div>
)
}