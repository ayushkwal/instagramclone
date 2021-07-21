import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'


export default function Navbar() {



  const[search,setSearch] = useState('');
  const [users,setUsers] = useState([])

  useEffect(async()=>{
    if(search.length!=0)
    {
      const res =await fetch('http://localhost:3000/userSearch',({
        method:'post',
        body:JSON.stringify({search}),
        headers:{
          'content-type':'application/json'
        }
      }))
      const data = await res.json()
      console.log(data,data[0]);
      setUsers(data[0])
      console.log(data.username);
    }
    else{
      setUsers([])
    }
   
      
 
  },[search])



    return (
        <div>
    <nav>
    <div className="nav-wrapper">
      <h1>Instagram</h1>
      <input onChange={(e)=>{setSearch(e.target.value)}} type = "search"></input>
      <ul>
        <li><Link to="/"><img src = "icons8-igtv.svg" width="16px" height="23px" alt=""></img></Link></li>
        <li><Link to="/login"><img src = "icons8-igtv.svg" width="23px" height="23px" alt=""></img></Link></li>
        <li><Link to="/signup"><img src="icons8-igtv.svg" alt=""/></Link></li>
        <li><Link to="/profile?user=mario"><img src="profile.png"/></Link></li>
        <li><Link to="/createpost"><img style={{width:'70%'}} src="addsvg.svg" /></Link></li>
        <li><Link to="/editprofile"><img src="settings.png"/></Link></li>
      </ul>
    </div>
    </nav>
   
    <hr></hr>
    <div style={{textAlign:'center',display:'flex',alignItems:'center','justifyContent':'center'}}>
      {users.length>0?
      <ul id="searchul">
        {users.map(user=>{
         return  <li id="searchli" style={{zIndex:1,padding: '7px 68px', fontSize: '15px', listStyle: 'none'}}><Link to={'/profile?user=' + user.username}>@{user.username}</Link></li>
        })}
        
      </ul>
      :
      <></>
      }
    </div>
        </div>
    )
}




// box-shadow: 2px 2px 10px grey;padding: 7px 68px; border-radius: 10px; font-size: 15px; list-style: none;
//     
//    
//    
//    