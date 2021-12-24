import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
