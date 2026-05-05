
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import { Routes } from "./const/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
          <RouterRoutes>
            <Route path={Routes.home} element={<Home />} />
            <Route path={Routes.favorites} element={<Favorites />} />
            <Route path={Routes.details} element={<Details />} />
          </RouterRoutes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
