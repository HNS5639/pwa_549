import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"; 
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/RegisterUser/RegisterUser";
import Favorites from "./pages/Favorites/Favorites";
import Details from "./pages/Details/Details";
import RecipeEditor from "./pages/RecipeEditor/RecipeEditor";
import RecipeCreator from "./pages/RecipeCreator/RecipeCreator";
import NotFound from './pages/NotFound/NotFound';
import { Routes } from "./const/routes";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1 w-full">
          <RouterRoutes>
            <Route path={Routes.home} element={<Home />} />
            <Route path={Routes.login} element={<Login />} />
            <Route path={Routes.register} element={<Register />} />
            <Route path={Routes.details} element={<Details />} />
            <Route path={Routes.notFound} element={<NotFound />} />
            <Route 
              path={Routes.favorites} 
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={`${Routes.recipeEditor}/:id`} 
              element={
                <ProtectedRoute>
                  <RecipeEditor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={Routes.recipeCreator} 
              element={
                <ProtectedRoute>
                  <RecipeCreator />
                </ProtectedRoute>
              } 
            />
          </RouterRoutes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;