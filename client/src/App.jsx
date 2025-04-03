import Navbar from "./Navbar"
import Register from "./Register"
import Login from "./Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import CreatePost from "./CreatePost"
import Post from "./Post"
import EditPost from "./EditPost"
import axios from "axios"
import { createContext, useEffect, useState } from "react"

const apiUrl = import.meta.env.VITE_API_URL;

export const userContext = createContext()

function App() {
  const [user, setUser] = useState({
    username: null,
    email: null
  })

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(apiUrl)
    .then(user => {
      setUser(user.data)
      console.log(user)
    })
    .catch(err => console.log(err))
  
  }, [])

  return (
    <userContext.Provider value={user}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path='/post/:id' element={<Post />}></Route>
        <Route path='/editpostbyid/:id' element={<EditPost />}></Route> 
      </Routes>
    </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
