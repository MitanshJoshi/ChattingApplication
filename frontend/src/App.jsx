import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import axios from "axios"

axios.defaults.baseURL="http://localhost:3000";

axios.defaults.withCredentials=true;

function App() {
  const [count, setCount] = useState(0)

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
