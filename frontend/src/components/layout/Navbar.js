import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Search from './Search'

const Navbar = () => {
  return (
    <>
      <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          {/* Yha mujhe logo add krna hai or yha <img src="" alt=""/> ye lugega iske bdle */}
        <h3>🛍️My-Store</h3> 
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Routes >       
          <Route path='/' element={<Search/>} /> 
        </Routes>

      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <button className="btn" id="login_btn">Login</button>

        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span>
      </div>
    </nav> 
    </>
  )
}

export default Navbar
