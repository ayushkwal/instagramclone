import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
    <nav>
    <div className="nav-wrapper">
      <h1>Instagram</h1>
      <input type = "search"></input>
      <ul>
        <li><Link to="/"><img src = "icons8-igtv.svg" width="16px" height="23px"></img></Link></li>
        <li><Link to="/login"><img src = "icons8-igtv.svg" width="23px" height="23px"></img></Link></li>
        <li><Link to="/signup"><img src = "icons8-igtv.svg" width="23px" height="23px"></img></Link></li>
        <li><Link to="/profile"><img src = "icons8-igtv.svg" width="23px" height="23px"></img></Link></li>
        <li><Link to="/createpost"><img src = "icons8-igtv.svg" width="23px" height="23px"></img></Link></li>
      </ul>
    </div>
    </nav>
    <hr></hr>
        
        </div>
    )
}
