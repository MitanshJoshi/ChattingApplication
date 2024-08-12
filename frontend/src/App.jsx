import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import axios from "axios"
import { useAppStore } from './store'

axios.defaults.baseURL="http://localhost:3000";

axios.defaults.withCredentials=true;

function App() {
  const {userInfo,setUserInfo} = useAppStore();
  const [loading, setloading] = useState(true);


  useEffect(() => {
    const getUserInfo=async()=>{
      try {
        const response = await axios.get("/user/getuser")
        console.log(response.data);
        setUserInfo(response.data.userData)
        
      } catch (error) {
        
      }
    };

    if(!userInfo)
    {
      getUserInfo();
    }
    else{
      setloading(false);
    }
  }, [userInfo,setUserInfo]);

  if(loading)
  {
    return <div>Loading...</div>;
  }
  

  return ( 
    <>
      <Routes>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<Auth/>}/>
      </Routes >
    </>
  )
}

export default App
