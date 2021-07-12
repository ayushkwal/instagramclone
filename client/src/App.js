import './App.css';
import Navbar from './Components/Navbar'
import{BrowserRouter, Route} from 'react-router-dom'
import React from 'react'
import Home from './Components/Home'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Signup from './Components/Signup'
import CreatePost from './Components/CreatePost'


function App() {
  return (
    <div>
      <BrowserRouter>
   <Navbar />
   <Route exact path="/"><Home /></Route>
   <Route path="/login"><Login /></Route>
   <Route path="/signup"><Signup /></Route>
   <Route path="/profile"><Profile /></Route>
   <Route path="/createpost"><CreatePost /></Route>
   </BrowserRouter>
   </div>
  );
}

export default App;
