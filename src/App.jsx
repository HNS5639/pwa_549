import { useState } from "react";

import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

{/*import { BrowserRouter, Routes, Route } from "react-router-dom";*/}
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";


function App() {
  return (
    <BrowserRouter>
      <Header />

      <RouterRoutes>
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </RouterRoutes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
