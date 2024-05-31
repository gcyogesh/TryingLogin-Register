
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import {UserContextProvider}  from '../context/userContext'
import DashBoard from './pages/Dashboard/DashBoard'





function App() {
  

  return (
    <>
    <UserContextProvider>

    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
    </Routes>
    </UserContextProvider>
    </>
  )
}

export default App
