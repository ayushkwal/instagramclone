import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from '../App';

export default function Login() {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [result,setResult]  = useState('')

    const loginbtn = async(e)=>{
      e.preventDefault()
      console.log('clicked',email,password)
      const res = await fetch('/login',({
        method:"post",
        body:JSON.stringify({email,password}),
        headers:{
          'content-type':'application/json'
        }
      }))
      const data = await res.json();
      console.log(data);
      if(data.user)
      {
        //user is logged in
        localStorage.setItem("userId",data.user)
        localStorage.setItem("userName",data.checkUser.username)
        dispatch({type:"USER",payload:{userId:data.user,userName:data.checkUser.username}})
        console.log(data.user);
        history.push('/')
      }
      else{
        // user not logged in 
      }
    }

    return (
        <div>
             <div>
            <div>
             <div id="wrapper">
      <div className="container">
        {/* <div className="phone-app-demo"></div> */}
        <div className="form-data">
          <form action="">
            <div className="logo">
              <h1>Instagram.</h1>
            </div>
            <input type="text" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            <button className="form-btn" type="submit" onClick={loginbtn}>Log in</button>
            <span className="has-separator">Or</span>
            <a href="#" className="facebook-login">
              <i className="fab fa-facebook"></i> Log in with Google
            </a> 
            <a className="password-reset" href="#">Forgot password?</a>
          </form>
          <div className="sign-up">
            Don't an account? <Link to="/signup">Sign up</Link>
          </div>
          <div className="get-the-app">
            <span>Get the app</span>
            <div className="badge">
              <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="android App" />
              <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="ios app" />
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <nav className="footer-nav">
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Profiles</a></li>
              <li><a href="#">Languages</a></li>
            </ul>
          </nav>
          <div className="copyright-notice">
            &copy; 2021 Instagram
          </div>
        </div>
      </footer>
    </div>
        </div>
        </div>
        </div>
    )
}
