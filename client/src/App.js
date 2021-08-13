import React, { useReducer,createContext,useEffect } from 'react'
import { BrowserRouter, Route,Switch,useHistory,Link } from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Signup from './Components/Signup'
import CreatePost from './Components/CreatePost'
import EditProfile from './Components/EditProfile'
import Direct from './Components/Chat'
import { initialState,reducer } from './reducers/useReducers';

export const UserContext = createContext(); 

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/profile"><Profile /></Route>
      <Route path="/createpost"><CreatePost /></Route>
      <Route path="/editprofile"><EditProfile /></Route>
      <Route path="/direct"><Direct /></Route>
    </Switch>
  )
}


function App() {
  const history = useHistory()
//   const checkUserAuthenticated = async ()=>{
//     try{
//         const res = await fetch('/checkuser',{
//             method:'get',
//             headers:{
//                 Accept:"application/json",
//                 "Content-type":"application/json"
//             },
//             credentials:"include"
//         })
//         const data=await res.json()
//         console.log(data)
//         if(data.loginError)
//         {
//             history.push('/login')
            
//     }
//     }catch(err){
//         console.log(err)
//     }
//  }
//     useEffect(()=>{
//         checkUserAuthenticated();
//     })


  const [state,dispatch] = useReducer(reducer,initialState);



  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }} >
          <Navbar />
          <Routing />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
