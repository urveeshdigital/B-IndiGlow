import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './users/Register'
import Login from './users/Login'
import ForgotPassword from './users/ForgotPassword'
import Otp from './users/Otp'
import ResetPassword from './users/ResetPassword'
import EmailVerify from './users/EmailVerify'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import Sidebar from './dashboard/Sidebar'
import Navbar from './dashboard/Navbar'
import Dashboardcard from './dashboard/Dashboardcard'
import Graph from './dashboard/Graph'
import UserTable from './dashboard/UserTable'
import User from './dashboard/User'
import Profile from './userdashboard/Profile'
import Dashboard from './dashboard/Dashboard'
import ProfileEdit from './userdashboard/ProfileEdit'
import ChangePassword from './userdashboard/ChangePassword'
import Products from './userdashboard/Products'
import Contact from './userdashboard/Contact'
import About from './userdashboard/About'
import ProfilePage from './userdashboard/profilepage'

function App() {
  const [count, setCount] = useState(0)

  return (


    <Router>
      <Routes>
          <Route path="/" element={<User />} /> 
        <Route  path="register" element={<Register />}></Route>
         
        <Route path="login" element={<Login />} /> 
           <Route path="otp" element={<Otp />} /> 
              <Route path="emailverify" element={<EmailVerify />} /> 
                 <Route path="forgot" element={<ForgotPassword />} /> 
                    <Route path="reset" element={<ResetPassword />} /> 
                    <Route path="dashboard" element={<Dashboard />} /> 
                     <Route path="sidebar" element={<Sidebar />} /> 
                      <Route path="navbar" element={<Navbar />} /> 
                       <Route path="dashboardcard" element={<Dashboardcard />} /> 
                         <Route path="graph" element={<Graph/>} /> 
                         <Route path="users" element={<UserTable/>} />
                          <Route path="user" element={<User/>} /> 
                          <Route path="profile" element={<Profile/>} />   
                          <Route path="edit-profile" element={<ProfileEdit/>} />  
                          <Route path="change-password" element={<ChangePassword/>} />  
                           <Route path="products" element={<Products/>} />  
                             <Route path="contact" element={<Contact/>} />  
                              <Route path="about" element={<About/>} />  
                                      <Route path="/profileview" element={<ProfilePage />} />

                            {/* <Route path="change-password" element={<ChangePassword/>} /> */}

                         


       </Routes>
    </Router>
  )
}

export default App
