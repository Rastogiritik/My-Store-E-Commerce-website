import Navbar from "./components/layout/Navbar";
import './App.css';

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Home from "./components/Home";

import ProductDetails from "./components/product/ProductDetails";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";


import ListOrders from "./components/order/ListOrders";

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
import axios  from "axios";

// Payment 
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  
  useEffect(() => {
    store.dispatch(loadUser())
    async function getStripeApiKey(){
      const { data } = await axios.get('/api/v1/stripeapi');
      console.log(data.stripeApiKey);
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey();
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
            <Route path="/shipping" element={<ProtectedRoute> <Shipping /> </ProtectedRoute> } exact />
            <Route path="/order/confirm" element={<ProtectedRoute> <ConfirmOrder /> </ProtectedRoute> } exact />
            {stripeApiKey && <Route path='/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>} />} 
            <Route path="/success" element={<ProtectedRoute> <OrderSuccess /> </ProtectedRoute> } exact /> 

            <Route  path="/orders/me"  element={ <ProtectedRoute> <ListOrders /> </ProtectedRoute> } exact /> 
    

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
