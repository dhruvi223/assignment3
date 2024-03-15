import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./views/authentication/SignIn";
import SignUp from "./views/authentication/SignUp";
import { Toaster, toast } from "react-hot-toast";
import ProductList from "./views/ProductList";
import ViewCart from "./views/ViewCart";
import Home from "./views/Home";
import { useState } from "react";

function App() {
  // localStorage.setItem('cart',JSON.stringify(cart))
  const addToCart = (product) => {
    const carts = JSON.parse(localStorage.getItem('cart'))
    carts.push(product)
    localStorage.setItem('cart', JSON.stringify(carts));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Toaster />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/productlist" element={<ProductList addToCart= {addToCart}/>} />
          <Route path="/viewcart" element={<ViewCart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
