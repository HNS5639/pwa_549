import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"; 
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import Favorites from "./pages/Favorites/Favorites";
import Details from "./pages/Details/Details";
import RecipeEditor from "./pages/ RecipeEditor/ RecipeEditor";
import RecipeCreator from "./pages/RecipeCreator/RecipeCreator";
import { Routes } from "./const/routes";
import "./App.css";

import NotFound from './pages/NotFound/NotFound';
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1 w-full">
          <RouterRoutes>
            <Route path={Routes.home} element={<Home />} />
            <Route path={Routes.login} element={<Login />} />
            <Route path={Routes.logout} element={<Logout />} />
            <Route path={Routes.favorites} element={<Favorites />} />
            <Route path={Routes.details} element={<Details />} />
            <Route path={Routes.notFound} element={<NotFound />} />
            <Route path={`${Routes.recipeEditor}/:id`} element={<RecipeEditor />} />
            <Route path={Routes.recipeCreator} element={<RecipeCreator />} />
          </RouterRoutes>
        </main>
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;