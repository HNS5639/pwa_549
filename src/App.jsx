import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </RouterRoutes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
