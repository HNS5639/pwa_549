import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import { Routes } from "./const/routes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RouterRoutes>
        <Route path={Routes.home} element={<Home />} />
        <Route path={Routes.favorites} element={<Favorites />} />
        <Route path={Routes.details} element={<Details />} />
      </RouterRoutes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
