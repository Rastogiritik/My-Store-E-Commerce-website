import Navbar from "./components/layout/Navbar";
import './App.css';
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Router >
    <div className="App">
      <Navbar />

      <div className="container container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />
            
            <Route exact path="/product/:id" element={<ProductDetails />} />
          </Routes>
      </div>

      <Footer />
    </div>
    </Router>
  );
}

export default App;
