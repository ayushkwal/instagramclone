import React from 'react'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'


export default function Signup() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [result, setResult] = useState("")
  const history = useHistory()


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('get it')
    const res = await fetch('/signup', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    const data = await res.json();
    console.log(data);
    if (data.user) {
      console.log(data);
      history.push('/login')
    }
    else {
      if (data.erroremail == '') {
        setResult(data.errorpassword)
      }
      else {

        setResult(data.erroremail)
      }
    }
  }

  return (
    <div>
      <div>
        <div id="wrapper">
          <div className="container">
            <div className="phone-app-demo"></div>
            <div className="form-data">
              <form action="">
                <div className="logo">
                  <h1>Instagram.</h1>
                </div>
               
                {/* Input username  */}
                <input type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />


                {/* Input Enmail  */}
                <input type="text"
                  placeholder="Phone number, username, or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />

                {/* Input Password  */}
                <input type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />



                {/* Input Button  */}
                <button onClick={submitHandler} className="form-btn" type="submit">Sign Up</button>
                <span className="has-separator">Or</span>
                <a href="#" className="facebook-login">
                  <i className="fab fa-facebook"></i> Log in with Google
                </a>
                <span style={{color:'crimson'}}>{result}</span>
              </form>
              <div className="sign-up">
                Already have an account? <a href="/login">Log In</a>
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

            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
