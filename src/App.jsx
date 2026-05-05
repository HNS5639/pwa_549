import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"; 
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import Details from "./pages/Details/Details";
import { Routes } from "./const/routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1 w-full">
          <RouterRoutes>
            <Route path={Routes.home} element={<Home />} />
            <Route path={Routes.favorites} element={<Favorites />} />
            <Route path={Routes.details} element={<Details />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-4xl font-bold text-orange-500">404</h1>
                <p className="text-xl">Lo sentimos, la receta no existe.</p>
              </div>
            } />
          </RouterRoutes>
        </main>
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;