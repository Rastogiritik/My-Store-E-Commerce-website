import Navbar from "./components/layout/Navbar";
import './App.css';

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Home from "./components/Home";

import ProductDetails from "./components/product/ProductDetails";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from './actions/userAction'
import store from './store'

function App() {

  useEffect(() => {

    store.dispatch(loadUser())

  }, [])

  return (
    <Router >
    <div className="App">
      <Navbar />

      <div className="container container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/search/:keyword" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />

            <Route exact path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<ProtectedRoute> < Shipping /> </ProtectedRoute> } exact />
          

            <Route exact path="login" element={<Login/>} />
            <Route exact path="/register"  element={<Register />} />
            <Route exact path="/password/forgot"  element={<ForgotPassword />} />
            <Route exact path="/password/reset/:token"  element={<NewPassword />} />
            <Route  path="/me"  element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } exact /> 
            <Route  path="/me/update"  element={ <ProtectedRoute> <UpdateProfile /> </ProtectedRoute> } exact /> 
            <Route  path="/password/update"  element={ <ProtectedRoute> <UpdatePassword /> </ProtectedRoute> } exact /> 
          </Routes>
      </div>

      <Footer />
    </div>
    </Router>
  );
}

export default App;
